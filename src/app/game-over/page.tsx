"use client";

import { useGameStore } from "../../../store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { saveHighScore } from "../../lib/actions";
import { useState } from "react";
import { ladderSteps } from "@/lib/ladderData";
// Career mapping based on score
const careerMessages = [
    {
        range: [0, 0],
        title: "Applicant",
        message: "You didn't even make it to the first interview. Time to study harder.",
    },
    {
        range: [1, 2],
        title: "Bootcamp Grad",
        message: "You're on the right track. Keep learning and try again.",
    },
    {
        range: [3, 4],
        title: "Intern",
        message: "You've got potential. But internships don't pay the bills.",
    },
    {
        range: [5, 6],
        title: "Junior Engineer",
        message: "You have a long way to go in your career. Keep grinding.",
    },
    {
        range: [7, 8],
        title: "Engineer I",
        message: "You're building real skills. The promotion is within reach.",
    },
    {
        range: [9, 10],
        title: "Engineer II",
        message: "Solid performance. You're on the path to senior level.",
    },
    {
        range: [11, 12],
        title: "Senior Engineer I",
        message: "You're climbing the ladder. One more step to the top.",
    },
    {
        range: [13, 14],
        title: "Senior Engineer II",
        message: "You're almost there! One more question and you'd be CTO.",
    },
    {
        range: [15, 15],
        title: "CTO 🏆",
        message: "Congratulations! You've reached the top of the career ladder!",
    },
];

const getCareerInfo = (score: number) => {
    return careerMessages.find((c) => score >= c.range[0] && score <= c.range[1]) || careerMessages[0];
};

export default function GameOver() {
    const { score, resetGame } = useGameStore();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const careerInfo = getCareerInfo(score);

    const handlePlayAgain = () => {
        resetGame();
        router.push("/");
    };
   const getSalary = (score: number) => {
       const stepIndex = Math.min(score, ladderSteps.length - 1);
       return ladderSteps[stepIndex]?.salary || "$0";
   };
    const handleSaveScoreClick = async () => {
        setIsSaving(true);
        try {
            await saveHighScore(score);
            setSaved(true);
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Format score with dollar sign
    const formattedScore = score === 0 ? "$0" : `$${score.toLocaleString()}`;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            {/* GAME OVER HEADER */}
            <div className="text-center mb-8">
                <h1 className="text-6xl font-black text-red-500 mb-2">
                    GAME OVER
                </h1>
                <p className="text-slate-400 text-lg">
                    Your career journey has ended... for now.
                </p>
            </div>

            {/* SCORE DISPLAY */}
            <div className="text-center mb-6">
                <p className="text-3xl text-emerald-400 font-bold">
                    You earned: {getSalary(score)}{" "}
                </p>
            </div>

            {/* CAREER TITLE & MESSAGE */}
            <div className="max-w-md text-center bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
                <p className="text-2xl font-bold text-amber-400 mb-2">
                    {careerInfo.title}
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                    "{careerInfo.message}"
                </p>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button
                    onClick={handlePlayAgain}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3"
                >
                    🔄 Play Again
                </Button>

                <Button
                    onClick={handleSaveScoreClick}
                    disabled={isSaving || saved}
                    size="lg"
                    className={`${saved ? "bg-emerald-600" : "bg-purple-600 hover:bg-purple-500"} text-white font-bold py-3`}
                >
                    {isSaving
                        ? "💾 Saving..."
                        : saved
                          ? "✅ Score Saved!"
                          : "💾 Save Score"}
                </Button>

                <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                    🏠 Home
                </Button>
            </div>
        </main>
    );
}
