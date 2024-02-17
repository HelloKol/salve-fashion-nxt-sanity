import { gql } from "@apollo/client"

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
        createdAt
        currencyCode
        discountApplications (first:1) {
          nodes {
            allocationMethod
            targetSelection
            targetType
            value {
              ... on MoneyV2 {
                __typename
                amount
                currencyCode
              }
            }
          }
        }
        email
        id
        webUrl
        totalPrice {
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

export const ADD_CHECKOUT_DISCOUNT = gql`
  mutation applyDiscountCodeToCheckout(
    $checkoutId: ID!
    $discountCode: String!
  ) {
    checkoutDiscountCodeApplyV2(
      checkoutId: $checkoutId
      discountCode: $discountCode
    ) {
      checkout {
        discountApplications(first: 10) {
          edges {
            node {
              allocationMethod
              targetSelection
              targetType
            }
          }
        }
      }
      checkoutUserErrors {
        message
        code
        field
      }
    }
  }
`
