import { redirect } from 'next/navigation';
import { BrainCircuit, Menu } from 'lucide-react';
import { getAuthenticatedUser } from '@/lib/auth';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/layout/user-nav';
import { SidebarNav } from '@/components/layout/sidebar-nav';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden">
                <SidebarTrigger>
                  <Menu />
                </SidebarTrigger>
              </Button>
              <BrainCircuit className="h-8 w-8 text-primary" />
              <div className="text-xl font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
                StudyBuddy AI
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:justify-end">
            <SidebarTrigger className="md:hidden"/>
            <UserNav user={user} />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
