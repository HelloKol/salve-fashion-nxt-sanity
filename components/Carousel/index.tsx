import React, { useRef } from "react"
import Link from "next/link"
// @ts-ignore
import Slider from "react-slick"
import { Container, ImageTag, Section } from "@/components"
import ArrowRight from "@/components/svg/ArrowRight"
import styles from "./styles.module.scss"
import { Media, ShopifyCollection } from "@/types"

interface props {
  collections: {
    _type: string
    modules: { image: Media }[]
    _updatedAt: string
    showHero: boolean
    _createdAt: string
    _rev: string
    _id: string
    store: ShopifyCollection
  }[]
}

export default function Carousel({ collections }: props) {
  const sliderRef = useRef(null)

  const sliderConfig = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
  }

  const renderCollections = () =>
    collections &&
    collections.map((item, index: number) => {
      const { modules, store } = item
      const { title, slug, imageUrl } = store
      const newTitle = title.split(" ")
      const thumbnailTop = modules?.[0]
      const thumbnailBottom = modules?.[1]

      return (
        <div key={index} className={styles.carouselItem}>
          <div className={styles.carouselContent}>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>
                {newTitle[0]} <span>{" " + newTitle[1]}</span>
              </h1>
              <Link href={`/collections/${slug.current}`}>
                <div className={styles.exploreWrap}>
                  <div className={styles.circle}>
                    <span>
                      Explore
                      <ArrowRight className={styles.arrowRight} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className={styles.thumbnailWrap}>
              {thumbnailTop && (
                <div className={styles.thumbnailTop}>
                  <ImageTag
                    src={thumbnailTop?.image?.asset.url}
                    layout="fill"
                    objectFit="cover"
                    priority={false}
                  />
                </div>
              )}
              {thumbnailBottom && (
                <div className={styles.thumbnailBottom}>
                  <ImageTag
                    src={thumbnailBottom?.image?.asset.url}
                    layout="fill"
                    objectFit="cover"
                    priority={false}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.featureImage}>
            <ImageTag
              src={imageUrl}
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
        </div>
      )
    })

  return (
    <Section className="overflow-hidden pt-0">
      <Container>
        <Slider ref={sliderRef} {...sliderConfig} arrows={false}>
          {renderCollections()}
        </Slider>
      </Container>
    </Section>
  )
}
