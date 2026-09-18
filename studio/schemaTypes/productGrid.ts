import { defineField, defineType } from 'sanity'

export const productGrid = defineType({
  name: 'productGrid',
  title: 'Product Grid',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Headline',
      type: 'string',
      initialValue: 'Signature Pours',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subhead',
      type: 'string',
      initialValue: 'Four distinct olfactory landscapes',
    }),
    defineField({
      name: 'productFilter',
      title: 'Product Filter',
      type: 'string',
      options: {
        list: [
          { title: 'All Products', value: 'all' },
          { title: 'In Stock Only', value: 'inStock' },
          { title: 'Bestsellers', value: 'bestseller' },
          { title: 'Limited Editions', value: 'limited' },
        ],
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'string',
      options: {
        list: [
          { title: '1 Column (Mobile)', value: '1' },
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns (Desktop)', value: '4' },
        ],
      },
      initialValue: '4',
    }),
    defineField({
      name: 'showVendor',
      title: 'Show Vendor/Collection',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'showBadge',
      title: 'Show Badge',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Product Grid',
        subtitle: subtitle ? `(${subtitle})` : undefined,
      }
    },
  },
})