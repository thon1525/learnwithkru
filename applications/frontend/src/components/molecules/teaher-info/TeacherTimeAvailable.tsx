"use client";
import { IAvailableDay, ITimeSlot } from "@/@types/teacher.type";
import React from "react";

interface TeachersTimeProps {
  date_available: IAvailableDay[];
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TeacherTimeAvailable: React.FC<TeachersTimeProps> = ({
  date_available,
}) => {

  const sortTimeSlots = (timeSlots: ITimeSlot[]) => {
    return timeSlots.slice().sort((a, b) => {
      const [aHour] = a.start.split(":").map(Number);
      const [bHour] = b.start.split(":").map(Number);
      return aHour - bHour;
    });
  };

  const getTimeSlotsForDay = (day: string) => {
    const dayData = date_available.find(
      (d) => d.day.toLowerCase() === day.toLowerCase()
    );
    if (!dayData) {
      return [];
    }
     // Ensure dayData.time is an array before passing it to sortTimeSlots
  const timeSlots = Array.isArray(dayData.time) ? dayData.time : [dayData.time];
  return sortTimeSlots(timeSlots);
  };
  return (
    <div className="mt-10  ">
      <div className=" flex justify-center mt-3 ">
        <table className="table-auto w-[60px] md:[150px] lg:w-[150px]">
          <thead className="text-white pl-4 pr-4 table-header-group ">
            <tr className="flex justify-center  ">
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="table-row underline w-[60px] md:[150px] lg:w-[150px] text-[12px] md:text-sm font-medium text-gray-600 uppercase "
                >
                  <span className="block lg:hidden">{day.substring(0, 3)}</span>
                  <span className="hidden lg:block">{day}</span>
                </th>
              ))}
            </tr>
          </thead>
          <div className="h-[300px] w-auto overflow-auto hide-scrollbar">
            <tbody className="h-[100px] w-[70px] md:[150px] lg:w-[150px] ">
              <tr className="flex justify-center w-full ">
                {daysOfWeek.map((day) => (
                  <td
                    key={day}
                    className="text-center text-sm font-medium text-white  w-[60px] md:[150px] lg:w-[150px]"
                  >
                    <div className="text-center">
                      <div>
                        {getTimeSlotsForDay(day).map((time, index) => (
                          <div key={index} className=" w-[60px] md:[150px] lg:w-[150px] text-[8px] lg:text-sm font-bold text-black underline ">
                            {time.start} - {time.end}
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

            </tbody>
          </div>
        </table>
      </div>
    </div>
  );

  
};

export { TeacherTimeAvailable };
