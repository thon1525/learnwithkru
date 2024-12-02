
import { ITeacher } from "@/@types/teacher.type";
import { Footer } from "@/components";
import {  TimeAvailable } from "@/components/organisms/dashboard/teacher-edits";
import NavLinksSubTeachers from "@/components/organisms/dashboard/teacher-edits/nav-side-link";
import { NavbarTeachers } from "@/components/organisms/navbar-teacher";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
    const API_ENDPOINT = `${apiUrl}/v1/teachers/${_id}`;
    const res = await axios.get(API_ENDPOINT, {
      withCredentials: true,
      headers: { Cookie: cookieStringOrAuth },
    });

    if (res.data.errors) {
      return {  errors: res.data.errors, data: null };
    }

    return { isAuth: true,data: res.data.data};
  } catch (error: any) {
    throw error;
  }
}



const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id as string;
  const teachersResponse = await getTeachersData(id);
  const selectedTeacher = teachersResponse?.data;
  const isTeachers = teachersResponse?.isAuth;
  return (
    <>
       <div className="w-full flex justify-center items-center border shadow-sm">
        <NavbarTeachers
          teacher={selectedTeacher as ITeacher}
          isTeachers={isTeachers as boolean}
        />
      </div>
      <div className="container xl:max-w-[1200px] bg-[#F8F9FA] rounded-xl mt-5 px-10 py-5">
        <div className="flex flex-row">
          <NavLinksSubTeachers id={id} />
        </div>
        <div className="flex flex-col">
          <TimeAvailable teacher={selectedTeacher as ITeacher}/>
        </div>
      </div>
      <div className="w-full flex justify-center items-start bg-black">
        <Footer />
      </div>
    </>
  );
};

export default Page;
