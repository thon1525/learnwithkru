import { IAuth } from "@/@types/auth";
import {
  Footer,
  Navbar,
} from "@/components";
import { getCookieString } from "@/utils/getCookieString";
import axios from "axios";
import Image from "next/image";

const getUserData = async (): Promise<IAuth> => {
  const cookieString = getCookieString();

  try {
    if(typeof cookieString === 'object'){
      return  cookieString as IAuth
    }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";

    const res = await axios.get(`${apiUrl}/v1/users`, {
      withCredentials: true,
      headers: { Cookie: cookieString },
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
export default async function NotFound() {
  const { isAuth, data } = await getUserData();

  return (
    <div>
      <div className="w-full flex justify-center items-center border shadow-sm">
        <Navbar authState={{ isAuth: isAuth ?? false, user: data }} />
      </div>
      <main className="flex h-full flex-col items-center justify-center gap-2 gap-y-4 py-5">
          <p>Could not find the teacher.</p>
          <Image
            src={"/logos/no-results.png"}
            width={100}
            height={100}
            alt="Not found"
          ></Image>
        </main>
      <div className="w-full flex justify-center items-start bg-black">
        <Footer />
      </div>
    </div>
  );
}
