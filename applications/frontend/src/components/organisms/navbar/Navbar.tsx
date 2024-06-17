"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Typography } from "@/components";
import { ButtonDropDown } from "@/components/molecules/button-dropdown";
import { ProfileDropDown } from "@/components/molecules/profile-dropdown";
import { Notification } from "@/components/organisms/notification";
import { IUser } from "@/@types/user";
import axios, { AxiosError } from "axios";

// langue
const options = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 64 64"
      >
        <path fill="#ed4c5c" d="M48 6.6C43.3 3.7 37.9 2 32 2v4.6h16z" />
        <path fill="#fff" d="M32 11.2h21.6C51.9 9.5 50 7.9 48 6.6H32v4.6z" />
        <path
          fill="#ed4c5c"
          d="M32 15.8h25.3c-1.1-1.7-2.3-3.2-3.6-4.6H32v4.6z"
        />
        <path fill="#fff" d="M32 20.4h27.7c-.7-1.6-1.5-3.2-2.4-4.6H32v4.6" />
        <path fill="#ed4c5c" d="M32 25h29.2c-.4-1.6-.9-3.1-1.5-4.6H32V25z" />
        <path fill="#fff" d="M32 29.7h29.9c-.1-1.6-.4-3.1-.7-4.6H32v4.6" />
        <path
          fill="#ed4c5c"
          d="M61.9 29.7H32V32H2c0 .8 0 1.5.1 2.3h59.8c.1-.8.1-1.5.1-2.3c0-.8 0-1.6-.1-2.3"
        />
        <path
          fill="#fff"
          d="M2.8 38.9h58.4c.4-1.5.6-3 .7-4.6H2.1c.1 1.5.4 3.1.7 4.6"
        />
        <path
          fill="#ed4c5c"
          d="M4.3 43.5h55.4c.6-1.5 1.1-3 1.5-4.6H2.8c.4 1.6.9 3.1 1.5 4.6"
        />
        <path
          fill="#fff"
          d="M6.7 48.1h50.6c.9-1.5 1.7-3 2.4-4.6H4.3c.7 1.6 1.5 3.1 2.4 4.6"
        />
        <path
          fill="#ed4c5c"
          d="M10.3 52.7h43.4c1.3-1.4 2.6-3 3.6-4.6H6.7c1 1.7 2.3 3.2 3.6 4.6"
        />
        <path
          fill="#fff"
          d="M15.9 57.3h32.2c2.1-1.3 3.9-2.9 5.6-4.6H10.3c1.7 1.8 3.6 3.3 5.6 4.6"
        />
        <path
          fill="#ed4c5c"
          d="M32 62c5.9 0 11.4-1.7 16.1-4.7H15.9c4.7 3 10.2 4.7 16.1 4.7"
        />
        <path
          fill="#428bc1"
          d="M16 6.6c-2.1 1.3-4 2.9-5.7 4.6c-1.4 1.4-2.6 3-3.6 4.6c-.9 1.5-1.8 3-2.4 4.6c-.6 1.5-1.1 3-1.5 4.6c-.4 1.5-.6 3-.7 4.6c-.1.8-.1 1.6-.1 2.4h30V2c-5.9 0-11.3 1.7-16 4.6"
        />
        <path
          fill="#fff"
          d="m25 3l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm4 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm20 6l.5 1.5H31l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H23l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H15l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm12 6l.5 1.5H27l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H19l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm-8 0l.5 1.5H11l-1.2 1l.4 1.5l-1.2-.9l-1.2.9l.4-1.5l-1.2-1h1.5zm2.8-14l1.2-.9l1.2.9l-.5-1.5l1.2-1h-1.5L13 9l-.5 1.5h-1.4l1.2.9l-.5 1.6m-8 12l1.2-.9l1.2.9l-.5-1.5l1.2-1H5.5L5 21l-.5 1.5h-1c0 .1-.1.2-.1.3l.8.6l-.4 1.6"
        />
      </svg>
    ),
    value: "English",
  },
  {
    value: "Khmer",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 64 64"
      >
        <path
          fill="#ed4c5c"
          d="M2 32c0 5.9 1.7 11.4 4.6 16h50.7c2.9-4.6 4.6-10.1 4.6-16s-1.7-11.4-4.6-16H6.6C3.7 20.6 2 26.1 2 32z"
        />
        <path
          fill="#2a5f9e"
          d="M57.4 16C52.1 7.6 42.7 2 32 2S11.9 7.6 6.6 16h50.8zM6.6 48c5.3 8.4 14.7 14 25.4 14s20.1-5.6 25.4-14H6.6z"
        />
        <path
          fill="#e2e2e2"
          d="M45.9 35.7v-3.1c.1-.4.4-.7.7-.8V29c-.3 0-.5.4-.5.5v-1.2c-.1-.1-.3-.1-.5 0v.3H45v-1.3c-.2 0-.2.6-.6.6c-.2 0-.2-.3-.1-.5s.2-.5.1-.9c-.1.3-.4.5-.4.2c.1-.4.4-.5.2-1.1c-.1.5-.4.5-.3.2c.1-.3.3-.5 0-1c-.1.5-.3.5-.3.2c0-.5 0-1-.6-1.2c0 0 0-.5-.3-.5s-.3.5-.3.5c-.6.2-.6.7-.6 1.2c0 .3-.2.4-.3-.2c-.2.5 0 .6 0 1c.1.3-.2.3-.3-.2c-.2.6.1.7.2 1.1c.1.2-.3.1-.4-.3c-.2.5 0 .8.1.9c.1.2.1.5-.1.5c-.4 0-.4-.6-.6-.6v2.4h-4.7v-2.1c-.3.1-.4.4-.4.4v.4H35s-.2 0-.2-.4s.1-.6.4-.6v-.8s-.7.1-.7.9v-.7c-.2 0-.2.3-.2 1h-.2V27c0-.4.4-.4.4-.7c0 0 .1-.5-.1-.7c-.2.6-.4.5-.4.2c0-.2.2-.4.5-1c.1-.2 0-.7-.1-.9c-.1.5-.1.7-.3.7c-.1 0-.2-.1-.2-.3c0-.3.2-.4.3-.7c.1-.3 0-.6-.1-.8c-.1.5-.1.6-.2.6c-.4-.1 0-.7.1-.9c.1-.3-.1-.5-.1-.5c-.1.4-.2.4-.3.4c-.2 0-.1-.3.1-.5c.1-.1.1-.3 0-.5c-.1.3-.4.3-.3.1l.1-.6h-.3v-1.3h-.4c0-.3-.2-.6-.6-.6c-.4 0-.5.4-.6.6H31v1.3h-.3l.1.7c0 .2-.2.2-.3-.1c-.1.2-.2.4 0 .5c.2.2.2.5.1.5s-.2 0-.3-.4c0 0-.2.3-.1.5c.1.1.5.7.1.9c-.2 0-.2-.2-.2-.6c-.2.2-.3.5-.1.8c.1.3.3.4.3.7c0 .2-.1.3-.2.3c-.2 0-.3-.2-.3-.7c-.1.2-.2.7-.1.9c.3.5.5.7.5 1c0 .2-.3.4-.4-.2c-.1.2-.1.7-.1.7c0 .3.4.3.4.7v.8h-.2c0-.7 0-1-.3-1v.7c0-.8-.7-.9-.7-.9v.8c.3 0 .4.2.4.6s-.2.4-.2.4h-.4v-.4s-.1-.3-.4-.4v2.1h-4.6v-2.4c-.2 0-.2.6-.6.6c-.2 0-.2-.3-.1-.5s.2-.5.1-.9c-.1.4-.4.5-.4.3c.1-.4.4-.5.2-1.1c-.1.5-.4.5-.3.2c.1-.3.3-.5 0-1c-.1.5-.3.5-.3.2c0-.5 0-1-.6-1.2c0 0 0-.5-.3-.5s-.4.3-.4.3c-.6.2-.6.7-.6 1.2c0 .3-.2.4-.3-.2c-.2.5 0 .6 0 1c.1.3-.2.3-.3-.2c-.2.6.1.7.2 1.1c.1.2-.3.1-.4-.3c-.2.5 0 .8.1.9c.1.2.1.5-.1.5c-.4 0-.4-.6-.6-.6v1.3h-.5v-.3c-.2-.1-.4-.1-.5 0v1.2s-.2-.5-.5-.5v2.9c.2.1.6.4.7.8v3.1c-.1.3-.4.7-.6.8h29.1c-.4-.1-.7-.4-.8-.8"
        />
        <g fill="#fff">
          <path d="M49.7 42.1v-1.9h-1v-1.6h-.9v-1.2h-.5v-.9H16.7v.9h-.5v1.2h-.9v1.6h-1v1.9h-.9V44h37.2v-1.9z" />
          <path d="M22.8 36.5c-.2-.1-.6-.4-.6-.8v-3.3l.3-.5h.1v-1c-.2.1-.3.2-.5.3c0-.1-.1-.2-.1-.3c.1-.1.5-.6.6-.8v-.8c-.1 0-.2.1-.3.1c.2-.2.3-.4.3-.6V28c-.2 0-.5.2-.6.5c0-.2-.1-.4-.2-.6c.1-.1.4-.4.4-.6v-.5c-.2 0-.3.1-.5.3c0-.1 0-.1-.1-.2l.3-.4V26c-.1 0-.2.1-.3.2c0-.1-.1-.2-.1-.3l.1-.3v-.4c-.1 0-.1 0-.2.1c0-.1-.1-.2-.1-.2h.1l.3-.2v-.3c-.1 0-.1 0-.2.1c-.1-.2-.2-.3-.4-.4c-.2.1-.3.2-.4.4c-.1-.1-.1-.1-.2-.1v.3l.3.2h.2c0 .1-.1.1-.1.2c-.1-.1-.1-.1-.2-.1v.4l.1.3c0 .1-.1.1-.1.2c-.1-.2-.2-.2-.3-.2v.5l.3.4c0 .1 0 .1-.1.2c-.1-.2-.3-.3-.5-.3v.5c0 .2.3.5.4.6c-.1.2-.1.4-.2.6c-.2-.3-.4-.5-.6-.5v.8c0 .1.2.4.3.6c-.1-.1-.2-.1-.3-.1v.8c.1.2.4.6.6.7c0 .1-.1.2-.1.3c-.1.1-.2 0-.4 0v1l.3.5v3.3c0 .3-.4.6-.6.8h.5V44h2.3v-7.5h.5m10.9-8.2v-1c-.4.1-.6.4-.7.6c0-.2-.1-.4-.2-.6c.1-.4.2-.6.4-.8h.1v-.9c-.3.1-.5.3-.6.5c0-.1-.1-.4-.2-.6l.3-.5h.4v-.9c-.3.1-.5.3-.5.5c0-.1-.1-.4-.2-.6l.5-.4V23c-.2.1-.5.1-.5.5c0-.2-.1-.4-.1-.5l.5-.4V22c-.2 0-.4.1-.4.3c0-.1-.1-.2-.1-.3l.3-.2v-.5c-.1 0-.3.1-.3.3c0-.3-.1-.3-.3-.4c-.1.1-.2.1-.3.4c0-.2-.2-.2-.3-.3v.5l.3.2c0 .1-.1.2-.1.3c0-.3-.2-.3-.4-.3v.5l.5.4c-.1.1-.1.3-.1.5c0-.4-.3-.4-.5-.5v.7l.4.4c-.1.2-.2.5-.2.6c-.1-.2-.3-.4-.5-.5v.9h.1l.3.5c-.1.2-.2.4-.2.6c-.1-.2-.3-.4-.6-.5v.9h.1c.2.1.4.4.4.8v.5c-.1-.2-.4-.5-.7-.6v1h.2c.3.4.4 1 .4 1.4l-.3-.3v1h1c-.2.3-.3.6-.3 1c-.3-.1-.3-.2-.6-.3v1l.2.3v3.5c0 .3-.4.6-.6.8h.5V44h2.3v-7.5h.5c-.2-.1-.6-.4-.6-.8v-3.5l.2-.3v-1c-.4.1-.4.2-.5.5c0-.3-.1-.7-.3-1h1v-1c-.1.1-.2.1-.3.2c0-.5.1-1 .4-1.4c.1.1.2.1.2.1m10.7 8.2c-.2-.1-.6-.4-.6-.8v-3.3l.3-.5h.1v-1c-.2.1-.3.2-.5.2c0-.1-.1-.2-.1-.3c.1-.2.5-.5.6-.7v-.8c-.1 0-.2.1-.3.1c.2-.2.3-.5.3-.6V28c-.2 0-.5.2-.6.5c0-.2-.1-.4-.2-.6c.1-.1.4-.4.4-.6v-.5c-.2 0-.3.1-.5.3c0-.1 0-.1-.1-.2l.3-.4V26c-.1 0-.2.1-.3.2c0-.1-.1-.2-.1-.2l.1-.3v-.4c-.1 0-.1 0-.2.1c0-.1-.1-.2-.1-.2h.1l.3-.2v-.3c-.1 0-.1 0-.2.1c-.1-.2-.2-.3-.4-.4c-.2.1-.3.2-.4.4c-.1-.1-.1-.1-.2-.1v.3l.3.2h.1c0 .1-.1.1-.1.2c-.1-.1-.1-.1-.2-.1v.4l.1.3c-.1.1-.1.1-.1.3c-.1-.2-.2-.2-.3-.2v.5l.3.4c0 .1 0 .1-.1.2c-.1-.2-.2-.2-.4-.3v.5c0 .2.3.5.4.6c-.1.2-.1.4-.2.6c-.2-.3-.4-.5-.6-.5v.8c0 .1.2.4.3.6c-.1-.1-.2-.1-.3-.1v.8c.1.2.5.6.6.8c0 .1-.1.2-.1.3c-.1-.1-.3-.2-.5-.3v1h.1l.3.5v3.3c0 .3-.4.6-.6.8h.5V44h2.3v-7.5h.5" />
        </g>
      </svg>
    ),
  },
];
interface NavbarProps {
  setIsShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  authState: { isAuth: boolean; user: IUser | null };
}

