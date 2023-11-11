import { gql } from "@apollo/client";

// userErrors {
//       field
//       message
//     }
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
`;

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
`;

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
`;

const VERIFY_TOKEN = `
  query VerifyToken($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
    }
  }
`;

export { REGISTER_CUSTOMER, LOGIN_CUSTOMER, LOGOUT_CUSTOMER, VERIFY_TOKEN };
