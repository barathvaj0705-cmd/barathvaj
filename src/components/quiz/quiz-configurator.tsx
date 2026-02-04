'use client';

import { BookOpen, FlaskConical, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { QuizTopic } from '@/lib/types';

type QuizConfiguratorProps = {
  onStartQuiz: (topic: QuizTopic) => void;
};

const topics: { name: QuizTopic; icon: React.ElementType, description: string }[] = [
  { name: 'Algebra', icon: BookOpen, description: 'Test your knowledge of equations, functions, and graphs.' },
  { name: 'Biology', icon: FlaskConical, description: 'Explore the world of living organisms and life processes.' },
  { name: 'History', icon: History, description: 'Challenge your memory of significant past events.' },
];

export function QuizConfigurator({ onStartQuiz }: QuizConfiguratorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Topic</CardTitle>
        <CardDescription>Select a subject to start a new quiz.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {topics.map(topic => (
            <div
              key={topic.name}
              onClick={() => onStartQuiz(topic.name)}
              className="group cursor-pointer rounded-lg border-2 bg-card p-6 text-center transition-all hover:border-primary hover:bg-primary/5"
            >
              <topic.icon className="mx-auto h-12 w-12 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mt-4 text-xl font-semibold">{topic.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{topic.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
