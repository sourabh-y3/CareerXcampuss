import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Logo } from '@/components/icons/logo'

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A8.003 8.003 0 0 1 24 36c-5.225 0-9.554-3.443-11.179-8.169l-6.571 4.819C9.656 39.663 16.318 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.591 44 30.024 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

export default function SignupPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'auth-background') || { imageUrl: 'https://picsum.photos/seed/authbg/1200/900', imageHint: 'abstract gradient' };

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
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <Button variant="outline" className="w-full">
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Sign up with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center text-sm">
                <p className="w-full">
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
