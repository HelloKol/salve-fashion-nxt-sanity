import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {BillIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem().title('Pages').icon(BillIcon).schemaType('page').child(S.documentTypeList('page'))
)
