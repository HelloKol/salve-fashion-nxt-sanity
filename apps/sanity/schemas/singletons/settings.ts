import {CogIcon, PackageIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

const TITLE = 'Settings'

export default defineType({
  name: 'settings',
  type: 'document',
  title: TITLE,
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'searchModal',
      title: 'Search modal',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Menu
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Links
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
        }),
      ],
    }),
    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'navigation',
      options: {
        collapsed: false,
        collapsible: true,
      },
      fields: [
        // Credit
        defineField({
          name: 'credit',
          title: 'Credit',
          type: 'string',
        }),
        // Columns
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
                },
              ],
            },
          ],
        }),
      ],
    }),
    // Search modal content
    defineField({
      name: 'searchModal',
      title: 'Search modal',
      type: 'object',
      group: 'searchModal',
      fields: [
        defineField({
          title: 'Most Searched Products',
          name: 'mostSearchedProducts',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'predictiveSearchQuery',
          title: 'Predictive search query',
          type: 'string',
        }),
      ],
    }),
    // SEO
    defineField({
      name: 'seoSettings',
      title: 'SEO',
      type: 'seo.settings',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
