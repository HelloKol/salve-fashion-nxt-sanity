import { gql } from "@apollo/client"

const COLLECTION_PRODUCTS = gql`
  query collection($handle: String!) {
    collection(handle: $handle) {
      handle
      id
      products(first: 10) {
        edges {
          node {
            handle
            id
            title
            variants(first: 1) {
              nodes {
                id
                image {
                  altText
                  height
                  originalSrc
                  src
                  transformedSrc
                  url
                  width
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`

export { COLLECTION_PRODUCTS }
