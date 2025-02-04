import React, { use, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeToHtml } from "shiki";
import { promises as fs } from "fs";
import dynamic from "next/dynamic";
import registry from "@/../registry.json";

// Indexing import paths
const Index = Object.fromEntries(
  registry.items.map((item) => [
    item.name,
    dynamic(() => import(`@/registry/blocks/${item.name}`), {
      loading: () => (
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          Loading component...
        </div>
      ),
    }),
  ]),
);

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

export default function ComponentPreview({ name }: { name: string }) {
  const highlightedCodePromise = getHighlightedCode(name);
  const highlightedCode = use(highlightedCodePromise);

  const DynamicComponent = Index[name];

  if (!DynamicComponent) {
    return <div>Component not found: {name}</div>;
  }

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex min-h-[450px] items-center justify-center rounded-lg border p-4">
          <Suspense
            fallback={
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                Loading component...
              </div>
            }
          >
            <DynamicComponent />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div
          className="max-h-[450px] overflow-auto rounded-lg"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </TabsContent>
    </Tabs>
  );
}
