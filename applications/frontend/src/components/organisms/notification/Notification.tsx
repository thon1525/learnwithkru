// components/Notification.tsx

import { Typography } from "@/components/atoms";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
interface Notification {
  message: string;
  time: string;
  profileImage: string;
  date: string;
}
interface NotificationProps {
  className?: string;
  initialNotifications?: Notification[];
}

const Notification: React.FC<NotificationProps> = ({
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = new Date().toLocaleDateString("en-US");
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [notifications] = useState<Notification[]>([
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,
      time: currentTime,
      profileImage: "/Profiles/APoy.jpg",
    },
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,

      time: currentTime,
      profileImage: "/Profiles/Ounsart.jpg",
    },
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,
      time: currentTime,

      profileImage: "/Profiles/example1.jpg",
    },
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,

      time: currentTime,
      profileImage: "/Profiles/Teacher2.avif",
    },
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,

      time: currentTime,
      profileImage: "/Profiles/Teacher2.avif",
    },
    {
      message:
        "Thank you for being a valued member of our education platform. We're committed to providing you with enriching learning experiences.",
      date: currentDate,

      time: currentTime,
      profileImage: "/Profiles/Teacher2.avif",
    },
  ]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <button className="" onClick={toggleDropdown}>
        {/* Notification icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      </button>
      {isOpen && (
        // drop down
        <div className=" bg-white  absolute -right-24 sm:-right-24 md:right-0 lg:right-0 xl:right-0 mt-1 w-[350px] sm:w-[500px] md:w-[500px] lg:w-[500px] xl:w-[500px] border rounded-lg shadow-lg z-10">
          <div className="flex justify-between px-5 pt-5">
            <Typography
              fontSize="md"
              variant="bold"
              align="left"
              className="mb-10"
            >
              Notification
            </Typography>
            <button
              onClick={toggleModal}
              className="hover:bg-red-200 hover:rounded-md w-[32px] h-[32px]"
            >
              {/* close icon */}
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

          <div className="border-b-2"></div>
          <div className="w-full p-2">

            <div className="flex">
              <div className="">
                <div
                  className={
                    notifications.length >= 3 ? "overflow-y-auto h-60" : ""
                  }
                >
                  {" "}
                  {/* Adjust height as needed */}
                  {notifications.map((notification, index) => (
                    <div key={index} className="flex mb-2">
                      <Image
                        src={notification.profileImage}
                        height={500}
                        width={500}
                        alt="profile"
                        className="w-[40px] h-[40px] object-cover rounded-full"
                      />
                      <div className="flex flex-col ml-5">
                        <Typography align="left" className="text-[12px]">
                          {notification.message}
                        </Typography>
                        <div className="flex mt-3">
                          <Typography className="ml-5 text-gray-400 text-[11px]">
                            {notification.time}
                          </Typography>
                        </div>
                        <p className="border-b-2 w-full p-2 "></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Notification };
