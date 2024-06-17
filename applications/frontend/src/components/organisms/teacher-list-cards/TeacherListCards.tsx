"use client";
import { CardTeachers } from "@/components/molecules";
import React, { useState } from "react";
import { ITeacher } from "@/@types/teacher.type";

interface TeacherListCardsProps {
  isLoading: boolean;
  data: ITeacher[];
}

const TeacherListCards: React.FC<TeacherListCardsProps> = ({
  isLoading,
  data = [],
}) => {
  const [teachers, setTeachers] = useState<ITeacher[]>(data);
 
  // Function to toggle favorite status
  const toggleFavorite = (teacherId: string) => {
    setTeachers(prevTeachers =>
      prevTeachers.map(teacher =>
        teacher._id === teacherId ? { ...teacher, isFavorite: !teacher.isFavorite } : teacher
      )
    );
  };

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
        {teachers.map((teacher: ITeacher, index: number) => (
          <CardTeachers
            key={index}
            items={teacher}
            isFavorite={teacher.isFavorite || false} // Set isFavorite based on teacher's status
            onFavoriteClick={() => toggleFavorite(teacher._id)}
          />
        ))}
      </div>
    </div>
  );
};

export { TeacherListCards };
