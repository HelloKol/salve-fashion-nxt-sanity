import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button, Container, MobileDraw, SearchPopup } from "@/components"
import FullLogo from "@/components/svg/FullLogo"
import { useDialogBox, useHeaderCollapse } from "@/hooks"
import { useShoppingCart } from "@/context/Cart"
import { useAuth } from "@/context/User"
import { useWindowDimension } from "@/hooks"

const SiteHeader = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const {
    cart,
    isCartOpen,
    isSearchModalOpen,
    setIsCartOpen,
    setIsSearchModalOpen,
  } = useShoppingCart()
  const isHeaderCollapsed = useHeaderCollapse()
  const { isDesktop, isWidescreen } = useWindowDimension()

  const isLandingPage =
    router?.asPath === "/" || router?.asPath.includes("/collections")
  const isCollectionPage = router?.asPath === "/collections"
  const headerClasses = `fixed w-full top-0 left-0 z-50 transition-all duration-500 ${
    isCollectionPage ? `` : isHeaderCollapsed ? "bg-[#E9EBE0] text-black" : ``
  }`

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <>
      {isDesktop || isWidescreen ? (
        <header className={headerClasses}>
          <nav className="relative py-6">
            <Container>
              <div className="flex items-center justify-between">
                <div className="flex space-x-8">
                  <Link
                    className="text-black hover:text-gray-700"
                    href="/about"
                  >
                    Brand
                  </Link>
                  <Link
                    className="text-black hover:text-gray-700"
                    href="/collections"
                  >
                    Collections
                  </Link>
                  <Link
                    className="text-black hover:text-gray-700"
                    href="/shop/men"
                  >
                    Men
                  </Link>
                  <Link
                    className="text-black hover:text-gray-700"
                    href="/shop/women"
                  >
                    Women
                  </Link>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 transform">
                  <Link href="/">
                    <FullLogo className="h-10" />
                  </Link>
                </div>

                <div className="flex items-center space-x-4">
                  {isAuthenticated ? (
                    <Link
                      className="text-black hover:text-gray-700"
                      href="/account/profile"
                    >
                      Account
                    </Link>
                  ) : (
                    <Link
                      className="text-black hover:text-gray-700"
                      href="/login"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    className="text-black hover:text-gray-700"
                    href="/contact"
                  >
                    Contact
                  </Link>
                  <Button
                    variant="primary"
                    onClick={() => setIsSearchModalOpen(true)}
                  >
                    Search
                  </Button>
                  <Button variant="primary" onClick={handleCartOpen}>
                    Bag ({`${cart?.cart?.lines?.nodes?.length || 0}`})
                  </Button>
                </div>
              </div>
            </Container>
          </nav>
        </header>
      ) : (
        <MobileDraw setIsSearchModalOpen={setIsSearchModalOpen} />
      )}

      <SearchPopup
        isSearchModalOpen={isSearchModalOpen}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
    </>
  )
}

export default SiteHeader
