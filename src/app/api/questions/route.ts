import { mockQuestions } from "@/data/mockQuestions";
import { error } from "console";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    if (!category) {
        return Response.json(
            { error: "category is required" },
            { status: 400 },
        );
    }
    const filteredQuestions = mockQuestions.filter((mockQuestion) => {
        return (
            mockQuestion.category.toLocaleLowerCase() ===
            category.toLocaleLowerCase()
        );
    });
    return Response.json(filteredQuestions);
}
