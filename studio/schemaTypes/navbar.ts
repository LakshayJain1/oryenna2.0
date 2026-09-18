import { defineField, defineType } from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      initialValue: 'Main Website Navbar',
    }),
    defineField({
      name: 'announcementText',
      title: 'Top Announcement Banner Text',
      type: 'string',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string' }),
            defineField({ name: 'url', title: 'Target URL or Anchor (#shop)', type: 'string' }),
          ],
        },
      ],
    }),
  ],
})