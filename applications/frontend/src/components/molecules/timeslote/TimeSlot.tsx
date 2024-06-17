import React from 'react';
import { Typography } from '@/components/atoms';
import { Select } from '@/components/atoms/select/select';
import { DataTimeProp, WeekData } from '@/components/organisms/become-teacher-form/TimeAvailableForm';

interface TimeslotSelectorProps {
  weekItem: WeekData;
  index: number;
  day: keyof WeekData;
  handleTimeslot: (e: React.ChangeEvent<HTMLSelectElement>, idx: number, day: keyof WeekData) => void;
  dataTime: DataTimeProp[];
  setDataTime: React.Dispatch<React.SetStateAction<DataTimeProp[]>>;
}

const TimeslotSelector: React.FC<TimeslotSelectorProps> = ({
  weekItem,
  index,
  day,
  handleTimeslot,
  dataTime,
}) => (
  <div className="flex flex-col sm:flex-row">
    <div className="flex flex-col">
      <div className="flex flex-col pr-[180px] sm:pr-[220px]">
        <Typography align='left' fontSize="sm" className="sm:text-start">
          From
        </Typography>
      </div>
      <Select
        borderRadius="md"
        borderSize="timeSelect"
        name="start"
        defaultValue={dataTime.find((item) => item.hour === '9:00')?.hour}
        onChange={(e) => handleTimeslot(e, index, day)}
        className="border border-purple-500 outline-none text-xs"
      >
        {dataTime.map((datahour) => (
          <option key={datahour.id} value={datahour.hour}>
            {datahour.hour}
          </option>
        ))}
      </Select>
    </div>
    <div className="flex flex-col">
      <div className="flex flex-col mt-5 sm:mt-0 md:mt-0 lg:md:mt-0 xl:md:mt-0">
        <Typography align='left' fontSize="sm" className="sm:text-start">
          To
        </Typography>
      </div>
      <Select
        borderRadius="md"
        borderSize="timeSelect"
        defaultValue={dataTime.find((item) => item.hour === '10:00')?.hour}
        onChange={(e) => handleTimeslot(e, index, day)}
        name="end"
        className="border border-purple-500 outline-none text-xs"
      >
        {weekItem[day][index].start
          ? dataTime.map((data, idx) => {
              const fromIndex = dataTime.findIndex(
                (eachSlot) => eachSlot.hour === weekItem[day][index].start
              );
              if (idx > fromIndex) {
                return (
                  <option key={data.id} value={data.hour}>
                    {data.hour}
                  </option>
                );
              }
              if (fromIndex === 23) {
                return (
                  <option key={1} value={data.hour}>
                    {data.hour}
                  </option>
                );
              }
              return null;
            })
          : dataTime.map((data) => (
              <option key={data.id} value={data.hour}>
                {data.hour}
              </option>
            ))}
      </Select>
    </div>
  </div>
);

export default TimeslotSelector;
