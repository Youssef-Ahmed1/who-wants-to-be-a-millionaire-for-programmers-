// src/lib/actions.ts
"use server"; // THIS IS MANDATORY!

import { connectToDatabase } from "./mongodb";
import { Question } from "../models/Question";
import { mockQuestions } from "../data/mockQuestions";


export async function seedDatabase() {
    try {
        await connectToDatabase();

        // 1. Wipe the old database clean so we don't get duplicates if we click it twice!
        await Question.deleteMany({});

        // 2. Insert the mock questions into MongoDB
        await Question.insertMany(mockQuestions);

        console.log("🌱 DATABASE SUCCESSFULLY SEEDED!");
        return { success: true };
    } catch (error) {
        console.error("Seeding Error:", error);
        throw new Error("Failed to seed database");
    }
}
export async function getRandomQuestions(category: string) {
    try {
        // 1. Connect to the DB
        await connectToDatabase();

        // 2. The MongoDB Aggregation Pipeline
        // This asks Mongo to find questions matching the category, and grabs 5 random ones!
        const randomQuestions = await Question.aggregate([
            { $match: { category: category } },
            { $sample: { size: 5 } }
        ]);

        // 3. We must convert complex MongoDB objects to plain JavaScript objects before sending to React!
        return JSON.parse(JSON.stringify(randomQuestions));

    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch questions");
    }
}
