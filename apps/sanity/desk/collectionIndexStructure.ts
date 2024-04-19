import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Collection Index')
    .schemaType('collectionIndex')
    .child(
      S.editor()
        .title('Collection Index')
        .schemaType('collectionIndex')
        .documentId('collectionIndex')
    )
)
