export type QuizTopic = 'Algebra' | 'Biology' | 'History';

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  topic: QuizTopic;
  questions: Question[];
};

export type QuizResult = {
  id: string;
  topic: QuizTopic;
  score: number;
  totalQuestions: number;
  completedAt: Date;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export type Piece = {
  type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
  color: 'white' | 'black';
} | null;

export type Board = Piece[][];
