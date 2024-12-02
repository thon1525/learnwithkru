"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdAccountCircle } from "react-icons/md";
import clsx from 'clsx';
import { IoSettingsOutline, IoTimeOutline } from "react-icons/io5";
import { MdOutlineDescription, MdOutlinePriceChange } from "react-icons/md";

interface NavLinksSubTeachersProps {
  id: string;
}

const NavLinksSubTeachers: React.FC<NavLinksSubTeachersProps> = ({ id }) => {
  const links = [
    { name: "About", href: `/settings/edit-profile/about/${id}`, icon: MdAccountCircle },
    { name: "Education", href: `/settings/edit-profile/education/${id}`, icon: IoSettingsOutline },
    { name: "Description", href: `/settings/edit-profile/description/${id}`, icon: MdOutlineDescription },
    { name: "Time Available", href: `/settings/edit-profile/time-available/${id}`, icon: IoTimeOutline },
    { name: "Price", href: `/settings/edit-profile/price/${id}`, icon: MdOutlinePriceChange },
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

export default NavLinksSubTeachers;
