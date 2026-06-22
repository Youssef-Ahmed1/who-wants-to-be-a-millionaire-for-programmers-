import {create} from 'zustand'

interface GameState {
    selectedCategory: string| null;
    score:number;
    currentQuestionIndex: number;
    setCategory: (cateogry:string) => void;
    incrementScore: ()=> void;
    nextQuestion: ()=> void;
    resetGame:()=>void;
}
export const useGameStore = create<GameState> ((set)=>({
    selectedCategory: null,
    score:0,
    currentQuestionIndex:0,

    setCategory: (category)=> set({selectedCategory: category}),
    incrementScore:()=>set((state) => ({score: state.score + 1})),
    nextQuestion: () => set((state)=>({currentQuestionIndex: state.currentQuestionIndex+1})),
      resetGame: () => set({ selectedCategory: null, score: 0, currentQuestionIndex: 0 })
}))
