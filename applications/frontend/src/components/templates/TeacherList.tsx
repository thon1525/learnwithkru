"use client";

import React, { useState } from "react";
import { FilterTeachers, TeacherListCards } from "@/components/organisms";
import { Typography } from "../atoms";
import { SearchInput } from "../molecules";
import { ItemList } from "../molecules/pagination";
import { ITeacher, PageDetails } from "@/@types/teacher.type";

interface TeacherListProps {
  initialData: {
    errors?: string;
    data: {
      teachers: ITeacher[];
      detail: PageDetails;
    } | null;
  };
}

const TeacherList: React.FC<TeacherListProps> = ({ initialData }) => {
  const { data } = initialData;
  const [pageNumber, setPageNumber] = useState<number>(
    data?.detail.currentPage || 1
  );

  if (!data) {
    return (
      <div className="w-full text-center">
        <Typography align="center" variant="bold" fontSize="lg">
          Error loading data.
        </Typography>
      </div>
    );
  }

  const { teachers, detail } = data;
  const { totalPages } = detail;

  return (
    <div className="w-full grid grid-flow-row gap-y-4">
      <div className="w-[80%] mx-auto">
        <Typography align="left" variant="bold" fontSize="md">
          See your future teacher
        </Typography>
      </div>
      <SearchInput />
      <FilterTeachers />
      <TeacherListCards data={teachers} isLoading={!teachers.length} />
      <ItemList
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        totalPages={totalPages}
      />
    </div>
  );
};

export { TeacherList };
