import { graphqlClient } from "@/utils"

const fetchProducts = async (
  cursor?: any,
  LIMIT?: number,
  query?: string,
  sortKey?: string
) => {
  const productsQuery = `
    query($cursor: String) {
      products(first: ${LIMIT}, after: $cursor, query:"${query}", sortKey: ${sortKey || "CREATED_AT"}) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            title
            handle
            tags
            featuredImage {
              originalSrc
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  const variables = {
    cursor,
  }

  const data: any = await graphqlClient.request(productsQuery, variables)
  return data.products
}

export default fetchProducts
