import * as React from "react";
import { codeToHtml } from "shiki";
import { promises as fs } from "fs";
import registry from "@/../registry.json";
import { CopyButton } from "@/components/site/copy-button";

async function getCodeFromFile(name: string) {
  try {
    const component = registry.items.find((c) => c.name === name);
    const filePath = component?.files[0]?.path;

    if (!filePath) {
      console.error(`No file path found for component: ${name}`);
      return "";
    }

    try {
      return await fs.readFile(filePath, "utf8");
    } catch (error) {
      console.error("Error reading file:", error);
      return "";
    }
  } catch (error) {
    console.error("Error processing component request:", error);
    return "";
  }
}

async function highlightCode(code: string) {
  return await codeToHtml(code, {
    lang: "tsx",
    theme: "github-dark-default",
    transformers: [
      {
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
      },
    ],
  });
}

export default function ComponentCodeBlock({ name }: { name: string }) {
  const code = React.use(getCodeFromFile(name));
  const highlightedCode = React.use(highlightCode(code));

  return (
    <div className="relative">
      <CopyButton code={code} />
      <div
        className="not-prose max-h-[450px] overflow-auto rounded-md px-4 py-3"
        style={{ backgroundColor: "#0d1117" }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
