import { useTruncateString } from "@/hooks"

const TruncateString = ({
  string,
  truncateValue,
}: {
  string: string
  truncateValue: number
}) => {
  const title = useTruncateString(string || "", truncateValue)

  return <>{title}</>
}

export default TruncateString
