import { config } from 'dotenv';
config();

import '@/ai/flows/generate-optimal-graduation-paths.ts';
import '@/ai/flows/predict-graduation-time.ts';
import '@/ai/flows/recommend-electives-based-on-profile.ts';