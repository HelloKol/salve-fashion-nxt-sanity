import { GetStaticPropsResult } from "next";
import Link from "next/link";
import { Main, Section, Container, Grid, RadixAccordion } from "@/components";
import { sanityClient } from "@/utils/sanity";
import MessageChat from "@/components/svg/MessageChat";
import MessageSmile from "@/components/svg/MessageSmile";
import Location from "@/components/svg/Location";
import Phone from "@/components/svg/Phone";

interface PageProps {}

export default function index({}: PageProps): JSX.Element | null {
  return (
    <Main withPadding>
      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full mt-36 sm:text-sm md:text-md lg:text-6xl text-center">
              Contact our friendly team
            </h1>
            <h3 className="col-span-full mt-4 text-center">
              Let us know how we can help.
            </h3>

            <div className="col-span-3 p-5 border border-gray-400 rounded-2xl">
              <span className="block w-min p-2 rounded-2xl border border-gray-400">
                <MessageSmile className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Chat to sales</p>
              <p className="text-sm mt-3">Speak to our friendly team.</p>
              <Link href={`/`} className="block mt-5">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-3 p-5 border border-gray-400 rounded-2xl">
              <span className="block w-min p-2 rounded-2xl border border-gray-400">
                <MessageChat className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Chat to support</p>
              <p className="text-sm mt-3">We`re here to help.</p>
              <Link href={`/`} className="block mt-5">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-3 p-5 border border-gray-400 rounded-2xl">
              <span className="block w-min p-2 rounded-2xl border border-gray-400">
                <Location className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Visit us</p>
              <p className="text-sm mt-3">Visit our office HQ.</p>
              <Link href={`/`} className="block mt-5">
                sales@example.com
              </Link>
            </div>
            <div className="col-span-3 p-5 border border-gray-400 rounded-2xl">
              <span className="block w-min p-2 rounded-2xl border border-gray-400">
                <Phone className="h-8 rounded-2xl fill-[#E9EBE0]" />
              </span>
              <p className="mt-16 text-xl font-semibold">Call us</p>
              <p className="text-sm mt-3">Mon-Fri from 9am to 5am</p>
              <Link href={`/`} className="block mt-5">
                sales@example.com
              </Link>
            </div>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full mt-36 sm:text-sm md:text-md lg:text-5xl text-center">
              Frequently asked questions
            </h1>
            <div className="col-start-4 col-end-10 mt-6">
              <RadixAccordion />
            </div>
          </Grid>
        </Container>
      </Section>
    </Main>
  );
}
