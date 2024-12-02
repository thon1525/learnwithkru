import { Typography } from "@/components/atoms";
import Image from "next/image";
import React from "react";

interface ProfileProps {
  className?: string;
  picture: string;
  first_name: string;
  last_name: string;
  subject: string;
  price: number,
  phonenumber: string

}

const Profile: React.FC<ProfileProps> = ({ className, picture, first_name, last_name, subject, price, phonenumber }) => {
  return (
    <div className={`pt-10 w-[500px] flex justify-center md:justify-start   h-auto ${className}`}>
      <div className=" flex ">
        <Image
          src={picture}
          width={500}
          height={500}
          alt={`${first_name} ${last_name} Profile`}
          className="w-[190px] h-[190px] rounded-md object-cover border-4 border-white"
        />
        <div className="flex flex-col justify-start  items-start pl-6">
          <Typography className="md:text-md lg:text-2xl text-gray-800" align="center" fontSize="md" variant="semibold">
            {`${first_name} ${last_name}`}
          </Typography>
          <div className="flex items-center gap-x-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

            <Typography
              align="center"
              colorscheme="secondary"
              variant="normal"
              className="text-gray-500 pt-2 text-sm "
            >
              {subject}
            </Typography>
          </div>
          <div className=" flex flex-col justify-between   ">
            <div className="flex  items-center gap-x-5">
              <Typography className="">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </Typography>
              <Typography className="text-gray-500 pt-2 text-sm" > ${price}</Typography>
            </div>
            <div className="flex  items-center gap-x-5">
              <Typography >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </Typography>
              <Typography className="text-gray-500 pt-2 text-sm" >{phonenumber}</Typography>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export { Profile };
