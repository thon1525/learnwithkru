"use client";
import { useState, ChangeEvent, FormEvent, FormEventHandler, FC } from "react";
import { Button, InputForm, Typography } from "@/components/atoms";
import TimeslotSelector from "@/components/molecules/timeslote/TimeSlot";
import { ITeacher } from "@/@types/teacher.type";


export interface DataTimeProp {
  id: string;
  hour: string;
}

const dataTimes: DataTimeProp[] = [
  { id: "1", hour: "00:00" },
  { id: "2", hour: "1:00" },
  { id: "3", hour: "2:00" },
  { id: "4", hour: "3:00" },
  { id: "5", hour: "4:00" },
  { id: "6", hour: "5:00" },
  { id: "7", hour: "6:00" },
  { id: "8", hour: "7:00" },
  { id: "9", hour: "8:00" },
  { id: "10", hour: "9:00" },
  { id: "11", hour: "10:00" },
  { id: "12", hour: "11:00" },
  { id: "13", hour: "12:00" },
  { id: "14", hour: "13:00" },
  { id: "15", hour: "14:00" },
  { id: "16", hour: "15:00" },
  { id: "17", hour: "16:00" },
  { id: "18", hour: "17:00" },
  { id: "19", hour: "18:00" },
  { id: "20", hour: "19:00" },
  { id: "21", hour: "20:00" },
  { id: "22", hour: "21:00" },
  { id: "23", hour: "22:00" },
  { id: "24", hour: "23:00" },
];

export interface TimeslotSelectorProps {
  weekItem: WeekData;
  index: number;
  day: keyof WeekData;
}

interface TimeSlot {
  start: string;
  end: string;
}

export interface WeekData {
  mondayData: TimeSlot[];
  tuesdayData: TimeSlot[];
  wednesdayData: TimeSlot[];
  thursdayData: TimeSlot[];
  fridayData: TimeSlot[];
  saturdayData: TimeSlot[];
  sundayData: TimeSlot[];
}

interface Time {
  start: string;
  end: string;
}

interface Day {
  day: string;
  time: Time[];
}

interface EducationProps {
  teacher: ITeacher;
  
}

