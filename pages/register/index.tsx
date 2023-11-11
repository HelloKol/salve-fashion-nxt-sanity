import React from "react";
import Link from "next/link";
import { Container, Grid, ImageTag, Section } from "@/components";

export default function index() {
  return (
    <Section className="py-14">
      <Container>
        <Grid className="min-h-screen">
          <div className="col-span-6 mt-24 flex flex-col justify-between">
            <div className="text-center">
              <p className="uppercase text-xl">Largest Image Source</p>
              <h1 className="mt-8 uppercase text-8xl">
                Powered by creators aroudn the world
              </h1>
              <p className="mt-36"> Do you already have an account?</p>
              <Link
                className="inline-block mt-4 border-b-2 border-black"
                href={`/`}
              >
                Log in
              </Link>
            </div>
            <div className="mt-32 w-full h-72 overflow-hidden rounded-2xl">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>

          <div className="relative col-span-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8/12 max-w-[520px] p-4 bg-[#ffffff] rounded-2xl">
              <p className="text-center text-xl">Register account</p>
              <form action="">
                <div className="mt-6">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your First name"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Last name"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="border-b-2 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    I want to receive personalised commercial communications
                    from ZARA by email.
                  </label>
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium"
                  >
                    I have read and agree to the{" "}
                    <Link href={"/pages/terms-of-service"}>
                      Terms Of Service
                    </Link>{" "}
                    and{" "}
                    <Link href={"/pages/privacy-policy"}>Privacy Policy</Link>
                  </label>
                </div>

                <button className="mt-6 w-full h-fit shrink-0 bg-[#171717] rounded-xl py-4 flex items-center justify-center text-white text-sm uppercase">
                  Register
                </button>

                <div className="mt-6 w-full h-24 overflow-hidden rounded-2xl">
                  <ImageTag src="/static/images/product1.jpg" />
                </div>
              </form>
            </div>

            <div className=" w-full h-full overflow-hidden rounded-2xl">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
