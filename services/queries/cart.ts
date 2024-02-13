import { gql } from "@apollo/client"

export const PRODUCT_CART = `
  id
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
      originalSrc
    }
  }
`

export const ADD_TO_CART = gql`
  mutation addToCart($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
      userErrors {
        field
        message
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
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
      userErrors {
        field
        message
      }
    }
  }
`

export const UPDATE_QUANTITY = gql`
  mutation updateQuantity(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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
      userErrors {
        field
        message
      }
    }
  }
`

export const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const GET_CHECKOUT_QUERY = gql`
  query getCheckout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        id
        webUrl
        completedAt
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              ${PRODUCT_CART}
            }
          }
        }
      }
    }
  }
`

export const GET_CUSTOMER_QUERY = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      lastIncompleteCheckout {
        id
      }
    }
  }
`

export const GET_CHECKOUT_CREATE_MUTATION = gql`
  mutation {
    checkoutCreate(input: {}) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

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
`
