export async function GET() {
  const markdown = `# Oryenna Studio
> Scents and spaces designed for slower moments. Hand-poured luxury candles from wild botanicals in Jaipur and Aix-en-Rajasthan.

## Overview
Oryenna is an artisanal luxury fragrance and candle studio. Every candle is hand-poured using sustainable botanical waxes, cotton wicks, and mouth-blown glass vessels designed to be reusable for life.

## Core Collections & Signature Products
- **Amber 78 Candle**: Rich resinous amber, smoked labdanum, and aged woods. 290G (Standard) & 500G (Grande).
- **Signature Collection**: Hand-poured botanical creations designed for evening stillness and slow living.
- **Complimentary Scent Samples**: Every order includes 2 mini scent vials (2ml Eau de Parfum).

## Studio Services
- **White-Glove Shipping**: Carbon-neutral transit packed in biodegradable recycled boxes with raw linen cords.
- **Handwritten Calligraphy Notes**: Optional custom calligraphy transcription onto textured heavy-cotton cardstock for gifts.
- **Studio Account**: Secure member portal via Clerk authentication tracking order archives and saved shipping destinations.

## Key Links
- [Shop Collection](https://oryennaweb.vercel.app/shop)
- [Our Craft & Story](https://oryennaweb.vercel.app/about)
- [Journal & Olfactory Notes](https://oryennaweb.vercel.app/journal)
- [Contact Studio](https://oryennaweb.vercel.app/contact)
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
