'use client';

import { useState } from 'react';
import type { Quiz, QuizResult, QuizTopic } from '@/lib/types';
import { quizzes } from '@/lib/quiz-data';
import { QuizConfigurator } from './quiz-configurator';
import { QuizSession } from './quiz-session';
import { QuizResults } from './quiz-results';

type QuizState = 'configuring' | 'in-progress' | 'finished';

export function QuizClient() {
  const [quizState, setQuizState] = useState<QuizState>('configuring');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = (topic: QuizTopic) => {
    const selectedQuiz = quizzes[topic];
    if (selectedQuiz) {
      setActiveQuiz(selectedQuiz);
      setQuizState('in-progress');
    }
  };

  const handleFinishQuiz = (score: number) => {
    if (activeQuiz) {
      const result: QuizResult = {
        id: new Date().toISOString(),
        topic: activeQuiz.topic,
        score,
        totalQuestions: activeQuiz.questions.length,
        completedAt: new Date(),
      };
      setQuizResult(result);
      setQuizState('finished');
      // In a real app, you'd save this result to a database via a server action.
    }
  };

  const handleRestart = () => {
    setQuizState('configuring');
    setActiveQuiz(null);
    setQuizResult(null);
  };

  if (quizState === 'in-progress' && activeQuiz) {
    return <QuizSession quiz={activeQuiz} onFinish={handleFinishQuiz} />;
  }

  if (quizState === 'finished' && quizResult) {
    return <QuizResults result={quizResult} onRestart={handleRestart} />;
  }

  return <QuizConfigurator onStartQuiz={handleStartQuiz} />;
}
