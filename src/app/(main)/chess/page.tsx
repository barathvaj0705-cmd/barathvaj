import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ChessRook } from 'lucide-react';

export default function ChessPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chess</h1>
        <p className="text-muted-foreground">
          Challenge the AI or analyze your games.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            Our interactive chess tool is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-16">
          <ChessRook className="h-24 w-24 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Get ready to sharpen your chess skills!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
