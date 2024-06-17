"use client";
import {  SettingProfile } from "@/components";
import React from "react";
import { Footer } from "@/components";
const page = () => {

  return ( 
    <div className="w-full grid grid-flow-row gap-10 ">
      <div className="w-full flex justify-center items-center">
      </div>
      <SettingProfile />
      <div className="w-full flex justify-center items-start bg-black mt-10 ">
        <Footer />
      </div>
    </div>
  );
};

export default page;
