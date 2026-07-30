import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Import persist middleware

interface GameState {
    selectedCategory: string | null;
    score: number;
    setCategory: (category: string) => void;
    incrementScore: () => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            selectedCategory: null,
            score: 0,

            setCategory: (category) => set({ selectedCategory: category }),
            incrementScore: () => set((state) => ({ score: state.score + 1 })),
            resetGame: () => set({ selectedCategory: null, score: 0 }),
        }),
        {
            name: "developer-gauntlet-storage", // 3. Unique key in localStorage
        },
    ),
);