const TimeAvailable: FC<EducationProps> = ({ teacher }) => {
 
  const initialWeeksState: WeekData[] = [
    {
      mondayData: (teacher.date_available.find((day) => day.day === "monday")?.time || [{ start: "9:00", end: "10:00" }]) as Time[],
      tuesdayData: (teacher.date_available.find((day) => day.day === "tuesday")?.time || [{ start: "9:00", end: "10:00" }]) as Time[],
      wednesdayData: (teacher.date_available.find((day) => day.day === "wednesday")?.time || [{ start: "9:00", end: "10:00" }])  as Time[],
      thursdayData: (teacher.date_available.find((day) => day.day === "thursday")?.time || [{ start: "9:00", end: "10:00" }])  as Time[],
      fridayData: (teacher.date_available.find((day) => day.day === "friday")?.time || [{ start: "9:00", end: "10:00" }])  as Time[],
      saturdayData: (teacher.date_available.find((day) => day.day === "saturday")?.time || [{ start: "9:00", end: "10:00" }])  as Time[], 
      sundayData: (teacher.date_available.find((day) => day.day === "sunday")?.time || [{ start: "9:00", end: "10:00" }])  as Time[],
    },
  ]

  const [dataTime, setDataTime] = useState<DataTimeProp[]>(dataTimes);
  const [weeks, setWeek] = useState<WeekData[]>(initialWeeksState);
  const [days, setDays] = useState<Day[]>([]);
//   const [isFormComplete, setIsFormComplete] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const handleAddNew = (day: keyof WeekData) => {
    const newInput = { start: "9:00", end: "10:00" };
    setWeek((prevWeeks) =>
      prevWeeks.map((week) => ({
        ...week,
        [day]: [...week[day], newInput],
      }))
    );
  };

  const handleDelete = (index: number, day: keyof WeekData) => {
    setWeek((prev) =>
      prev.map((week) => ({
        ...week,
        [day]: week[day].filter((_, i) => i !== index),
      }))
    );
  };


  const handleTimeslot = (
    e: ChangeEvent<HTMLSelectElement>,
    idx: number,
    day: keyof WeekData,
    setWeek: React.Dispatch<React.SetStateAction<WeekData[]>>
  ) => {
    const { name, value } = e.target;
    setWeek((prev) => {
      const newArray = [...prev];
      const newDayData = [...newArray[0][day]];

      if (name === "start") {
        const indexSlotHour = dataTime.findIndex(
          (eachSlot) => eachSlot.hour === value
        );

        newDayData[idx] = {
          ...newDayData[idx],
          [name]: value,
          end:
            indexSlotHour !== -1 && indexSlotHour < dataTime.length - 1
              ? dataTime[indexSlotHour + 1].hour
              : "",
        };
      } else {
        newDayData[idx] = { ...newDayData[idx], [name]: value };
      }

      newArray[0][day] = newDayData;
      return newArray;
    });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setDaysOfWeek((prevState) => {
      const updatedState = { ...prevState, [name]: checked };
      return updatedState;
    });

    if (!checked) {
      setWeek((prevState) =>
        prevState.map((week) => ({
          ...week,
          [`${name}Data`]: [{ start: "", end: "" }],
        }))
      );

      const updatedDays = days.map((day) =>
        day.day === name ? { day: "", time: [{ start: "", end: "" }] } : day
      );

      setDays(updatedDays);
    }

    if (checked) {
      setWeek((prevState) =>
        prevState.map((week) => ({
          ...week,
          [`${name}Data`]: [{ start: "9:00", end: "10:00" }],
        }))
      );
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const newDays = [
        { day: "monday", time: weeks[0].mondayData },
        { day: "tuesday", time: weeks[0].tuesdayData },
        { day: "wednesday", time: weeks[0].wednesdayData },
        { day: "thursday", time: weeks[0].thursdayData },
        { day: "friday", time: weeks[0].fridayData },
        { day: "saturday", time: weeks[0].saturdayData },
        { day: "sunday", time: weeks[0].sundayData },
      ];

      setDays(newDays);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-auto max-w-[200px] sm:max-w-[400px] flex flex-col">
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center text-wrap">
            <Typography
              align="left"
              fontSize="lg"
              variant="bold"
              className="py-2 sm:text-start"
            >
           Time available
            </Typography>
            <Typography
              align="left"
              fontSize="sm"
              className=" text-wrap  w-[350px]"
            >
             This is table that you can see all time in a week and you can select what time you available 
            </Typography>
            <Typography
              align="left"
              fontSize="lg"
              variant="bold"
              className="py-2 sm:text-start"
            >
          Set your Available
            </Typography>
            <Typography
              align="left"
              fontSize="sm"
              className="text-wrap w-[350px] "
            >
             Availability shows your potential working hours. Students can book lessons at these times.
            </Typography>
          </div>
          {weeks.map((weekItem, keekIndex) => (
            <div className="flex flex-col mt-5" key={keekIndex}>
              <form action="" onSubmit={handleSubmit}>
                {/* Monday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      name="monday"
                      borderSize="checkbox"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.monday}
                      className="border border-purple-500 outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Monday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.monday && (
                      <>
                        {weekItem.mondayData.map((_dataItem, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="mondayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />



                              <div className="flex flex-col items-center py-2">
                                {weekItem.mondayData.length > 1 && (
                                  <button onClick={() => handleDelete(index, 'mondayData')}>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.mondayData.length - 1 && (
                              <button onClick={() => handleAddNew('mondayData')}>
                                <small className=" underline font-bold text-xs sm:text-md pl-[20px]">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {/* Tuesday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      borderSize="checkbox"
                      name="tuesday"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.tuesday}
                      className="border border-purple-500 outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Tuesday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.tuesday && (
                      <>
                        {weekItem.tuesdayData.map((_item, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="tuesdayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />


                              <div className="flex flex-col items-center py-2">
                                {weekItem.tuesdayData.length > 1 && (
                                  <button
                                    onClick={() => handleDelete(index, 'tuesdayData')}
                                  >
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.tuesdayData.length - 1 && (
                              <button onClick={() => handleAddNew('tuesdayData')}>
                                <small className=" underline font-bold text-xs sm:text-md pl-[20px]">

                                  Add another timeslot

                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* wednesday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      borderSize="checkbox"
                      name="wednesday"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.wednesday}
                      className="border border-purple-500 outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Wednesday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.wednesday && (
                      <>
                        {weekItem.wednesdayData.map((_item, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="wednesdayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />
                              <div className="flex flex-col items-center py-2">
                                {weekItem.wednesdayData.length > 1 && (
                                  <button
                                    onClick={() => handleDelete(index, "wednesdayData")}
                                  >
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.wednesdayData.length - 1 && (
                              <button
                                onClick={() => handleAddNew("wednesdayData")}
                              >
                                <small className=" underline font-bold  sm:text-md pl-[20px]">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {/* Thursday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      borderSize="checkbox"
                      name="thursday"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.thursday}
                      className="border border-purple-500outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Thursday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.thursday && (
                      <>
                        {weekItem.thursdayData.map((_item, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="thursdayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />

                              <div className="flex flex-col items-center py-2">
                                {weekItem.thursdayData.length > 1 && (
                                  <button
                                    onClick={() => handleDelete(index, "thursdayData")}
                                  >
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>
                            {index === weekItem.thursdayData.length - 1 && (
                              <button
                                onClick={() => handleAddNew("thursdayData")}
                              >
                                <small className=" underline font-bold  sm:text-md pl-[20px]">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {/* friday */}
                <div className="flex flex-row">
                  <div className="flex  pt-[10px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      borderSize="checkbox"
                      name="friday"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.friday}
                      className="border border-purple-500outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Friday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.friday && (
                      <>
                        {weekItem.fridayData.map((_item, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="fridayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />
                              <div className="flex flex-col items-center py-2">
                                {weekItem.fridayData.length > 1 && (
                                  <button onClick={() => handleDelete(index, "fridayData")}>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.fridayData.length - 1 && (
                              <button onClick={() => handleAddNew("fridayData")}>
                                <small className=" underline font-bold">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
                {/* saturday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      name="saturday"
                      borderSize="checkbox"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.saturday}
                      className="border border-purple-500 outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Saturday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.saturday && (
                      <>
                        {weekItem.saturdayData.map((_dataItem, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="saturdayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />



                              <div className="flex flex-col items-center py-2">
                                {weekItem.saturdayData.length > 1 && (
                                  <button onClick={() => handleDelete(index, 'saturdayData')}>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.saturdayData.length - 1 && (
                              <button onClick={() => handleAddNew('saturdayData')}>
                                <small className=" underline font-bold text-xs sm:text-md pl-[20px]">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                </div>
                {/* sunday */}
                <div className="flex flex-row">
                  <div className="flex flex-col sm:flex-row pt-[10px] pl-[20px]">
                    <InputForm
                      type="checkbox"
                      borderRadius="md"
                      name="sunday"
                      borderSize="checkbox"
                      onChange={handleCheckboxChange}
                      checked={daysOfWeek.sunday}
                      className="border border-purple-500 outline-none text-xs"
                    />
                  </div>
                  <div className="flex pl-[20px]">
                    <Typography align="left" fontSize="sm" className="py-2">
                      Sunday
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    {daysOfWeek.sunday && (
                      <>
                        {weekItem.sundayData.map((_dataItem, index) => (
                          <div key={index}>
                            <div className="flex flex-col sm:justify-between py-2">
                              <TimeslotSelector
                                weekItem={weekItem} // Ensure you pass the correct week item
                                index={index}
                                day="sundayData"
                                handleTimeslot={(e, idx, day) => handleTimeslot(e, idx, day, setWeek)}
                                dataTime={dataTime}
                                setDataTime={setDataTime}
                              />



                              <div className="flex flex-col items-center py-2">
                                {weekItem.sundayData.length > 1 && (
                                  <button onClick={() => handleDelete(index, 'sundayData')}>
                                    <div className="flex items-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                  </button>
                                )}
                              </div>
                            </div>

                            {index === weekItem.sundayData.length - 1 && (
                              <button onClick={() => handleAddNew('sundayData')}>
                                <small className=" underline font-bold text-xs sm:text-md pl-[20px]">
                                  Add another timeslot
                                </small>
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                </div>

                <div className="flex flex-col mt-5 mb-10">
                  <div className="flex justify-end gap-4">
                    <Button
                      type="submit"
                      radius="md"
                      className="hover:bg-violet-700 text-white text-[16px] flex justify-center w-[150px] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                     Save changes
                    </Button>
                  </div>
                </div>
              </form>
            </div>

          ))}

         
          </div>
      </div>
    </div>
  );
};

export { TimeAvailable, type TimeSlot };






