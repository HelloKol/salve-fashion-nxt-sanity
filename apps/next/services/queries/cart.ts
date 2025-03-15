import { gql } from '@apollo/client';

export const PRODUCT_CART = `
  id
  title
  quantity
  variant {
    availableForSale
    barcode
    currentlyNotInStock
    id
    image {
      transformedSrc
      originalSrc
      url
    }
    price {
      amount
      currencyCode
    }
    quantityAvailable
    requiresShipping
    selectedOptions {
      name
      value
    }
    sku
    taxable
    title
    unitPrice {
      amount
      currencyCode
    }
    weight
    weightUnit
  }
`;

export const CREATE_CART = gql`
  mutation cartCreate {
    cartCreate {
      cart {
        id
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const ADD_DISCOUNT_TO_CART = gql`
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_QUANTITY = gql`
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      cost {
        checkoutChargeAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
      createdAt
      discountAllocations {
        discountedAmount {
          amount
          currencyCode
        }
        ... on CartCodeDiscountAllocation {
          __typename
          code
          discountedAmount {
            amount
            currencyCode
          }
        }
      }
      discountCodes {
        applicable
        code
      }
      lines(first: 100) {
        nodes {
          cost {
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
          }
          id
          merchandise {
            ... on ProductVariant {
              availableForSale
              barcode
              compareAtPrice {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
              currentlyNotInStock
              id
              image {
                altText
                height
                id
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
              priceV2 {
                amount
                currencyCode
              }
              product {
                id
                handle
                title
              }
              quantityAvailable
              requiresShipping
              selectedOptions {
                name
                value
              }
              sku
              taxable
              title
            }
          }
          quantity
        }
      }
      totalQuantity
    }
  }
`;

export const GET_CUSTOMER = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
    }
  }
`;

export const GET_CHECKOUT_CUSTOMER_ASSOCIATE_V2 = gql`
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              ${PRODUCT_CART}
            }
          }
        }
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
