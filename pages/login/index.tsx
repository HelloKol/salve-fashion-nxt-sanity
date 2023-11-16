import React, { useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { Button, Container, Grid, ImageTag, Section } from "@/components"
import { useDialogBox, useLoginForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import styles from "./styles.module.scss"

export default function Page() {
  const loginToast = useDialogBox()
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useLoginForm()

  useEffect(() => {
    if (document) {
      const email = document?.getElementById("email") as HTMLInputElement | null
      if (email) email.value = ""

      const password = document?.getElementById(
        "password"
      ) as HTMLInputElement | null
      if (password) password.value = ""
    }
  }, [])

  // useToastOpen(false, false, isSucess, loginToast.close, {
  //   description: (
  //     <div>
  //       <h4>Success</h4>
  //       <p>Your are being logged in...</p>
  //     </div>
  //   ),
  //   duration: 50000,
  //   type: "foreground",
  //   onClose: () => null,
  // });

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
              <p className="lg:mt-14 xl:mt-28">Don&apos;t have an account?</p>
              <Link
                className="inline-block border-b-2 border-black"
                href={`/register`}
              >
                Create account
              </Link>
            </div>
            <div className="mt-44 hidden w-full overflow-hidden rounded-2xl lg:block lg:h-56 xl:h-72">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>

          <div className="relative col-span-full md:col-start-4 md:col-end-10 lg:col-span-6">
            <div className="z-10 w-8/12 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[520px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-[#ffffff] lg:p-4">
              <p className="text-center text-3xl">Login to your account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                    {...register("email")}
                  />
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
                    className="block w-full border-b-2 border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                    {...register("password")}
                  />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      value=""
                      className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 text-sm font-medium"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link className="text-sm" href={`/`}>
                    Forgot your password?
                  </Link>
                </div>

                <button
                  className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                >
                  {isLoading ? "Loading...." : "LogIn"}
                </button>

                {globalError && <p>{globalError}</p>}

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
