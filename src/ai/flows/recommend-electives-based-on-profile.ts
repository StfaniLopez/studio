'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending electives based on a student's profile.
 *
 * It includes:
 * - `recommendElectivesBasedOnProfile`: An asynchronous function that takes student information and returns elective recommendations.
 * - `RecommendElectivesBasedOnProfileInput`: The input type for the `recommendElectivesBasedOnProfile` function.
 * - `RecommendElectivesBasedOnProfileOutput`: The output type for the `recommendElectivesBasedOnProfile` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendElectivesBasedOnProfileInputSchema = z.object({
  academicHistory: z.string().describe('A summary of the student\'s academic history, including courses taken and grades.'),
  interests: z.string().describe('A description of the student\'s interests and hobbies.'),
  careerGoals: z.string().describe('A description of the student\'s career goals and aspirations.'),
});
export type RecommendElectivesBasedOnProfileInput = z.infer<typeof RecommendElectivesBasedOnProfileInputSchema>;

const RecommendElectivesBasedOnProfileOutputSchema = z.object({
  electiveRecommendations: z.array(z.string()).describe('A list of recommended electives based on the student\'s profile.'),
  reasoning: z.string().describe('The reasoning behind the elective recommendations.'),
});
export type RecommendElectivesBasedOnProfileOutput = z.infer<typeof RecommendElectivesBasedOnProfileOutputSchema>;

export async function recommendElectivesBasedOnProfile(input: RecommendElectivesBasedOnProfileInput): Promise<RecommendElectivesBasedOnProfileOutput> {
  return recommendElectivesBasedOnProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendElectivesBasedOnProfilePrompt',
  input: {schema: RecommendElectivesBasedOnProfileInputSchema},
  output: {schema: RecommendElectivesBasedOnProfileOutputSchema},
  prompt: `You are a university academic advisor. A student has provided their academic history, interests, and career goals.  Based on this information, recommend a list of electives that would be a good fit for them, and explain your reasoning.

Academic History: {{{academicHistory}}}
Interests: {{{interests}}}
Career Goals: {{{careerGoals}}}

Format your response as a list of electives followed by a paragraph explaining the reasoning behind your suggestions.`,
});

const recommendElectivesBasedOnProfileFlow = ai.defineFlow(
  {
    name: 'recommendElectivesBasedOnProfileFlow',
    inputSchema: RecommendElectivesBasedOnProfileInputSchema,
    outputSchema: RecommendElectivesBasedOnProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
