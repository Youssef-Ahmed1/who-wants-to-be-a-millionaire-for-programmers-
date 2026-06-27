"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "../../../store";

export default function GameBoard() {
    const router = useRouter();
    // Global Store
   const { incrementScore, selectedCategory } = useGameStore();

    // Local State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // We create an async function inside useEffect to handle the Promise
        const loadQuestions = async () => {
            try {
                // YOUR TURN: Write the fetch() call to "/api/questions"
                // Await the response, parse the .json(), and put it in the setQuestions state!
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
                // Wrong answer! Route to Game Over
                router.push("/game-over");
            }
        }, 1500);
    };
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            <div className="w-full max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
                {/* THE HUD */}
                <div className="flex justify-between text-slate-400 mb-6 text-sm font-bold uppercase tracking-wider">
                    <span>Category: {currentQuestion.category}</span>
                    <span>Level: {currentQuestion.level}</span>
                </div>

                {/* THE QUESTION */}
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-relaxed">
                    {currentQuestion.question}
                </h2>

                {/* THE OPTIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        // COLOR LOGIC: Handled directly inside the map so Tailwind can't ignore it!
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
        </main>
    );
}
