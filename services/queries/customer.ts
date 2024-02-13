import { gql } from "@apollo/client"
import { PRODUCT_CART } from "."

const ADD_USER_ADDRESS = gql`
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        address1
        address2
        city
        company
        country
        firstName
        lastName
        phone
        province
        zip
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`

const UPDATE_USER_EMAIL = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        acceptsMarketing
        email
        firstName
        lastName
        phone
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`

const UPDATE_USER_PASSWORD = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customer {
        password
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`

const UPDATE_USER_ADDRESS = gql`
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        address1
        address2
        city
        company
        country
        firstName
        lastName
        phone
        province
        zip
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`
const USER_DETAILS = gql`
  query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      acceptsMarketing
      createdAt
      defaultAddress {
        id
        address1
        address2
        city
        company
        country
        countryCodeV2
        name
        firstName
        lastName
        phone
        province
        zip
      }
      email
      id
      firstName
      lastName
      numberOfOrders
      phone
      updatedAt
    }
  }
`

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
                  ${PRODUCT_CART}
                }
              }
            }
          }
        }
      }
    }
  }
`

export {
  USER_DETAILS,
  ORDER_HISTORY,
  ADD_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
}
