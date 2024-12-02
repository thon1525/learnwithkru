"use client";
import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { InputForm } from "@/components/atoms";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
const SearchTopTeachers = ({ className , setSearch}: { className?: string , setSearch: React.Dispatch<SetStateAction<string>>}) => {
  const router = useSearchParams();
  const [value, setValue] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const search_query = router.get("search_query");
    if (search_query) {
      setValue(search_query);
    }
  }, [router]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(value)
    }
  };

  const handleSearchOnclick = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (value) {
      setSearch(value)
    }
  };
  return (
    <div className={`w-[80%] flex  items-center mx-auto mt-4 ${className} `}>
      <div className="w-[95%] py-[5px] border shadow-sm rounded-s-full">
          <div className="px-4 md:gap-x-4">
            <InputForm
              type="text"
              borderColor="none"
              className="w-full outline-none border-none text-xs md:text-sm"
              placeholder="Search"
              value={value}
              onChange={handleInput}
              onKeyEnter={handleKeyDown}
            />
       </div>
      </div>
      <button className="px-4 py-[12px] md:py-[10px] border bg-[#dfdede] rounded-e-full hover:bg-[#a6a4a4]" onClick={handleSearchOnclick}>
          <Image src={'/Logos/search.svg'} alt="search" width={30} height={30}></Image>
          </button>
    </div>
  );
};

export { SearchTopTeachers };
