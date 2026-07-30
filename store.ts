import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Import persist middleware


{
    /*
1. Data LifeCycle (client RAM -> browser Storage)
State Variables
- selected Category: string | null (current game topic)
- Score: number (current progress of the user)
2. State Mutators ( functions that change memory safely):
- setCategory(): updates active progress for user
- incrementScore(): Pure immutable increment (state.score + 1)
- resetGame(): Wipes memory state back to initial nulls after the game finishes
*/
}

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
            name: "Youssef-gauntlet-storage",
        },
    ),
);
