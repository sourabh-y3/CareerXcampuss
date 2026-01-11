import React from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="bg-background">
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
