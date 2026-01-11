// use server'

/**
 * @fileOverview AI chatbot for personalized career guidance, college comparison explanations, and answering student queries.
 *
 * - careerGuidanceChatbot - A function that provides career guidance using the Gemini API.
 * - CareerGuidanceChatbotInput - The input type for the careerGuidanceChatbot function.
 * - CareerGuidanceChatbotOutput - The return type for the careerGuidanceChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerGuidanceChatbotInputSchema = z.object({
  query: z.string().describe('The query from the student.'),
});
export type CareerGuidanceChatbotInput = z.infer<typeof CareerGuidanceChatbotInputSchema>;

const CareerGuidanceChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type CareerGuidanceChatbotOutput = z.infer<typeof CareerGuidanceChatbotOutputSchema>;

export async function careerGuidanceChatbot(input: CareerGuidanceChatbotInput): Promise<CareerGuidanceChatbotOutput> {
  return careerGuidanceChatbotFlow(input);
}

const careerGuidanceChatbotPrompt = ai.definePrompt({
  name: 'careerGuidanceChatbotPrompt',
  input: {schema: CareerGuidanceChatbotInputSchema},
  output: {schema: CareerGuidanceChatbotOutputSchema},
  prompt: `You are a helpful AI career guidance chatbot designed to provide personalized career advice, college comparison explanations, and answer student queries. Answer the following question:

  {{query}}
  `,
});

const careerGuidanceChatbotFlow = ai.defineFlow(
  {
    name: 'careerGuidanceChatbotFlow',
    inputSchema: CareerGuidanceChatbotInputSchema,
    outputSchema: CareerGuidanceChatbotOutputSchema,
  },
  async input => {
    const {output} = await careerGuidanceChatbotPrompt(input);
    return output!;
  }
);
