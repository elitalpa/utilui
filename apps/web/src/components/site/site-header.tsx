"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";

import { FaGithub } from "react-icons/fa";

import { usePathname } from "next/navigation";
import DocsSidebar from "./docs-sidebar";
import { docsItems } from "@/config/docs";
import { ModeToggle } from "../mode-toggle";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <>
      <header className="sticky top-0 z-50 h-20 w-full p-2">
        <div className="container mx-auto flex h-16 items-center justify-between rounded-md border border-border bg-background/80 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold tracking-wider">
              {"Util UI"}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              <Link
                href="/docs"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === "/docs"
                    ? "text-foreground underline underline-offset-4"
                    : "text-foreground/80",
                )}
              >
                Docs
              </Link>
              <Link
                href="/docs/components"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/docs/components") &&
                    !pathname?.startsWith("/docs/component/chart")
                    ? "text-foreground underline underline-offset-4"
                    : "text-foreground/80",
                )}
              >
                Components
              </Link>
            </nav>
          </div>

          <div className="hidden items-center space-x-4 lg:flex">
            <ModeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="https://github.com/elitalpa/utilui"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9"
              >
                <FaGithub />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-4 md:hidden">
            <ModeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex h-12 flex-col items-center justify-center">
                  <SheetHeader>
                    <SheetTitle>Nav</SheetTitle>
                  </SheetHeader>
                </div>

                <div className="no-scrollbar h-full max-h-[calc(100vh-16px)] min-h-[100svh] overflow-y-auto p-2">
                  <nav className="flex flex-col space-y-4 p-2">
                    <Link href="/docs" className="text-sm font-medium">
                      Docs
                    </Link>
                    <Link
                      href="/docs/components"
                      className="text-sm font-medium"
                    >
                      Components
                    </Link>
                    <Link
                      href="https://github.com/elitalpa/utilui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium"
                    >
                      GitHub
                    </Link>
                  </nav>
                  <div className="h-4"></div>
                  <DocsSidebar items={docsItems} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
