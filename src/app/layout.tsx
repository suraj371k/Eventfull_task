"use client"
import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
