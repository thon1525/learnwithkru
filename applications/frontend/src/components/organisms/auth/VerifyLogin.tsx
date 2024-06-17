"use client";
import { Typography } from "@/components/atoms";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
const VerifyLogin = ({ isAuth, type }: { isAuth: boolean, type: string }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
    setIsLogin(isAuth)
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setPopupOpen(false);
    }
  };
  useEffect(() => {
    if (isPopupOpen) {
      if (isLogin && type === "student") {
        router.push("/student-form")
      }
      else if (isLogin && type === "teacher") {
        router.push("/become-teacher")

      }
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLogin, isPopupOpen, router, type]);
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 bg-[#E9E9E9] rounded-full hover:bg-white cursor-pointer"
        onClick={togglePopup}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
      {isPopupOpen && !isLogin && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="relative w-[350px] p-5 bg-white rounded-lg border shadow-lg flex flex-col justify-between    ">
            <Button
              className="absolute top-10 right-0 m-2"
              onClick={togglePopup}
              radius="md"
            >
              {/* close button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#F01C1C"
                  d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6l-5.6 5.6Z"
                />
              </svg>
            </Button>

            {/* logo  */}

            <Image
              src="/Logos/KruLogo.png"
              alt="logo kru"
              width={75}
              height={80}
              className="flex justify-center mt-3 mb-3 border border-black drop-shadow-xl p-3 rounded-lg"
            />
            {/* Form button   */}
            <Typography
              variant="bold"
              className="text-sm sm:text-lg md:text-lg lg:text-lg xl:text-lg mt-4"
            >
              Let us know If you are Sign up or Log in. Spend your time to
              authentication with us.
            </Typography>
            <div className=" w-full flex justify-between mt-20 md:px-5 lg:px-5 lg:max-w-full">
              <Link href={"login"}>
                <Button className="w-[90px] h-[40px] text-sm border bg-[#7B2CBF] border-[#7B2CBF] rounded-md text-white">
                  Login
                </Button>
              </Link>
              <Link href={"signup"}>
                <Button className="w-[90px] h-[40px] text-sm bg-[#7B2CBF] border border-[#7B2CBF] rounded-md text-white">
                  SignUp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { VerifyLogin };