const Navbar: React.FC<NavbarProps> = ({ className, authState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>("Home");
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (value?: string) => {
    console.log("Selected option:", value);
  };
  // login
  // logout

  const handleLogout = async ()=> {
    try {
      const apiUrl = "https://api.learnwithkru.com"
      const url = `${apiUrl}/v1/auth/logout`;
      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response.data.errors && response.data.errors.length > 0) {
        const errorMessage = `Server error response: ${response.data.errors.join(
          ", "
        )}`;
        throw new Error(errorMessage);
      }
      window.location.reload();
    } catch (error) {
      logError(error);
      throw error;
    }
  };

  const logError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        "Axios error:",
        axiosError.response?.data || axiosError.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
  };

  const onLogoutClick =  () => {
     handleLogout();

  };

  return (
    <nav
      className={`w-[80%] h-[100px] flex justify-between items-center ${className}`}
    >
      <div className="h-full w-1/2 flex items-center justify-start">
        <Link href={"/"}>
          <Image
            src={"/Logos/KruLogo.png"}
            height={500}
            width={500}
            alt="Kru Logo"
            className="h-full w-[100px] object-cover"
          />
        </Link>
        <div className="hidden   lg:w-[80%] lg:flex  lg:justify-start lg:items-center lg:gap-5">
          <Link className="text-[#455445] text-sm hover:underline" href={"/"}>
            Home
          </Link>

          {authState.isAuth ? (
            <Link
              className="text-[#455445] text-sm hover:underline"
              href={"/become-teacher"}
            >
              Become a teacher
            </Link>
          ) : (
            <Link
              className="text-[#455445] text-sm hover:underline"
              href={"signup"}
            >
              Become a teacher
            </Link>
          )}

          <Link
            className="text-[#455445] text-sm hover:underline"
            href={"/teachers"}
          >
            Find teacher
          </Link>
        </div>
      </div>

      {/* right */}

      {authState.isAuth ? (
        <div className="lg:w-1/3 lg:h-1/3 lg:flex lg:items-center lg:justify-end">
          <div className="flex items-center">
            <ButtonDropDown
              options={options}
              onChange={handleChange}
              className="md:inline xl:inline lg:flex lg:items-start lg:mr-7 "
            ></ButtonDropDown>
            <div className="w-1/3 flex items-center justify-evenly">
              {/* Vertical Line */}
              <div className="h-5 w-[1px] bg-gray-400 lg:inline hidden"></div>
            </div>
            <Notification className="hidden lg:inline lg:ml-7 lg:mt-2"></Notification>
            <ProfileDropDown
              icon={
                authState.user?.picture === null ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                ) : (
                  <Image
                    src={authState.user?.picture as string}
                    alt="user's profile picture"
                    width={500}
                    height={500}
                    className="w-40 rounded-full"
                  ></Image>
                )
              }
              className="ml-10 hidden sm:hidden md:hidden xl:inline lg:inline"
              onChange={handleChange}
            >
              {" "}
            </ProfileDropDown>
          </div>
        </div>
      ) : (
        <div className="lg:w-1/2 lg:h-full lg:flex lg:items-center lg:justify-end hidden ">
          <Link
            href={"login"}
            className="text-[#455445] text-sm flex  hover:underline"
          >
            Log in
          </Link>

          <div className="w-1/3 flex items-center justify-evenly ">
            {/* vertical Line */}
            <div className="h-5 w-[1px] border-l-2 border-[#756739]"></div>
            <Link
              href={"signup"}
              className="text-[#9B90C2] text-sm hover:underline"
            >
              Sign up for free
            </Link>
          </div>
          <Link
            href={"signup"}
            className="text-[#9B90C2] text-sm hover:underline"
          >
            <Button className="px-4 py-2" colorScheme="primary">
              Get Started
            </Button>
          </Link>
        </div>
      )}

      {/* Start mobile screen */}
      <button
        onClick={toggleModal}
        className="lg:hidden xl:hidden cursor-pointer top-4 right-4 md:top-6 md:right-6 z-50 flex items-center justify-center w-10 h-10  rounded-full"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h12M4 10h12m-8 4h8"
          />
        </svg>
      </button>
      {/* Slider Navbar Content */}
      <div
        className={`fixed lg:hidden xl:hidden inset-y-0 right-0 flex flex-col items-start z-50 bg-white w-64 md:w-72 lg:w-80 xl:w-96 shadow-lg transform transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between w-full px-4 py-2">
          <div className="flex">
            <button className="">
              {authState.isAuth ? (
                <Image
                  src={authState.user?.picture as string}
                  alt="user's profile picture"
                  width={500}
                  height={500}
                  className="w-10 rounded-full"
                ></Image>
              ) : (
                <div className="flex w-[30px] h-[30px] bg-gray-200 justify-center items-center rounded-md hover:bg-gray-200 hover:rounded-md">
                  {/* Account icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="#0A0A0A"
                      stroke="#A9A9A9"
                      strokeDasharray="28"
                      strokeDashoffset="28"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.4s"
                          values="28;0"
                        />
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.5s"
                          dur="0.4s"
                          values="28;0"
                        />
                      </path>
                    </g>
                  </svg>
                </div>
              )}
            </button>

            {authState.isAuth ? (
              <></>
            ) : (
              <>
                <Link href={"login"} className="ml-5 p-3 hover:underline">
                  Log in
                </Link>
              </>
            )}
          </div>
          <button
            onClick={toggleModal}
            className="text-gray-600 focus:outline-none "
          >
            {/* Close icon */}
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
          </button>
        </div>
        <div className="w-full h-[1.2px] bg-gray-200"></div>
        <nav className="flex w-full py-2 pr-5 flex-col items-start justify-start">
          <ul className="mx-5 w-full">
            {authState.isAuth ? (
              // is login
              <>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Home")}
                >
                  {selectedItem === "Home" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"/"}>Home</Link>
                </li>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Become a Teacher")}
                >
                  {selectedItem === "Become a Teacher" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"/"}>Become a Teacher</Link>
                </li>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Find Teacher")}
                >
                  {selectedItem === "Find Teacher" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"/"}>Find Teacher</Link>
                </li>
                <Typography
                className="w-full mt-10 self-center"
                >
                  <button
                    className="w-full text-sm text-red-600 hover:bg-red-200 hover:p-1 hover:rounded-md"
                    onClick={onLogoutClick}
                  >
                    Logout
                  </button>
                </Typography>
                {/* <div className="w-[90%] mx-auto h-[1.2px] bg-gray-200"></div> */}
              </>
            ) : (
              // is logout
              <>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Home")}
                >
                  {selectedItem === "Home" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"/"}>Home</Link>
                </li>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Become a Teacher")}
                >
                  {selectedItem === "Become a Teacher" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"signup"}>Become a Teacher</Link>
                </li>
                <li
                  className="cursor-pointer py-3 hover:underline relative"
                  onClick={() => handleItemClick("Find a Teacher")}
                >
                  {selectedItem === "Find a Teacher" && (
                    <span
                      className="absolute left-[-15px] top-[9px] h-[50%] w-1 bg-[#7B2CBF]"
                      style={{ marginTop: "0.5rem" }}
                    />
                  )}
                  <Link href={"teachers"}>Find a Teacher</Link>
                </li>
              </>
            )}

            <li></li>
          </ul>
        </nav>
      </div>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleModal}
        ></div>
      )}

      {/* End mobile screen */}
    </nav>
  );
};

export { Navbar };
