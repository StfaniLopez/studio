"use server";

import {
  generateOptimalGraduationPaths,
  type GenerateOptimalGraduationPathsInput,
} from '@/ai/flows/generate-optimal-graduation-paths';
import {
  predictGraduationTime,
  type PredictGraduationTimeInput,
} from '@/ai/flows/predict-graduation-time';
import {
  recommendElectivesBasedOnProfile,
  type RecommendElectivesBasedOnProfileInput,
} from '@/ai/flows/recommend-electives-based-on-profile';

export async function generatePathAction(
  input: GenerateOptimalGraduationPathsInput
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return await generateOptimalGraduationPaths(input);
}

export async function predictGraduationAction(
  input: PredictGraduationTimeInput
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return await predictGraduationTime(input);
}

export async function recommendElectivesAction(
  input: RecommendElectivesBasedOnProfileInput
) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }
  return await recommendElectivesBasedOnProfile(input);
}
