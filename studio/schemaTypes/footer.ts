import { defineField, defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      initialValue: 'Main Website Footer',
    }),
    defineField({
      name: 'brandTagline',
      title: 'Brand Footer Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Navigation Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'columnTitle', title: 'Column Title', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'url', title: 'URL', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})