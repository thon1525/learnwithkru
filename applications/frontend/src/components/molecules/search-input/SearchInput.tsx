  "use client";
  import React, { ChangeEvent, useEffect, useState } from "react";
  import { InputForm } from "@/components/atoms";
  import Image from "next/image";
  const SearchInput = ({ className }: { className?: string }) => {

    const [value, setValue] = useState("");
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      const search_query = query.get("search_query") || '';

      if (search_query) {
        setValue(search_query);
      }
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        const query = new URLSearchParams({ search_query: value }).toString();

        window.history.replaceState(null, "", `?${query}`);
        window.location.reload();

      }
    };

    const handleSearchOnclick = (
      e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      if (value) {
        const query = new URLSearchParams({ search_query: value }).toString();

        window.history.replaceState(null, "", `?${query}`);
        window.location.reload();
      }
    };
    return (
      <div className={`w-[80%] flex  items-center mx-auto   ${className} `}>
        <div className="w-[85%]  sm:w-[95%] border py-1 shadow-sm rounded-md  rounded-s-full  ">
          
            <div className="px-4 md:gap-x-4">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-6 md:h-6 w-5 text-[#455445]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg> */}
              <InputForm
                type="text"
                borderColor="none"
                className="outline-none border-none text-xs md:text-sm"
                placeholder="Search"
                value={value}
                onChange={handleInput}
                onKeyEnter={handleKeyDown}
              />
            </div>

        </div>
        <button className="px-4 h-full bg-[#dfdede] rounded-e-full hover:bg-[#a6a4a4]" onClick={handleSearchOnclick}>
            <Image src={'/Logos/search.svg'} alt="search" width={30} height={30}></Image>
            </button>
      </div>
    );
  };

  export { SearchInput };
