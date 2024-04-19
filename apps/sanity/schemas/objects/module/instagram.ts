import {UserIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.instagram',
  title: 'Instagram',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare(selection) {
      const {url} = selection
      return {
        subtitle: 'Instagram',
        title: url,
        media: UserIcon,
      }
    },
  },
})
