import { IAuth } from "@/@types/auth";
import { Footer, Navbar } from "@/components";
import UserUpdate from "@/components/organisms/users-update/UserUpdate";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";


const getUserData = async (): Promise<IAuth> => {
  const cookieString = getCookieString();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
  console.log(apiUrl)
  try {
    if (typeof cookieString === "object") {
      return cookieString;
    }
    const res = await axios.get(`${apiUrl}/v1/users` , {

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
    <div className="w-full flex flex-col gap-10">
  
      <div className="w-full flex justify-center ">
        <Navbar authState={{ isAuth: isAuth as boolean, user: data }} />
       
      </div>
     <div className="w-full flex justify-center  ">
     <UserUpdate authState={{ isAuth: isAuth as boolean, user: data }} />

     </div>
  
     <div className="w-full flex justify-center items-start bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
