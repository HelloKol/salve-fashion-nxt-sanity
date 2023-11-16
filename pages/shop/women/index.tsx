import React, { useState } from "react"
import Link from "next/link"
import {
  Button,
  Container,
  FilterProduct,
  Grid,
  ImageTag,
  Main,
  Section,
} from "@/components"

export default function Page() {
  const initialTrimLength = 140
  const [showFullArticle, setShowFullArticle] = useState(false)
  const trimLength = showFullArticle ? Infinity : initialTrimLength

  const articleText = `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Necessitatibus doloremque pariatur impedit voluptatem numquam
    quibusdam mollitia tempore exercitationem assumenda accusamus
    modi, sequi eius saepe. Consequuntur accusamus beatae esse
    omnis incidunt!
  `.trim()

  const trimArticle = (str: string) => {
    if (!str?.length) return null
    const trimmedText = str.slice(0, trimLength)
    const ellipsis = str.length > trimLength ? "..." : ""
    return `${trimmedText}${ellipsis}`
  }

  const toggleShowFullArticle = () => {
    setShowFullArticle(!showFullArticle)
  }

  const renderProducts = () =>
    [1, 1, 1, 1, 1].map((item, index) => {
      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <Link href={`/shop/asd`} className="block">
            <div className="h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[700px] xl:h-[800px]">
              <ImageTag src="/static/images/product2.jpg" />
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-gray-600 lg:text-lg">
              Classic Beanies
            </p>
            <p className="mt-2 text-sm font-bold uppercase lg:text-lg">
              £122.34
            </p>
          </Link>
        </li>
      )
    })

  return (
    <>
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full mt-10 text-3xl md:text-5xl xl:mt-20">
                All Women
              </h1>

              <article className="col-span-full text-sm md:col-end-10 md:text-xl xl:mt-2">
                <p className="m-0">{trimArticle(articleText)}</p>
                {articleText.length > initialTrimLength && (
                  <span
                    onClick={toggleShowFullArticle}
                    className="mt-1 block cursor-pointer text-sm font-semibold underline lg:mt-0 lg:text-lg"
                  >
                    {showFullArticle ? "less" : "more"}
                  </span>
                )}
              </article>

              <div className="col-start-1 col-end-8 mt-2 flex flex-wrap items-center gap-2 md:col-start-1 md:col-end-10 md:gap-4 xl:mt-4">
                <Button variant="primary">All</Button>
                <Button variant="primary" isActive={true}>
                  Hoodies
                </Button>
                <Button variant="primary">Shirts</Button>
                <Button variant="primary">Joggers</Button>
              </div>

              <div className="col-start-8 col-end-13 ml-auto mt-2 md:col-start-10 md:col-end-13 xl:mt-4">
                <FilterProduct />
              </div>

              <Grid
                as={"ul"}
                className="col-span-full mt-4 xl:mt-8"
                withRowGap={false}
              >
                <p className="col-span-full mb-4 text-sm font-bold lg:mb-6 xl:mb-8">
                  {[1, 1, 1, 1, 1].length} items
                </p>
                {renderProducts()}
              </Grid>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
