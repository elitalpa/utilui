import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-85px)] flex-col items-center justify-center p-4">
      <h1 className="mb-2 text-4xl font-semibold tracking-wider">
        {"Util UI"}
      </h1>
      <p className="text-center text-lg">
        {
          "Usefull UI components that can be added directly in your project codebase."
        }
      </p>
      <p className="mb-4 text-center text-lg">
        {"Compatible with shadcn ui and the "}
        <a
          href={"https://ui.shadcn.com/docs/cli"}
          className="text-accent-foreground underline-offset-4 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {"shadcn cli"}
        </a>
        {"."}
      </p>
      <Link
        href="/docs/components"
        className={buttonVariants({ variant: "default" })}
      >
        {"Explore Components -->"}
      </Link>
    </main>
  );
}
