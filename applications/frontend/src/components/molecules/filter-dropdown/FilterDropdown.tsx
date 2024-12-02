//FilterDropDown components
"use client";
import { Typography } from "@/components/atoms";
import { Select } from "@/components/atoms/select/select";

interface FilterDropdownProps {
  className?: string;
  nameDropdown: string;
  itemsDropdown?: { id: number; itemName: string }[];
  selectedValue?: string;
  onChange: (value: string) => void
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  className,
  nameDropdown,
  itemsDropdown = [],
  selectedValue,
  onChange
}) => {


  return (
    <div className={`lg:w-1/5 w-[48%] grid grid-flow-row ${className} `}>
      <Typography align="left" className="text-xs" colorscheme="secondary">
        {nameDropdown}
      </Typography>
      <Select
        borderRadius="md"
        borderSize="timeSelect"
        name="subject"
        onChange={(e) => onChange(e.target.value)}
        value={selectedValue}
        className="w-full border bg-gray-100 outline-none text-xs "
      >
        {itemsDropdown.map((item) => (
          <option key={item.id} value={item.itemName}>
            {item.itemName}
          </option>
        ))}
      </Select>
    </div>
  );
};

export { FilterDropdown };
