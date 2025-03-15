import { gql } from '@apollo/client';

const PRODUCT_BASE = `
  availableForSale
  createdAt
  description
  descriptionHtml
  featuredImage {
    altText
    height
    id
    originalSrc
    src
    transformedSrc
    url
    width
  }
  compareAtPriceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
  handle
  id
  isGiftCard
  onlineStoreUrl
  productType
  publishedAt
  requiresSellingPlan
  tags
  title
  totalInventory
  trackingParameters
  updatedAt
  vendor
  images(first: 10) {
    edges {
      node {
        altText
        height
        id
        originalSrc
        src
        transformedSrc
        url
        width
      }
    }
  }
  options(first: 100) {
    id
    name
    values
  }
  priceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_VARIANT = `
  variants(first: 50) {
    edges {
      node {
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
        requiresShipping
        sku
        taxable
        title
        unitPrice {
          amount
          currencyCode
        }
        weight
        weightUnit
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

const ALL_PRODUCTS = gql`
  query {
    products(first: 250) {
      edges {
        node {
          ${PRODUCT_BASE}
          ${PRODUCT_VARIANT}
        }
      }
    }
  }
`;
const EXAMPLE_PRODUCTS = gql`
  query {
    products(first: 5) {
      edges {
        node {
          ${PRODUCT_BASE}
          ${PRODUCT_VARIANT}
        }
      }
    }
  }
`;

const SINGLE_PRODUCT_BY_HANDLE = `
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    ${PRODUCT_BASE}
    ${PRODUCT_VARIANT}
  }
}
  `;

const SINGLE_PRODUCT_BY_ID = `
  query getProductById($id: ID!) {
    product(id: $id) {
      ${PRODUCT_BASE}
      ${PRODUCT_VARIANT}
    }
  }
    `;

export {
  ALL_PRODUCTS,
  EXAMPLE_PRODUCTS,
  PRODUCT_BASE,
  PRODUCT_VARIANT,
  SINGLE_PRODUCT_BY_HANDLE,
  SINGLE_PRODUCT_BY_ID
};
