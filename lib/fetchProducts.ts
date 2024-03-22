import { graphqlClient } from "@/utils"
import { PRODUCT_BASE, PRODUCT_VARIANT } from "@/services/queries"

const fetchProducts = async (
  cursor?: any,
  LIMIT?: number,
  query?: string,
  reverse?: boolean,
  sortKey?: string
) => {
  const productsQuery = `
    query($cursor: String) {
      products(first: ${LIMIT}, after: $cursor, query:"${query}", reverse: ${reverse}, sortKey: ${sortKey || "CREATED_AT"}) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            ${PRODUCT_BASE}
            ${PRODUCT_VARIANT}
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
