'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Home, User, LogOut, Settings } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function getTitleFromPathname(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
  const lastSegment = pathname.split('/').pop();
  if (!lastSegment) return 'Dashboard';
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace('-', ' ');
}

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  const avatar = PlaceHolderImages.find(p => p.id === 'user-avatar-1') || {
    imageUrl: 'https://picsum.photos/seed/avatar1/100/100',
    imageHint: 'person portrait',
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex items-baseline gap-2">
         <Link href="/dashboard" className="sm:hidden"><Home className="size-5" /></Link>
         <h1 className="hidden font-headline text-2xl font-bold sm:block">{title}</h1>
      </div>
      
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Can add a search bar here if needed */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src={avatar.imageUrl} alt="User Avatar" data-ai-hint={avatar.imageHint} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="flex items-center gap-2">
              <User className="size-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4 mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2">
              <LogOut className="size-4" /> Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
