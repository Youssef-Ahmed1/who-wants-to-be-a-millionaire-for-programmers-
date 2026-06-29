import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  highScore: { type: Number, default: 0 }, // We track their best run!
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
