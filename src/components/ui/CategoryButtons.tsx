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
            <Button onClick={() => handleClick("Frontend Mastery")} variant="default" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">Frontend Mastery</Button>
            <Button onClick={() => handleClick("Backend Architecture")} variant="default" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">Backend Architecture</Button>
            <Button onClick={() => handleClick("CS Fundamentals")} variant="default" size="lg" className="w-full bg-purple-600 hover:bg-purple-700">CS Fundamentals</Button>
            <Button onClick={() => handleClick("Full-Stack Gauntlet")} variant="destructive" size="lg" className="w-full">Full-Stack Gauntlet</Button>
        </div>
    );
}
