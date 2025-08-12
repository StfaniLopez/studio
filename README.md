# GradPath-AI Planner
New UniGrad-AI

GradPath-AI Planner is an intelligent, AI-powered university graduation planner designed to help students navigate their academic journey. It provides personalized recommendations, optimal course paths, and graduation predictions to ensure students stay on track and achieve their academic goals efficiently.

## Features

- **Optimal Path Generation**: Generates the most efficient semester-by-semester course plan based on your completed courses and remaining requirements.
- **AI-Powered Elective Recommendations**: Suggests elective courses tailored to your academic history, interests, and career aspirations.
- **Graduation Time Prediction**: Forecasts your graduation date using your current progress, planned courses, and historical university data.
- **Interactive Dashboard**: A central hub to view your academic progress, completed courses, and pending requirements.

## Tech Stack

This application is built with a modern, integrated stack:

- **Framework**: [Next.js](https://nextjs.org/) with the App Router
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with the Google Gemini API
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## Application Architecture

The application is a server-rendered web app built entirely within the Next.js ecosystem.

- **Frontend**: The UI is built with **React** and **ShadCN UI** components, rendered on the server for optimal performance.
- **Backend**: Backend logic is handled by **Next.js Server Actions**, which integrate directly with **Genkit flows**.
- **AI**: All AI capabilities are powered by **Genkit**, which orchestrates calls to the **Google Gemini** models. The core logic is defined in flows located in `src/ai/flows/`.
- **Data**: For demonstration purposes, the application uses **hardcoded mock data** found in `src/lib/data.ts`. It does not currently use a database.

## Getting Started

To get this project running locally, follow these steps:

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### 2. Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add your Gemini API key:

```
GEMINI_API_KEY=YOUR_API_KEY_HERE
```

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

