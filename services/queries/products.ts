import { gql } from "@apollo/client"

const ALL_PRODUCTS = gql`
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          images(first: 1) {
            edges {
              node {
                transformedSrc(maxWidth: 1080, maxHeight: 1080)
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`

const SINGLE_PRODUCT_BY_HANDLE = `
query getProductByHandle($handle: String!) {
  product(handle: $handle) {
    availableForSale
    createdAt
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
    description
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
    variants(first: 100) {
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
          quantityAvailable
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
    images(first: 100) {
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
  }
}
  `

const SINGLE_PRODUCT_BY_ID = `
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      description
      descriptionHtml
      images(first: 100) {
        edges {
          node {
            transformedSrc
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              transformedSrc
            }
          }
        }
      }
    }
  }
    `

export { ALL_PRODUCTS, SINGLE_PRODUCT_BY_HANDLE, SINGLE_PRODUCT_BY_ID }
