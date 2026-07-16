"use client";
import {
    generateStackOverflowVotes,
    generatePhoneFriendResponse,
} from "../../lib/lifelines";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "../../../store";
import { Question } from "@/types";
import ProgressLadder from "@/components/ProgressLadder";
import { playCorrect, playWrong, playTick, stopTick } from "@/lib/sound";

import { motion, AnimatePresence } from "framer-motion";
export default function GameBoard() {
    const router = useRouter();
    const { incrementScore, selectedCategory } = useGameStore();
const [showCorrectAnswer, setShowCorrectAnswer] = useState<string | null>(null);
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
    const [timeLeft, setTimeLeft] = useState(25);
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
stopTick();
        setTimeLeft(30);
        setIsTimerActive(true);
         setShowCorrectAnswer(null);
    }, [currentQuestionIndex]);
    const handleTimeout = () => {
  if (selectedAnswer !== null) return;
    stopTick();
    playWrong();
        setIsCorrect(false);
        setSelectedAnswer("⏰ Timeout!");

        setTimeout(() => {
            router.push("/game-over");
        }, 1500);
    };

    useEffect(() => {
        if (timeLeft <= 5 && timeLeft > 0) {
            playTick();
        }
    }, [timeLeft]);

    useEffect(() => {
        return () => {
            stopTick();
        };
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
        if (selectedAnswer !== null) return;

        const correct = option === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setSelectedAnswer(option);

        // ✅ If wrong, store the correct answer to highlight it
        if (!correct) {
            setShowCorrectAnswer(currentQuestion.correctAnswer);
        }

        setTimeout(() => {
            if (correct) {
                incrementScore();
                if (currentQuestionIndex + 1 >= questions.length) {
                    router.push("/game-over");
                } else {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                    setShowCorrectAnswer(null); // ✅ Reset on next question
                }
            } else {
                router.push("/game-over");
            }
            setHiddenOptions([]);
        }, 1500);
    };;

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
    //
   return (
       <main className="min-h-screen flex flex-col bg-slate-950 text-white">
           {/* TOP BAR: Category, Timer, Level (full width) */}
           <div className="w-full bg-slate-900/50 border-b border-slate-800 px-4 py-3 flex justify-between items-center">
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                   {currentQuestion.category}
               </span>
               <span
                   className={`font-mono text-xl font-bold ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-emerald-400"}`}
               >
                   ⏱️ {timeLeft}s
               </span>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                   Level {currentQuestion.level}
               </span>
           </div>

           {/* MAIN CONTENT: Ladder (right) + Game Board (center) */}
           <div className="flex-1 flex flex-col md:flex-row relative left-15">
               {/* GAME BOARD - centered, takes remaining space */}
               <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                   <div className="w-full max-w-4xl bg-slate-900/80 p-6 md:p-10 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
                       {/* LIFELINES */}
                       <div className="flex flex-wrap gap-3 mb-6 justify-center">
                           <button
                               onClick={handleFiftyFifty}
                               className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm md:text-base transition-colors"
                           >
                               rm -rf 50%
                           </button>
                           <button
                               onClick={handleAskAudience}
                               className="bg-[#009efa] hover:bg-blue-600 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm md:text-base transition-colors"
                           >
                               Ask StackOverflow
                           </button>
                           <button
                               onClick={handlePhoneFriend}
                               className="bg-[#845ec2] hover:bg-[#9b89b3] text-slate-900 font-bold py-2 px-4 rounded-lg text-sm md:text-base transition-colors"
                           >
                               📱 Phone a Friend
                           </button>
                       </div>

                       {/* QUESTION */}
                       <h2 className="text-xl md:text-3xl font-bold text-center mb-8 md:mb-10 leading-relaxed">
                           {currentQuestion.question}
                       </h2>

                       {/* OPTIONS GRID */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                           {currentQuestion.options.map((option, index) => {
                               if (hiddenOptions.includes(option)) {
                                   return (
                                       <div key={index} className="invisible" />
                                   );
                               }

                               let btnColor =
                                   "bg-blue-600 hover:bg-blue-500 border border-blue-500";

                               if (selectedAnswer !== null) {
                                   if (option === selectedAnswer) {
                                       btnColor = isCorrect
                                           ? "bg-emerald-600 scale-105 shadow-xl z-10 border-2 border-emerald-400"
                                           : "bg-red-600 scale-105 shadow-xl z-10 border-2 border-red-400";
                                   } else if (
                                       option === showCorrectAnswer &&
                                       !isCorrect
                                   ) {
                                       btnColor =
                                           "bg-emerald-600 border-2 border-emerald-400 animate-pulse";
                                   } else {
                                       btnColor =
                                           "bg-slate-800 text-slate-500 opacity-50 cursor-not-allowed border border-slate-700";
                                   }
                               }

                               return (
                                   <motion.button
                                       key={index}
                                       onClick={() => handleAnswerClick(option)}
                                       disabled={selectedAnswer !== null}
                                       initial={{ scale: 1 }}
                                       animate={{
                                           scale:
                                               selectedAnswer === option
                                                   ? 1.05
                                                   : 1,
                                           borderColor:
                                               selectedAnswer === option
                                                   ? isCorrect
                                                       ? "#10b981"
                                                       : "#ef4444"
                                                   : "#3b82f6",
                                       }}
                                       transition={{ duration: 0.2 }}
                                       className={`w-full h-auto min-h-[70px] md:min-h-[80px] whitespace-normal py-3 md:py-4 px-4 md:px-6 rounded-xl font-bold text-white transition-colors duration-300 ${btnColor} text-sm md:text-base`}
                                   >
                                       {option}
                                   </motion.button>
                               );
                           })}
                       </div>
                   </div>
               </div>

               {/* LADDER - pinned to right edge, full height */}
               <div className="md:w-72 lg:w-80 xl:w-96 flex-shrink-0 bg-slate-900/50 border-l border-slate-800 p-4 overflow-y-auto">
                   <ProgressLadder
                       key={currentQuestionIndex}
                       currentIndex={currentQuestionIndex}
                       totalQuestions={questions.length}
                   />
               </div>
           </div>

           {/* MODALS (unchanged) */}
           {showAudienceModal && (
               <motion.div
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: 20 }}
                   transition={{ duration: 0.3 }}
                   className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
               >
                   <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                       <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-2">
                           StackOverflow Says...
                       </h2>
                       <div className="flex flex-col gap-6">
                           {currentQuestion.options.map((option, index) => (
                               <div key={index} className="flex flex-col gap-2">
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
                                       />
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
               </motion.div>
           )}

           {showPhoneModal && (
               <motion.div
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: 20 }}
                   transition={{ duration: 0.3 }}
                   className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
               >
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
               </motion.div>
           )}
       </main>
   );
}
