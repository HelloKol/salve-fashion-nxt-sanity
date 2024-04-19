import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Contact')
    .schemaType('contact')
    .child(S.editor().title('Contact').schemaType('contact').documentId('contact'))
)
