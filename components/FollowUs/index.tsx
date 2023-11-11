import React from "react";
import Link from "next/link";
import { Button, Container, Grid, ImageTag, Section } from "@/components";
// Props
interface Props {
  title: string;
  instagramAccount: any;
  instagramPosts: any;
}

export default function index({
  title,
  instagramAccount,
  instagramPosts,
}: Props) {
  if (!instagramPosts) return null;
  const { username } = instagramAccount;

  const renderInstagramPosts = () =>
    instagramPosts &&
    instagramPosts.slice(0, 8).map((post: any, index: any) => {
      const { id, media_url, permalink } = post;
      return (
        <Link
          key={id}
          href={`${permalink}`}
          target={"_blank"}
          className="col-span-6 sm:col-span-4 md:col-span-4 xl:col-span-3 h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px] xl:h-[650px] overflow-hidden rounded-2xl"
        >
          <ImageTag src={media_url} layout="fill" objectFit="cover" />
        </Link>
      );
    });

  return (
    <Section>
      <Container>
        <Grid>
          <Link
            className="col-span-full sm:text-sm md:text-md lg:text-5xl uppercase"
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
  );
}
