import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'djdiiitp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  token: process.env.SANITY_API_TOKEN, // Optional if token is provided in env
  useCdn: false,
})

async function seed() {
  console.log('Seeding initial data to Sanity dataset...')

  try {
    // 1. Navbar Document
    const navbar = await client.createOrReplace({
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
    console.log('Created Navbar:', navbar._id)

    // 2. Footer Document
    const footer = await client.createOrReplace({
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
            { label: 'Stockists', url: '#' },
          ],
        },
        {
          columnTitle: 'Client Care',
          links: [
            { label: 'Shipping & Transit', url: '/checkout' },
            { label: 'Returns & Calm Guarantee', url: '#' },
            { label: 'Contact Atelier', url: '#' },
          ],
        },
      ],
    })
    console.log('Created Footer:', footer._id)

    // 3. Homepage Content
    const home = await client.createOrReplace({
      _id: 'home-page-content',
      _type: 'homePage',
      title: 'Homepage',
      heroEyebrow: 'Atelier de Parfum d\'Intérieur',
      heroHeading: 'Silence. Light. Scent.',
      heroDescription: 'Hand-poured candles and quiet room fragrances crafted in Provence from wild botanicals and organic beeswax.',
      heroCtaText: 'Explore Winter Solstice Release',
    })
    console.log('Created Homepage:', home._id)

    // 4. Blog / Journal Page Content
    const blog = await client.createOrReplace({
      _id: 'blog-page-content',
      _type: 'blogPage',
      title: 'Journal & Stories',
      eyebrow: 'Atelier Chronicles',
      introText: 'Reflections on slow living, botanical extraction in Grasse, and the architecture of stillness.',
    })
    console.log('Created Blog Page:', blog._id)

    console.log('Successfully seeded core layout & page documents into Sanity!')
  } catch (error) {
    console.error('Error seeding data (make sure SANITY_API_TOKEN is set in .env.local if write permissions are required):', error)
  }
}

seed()
