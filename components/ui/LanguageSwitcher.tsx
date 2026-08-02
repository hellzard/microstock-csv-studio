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

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: "en" | "id") => {
    // This updates the locale and sets the NEXT_LOCALE cookie
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" aria-label="Select Language">
        <Button variant="outline" size="sm" className="gap-2 border-white/20 bg-background/50 hover:bg-white/10" tabIndex={-1}>
          <Globe className="h-4 w-4" />
          <span className="uppercase font-medium text-xs">{locale}</span>
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
