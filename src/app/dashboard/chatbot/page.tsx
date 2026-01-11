'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, Send, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { careerGuidanceChatbot } from '@/ai/flows/ai-career-guidance-chatbot';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatInput = z.infer<typeof chatSchema>;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI career guide. How can I help you today? You can ask me about career paths, college comparisons, or anything else.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChatInput>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: ChatInput) => {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: data.message };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    try {
      const result = await careerGuidanceChatbot({ query: data.message });
      const assistantMessage: Message = { role: 'assistant', content: result.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error with AI chatbot:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-[calc(100vh-8rem)] flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              <Bot />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-headline text-lg font-semibold">AI Career Guide</p>
            <p className="text-sm text-muted-foreground">Your personal career assistant</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg px-4 py-3 text-sm',
                    message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}
                >
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input {...field} placeholder="Ask about careers, colleges, etc." autoComplete="off" disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
