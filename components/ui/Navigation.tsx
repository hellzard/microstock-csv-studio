"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Hamburger Button */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-white/20 bg-background/80 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(34,211,238,0.3)] hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Floating Logo (Optional but looks good to keep brand present) */}
      <div className="fixed top-6 left-6 z-40 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-background/50 backdrop-blur-md">
          <Layers className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm tracking-tight hidden sm:inline-block">Microstock CSV Studio</span>
        </div>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/90 flex flex-col items-center justify-center"
          >
            <motion.nav 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-8 text-2xl font-medium tracking-tight"
            >
              <Link 
                href="#features" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link 
                href="#platforms" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Supported Platforms
              </Link>
              <Link 
                href="#security" 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Security & Privacy
              </Link>
              
              <div className="h-px w-24 bg-white/10 my-4" />
              
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-[0_0_30px_-5px_rgba(34,211,238,0.4)]">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
