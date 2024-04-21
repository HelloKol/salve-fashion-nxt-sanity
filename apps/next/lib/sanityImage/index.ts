import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { env } from '@/utils/env';

const builder = imageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_STUDIO_ID || '',
  dataset: env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || ''
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
