import React, { useRef } from "react"
import Link from "next/link"
// @ts-ignore
import Slider from "react-slick"
import { Button, Container, ImageTag, Section } from "@/components"
import ArrowRight from "@/components/svg/ArrowRight"
import styles from "./styles.module.scss"

export default function Carousel({ collections }: any) {
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
    collections.map((item: any, index: number) => {
      if (!item?.modules?.length) return null
      const { modules, store } = item
      const { title, slug, imageUrl } = store
      const newTitle = title.split(" ")
      const thumbnailTop = modules[0]
      const thumbnailBottom = modules[1]

      return (
        <div key={index} className={styles.carouselItem}>
          <div className={styles.carouselContent}>
            <p className={styles.collectionYear}>
              Collection <span>2022</span>
            </p>
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
              <div className={styles.thumbnailTop}>
                <ImageTag
                  src={thumbnailTop?.image?.asset.url}
                  layout="fill"
                  objectFit="cover"
                  priority={false}
                />
              </div>
              <div className={styles.thumbnailBottom}>
                <ImageTag
                  src={thumbnailBottom?.image?.asset.url}
                  layout="fill"
                  objectFit="cover"
                  priority={false}
                />
              </div>
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
      <Container className="pt-0">
        <Slider ref={sliderRef} {...sliderConfig} arrows={false}>
          {renderCollections()}
        </Slider>
      </Container>
    </Section>
  )
}
