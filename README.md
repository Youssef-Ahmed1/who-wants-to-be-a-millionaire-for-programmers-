
#  Who Wants To Be A Developer?


 A high-stakes like fun game where you have fun know more about programming game with timed technical interview simulator where every wrong answer costs you the job.


**Live Demo:** https://who-wants-to-be-a-millionaire-for-p.vercel.app

---

##  The Challenges

[ I built this to be a more fun way to consume knowldege a flashcards like project, Instead of boring flashcards you face a 15-second timer and a career ladder that tracks your progression from 'Applicant' to 'CTO' so you feel something at stake.]

---

## Tech Stack


- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js (Credentials Provider) with bcrypt
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Testing:** Jest (Unit) & Playwright (E2E)
- **Deployment:** Vercel

---

##  Core Features


- ** Timed Questions:** 15-second countdown with auto-fail and ticking sound effects.
- ** Career Ladder:** Progression from "Applicant" to "CTO" with salary milestones.

- ** Lifelines:**
  - `rm -rf 50%` (Removes two wrong answers)
  - StackOverflow (Audience poll showing vote distribution)
  -  Phone a Friend (Personality-driven hints based on difficulty level)
- ** Authentication:** Full sign-up/login flow with persistent high scores.
- ** Leaderboard:** Global ranking of top developers.
- ** Responsive:** Seamless experience from desktop to mobile.

---

## Screenshots

![Gameplay Screenshot](public/images/image_for_who_wants_to_be_a_millionaire.png),
![Gameplay Screenshot 2](public/images/image_for_who_wants_to_be_a_millionaire_2.png)
---

## Getting Started (Local Development)


1. **Clone the repository:**
   ```bash
   git clone https://github.com/Youssef-Ahmed1/who-wants-to-be-a-millionaire-for-programmers-.git
   cd coding-millionaire
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Seed the database:**
   (Optional) Run the seed script to populate questions and a test user.
   ```bash
   npm run seed
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

---

##  Testing


- **Unit Tests (Jest):** `npm run test`
- **E2E Tests (Playwright):** `npx playwright test`

---

##  Project Structure
src/
├── app/          # Next.js App Router (Pages, API routes)
├── components/   # Reusable UI components (Ladder, Cards, Buttons)
├── lib/          # Pure logic (Lifelines, Scoring, DB connection)
├── models/       # MongoDB schemas (User, Question)
├── store/        # Zustand global state
└── types/        # TypeScript interfaces





---

##  Future Improvements


- [ ] Multiplayer mode (Socket.io)
- [ ] Question editor (Admin dashboard)
- [ ] Achievement badges
- [ ] PWA support for offline play
- [ ] AI chatbot to tell you why this answer is right
---

## About the Author

 am a Full-Stack Software Engineer specializing in modern MERN stack development, scalable backend architecture, and relational database management.

I bridge the gap between complex server logic and clean, dynamic user interfaces. In my recent role as a Full-Stack Engineer at Glowply, I architected custom RESTful APIs, optimized MySQL database queries, and led refactoring sprints to secure authentication pipelines (migrating from legacy token storage to robust HttpOnly cookie architectures).

My engineering philosophy is built on Defensive Programming and Separation of Concerns. I don’t just write code that works on the "happy path"—I anticipate failure matrices, enforce strict data validation, and optimize execution contexts to ensure the server remains stable under load. Whether I am writing raw SQL JOIN queries or decoupling complex React state, I prioritize clean, maintainable, Object-Oriented architecture.

GITHUB: https://github.com/Youssef-Ahmed1 |
 LINKDIN: https://www.linkedin.com/in/youssef-ahmed-yyoussefdoinwork

---

## License

This project is open source and available under the [MIT License](LICENSE).



