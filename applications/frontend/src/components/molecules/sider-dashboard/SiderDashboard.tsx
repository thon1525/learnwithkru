import { Button, Typography } from "@/components/atoms";
import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
interface SidebarProp{
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

interface Sidebar {
  children: ReactNode
}
const MenuButton: React.FC<SidebarProp> = ({className, href, icon, label }) => (
  <Button radius="md" className={`w-[200px] h-[45px] pl-5 ${className}`} >
    <Link href={`${href}`} className="flex items-center">
      {icon}
      <Typography className="ml-5" colorscheme="white">
        {label}
      </Typography>
    </Link>
  </Button>
);

const SiderDashboard:React.FC<Sidebar> = ( {children}) => {
  return (
    <>
      <aside className="w-[315px] h-screen rounded-lg shadow-lg">
        <div className="bg-[#F0F7FF] flex justify-between items-center px-10 py-5">
          <Image
            src={"/Logos/KruLogo.png"}
            height={500}
            width={500}
            alt="Kru Logo"
            className="w-[65px] h-[65px] rounded-full object-cover border-4 border-white"
          />
          <Typography>Learn with KRU</Typography>
        </div>

        <div className="flex flex-col items-center mt-10 gap-20">
        {children}
     
        </div>
      </aside>
    </>
  );
};

export { SiderDashboard ,MenuButton};







