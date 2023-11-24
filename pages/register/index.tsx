import React from "react"
import Link from "next/link"
import { Container, Grid, ImageTag, Section } from "@/components"
import { useRegisterForm } from "@/hooks"

export default function Page() {
  const { register, handleSubmit, errors, globalError, onSubmit } =
    useRegisterForm()

  return (
    <Section className="py-24 lg:py-14">
      <Container>
        <Grid className="lg:min-h-screen">
          <div className="col-span-full row-start-2	mt-8 flex flex-col justify-between lg:col-span-6 lg:row-start-1 lg:mt-24">
            <div className="text-center">
              <p className="hidden text-xl uppercase lg:block">
                Largest Image Source
              </p>
              <h1 className="mt-8 hidden text-xl uppercase lg:block lg:text-7xl xl:text-8xl">
                Powered by creators aroudn the world
              </h1>
              <p className="lg:mt-14 xl:mt-28">
                Do you already have an account?
              </p>
              <Link
                className="inline-block border-b-2 border-black"
                href={`/login`}
              >
                Log in
              </Link>
            </div>
            <div className="mt-44  hidden w-full overflow-hidden rounded-2xl lg:block lg:h-56 xl:h-72">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>

          <div className="relative col-span-full md:col-start-4 md:col-end-10 lg:col-span-6">
            <div className="z-10 w-8/12 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[520px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-[#ffffff] lg:p-4">
              <p className="text-center text-3xl">Register here</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6">
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-500"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your First name"
                    {...register("firstName")}
                  />
                  {errors.firstName?.message && (
                    <p>{errors.firstName?.message}</p>
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-500"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your Last name"
                    {...register("lastName")}
                  />
                  {errors.lastName?.message && (
                    <p>{errors.lastName?.message}</p>
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-500"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                  {errors.email?.message && <p>{errors.email?.message}</p>}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-red-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  {errors.password?.message && (
                    <p>{errors.password?.message}</p>
                  )}
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="link-checkbox-sub"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="link-checkbox-sub"
                    className="ml-2 text-sm font-medium"
                  >
                    I want to receive personalised commercial communications
                    from ZARA by email.
                  </label>
                </div>

                <div className="mt-6 flex items-center">
                  <input
                    id="link-checkbox-agreement"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="link-checkbox-agreement"
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

                <button className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white">
                  Register
                </button>

                <div className="mt-6 hidden h-28 w-full overflow-hidden rounded-2xl lg:block">
                  <ImageTag src="/static/images/product1.jpg" />
                </div>
              </form>
            </div>

            <div className="hidden h-full w-full overflow-hidden rounded-2xl lg:block">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
