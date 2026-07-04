"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // THE UX UPGRADE: State to toggle the password visibility!
  const [showPassword, setShowPassword] = useState(false);

  // The Bulletproof Form Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the page reload
    setIsLoading(true);
    setError(null);

    // 1. We grab the form data EXACTLY at the moment of the click
    const formData = new FormData(e.currentTarget);

    // Quick Debugging Check: Let's prove the data is there!
    console.log("Sending Email:", formData.get("email"));

    try {
      // 2. Fire the Server Action
      const result = await registerUser(formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        router.push("/login"); // Route to login on success!
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 shadow-2xl p-8 rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {error && (
            <div className="text-red-500 text-sm font-bold text-center bg-red-500/10 p-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
            {/* The 'name' attribute is MANDATORY for FormData! */}
            <input id="name" name="name" type="text" required className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
            <input id="email" name="email" type="email" required className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
            <div className="relative">
              {/* Dynamic Type: Text or Password based on State! */}
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 pr-16 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {/* THE TOGGLE BUTTON */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-xs font-bold text-black hover:text-white transition-colors"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-md font-bold transition-all disabled:opacity-50">
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

      </div>
    </main>
  );
}
