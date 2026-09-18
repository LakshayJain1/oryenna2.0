import { defineField, defineType } from 'sanity'

export const journalInsider = defineType({
  name: 'journalInsider',
  title: 'Journal Insider Article',
  type: 'document',
  description: 'A single journal article (slug page). Create one document per dispatch.',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'publishedBy',
      title: 'Publish By',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Full Article Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
      description: 'Full rich text article — headings, quotes, links, and body copy.',
    }),
    defineField({
      name: 'closingNote',
      title: 'Closing Note',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      publishedBy: 'publishedBy',
    },
    prepare({ title, media, publishedBy }) {
      return {
        title: title || 'Journal Insider Article',
        subtitle: publishedBy ? `By ${publishedBy}` : 'Deep dive',
        media,
      }
    },
  },
})
