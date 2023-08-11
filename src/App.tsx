import React, { useEffect } from "react";
import "./App.css";
import { useRecoilValue } from "recoil";
import { useShiftActions } from "./Services";
import {
  bookedShiftsSelector,
  citiesSelector,
  datesSelector,
  shiftsState,
} from "./Store";
import { getFormattedDate, isOverlapping } from "./Utils/utils";
import AvailableShifts from "./Pages/AvailableShifts";
import BookedShifts from "./Pages/BookedShifts";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NavBar from "./Components/NavBar";
import clsx from "clsx";

const App = () => {
  const bookedShifts = useRecoilValue(bookedShiftsSelector);
  const cities = useRecoilValue(citiesSelector);
  const dates = useRecoilValue(datesSelector);
  const { getShifts } = useShiftActions();
  const data = useRecoilValue(shiftsState);

  const [isActive, setIsActive] = React.useState<string>("availableshift");

  useEffect(() => {
    getShifts();
    console.log("BOOKEDSHIFTS", data);
  }, []);

  const bookedList = {} as any;
  const overlappingList = [] as any;
  const availableShiftList = [] as any;

  cities.map((area: string) => {
    availableShiftList[area] = {};
    dates.map((date) => {
      availableShiftList[area][date] = [];
    });
  });

  dates.map((date) => {
    bookedList[date] = [];
  });

  Object.keys(data).map((id) => {
    const shift = data[id];
    if (Date.now() < shift.startTime) {
      availableShiftList[shift.area][getFormattedDate(shift.startTime)] = [
        ...availableShiftList[shift.area][getFormattedDate(shift.startTime)],
        id,
      ];
    }

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
      )
        overlappingList.push(id);
    });
  });

  return (
    
    <div className="w-full bg-[#F1F4F8]">
      <BrowserRouter>
        <div className="px-10">
          <div className="flex w-[1/2] justify-evenly">
            <div
              onClick={()=>setIsActive("myshifts")}
              className={clsx(isActive === "myshifts" ? "text-[#004FB4]" : "text-[#CBD2E1]",
                "font-semibold tab py-5 md:text-[20px] text-[13px] flex justify-center w-full cursor-pointer"
              )}
            >
              <Link to={"/my-shifts"}>My Shifts</Link>
            </div>
            <div
              onClick={()=>setIsActive("availableshift")}
              className={clsx(isActive === "availableshift" ? "text-[#004FB4]" : "text-[#CBD2E1]",
                "font-semibold tab py-5 md:text-[20px] text-[13px] flex justify-center w-full cursor-pointer"
              )}
            >
              <Link to={"/"}>Available Shifts</Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<AvailableShifts />} />
          <Route path="my-shifts" element={<BookedShifts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
