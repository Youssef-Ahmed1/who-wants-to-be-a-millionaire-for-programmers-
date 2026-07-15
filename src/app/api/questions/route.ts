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

        // Fetch questions from the database
        const [easy, medium, hard] = await Promise.all([
            Question.aggregate([
                { $match: { category: category, level: 1 } },
                { $sample: { size: 8 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 2 } },
                { $sample: { size: 6 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 3 } },
                { $sample: { size: 4 } },
            ]),
        ]);

        const questions = [...easy, ...medium, ...hard];

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
