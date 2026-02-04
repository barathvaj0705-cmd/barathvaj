'use client';

import { useState, useTransition } from 'react';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { QuizResult, ChatMessage } from '@/lib/types';
import { generateRevision } from '@/lib/actions/data';

type RevisionCardProps = {
  quizHistory: QuizResult[];
  chatHistory: ChatMessage[];
};

export function RevisionCard({ quizHistory, chatHistory }: RevisionCardProps) {
  const [isPending, startTransition] = useTransition();
  const [revision, setRevision] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRevision = () => {
    startTransition(async () => {
      setError(null);
      const result = await generateRevision(quizHistory, chatHistory);
      if (result.startsWith('There was an error')) {
        setError(result);
      } else {
        setRevision(result);
      }
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Personalized Revision Plan</CardTitle>
        <CardDescription>
          Let our AI analyze your progress and create a custom study guide for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {revision ? (
          <div className="prose prose-sm max-w-none rounded-lg border bg-accent/50 p-4">
            <h3 className="text-lg font-semibold text-primary">Your AI Study Guide</h3>
            <p className="whitespace-pre-wrap text-foreground">{revision}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-background p-12 text-center">
            <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Ready to focus your studies?</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Generate a revision plan based on your quiz results and tutor chats.
            </p>
            <Button onClick={handleGenerateRevision} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate My Plan'
              )}
            </Button>
          </div>
        )}
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
