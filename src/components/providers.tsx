"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { UiProvider } from "@/context/ui";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <UiProvider>{children}</UiProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
