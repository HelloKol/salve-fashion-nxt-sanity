import {defineField} from 'sanity'

export default defineField({
  name: 'hero.home',
  title: 'Home hero',
  type: 'object',
  fields: [
    // Collections
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [
        {
          name: 'collection',
          title: 'Collection',
          type: 'reference',
          weak: true,
          to: [{type: 'collection'}],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
