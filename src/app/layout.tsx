import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Header from "@/components/Header";

import { Lato } from "next/font/google";



const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["100", "300", "400", "700", "900"]
});

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
    <ClerkProvider>
    <html lang="en">
   
      <body
        className={`${lato.className} antialiased min-h-screen grid grid-rows-[auto_1fr_auto]`}
      >
        <Header />
        {children}
       
      </body>
    </html>
    </ClerkProvider>
  );
}
