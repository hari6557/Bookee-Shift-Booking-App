import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  bookedShiftsSelector,
  citiesSelector,
  datesSelector,
  shiftsState,
} from "../../Store";
import ListShifts from "../../Components/ListShifts";
import { getFormattedDate, isOverlapping } from "../../Utils/utils";
import clsx from "clsx";

const AvailableShift = () => {
  const cities = useRecoilValue(citiesSelector);
  const dates = useRecoilValue(datesSelector);
  const data = useRecoilValue(shiftsState);
  const bookedShifts = useRecoilValue(bookedShiftsSelector);
  const [currentArea, setCurrentArea] = useState("Helsinki");
  const availableShiftList = {} as any;
  const bookedList = {} as any;
  const overlappingList = [] as any;

  cities.map((area: string) => {
    availableShiftList[area] = {};
    dates.map((date) => {
      availableShiftList[area][date] = [];
    });
  });

  dates.map((date) => {
    bookedList[date] = [];
  });

  const filterData = cities.reduce((acc: any, city: any) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cityArray = Object.keys(filterData).map((city) => ({
    city: city,
    count: filterData[city],
  }));

  Object.keys(data).map((id) => {
    const shift = data[id];
    if (Date.now() < shift.startTime)
      availableShiftList[shift.area][getFormattedDate(shift.startTime)] = [
        ...availableShiftList[shift.area][getFormattedDate(shift.startTime)],
        id,
      ];
    bookedShifts.map((bid) => {

      if (bid === id)
        bookedList[getFormattedDate(shift.startTime)] = [
          ...bookedList[getFormattedDate(shift.startTime)],
          bid,
        ];

      const timestamp1 = {
        startTime: shift.startTime,
        endTime: shift.endTime,
      };
      const timestamp2 = {
        startTime: data[bid].startTime,
        endTime: data[bid].endTime,
      };
      if (
        isOverlapping(timestamp1, timestamp2) &&
        !overlappingList.includes(id) &&
        !bookedShifts.includes(id)
      ) {
        overlappingList.push(id);
      }
    });
  });

  return (
    <div className="flex py-5 flex-col justify-center rounded-t-lg">
      <div className="flex flex-col border bg-white rounded-t-lg shadow-xl w-[1/3] justify-center">
        <div className="flex justify-between">
          {cityArray.map((filter, index) => {
            return (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentArea(filter.city);
                }}
                key={index}
                className="tab py-5 flex justify-center w-full cursor-pointer"
              >
                <span className={clsx(filter.city === currentArea ? "text-[#004FB4]" : "text-[#CBD2E1]", "sm:text-[16px] font-bold text-[12px]")}>
                  {filter.city} ({filter.count})
                </span>
              </div>
            );
          })}
        </div>
        {availableShiftList[currentArea] && (
          <ListShifts
            list={availableShiftList[currentArea]}
            showArea={false}
            showShiftsAmount={false}
            emptyStateMessage={"No Shifts Available"}
            overLappingList={overlappingList}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableShift;
