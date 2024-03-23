"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { UiProvider } from "@/context/ui";
import { SWRConfig } from "swr";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        <NextUIProvider>
          <UiProvider>{children}</UiProvider>
        </NextUIProvider>
      </SWRConfig>
    </SessionProvider>
  );
};

export default Providers;
