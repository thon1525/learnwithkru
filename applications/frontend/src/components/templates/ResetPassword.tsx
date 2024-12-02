import React from "react";
import { Typography } from "../atoms";
import { FormResetPassword } from "../organisms";

const ResetPassword = () => {
  return (
    <div>
      <div className="flex flex-col mx-auto w-full md:w-[65%] lg:w-[40%] xl:w-[40%] h-[480px] gap-y-5 border items-center rounded-md shadow-lg justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="0.7"
          stroke="rgb(100 116 139)"
          className="w-[64px] h-[64px]">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <Typography variant="bold">Change your password</Typography>
        {/* input form */}

        <div className="flex flex-col w-[80%] py-10">
          <FormResetPassword />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
