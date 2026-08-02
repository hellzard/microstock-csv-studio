"use client";

import { useState, useEffect } from "react";
import { Download, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstallPwaButton({ variant = "default", className = "" }: { variant?: "default" | "outline" | "ghost", className?: string }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("App is already installed, or your browser does not support installation.");
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  if (!isInstallable) return null;

  return (
    <Button 
      variant={variant} 
      className={className} 
      onClick={handleInstallClick}
    >
      <MonitorSmartphone className="h-4 w-4 mr-2" />
      Install Desktop App
    </Button>
  );
}
