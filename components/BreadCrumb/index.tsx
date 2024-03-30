import Link from "next/link"
import { useRouter } from "next/router"

const useBreadcrumbs = () => {
  const router = useRouter()
  const pathSegments = router.asPath
    .split("/")
    .filter((segment) => segment !== "")

  const breadcrumbs = pathSegments.map((segment, index) => {
    const route = `/${pathSegments.slice(0, index + 1).join("/")}`
    return {
      text: segment,
      route,
    }
  })

  return breadcrumbs
}

export default function BreadCrumb({}) {
  const breadcrumbs = useBreadcrumbs()

  return (
    <nav className="col-span-full">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index} className="capitalize">
          {index < breadcrumbs.length - 1 ? (
            <Link href={breadcrumb.route}>{breadcrumb.text} </Link>
          ) : (
            <span className="text-gray-600">{breadcrumb.text}</span>
          )}
          {index < breadcrumbs.length - 1 && " > "}
        </span>
      ))}
    </nav>
  )
}
