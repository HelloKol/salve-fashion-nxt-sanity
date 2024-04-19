import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Reset Password')
    .schemaType('resetPassword')
    .child(
      S.editor().title('Reset Password').schemaType('resetPassword').documentId('resetPassword')
    )
)
