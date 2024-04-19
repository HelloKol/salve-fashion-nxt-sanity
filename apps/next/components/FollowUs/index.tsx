import React from "react"
import Link from "next/link"
import { Button, Container, Grid, ImageTag, Section } from "@/components"
// Props
interface Props {
  title: string
  instagramAccount: {
    id: string
    username: string
    account_type: string
  }
  instagramPosts: {
    id: string
    media_type: string
    media_url: string
    permalink: string
  }[]
}

export default function index({
  title,
  instagramAccount,
  instagramPosts,
}: Props) {
  if (!instagramPosts) return null
  const { username } = instagramAccount

  const renderInstagramPosts = () =>
    instagramPosts &&
    instagramPosts.slice(0, 8).map((post) => {
      const { id, media_url, permalink } = post
      return (
        <Link
          key={id}
          href={`${permalink}`}
          target={"_blank"}
          className="col-span-6 h-[200px] overflow-hidden rounded-2xl sm:col-span-4 sm:h-[300px] md:col-span-4 md:h-[300px] lg:h-[400px] xl:col-span-3 xl:h-[650px]"
        >
          <ImageTag src={media_url} layout="fill" objectFit="cover" />
        </Link>
      )
    })

  return (
    <Section>
      <Container>
        <Grid>
          <Link
            className="md:text-md col-span-full uppercase sm:text-sm lg:text-5xl"
            href={`https://www.instagram.com/${username}`}
            target={"_blank"}
          >
            @{username}
          </Link>
          <p className="col-span-full text-sm ">{title}</p>
          {renderInstagramPosts()}
        </Grid>
      </Container>
    </Section>
  )
}
