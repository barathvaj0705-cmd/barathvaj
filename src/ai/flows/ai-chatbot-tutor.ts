'use server';
/**
 * @fileOverview An AI chatbot tutor that answers questions, explains concepts, and offers guidance.
 *
 * - aiChatbotTutor - A function that handles the chatbot tutoring process.
 * - AIChatbotTutorInput - The input type for the aiChatbotTutor function.
 * - AIChatbotTutorOutput - The return type for the aiChatbotTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotTutorInputSchema = z.object({
  question: z.string().describe('The student\u2019s question.'),
});
export type AIChatbotTutorInput = z.infer<typeof AIChatbotTutorInputSchema>;

const AIChatbotTutorOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot\u2019s answer to the question.'),
});
export type AIChatbotTutorOutput = z.infer<typeof AIChatbotTutorOutputSchema>;

export async function aiChatbotTutor(input: AIChatbotTutorInput): Promise<AIChatbotTutorOutput> {
  return aiChatbotTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotTutorPrompt',
  input: {schema: AIChatbotTutorInputSchema},
  output: {schema: AIChatbotTutorOutputSchema},
  prompt: `You are an AI chatbot tutor. Answer the following question from the student:\n\nQuestion: {{{question}}}`,
});

const aiChatbotTutorFlow = ai.defineFlow(
  {
    name: 'aiChatbotTutorFlow',
    inputSchema: AIChatbotTutorInputSchema,
    outputSchema: AIChatbotTutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
