"use client";
import { Login } from "@/components";
import React, { Suspense } from "react";

const Page = () => {
  return (
      <Login />
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<div>Loading.....</div>}>
    <Page />
  </Suspense>
);

export default SuspenseWrapper;
