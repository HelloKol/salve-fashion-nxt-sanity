import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, Container, Grid, ImageTag, Section } from "@/components";
import { useDialogBox, useLoginForm } from "@/hooks";
import { useToastOpen } from "@/context/Toast";
import styles from "./styles.module.scss";

export default function LoginPage() {
  const loginToast = useDialogBox();
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useLoginForm();

  useEffect(() => {
    if (document) {
      const email = document?.getElementById(
        "email"
      ) as HTMLInputElement | null;
      if (email) email.value = "";

      const password = document?.getElementById(
        "password"
      ) as HTMLInputElement | null;
      if (password) password.value = "";
    }
  }, []);

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
    <Section className="py-14">
      <Container>
        <Grid className="min-h-screen">
          <div className="col-span-6 mt-24 flex flex-col justify-between">
            <div className="text-center">
              <p className="uppercase text-xl">Largest Image Source</p>
              <h1 className="mt-8 uppercase text-8xl">
                Powered by creators aroudn the world
              </h1>
              <p className="mt-36">Don&apos;t have an account?</p>
              <Link
                className="inline-block mt-4 border-b-2 border-black"
                href={`/`}
              >
                Create account
              </Link>
            </div>
            <div className="mt-32 w-full h-72 overflow-hidden rounded-2xl">
              <ImageTag src="/static/images/product1.jpg" />
            </div>
          </div>

          <div className="relative col-span-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8/12 max-w-[520px] p-4 bg-[#ffffff] rounded-2xl">
              <p className="text-center text-xl">Login to your account</p>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("email")}
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
                    {...register("password")}
                  />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
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
                      Remember me
                    </label>
                  </div>

                  <Link href={`/`}>Forgot your password?</Link>
                </div>

                <button
                  className="mt-6 w-full h-fit shrink-0 bg-[#171717] rounded-xl py-4 flex items-center justify-center text-white text-sm uppercase"
                  type="submit"
                >
                  {isLoading ? "Loading...." : "LogIn"}
                </button>

                {globalError && <p>{globalError}</p>}

                {/* <Button variant={"primary"} onClick={loginToast.open}>
                  Test
                </Button> */}

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
