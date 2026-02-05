import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col">
      <h1 className="text-3xl font-bold tracking-tight my-4 px-4 md:px-8">AI Tutor</h1>
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
