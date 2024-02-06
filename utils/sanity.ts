import { createClient } from "@sanity/client"

// Create a sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
  apiVersion: "2022-03-07",
  useCdn: true,
})

export { sanityClient }
