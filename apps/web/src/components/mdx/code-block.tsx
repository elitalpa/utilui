import * as React from "react";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/site/copy-button";

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
  const highlightedCodePromise = highlightMarkdownCode(code, language);
  const highlightedCode = React.use(highlightedCodePromise);

  return (
    <pre
      className="not-prose relative mb-6 mt-4 rounded-md px-4 py-3"
      style={{ backgroundColor: "#0d1117" }}
    >
      <CopyButton code={code} />
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className="block overflow-auto"
      />
    </pre>
  );
};

export default CodeBlock;
