import { graphqlClient } from "@/utils"

const fetchProductsSearch = async (
  cursor: any,
  LIMIT: number,
  query: string,
  reverse: boolean,
  sortKey?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  const productsQuery = `
  {
    search(first: ${LIMIT}, query: ${query}, reverse: ${reverse}, sortKey: PRICE, 
    productFilters: {price: {min: ${minPrice || 0}, max: ${maxPrice || 1000}}} ) {
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
