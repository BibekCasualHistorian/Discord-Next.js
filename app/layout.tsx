import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import CreateServerModal from "@/components/modals/CreateServerModal";
import ModalProviders from "@/components/modals/ModalProviders";
import { SocketProvider } from "@/components/SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord Clone",
  description: "Chat with your friends and family easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log("session", session);

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head />
        {/* <body className="bg-white text-black dark:bg-primaryColor dark:text-white"> */}
        <body className="bg-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProviders />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
