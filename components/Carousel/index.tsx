import React, { useRef } from "react";
import Link from "next/link";
// @ts-ignore
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Button, ImageTag, Section } from "@/components";
import ArrowRight from "@/components/svg/ArrowRight";
import styles from "./styles.module.scss";

export default function index({ collections }) {
  const sliderRef = useRef(null);

  const settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
  };

  const renderCollections = () =>
    collections &&
    collections.map((item: any, index: number) => {
      const { modules, store } = item;
      const { title, slug, imageUrl } = store;
      const newTitle = title.split(" ");
      const thumbnailTop = modules[0];
      const thumbnailBottom = modules[1];

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
                  Explore
                  <ArrowRight className={styles.arrowRight} />
                </div>
              </Link>
            </div>
            <div className={styles.thumbnailWrap}>
              <motion.div
                className={styles.thumbnailTop}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageTag
                  src={thumbnailTop?.image?.asset.url}
                  layout="fill"
                  objectFit="cover"
                  priority={false}
                />
              </motion.div>
              <motion.div
                className={styles.thumbnailBottom}
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageTag
                  src={thumbnailBottom?.image?.asset.url}
                  layout="fill"
                  objectFit="cover"
                  priority={false}
                />
              </motion.div>
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
      );
    });

  return (
    <Section className="overflow-hidden pt-0">
      <div className={styles.carouselContainer}>
        <Slider ref={sliderRef} {...settings}>
          {renderCollections()}
        </Slider>
      </div>
    </Section>
  );
}
