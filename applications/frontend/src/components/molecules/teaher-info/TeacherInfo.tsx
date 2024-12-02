import { Typography } from "@/components/atoms";
import React from "react";
import { TeacherInfoTypes } from "./@types";

const TeacherInfo = ({ aboutMe, className, description, education }: TeacherInfoTypes) => {
  return (
    <div className={`pt-10 w-[500px] pl-10 md:pl-0 lg:pl-0  flex flex-col gap-y-5  justify-center md:justify-start   h-auto ${className}`}>
      <div className=" flex flex-col ">
        <Typography className="tracking-tight font-extrabold" align="left" fontSize="lg">
          About me
        </Typography>
        <Typography
          className="text-gray-800 text-wrap  pt-1"
          align="left"
          tags="p"
          fontSize="sm"
        >
          {aboutMe}
        </Typography>
      </div>
      <div className=" flex flex-col ">
        <Typography className="tracking-tight font-extrabold" align="left" fontSize="lg">
          Description
        </Typography>
        <Typography
          className="text-gray-800 text-wrap pt-1 "
          align="left"
          tags="p"
          fontSize="sm"

        >
          {description}
        </Typography>

      </div>
      <div className=" flex flex-col   ">
        <Typography className="tracking-tight font-extrabold" align="left" fontSize="lg">
          Education
        </Typography>
        <Typography
          className="text-gray-800 text-wrap pt-1 "
          align="left"
          tags="p"
          fontSize="sm"
        >
          {education}
        </Typography>
      </div>
    </div>
  );
};

export { TeacherInfo };
