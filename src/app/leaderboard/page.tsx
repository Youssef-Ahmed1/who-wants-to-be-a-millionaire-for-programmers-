// src/app/leaderboard/page.tsx
import Link from "next/link";
 import { Button } from "@/components/ui/button";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "../../models/user";


export default async function LeaderboardPage() {
    await connectToDatabase();

    const topUsers = await User.find().sort({ highScore: -1 }).limit(10).lean();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            <div className="w-full max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                    Global Leaderboard
                </h1>

                <div className="flex flex-col gap-3 mb-8 w-full">
                    {topUsers.map((user, index) => (
                        <div
                            key={user._id.toString()}
                            className={`flex justify-between items-center p-4 rounded-lg border ${
                                index === 0
                                    ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                                    : "bg-slate-800 border-slate-700 text-slate-200"
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-xl w-6">
                                    {index + 1}.
                                </span>
                                <span className="font-semibold text-lg">
                                    {user.name}
                                </span>
                            </div>
                            <span className="font-mono text-xl tracking-wider font-bold">
                                ${user.highScore.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

