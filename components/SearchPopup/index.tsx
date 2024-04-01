import Link from "next/link"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { Container, HorizontalFeedBasic, RadixDialog } from "@/components"
import { useSearchForm } from "@/hooks"
import { graphqlClient } from "@/utils"
import { SEARCH_QUERY_PREDICTIVE } from "@/services/queries"
import settings from "../../data/settings.json"
import { ShopifyProduct } from "@/types"

interface props {
  isSearchModalOpen: boolean
  setIsSearchModalOpen: (isOpen: boolean) => void
}

export default function SearchPopup({
  isSearchModalOpen,
  setIsSearchModalOpen,
}: props) {
  const { register, handleSubmit, globalError, onSubmit } =
    useSearchForm(setIsSearchModalOpen)
  const { searchModal } = settings
  const { mostSearchedProducts, predictiveSearchQuery } = searchModal

  const {
    data,
  }: {
    data?: {
      predictiveSearch: {
        products: ShopifyProduct[]
      }
    }
  } = useQuery({
    queryKey: ["getPredictive", predictiveSearchQuery],
    queryFn: async () => {
      return await await graphqlClient.request(SEARCH_QUERY_PREDICTIVE, {
        query: predictiveSearchQuery,
      })
    },
    enabled: !!predictiveSearchQuery,
  })

  const renderMostSearchedTerms = () =>
    mostSearchedProducts.map((term: string, index) => {
      return (
        <li key={index} onClick={() => setIsSearchModalOpen(false)}>
          <Link
            className="md:text-md col-span-full uppercase sm:text-sm"
            href={`/shop/search?title=${term}`}
          >
            {term}
          </Link>
        </li>
      )
    })

  return (
    <RadixDialog
      variant={"search"}
      isOpen={isSearchModalOpen}
      setIsOpen={setIsSearchModalOpen}
    >
      <Container className="py-10 md:py-12 lg:py-14">
        <button
          className="ml-auto block cursor-pointer"
          onClick={() => setIsSearchModalOpen(false)}
        >
          <svg
            className="h-8 w-8 text-black"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
        <p className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Search by <br />
          Collections, Products
        </p>

        <form className="mt-14" onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search product or collection
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              className="block w-full border-b-[1px] border-black p-4 pl-10 text-sm text-black"
              placeholder="Search product or collection"
              required
              {...register("search")}
            />
            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 bg-none py-2 pl-4 text-sm text-gray-500 duration-300 ease-in-out hover:text-black focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>

        <p className="mt-6 text-lg uppercase">Most searched products</p>
        <ul className="mt-3 flex items-center gap-4">
          {renderMostSearchedTerms()}
        </ul>

        {data?.predictiveSearch && (
          <>
            <p className="mt-14 text-lg uppercase">products</p>
            <HorizontalFeedBasic productsData={data?.predictiveSearch} />
          </>
        )}
      </Container>
    </RadixDialog>
  )
}
