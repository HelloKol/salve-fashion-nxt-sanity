import { SiteHeader, SiteFooter } from "@/components"

interface props {
  children: any
}

export default function Layout({ children }: props) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
