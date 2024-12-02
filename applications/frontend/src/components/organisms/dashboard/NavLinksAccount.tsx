"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdAccountCircle } from "react-icons/md";
import clsx from 'clsx';


interface NavLinksSubTeachersProps {
  id: string;
}

const NavLinksAccount: React.FC<NavLinksSubTeachersProps> = ({ id }) => {
  const links = [
    { name: "Account", href: `/account-teacher/manage/account/${id}`,  icon: MdAccountCircle },
    // { name: "Password", href: `/account-teacher/manage/password/${id}`,  icon: MdAccountCircle },
  
  ];

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center rounded-md gap-2 bg-white text-black p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "!bg-[#542598] text-white": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinksAccount;
