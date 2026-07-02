import { auth } from "@/auth";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import CategoryButtons from "../components/ui/CategoryButtons";
import Link from "next/link";
export default async function Home() {
    const session = await auth();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
                    Who Wants To Be A DEV?
                </h1>

                {session?.user ? (
                    <p className="text-xl text-emerald-400">
                        Welcome back, {session.user.name}
                    </p>
                ) : (
                    <p className="text-xl text-slate-400">
                        Prove your stack. Win the remote job.
                    </p>
                )}
            </div>

            <Card className="w-full max-w-md bg-slate-900 border-slate-800">
                <CardHeader className="text-center">
                    <br />
                    <Link
                        href="/leaderboard"
                        className="text-xl text-emerald-400"
                    >
                        hall of fame
                    </Link>
                    <CardTitle className="text-2xl text-white">
                        Select Your Discipline
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Choose your technical interview path.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <CategoryButtons />
                </CardContent>
            </Card>
        </main>
    );
}
