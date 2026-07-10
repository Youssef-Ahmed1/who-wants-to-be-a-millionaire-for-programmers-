"use client";
import {
    generateStackOverflowVotes,
    generatePhoneFriendResponse,
} from "../../lib/lifelines";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "../../../store";
import { Question } from "@/types";


export default function GameBoard() {
    const router = useRouter();
    const { incrementScore, selectedCategory } = useGameStore();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showAudienceModal, setShowAudienceModal] = useState(false);
    const [audienceVotes, setAudienceVotes] = useState<number[]>([]);
    const [usedAudience, setUsedAudience] = useState(false);
    const [usedPhoneFriend, setUsedPhoneFriend] = useState(false);
    const [phoneFriendMessage, setPhoneFriendMessage] = useState<string | null>(
        null,
    );
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isTimerActive, setIsTimerActive] = useState(true);
    useEffect(() => {
        const loadQuestions = async () => {
            if (!selectedCategory) {
                router.push("/");
                return;
            }

            try {
                const url = `/api/questions?category=${encodeURIComponent(selectedCategory)}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const result = await response.json();
                setQuestions(result);
                setIsLoading(false);

                console.log(result);
            } catch (error: any) {
                console.error(error.message);
            }
        };

        loadQuestions();
    }, []);

useEffect(() => {
    if (selectedAnswer !== null || !isTimerActive) return;

    const interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                handleTimeout();
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(interval);
}, [currentQuestionIndex, selectedAnswer, isTimerActive]);

useEffect(() => {
    setTimeLeft(15);
    setIsTimerActive(true);
}, [currentQuestionIndex]);
const handleTimeout = () => {
    if (selectedAnswer !== null) return;

    setIsCorrect(false);
    setSelectedAnswer("⏰ Timeout!");

    setTimeout(() => {
        router.push("/game-over");
    }, 1500);
};

    if (isLoading || questions.length === 0) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
                <h1 className="text-3xl animate-pulse font-bold text-blue-400">
                    Loading the Gauntlet...
                </h1>
            </main>
        );
    }
    const currentQuestion = questions[currentQuestionIndex];

    const handleAskAudience = () => {
        if (usedAudience) return;

        const votes = generateStackOverflowVotes(currentQuestion);

        setAudienceVotes(votes);

        // 3. Show the popup!
        setShowAudienceModal(true);
        setUsedAudience(true);
    };
    const handleFiftyFifty = () => {
        // 1. Guard Clause: If they already used it, do nothing!
        if (usedFiftyFifty) return;

        const wrongOptions = currentQuestion.options.filter(
            (option: string) => {
                return (
                    option.toLowerCase() !==
                    currentQuestion.correctAnswer.toLowerCase()
                );
            },
        );

        const shuffledWrongOptions = wrongOptions.sort(
            () => Math.random() - 0.5,
        );

        const optionsToHide = [
            shuffledWrongOptions[0],
            shuffledWrongOptions[1],
        ];

        // 5. Update State!
        setHiddenOptions(optionsToHide);
        setUsedFiftyFifty(true);
    };
    const handleAnswerClick = (option: string) => {
        // 1. Lock the board immediately
        if (selectedAnswer !== null) return;

        // 2. Do the math & update UI state
        const correct = option === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setSelectedAnswer(option);

        // 3. The 1.5 Second Pause
        setTimeout(() => {
            if (correct) {
                incrementScore();

                // Did we beat the game?
                if (currentQuestionIndex + 1 >= questions.length) {
                    router.push("/game-over");
                } else {
                    // Next question! Reset the board.
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                }
            } else {
                router.push("/game-over");
            }
            setHiddenOptions([]);
        }, 1500);
    };

    const handlePhoneFriend = () => {
        if (usedPhoneFriend) return;

        const rawMessage = generatePhoneFriendResponse(currentQuestion.level);
        const finalMessage = rawMessage.replace(
            /\{correctAnswer\}/g,
            currentQuestion.correctAnswer,
        );

        setPhoneFriendMessage(finalMessage);
        setShowPhoneModal(true);
        setUsedPhoneFriend(true);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            <div className="w-full max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
                {/* THE HUD */}
                <div className="flex justify-between text-slate-400 mb-6 text-sm font-bold uppercase tracking-wider">
                    <span>Category: {currentQuestion.category}</span>
                    <span
                        className={`font-mono text-xl ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}
                    >
                        ⏱️ {timeLeft}s
                    </span>
                    <span>Level: {currentQuestion.level}</span>
                </div>
                {/* THE QUESTION */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-relaxed">
                    {currentQuestion.question}
                </h2>
                <button
                    onClick={handleFiftyFifty}
                    className="mb-6 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 px-4 rounded-lg"
                >
                    rm -rf 50%
                </button>{" "}
                <button
                    onClick={handleAskAudience}
                    className="mb-6 bg-blue-500 hover:bg-blue-400 text-slate-900 font-bold py-2 px-4 rounded-lg"
                >
                    Ask StackOverflow
                </button>
                <button
                    onClick={handlePhoneFriend}
                    className="mb-6 bg-purple-500 hover:bg-purple-400 text-slate-900 font-bold py-2 px-4 rounded-lg"
                >
                    📱 Phone a Friend
                </button>
                {/* THE OPTIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        if (hiddenOptions.includes(option)) {
                            return (
                                <div key={index} className="invisible"></div>
                            );
                        }
                        let btnColor =
                            "bg-blue-600 hover:bg-blue-500 border border-blue-500";

                        if (selectedAnswer !== null) {
                            if (option === selectedAnswer) {
                                btnColor = isCorrect
                                    ? "bg-emerald-600 scale-105 shadow-xl z-10 border-2 border-emerald-400"
                                    : "bg-red-600 scale-105 shadow-xl z-10 border-2 border-red-400";
                            } else {
                                // Dim the buttons that weren't clicked
                                btnColor =
                                    "bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed border border-slate-700";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                                disabled={selectedAnswer !== null}
                                className={`w-full h-auto min-h-[80px] whitespace-normal py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 transform ${btnColor}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
            {/* STACKOVERFLOW MODAL */}
            {showAudienceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                            StackOverflow Says...
                        </h2>

                        <div className="flex flex-col gap-6">
                            {currentQuestion.options.map((option, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2"
                                >
                                    <div className="flex justify-between text-sm text-slate-300">
                                        <span className="truncate pr-4">
                                            {option}
                                        </span>
                                        <span className="font-bold text-white">
                                            {audienceVotes[index]}%
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${audienceVotes[index]}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowAudienceModal(false)}
                            className="mt-8 w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
                        >
                            Close Window
                        </button>
                    </div>
                </div>
            )}
            {/* / 5. call a friend  Modal  */}
            {showPhoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                            🧙‍♂️ Your Senior Dev Friend Says...
                        </h2>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                            <p className="text-white text-lg leading-relaxed italic">
                                "{phoneFriendMessage}"
                            </p>
                        </div>
                        <button
                            onClick={() => setShowPhoneModal(false)}
                            className="mt-6 w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
