import {BulbOutlineIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.categories',
  title: 'Categories',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    // Images
    defineField({
      name: 'blockImages',
      title: 'Images',
      type: 'module.images',
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
