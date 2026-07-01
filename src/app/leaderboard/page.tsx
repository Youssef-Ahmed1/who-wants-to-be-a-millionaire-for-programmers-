// src/app/leaderboard/page.tsx
import Link from "next/link";
 import { Button } from "@/components/ui/button";

// Fake data for today! We will replace this with a database call tomorrow.
const mockLeaderboard = [
  { id: 1, name: "Senior Engineer", score: 1000000 },
  { id: 2, name: "Mid-Level Dev", score: 500000 },
  { id: 3, name: "Junior Dev", score: 1000 },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
      <div className="w-full max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">

        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          Global Leaderboard
        </h1>

       <div className="flex flex-col gap-3 mb-8 w-full">
  {mockLeaderboard.map((user, index) => (
    <div
      key={user.id}
      className={`flex justify-between items-center p-4 rounded-lg border ${
        index === 0 ? "bg-amber-500/10 border-amber-500/50 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl w-6">{index + 1}.</span>
        <span className="font-semibold text-lg">{user.name}</span>
      </div>
      <span className="font-mono text-xl tracking-wider font-bold">
        ${user.score.toLocaleString()}
      </span>
    </div>
  ))}
</div>

      </div>
    </main>
  );
}
