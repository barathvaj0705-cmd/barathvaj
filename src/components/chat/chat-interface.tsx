'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { getTutorResponse } from '@/lib/actions/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '';
  const aiAvatar = PlaceHolderImages.find(img => img.id === 'ai-avatar')?.imageUrl || '';

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const responseContent = await getTutorResponse(input);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    });
  };

  return (
    <div className="flex h-full flex-col bg-card border-t">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-4',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={aiAvatar} alt="AI" data-ai-hint="robot abstract"/>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-[75%] rounded-lg p-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={userAvatar} alt="User" data-ai-hint="person"/>
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
             <div className="flex items-start gap-4 justify-start">
                <Avatar className="h-8 w-8">
                   <AvatarImage src={aiAvatar} alt="AI" />
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t bg-card p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question about your studies..."
            className="flex-1"
            disabled={isPending}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
