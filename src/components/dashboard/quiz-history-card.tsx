import Link from 'next/link';
import { ArrowRight, BookOpen, FlaskConical, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { QuizResult, QuizTopic } from '@/lib/types';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

const topicIcons: Record<QuizTopic, React.ElementType> = {
  Algebra: BookOpen,
  Biology: FlaskConical,
  History: History,
};

const topicColors: Record<QuizTopic, string> = {
    Algebra: 'bg-blue-100 text-blue-800',
    Biology: 'bg-green-100 text-green-800',
    History: 'bg-yellow-100 text-yellow-800',
}

export function QuizHistoryCard({ quizHistory }: { quizHistory: QuizResult[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz History</CardTitle>
        <CardDescription>Review your past performance.</CardDescription>
      </CardHeader>
      <CardContent>
        {quizHistory.length > 0 ? (
          <div className="space-y-4">
            <ul className="space-y-4">
              {quizHistory.slice(0, 4).map(result => {
                  const Icon = topicIcons[result.topic];
                  const scorePercentage = (result.score / result.totalQuestions) * 100;
                  return (
                    <li key={result.id} className="flex items-center gap-4">
                        <div className={cn("rounded-lg p-2", topicColors[result.topic])}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">{result.topic}</p>
                            <p className="text-sm text-muted-foreground">{result.completedAt.toLocaleDateString()}</p>
                        </div>
                        <Badge variant={scorePercentage >= 70 ? 'default' : 'destructive'} className={cn(
                            scorePercentage >= 70 ? 'bg-green-500' : 'bg-red-500', 'hover:bg-green-600', 'text-white'
                        )}>
                            {scorePercentage}%
                        </Badge>
                    </li>
                  )
              })}
            </ul>
            <Button variant="outline" className="w-full" asChild>
                <Link href="/quiz">
                    View All Quizzes <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>You haven't taken any quizzes yet.</p>
            <Button className="mt-4" asChild>
              <Link href="/quiz">Start a New Quiz</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
