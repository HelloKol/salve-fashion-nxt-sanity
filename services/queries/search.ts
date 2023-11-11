import { gql } from "@apollo/client";

const SEARCH_QUERY = gql`
  query SearchProducts($query: String!) {
    products(query: $query, first: 10) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price
              }
            }
          }
        }
      }
    }
  }
`;

export { SEARCH_QUERY };
