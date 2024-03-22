export default function useTruncateString(title: string, length: number) {
  if (!title) return ""
  return title.length > length ? `${title.substring(0, length)}...` : title
}
