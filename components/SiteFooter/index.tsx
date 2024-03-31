import React from "react"
import Link from "next/link"
import { Container } from "@/components"
import FullLogoStack from "@/components/svg/FullLogoStack"
import settings from "../../data/settings.json"

const SiteFooter = () => {
  const { footer } = settings
  const { credit, columns } = footer

  const renderFooterLinks = (links: any) => {
    return (
      links &&
      links.map((link: any, index: number) => {
        const { title, internalLink, externalLink } = link

        if (!internalLink && !externalLink) return null

        return (
          <Link
            key={index}
            href={
              externalLink
                ? externalLink
                : `${internalLink.dynamicRoute ? "/" + internalLink.dynamicRoute : ""}/${internalLink.slug}`
            }
            target="_blank"
            className="mb-2 block text-gray-400 transition-colors duration-300 hover:text-white"
          >
            {title}
          </Link>
        )
      })
    )
  }

  const renderFooterColumns = () => {
    return (
      columns &&
      columns.map((link, index) => {
        const { title, links } = link

        return (
          <div className="w-full md:w-1/4">
            <h5 className="mb-4 text-lg font-medium uppercase">{title}</h5>
            {renderFooterLinks(links)}
          </div>
        )
      })
    )
  }

  return (
    <footer className="bg-black px-4 pb-10 pt-16 text-white lg:px-6">
      <Container>
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-white"
          >
            <FullLogoStack className="mx-auto h-12 w-auto fill-current text-gray-400 transition-colors duration-300 hover:text-white" />
          </Link>
        </div>
        <div className="flex flex-wrap justify-start py-14 md:justify-between">
          {renderFooterColumns()}
        </div>
        <div className="text-end">
          <p className="text-sm text-gray-400">{credit}</p>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
