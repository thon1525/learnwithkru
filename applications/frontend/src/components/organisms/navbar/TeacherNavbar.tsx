import React from "react";

const TeacherNavbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` ${className}`}>
      <div className="flex mx-auto justify-center items-start">{children}</div>
    </div>

  );
};

export { TeacherNavbar };
