import { IAuth } from "@/@types/auth";
import { ITeacher, PageDetails } from "@/@types/teacher.type";
import { Footer, Navbar, TeacherList } from "@/components";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import { notFound } from "next/navigation";

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

async function getTeachersData({
  search_query,
  pageNumber,
  province,
  subject,
  time_available,
  min_p,
  max_p,
}: {
  search_query: string;
  pageNumber: number;
  province: string;
  subject: string;
  time_available: string;
  min_p: number;
  max_p: number;
}): Promise<
  {
    errors?: string;
    data: { teachers: ITeacher[]; detail: PageDetails } | null;
  }

> {
  try {
    //end poirnt
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
    const API_ENDPOINT = `${apiUrl}/v1/teachers?pageSize=6&pageNumber=${pageNumber}&name=${search_query}&province=${province}&subject=${subject}&time_available=${time_available}&min_p=${min_p}&max_p=${max_p}`;
    const res = await axios.get(API_ENDPOINT);

    return { data: { teachers: res.data?.data, detail: res.data?.detail } };
  } catch (error: any) {


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

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  //auth
  const { isAuth, data } = await getUserData();
  
  const search_query = (searchParams.search_query as string) || "";
  const pageNumber = Number(searchParams.pageNumber as string) || 1;
  const province = (searchParams.province as string) || "";
  const subject = (searchParams.subject as string) || "";
  const time_available = (searchParams.time_available as string) || "";
  const min_p = Number(searchParams.min_p as string) || 0;
  const max_p = Number(searchParams.max_p as string) || 0;
  const teachers = await getTeachersData({
    search_query,
    pageNumber,
    province: province.includes("All") ? "" : province,
    subject: subject.includes("All") ? "" : subject,
    time_available: time_available.includes("All") ? "" : time_available,
    min_p,
    max_p,
  });
  return (
    <div className="max-w-full grid gap-5">
      <div className="w-full flex justify-center items-center border shadow-sm">
        <Navbar authState={{ isAuth: isAuth ?? false, user: data }} />
      </div>
      <TeacherList initialData={teachers!} />
      <div className="w-full flex justify-center items-start bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
