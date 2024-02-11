import { graphqlClient } from "@/utils"

const fetchProductsSearch = async (
  cursor: any,
  LIMIT: number,
  query: string,
  sortKey?: string
) => {
  const productsQuery = `
  {
    search(first: ${LIMIT}, query: ${query}, sortKey: RELEVANCE) {
      pageInfo {
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Product {
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
  }
  `

  const variables = {
    cursor,
  }

  const data: any = await graphqlClient.request(productsQuery)

  return data.search
}

export default fetchProductsSearch
