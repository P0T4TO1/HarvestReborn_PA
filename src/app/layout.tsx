import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarComponent, Footer } from "@/components";
import { ReactNode } from "react";
import Providers from "@/components/providers";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harvest Reborn",
  description: "Harvest Reborn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Toaster position="top-center" richColors />
            <NavbarComponent />
            {children}
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
