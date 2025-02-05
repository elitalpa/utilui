import React, { use } from "react";
import { codeToHtml } from "shiki";
import { promises as fs } from "fs";
import registry from "@/../registry.json";

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

async function getHighlightedCode(name: string) {
  const code = await getCodeFromFile(name);
  return await highlightCode(code);
}

export default function ComponentCodeBlock({ name }: { name: string }) {
  const highlightedCodePromise = getHighlightedCode(name);
  const highlightedCode = use(highlightedCodePromise);

  return (
    <div
      className="not-prose max-h-[450px] overflow-auto rounded-md px-4 py-3"
      style={{ backgroundColor: "#0d1117" }}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
