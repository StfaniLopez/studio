'use server';

/**
 * @fileOverview This file contains the Genkit flow for predicting graduation time.
 *
 * - predictGraduationTime - A function that predicts the graduation time based on student data.
 * - PredictGraduationTimeInput - The input type for the predictGraduationTime function.
 * - PredictGraduationTimeOutput - The return type for the predictGraduationTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictGraduationTimeInputSchema = z.object({
  completedCredits: z
    .number()
    .describe('The number of credits the student has already completed.'),
  totalCreditsRequired: z
    .number()
    .describe('The total number of credits required for the degree.'),
  plannedCourses: z
    .string()
    .describe(
      'A list of planned courses, including course codes and credit values, e.g., `[CS101 (3 credits), MA201 (4 credits)]`.'
    ),
  averageGpa: z
    .number()
    .describe('The student’s current Grade Point Average (GPA).'),
  historicalGraduationData: z
    .string()
    .describe(
      'Summary of graduation rates and times for students in the same major over the past 5 years.'
    ),
});
export type PredictGraduationTimeInput = z.infer<typeof PredictGraduationTimeInputSchema>;

const PredictGraduationTimeOutputSchema = z.object({
  predictedGraduationTime: z
    .string()
    .describe(
      'The predicted graduation time, e.g., `Spring 2025` or `December 2024`.'
    ),
  confidenceLevel: z
    .string()
    .describe(
      'A qualitative estimate of the confidence level of the prediction, e.g., `High`, `Medium`, or `Low`.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of the factors influencing the prediction, including any assumptions made.'
    ),
});
export type PredictGraduationTimeOutput = z.infer<typeof PredictGraduationTimeOutputSchema>;

export async function predictGraduationTime(
  input: PredictGraduationTimeInput
): Promise<PredictGraduationTimeOutput> {
  return predictGraduationTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictGraduationTimePrompt',
  input: {schema: PredictGraduationTimeInputSchema},
  output: {schema: PredictGraduationTimeOutputSchema},
  prompt: `You are a university graduation advisor with extensive experience in predicting graduation times for students.

  Based on the student’s current progress, planned courses, GPA, and historical graduation data, predict the student’s graduation time.
  Also, determine a confidence level for your prediction and explain your reasoning.

  Completed Credits: {{{completedCredits}}}
  Total Credits Required: {{{totalCreditsRequired}}}
  Planned Courses: {{{plannedCourses}}}
  GPA: {{{averageGpa}}}
  Historical Graduation Data: {{{historicalGraduationData}}}

  Provide the predicted graduation time, confidence level, and reasoning in the output fields.`,
});

const predictGraduationTimeFlow = ai.defineFlow(
  {
    name: 'predictGraduationTimeFlow',
    inputSchema: PredictGraduationTimeInputSchema,
    outputSchema: PredictGraduationTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
