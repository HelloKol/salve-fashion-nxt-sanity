import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Change Password')
    .schemaType('changePassword')
    .child(
      S.editor().title('Change Password').schemaType('changePassword').documentId('changePassword')
    )
)
