// src/lib/actions.ts
"use server";

import { connectToDatabase } from "./mongodb";
import { Question } from "../models/Question";
//import { mockQuestions } from "../data/mockQuestions";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { auth } from "../auth";

// export async function seedDatabase() {
//     try {
//         await connectToDatabase();

//         console.log(
//             `📦 Attempting to seed ${mockQuestions.length} questions...`,
//         );

//         await Question.deleteMany({});
//         await User.deleteMany({});

//         const hashedPassword = await bcrypt.hash("smileyCat123", 10);

//         await User.create({
//             name: "Senior Engineer",
//             email: "test@test.com",
//             password: hashedPassword,
//             highScore: 0,
//         });

//         // ✅ Insert with ordered: false to skip errors and insert all valid documents
//         try {
//             const result = await Question.insertMany(mockQuestions, {
//                 ordered: false,
//             });
//             console.log(`✅ Inserted ${result.length} questions successfully`);
//         } catch (error: any) {
//             // If some documents fail, log the errors but continue
//             if (error.writeErrors) {
//                 console.log(
//                     `⚠️ Inserted ${error.insertedDocs?.length || 0} questions`,
//                 );
//                 console.log(
//                     `❌ ${error.writeErrors.length} documents failed to insert:`,
//                 );
//                 error.writeErrors.forEach((e: any) => {
//                     console.log(`   - ${e.errmsg}`);
//                 });
//             } else {
//                 throw error;
//             }
//         }

//         console.log("✅ DATABASE AND USERS SUCCESSFULLY SEEDED!");
//         return { success: true };
//     } catch (error) {
//         console.error("Seeding Error:", error);
//         return { error: "Failed to seed database" };
//     }
// }
export async function saveHighScore(newScore: number) {
    await connectToDatabase();
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Must be logged in to save score" };
    }

    const user = await User.findOne({ email: session.user.email });

    if (newScore > user.highScore) {
        user.highScore = newScore;
        await user.save();
        console.log(`🏆 New High Score saved for ${user.name}!: $${newScore}`);
        return { success: true, message: "New High Score!" };
    }

    return { success: true, message: "Score did not beat high score." };
}

export async function authenticate(
    prevState: { error: string | null } | undefined,
    formData: FormData,
): Promise<{ error: string | null }> {
    try {
        const formValues = Object.fromEntries(formData);
        console.log("LOGIN ATTEMPT WITH:", formValues);
        await signIn("credentials", { ...formValues, redirectTo: "/" });
        return { error: null }; // Success
    } catch (error) {
        if ((error as any).type === "CredentialsSignin") {
            return { error: "Invalid credentials." };
        }
        throw error; // Re-throw unexpected errors
    }
}
export async function getRandomQuestions(category: string) {
    try {
        await connectToDatabase();

        const [easy, medium, hard] = await Promise.all([
            Question.aggregate([
                { $match: { category: category, level: 1 } },
                { $sample: { size: 2 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 2 } },
                { $sample: { size: 2 } },
            ]),
            Question.aggregate([
                { $match: { category: category, level: 3 } },
                { $sample: { size: 1 } },
            ]),
        ]);

        const questions = [...easy, ...medium, ...hard];
        return JSON.parse(JSON.stringify(questions));
    } catch (error) {
        console.error("Database Error:", error);
        return { error: "Failed to fetch questions" };
    }
}

export async function registerUser(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
       if (!name || !email || !password) {
           return { error: "All fields are required." };
       }
        if (password.length < 8) {
            return { error: "password must be at least 8 characters." };
        }
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: "An account with this email already exists." };
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({
            name,
            email,
            password: hashedPassword,
            highScore: 0,
        });
        return { success: true };
    } catch (error: any) {
        console.error("Registration Error:", error);
        return { error: "Failed to register user." };
    }
}
