import React, { useState } from "react";
import { Typography } from "../atoms";

const SettingProfile = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <div className="container w-[80%] h-150 mx-auto bg-indigo-400 p-5 flex flex-row">
        {/* Left profile */}
        <div className="flex flex-col gap-y-5 items-center bg-gray-100 w-[40%] rounded-md">
          {/* Content */}
        </div>

        {/* Right profile */}
        <div className="bg-yellow-300 mr-10 w-[80%] ml-10 rounded-md">
          <div className="bg-gray-100 rounded-md">
            <Typography
              className="ml-10 mb-[100px]"
              fontSize="lg"
              variant="bold"
              align="left"
            >
              Edit profile
            </Typography>
            <div className="flex">
              <MenuItem
                itemName="User Info"
                active={selectedItem === "User Info"}
                handleClick={handleItemClick}
              />
              <MenuItem
                itemName="Teacher Info"
                active={selectedItem === "Teacher Info"}
                handleClick={handleItemClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  itemName: string;
  active: boolean;
  handleClick: (itemName: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  itemName,
  active,
  handleClick,
}) => {
  return (
    <div
      onClick={() => handleClick(itemName)}
      className={`cursor-pointer ${
        active ? "border-b-2 border-[#7B2CBF]" : ""
      }`}
    >
      {itemName}
    </div>
  );
};

export default SettingProfile;
