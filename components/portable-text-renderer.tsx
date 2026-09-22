"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/image";

interface PortableTextRendererProps {
  content: any[];
}

// Shared Portable Text renderer used by legal pages (/terms,
// /privacy-policy, /shipping, /returns) and journal articles.
// Supports: h1/h2/h3, normal, blockquote, bullet + number lists,
// marks (strong, em, underline, code, link annotations) and
// inline `image` blocks via urlForImage. Unknown blocks render null
// so a single bad block can never break the whole page.
export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!Array.isArray(content) || content.length === 0) return null;

  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < content.length) {
    const block: any = content[i];
    // Group consecutive list items into a single <ul>/<ol>.
    if (block?._type === "block" && block?.listItem) {
      const listStyle = block.listItem === "number" ? "number" : "bullet";
      const items: any[] = [];
      while (
        i < content.length &&
        content[i]?._type === "block" &&
        content[i]?.listItem &&
        (content[i].listItem === "number" ? "number" : "bullet") === listStyle
      ) {
        items.push(content[i]);
        i += 1;
      }
      const ListTag = listStyle === "number" ? "ol" : "ul";
      nodes.push(
        <ListTag
          key={`list-${nodes.length}`}
          className={
            listStyle === "number"
              ? "list-decimal pl-6 my-4 space-y-2 font-body-md text-body-md text-on-surface"
              : "list-disc pl-6 my-4 space-y-2 font-body-md text-body-md text-on-surface"
          }
        >
          {items.map((item, j) => (
            <li key={item._key || j}>
              <PortableTextSpans nodes={item.children} markDefs={item.markDefs} />
            </li>
          ))}
        </ListTag>
      );
      continue;
    }
    nodes.push(<PortableTextBlock key={block?._key || i} block={block} />);
    i += 1;
  }

  return <div className="prose prose-on-surface max-w-none">{nodes}</div>;
}

function PortableTextBlock({ block }: { block: any }) {
  if (!block || typeof block !== "object") return null;
  switch (block._type) {
    case "block": {
      const style = block.style || "normal";
      const children = (
        <PortableTextSpans nodes={block.children} markDefs={block.markDefs} />
      );
      if (style === "h1") {
        return (
          <h1 className="font-headline-lg text-headline-lg text-on-surface my-6">
            {children}
          </h1>
        );
      }
      if (style === "h2") {
        return (
          <h2 className="font-headline-md text-headline-md text-on-surface my-5">
            {children}
          </h2>
        );
      }
      if (style === "h3") {
        return (
          <h3 className="font-title text-title text-on-surface my-4">
            {children}
          </h3>
        );
      }
      if (style === "blockquote") {
        return (
          <blockquote className="border-l-2 border-secondary pl-4 my-6 font-headline-sm text-headline-sm italic text-primary">
            {children}
          </blockquote>
        );
      }
      return (
        <p className="font-body-md text-body-md text-on-surface my-4 leading-relaxed">
          {children}
        </p>
      );
    }
    case "image": {
      const url = urlForImage(block)?.width(1400).url();
      if (!url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-container">
            <Image
              src={url}
              alt={block.alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {block.caption ? (
            <figcaption className="font-body-sm text-body-sm text-on-surface-variant mt-2 italic text-center">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    default:
      return null;
  }
}

function PortableTextSpans({
  nodes,
  markDefs,
}: {
  nodes: any[];
  markDefs?: any[];
}) {
  if (!Array.isArray(nodes)) return null;
  const defsByKey = new Map(
    (Array.isArray(markDefs) ? markDefs : []).map((d: any) => [d?._key, d])
  );
  return (
    <>
      {(nodes ?? []).map((child: any, i: number) => {
        if (!child || typeof child !== "object") return null;
        if (child._type !== "span") return null;
        const marks: string[] = Array.isArray(child.marks) ? child.marks : [];
        let node: React.ReactNode = <>{child.text}</>;
        const strong = marks.includes("strong");
        const em = marks.includes("em");
        const underline = marks.includes("underline");
        const code = marks.includes("code");
        if (code) {
          node = (
            <code className="bg-surface-container px-1.5 py-0.5 rounded-sm font-mono text-[0.9em]">
              {node}
            </code>
          );
        }
        // fontWeight/fontStyle via classes keeps brand typography.
        node = (
          <span
            className={
              [strong ? "font-bold" : "", em ? "italic" : "", underline ? "underline" : ""]
                .filter(Boolean)
                .join(" ") || undefined
            }
          >
            {node}
          </span>
        );
        for (const mark of marks) {
          const def: any = defsByKey.get(mark);
          if (def?._type === "link" && def?.href) {
            const href: string = def.href;
            const internal = href.startsWith("/");
            node = internal ? (
              <Link
                key={`${child._key || i}-${mark}`}
                href={href}
                className="text-secondary underline underline-offset-2 hover:text-primary transition-colors"
              >
                {node}
              </Link>
            ) : (
              <a
                key={`${child._key || i}-${mark}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary underline underline-offset-2 hover:text-primary transition-colors"
              >
                {node}
              </a>
            );
          }
        }
        return <span key={child._key || i}>{node}</span>;
      })}
    </>
  );
}
