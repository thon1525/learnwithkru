"use client";
import { CardTeachers } from "@/components/molecules";
import React from "react";
import { ITeacher } from "@/@types/teacher.type";

interface TeacherListCardsProps {
  isLoading: boolean;
  data: ITeacher[];
}

const TeacherListCards: React.FC<TeacherListCardsProps> = ({
  isLoading,
  data = [],
}) => {
 

  // If data is undefined, default to an empty array
  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-9 w-9 border-t-4 border-[#7B2CBF]"></div>
        </div>
      </div>
    ); // Render loading state
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] flex justify-center lg:justify-between flex-wrap gap-4">
        {data.map((teacher: ITeacher, index: number) => (
          <CardTeachers
            key={index}
            items={teacher}
          />
        ))}
      </div>
    </div>
  );
};

export { TeacherListCards };
