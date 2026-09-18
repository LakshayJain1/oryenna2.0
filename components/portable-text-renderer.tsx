"use client";

interface PortableTextRendererProps {
  content: any[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content?.length) return null;

  return (
    <div className="prose prose-on-surface max-w-none">
      {content.map((block: any, i: number) => (
        <PortableTextBlock key={block._key || i} block={block} />
      ))}
    </div>
  );
}

function PortableTextBlock({ block }: { block: any }) {
  switch (block._type) {
    case "block":
      const style = block.style || "normal";
      const Tag = style === "h1" ? "h1" : style === "h2" ? "h2" : style === "h3" ? "h3" : "p";
      return (
        <Tag className={`font-${style.startsWith("h") ? "headline" : "body"}-md text-on-surface my-4`}>
          {block.children?.map((child: any) => (
            <PortableTextSpan key={child._key} span={child} />
          ))}
        </Tag>
      );
    default:
      return null;
  }
}

function PortableTextSpan({ span }: { span: any }) {
  let style: React.CSSProperties = {};
  if (span.marks?.includes("strong")) style = { ...style, fontWeight: 700 };
  if (span.marks?.includes("em")) style = { ...style, fontStyle: "italic" };
  return <span style={style}>{span.text}</span>;
}