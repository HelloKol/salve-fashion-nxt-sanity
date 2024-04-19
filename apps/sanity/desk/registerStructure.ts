import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Register')
    .schemaType('register')
    .child(S.editor().title('Register').schemaType('register').documentId('register'))
)
