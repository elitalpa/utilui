import { allDocs } from "content-collections";
import { notFound } from "next/navigation";

import { MDXContent } from "@content-collections/mdx/react";
import { Button } from "@/registry/components/button";
import ComponentPreview from "@/components/site/component-preview";
import { type Metadata } from "next";
import CodeBlock from "@/components/mdx/code-block";

async function findDoc({
  params,
}: {
  params: Promise<{ slug: Array<string> }>;
}) {
  const p = await params;

  const slug = p.slug?.join("/") || "index";

  const doc = allDocs.find((doc) => doc._meta.path.replace("\\", "/") === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: Array<string> }>;
}): Promise<Metadata> {
  const doc = await findDoc({ params });

  if (!doc) {
    notFound();
  }

  return {
    title: `${doc.title} - Util UI`,
    description: `${doc.description}`,
  };
}

export default async function Docs({
  params,
}: {
  params: Promise<{ slug: Array<string> }>;
}) {
  const doc = await findDoc({ params });

  if (!doc) {
    notFound();
  }

  return (
    <main className="container mx-auto">
      <MDXContent
        components={{
          Button,
          ComponentPreview,
          code: CodeBlock,
        }}
        code={doc.mdx}
      />
    </main>
  );
}
