import { cn } from "@/lib/utils";
import * as React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn("rounded-md border px-4 py-2", { className })}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
