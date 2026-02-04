'use server';

import type { QuizResult, ChatMessage } from '@/lib/types';
import { personalizedRevisionWithAI } from '@/ai/flows/personalized-revision-with-ai';
import { aiChatbotTutor } from '@/ai/flows/ai-chatbot-tutor';

// MOCK DATA
const mockQuizHistory: QuizResult[] = [
  { id: '1', topic: 'Algebra', score: 8, totalQuestions: 10, completedAt: new Date('2024-05-20T10:30:00Z') },
  { id: '2', topic: 'Biology', score: 6, totalQuestions: 10, completedAt: new Date('2024-05-18T14:00:00Z') },
  { id: '3', topic: 'Algebra', score: 5, totalQuestions: 10, completedAt: new Date('2024-05-15T09:00:00Z') },
  { id: '4', topic: 'History', score: 9, totalQuestions: 10, completedAt: new Date('2024-05-12T16:45:00Z') },
];

const mockChatHistory: ChatMessage[] = [
    { id: '1', role: 'user', content: 'What is photosynthesis?', timestamp: new Date('2024-05-18T13:50:00Z') },
    { id: '2', role: 'assistant', content: 'Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight and turn it into chemical energy.', timestamp: new Date('2024-05-18T13:50:30Z') },
    { id: '3', role: 'user', content: 'Can you explain the quadratic formula?', timestamp: new Date('2024-05-15T08:55:00Z') },
    { id: '4', role: 'assistant', content: 'Of course! The quadratic formula is x = [-b ± sqrt(b²-4ac)] / 2a. It\'s used to find the roots of a quadratic equation in the form ax² + bx + c = 0.', timestamp: new Date('2024-05-15T08:55:45Z') },
];

export async function getQuizHistory(): Promise<QuizResult[]> {
  // In a real app, you would fetch this from a database for the logged-in user
  return Promise.resolve(mockQuizHistory);
}

export async function getChatHistory(): Promise<ChatMessage[]> {
  // In a real app, you would fetch this from a database for the logged-in user
  return Promise.resolve(mockChatHistory);
}

export async function generateRevision(quizHistory: QuizResult[], chatHistory: ChatMessage[]): Promise<string> {
  try {
    const quizHistoryString = quizHistory.map(q => 
        `Topic: ${q.topic}, Score: ${q.score}/${q.totalQuestions}, Date: ${q.completedAt.toLocaleDateString()}`
    ).join('\n');
    
    const chatHistoryString = chatHistory.map(c => 
        `${c.role}: ${c.content}`
    ).join('\n');

    const result = await personalizedRevisionWithAI({
      chatHistory: chatHistoryString,
      quizHistory: quizHistoryString,
    });
    return result.revisionGuidance;
  } catch (error) {
    console.error('Error generating revision with AI:', error);
    return 'There was an error generating your revision plan. Please try again later.';
  }
}

export async function getTutorResponse(question: string): Promise<string> {
    try {
        const result = await aiChatbotTutor({ question });
        return result.answer;
    } catch (error) {
        console.error('Error getting tutor response:', error);
        return 'I am having trouble connecting right now. Please try again in a moment.';
    }
}
