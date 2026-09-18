import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'djdiiitp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function seed() {
  try {
    console.log('Creating Navbar document...')
    await client.createOrReplace({
      _id: 'navbar-settings',
      _type: 'navbar',
      title: 'Main Website Navbar',
      announcementText: 'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
      navLinks: [
        { label: 'Collection', url: '#shop' },
        { label: 'Ritual', url: '#ritual' },
        { label: 'Sanctuary', url: '#about' },
        { label: 'Journal', url: '#journal' },
      ],
    })

    console.log('Creating Footer document...')
    await client.createOrReplace({
      _id: 'footer-settings',
      _type: 'footer',
      title: 'Main Website Footer',
      brandTagline: 'Scents and spaces designed for slower moments. Hand-poured in Grasse and Aix-en-Provence.',
      copyrightText: '© 2026 Oryenna Atelier de Parfum. All Rights Reserved.',
      footerColumns: [
        {
          columnTitle: 'Atelier',
          links: [
            { label: 'Our Story', url: '#about' },
            { label: 'Grasse Heritage', url: '#ritual' },
          ],
        },
        {
          columnTitle: 'Client Care',
          links: [
            { label: 'Shipping & Transit', url: '/checkout' },
            { label: 'Returns & Calm Guarantee', url: '#' },
          ],
        },
      ],
    })

    console.log('Creating Homepage document...')
    await client.createOrReplace({
      _id: 'home-page-content',
      _type: 'homePage',
      title: 'Homepage',
      heroEyebrow: 'Atelier de Parfum d\'Intérieur',
      heroHeading: 'Silence. Light. Scent.',
      heroDescription: 'Hand-poured candles and quiet room fragrances crafted in Provence from wild botanicals and organic beeswax.',
      heroCtaText: 'Explore Winter Solstice Release',
    })

    console.log('Creating Blog Page document...')
    await client.createOrReplace({
      _id: 'blog-page-content',
      _type: 'blogPage',
      title: 'Journal & Stories',
      eyebrow: 'Atelier Chronicles',
      introText: 'Reflections on slow living, botanical extraction in Grasse, and the architecture of stillness.',
    })

    console.log('Successfully seeded default documents into Sanity Studio!')
  } catch (err) {
    console.error('Seeding note:', err.message)
  }
}

seed()
