// components/ProfileDropDown.tsx

import { IUser } from "@/@types/user";
import { handleAxiosError } from "@/utils/axiosErrorhandler";
import axios  from "axios";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
interface ProfileDropDownProps {
  children?: React.ReactNode;
  onChange?: (value?: string) => void;
  className?: string;
  icon?: React.ReactNode;
  authState?: { isAuth: boolean; user: IUser | null };
}


const ProfileDropDown: React.FC<ProfileDropDownProps> = ({
  className,
  icon,
  authState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.learnwithkru.com";
    const url = `${apiUrl}/v1/auth/logout`;
  
    try {
      await axios.get(url, { withCredentials: true });
      window.location.reload();
    } catch (error) {
      handleAxiosError(error, {
        logError: (message: string) => {
          // Custom logging implementation, e.g., sending logs to a server
          console.log('Custom log:', message);
        },
        handleErrorResponse: (response) => {
          // Custom response handling
          console.log('Handling response:', response);
          const errors = response?.data?.errors;
          if (errors) {
            console.error(errors.message);
            throw errors;
          }
        },
      });
    }
  };
  
  const onLogoutClick = () => {
    handleLogout();
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropDown}
        className="flex items-center justify-center w-[40px] h-[40px] bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg focus:outline-none transition-transform duration-300 ease-in-out transform hover:scale-105"
      >
        {icon}
      </button>
      {isOpen && (

        <div className="absolute left-1/2 transform -translate-x-1/2  mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          {authState?.isAuth && (
              <Link
            href="/update-user"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={toggleDropDown}
          >
            Profile
          </Link>
          )}
              <Link
               href={`/settings/about`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleItemClick}
          >
            Settings
          </Link>
           
          <Link
            href="/favorite"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleItemClick}
          >
            Favorite
          </Link>
        
          <div className="border-t border-gray-200"></div>
          <button
            className="w-full block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={onLogoutClick}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};


export { ProfileDropDown };
