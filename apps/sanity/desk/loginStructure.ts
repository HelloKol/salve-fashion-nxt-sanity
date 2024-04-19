import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Login')
    .schemaType('login')
    .child(S.editor().title('Login').schemaType('login').documentId('login'))
)
