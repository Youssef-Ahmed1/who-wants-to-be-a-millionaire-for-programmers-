import { Question } from "@/models/Question"
import { mockQuestions } from "@/data/mockQuestions";

export async function GET(request: Request) {

    return Response.json(mockQuestions)

}
