export interface ShopifyCollection {
  node: {
    id: string
    title: string
    handle: string
    image: {
      transformedSrc: string
      altText: string
    }
  }
}

export interface ProductImageNode {
  node: {
    altText: string
    transformedSrc: string
  }
}

export interface ProductVariantNode {
  node: {
    id: string
    title: string
    price: string
    compareAtPrice?: string
  }
}

export interface ShopifyProduct {
  node: {
    id: string
    title: string
    handle: string
    description: string
    images: {
      edges: ProductImageNode[]
    }
    variants: {
      edges: ProductVariantNode[]
    }
  }
}

export interface ShopifySingleProduct {
  productByHandle: {
    id: string
    title: string
    handle: string
    description: string
    descriptionHtml: string
    images: {
      edges: ProductImageNode[]
    }
    variants: {
      edges: ProductVariantNode[]
    }
  }
}

type CommonFormField =
  | "email"
  | "password"
  | "confirmPassword"
  | "firstName"
  | "lastName"

type CommonFormFieldRecord = Record<CommonFormField, string>

// USER TYPES - LOGIN/REGISTER
export type FormData = {
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
