import { revalidatePath } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = process.env.SANITY_REVALIDATE_SECRET;

function slugOf(slug: unknown): string | null {
  if (!slug) return null;
  if (typeof slug === "string") return slug;
  if (typeof slug === "object" && "current" in (slug as Record<string, unknown>)) {
    const current = (slug as { current?: unknown }).current;
    return typeof current === "string" ? current : null;
  }
  return null;
}

export async function POST(request: Request) {
  if (!secret) {
    return Response.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  let payload: { _type?: string; slug?: unknown; pageType?: unknown };
  try {
    payload = JSON.parse(body);
  } catch {
    return Response.json({ message: "Invalid payload" }, { status: 400 });
  }

  const type = payload._type;
  const slug = slugOf(payload.slug);
  const revalidated: string[] = [];

  const touch = (path: string, kind: "page" | "layout" = "page") => {
    revalidatePath(path, kind);
    revalidated.push(kind === "layout" ? `${path} (layout)` : path);
  };

  // Global chrome (header/footer) lives in the root layout — refresh it
  // everywhere, plus the homepage which is fully static.
  touch("/", "layout");
  touch("/");

  // Live schema types only. Obsolete per-route page types (homePage,
  // shopPage, aboutPage, ...) and `siteSettings` were removed — the
  // unified `page` doc below is the source of truth. Collections resolve
  // to /shop?collection= so only /shop needs revalidation.
  if (type === "product") {
    if (slug) touch(`/product/${slug}`);
    touch("/shop");
  } else if (type === "collection") {
    touch("/shop");
  } else if (type === "journalArticle") {
    touch("/journal");
    touch("/");
  } else if (type === "journalInsider") {
    if (slug) touch(`/journal/${slug}`);
    touch("/journal");
    touch("/");
  } else if (type === "navbar" || type === "footer") {
    // Covered by the layout + homepage touches above.
  } else if (type === "page") {
    // Unified page model: route derives from slug (home resolves to /).
    const pageType = typeof payload.pageType === "string" ? payload.pageType : "";
    if (pageType === "home" || slug === "home" || slug === "/") {
      touch("/");
    } else if (slug) {
      touch(`/${slug}`);
    }
  }

  return Response.json({ revalidated });
}
