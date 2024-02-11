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

// USER TYPES - LOGIN/REGISTER
export type FormData = {
  email: string
  password: string
  confirmPassword?: string
  firstName?: string
  lastName?: string
  rememberMeCheckbox?: boolean
  acceptPrivacy?: boolean
}

export type AddressFormData = {
  address1: string
  address2: string
  city: string
  company: string
  country: string
  firstName: string
  lastName: string
  phone: string
  province: string
  zip: string
}

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
