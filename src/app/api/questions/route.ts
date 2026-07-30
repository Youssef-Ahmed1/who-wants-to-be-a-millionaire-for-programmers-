import { connectToDatabase } from "@/lib/mongodb";
import { Question } from "@/models/Question";
import { NextRequest } from "next/server";


{
    /*

this file contains mulitple functions which are:
shuffleArray which shuffles the array and make it

    */
}
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

        easy = easy || [];
        medium = medium || [];
        hard = hard || [];

        let questions = [...easy, ...medium, ...hard].sort(
            (a, b) => a.level - b.level,
        );

        if (questions.length < 15 && questions.length > 0) {
            const total = questions.length;
            while (questions.length < 15) {
                const randomIndex = Math.floor(Math.random() * total);
                questions.push({ ...questions[randomIndex], _id: undefined });
            }
        }

        if (questions.length === 0) {
            return Response.json(
                { error: "No questions available for this category" },
                { status: 404 },
            );
        }

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
