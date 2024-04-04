"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <span className="material-symbols-outlined">wb_sunny</span>
        ) : (
          <span className="material-symbols-outlined">dark_mode</span>
        )}
      </Button>
    </div>
  );
};
