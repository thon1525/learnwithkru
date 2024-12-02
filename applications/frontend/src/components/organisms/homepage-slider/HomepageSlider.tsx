"use client"
import React from "react";
import { Typography } from "@/components";
import Image from "next/image";
import { Button } from "@/components";
import Link from "next/link";

const HomepageSlider = ({ className }: { className?: string }) => {
  return (
    <div className={`w-full  bg-[#252525] relative ${className}`}>
      <Image
        src={"/Benner/teacherwithstudent.jpg"}
        alt="Benner"
        width={1728}
        height={479}
        className="w-full h-[479px] object-cover opacity-30 relative"
      ></Image>
      {/* <h1>Hello world</h1> */}
      <div className="w-full h-full absolute inset-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[80%] grid gap-3 sm:w-1/2 sm:gap-4">
            <Typography
              className="leading-10 tracking-widest capitalize sm:text-3xl md:text-4xl lg:text-5xl"
              fontSize="lg"
              colorscheme="white"
              variant="bold"
              align="center"
              tags="h1"
            >
              The teachers are around you now
            </Typography>
            <Typography
              className="sm:text-sm md:text-md lg:text-lg"
              fontSize="sm"
              colorscheme="white"
              variant="normal"
              tags="p"
              align="center"
            >
              Stop wasting your time Learnwithkru platform are provide you the
              easier way to find the teacher
            </Typography>

            <div className="w-full flex justify-center">
              <Button
                className="px-8 py-[6px] bg-[#7B2CBF] hover:bg-transparent hover:border-[#7B2CBF]    sm:py-2 md:px-9 lg:px-10 lg:py-2 border-[#7B2CBF] text-white hover:border-2 hover:text-white"
                colorScheme="outline"
                fontSize="sm"
                radius="md"
              >
                <Link href={"teachers"}>Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomepageSlider };
