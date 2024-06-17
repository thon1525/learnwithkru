import { Button, Typography } from "@/components/atoms";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const VerifyResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    console.log("this is token:",token)
    if (token) {
      // token is present, send it to your backend to exchange for access token
      exchangetokenForToken(token as string);
    } else {
      // token is not present, handle error or redirect accordingly
      console.error("No authorization token found");
      // Redirect to error page or home page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";

  const exchangetokenForToken = async (token: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/v1/auth/verify-reset-password?token=${token}`
      );
      const data = await response.json()
      // after success verify front end access user to change their passworx

      console.log(data)
    } catch (error) {
      console.error("Error exchanging token for token:", error);
      // Redirect to error page or home page
    }
  };
  return (
    <>
      <div className="flex flex-col mx-auto mt-10 w-[300px] h-[350px] shadow-lg rounded-lg justify-center items-center gap-4">
        <Image
          src={"/verify-email.png"}
          width={500}
          height={500}
          alt="Smoeury Songvat profile"
          className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white"
        ></Image>
        <Typography>
          We need to verify your email. We&apos;ve already sent out of the
          verfication link. Please check it and confirm it&apos;s really for
          you.
        </Typography>
        <Button
          radius="md"
          className="w-[130px] h-[35px]"
          colorScheme="secondary"
        >
          Home
        </Button>
      </div>
    </>
  );
};

export { VerifyResetPassword };
