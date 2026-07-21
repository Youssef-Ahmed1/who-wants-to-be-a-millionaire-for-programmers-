import { connectToDatabase } from "@/lib/mongodb";
import { Question } from "@/models/Question";
import { NextRequest } from "next/server";

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    if (!category) {
        return Response.json(
            { error: "category is required" },
            { status: 400 },
        );
    }

    try {
        await connectToDatabase();

        // ✅ Fetch as many as possible, with fallback
        let [easy, medium, hard] = await Promise.all([
            Question.aggregate([
                { $match: { category: category, level: 1 } },
                { $sample: { size: 5 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 2 } },
                { $sample: { size: 5 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 3 } },
                { $sample: { size: 5 } },
            ]),
        ]);

        // ✅ Convert MongoDB cursors to arrays
        easy = easy || [];
        medium = medium || [];
        hard = hard || [];

        // ✅ Combine and sort by level
        let questions = [...easy, ...medium, ...hard].sort(
            (a, b) => a.level - b.level,
        );

        // ✅ If we have fewer than 15 questions, duplicate some to fill the gap
        if (questions.length < 15 && questions.length > 0) {
            const total = questions.length;
            while (questions.length < 15) {
                const randomIndex = Math.floor(Math.random() * total);
                questions.push({ ...questions[randomIndex], _id: undefined });
            }
        }

        // ✅ If STILL no questions, return a fallback
        if (questions.length === 0) {
            return Response.json(
                { error: "No questions available for this category" },
                { status: 404 },
            );
        }

        // ✅ Shuffle options
        const shuffledQuestions = questions.map((q) => ({
            ...q,
            options: shuffleArray(q.options),
        }));

        return Response.json(shuffledQuestions);
    } catch (error) {
        console.error("API Error:", error);
        return Response.json(
            { error: "Failed to fetch questions" },
            { status: 500 },
        );
    }
}
