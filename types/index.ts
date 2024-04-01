export interface ShopifyCollection {
  id: string
  title: string
  handle: string
  image: {
    transformedSrc: string
    altText: string
  }
  isDeleted: boolean
  sortOrder: string
  slug: {
    _type: string
    current: string
  }
  imageUrl: string
  descriptionHtml: string
  createdAt: string
  gid: string
}

export interface ProductImageNode {
  altText: string
  height: number
  id: string
  originalSrc: string
  src: string
  transformedSrc: string
  url: string
  width: number
}

export interface ProductVariantNode {
  availableForSale: boolean
  barcode: null
  currentlyNotInStock: boolean
  id: string
  image: ProductImageNode
  price: {
    amount: string
    currencyCode: string
  }
  priceV2: {
    amount: string
    currencyCode: string
  }
  requiresShipping: boolean
  sku: string
  taxable: boolean
  title: string
  unitPrice: null
  weight: number
  weightUnit: string
  selectedOptions: {
    name: string
    value: string
  }[]
  compareAtPrice?: string
  compareAtPriceV2?: {
    amount: string
    currencyCode: string
  }
}

export interface ShopifyProduct {
  availableForSale: boolean
  createdAt: string
  description: string
  descriptionHtml: string
  featuredImage: ProductImageNode
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  handle: string
  id: string
  isGiftCard: boolean
  onlineStoreUrl: string
  productType: string
  publishedAt: string
  requiresSellingPlan: boolean
  tags: string[]
  title: string
  totalInventory: number
  trackingParameters: string
  updatedAt: string
  vendor: string
  options: {
    id: string
    name: string
    values: string[]
  }[]
  priceRange: {
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    edges: {
      node: ProductImageNode
    }[]
  }
  variants: {
    edges: {
      node: ProductVariantNode
    }[]
  }
}

export type Cart = {
  cart: {
    __typename: string
    id: string
    cost: {
      __typename: string
      checkoutChargeAmount: {
        __typename: string
        amount: string
        currencyCode: string
      }
      subtotalAmount: {
        __typename: string
        amount: string
        currencyCode: string
      }
      totalAmount: {
        __typename: string
        amount: string
        currencyCode: string
      }
      totalDutyAmount: null
      totalTaxAmount: null
    }
    createdAt: string
    discountAllocations: []
    discountCodes: []
    lines: {
      __typename: string
      nodes: [
        {
          __typename: string
          cost: {
            __typename: string
            amountPerQuantity: {
              __typename: string
              amount: string
              currencyCode: string
            }
            compareAtAmountPerQuantity: null
            subtotalAmount: {
              __typename: string
              amount: string
              currencyCode: string
            }
            totalAmount: {
              __typename: string
              amount: string
              currencyCode: string
            }
          }
          discountAllocations: []
          id: string
          merchandise: {
            __typename: string
            availableForSale: boolean
            barcode: null
            compareAtPrice: null
            compareAtPriceV2: null
            currentlyNotInStock: boolean
            id: string
            image: {
              __typename: string
              altText: string
              height: number
              id: string
              originalSrc: string
              src: string
              transformedSrc: string
              url: string
              width: number
            }
            price: {
              __typename: string
              amount: string
              currencyCode: string
            }
            priceV2: {
              __typename: string
              amount: string
              currencyCode: string
            }
            product: {
              __typename: string
              id: string
              handle: string
              title: string
            }
            quantityAvailable: number
            requiresShipping: boolean
            selectedOptions: [
              {
                __typename: string
                name: string
                value: string
              },
              {
                __typename: string
                name: string
                value: string
              },
            ]
            sku: string
            taxable: boolean
            title: string
          }
          quantity: number
        },
      ]
    }
    totalQuantity: number
  }
}

// USER TYPES - LOGIN/REGISTER
export type FormDataLogin = {
  email: string
  password: string
}

type CommonFormField =
  | "email"
  | "password"
  | "confirmPassword"
  | "firstName"
  | "lastName"

export type CommonFormFieldRecord = Record<CommonFormField, string>

export type FormDataRegister = {
  rememberMeCheckbox?: boolean
  acceptPrivacy?: boolean
} & CommonFormFieldRecord

type AddressForm =
  | "address1"
  | "address2"
  | "city"
  | "company"
  | "country"
  | "firstName"
  | "lastName"
  | "phone"
  | "province"
  | "zip"

export type AddressFormRecord = Record<AddressForm, string>

export type CustomerAccessTokenCreateResult = {
  customerAccessTokenCreate: {
    customerAccessToken?: {
      accessToken: string
      expiresAt: string
    }
    customerUserErrors: {
      field: string
      message: string
    }[]
  }
  status: string
  message: string
}

export type CustomerCreateResult = {
  customerCreate: {
    customer?: {
      id: string
      email: string
    }
    userErrors: {
      field: string
      message: string
    }[]
  }
}

export type LinksType = {
  title: string
  url: {
    current: string
  }
}

export type Media = {
  _type: string
  asset: {
    _id: string
    url: string
    metadata: {
      lqip: string
    }
  }
}

export type SeoType = {
  description?: string
  image?: Media
  keywords?: string
  tags?: string
  title?: string
}
