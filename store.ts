import {create} from 'zustand'

interface GameState {
    selectedCategory: string | null;
    score: number;
    setCategory: (cateogry: string) => void;
    incrementScore: () => void;
    resetGame: () => void;
}
export const useGameStore = create<GameState>((set) => ({
    selectedCategory: null,
    score: 0,

    setCategory: (category) => set({ selectedCategory: category }),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    resetGame: () => set({ selectedCategory: null, score: 0 }),
}));
