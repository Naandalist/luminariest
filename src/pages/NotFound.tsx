import React, { useEffect } from "react";
import IconArrowBackward from "../assets/icons/IconArrowBackward";
import { Link } from "react-router-dom";

const NotFound = () => {

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#2596be_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
        <div className="relative">
        
          <p className="mt-5 text-base dark:text-white">
            The page you request is not found.
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

export default NotFound;
