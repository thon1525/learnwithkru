"use client";
import { Typography } from "@/components/atoms";
import { Select } from "@/components/atoms/select/select";
import React, { useEffect, useState } from "react";

interface FilterDropdownPriceProps {
  className?: string;
  nameDropdownPrice?: string;
  itemsDropdownPrice?: { id: number; minPrice: number; maxPrice: number }[];
  onChange: (minPrice: number, maxPrice: number) => void;
  selectedValue: { min_p: number; max_p: number };
}

const FilterDropdownPrice: React.FC<FilterDropdownPriceProps> = ({
  className,
  nameDropdownPrice,
  itemsDropdownPrice = [],
  onChange,
  selectedValue
}) => {
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const selectedItem = itemsDropdownPrice.find(
      item => item.minPrice === selectedValue.min_p && item.maxPrice === selectedValue.max_p
    );
    if (selectedItem) {
      setSelectedId(selectedItem.id);
    } else {
      setSelectedId(undefined);
    }
  }, [selectedValue, itemsDropdownPrice]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedId = parseInt(e.target.value, 10);
    const selectedItem = itemsDropdownPrice.find(item => item.id === newSelectedId);
    if (selectedItem) {
      setSelectedId(newSelectedId);
      onChange(selectedItem.minPrice, selectedItem.maxPrice);
    }
  };

  return (
    <div className={`lg:w-1/5 w-[48%] grid grid-flow-row ${className}`}>
      <Typography align="left" className="text-xs" colorscheme="secondary">
        {nameDropdownPrice}
      </Typography>
      <Select
        borderRadius="md"
        borderSize="timeSelect"
        name="priceRange"
        className="w-full outline-none text-xs focus:border-2"
        onChange={handleSelectChange}
        value={selectedId !== undefined ? selectedId : ''}
      >
        {itemsDropdownPrice.map((item) => (
          <option key={item.id} value={item.id}>
            {
              item.minPrice === 0 && item.maxPrice === 70 ? "All" : `$${item.minPrice} - $${item.maxPrice}`
            }
          </option>
        ))}
      </Select>
    </div>
  );
};

export { FilterDropdownPrice };
