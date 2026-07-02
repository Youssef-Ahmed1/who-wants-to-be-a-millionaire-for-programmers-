// src/lib/actions.ts
"use server"; // THIS IS MANDATORY!

import { connectToDatabase } from "./mongodb";
import { Question } from "../models/Question";
import { mockQuestions } from "../data/mockQuestions";
import { signIn } from "@/auth";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { auth } from "../auth";
export async function seedDatabase() {
    try {
        await connectToDatabase();

        await Question.deleteMany({});
        await User.deleteMany({});

        const hashedPassword = await bcrypt.hash("password123", 10);

        await User.create({
            name: "Senior Engineer",
            email: "test@test.com",
            password: hashedPassword,
            highScore: 0,
        });
        await Question.insertMany(mockQuestions);

        console.log(" DATABASE AND USERS SUCCESSFULLY SEEDED!");
        return { success: true };
    } catch (error) {
        console.error("Seeding Error:", error);
        throw new Error("Failed to seed database");
    }
}
export async function saveHighScore(newScore: number) {
    await connectToDatabase();
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Must be logged in to save score");
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


export async function authenticate(formData: FormData) {
    try {
        const formValues = Object.fromEntries(formData);
        await signIn("credentials", { ...formValues, redirectTo: "/" });
    } catch (error) {
        if ((error as any).type === "CredentialsSignin") {
            throw new Error("Invalid credentials.");
        }
        throw error;
    }
}
export async function getRandomQuestions(category: string) {
    try {
        await connectToDatabase();
        const randomQuestions = await Question.aggregate([
            { $match: { category: category } },
            { $sample: { size: 5 } },
        ]);

        return JSON.parse(JSON.stringify(randomQuestions));
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch questions");
    }
}
