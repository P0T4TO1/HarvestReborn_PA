"use client";

import React, { useEffect } from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Button } from "@nextui-org/react";

export const DarkModeSwitch = async () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  useEffect(() => {
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme]);

  return (
    <Button
      isIconOnly
      variant="light"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <span className="material-symbols-outlined">light_mode</span>
      ) : (
        <span className="material-symbols-outlined">dark_mode</span>
      )}
    </Button>
  );
};
