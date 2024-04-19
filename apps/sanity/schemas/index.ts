// Rich text annotations used in the block content editor.
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

const annotations = [
  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
  annotationProduct,
]

// Document types
import account from './documents/account'
import collection from './documents/collection'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import shop from './documents/shop'

const documents = [account, shop, collection, page, product, productVariant]

// Singleton document types
import about from './singletons/about'
import cart from './singletons/cart'
import changePassword from './singletons/changePassword'
import collectionIndex from './singletons/collectionIndex'
import contact from './singletons/contact'
import home from './singletons/home'
import login from './singletons/login'
import page404 from './singletons/page404'
import register from './singletons/register'
import resetPassword from './singletons/resetPassword'
import settings from './singletons/settings'

const singletons = [
  about,
  cart,
  changePassword,
  collectionIndex,
  contact,
  home,
  login,
  page404,
  register,
  resetPassword,
  settings,
]

// Block content
import body from './blocks/body'

const blocks = [body]

// Object types
import categories from './objects/module/categories'
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionSize from './objects/customProductOption/size'
import heroCollection from './objects/hero/collection'
import heroHome from './objects/hero/home'
import heroPage from './objects/hero/page'
import imageWithProductHotspots from './objects/imageWithProductHotspots'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'
import moduleAccordion from './objects/module/accordion'
import moduleCallout from './objects/module/callout'
import moduleCallToAction from './objects/module/callToAction'
import moduleCollection from './objects/module/collection'
import moduleGrid from './objects/module/grid'
import moduleImage from './objects/module/image'
import moduleImages from './objects/module/images'
import moduleInstagram from './objects/module/instagram'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import placeholderString from './objects/placeholderString'
import productFeed from './objects/module/productFeed'
import productHotspots from './objects/productHotspots'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seoPage from './objects/seo/page'
import seoSettings from './objects/seo/seoSettings'
import shopifyCollection from './objects/shopifyCollection'
import shopifyCollectionRule from './objects/shopifyCollectionRule'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'

const objects = [
  categories,
  customProductOptionColor,
  customProductOptionSize,
  heroCollection,
  heroHome,
  heroPage,
  imageWithProductHotspots,
  linkExternal,
  linkInternal,
  moduleAccordion,
  moduleCallout,
  moduleCallToAction,
  moduleCollection,
  moduleGrid,
  moduleImage,
  moduleImages,
  moduleInstagram,
  moduleProduct,
  moduleProducts,
  placeholderString,
  productFeed,
  productHotspots,
  productOption,
  productWithVariant,
  proxyString,
  seoPage,
  seoSettings,
  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,
]

export const schemaTypes = [...annotations, ...documents, ...singletons, ...objects, ...blocks]
