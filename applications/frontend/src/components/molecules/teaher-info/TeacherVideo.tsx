import React from "react";
import { TeacherVideoTypes } from "./@types";
import { Typography } from "@/components/atoms";
import { RatingStar } from "@/components/organisms/rating-star";

const TeacherVideo = ({ src, classname, year_experience, type_degree, Province, university }: TeacherVideoTypes) => {
  return (
    <div className="mt-4">
      <div className={`sm:w-[400px] md:w-[400px] pb-4  lg:border-2 border-[#efefef] rounded-md  pt-8 pl-5 sm:pl-0 flex justify-center sm:justify-center md:justify-center md:ml-5 lg:justify-center items-start ${classname}`}>
        < div className="">
          <video controls className="w-full rounded-sm">
            <source src={src} type="video/mp4" />
          </video>

          <div className="flex flex-col pt-5 items-center gap-3    ">
            <div className="flex justify-between items-center w-full h-9 rounded-md p-2   ">
              <Typography>
                Year of Experience :
              </Typography>
              <Typography className="text-gray-500">
                {year_experience}
              </Typography>
            </div>

            <div className="flex justify-between items-center w-full h-9 rounded-md p-2 ">
              <Typography>
                Type Degree :
              </Typography>
              <Typography className="text-gray-500">
                {type_degree}
              </Typography>
            </div>
            <div className="flex justify-between items-center w-full h-9 rounded-md p-2 ">
              <Typography>
                Province :
              </Typography>
              <Typography className="text-gray-500" >
                {Province}
              </Typography>
            </div>
            <div className="flex justify-between items-center w-full h-9 rounded-md p-2  ">
              <Typography>
                Went from :
              </Typography>
              <Typography className="text-gray-500">
                {university}
              </Typography>
            </div>
            <div className="">
              <RatingStar>
              </RatingStar>
            </div>






          </div>
        </div>
      </div>
    </div >


  );
};

export { TeacherVideo };
