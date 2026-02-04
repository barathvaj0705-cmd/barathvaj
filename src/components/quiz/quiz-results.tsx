'use client';

import { Award, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { QuizResult } from '@/lib/types';
import { cn } from '@/lib/utils';

type QuizResultsProps = {
  result: QuizResult;
  onRestart: () => void;
};

export function QuizResults({ result, onRestart }: QuizResultsProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <Award
          className={cn(
            'mx-auto h-16 w-16',
            isPassing ? 'text-yellow-500' : 'text-muted-foreground'
          )}
        />
        <CardTitle className="text-3xl font-bold mt-4">
          {isPassing ? 'Congratulations!' : 'Keep Practicing!'}
        </CardTitle>
        <CardDescription>You have completed the {result.topic} quiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <p className="text-lg text-muted-foreground">Your Score</p>
          <p className="text-6xl font-bold text-primary">
            {result.score} / {result.totalQuestions}
          </p>
        </div>
        <div className="space-y-2">
            <Progress value={percentage} className={cn(
                '[&>div]:bg-primary',
                 !isPassing && '[&>div]:bg-destructive'
            )}/>
            <p className="text-xl font-semibold">{percentage}%</p>
        </div>
        <Button onClick={onRestart} size="lg">
          <RefreshCw className="mr-2 h-4 w-4" />
          Take Another Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
