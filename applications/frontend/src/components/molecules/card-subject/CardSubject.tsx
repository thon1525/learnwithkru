"use client";

import React, { FC, ReactNode } from "react";

interface CardSubjectProps {
  children: ReactNode;
  className?: string;
  colorScheme?: "primary" | "secondary";
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const CardSubject: FC<CardSubjectProps> = ({
  children,
  className = "w-full",
  colorScheme = "primary",
  leftIcon,
  rightIcon,
}) => {
  const getColorSchemeClass = (scheme: string) => {
    switch (scheme) {
      case "primary":
        return "bg-[#F4F4F8]";
      default:
        return "bg-[#8E44AD] hover:bg-purple-500 text-white";
    }
  };

  const colorSchemeClass = getColorSchemeClass(colorScheme);
  const combinedClassName = `text-center text-[20px] h-[60px] w-[442px] flex items-center justify-around space-x-2 border-grey border-[2px]  rounded-[15px] ${colorSchemeClass} ${className}`;

  return (
    <button className={combinedClassName}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export  {CardSubject};
