"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";
{
    /*
  this is the main registration page that handles the UI
  */
}
export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    console.log("Sending Email:", formData.get("email"));

    try {
        const result = await registerUser(formData);

        if (result?.error) {
            setError(result.error);
        } else if (result?.success) {
            router.push("/login");
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
              <h1 className="text-2xl font-bold text-center mb-6">
                  Create an Account
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {error && (
                      <div className="text-red-500 text-sm font-bold text-center bg-red-500/10 p-3 rounded">
                          {error}
                      </div>
                  )}

                  <div className="flex flex-col gap-2">
                      <label
                          htmlFor="name"
                          className="text-sm font-medium text-slate-300"
                      >
                          Name
                      </label>
                      <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                  </div>

                  <div className="flex flex-col gap-2">
                      <label
                          htmlFor="email"
                          className="text-sm font-medium text-slate-300"
                      >
                          Email
                      </label>
                      <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="h-10 rounded-md border border-slate-700 bg-slate-800 px-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                  </div>

                  <div className="flex flex-col gap-2">
                      <label
                          htmlFor="password"
                          className="text-sm font-medium text-slate-300"
                      >
                          Password
                      </label>
                      <div className="relative">
                          <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              required
                              className="h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 pr-16 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                          <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2 text-xs font-bold text-black hover:text-white transition-colors"
                          >
                              {showPassword ? "HIDE" : "SHOW"}
                          </button>
                      </div>
                  </div>

                  <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-500 py-3 rounded-md font-bold transition-all disabled:opacity-50"
                  >
                      {isLoading ? "Creating Account..." : "Register"}
                  </button>
              </form>
          </div>
      </main>
  );
}
