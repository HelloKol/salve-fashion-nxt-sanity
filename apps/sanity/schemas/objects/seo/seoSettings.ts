import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'seo.settings',
  title: 'SEO Settings',
  type: 'object',
  description: 'Defaults for every page',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      title: 'Site Name',
      name: 'siteName',
      type: 'string',
    }),
    defineField({
      title: 'Site Name Position',
      name: 'siteNamePosition',
      type: 'string',
      options: {
        list: [
          {title: 'Before', value: 'before'},
          {title: 'After', value: 'after'},
        ],
      },
    }),
    defineField({
      title: 'SEO Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'SEO Description',
      name: 'description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      title: 'SEO Keywords',
      name: 'keywords',
      type: 'string',
    }),
    defineField({
      title: 'SEO Image',
      name: 'image',
      type: 'image',
    }),
    defineField({
      title: 'Canonical URL',
      name: 'canonicalUrl',
      type: 'url',
    }),
  ],
})
