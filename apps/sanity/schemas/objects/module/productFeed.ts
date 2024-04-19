import {BulbOutlineIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.productFeed',
  title: 'Product Feed',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // Text
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => [
        Rule.max(400).warning(`Product Feed length shouldn't be more than 400 characters.`),
      ],
    }),
    // Products
    defineField({
      name: 'productWithVariant',
      title: 'Products with variant',
      type: 'array',
      of: [{type: 'productWithVariant'}],
    }),
    // Link
    defineField({
      name: 'links',
      title: 'Link',
      type: 'array',
      of: [{type: 'linkInternal'}, {type: 'linkExternal'}],
      validation: (Rule) => Rule.max(1),
    }),
  ],
  preview: {
    select: {
      text: 'text',
      url: 'url',
    },
    prepare(selection) {
      const {text, url} = selection
      return {
        subtitle: 'Product Feed',
        title: text,
        media: BulbOutlineIcon,
      }
    },
  },
})
