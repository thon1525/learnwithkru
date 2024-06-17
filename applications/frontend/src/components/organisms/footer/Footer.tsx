import React from "react";
import "../../../app/globals.css";

const Footer: React.FC = () => {
  return (
    <footer className="w-full justify-start pl-4 sm:pl-0 md:w-[80%] md:h-[300px] md:flex md:justify-between items-start py-4 lg:py-6 grid gap-3 ">
      <div className="w-full md:w-1/4 lg:w-1/4 grid grid-flow-row gap-1 px-4">
        <h4 className="text-white text-xl md:text-[16px] lg:text-xl xl:text-xl">
          1-ON-1 TUTORS
        </h4>
        <div className="w-10 h-[2px] bg-[rgb(233,30,99)] "></div>
        <ul className="flex flex-col md:mt-2 gap-y-2">
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              English teacher
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Math teacher
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Khmer teacher
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Computer teacher
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Physics teacher
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Biology teacher
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 lg:w-1/4 grid grid-flow-row gap-1 px-4">
        <h4 className="text-white text-xl m-0">Contact</h4>
        <div className="w-10 h-[2px] bg-[#e91e63] "></div>
        <ul className="flex flex-col md:mt-2 gap-y-2">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=100092631759554&mibextid=LQQJ4d"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://t.me/nareth_dp"
              className="text-gray-400 text-md md:text-sm hover:text-white transition-all hover:ml-4"
            >
              Telegram
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 lg:w-1/4 grid grid-flow-row gap-1 px-4">
        <h5 className="text-white text-xl m-0">Follow us</h5>
        <div className="w-10 h-[2px] bg-[#e91e63]"></div>
        <div className="flex gap-4 mt-3">
          <a
            href="https://www.facebook.com/profile.php?id=100092631759554&mibextid=LQQJ4d"
            className="text-gray-400 text-xs md:text-sm hover:text-white"
          >
            <svg
              className="w-6 md:w-7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m2.274 6.634h-1.443c-.171 0-.361.225-.361.524V8.6h1.805l-.273 1.486H10.47v4.461H8.767v-4.461H7.222V8.6h1.545v-.874c0-1.254.87-2.273 2.064-2.273h1.443z"
              />
            </svg>
          </a>
          <a
            href="https://twitter.com/"
            className="text-gray-400 text-xs md:text-sm hover:text-white"
          >
            <svg
              className="w-6 md:w-7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m3.905 7.864c.004.082.005.164.005.244c0 2.5-1.901 5.381-5.379 5.381a5.335 5.335 0 0 1-2.898-.85c.147.018.298.025.451.025c.886 0 1.701-.301 2.348-.809a1.895 1.895 0 0 1-1.766-1.312a1.9 1.9 0 0 0 .853-.033a1.892 1.892 0 0 1-1.517-1.854v-.023c.255.141.547.227.857.237a1.89 1.89 0 0 1-.585-2.526a5.376 5.376 0 0 0 3.897 1.977a1.891 1.891 0 0 1 3.222-1.725a3.797 3.797 0 0 0 1.2-.459a1.9 1.9 0 0 1-.831 1.047a3.799 3.799 0 0 0 1.086-.299a3.834 3.834 0 0 1-.943.979"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/"
            className="text-gray-400 text-xs md:text-sm hover:text-white"
          >
            <svg
              className="w-6 md:w-7"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7M911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165M512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9"
              />
            </svg>
          </a>
          <a
            href="https://t.me/nareth_dp"
            className="text-gray-400 text-xs md:text-sm hover:text-white"
          >
            <svg
              className="w-6 md:w-7"
              viewBox="0 0 22 22"
              xmlns="http://www.w3.org/2400/svg"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19c-.14.75-.42 1-.68 1.03c-.58.05-1.02-.38-1.58-.75c-.88-.58-1.38-.94-2.23-1.5c-.99-.65-.35-1.01.22-1.59c.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02c-.09.02-1.49.95-4.22 2.79c-.4.27-.76.41-1.08.4c-.36-.01-1.04-.2-1.55-.37c-.63-.2-1.12-.31-1.08-.66c.02-.18.27-.36.74-.55c2.92-1.27 4.86-2.11 5.83-2.51c2.78-1.16 3.35-1.36 3.73-1.36c.08 0 .27.02.39.12c.1.08.13.19.14.27c-.01.06.01.24 0 .38z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
