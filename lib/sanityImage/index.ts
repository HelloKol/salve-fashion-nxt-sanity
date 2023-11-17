import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || "",
});

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
