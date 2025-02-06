import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { codeToHtml } from "shiki";
import { promises as fs } from "fs";
import dynamic from "next/dynamic";
import registry from "@/../registry.json";
import { CopyButton } from "@/components/site/copy-button";

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

export default function ComponentPreview({ name }: { name: string }) {
  const code = React.use(getCodeFromFile(name));
  const highlightedCode = React.use(highlightCode(code));

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
      <TabsContent value="preview" className="relative">
        <CopyButton code={code} />
        <div className="flex min-h-[450px] items-center justify-center rounded-md border px-4 py-3">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                Loading component...
              </div>
            }
          >
            <DynamicComponent />
          </React.Suspense>
        </div>
      </TabsContent>
      <TabsContent value="code" className="relative">
        <CopyButton code={code} />
        <div
          className="not-prose max-h-[450px] overflow-auto rounded-md px-4 py-3"
          style={{ backgroundColor: "#0d1117" }}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </TabsContent>
    </Tabs>
  );
}
