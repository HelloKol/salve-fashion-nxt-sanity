import { gql } from "@apollo/client"
import { PRODUCT_BASE, PRODUCT_VARIANT } from "./products"

const COLLECTION_PRODUCTS = gql`
  query collection($handle: String!) {
    collection(handle: $handle) {
      handle
      id
      products(first: 100) {
        edges {
          node {
            ${PRODUCT_BASE}
            ${PRODUCT_VARIANT}
          }
        }
      }
    }
  }
`

export { COLLECTION_PRODUCTS }
