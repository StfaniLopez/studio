# Application Architecture

This document provides a detailed overview of the technical architecture of the GradPath application.

## Overview

GradPath is a modern web application built with Next.js and Firebase. It leverages server-side rendering (SSR) and server components for performance, Genkit for AI-powered features, and Firebase for user authentication.

## Directory Structure

The project follows a standard Next.js App Router structure.

```
/
├── public/                 # Static assets
├── src/
│   ├── ai/                 # Genkit AI implementation
│   │   ├── flows/          # Core AI logic flows
│   │   └── genkit.ts       # Genkit configuration
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── (auth)/         # Route group for auth pages (login, signup)
│   │   ├── (main)/         # Route group for main app pages (dashboard)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main dashboard page
│   ├── components/         # Reusable React components
│   │   ├── dashboard/      # Components specific to the dashboard
│   │   └── ui/             # ShadCN UI components
│   ├── context/            # React context providers (e.g., AuthContext)
│   ├── hooks/              # Custom React hooks (e.g., useToast)
│   ├── lib/                # Core libraries and utilities
│   │   ├── actions.ts      # Next.js Server Actions
│   │   ├── data.ts         # Mock data for the application
│   │   ├── firebase.ts     # Firebase configuration and initialization
│   │   └── utils.ts        # Utility functions
│   └── types/              # TypeScript type definitions
├── .env                    # Environment variables
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Technology Deep Dive

### Framework: Next.js

- **App Router**: We use the App Router for file-based routing, server components, and layouts. This improves performance and developer experience.
- **Server Components**: Most components are rendered on the server by default to reduce the amount of JavaScript sent to the client, leading to faster initial page loads. Client-side interactivity is enabled where needed with the `"use client"` directive.
- **Server Actions**: Backend logic for forms and data mutations is handled using Server Actions. These functions are defined on the server and can be called directly from client components, simplifying the process of handling form submissions without needing to create separate API endpoints. Our server actions are located in `src/lib/actions.ts`.

### Authentication: Firebase

- **Firebase Authentication**: Manages user sign-up, sign-in, and session management. It provides a secure and easy-to-use authentication system.
- **Auth Context**: A React Context (`src/context/AuthContext.tsx`) provides authentication state (user, loading status) to the entire application, making it easy to protect routes and display user-specific information.

### AI: Genkit

- **Genkit Flows**: The core AI logic is encapsulated in Genkit flows, located in `src/ai/flows/`. Each flow defines a specific AI task, such as generating an optimal graduation path or recommending electives.
- **Zod Schemas**: We use Zod to define the input and output schemas for our Genkit flows. This ensures that the data passed to and from the AI model is strongly typed and validated.
- **Server-Side Execution**: Genkit flows are executed securely on the server, triggered by Next.js Server Actions. This keeps API keys and proprietary logic safe.

### UI and Styling

- **ShadCN UI**: We use ShadCN UI for our component library. These are accessible, unstyled components that can be easily customized.
- **Tailwind CSS**: Styling is handled with Tailwind CSS, a utility-first CSS framework that allows for rapid UI development.
- **Theme**: The application's color scheme and theming are defined in `src/app/globals.css` using CSS variables, making it easy to customize the look and feel.

## Data Flow Example: Generating an Optimal Path

1.  **User Interaction**: The user fills out the "Optimal Path Generator" form in the `OptimalPathGenerator.tsx` client component.
2.  **Server Action**: On form submission, the component calls the `generatePathAction` Server Action defined in `src/lib/actions.ts`.
3.  **Genkit Flow**: The Server Action invokes the `generateOptimalGraduationPaths` function from `src/ai/flows/generate-optimal-graduation-paths.ts`.
4.  **AI Model Call**: The Genkit flow makes a call to the Google Gemini API with the user's data, using a structured prompt to request the optimal path.
5.  **Response**: The AI model returns a structured JSON object (validated by Zod) containing the recommended path and electives.
6.  **UI Update**: The Server Action returns the result to the client component, which then updates its state to display the generated path to the user.
