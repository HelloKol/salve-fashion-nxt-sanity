import React from "react"
import Head from "next/head"

// Props
interface Props {
  seo: {
    title: string
    description: string
  }
}

export default function MetaTags({ seo }: Props) {
  return (
    <Head>
      {seo?.title && <title>{seo.title}</title>}
      {seo?.description && (
        <meta name="description" content={seo.description} />
      )}
      <meta charSet="utf-8" />
      <meta
        data-react-helmet="true"
        http-equiv="content-language"
        content="en-GB"
      />
    </Head>
  )
}
