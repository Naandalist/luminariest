import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { IconArrowBackward } from "../assets/icons";

interface ErrorDetails {
  statusText?: string;
  message?: string;
}
const ErrorPage = () => {
  const error = useRouteError();
  console.error("error: ", error);
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#2596be_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
        <div className="relative">
          <p className="mt-5 text-base dark:text-white">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="mt-5 text-white-dark  dark:text-white">
            It's{" "}
            {(error as ErrorDetails).statusText ||
              (error as ErrorDetails).message}
          </p>
          <Link
            to="/"
            className="btn btn-primary mx-auto !mt-7 w-max border-0 shadow-none"
          >
            <IconArrowBackward className="mr-2 shrink-0" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
