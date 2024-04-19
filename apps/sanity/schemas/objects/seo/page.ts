import React from 'react'
import {defineField} from 'sanity'

export default defineField({
  name: 'seo.page',
  title: 'SEO',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'placeholderString',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.max(150).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      title: 'SEO Keywords',
      name: 'keywords',
      type: 'string',
    }),
    defineField({
      title: 'SEO Tags',
      name: 'tags',
      type: 'string',
    }),
    defineField({
      title: 'SEO Image',
      name: 'image',
      type: 'image',
    }),
  ],
})
