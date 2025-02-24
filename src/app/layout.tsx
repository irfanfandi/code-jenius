import ReLoading from "@/components/ReLoading";
import StoreProvider from "@/utils/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gray-200 min-h-screen`}>
          <Suspense fallback={<ReLoading />}>
            <main className="container px-6 sm:px-20 py-12 mx-auto ">
              {children}
            </main>
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
