import {Question }from "../types";

export const mockQuestions: Question[] = [
    {
        id: "1",
        question: "Which of the following is NOT a JavaScript framework?",
        options: ["React", "Vue", "Laravel", "Svelte"],
        correctAnswer: "Laravel",
        category: "Frontend Mastery",
        level: 1,
    },
    // --- FRONTEND MASTERY ---
    {
        id: "f1",
        question:
            "In React, what happens if you mutate state directly (e.g., state.count = 1) instead of using setState?",
        options: [
            "The component re-renders immediately",
            "React throws a fatal compilation error",
            "The state updates, but the UI does not re-render",
            "The browser's localStorage is corrupted",
        ],
        correctAnswer: "The state updates, but the UI does not re-render",
        category: "Frontend Mastery",
        level: 1,
    },
    {
        id: "f2",
        question: "What is the primary purpose of the 'useMemo' hook in React?",
        options: [
            "To fetch data from an API",
            "To cache the result of a heavy calculation between re-renders",
            "To memorize the user's password in cookies",
            "To create a global Redux store",
        ],
        correctAnswer:
            "To cache the result of a heavy calculation between re-renders",
        category: "Frontend Mastery",
        level: 2,
    },
    {
        id: "f3",
        question: "In CSS Flexbox, what does 'justify-content: center' align?",
        options: [
            "Items along the cross axis",
            "Items along the main axis",
            "The entire container to the middle of the screen",
            "It forces text to align center",
        ],
        correctAnswer: "Items along the main axis",
        category: "Frontend Mastery",
        level: 1,
    },

    // --- BACKEND ARCHITECTURE ---
    {
        id: "2",
        question: "what does mysql stand for",
        options: [
            "My Structured Query Language.",
            "Management systems Query Language.",
            "master systems query Language.",
            "doesn't stand for anything it's just mysql",
        ],
        correctAnswer: "My Structured Query Language.",
        category: "Backend Architecture",
        level: 1,
    },
    {
        id: "b1",
        question:
            "What is the most secure way to store a JWT (JSON Web Token) to prevent Cross-Site Scripting (XSS) attacks?",
        options: [
            "In the browser's localStorage",
            "In the Redux global state",
            "In an HttpOnly, secure cookie",
            "As a URL query parameter",
        ],
        correctAnswer: "In an HttpOnly, secure cookie",
        category: "Backend Architecture",
        level: 2,
    },
    {
        id: "b2",
        question:
            "What does the 'N+1 Query Problem' refer to in database architecture?",
        options: [
            "A bug where the database adds 1 to every integer",
            "Executing a separate database query for every item in a loop instead of using a JOIN",
            "A MongoDB specific error when exceeding connection limits",
            "When an API returns one more JSON object than requested",
        ],
        correctAnswer:
            "Executing a separate database query for every item in a loop instead of using a JOIN",
        category: "Backend Architecture",
        level: 3,
    },
    {
        id: "b3",
        question:
            "In Express.js, what happens if you call 'return next(error)' inside a '.forEach()' loop?",
        options: [
            "The loop stops and the error is sent",
            "The server crashes with a 'Headers Already Sent' error because the loop keeps running",
            "Express automatically converts the loop to a for...of",
            "The database transaction is rolled back",
        ],
        correctAnswer:
            "The server crashes with a 'Headers Already Sent' error because the loop keeps running",
        category: "Backend Architecture",
        level: 3,
    },
    // --- CS FUNDAMENTALS ---
    {
        id: "c1",
        question:
            "What is the Time Complexity (Big O Notation) of finding a specific value in a JavaScript Object/Dictionary?",
        options: ["O(N)", "O(log N)", "O(N^2)", "O(1)"],
        correctAnswer: "O(1)",
        category: "CS Fundamentals",
        level: 2,
    },
    {
        id: "c2",
        question:
            "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        options: ["Queue", "Linked List", "Stack", "Binary Tree"],
        correctAnswer: "Stack",
        category: "CS Fundamentals",
        level: 1,
    },
    {
        id: "c3",
        question:
            "What does a 'RESTful' API rely on to determine the action being taken (Create, Read, Update, Delete)?",
        options: [
            "The JSON body payload",
            "The HTTP Methods (GET, POST, PUT, DELETE)",
            "The database schema",
            "The URL query strings",
        ],
        correctAnswer: "The HTTP Methods (GET, POST, PUT, DELETE)",
        category: "CS Fundamentals",
        level: 1,
    },

    // --- FULL-STACK GAUNTLET ---
    {
        id: "fs1",
        question:
            "In Next.js 14 App Router, what is the default rendering behavior of a component?",
        options: [
            "Client-Side Rendered (CSR)",
            "Server Component (RSC)",
            "Statically Generated HTML",
            "Single Page Application (SPA)",
        ],
        correctAnswer: "Server Component (RSC)",
        category: "Full-Stack Gauntlet",
        level: 2,
    },
    {
        id: "fs2",
        question: "When writing a SQL JOIN query, what does an INNER JOIN do?",
        options: [
            "Returns all records from the left table, and matched records from the right table",
            "Returns all records from both tables",
            "Returns only the records that have matching values in both tables",
            "Deletes mismatched records from the database",
        ],
        correctAnswer:
            "Returns only the records that have matching values in both tables",
        category: "Full-Stack Gauntlet",
        level: 2,
    },
    {
        id: "fs3",
        question:
            "Why should the frontend (React) never calculate the final price during an e-commerce checkout?",
        options: [
            "Because JavaScript math is inaccurate with decimals",
            "Because the user can manipulate the payload in the browser to change the price",
            "Because Stripe does not accept numbers from React",
            "Because it slows down the browser rendering",
        ],
        correctAnswer:
            "Because the user can manipulate the payload in the browser to change the price",
        category: "Full-Stack Gauntlet",
        level: 3,
    },
];
export default mockQuestions;
