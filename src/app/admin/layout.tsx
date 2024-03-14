import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { SideBar } from "@/components";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harvest Reborn - Inicio",
  description: "Harvest Reborn - Inicio",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {/*<SideBar />*/}
      {children}
    </>
  );
}
