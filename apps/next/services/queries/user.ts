import { gql } from "@apollo/client"

const REGISTER_CUSTOMER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      userErrors {
        field
        message
      }
    }
  }
`

const LOGIN_CUSTOMER = gql`
  mutation LoginCustomer($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

const LOGOUT_CUSTOMER = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`

const VERIFY_TOKEN = `
  query VerifyToken($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
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

export {
  REGISTER_CUSTOMER,
  LOGIN_CUSTOMER,
  LOGOUT_CUSTOMER,
  VERIFY_TOKEN,
  USER_DETAILS,
}
