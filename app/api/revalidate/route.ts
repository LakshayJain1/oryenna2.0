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

  let payload: { _type?: string; slug?: unknown };
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

  if (type === "product") {
    if (slug) touch(`/product/${slug}`);
    touch("/shop");
  } else if (type === "collection") {
    if (slug) touch(`/collections/${slug}`);
    touch("/shop");
  } else if (type === "journalArticle") {
    if (slug) touch(`/journal/${slug}`);
    touch("/journal");
  } else if (
    type === "homePage" ||
    type === "siteSettings" ||
    type === "navbar" ||
    type === "footer"
  ) {
    // Covered by the layout + homepage touches above.
  } else if (type === "shopPage") {
    touch("/shop");
  } else if (type === "aboutPage") {
    touch("/about");
  } else if (type === "contactPage") {
    touch("/contact");
  } else if (type === "faqPage") {
    touch("/faq");
  } else if (type === "shippingPage") {
    touch("/shipping");
  } else if (type === "returnsPage") {
    touch("/returns");
  } else if (type === "privacyPolicyPage") {
    touch("/privacy-policy");
  } else if (type === "termsPage") {
    touch("/terms");
  } else if (type === "moodRecommendation") {
    touch("/concierge");
  } else if (type === "complimentarySample") {
    touch("/checkout");
  }

  return Response.json({ revalidated });
}
