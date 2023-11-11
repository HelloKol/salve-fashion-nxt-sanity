import React from "react";
import Link from "next/link";
import { Container } from "@/components";
import FullLogoStack from "@/components/svg/FullLogoStack";

const SiteFooter = () => {
  return (
    <footer className="bg-black text-white px-4 lg:px-6 pt-16 pb-10">
      <Container>
        <div className="text-center mb-8">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-300"
          >
            <FullLogoStack className="h-12 w-auto mx-auto fill-current text-gray-400 hover:text-white transition-colors duration-300" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-start md:justify-between py-14">
          <div className="w-full md:w-1/4">
            <h5 className="text-lg font-medium mb-4">COLLECTIONS</h5>
            <Link
              href="/shop/men"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Men
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Women
            </Link>
            <Link
              href="/shop/men"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Accessories
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Digital
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Sales
            </Link>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="text-lg font-medium mb-4">INFORMATION</h5>
            <Link
              href="/shop/men"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Returns
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Shipping
            </Link>
            <Link
              href="/shop/men"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Terms
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Privacy
            </Link>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="text-lg font-medium mb-4">MORE</h5>
            <Link
              href="/shop/men"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              About
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Contact
            </Link>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              FAQ
            </Link>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="text-lg font-medium mb-4">SOCIAL</h5>
            <Link
              href="/shop/women"
              className="block text-gray-400 hover:text-white transition-colors duration-300 mb-2"
            >
              Instagram
            </Link>
          </div>
        </div>
        <div className="text-end">
          <p className="text-gray-400 text-sm">
            &copy; 2023 AllSaints All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default SiteFooter;
