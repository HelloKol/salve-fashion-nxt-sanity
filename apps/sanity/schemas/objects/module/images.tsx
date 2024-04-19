import {ImageIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.images',
  title: 'Images',
  type: 'object',
  icon: ImageIcon,
  fields: [
    // Title
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'default', value: 'default'},
          {title: 'featured', value: 'featured'},
        ],
      },
    }),
    // Modules (Images)
    defineField({
      name: 'modules',
      title: 'Images',
      type: 'array',
      of: [{type: 'module.image'}],
      validation: (Rule) => Rule.required().max(2),
    }),
  ],
  preview: {
    select: {
      images: 'modules',
    },
    prepare(selection) {
      const {images} = selection
      return {
        subtitle: 'Images',
        title: images.length > 0 ? pluralize('image', images.length, true) : 'No images',
        media: ImageIcon,
      }
    },
  },
})
