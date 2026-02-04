import { getAuthenticatedUser } from '@/lib/auth';
import { getQuizHistory, getChatHistory } from '@/lib/actions/data';
import { QuizHistoryCard } from '@/components/dashboard/quiz-history-card';
import { RevisionCard } from '@/components/dashboard/revision-card';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  const quizHistory = await getQuizHistory();
  const chatHistory = await getChatHistory();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's a summary of your learning journey.</p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevisionCard 
            quizHistory={quizHistory} 
            chatHistory={chatHistory} 
          />
        </div>
        <div className="lg:col-span-1">
          <QuizHistoryCard quizHistory={quizHistory} />
        </div>
      </div>
    </div>
  );
}
