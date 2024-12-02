import { IconStarNoBorder } from "@/components";
import React from "react";

interface ProgressStarpros {
  className?: string;
  qtyStar?: number;
  qtyReting?: number;
  classNameWidth?: string;
}

const ProgressStar: React.FC<ProgressStarpros> = ({
  className,
  classNameWidth,
  qtyStar,
  qtyReting,
}) => {
  return (
    <div className={`flex justify-between ${className}`}>
      {/* star */}
      <div className="flex justify-start pl-[10px]">
        <small className="">{qtyStar}</small>
        <div className="pl-[10px]">
          <IconStarNoBorder />
        </div>
      </div>
      {/* end star  */}
      <div className={`w-[230px] h-[15px] bg-[#FFFFCA] relative `}>
        <div
          className={`${classNameWidth}  h-[15px] bg-[#FFFF00] absolute`}
        ></div>
      </div>
      <small className="pr-[8px]">{qtyReting}</small>
    </div>
  );
};

export { ProgressStar };
