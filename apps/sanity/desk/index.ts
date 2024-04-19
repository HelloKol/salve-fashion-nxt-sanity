/**
 * Desk structure overrides
 */
import {ListItemBuilder, StructureResolver} from 'sanity/desk'
import about from './aboutStructure'
import account from './accountStructure'
import cart from './cartStructure'
import changePassword from './changePasswordStructure'
import collectionIndex from './collectionIndexStructure'
import collections from './collectionStructure'
import contact from './contactStructure'
import home from './homeStructure'
import login from './loginStructure'
import page404 from './page404Structure'
import pages from './pageStructure'
import products from './productStructure'
import register from './registerStructure'
import resetPassword from './resetPasswordStructure'
import settings from './settingStructure'
import shop from './shopStructure'

/**
 * Desk structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom desk structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schemas progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'about',
    'account',
    'cart',
    'changePassword',
    'collection',
    'collectionIndex',
    'contact',
    'home',
    'login',
    'media.tag',
    'page',
    'page404',
    'product',
    'productVariant',
    'register',
    'resetPassword',
    'settings',
    'shop',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      home(S, context),
      about(S, context),
      cart(S, context),
      shop(S, context),
      S.divider(),
      collectionIndex(S, context),
      collections(S, context),
      products(S, context),
      S.divider(),
      login(S, context),
      register(S, context),
      resetPassword(S, context),
      changePassword(S, context),
      account(S, context),
      S.divider(),
      pages(S, context),
      contact(S, context),
      page404(S, context),
      S.divider(),
      settings(S, context),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
