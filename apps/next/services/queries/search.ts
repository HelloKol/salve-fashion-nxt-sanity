import { gql } from "@apollo/client"
import { PRODUCT_BASE, PRODUCT_VARIANT } from "."

const SEARCH_QUERY = gql`
  query SearchProducts($query: String!) {
    products(query: $query, first: 10) {
      edges {
        node {
         ${PRODUCT_BASE}
         ${PRODUCT_VARIANT}
        }
      }
    }
  }
`

const SEARCH_QUERY_PREDICTIVE = gql`
  query suggestions($query: String!) {
    predictiveSearch(query: $query) {
      products {
        ${PRODUCT_BASE}
        ${PRODUCT_VARIANT}
      }
    }
  }
`

export { SEARCH_QUERY_PREDICTIVE, SEARCH_QUERY }
