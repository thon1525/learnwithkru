import { ITeacher, PageDetails } from "@/@types/teacher.type";
import { IUser } from "@/@types/user";
import { Footer, Navbar, TeacherList } from "@/components";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import { notFound } from "next/navigation";

const getUserData = async (): Promise<{
  isAuth?: boolean;
  errors?: string;
  data: IUser | null;
}> => {
  const cookieString = getCookieString();

  try {
    if (typeof cookieString === "object") {
      return cookieString;
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
    const res = await axios.get(`${apiUrl}/v1/users`, {
      withCredentials: true,
      headers: { Cookie: cookieString as string },
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
    const API_ENDPOINT = `${apiUrl}/v1/teachers?pageSize=6&pageNumber=${pageNumber}&name=${search_query}&province=${province}&subject=${subject}&time_available=${time_available}&min_p=${min_p}&max_p=${max_p}`;
    console.log("Api teacher Endpoint: ", API_ENDPOINT)
    const res = await axios.get(API_ENDPOINT);

    return { data: { teachers: res.data.data, detail: res.data.detail } };
  } catch (error: any) {
    console.error("Error fetching teachers data:", error.response.status);

    // Check if error has a response object
    if (error.response) {
      const { status } = error.response;

      // Handle 404 or 401 errors
      if (status === 404 || status === 401) {
        notFound();
      }
      // Handle 500 error
      else if (status === 500) {
        throw new Error("Something went wrong!");
      }

      ;
    }
    throw error;
  }
}

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
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
  console.log(teachers)
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
