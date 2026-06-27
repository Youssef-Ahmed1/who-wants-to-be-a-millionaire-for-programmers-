// src/models/Question.ts
import mongoose, { Schema, Document } from "mongoose";

// 1. The Mongoose Schema
const questionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true }, // Array of strings
  correctAnswer: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: Number, required: true },
});

// 2. The Serverless Export Guard
// Check if the model already exists in memory. If not, build it!
export const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);
