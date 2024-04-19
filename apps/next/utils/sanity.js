const sanityClient = require("@sanity/client")

module.exports = sanityClient.createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_ID || "hap90xhy",
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET || "production",
  apiVersion: "2022-03-07",
  useCdn: true,
})
