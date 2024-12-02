import { IAuth } from "@/@types/auth";
import { BecomeTeacher } from "@/components";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import Image
 from "next/image";
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
  try {
    if (typeof cookieString === "object") {
      return cookieString;
    }
    const res = await axios.get(`${apiUrl}/v1/users` , {

      withCredentials: true,
      headers: { Cookie: cookieString as string },
    });

    return { isAuth: true, data: res.data.data };

  } catch (error: unknown) {

     handleAxiosError(error, {
      handleErrorResponse: (response) =>{
        
        const { errors} = response.data;

        if(errors){
          return { isAuth: false , errors: errors?.message , data: null };
        }
      }
     })
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
    <div className="w-full ">
      
        <div className="w-full flex justify-between items-center px-5 ">
              <Image className="w-36 h-16 object-cover" src={"/Logos/KruLogo.png"} width={500} height={500} alt="Learnwithkru Logo"></Image>
              <Image className="w-10  rounded-full object-cover" src={data?.picture ? data?.picture : "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"} width={500} height={500} alt="user's profile"></Image>
        </div>

      <BecomeTeacher data={data} />
    </div>
  );
};

export default page;