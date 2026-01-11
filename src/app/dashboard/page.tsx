import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, GitMerge, PencilRuler, School } from 'lucide-react';

const features = [
  {
    title: 'Start Your Aptitude Quiz',
    description: 'Answer a few questions to understand your strengths and get personalized recommendations.',
    href: '/dashboard/quiz',
    icon: <PencilRuler className="size-6 text-accent" />,
    cta: 'Take Quiz',
  },
  {
    title: 'View Your Career Roadmap',
    description: 'Explore tailored career paths, including primary and backup options based on your profile.',
    href: '/dashboard/roadmap',
    icon: <GitMerge className="size-6 text-accent" />,
    cta: 'View Roadmap',
  },
  {
    title: 'Explore Colleges',
    description: 'Search and compare thousands of colleges to find the perfect fit for you.',
    href: '/dashboard/colleges',
    icon: <School className="size-6 text-accent" />,
    cta: 'Find Colleges',
  },
  {
    title: 'AI Career Chatbot',
    description: 'Have a question? Our AI chatbot is here to provide instant guidance and support.',
    href: '/dashboard/chatbot',
    icon: <Bot className="size-6 text-accent" />,
    cta: 'Ask AI',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome, Student!</h1>
        <p className="text-muted-foreground">Your journey to a successful career starts here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                {feature.icon}
              </div>
              <div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-auto flex justify-end">
              <Button asChild>
                <Link href={feature.href}>
                  {feature.cta} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
