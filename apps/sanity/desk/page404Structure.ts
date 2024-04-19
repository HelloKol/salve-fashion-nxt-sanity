import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('404')
    .schemaType('page404')
    .child(S.editor().title('404').schemaType('page404').documentId('page404'))
)
