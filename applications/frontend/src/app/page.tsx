import { IAuth } from "@/@types/auth";
import { Homepage, Navbar } from "@/components";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";


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

// root
const Page = async () => {
  const { isAuth, errors, data } = await getUserData();

  if (errors) {
    return (
      <div className="w-full flex justify-center pt-10">
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="">{errors}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-full grid">
      <div className="w-full flex justify-center items-center">
        <Navbar authState={{ isAuth: isAuth as boolean, user: data }} />
      </div>
      <Homepage isAuth={isAuth!} />
      <div className="w-full flex justify-center items-start bg-gray-900"></div>
    </div>
  );
};

export default Page;
