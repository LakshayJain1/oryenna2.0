import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Atelier Site Settings & Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Store Title',
      type: 'string',
      initialValue: "Oryenna — Atelier de Parfum d'Intérieur",
    }),
    defineField({
      name: 'description',
      title: 'Store Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'announcementBar',
      title: 'Top Announcement Bar Text',
      type: 'string',
      initialValue: 'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
    }),
  ],
})