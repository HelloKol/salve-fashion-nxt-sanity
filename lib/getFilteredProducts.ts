const getFilteredProducts = (pages: any, tag: any) => {
  const allEdges = pages.flatMap((page: any) => page.edges)
  return allEdges.filter((edge: any) => edge.node.tags.includes(tag))
}

export default getFilteredProducts
