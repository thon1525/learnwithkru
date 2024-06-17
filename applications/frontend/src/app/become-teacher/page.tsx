import { IAuth } from "@/@types/auth";
import { BecomeTeacher } from "@/components";

import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import React from "react";

export interface IUserBecomeTeacher {
  firstname: string;
  lastname: string;
  email: string;
  picture: string | null;
}

const getUserData = async (): Promise<IAuth> => {
  const cookieString = getCookieString();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log(apiUrl)
  try {
    if (typeof cookieString === "object") {
      return cookieString;
    }
    const res = await axios.get(`${apiUrl}/v1/users`, {

      withCredentials: true,
      headers: { Cookie: cookieString as string },
    });

    if (res.data.errors) {
      return { errors: res.data.errors, data: null };
    }

    return { isAuth: true, data: res.data.data };

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data);
    }

    throw error;
  }
};

const page = async () => {
  const { errors, data } = await getUserData();

  if (errors) {
    <div className="w-full flex justify-center pt-10">
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="">{errors}</h1>
      </div>
    </div>;
  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">

      <BecomeTeacher data={data} />
    </div>
  );
};

export default page;