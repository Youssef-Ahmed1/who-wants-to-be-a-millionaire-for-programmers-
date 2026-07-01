"use client";
import { useGameStore } from "../../../store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { saveHighScore } from "../../lib/actions";
import { useState } from "react";

export default function GameOver() {
  const { score, resetGame } = useGameStore();
  const router = useRouter();
   const [isSaving, setIsSaving] = useState(false);
   const [saved, setSaved] = useState(false);
  const handlePlayAgain = () => {
      resetGame();
      router.push("/");
  };
  const handleSaveScoreClick = async () => {
      setIsSaving(true);

      try {
          // Call your Server Action!
          await saveHighScore(score);
          setSaved(true); // Success!
      } catch (error) {
          console.error("Failed to save:", error);
      } finally {
          setIsSaving(false);
      }
  };
  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
          <h1 className="text-6xl font-black mb-4">GAME OVER</h1>

          <h2 className="text-3xl text-emerald-400 mb-8">You won: ${score}</h2>

          <Button
              onClick={handlePlayAgain}
              size="lg"
              className="bg-blue-600 hover:bg-blue-500"
          >
              Play Again
          </Button>
          <Button
              onClick={handleSaveScoreClick}
              disabled={isSaving || saved}
              size="lg"
              className={`${saved ? "bg-green-600" : "bg-purple-600 hover:bg-purple-500"} w-64`}
          >
              {isSaving ? "Saving..." : saved ? "Score Saved!" : "Save Score"}
          </Button>
      </main>
  );
}
