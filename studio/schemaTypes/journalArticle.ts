import { defineField, defineType } from 'sanity'

export const journalArticle = defineType({
  name: 'journalArticle',
  title: 'Journal Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / Tag',
      type: 'string',
      description: 'e.g. OLFACTORY STUDY, PROVENCE RITUALS, ARCHIVE',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '4 MIN READ',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Full Article Content',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }], lists: [] }],
    }),
    defineField({
      name: 'author',
      title: 'Author / Curator',
      type: 'string',
      initialValue: 'Atelier Curators, Grasse',
    }),
    defineField({
      name: 'insiderArticle',
      title: 'Journal Insider Article (Deep Dive)',
      type: 'reference',
      to: [{ type: 'journalInsider' }],
    }),
    defineField({
      name: 'orderRank',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Journal Article',
      }
    },
  },
})