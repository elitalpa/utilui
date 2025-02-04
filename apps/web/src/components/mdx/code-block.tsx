import * as React from "react";
import { codeToHtml } from "shiki";

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

  const language = className?.replace("language-", "") || "";
  const code = codeString.trim();
  const highlightedCodePromise = highlightMarkdownCode(code, language);
  const highlightedCode = React.use(highlightedCodePromise);

  return (
    <code
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      className="block overflow-auto"
    />
  );
};

export default CodeBlock;
