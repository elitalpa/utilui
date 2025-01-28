import DocsSidebar from "@/components/site/docs-sidebar";
import { docsItems } from "@/config/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:gap-10">
        <aside className="sticky top-20 z-30 hidden h-[calc(100svh-64px-24px)] w-full shrink-0 md:sticky md:block">
          <div className="no-scrollbar h-full overflow-auto rounded-md border p-2 pt-6">
            <DocsSidebar items={docsItems} />
          </div>
        </aside>
        <div className="prose min-h-[110svh] px-2 pt-6 dark:prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}
