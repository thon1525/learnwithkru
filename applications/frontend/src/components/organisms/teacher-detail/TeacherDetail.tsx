import React from "react";
import { Profile } from "@/components/molecules";

interface TopTeachersListProps {
  first_name: string;
  picture: string;
  last_name: string;
  subject: string;
  classname: string;
  price: number;
  phonenumber: string

  // Ensure 'data' prop exists and is of type ITeacher
}

const TeacherDetail: React.FC<TopTeachersListProps> = ({ first_name, picture, last_name, subject, price, phonenumber, classname }) => {
  return (
    <div className={` flex justify-start pt-10 ${classname} `}>
      <Profile picture={picture} first_name={first_name} last_name={last_name} subject={subject} price={price} phonenumber={phonenumber} /> {/* Assuming 'data' should be individual teacher data */}
    </div>
  );
};

export { TeacherDetail };