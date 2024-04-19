import {HomeIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {validateSlug} from '../../utils/validateSlug'

const TITLE = 'Home'

export default defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'editorial',
    }),
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.home',
      group: 'editorial',
    }),
    // Product Feed
    defineField({
      name: 'productFeedMen',
      title: 'Product Feed',
      type: 'module.productFeed',
      group: 'editorial',
    }),
    // Categories
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'module.categories',
      group: 'editorial',
    }),
    // Video
    defineField({
      name: 'videoPlayer',
      title: 'Video Player',
      type: 'object',
      group: 'editorial',
      fields: [
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'string',
        }),
        defineField({
          name: 'previewImage',
          title: 'Preview Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    // Product Feed
    defineField({
      name: 'productFeedWomen',
      title: 'Product Feed',
      type: 'module.productFeed',
      group: 'editorial',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        // media: icon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
