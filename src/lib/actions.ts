// src/lib/actions.ts
"use server";

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

        const hashedPassword = await bcrypt.hash("smileyCat123", 10);

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
                return { error: "Failed to seed database" };
    }
}
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


export async function authenticate(formData: FormData) {
    try {
        const formValues = Object.fromEntries(formData);
        await signIn("credentials", { ...formValues, redirectTo: "/" });
    } catch (error) {
        if ((error as any).type === "CredentialsSignin") {
        return { error: "Invalid credentials." };

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
