'use server';

/**
 * @fileOverview An AI agent that analyzes chatbot interaction history and quiz performance to provide personalized revision guidance.
 *
 * - personalizedRevisionWithAI - A function that orchestrates the analysis and guidance process.
 * - PersonalizedRevisionWithAIInput - The input type for the personalizedRevisionWithAI function.
 * - PersonalizedRevisionWithAIOutput - The return type for the personalizedRevisionWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRevisionWithAIInputSchema = z.object({
  chatHistory: z
    .string()
    .describe('The complete chat history between the student and the chatbot.'),
  quizHistory: z
    .string()
    .describe(
      'A summary of the student\'s quiz performance, including topics, scores, and dates.'
    ),
});
export type PersonalizedRevisionWithAIInput = z.infer<
  typeof PersonalizedRevisionWithAIInputSchema
>;

const PersonalizedRevisionWithAIOutputSchema = z.object({
  revisionGuidance: z
    .string()
    .describe(
      'Personalized revision guidance based on the chat history and quiz performance analysis.'
    ),
});
export type PersonalizedRevisionWithAIOutput = z.infer<
  typeof PersonalizedRevisionWithAIOutputSchema
>;

export async function personalizedRevisionWithAI(
  input: PersonalizedRevisionWithAIInput
): Promise<PersonalizedRevisionWithAIOutput> {
  return personalizedRevisionWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRevisionWithAIPrompt',
  input: {schema: PersonalizedRevisionWithAIInputSchema},
  output: {schema: PersonalizedRevisionWithAIOutputSchema},
  prompt: `You are an AI-powered revision assistant. Analyze the student's chat history with the tutor chatbot and their quiz performance to identify areas for improvement and provide personalized revision guidance.

Chat History:
{{chatHistory}}

Quiz History:
{{quizHistory}}

Based on this information, what specific topics should the student focus on reviewing? What study strategies or resources would you recommend to help them improve their understanding and quiz scores? Provide detailed and actionable advice.

Revision Guidance:`,
});

const personalizedRevisionWithAIFlow = ai.defineFlow(
  {
    name: 'personalizedRevisionWithAIFlow',
    inputSchema: PersonalizedRevisionWithAIInputSchema,
    outputSchema: PersonalizedRevisionWithAIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
