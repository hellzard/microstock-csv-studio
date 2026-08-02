import Link from "next/link";
import { Layers, Folder, Home, Settings, LogOut, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-card hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Layers className="h-6 w-6" />
            <span className="font-bold text-lg tracking-tight text-foreground">CSV Studio</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-white/5">
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-white/5">
              <Folder className="h-4 w-4" />
              Projects
            </Button>
          </Link>
          <Link href="/templates">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-white/5">
              <UploadCloud className="h-4 w-4" />
              Templates
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-white/5">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 border-b border-white/10 flex md:hidden items-center justify-between px-4 bg-card">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Layers className="h-6 w-6" />
          </Link>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
