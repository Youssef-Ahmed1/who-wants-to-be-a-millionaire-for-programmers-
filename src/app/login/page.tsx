// src/app/login/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/lib/actions";
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to save your high scores to the global leaderboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Notice this is a standard HTML form, but the 'action' will be a server function! */}
<form action={authenticate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* The Submit Button */}
            <Button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-500">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
