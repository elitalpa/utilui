"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";

export default function DocsSidebar({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return items.length ? (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

function DocsNavItems({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string | null;
}) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map(
        (item, index) =>
          item.url && (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "group flex h-8 w-full items-center rounded-lg px-2 font-normal text-foreground underline-offset-2 hover:bg-accent hover:text-accent-foreground",
                pathname === item.url &&
                  "bg-accent font-medium text-accent-foreground",
              )}
              target={item.newTab ? "_blank" : ""}
              rel={item.newTab ? "noreferrer" : ""}
            >
              {item.title}
              {item.label && (
                <span className="ml-2 rounded-md bg-emerald-500 px-1.5 py-0.5 text-xs leading-none text-white no-underline group-hover:no-underline">
                  {item.label}
                </span>
              )}
            </Link>
          ),
      )}
    </div>
  ) : null;
}
