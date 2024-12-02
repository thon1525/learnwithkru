import { ITeacher } from "@/@types/teacher.type";
import { IUser } from "@/@types/user";
import { Footer, Navbar, TeachersProfile } from "@/components";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import React from "react";
import Image from "next/image";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import notFound from "../not-found";
interface IAuth {
    isAuth?: boolean;
    errors?: string;
    data: IUser | null;
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
interface ITeacherData {
    errors?: string;
    data: ITeacher | null;
    isAuth?: boolean;
}
async function getTeachersData(_id: string): Promise<ITeacherData> {
    try {   
        const cookieStringOrAuth = getCookieString();

        if (typeof cookieStringOrAuth === "object") {
            return { errors: "Not authenticated", data: null };
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD || "https://api.learnwithkru.com";
        const API_ENDPOINT = `${apiUrl}/v1/teachers/${_id}`;
        const res = await axios.get(API_ENDPOINT, {
            withCredentials: true,
            headers: { Cookie: cookieStringOrAuth },
        });

        if (res.data.errors) {
            return { errors: res.data.errors, data: null };
        }

        return { data: res.data.data};
    } catch (error: unknown) {
        
    handleAxiosError(error, {
        handleErrorResponse(response) {

          if(response.status === 404  || response.status === 401){
            return notFound()
          }
          const { errors } = response?.data;
          if( errors ){
            throw errors
          }
        },
      })
      throw error;
    }
    }

const Page = async ({ params }: { params: { id: string } }) => {
    const { isAuth, data } = await getUserData();
    const userId = params.id as string;

    const teachersResponse = await getTeachersData(userId);


    if(teachersResponse?.errors){
        return (
            <div className="w-full h-[100vh] flex justify-center items-center">
                <div className="w-auto flex flex-col justify-center items-center ">
                    <Image src={`/Benner/error.png`} width={100} height={100} alt='error image'></Image>
                    <p className="text-red-500 text-sm py-3">Your&apos;re not {teachersResponse?.errors}!, Please Login to access this resourse</p>
                </div>
            </div>
        )
    }

    const selectedTeacher = teachersResponse?.data;
    return (
        <div className="">
            <div className="w-full flex justify-center items-center border shadow-sm">
                <Navbar authState={{ isAuth: isAuth ?? false, user: data }} 
                />
            </div>
            <div className="w-full flex justify-center items-start">
                <TeachersProfile teacher={selectedTeacher as ITeacher} />
            </div>
            <div className="w-full flex justify-center items-start bg-black">
                <Footer />
            </div>
        </div>
    );
};

export default Page;
