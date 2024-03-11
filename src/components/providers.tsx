"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
