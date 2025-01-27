import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";

import { cn } from "@/lib/utils";

import { TRPCReactProvider } from "@/trpc/react";

import SiteFooter from "@/components/site/site-footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Util UI",
  description:
    "Usefull UI components that can be added directly in your project codebase. Compatible with shadcn ui and the shadcn cli.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="utilui.com"
          data-api="/plausible/api/event"
          src="/plausible/js/script.js"
        ></script>
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>
          <div className="flex flex-1 flex-col">
            {children}
            <SiteFooter />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
