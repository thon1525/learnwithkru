"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface ItemListProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  totalPages: number;
}

const ItemList: React.FC<ItemListProps> = ({
  setPageNumber,
  pageNumber,
  totalPages,
}) => {
  const pathName = usePathname();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
    const params = new URLSearchParams(window.location.search);
    params.set("pageNumber", page.toString());
    window.location.href = `${pathName}?${params.toString()}`;
  };

  return (
    <div className="w-full flex justify-center items-center pt-3" >
      <Stack  spacing={2}>
      <Pagination onChange={handlePageChange} count={totalPages} variant="outlined" shape="rounded" page={pageNumber} />
    </Stack>
    </div>
  );

};

export { ItemList };