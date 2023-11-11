import { gql } from "@apollo/client";

const ALL_PRODUCTS = gql`
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          images(first: 1) {
            edges {
              node {
                transformedSrc(maxWidth: 1080, maxHeight: 1080)
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

const SINGLE_PRPDUCT = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        images(first: 1) {
          edges {
            node {
              transformedSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              price
              compareAtPrice
            }
          }
        }
      }
    }
  `;

export { ALL_PRODUCTS, SINGLE_PRPDUCT };
