import { Typography } from "@/components/atoms";
import React from "react";

const CardAllStudents = () => {
  return (
    <>
      <div className="bg-white h-[375px] rounded-lg p-4 shadow-lg">
        <div className="flex">
          <div className="flex flex-col w-[80%]">
            <Typography
              align="left"
              variant="bold"
              className="text-[21px] lg:text-[16px] xl:text-[18px]"
            >
              All Student
            </Typography>
            <div className="flex flex-col gap-2 mt-3">
              <div className="bg-[#F0F7FF] flex w-full h-[70px] justify-between items-center px-4 rounded-lg">
                <div className="flex flex-col">
                  <Typography
                    align="left"
                    className="text-[12px]"
                    variant="bold"
                  >
                    January
                  </Typography>
                  <Typography
                    align="left"
                    className="text-[10px] text-gray-400"
                  >
                    40 Registed
                  </Typography>
                </div>
                <div className="relative w-[40px] h-[40px]  sm:w-[60px] sm:h-[60px] md:w-[60px] md:h-[60px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]">
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
                      stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
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
                      70%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="bg-[#F0F7FF] flex w-full h-[70px] justify-between items-center px-4 rounded-lg">
                <div className="flex flex-col">
                  <Typography
                    align="left"
                    className="text-[12px]"
                    variant="bold"
                  >
                    February
                  </Typography>
                  <Typography
                    align="left"
                    className="text-[10px] text-gray-400"
                  >
                    40 Registed
                  </Typography>
                </div>
                <div className="relative w-[40px] h-[40px]  sm:w-[60px] sm:h-[60px] md:w-[60px] md:h-[60px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]">
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
                      stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
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
                      70%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="bg-[#F0F7FF] flex w-full h-[70px] justify-between items-center px-4 rounded-lg">
                <div className="flex flex-col">
                  <Typography
                    align="left"
                    className="text-[12px]"
                    variant="bold"
                  >
                    March
                  </Typography>
                  <Typography
                    align="left"
                    className="text-[10px] text-gray-400"
                  >
                    40 Registed
                  </Typography>
                </div>
                <div className="relative w-[40px] h-[40px]  sm:w-[60px] sm:h-[60px] md:w-[60px] md:h-[60px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]">
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
                      stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
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
                      70%
                    </text>
                  </svg>
                </div>
              </div>
              <div className="bg-[#F0F7FF] flex w-full h-[70px] justify-between items-center px-4 rounded-lg">
                <div className="flex flex-col">
                  <Typography
                    align="left"
                    className="text-[12px]"
                    variant="bold"
                  >
                    April
                  </Typography>
                  <Typography
                    align="left"
                    className="text-[10px] text-gray-400"
                  >
                    40 Registed
                  </Typography>
                </div>
                <div className="relative w-[40px] h-[40px]  sm:w-[60px] sm:h-[60px] md:w-[60px] md:h-[60px] lg:w-[50px] lg:h-[50px] xl:w-[60px] xl:h-[60px]">
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
                      stroke-dashoffset="calc(251.2 - (251.2 * 70) / 100)"
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
                      70%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[20%]">
            <div className="flex flex-col items-center">
              <Typography align="right" colorscheme="secondary" fontSize="sm">
                2024
              </Typography>
              <div className="relative">
                <div className="bg-gray-200 rounded-md w-[6px] h-[320px]"></div>
                <div className="absolute top-28 left-0 bg-[#7B2CBF] rounded-md w-[6px] h-[100px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CardAllStudents };
