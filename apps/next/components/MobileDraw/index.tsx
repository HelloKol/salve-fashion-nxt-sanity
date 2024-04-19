import Link from "next/link"
import { useState, useEffect } from "react"
import { useShoppingCart } from "@/context/Cart"
import { Container } from "@/components"
import { useHeaderCollapse } from "@/hooks"
import FullLogoStack from "@/components/svg/FullLogoStack"
import User from "@/components/svg/User"
import Close from "@/components/svg/Close"
import Hamburger from "@/components/svg/Hamburger"
import Search from "@/components/svg/Search"
import Bag from "@/components/svg/Bag"
import { cn } from "@/utils"
import styles from "./styles.module.scss"

interface props {
  setIsSearchModalOpen: (isOpen: boolean) => void
}

const MobileDraw = ({ setIsSearchModalOpen }: props) => {
  const isHeaderCollapsed = useHeaderCollapse()
  const { isCartOpen, setIsCartOpen, cart } = useShoppingCart()
  const [isMobileDrawActive, setIsMobileDrawActive] = useState(false)

  useEffect(() => {
    if (isMobileDrawActive) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [isMobileDrawActive])

  const handleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <header className={styles.mobileDrawHeader}>
      <div className="absolute inset-0">
        <div
          className={cn(
            "absolute inset-0 bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter duration-500",
            isHeaderCollapsed ? "opacity-100" : "opacity-0"
          )}
        ></div>
      </div>
      <nav className={styles.mobileDrawNav}>
        <Container>
          <div className={styles.iconsWrap}>
            <div className={styles.iconLeft}>
              <Link href="/account">
                <User className="h-5 w-5 fill-black" />
              </Link>
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className={styles.searchBtn}
              >
                <Search />
              </button>
            </div>

            <div className={styles.iconMiddle}>
              <Link href="/">
                <FullLogoStack className={styles.fullLogo} />
              </Link>
            </div>

            <div className={styles.iconRight}>
              <button className={styles.bagBtn} onClick={handleCart}>
                <Bag />
                <span>({`${cart?.cart?.lines?.nodes?.length || 0}`})</span>
              </button>
              <input
                id="active"
                className={styles.input}
                type="checkbox"
                checked={isMobileDrawActive}
                onChange={() => setIsMobileDrawActive(!isMobileDrawActive)}
              />
              <label htmlFor="active" className={styles.menuBtn}>
                {isMobileDrawActive ? (
                  <Close className={styles.closeBtn} />
                ) : (
                  <Hamburger className={styles.hamburgerBtn} />
                )}
              </label>
            </div>
          </div>

          <div
            className={`${styles.wrapper} ${
              isMobileDrawActive && styles.wrapperActive
            }`}
          >
            <ul>
              <li onClick={() => setIsMobileDrawActive(false)}>
                <Link href="/shop/men" className={styles.link}>
                  Men
                </Link>
              </li>
              <li onClick={() => setIsMobileDrawActive(false)}>
                <Link href="/shop/women" className={styles.link}>
                  Women
                </Link>
              </li>
              <li onClick={() => setIsMobileDrawActive(false)}>
                <Link href="/collections" className={styles.link}>
                  Collection
                </Link>
              </li>
              <li onClick={() => setIsMobileDrawActive(false)}>
                <Link href="/about" className={styles.link}>
                  Brand
                </Link>
              </li>
              <li onClick={() => setIsMobileDrawActive(false)}>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default MobileDraw
