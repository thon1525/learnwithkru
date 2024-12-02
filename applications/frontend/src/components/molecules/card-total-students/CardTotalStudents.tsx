import { Typography } from "@/components/atoms";
import React from "react";

const CardTotalStudents = () => {
  return (
    <>
      <div className="bg-white flex flex-col h-[375px] rounded-lg p-4 shadow-lg items-center">
        <Typography
          align="left"
          variant="bold"
          className="text-[21px] lg:text-[16px] xl:text-[18px]"
        >
          Total Students
        </Typography>
        <div className="bg-[#F0F7FF] flex flex-col w-[210px] h-[250px] mt-5 items-center rounded-lg justify-center gap-5">
          <Typography colorscheme="secondary">1290 Registed</Typography>
          <div className="relative w-[100px] h-[100px]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle  */}
              <circle
                className="text-gray-200 stroke-current"
                stroke-width="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              {/* Progress circle  */}
              <circle
                className="text-[#7B2CBF]  progress-ring__circle stroke-current"
                stroke-width="10"
                stroke-linecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke-dasharray="251.2"
                stroke-dashoffset="calc(251.2 - (251.2 * 100) / 100)"
              ></circle>

              {/* Center text  */}
              <text
                x="50"
                y="50"
                font-family="Verdana"
                font-size="14"
                text-anchor="middle"
                alignment-baseline="middle"
              >
                100%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardTotalStudents };
