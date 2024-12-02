"use client";

import { IAvailableDay, ITimeSlot } from "@/@types/teacher.type";
import { useState, useEffect } from "react";

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
const currentDate = new Date();

const TimeAvailableTable: React.FC<TeachersTimeProps> = ({
  date_available,
}) => {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  }, []);

  const generateCalendar = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1);

    const firstDayOfWeek = firstDayOfMonth.getDay();
    setFirstDayOfWeek(firstDayOfWeek);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
    const timeSlots = Array.isArray(dayData.time)
      ? dayData.time
      : [dayData.time];
    return sortTimeSlots(timeSlots);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full mx-auto ">
        <div className="bg-white shadow-md  rounded-lg overflow-hidden">
          <div className="flex items-center justify-center px-6 py-3 bg-gray-700">
            <h2 className="text-white">{`${
              monthNames[currentDate.getMonth()]
            } ${currentDate.getFullYear()}`}</h2>
          </div>
          <div className="grid grid-cols-7 gap-2 p-4 ">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}
            {[...Array(firstDayOfWeek)].map((_, index) => (
              <div key={index}></div>
            ))}

            {daysOfWeek.map((day) => (
              <div key={day} className="text-center py-2  cursor-pointer ">
                <div className="text-center">
                  <div>
                    {getTimeSlotsForDay(day).map((time, index) => (
                      <div
                        key={index}
                        className=" text-sm  text-black underline "
                      >
                        {time.start} - {time.end}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isModalOpen && (
            <div className="modal fixed inset-0 flex items-center justify-center z-50">
              <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
              <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 text-left px-6">
                  <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Selected Date</p>
                    <button
                      onClick={handleCloseModal}
                      className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-xl font-semibold">{selectedDate}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeAvailableTable;
