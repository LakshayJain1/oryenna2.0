import { defineField, defineType } from 'sanity'

export const journalInsider = defineType({
  name: 'journalInsider',
  title: 'Journal Insider Article (Deep Dive)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Full Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'articleReference',
      title: 'Associated Journal Summary',
      type: 'reference',
      to: [{ type: 'journalArticle' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / Curator',
      type: 'string',
      initialValue: 'Atelier Curators, Grasse',
    }),
    defineField({
      name: 'contentChapters',
      title: 'Essay Chapters & Rich Content',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'chapter',
          title: 'Chapter',
          fields: [
            defineField({ name: 'chapterHeading', title: 'Chapter Heading', type: 'string' }),
            defineField({ name: 'chapterText', title: 'Chapter Paragraphs', type: 'array', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }] }),
            defineField({
              name: 'chapterImage',
              title: 'Chapter Illustration Image',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'curatorNote',
      title: 'Curator Closing Note',
      type: 'text',
    }),
  ],
})