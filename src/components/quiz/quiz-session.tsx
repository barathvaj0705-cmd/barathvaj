'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Quiz } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type QuizSessionProps = {
  quiz: Quiz;
  onFinish: (score: number) => void;
};

export function QuizSession({ quiz, onFinish }: QuizSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const selectedOption = selectedAnswers[currentQuestion.id];

  const handleSelectOption = (option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    setShowFeedback(prev => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const score = Object.entries(selectedAnswers).reduce((total, [questionId, answer]) => {
        const question = quiz.questions.find(q => q.id === questionId);
        return question && question.correctAnswer === answer ? total + 1 : total;
      }, 0);
      onFinish(score);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{quiz.topic} Quiz</CardTitle>
        <div className="pt-4">
          <Progress value={progress} />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
            <p className="text-xl font-semibold">{currentQuestion.question}</p>
        </div>
        <RadioGroup
          value={selectedOption}
          onValueChange={handleSelectOption}
          className="space-y-4"
        >
          {currentQuestion.options.map(option => {
            const isSelected = selectedOption === option;
            const isCorrect = currentQuestion.correctAnswer === option;
            const feedbackVisible = showFeedback[currentQuestion.id];

            return (
              <Label
                key={option}
                className={cn(
                  'flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all',
                  isSelected && 'border-primary ring-2 ring-primary',
                  feedbackVisible && isSelected && !isCorrect && 'border-destructive ring-2 ring-destructive bg-destructive/10',
                  feedbackVisible && isCorrect && 'border-green-500 ring-2 ring-green-500 bg-green-500/10'
                )}
              >
                <RadioGroupItem value={option} id={option} />
                <span>{option}</span>
              </Label>
            );
          })}
        </RadioGroup>
        <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentQuestionIndex === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedOption}>
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
