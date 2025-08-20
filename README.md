# GradPath - LEAD University

GradPath is an intelligent, AI-powered university graduation planner designed to help students at LEAD University navigate their academic journey. It provides personalized recommendations, optimal course paths, and graduation predictions to ensure students stay on track and achieve their academic goals efficiently.

## Features

- **User Authentication**: Secure sign-up and login functionality using Firebase Authentication.
- **Interactive Dashboard**: A central hub to view your academic progress, completed courses, and pending requirements.
- **AI-Powered Optimal Path Generation**: Generates the most efficient semester-by-semester course plan based on your completed courses and remaining requirements.
- **AI-Powered Elective Recommendations**: Suggests elective courses tailored to your academic history, interests, and career aspirations.
- **AI-Powered Graduation Time Prediction**: Forecasts your graduation date using your current progress, planned courses, and historical university data.

## Tech Stack

This application is built with a modern, integrated stack:

- **Framework**: [Next.js](https://nextjs.org/) with the App Router
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with the Google Gemini API
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation

## Application Architecture

The application is a server-rendered web app built entirely within the Next.js ecosystem. For a more detailed breakdown, see [ARCHITECTURE.md](ARCHITECTURE.md).

- **Frontend**: The UI is built with **React** and **ShadCN UI** components, rendered on the server for optimal performance. Client-side state is managed with React Context for authentication.
- **Backend**: Backend logic is handled by **Next.js Server Actions**, which integrate directly with **Genkit flows**.
- **Authentication**: User identity and access are managed by **Firebase Authentication**.
- **AI**: All AI capabilities are powered by **Genkit**, which orchestrates calls to the **Google Gemini** models. The core logic is defined in flows located in `src/ai/flows/`.
- **Data**: For demonstration purposes, the application uses **hardcoded mock data** found in `src/lib/data.ts`. It does not currently use a database.

## Getting Started

To get this project running locally, follow these steps:

### 1. Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase project

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

### 4. Configure Firebase

In the `src/lib/firebase.ts` file, replace the placeholder `firebaseConfig` object with your actual Firebase project configuration. You can get this from the Firebase console in your project's settings.

### 5. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
