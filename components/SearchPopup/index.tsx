import React from "react";
import { Button, Container, ImageTag, RadixDialog } from "@/components";
import { useSearchForm } from "@/hooks";
import styles from "./styles.module.scss";

interface props {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

export default function SearchPopup({ isSearchOpen, setIsSearchOpen }: props) {
  const { register, handleSubmit, globalError, onSubmit } =
    useSearchForm(setIsSearchOpen);

  const handleClear = () => {
    if (document) {
      const search = document?.getElementById(
        "search"
      ) as HTMLInputElement | null;
      if (search) search.value = "";
    }
  };

  return (
    <RadixDialog
      variant={"search"}
      isOpen={isSearchOpen}
      setIsOpen={setIsSearchOpen}
    >
      <Container>
        <p className="text-5xl text-center">
          Search by <br />
          Collections,Products
        </p>

        <form className="mt-14">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search product or collection
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-black border-b-[1px] border-black"
              placeholder="Search product or collection"
              required
            />
            <button
              type="submit"
              className="text-gray-500 hover:text-black ease-in-out duration-300 absolute right-2.5 bottom-2.5 bg-none focus:outline-none text-sm pl-4 py-2"
            >
              Search
            </button>
          </div>
        </form>

        <p className="mt-6 text-lg uppercase">Most searched products</p>
        <ul className="mt-3 flex items-center gap-4">
          <li>
            <button
              type="button"
              className="text-gray-500 hover:text-black ease-in-out duration-300 bg-none focus:outline-none text-sm"
            >
              Ring
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-gray-500 hover:text-black ease-in-out duration-300 bg-none focus:outline-none text-sm"
            >
              Hat
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-gray-500 hover:text-black ease-in-out duration-300 bg-none focus:outline-none text-sm"
            >
              Coats
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-gray-500 hover:text-black ease-in-out duration-300 bg-none focus:outline-none text-sm"
            >
              Jacket
            </button>
          </li>
        </ul>

        <p className="mt-14 text-lg uppercase">products</p>
        <ul className="gap-4 grid grid-cols-[auto auto] grid-flow-col overflow-x-auto overflow-y-auto overscroll-contain snap-x scroll-smooth">
          {[1, 1, 1, 1, 1].map((item, index) => (
            <li key={index}>
              <div
                className={`h-[500px] overflow-hidden rounded-2xl ${styles.imageWrapper}`}
              >
                <ImageTag src="/static/images/product1.jpg" />
                <div
                  className={`flex items-center justify-center ${styles.feedInner}`}
                >
                  <div className={`flex flex-col gap-4`}>
                    <Button variant={"quaternary"} href={`/`}>
                      Add to cart
                    </Button>
                    <Button variant={"secondary"} href={`/`}>
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-lg uppercase">Classic Beanies</p>
                <p className="text-lg uppercase">£122.34</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </RadixDialog>
  );
}
