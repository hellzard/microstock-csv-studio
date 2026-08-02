"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Layers, Folder, Home, Settings, UploadCloud, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

export function DashboardSidebar() {
  const t = useTranslations("Navigation");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`border-r border-white/10 bg-card hidden md:flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="h-16 flex items-center px-4 border-b border-white/10 justify-between">
        <Link href="/" className={`flex items-center gap-2 text-primary overflow-hidden ${isCollapsed ? 'w-8 justify-center' : 'w-auto'}`}>
          <Layers className="h-6 w-6 shrink-0" />
          {!isCollapsed && <span className="font-bold text-lg tracking-tight text-foreground whitespace-nowrap">BuatinCSV</span>}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-x-hidden">
        <Link href="/dashboard">
          <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 text-foreground hover:bg-white/5`} title={isCollapsed ? t("dashboard") : undefined}>
            <Home className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{t("dashboard")}</span>}
          </Button>
        </Link>
        <Link href="/projects">
          <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 text-foreground hover:bg-white/5`} title={isCollapsed ? t("projects") : undefined}>
            <Folder className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{t("projects")}</span>}
          </Button>
        </Link>
        <Link href="/templates">
          <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 text-foreground hover:bg-white/5`} title={isCollapsed ? t("templates") : undefined}>
            <UploadCloud className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{t("templates")}</span>}
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" className={`w-full ${isCollapsed ? 'justify-center px-0' : 'justify-start'} gap-3 text-foreground hover:bg-white/5`} title={isCollapsed ? t("settings") : undefined}>
            <Settings className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{t("settings")}</span>}
          </Button>
        </Link>
      </nav>
      
      <div className={`p-4 border-t border-white/10 flex ${isCollapsed ? 'justify-center' : 'justify-start'} overflow-hidden`}>
        {!isCollapsed ? (
          <LanguageSwitcher />
        ) : (
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white/5 text-xs text-muted-foreground" title="Language">
             🌐
          </div>
        )}
      </div>
    </aside>
  );
}
