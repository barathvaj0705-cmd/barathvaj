import { BrainCircuit } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <BrainCircuit className="h-16 w-16 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
            Welcome back to StudyBuddy AI
          </h1>
          <p className="mt-2 text-muted-foreground">Sign in to continue your learning journey</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
