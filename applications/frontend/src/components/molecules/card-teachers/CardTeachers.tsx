"use client";
import { ITeacher } from "@/@types/teacher.type";
import { Typography } from "@/components/atoms";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardTeacherProps {
  isFavorite: any;
  onFavoriteClick: () => void;
  items: ITeacher;
}

const CardTeachers: React.FC<CardTeacherProps> = ({
  isFavorite,
  onFavoriteClick,
  items,
}) => {
  const { _id, first_name, last_name, picture, subject, bio, price } = items;
  const fullname = `${first_name} ${last_name}`;


  const handleFavoriteClick = () => {
    onFavoriteClick(); // Call the provided onClick handler
  };
  return (
    <div className="w-full  lg:w-[49%] flex  justify-evenly sm:justify-around border-[1.5px] px-1 md:px-0  shadow-sm pt-2 pb-1 md:py-3 hover:border-3 hover:border-[#455445] ">
      <div className="flex flex-col items-center gap-1 justify-center md:justify-start w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[120px]">
        <Link
          href={`/teachers/${encodeURIComponent(_id)}`}
          className="flex flex-col items-center gap-1 justify-center md:justify-start w-[100px]  sm:w-[130px] md:w-[140px] lg:w-[120px]"
        >
          <Image
            src={picture}
            width={500}
            height={500}
            alt={`${first_name} ${last_name}`}
            className="w-full h-[100px] sm:h-[110px] md:h-[140px] lg:h-[120px] object-cover"
          ></Image>

        </Link>
      </div>

      <div className="w-[65%] grid  gap-[2px]">
        {/* Name */}
        <div className="flex justify-between gap-14 items-center lg:gap-0">
          <Typography className="font-medium text-md sm:text-xl tracking-normal">
            {fullname}
          </Typography>
          <div className="flex items-center">
            <button onClick={handleFavoriteClick} className="cursor-pointer">
              {!isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 fill-red-500 stroke-red-500 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button className="hidden md:block py-1 px-2 text-xs bg-[#007C00] text-white hover:bg-white hover:border hover:text-[#455445] hover:border-[#007C00]">
            Send Message
          </button>
        </div>

        {/* Stars */}

        <div className="w-full md:w-[75%] flex  items-center ">
          {/* ot ton mean data */}
          {/* <Typography className="text-xs ">{rateStars}</Typography> */}

          <svg
            className="w-20 md:w-24"
            viewBox="0 0 130 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.32441 19.9231L8.56441 14.6101L4.44141 11.0381L9.87241 10.5681L11.9994 5.55713L14.1264 10.5671L19.5564 11.0371L15.4344 14.6091L16.6744 19.9221L11.9994 17.1021L7.32441 19.9231Z"
              fill="#B9B900"
            />
            <path
              d="M31.3244 19.9231L32.5644 14.6101L28.4414 11.0381L33.8724 10.5681L35.9994 5.55713L38.1264 10.5671L43.5564 11.0371L39.4344 14.6091L40.6744 19.9221L35.9994 17.1021L31.3244 19.9231Z"
              fill="#B9B900"
            />
            <path
              d="M55.3244 19.9231L56.5644 14.6101L52.4414 11.0381L57.8724 10.5681L59.9994 5.55713L62.1264 10.5671L67.5564 11.0371L63.4344 14.6091L64.6744 19.9221L59.9994 17.1021L55.3244 19.9231Z"
              fill="#B9B900"
            />
            <path
              d="M79.3244 19.9231L80.5644 14.6101L76.4414 11.0381L81.8724 10.5681L83.9994 5.55713L86.1264 10.5671L91.5564 11.0371L87.4344 14.6091L88.6744 19.9221L83.9994 17.1021L79.3244 19.9231Z"
              fill="#B9B900"
            />
            <path
              d="M103.324 19.9231L104.564 14.6101L100.441 11.0381L105.872 10.5681L107.999 5.55713L110.126 10.5671L115.556 11.0371L111.434 14.6091L112.674 19.9221L107.999 17.1021L103.324 19.9231Z"
              fill="black"
            />
          </svg>

          {/* ot ton mean data */}

          {/* <Typography className="text-xs flex items-center" align="left">
              &#40;{reviews} reviews&#41;
            </Typography> */}
        </div>

        {/* active Students */}

        <div className="">
          <div className="flex items-center"></div>
          <div className="flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2259_2319)">
                <path
                  d="M1 0.3125V1.25H11.3125V8.75H4.75V9.6875H13.1875V8.75H12.25V0.3125H1ZM2.87594 1.71875C2.3791 1.72048 1.9031 1.91855 1.55169 2.26978C1.20028 2.62101 1.00198 3.09692 1 3.59375C1 4.62453 1.84562 5.46875 2.87594 5.46875C3.37252 5.46677 3.84819 5.26857 4.19925 4.91734C4.5503 4.5661 4.74827 4.09034 4.75 3.59375C4.75 2.56391 3.90531 1.71875 2.87594 1.71875ZM5.6875 2.1875V3.125H8.03125V2.1875H5.6875ZM8.96875 2.1875V3.125H10.375V2.1875H8.96875ZM2.87594 2.65625C3.39812 2.65625 3.8125 3.07016 3.8125 3.59375C3.8125 4.11875 3.39859 4.53125 2.87594 4.53125C2.35094 4.53125 1.9375 4.11875 1.9375 3.59375C1.9375 3.07016 2.35141 2.65625 2.87594 2.65625ZM5.6875 4.0625V5H10.375V4.0625H5.6875ZM1 5.9375V9.6875H1.9375V6.875H3.34375V9.6875H4.28125V7.18344L5.24875 7.69531C5.52297 7.84062 5.8525 7.84016 6.12625 7.69531L7.78094 6.82109L7.34359 5.99141L5.68844 6.86656L4.23719 6.10063C4.03465 5.99362 3.80907 5.93763 3.58 5.9375H1Z"
                  fill="#455445"
                />
              </g>
              <defs>
                <clipPath id="clip0_2259_2319">
                  <rect
                    width="14.1875"
                    height="9.375"
                    fill="white"
                    transform="translate(0 0.3125)"
                  />
                </clipPath>
              </defs>
            </svg>

            <Typography className="text-xs ml-1" align="left">
              {subject}
            </Typography>
          </div>
        </div>

        {/* Description */}

        <article className="text-xs text-[#455445] truncate md:text-clip">
          {bio}
          <span>
            <Link
              href={""}
              className="hidden md:block text-xs text-gray-900 font-medium underline  "
            >
              Read more
            </Link>
          </span>
        </article>

        <Link
          href={""}
          className="md:hidden text-xs text-gray-900 font-medium underline  "
        >
          Read more
        </Link>

        {/* pricing */}

        <Typography
          className="tracking-wide hover:underline"
          fontSize="sm"
          align="left"
          variant="semibold"
        >
          ${price} /hour
        </Typography>
      </div>
    </div>
  );
};

export { CardTeachers };