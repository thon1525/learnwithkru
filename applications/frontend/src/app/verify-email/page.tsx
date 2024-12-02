"use client";
import { VerifyEmailToken } from "@/components";
import React, { Suspense } from "react";

const Page = () => {
 
  return (
    <div className="max-w-full grid">
      <div className="w-full flex justify-center items-center">
      </div>
      <VerifyEmailToken />
      <div className="w-full flex justify-center items-start bg-gray-900"></div>
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading.....</div>}>
    <Page />
  </Suspense>
);

export default SuspenseWrapper;
