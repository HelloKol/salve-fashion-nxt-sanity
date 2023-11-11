import { gql } from "@apollo/client";

const COLLECTIONS_QUERY = gql`
  query {
    collections(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          image {
            transformedSrc(maxWidth: 2000, maxHeight: 2000)
            altText
          }
        }
      }
    }
  }
`;

export { COLLECTIONS_QUERY };
