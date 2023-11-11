import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useShoppingCart } from "@/context/Cart";
import Close from "../svg/Close";
import Hamburger from "../svg/Hamburger";
import Search from "../svg/Search";
import Bag from "../svg/Bag";
import styles from "./styles.module.scss";
import { Button, Container, SearchPopup } from "..";
import { useDialogBox, useHeaderCollapse } from "@/hooks";
import FullLogoStack from "../svg/FullLogoStack";
import User from "../svg/User";

const MobileDraw = () => {
  const router = useRouter();
  const { isOpen, setIsOpen } = useDialogBox();
  const isHeaderCollapsed = useHeaderCollapse();
  const { isCartOpen, setIsCartOpen, cartItems } = useShoppingCart();
  const [isMobileDrawActive, setIsMobileDrawActive] = useState(false);
  const isLandingPage = router?.asPath === "/";
  const headerClasses = `${styles.mobileDrawHeader} ${
    isHeaderCollapsed || !isLandingPage ? styles.scrolled : ""
  }`;

  useEffect(() => {
    if (isMobileDrawActive) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isMobileDrawActive]);

  const handleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className={headerClasses}>
      <nav className={styles.mobileDrawNav}>
        <Container>
          <div className={styles.iconsWrap}>
            <div className={styles.iconLeft}>
              <Link href="/account">
                <User className="fill-black h-5 w-5" />
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className={styles.searchBtn}
              >
                <Search />
              </button>
              <SearchPopup isSearchOpen={isOpen} setIsSearchOpen={setIsOpen} />
            </div>

            <div className={styles.iconMiddle}>
              <Link href="/">
                <FullLogoStack className={styles.fullLogo} />
              </Link>
            </div>

            <div className={styles.iconRight}>
              <button className={styles.bagBtn} onClick={handleCart}>
                <Bag />
                <span>({`${cartItems?.length}`})</span>
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
                  About
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
  );
};

export default MobileDraw;
