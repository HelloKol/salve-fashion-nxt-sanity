// @ts-ignore
// @ts-nocheck
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import groq from 'groq';
import { useSpringCarousel } from 'react-spring-carousel';
import {
  AddToCart,
  Button,
  Container,
  Grid,
  HorizontalFeedBasic,
  ImageTag,
  Main,
  RadixAccordion,
  Section,
  Seo
} from '@/components';
import { ALL_PRODUCTS, SEARCH_QUERY_PREDICTIVE, SINGLE_PRODUCT_BY_HANDLE } from '@/services/queries';
import { graphqlClient, sanityClient, PRODUCT_ACCORDION } from '@/utils';
import styles from './styles.module.scss';
import { SeoType, ShopifyProduct } from '@/types';
import { trpc } from '@/utils/trpc';

interface ProductByHandle {
  product: ShopifyProduct;
}

interface PredictiveProducts {
  predictiveSearch: {
    products: ShopifyProduct[];
  };
}

export interface ProductProps {
  page: {
    seo: SeoType;
  };
  productByHandle: ProductByHandle;
  predictiveProducts: PredictiveProducts;
}

export default function Page({
  page,
  productByHandle,
  predictiveProducts
}: ProductProps): JSX.Element | null {
  const router = useRouter();
  const { handle } = router.query;
  const { data, isLoading, error } = trpc.shopify.getProductByHandle.useQuery({
    handle: handle
  });

  console.log(handle, 'handle', data?.product?.title, isLoading, error);

  const { predictiveSearch } = predictiveProducts;
  const { product } = productByHandle;
  const { title, descriptionHtml, images, variants } = product;
  const { edges } = variants;

  const ACCORDION = [
    {
      _key: '0b4708ddb216',
      _type: 'group',
      htmlText: descriptionHtml,
      title: 'Description'
    },
    ...PRODUCT_ACCORDION
  ];

  // State variables
  const [index, setIndex] = useState(0);
  const [quantity, setQuanity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  // // Create a list of unique colors and sizes
  const colors = [...new Set(product.variants.edges.map((variant) => variant.node.selectedOptions[0].value))];
  const sizes = [...new Set(product.variants.edges.map((variant) => variant.node.selectedOptions[1].value))];

  useEffect(() => {
    // Update selectedSize if sizes array changes
    if (!sizes.includes(selectedSize)) {
      setSelectedSize(sizes[0] || null);
    }
  }, [sizes]);

  useEffect(() => {
    // Update selectedColor if colors array changes
    if (!colors.includes(selectedColor)) {
      setSelectedColor(colors[0] || null);
    }
  }, [colors]);

  useEffect(() => {
    if (!variants.edges.length) return;
    // Find the index of the selected variant
    const selectedIndex = variants.edges.findIndex((variant) =>
      variant.node.selectedOptions.every(
        (option) =>
          (option.name === 'Color' && option.value === selectedColor) ||
          (option.name === 'Size' && option.value === selectedSize)
      )
    );

    // Set the index state variable
    slideToItem(selectedIndex >= 0 ? selectedIndex : 0);
    updateSelectedVariant();
  }, [selectedSize, selectedColor, variants]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    updateSelectedVariant();
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    updateSelectedVariant();
  };

  const updateSelectedVariant = () => {
    if (selectedSize && selectedColor) {
      const variant = variants.edges.find(
        (variant) =>
          variant.node.selectedOptions.find((option) => option.name === 'Color').value === selectedColor &&
          variant.node.selectedOptions.find((option) => option.name === 'Size').value === selectedSize
      );
      setSelectedVariant(variant);
    }
  };

  const renderSizes = () =>
    sizes &&
    sizes.map((size) => (
      <Button key={size} onClick={() => handleSizeSelect(size)} isActive={selectedSize === size}>
        {size}
      </Button>
    ));

  const renderColors = () =>
    colors &&
    colors.map((color) => (
      <Button key={color} onClick={() => handleColorSelect(color)} isActive={selectedColor === color}>
        {color}
      </Button>
    ));

  const isVariantAvailable = () => {
    if (!variants.edges.length) return false;
    if (!selectedSize || !selectedColor) return false;

    const variant = variants.edges.find(
      (variant) =>
        variant.node.selectedOptions.find((option) => option.name === 'Color').value === selectedColor &&
        variant.node.selectedOptions.find((option) => option.name === 'Size').value === selectedSize
    );

    return variant ? variant.node.availableForSale : false;
  };

  const { carouselFragment, thumbsFragment, slideToItem, useListenToCustomEvent } = useSpringCarousel({
    withLoop: true,
    withThumbs: true,
    items: edges.map((item: any, i: number) => {
      const { node } = item;
      const { image } = node;
      const { transformedSrc } = image;
      const id = i;

      return {
        id,
        renderItem: (
          <div className="pointer-events-none h-[500px] w-full select-none overflow-hidden rounded-md sm:h-[700px] md:h-[500px] lg:h-[800px]">
            <ImageTag src={transformedSrc} />
          </div>
        ),
        renderThumb: (
          <div className={`cursor-pointer`} onClick={() => slideToItem(i)}>
            <div className="pointer-events-none h-24 w-24 select-none overflow-hidden rounded">
              <ImageTag src={transformedSrc} />
            </div>
          </div>
        )
      };
    })
  });

  useListenToCustomEvent((data: any) => {
    if (data.eventName === 'onSlideStartChange') {
      setIndex(data.nextItem.index);
    }
  });

  return (
    <>
      <Seo seo={page?.seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <div className="col-span-full md:col-end-7 lg:col-start-1 lg:col-end-8 lg:px-4 xl:col-start-2 xl:col-end-7 xl:px-6">
                <div className="h-[500px] w-full overflow-hidden sm:h-[700px] md:h-[500px] lg:h-[800px]">
                  {carouselFragment}
                </div>
                {images && <div className={styles.thumbsFragment}>{thumbsFragment}</div>}
              </div>

              <div className="col-span-full md:col-start-7 lg:col-start-8 lg:col-end-13 xl:col-start-7 xl:col-end-11">
                <h1 className="text-2xl md:text-3xl">{title}</h1>

                <h3 className="mt-2 text-xl">
                  {edges[0].node.priceV2.currencyCode} {edges[0].node.priceV2.amount}
                </h3>

                <div className={`mt-6 flex flex-wrap items-center gap-4`}>{renderSizes()}</div>

                <div className={`mt-6 flex flex-wrap items-center gap-4`}>{renderColors()}</div>

                <div className={`mt-6 flex flex-wrap items-center gap-4`}>
                  <div className="flex items-center gap-5 rounded-full border-[1px] border-black px-3 py-1">
                    <button onClick={() => setQuanity(quantity - 1)} disabled={quantity <= 1}>
                      <svg
                        className="h-4 w-4 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuanity(quantity + 1)} disabled={quantity >= 100}>
                      <svg
                        className="h-4 w-4 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h14m-7 7V5"
                        />
                      </svg>
                    </button>
                  </div>
                  <AddToCart
                    productTitle={product.title}
                    selectedVariant={selectedVariant?.node}
                    quantity={quantity}
                    disabled={!isVariantAvailable()}
                    className={'w-full flex-1'}
                  />
                </div>

                <div className="mt-8 lg:mt-10">
                  <RadixAccordion data={ACCORDION} />
                </div>
              </div>
            </Grid>
          </Container>
        </Section>

        <Section className="lg:pt-44">
          <Container>
            <HorizontalFeedBasic title={'Similar Products'} productsData={predictiveSearch} />
          </Container>
        </Section>
      </Main>
    </>
  );
}

interface HandleParams extends ParsedUrlQuery {
  handle: string;
}

export const getStaticPaths: GetStaticPaths<HandleParams> = async () => {
  try {
    const products: {
      products: {
        edges: {
          node: ShopifyProduct;
        }[];
      };
    } = await graphqlClient.request(ALL_PRODUCTS);

    const paths = products?.products?.edges.map((product) => ({
      params: { handle: product?.node.handle }
    }));

    return {
      paths,
      fallback: false
    };
  } catch (error) {
    console.log(error, 'failed', '<<<<<');
    return {
      paths: [],
      fallback: false
    };
  }
};

interface HandleParams extends ParsedUrlQuery {
  handle: string;
}

export const getStaticProps: GetStaticProps<ProductProps, HandleParams> = async ({ params }) => {
  if (!params) return { notFound: true };

  try {
    const { handle } = params;

    const page = await sanityClient.fetch(
      groq`*[_type == "product" && store.slug.current == $slug && !(_id in path('drafts.**'))][0] {
        store {
          title
        },
      seo {
        ...,
        image {
          ...,
          asset->{
            _id,
            url,
            metadata{
              lqip
            }
          }
        }
      },
      }`,
      { slug: handle }
    );

    const variables = {
      handle
    };

    const productByHandle: ProductByHandle = await graphqlClient.request(SINGLE_PRODUCT_BY_HANDLE, variables);

    const predictiveProducts: PredictiveProducts = await graphqlClient.request(SEARCH_QUERY_PREDICTIVE, {
      query: page.store.title?.slice(0, 20) || ``
    });

    return {
      props: {
        page,
        productByHandle,
        predictiveProducts
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return { notFound: true };
  }
};
