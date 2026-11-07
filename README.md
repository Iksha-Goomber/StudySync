# StudySync — AI Academic Planner

StudySync is a Vercel-ready academic planning web app. It helps students capture assignments, quizzes, exams and study tasks, then ranks them using deadline urgency, difficulty and estimated effort.

## Features

- **Dashboard:** task totals, completion rate, upcoming workload and priority list.
- **Task management:** add, complete, search and delete academic tasks.
- **Smart prioritization:** deterministic scoring based on deadline (55%), difficulty (30%) and estimated effort (15%).
- **Study planner:** set available study hours and receive a recommended focus order.
- **Optional Gemini AI plan:** generates a natural-language study plan using your pending tasks and study goal.
- **Calendar export:** export deadlines as an `.ics` file for Google Calendar, Apple Calendar or Outlook.
- **Local-first storage:** tasks persist in the browser using localStorage. No account or database setup is required.

## Tech stack

Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Lucide icons, Gemini API (optional), Vercel.

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Enable AI planning

1. Create a Gemini API key at https://aistudio.google.com/app/apikey.
2. Copy `.env.example` to `.env.local`.
3. Set `GEMINI_API_KEY=your_real_key`.
4. Restart the development server.

The smart priority ranking works without an API key. The AI-generated narrative plan requires the key. Keep the key server-side; never add it to a `NEXT_PUBLIC_` variable.

## Deploy on Vercel

1. Push this project to a GitHub repository.
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the `studysync` GitHub repository.
4. Vercel should detect Next.js automatically. Keep the default build settings.
5. (Optional) Add `GEMINI_API_KEY` under **Project → Settings → Environment Variables**.
6. Click **Deploy**.

## Push to GitHub

Create an empty repository on GitHub, then run these commands from this project folder:

```bash
git init
git add .
git commit -m "Build StudySync AI academic planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studysync.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Data and privacy notes

- Task data is stored in the current browser's localStorage. It is not synced between devices or browsers.
- Calendar export creates a file on your device; it does not connect to or modify a calendar account.
- If AI is enabled, pending task details and the study goal are sent to the Gemini API to generate the requested plan. Do not enter sensitive personal information in task notes.
- This starter does not include user accounts, cloud database sync, reminders or automatic Google Calendar OAuth integration. Those require additional services and credentials.

## Project structure

```text
studysync/
├── app/
│   ├── api/plan/route.ts     # Secure server-side Gemini API endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Dashboard and planner UI
├── lib/planner.ts            # Priority algorithm and schedule helper
├── .env.example
├── package.json
└── README.md
```

## Priority score

A task receives a score from 0–100:

`score = 0.55 × urgency + 0.30 × difficulty + 0.15 × effort`

- Urgency rises as the deadline approaches.
- Difficulty is based on the student's 1–5 rating.
- Effort increases with estimated hours, capped to avoid dominating the score.

This is a transparent heuristic, not a trained machine-learning model. The AI feature adds natural-language planning on top of the deterministic ranking.
