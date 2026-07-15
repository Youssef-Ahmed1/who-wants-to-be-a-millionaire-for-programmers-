"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
    session: any;
}

export default function AuthButtons({ session }: AuthButtonsProps) {
    return (
        <div className="flex gap-4 justify-center mt-6">
            {!session?.user ? (
                <>
                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-600 rounded-xl bg-green-800"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-blue-600 hover:bg-blue-500">
                            Create Account
                        </Button>
                    </Link>
                </>
            ) : (
                <Button
                    onClick={() => signOut()}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-500 rounded-xl"
                >
                    Sign Out
                </Button>
            )}
        </div>
    );
}
