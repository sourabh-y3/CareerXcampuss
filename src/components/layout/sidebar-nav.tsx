'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/logo';
import { Bot, GitMerge, LayoutDashboard, PencilRuler, School, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/quiz', icon: PencilRuler, label: 'Aptitude Quiz' },
  { href: '/dashboard/roadmap', icon: GitMerge, label: 'Career Roadmap' },
  { href: '/dashboard/colleges', icon: School, label: 'Colleges' },
  { href: '/dashboard/chatbot', icon: Bot, label: 'AI Chatbot' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="font-headline text-lg font-bold text-sidebar-foreground">CareerXCompass</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className={cn(
                    'group-data-[collapsible=icon]:justify-center',
                    'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground'
                  )}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
