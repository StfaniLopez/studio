'use server';
/**
 * @fileOverview An AI agent for generating optimal graduation paths for students.
 *
 * - generateOptimalGraduationPaths - A function that generates an optimal graduation path.
 * - GenerateOptimalGraduationPathsInput - The input type for the generateOptimalGraduationPaths function.
 * - GenerateOptimalGraduationPathsOutput - The return type for the generateOptimalGraduationPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOptimalGraduationPathsInputSchema = z.object({
  completedCourses: z
    .array(z.string())
    .describe('A list of course codes that the student has already completed.'),
  remainingRequirements: z
    .array(z.string())
    .describe(
      'A list of course codes that the student still needs to complete in order to graduate.'
    ),
  desiredGraduationTimeline: z
    .string()
    .describe(
      'The students desired graduation timeline, e.g. Fall 2024, Spring 2025, etc.'
    ),
  studentProfile: z
    .string()
    .optional()
    .describe(
      'Optional student profile including major, interests, and academic history to personalize elective recommendations.'
    ),
});
export type GenerateOptimalGraduationPathsInput = z.infer<
  typeof GenerateOptimalGraduationPathsInputSchema
>;

const GenerateOptimalGraduationPathsOutputSchema = z.object({
  optimalPath: z
    .array(z.string())
    .describe(
      'A list of course codes representing the optimal graduation path, ordered by semester.'
    ),
  electiveRecommendations: z
    .array(z.string())
    .describe(
      'A list of recommended elective courses based on the student profile.'
    ),
  estimatedGraduationTime: z
    .string()
    .describe(
      'An estimated graduation time based on the optimal path and desired timeline.'
    ),
});
export type GenerateOptimalGraduationPathsOutput = z.infer<
  typeof GenerateOptimalGraduationPathsOutputSchema
>;

export async function generateOptimalGraduationPaths(
  input: GenerateOptimalGraduationPathsInput
): Promise<GenerateOptimalGraduationPathsOutput> {
  return generateOptimalGraduationPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOptimalGraduationPathsPrompt',
  input: {schema: GenerateOptimalGraduationPathsInputSchema},
  output: {schema: GenerateOptimalGraduationPathsOutputSchema},
  prompt: `You are a university graduation planning assistant. You will analyze a student's completed courses, remaining requirements, and desired graduation timeline to generate an optimal path for completing their degree.

  Completed Courses: {{completedCourses}}
  Remaining Requirements: {{remainingRequirements}}
  Desired Graduation Timeline: {{desiredGraduationTimeline}}
  Student Profile: {{studentProfile}}

  Based on this information, generate an optimal graduation path, recommend electives, and estimate the graduation time.
  The optimal path should be a list of course codes ordered by semester.
  The elective recommendations should be a list of course codes based on the student profile.
  The estimated graduation time should be a string.
  Make sure to consider course prerequisites when generating the optimal path.
  The optimal path should be as efficient as possible, allowing the student to graduate on time.
`,
});

const generateOptimalGraduationPathsFlow = ai.defineFlow(
  {
    name: 'generateOptimalGraduationPathsFlow',
    inputSchema: GenerateOptimalGraduationPathsInputSchema,
    outputSchema: GenerateOptimalGraduationPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
