import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Container, MobileDraw, SearchPopup } from '@/components';
import FullLogo from '@/components/svg/FullLogo';
import { useHeaderCollapse } from '@/hooks';
import { useShoppingCart } from '@/context/Cart';
import { useAuth } from '@/context/User';
import { useWindowDimension } from '@/hooks';
import { cn } from '@/utils';

const SiteHeader = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { cart, isCartOpen, isSearchModalOpen, setIsCartOpen, setIsSearchModalOpen } = useShoppingCart();
  const isHeaderCollapsed = useHeaderCollapse();
  const { isDesktop, isWidescreen } = useWindowDimension();

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      {isDesktop || isWidescreen ? (
        <header className={'fixed left-0 top-0 z-50 w-full transition-all duration-500'}>
          <div className="absolute inset-0">
            <div
              className={cn(
                'absolute inset-0 bg-white bg-opacity-80 backdrop-blur-lg backdrop-filter duration-500',
                isHeaderCollapsed ? 'opacity-100' : 'opacity-0'
              )}
            ></div>
          </div>
          <nav className="relative py-6">
            <Container>
              <div className="flex items-center justify-between">
                <div className="flex space-x-8">
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.pathname === '/about' && 'text-deepPurple'
                    )}
                    href="/about"
                  >
                    Brand
                  </Link>
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.pathname.includes('/collections') && 'text-deepPurple'
                    )}
                    href="/collections"
                  >
                    Collections
                  </Link>
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.asPath.includes('/shop/men') && 'text-deepPurple'
                    )}
                    href="/shop/men"
                  >
                    Men
                  </Link>
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.asPath.includes('/shop/women') && 'text-deepPurple'
                    )}
                    href="/shop/women"
                  >
                    Women
                  </Link>
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.asPath.includes('/register') && 'text-deepPurple'
                    )}
                    href="/register"
                  >
                    Register
                  </Link>
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.asPath.includes('/account/profile') && 'text-deepPurple'
                    )}
                    href="/account/profile"
                  >
                    Account
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
                      className={cn(
                        'text-black hover:text-gray-700',
                        router.pathname.includes('/account') && 'text-deepPurple'
                      )}
                      href="/account/profile"
                    >
                      Account
                    </Link>
                  ) : (
                    <Link
                      className={cn(
                        'text-black hover:text-gray-700',
                        router.pathname === '/login' && 'text-deepPurple'
                      )}
                      href="/login"
                    >
                      Login
                    </Link>
                  )}
                  <Link
                    className={cn(
                      'text-black hover:text-gray-700',
                      router.pathname === '/contact' && 'text-deepPurple'
                    )}
                    href="/contact"
                  >
                    Contact
                  </Link>
                  <Button variant="primary" onClick={() => setIsSearchModalOpen(true)}>
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

      <SearchPopup isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen} />
    </>
  );
};

export default SiteHeader;
