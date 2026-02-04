'use client';

import { useState, useEffect } from 'react';
import { getQuizHistory, getChatHistory } from '@/lib/actions/data';
import { QuizHistoryCard } from '@/components/dashboard/quiz-history-card';
import { RevisionCard } from '@/components/dashboard/revision-card';
import { useUser } from '@/firebase';
import type { QuizResult, ChatMessage } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user } = useUser();
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [quizzes, chats] = await Promise.all([
        getQuizHistory(),
        getChatHistory(),
      ]);
      setQuizHistory(quizzes);
      setChatHistory(chats);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading || !user) {
    return (
        <div className="space-y-8">
            <div>
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-4 w-1/3 mt-2" />
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px] w-full" />
                </div>
                <div className="lg:col-span-1">
                    <Skeleton className="h-[400px] w-full" />
                </div>
            </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0]}!</h1>
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
