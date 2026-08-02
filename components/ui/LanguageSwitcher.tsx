"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ isCollapsed }: { isCollapsed?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: "en" | "id") => {
    // This updates the locale and sets the NEXT_LOCALE cookie
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      {/* @ts-expect-error shadcn ui type mismatch in react 19 */}
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={`h-12 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center transition-all ${isCollapsed ? 'w-12 justify-center px-0' : 'w-full justify-start px-4 gap-4'}`}
        >
          <Globe className="h-6 w-6 shrink-0" />
          {!isCollapsed && <span className="font-medium text-base uppercase tracking-wider">{locale}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("id")}
          className={locale === "id" ? "bg-white/10" : ""}
        >
          Bahasa Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLanguageChange("en")}
          className={locale === "en" ? "bg-white/10" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
