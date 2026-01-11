'use server';

/**
 * @fileOverview A personalized course recommendation AI agent.
 *
 * - getPersonalizedCourseRecommendations - A function that returns personalized course recommendations.
 * - PersonalizedCourseRecommendationsInput - The input type for the getPersonalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the getPersonalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  aptitudeScores: z
    .record(z.number())
    .describe('A map of aptitude scores for different subjects.'),
  interests: z.array(z.string()).describe('A list of student interests.'),
  studentGoals: z.string().describe('The student high level goals and aspirations.'),
});

export type PersonalizedCourseRecommendationsInput =
  z.infer<typeof PersonalizedCourseRecommendationsInputSchema>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of recommended courses based on aptitude and interests.'),
  reasoning: z.string().describe('Explanation for the course recommendations.'),
});

export type PersonalizedCourseRecommendationsOutput =
  z.infer<typeof PersonalizedCourseRecommendationsOutputSchema>;

export async function getPersonalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {schema: PersonalizedCourseRecommendationsInputSchema},
  output: {schema: PersonalizedCourseRecommendationsOutputSchema},
  prompt: `You are an expert academic advisor specializing in providing personalized course recommendations to students based on their aptitude scores, interests, and goals.

  Given the following aptitude scores, interests, and goals, recommend a list of suitable courses and explain your reasoning.

  Aptitude Scores: {{aptitudeScores}}
  Interests: {{interests}}
  Student Goals: {{studentGoals}}

  Consider a wide range of courses and academic paths, and provide clear, concise explanations for each recommendation.
  Format the course recommendations as a list of strings.
`,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
