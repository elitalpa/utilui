import * as React from "react";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/site/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

async function highlightMarkdownCode(code: string, language: string) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
      },
    ],
  });

  const codeContent = html.replace(/<pre.*?>/g, "").replace(/<\/pre>/g, "");

  return codeContent;
}

const CodeBlock = ({
  children,
  className,
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const codeString =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : String(children || "");

  // Handle inline code
  const isInline = !className;
  if (isInline) {
    return (
      <span className="rounded-md bg-foreground px-1 py-0.5 text-sm text-background">
        {codeString}
      </span>
    );
  }

  const language = className?.replace("language-", "") || "";
  const code = codeString.trim();

  const CoreCodeBlock = ({
    className,
    updatedCode,
  }: {
    updatedCode: string;
    className?: string;
  }) => {
    const highlightedCodePromise = highlightMarkdownCode(updatedCode, language);
    const highlightedCode = React.use(highlightedCodePromise);

    return (
      <pre
        className={cn("not-prose relative rounded-md px-4 py-3", className)}
        style={{ backgroundColor: "#0d1117" }}
      >
        <CopyButton code={updatedCode} />
        <code
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          className="block overflow-auto"
        />
      </pre>
    );
  };

  const startsWithNpx = code.startsWith("npx");

  if (startsWithNpx) {
    const npmCode = code.replace("npx", "npx");
    const yarnCode = code.replace("npx", "npx");
    const bunCode = code.replace("npx", "bunx --bun");
    const pnpmCode = code.replace("npx", "pnpm dlx");

    return (
      <Tabs
        defaultValue="npm"
        className="not-prose mb-0 flex flex-col rounded-md bg-[#161b22]"
      >
        <TabsList className="w-fit rounded-md border border-none bg-[#161b22]">
          <TabsTrigger value="npm" className="rounded text-sm font-medium">
            npm
          </TabsTrigger>
          <TabsTrigger value="bun" className="rounded text-sm font-medium">
            bun
          </TabsTrigger>
          <TabsTrigger value="yarn" className="rounded text-sm font-medium">
            yarn
          </TabsTrigger>
          <TabsTrigger value="pnpm" className="rounded text-sm font-medium">
            pnpm
          </TabsTrigger>
        </TabsList>
        <TabsContent value="npm" className="m-0">
          <CoreCodeBlock updatedCode={npmCode} />
        </TabsContent>
        <TabsContent value="bun" className="m-0">
          <CoreCodeBlock updatedCode={bunCode} />
        </TabsContent>
        <TabsContent value="yarn" className="m-0">
          <CoreCodeBlock updatedCode={yarnCode} />
        </TabsContent>
        <TabsContent value="pnpm" className="m-0">
          <CoreCodeBlock updatedCode={pnpmCode} />
        </TabsContent>
      </Tabs>
    );
  }

  return <CoreCodeBlock updatedCode={code} className="mb-6 mt-4" />;
};

export default CodeBlock;
