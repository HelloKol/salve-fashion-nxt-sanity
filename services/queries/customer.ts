import { gql } from "@apollo/client";

const ORDER_HISTORY = gql`
  query ($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: $first) {
        edges {
          node {
            orderNumber
            processedAt
            totalPriceV2 {
              amount
              currencyCode
            }
            lineItems(first: 5) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                    image {
                      src
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export { ORDER_HISTORY };
