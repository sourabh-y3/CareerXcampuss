import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/icons/logo';
import { ArrowRight, Bot, GitMerge, PencilRuler, School } from 'lucide-react';

const featurePlaceholders = PlaceHolderImages.filter(p => p.id.startsWith('feature-'));

const features = [
  {
    icon: <PencilRuler className="size-8 text-primary" />,
    title: 'Aptitude & Interest Quiz',
    description: 'Discover your strengths and passions with our comprehensive assessment.',
    image: featurePlaceholders[0] || { imageUrl: 'https://picsum.photos/seed/feature1/600/400', imageHint: 'quiz assessment' },
  },
  {
    icon: <GitMerge className="size-8 text-primary" />,
    title: 'Personalized Career Roadmap',
    description: 'Get a step-by-step visual guide to your ideal career, with backup options.',
    image: featurePlaceholders[1] || { imageUrl: 'https://picsum.photos/seed/feature2/600/400', imageHint: 'career path' },
  },
  {
    icon: <School className="size-8 text-primary" />,
    title: 'College Directory',
    description: 'Explore and compare thousands of government and private colleges.',
    image: featurePlaceholders[2] || { imageUrl: 'https://picsum.photos/seed/feature3/600/400', imageHint: 'university campus' },
  },
  {
    icon: <Bot className="size-8 text-primary" />,
    title: 'AI Career Guidance',
    description: 'Chat with our AI assistant for instant, personalized advice.',
    image: featurePlaceholders[3] || { imageUrl: 'https://picsum.photos/seed/feature4/600/400', imageHint: 'ai robot' },
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image') || { imageUrl: 'https://picsum.photos/seed/hero/1200/800', imageHint: 'student future' };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Logo className="size-8" />
            <span className="font-headline text-xl font-bold">CareerXCompass</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Sign Up <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[500px] w-full">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description || 'Student planning future'}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <h1 className="font-headline text-4xl font-bold md:text-6xl">Find Your Future</h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              AI-powered guidance to help you choose the right stream, college, and career path after Class 10 & 12.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/signup">
                Get Started for Free <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        <section id="features" className="container py-12 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Your Personal Career Navigator</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide the tools and insights you need to make confident decisions about your education and career.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                  {feature.icon}
                  <CardTitle className="font-headline text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex h-14 items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CareerXCompass. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
