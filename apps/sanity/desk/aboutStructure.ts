import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('About')
    .schemaType('about')
    .child(S.editor().title('About').schemaType('about').documentId('about'))
)
