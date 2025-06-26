"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between">
      <span className="ml-3 text-sm">Thème</span>
      <div className="ml-auto grid grid-flow-col items-center gap-1 rounded-md p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("light")}
          className={`h-6 w-6 ${
            theme === "light"
              ? "bg-secondary/70 text-secondary-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("dark")}
          className={`h-6 w-6 ${
            theme === "dark"
              ? "bg-secondary/70 text-secondary-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme("system")}
          className={`h-6 w-6 ${
            theme === "system"
              ? "bg-secondary/70 text-secondary-foreground"
              : "text-muted-foreground"
          }`}
          aria-label="System theme"
        >
          <Laptop className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
