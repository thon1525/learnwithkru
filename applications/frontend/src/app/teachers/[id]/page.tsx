import { ITeacher } from "@/@types/teacher.type";
import { IUser } from "@/@types/user";
import { Footer, Navbar, TeachersProfile } from "@/components";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
interface IAuth {
    isAuth?: boolean;
    errors?: string;
    data: IUser | null;
}

const getUserData = async (): Promise<IAuth> => {
    try {
        const cookieStringOrAuth = getCookieString();

        if (typeof cookieStringOrAuth === "object") {
            return cookieStringOrAuth;
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL_PROD || "https://api.learnwithkru.com";
        const res = await axios.get(`${apiUrl}/v1/users`, {
            withCredentials: true,
            headers: { Cookie: cookieStringOrAuth },
        });

        if (res.data.errors) {
            return { errors: res.data.errors, data: null };
        }

        return { isAuth: true, data: res.data.data };
    } catch (error: unknown) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
interface ITeacherData {
    errors?: string;
    data: ITeacher | null;
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
    } catch (error: any) {
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

    if (!teachersResponse?.data) {
        notFound();
    }

    const selectedTeacher = teachersResponse?.data;

    return (
        <div className="">
            <div className="w-full flex justify-center items-center border shadow-sm">
                <Navbar authState={{ isAuth: isAuth ?? false, user: data }} />
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
