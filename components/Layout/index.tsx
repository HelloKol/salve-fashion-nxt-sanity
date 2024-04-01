import { SiteHeader, SiteFooter } from "@/components"

interface props {
  children: React.ReactNode | React.ReactNode[]
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
