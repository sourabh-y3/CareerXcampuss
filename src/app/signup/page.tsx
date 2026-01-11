'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Logo } from '@/components/icons/logo'
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'auth-background') || { imageUrl: 'https://picsum.photos/seed/authbg/1200/900', imageHint: 'abstract gradient' };
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!auth) {
        toast({
            title: 'Error',
            description: 'Authentication service is not available. Please try again later.',
            variant: 'destructive',
        });
        setIsLoading(false);
        return;
    }
    const email = (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
       console.error("Error during email sign up:", error);
       toast({
        title: 'Sign Up Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="hidden bg-muted lg:block relative">
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description || "Abstract background"}
          width={1200}
          height={900}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          data-ai-hint={bgImage.imageHint}
        />
        <div className="absolute bottom-8 left-8 right-8 rounded-lg bg-black/50 p-6 text-white backdrop-blur-sm">
          <h3 className="text-2xl font-bold">"Your career is your business. You are its CEO."</h3>
          <p className="mt-2 text-lg font-light">- Dorit Sher</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="mx-auto mb-4">
              <Logo className="size-12" />
            </Link>
            <h1 className="font-headline text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to get started
            </p>
          </div>
          <Card>
            <form onSubmit={handleEmailSignUp}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">Full name</Label>
                    <Input id="full-name" placeholder="John Doe" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      defaultValue="sourabh@gmail.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Creating account...' : 'Create an account'}
                  </Button>
                </div>
              </CardContent>
            </form>
            <CardFooter className="flex-col items-start text-sm">
                <p className="w-full text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
