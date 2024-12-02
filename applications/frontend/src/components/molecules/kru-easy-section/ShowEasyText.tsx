import React from "react";
import { Typography } from "@/components";

const ShowEasyText: React.FC = ({ }) => {
  return (
    <div className="w-full flex justify-center items-center py-12 ">
      <div className="w-[80%] grid gap-5 md:grid-flow-col md:gap-10">
        <div className="h-auto flex flex-col gap-y-6 py-2  px-5 bg-[#F0F7FF] rounded-md">
          <Typography className="" fontSize="lg" variant="bold">
            Scheduling
          </Typography>
          <article className=" text-sm text-center text-clip text-wrap">
            scheduling tools, allowing students to communicate with tutors,
            schedule lessons, and manage their appointments seamlessly.has
            language, subject, price, availability, and tutor reviews.
          </article>
        </div>

        <div className="h-auto flex flex-col gap-y-6 py-2  px-5 bg-[#F0F7FF] rounded-md">
          <Typography className="" fontSize="lg" variant="bold">
            Search and Filters
          </Typography>
          <article className="text-sm text-center text-clip text-wrap">
            Students can easily search for tutors based on criteria such as
            language, subject, price, availability, and tutor reviews.
          </article>
        </div>

        <div className="h-auto flex flex-col gap-y-6 py-2  px-5 bg-[#F0F7FF] rounded-md">
          <Typography className="" fontSize="lg" variant="bold">
            Reviews and Ratings
          </Typography>
          <article className="text-sm text-center text-clip text-wrap">
            Students can read reviews and ratings from other learners to help
            them choose the right tutor for their needs.
          </article>
        </div>
      </div>
    </div>
  );
};
export { ShowEasyText };
