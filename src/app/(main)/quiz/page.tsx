import { QuizClient } from '@/components/quiz/quiz-client';

export default function QuizPage() {
  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">Test your knowledge and track your progress.</p>
      </div>
      <QuizClient />
    </div>
  );
}
