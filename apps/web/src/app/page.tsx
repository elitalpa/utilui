import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-90px)] flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-semibold tracking-wider">{"Util UI"}</h1>
      <p className="text-center text-lg">
        {
          "Usefull UI components that can be added directly in your project codebase."
        }
      </p>
      <p className="text-center text-lg">
        {"Compatible with the "}
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
      <Button variant={"default"}>Coming Soon</Button>
    </main>
  );
}
