import {Question }from "../types";

export const mockQuestions: Question[] = [  {
    id: "1",
    question: "Which of the following is NOT a JavaScript framework?",
    options: ["React", "Vue", "Laravel", "Svelte"],
    correctAnswer: "Laravel",
    category: "Frontend",
    level: 1,


  },
   { id:"2",
    question:"what does mysql stand for",
    options:["My Structured Query Language.", "Management systems Query Language." ,"master systems query Language." , "doesn't stand for anything it's just mysql"],
        correctAnswer: "My Structured Query Language.",
        category:"backend",
        level:1,
    },
];

export default mockQuestions;
