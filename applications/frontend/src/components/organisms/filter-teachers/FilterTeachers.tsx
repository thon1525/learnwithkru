"use client";
import { Filters } from "@/@types/filter";
import { FilterDropdown, FilterDropdownPrice } from "@/components/molecules";
import React, { useEffect, useState } from "react";

const subjectDropdown = [
  { itemName: "All", id: 1 },
  { itemName: "English", id: 1 },
  { itemName: "Mathematics", id: 2 },
  { itemName: "Physics", id: 3 },
  { itemName: "Chemistry", id: 4 },
];

const TimeDropDown = [
  { itemName: "All", id: 1 },
  { itemName: "Monday", id: 1 },
  { itemName: "Tuesday", id: 2 },
  { itemName: "Wednesday", id: 3 },
  { itemName: "Thursday", id: 4 },
  { itemName: "Friday", id: 5 },
  { itemName: "Saturday", id: 6 },
  { itemName: "Sunday", id: 7 },
];

const ProvinceDropDown = [
  { id: 1, itemName: "All" },
  { id: 1, itemName: "Phnom Penh" },
  { id: 2, itemName: "Kandal" },
  { id: 3, itemName: "Takeo" },
  { id: 4, itemName: "Svay Rieng" },
  { id: 5, itemName: "Prey Veng" },
  { id: 6, itemName: "Kampong Cham" },
  { id: 7, itemName: "Tbong Khmum" },
  { id: 8, itemName: "Kampong Chhnang" },
  { id: 9, itemName: "Kampong Speu" },
  { id: 10, itemName: "Kampong Thom" },
  { id: 11, itemName: "Siem Reap" },
  { id: 12, itemName: "Banteay Meanchey" },
  { id: 13, itemName: "Battambang" },
  { id: 14, itemName: "Pailin" },
  { id: 15, itemName: "Oddar Meanchey" },
  { id: 16, itemName: "Preah Vihear" },
  { id: 17, itemName: "Mondulkiri" },
  { id: 18, itemName: "Ratanakiri" },
  { id: 19, itemName: "Kratie" },
  { id: 20, itemName: "Stung Treng" },
  { id: 21, itemName: "Koh Kong" },
  { id: 22, itemName: "Kep" },
  { id: 23, itemName: "Kampot" },
  { id: 24, itemName: "Sihanoukville" },
  { id: 25, itemName: "Preah Sihanouk" },
];

const pricingDropDown = [
  { id: 1, minPrice: 5, maxPrice: 70 },
  { id: 2, minPrice: 10, maxPrice: 20 },
  { id: 3, minPrice: 20, maxPrice: 30 },
  { id: 4, minPrice: 30, maxPrice: 40 },
  { id: 5, minPrice: 40, maxPrice: 70 },
];

const FilterTeachers = () => {
  const [filters, setFilters] = useState<Filters>({
    subject: "",
    province: "",
    time_available: "",
    min_p: 0,
    max_p: 0,
  });


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const subject = query.get('subject') || "";
    const province = query.get('province') || "";
    const time_available = query.get('time_available') || "";
    const min_p = query.get('min_p') ? parseInt(query.get('min_p')!) : 0;
    const max_p = query.get('max_p') ? parseInt(query.get('max_p')!) : 0;

    setFilters({
      subject,
      province,
      time_available,
      min_p,
      max_p,
    });
  }, []);

  const handleFilterChange = (name: keyof Filters, value: string | number) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      updateQueryParams(updatedFilters);
      return updatedFilters;
    });
  };

  const handlePriceChange = (minPrice: number, maxPrice: number) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        min_p: minPrice,
        max_p: maxPrice,
      };
      updateQueryParams(updatedFilters);
      return updatedFilters;
    });
  };

  const updateQueryParams = (filters: Filters) => {
    const queryParameters: Record<string, string> = {};

    if (filters.subject) {
      queryParameters.subject = filters.subject;
    }
    if (filters.province) {
      queryParameters.province = filters.province;
    }
    if (filters.time_available) {
      queryParameters.time_available = filters.time_available;
    }
    if (filters.min_p !== undefined && filters.min_p !== null) {
      queryParameters.min_p = filters.min_p.toString();
    }
    if (filters.max_p !== undefined && filters.max_p !== null) {
      queryParameters.max_p = filters.max_p.toString();
    }

    const query = new URLSearchParams(queryParameters).toString();

    window.history.replaceState(null, "", `?${query}`);
    window.location.reload();
  };

  const {min_p , max_p} = filters;

  return (
    <div className=" w-full flex justify-center items-center rounded-sm  py-3 ">
      <div className="w-[80%] flex justify-between items-center flex-wrap px-1">
        <FilterDropdown
          nameDropdown="Subject"
          itemsDropdown={subjectDropdown}
          selectedValue={filters.subject}
          onChange={(value) => handleFilterChange("subject", value)}
        />
        <FilterDropdown
          nameDropdown="Time available"
          itemsDropdown={TimeDropDown}
          selectedValue={filters.time_available}
          onChange={(value) => handleFilterChange("time_available", value)}
        />
        <FilterDropdown
          nameDropdown="Province"
          itemsDropdown={ProvinceDropDown}
          selectedValue={filters.province}
          onChange={(value) => handleFilterChange("province", value)}
        />
        <FilterDropdownPrice
          nameDropdownPrice="Pricing"
          selectedValue={{min_p, max_p}}
          itemsDropdownPrice={pricingDropDown}
          onChange={handlePriceChange}
        />
      </div>
    </div>
  );
};

export { FilterTeachers };
