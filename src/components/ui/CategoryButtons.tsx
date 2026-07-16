"use client";

import { useGameStore } from "../../../store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CategoryButtons() {
    const { setCategory } = useGameStore();
    const router = useRouter();

    const handleClick = (category: string) => {
        setCategory(category);
        router.push("/play");
    };

    return (
        <div className="flex flex-col gap-4">
            <Button
                onClick={() => handleClick("Frontend Mastery")}
                variant="default"
                size="lg"
                className="w-full bg-[#3596b5] hover:bg-[#296073]"
            >
                Frontend Mastery
            </Button>
            <Button
                onClick={() => handleClick("Backend Architecture")}
                variant="default"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
                Backend Architecture
            </Button>
            <Button
                onClick={() => handleClick("CS Fundamentals")}
                variant="default"
                size="lg"
                className="w-full bg-[#c34a36] hover:bg-[#bea6a0]"
            >
                CS Fundamentals
            </Button>
            <Button
                onClick={() => handleClick("Full-Stack Gauntlet")}
                variant="default"
                size="lg"
                className="w-full bg-[#00c2a8] via-red-700"
            >
                Full-Stack Gauntlet
            </Button>
        </div>
    );
}
