import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <h1 className="text-3xl font-bold tracking-tight mb-4">AI Tutor</h1>
      <ChatInterface />
    </div>
  );
}
