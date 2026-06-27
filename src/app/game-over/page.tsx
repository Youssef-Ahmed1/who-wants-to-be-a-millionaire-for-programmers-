"use client";
import { useGameStore } from "../../../store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GameOver() {
  const { score, resetGame } = useGameStore();
  const router = useRouter();

  const handlePlayAgain = () => {
    resetGame();
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
      <h1 className="text-6xl font-black mb-4">GAME OVER</h1>


      <h2 className="text-3xl text-emerald-400 mb-8">
        You won: ${score}
      </h2>

      <Button onClick={handlePlayAgain} size="lg" className="bg-blue-600 hover:bg-blue-500">
        Play Again
      </Button>
    </main>
  );
}
