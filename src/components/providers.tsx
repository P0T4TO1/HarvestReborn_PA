"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { UiProvider } from "@/context/ui";
import { BagProvider } from "@/context/order";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>
        <BagProvider>
          <UiProvider>{children}</UiProvider>
        </BagProvider>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
