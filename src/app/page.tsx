
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useGameStore } from "../../store";
import { useRouter } from 'next/navigation';

export default function Home() {
const { setCategory   } = useGameStore();
const router = useRouter();
 const handleClick = (category:string) => {
      setCategory(category)
  router.push("/play")
  }
  return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4">
          <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
                  Who Wants To be a dev senior?
              </h1>
              <p className="text-xl text-slate-400">
                  win your spot as a dev senior
              </p>
          </div>

          <Card className="w-full max-w-md bg-slate-900 border-slate-800">
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">
                      Select your path
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                      Choose your technical interview path.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                  <Button
                      onClick={() => handleClick("Frontend Mastery")}
                      variant="default"
                      size="lg"
                      className="w-full
            bg-blue-600 hover:bg-blue-700"
                  >
                      Frontend Mastery
                  </Button>
                  <Button
                      onClick={() => handleClick("Backend Architecture")}
                      variant="default"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                      Backend Architecture
                  </Button>
                  <Button
                      onClick={() => handleClick("CS Fundamentals")}
                      variant="default"
                      size="lg"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                      CS Fundamentals
                  </Button>
                  <Button
                      onClick={() => handleClick("Full-Stack Gauntlet")}
                      variant="destructive"
                      size="lg"
                      className="w-full"
                  >
                      Full-Stack mix
                  </Button>
              </CardContent>
              //
          </Card>
      </main>
  );
}
