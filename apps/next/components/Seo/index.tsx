import Head from "next/head"
import { useRouter } from "next/router"
import settings from "../../data/settings.json"
import { Media } from "@/types"

interface Props {
  seo?: {
    description?: string
    image?: Media
    keywords?: string
    tags?: string
    title?: string
  }
}

interface SettingsSeo {
  title: string
  siteName: string
  siteNamePosition: string
  description: string
  keywords: string
  image: Media
  canonicalUrl: string
}

const Seo = ({ seo }: Props) => {
  const router = useRouter()
  const { title, siteName, siteNamePosition, description, keywords, image } =
    settings.seoSettings as unknown as SettingsSeo
  const path = process.env.NEXT_PUBLIC_BASE_URL + router.asPath

  return (
    <Head>
      <title>
        {siteNamePosition === "after"
          ? `${seo?.title || title || ""} ${siteName}`
          : `${siteName} ${seo?.title || title || ""}`}
      </title>

      {/* Basic Meta Tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Description and Keywords Meta Tags */}
      <meta name="description" content={seo?.description || description} />
      <meta name="keywords" content={seo?.keywords || keywords} />

      {/* Canonical Link Tag */}
      <link rel="canonical" href={path || ""} />

      {/* Site Open Graph Tags */}
      <meta content="en_GB" property="og:locale" />
      <meta content="en" name="language" />
      <meta content="website" property="og:type" />
      <meta content={siteName} property="og:site_name" />
      <meta content={siteName} name="site_name" />

      {/* Content Open Graph Tags */}
      <meta property="og:title" content={seo?.title || siteName || ""} />
      <meta
        property="og:description"
        content={seo?.description || description}
      />
      <meta
        property="og:image"
        content={seo?.image?.asset?.url || image?.asset?.url}
      />
      <meta property="og:url" content={path || ""} />

      {/*<!-- Google / Search Engine Tags -->*/}
      <meta property="name" content={seo?.title || siteName || ""} />
      <meta property="description" content={seo?.description || description} />
      <meta
        property="image"
        content={seo?.image?.asset?.url || image?.asset?.url}
      />

      {/*<!-- Twitter Meta Tags -->*/}
      <meta name="twitter:title" content={seo?.title || siteName || ""} />
      <meta
        name="twitter:description"
        content={seo?.description || description}
      />
      <meta
        name="twitter:image"
        content={seo?.image?.asset?.url || image?.asset?.url}
      />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <link rel="shortcut icon" type="image/png" href="/static/favicon.png" />
      <link rel="shortcut icon" type="image/ico" href="/static/favicon.ico" />

      {/* Apple Touch Icons */}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/static/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/static/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/static/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/static/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/static/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/static/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/static/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/static/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/static/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <meta
        name="msapplication-TileImage"
        content="/static/ms-icon-144x144.png"
      />
    </Head>
  )
}

export default Seo
