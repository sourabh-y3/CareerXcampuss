'use server';

import { careerGuidanceChatbot } from '@/ai/flows/ai-career-guidance-chatbot';

export async function getChatbotResponse(message: string) {
  try {
    const result = await careerGuidanceChatbot({ query: message });
    return { response: result.response };
  } catch (error) {
    console.error('Error in chatbot server action:', error);
    return { error: 'Sorry, I encountered an error. Please try again.' };
  }
}
