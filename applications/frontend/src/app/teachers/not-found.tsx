import { IAuth } from "@/@types/auth";
import {
  FilterTeachers,
  Footer,
  Navbar,
  SearchInput,
  Typography,
} from "@/components";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import Image from "next/image";

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

export default async function NotFound() {
  const { isAuth, data } = await getUserData();

  return (
    <div>
      <div className="w-full flex justify-center items-center border shadow-sm">
        <Navbar authState={{ isAuth: isAuth ?? false, user: data }} />
      </div>
      <div className="w-full grid grid-flow-row gap-8">
        <div className="w-[80%] mx-auto">
          <Typography align="left" variant="bold" fontSize="lg">
            See your future teacher
          </Typography>
        </div>
        <SearchInput />
        <FilterTeachers />
        <main className="flex h-full flex-col items-center justify-center gap-2 gap-y-4 py-5">
          <p>Could not find the teacher.</p>
          <Image
            src={"/Logos/no-results.png"}
            width={100}
            height={100}
            alt="Not found"
          ></Image>
        </main>
      </div>
      <div className="w-full flex justify-center items-start bg-black">
        <Footer />
      </div>
    </div>
  );
}
