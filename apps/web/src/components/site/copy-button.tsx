"use client";

import * as React from "react";
import { Button } from "@/components/utilui/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code: ", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={
        "absolute right-4 top-4 h-6 w-6 text-muted-foreground transition-all"
      }
      onClick={copyToClipboard}
    >
      <span className="sr-only">Copy code</span>
      {isCopied ? (
        <CheckIcon className="h-3 w-3" />
      ) : (
        <ClipboardIcon className="h-3 w-3" />
      )}
    </Button>
  );
}
