import { graphqlClient } from "@/utils/graphql";

const fetchProducts = async (cursor: any, LIMIT: number) => {
  const productsQuery = `
    query($cursor: String) {
      products(first: ${LIMIT}, after: $cursor) {
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
  `;

  const variables = {
    cursor,
  };

  const data: any = await graphqlClient.request(productsQuery, variables);
  return data.products;
};

export default fetchProducts;
