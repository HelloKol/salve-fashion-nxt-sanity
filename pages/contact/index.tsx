import { GetStaticPropsResult } from "next"
import Link from "next/link"
import { Main, Section, Container, Grid, RadixAccordion } from "@/components"
import { sanityClient } from "@/utils/sanity"
import MessageChat from "@/components/svg/MessageChat"
import MessageSmile from "@/components/svg/MessageSmile"
import Location from "@/components/svg/Location"
import Phone from "@/components/svg/Phone"

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  return (
    <Main withPadding>
      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full text-center text-5xl lg:text-6xl">
              Contact our friendly team
            </h1>

            <h3 className="col-span-full mt-4 text-center text-xl">
              Let us know how we can help.
            </h3>

            <div className="col-span-full rounded-2xl border border-gray-400 p-5 sm:col-span-6 md:col-span-3">
              <span className="block w-min rounded-2xl border border-gray-400 p-2">
                <MessageSmile className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Chat to sales</p>
              <p className="mt-3 text-sm">Speak to our friendly team.</p>
              <Link href={`/`} className="mt-5 block">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-full rounded-2xl border border-gray-400 p-5 sm:col-span-6 md:col-span-3">
              <span className="block w-min rounded-2xl border border-gray-400 p-2">
                <MessageChat className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Chat to support</p>
              <p className="mt-3 text-sm">We`re here to help.</p>
              <Link href={`/`} className="mt-5 block">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-full rounded-2xl border border-gray-400 p-5 sm:col-span-6 md:col-span-3">
              <span className="block w-min rounded-2xl border border-gray-400 p-2">
                <Location className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Visit us</p>
              <p className="mt-3 text-sm">Visit our office HQ.</p>
              <Link href={`/`} className="mt-5 block">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-full rounded-2xl border border-gray-400 p-5 sm:col-span-6 md:col-span-3">
              <span className="block w-min rounded-2xl border border-gray-400 p-2">
                <Phone className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Call us</p>
              <p className="mt-3 text-sm">Mon-Fri from 9am to 5am</p>
              <Link href={`/`} className="mt-5 block">
                sales@example.com
              </Link>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section withPadding={false}>
        <Container>
          <Grid>
            <h1 className="md:text-md col-span-full text-center text-3xl lg:mt-14">
              Frequently asked questions
            </h1>
            <div className="col-span-full lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10">
              <RadixAccordion />
            </div>
          </Grid>
        </Container>
      </Section>
    </Main>
  )
}
