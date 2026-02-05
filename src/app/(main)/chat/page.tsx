import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">AI Tutor</h1>
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
