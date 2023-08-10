import React, { FC, useEffect, useState } from "react";
import { getShifts } from "../../Services";
import ShiftCard from "./ShiftCard";
import { useRecoilState } from "recoil";
import { formattedData, shiftData } from "../../Store";
import { getFormattedDate } from "../../Utils/utils";

const AvailableShift: FC<IAvailableShift.IProps> = ({}) => {
  const [data, setData] = useRecoilState(shiftData)
  const [formattedArray, setFormattedArray] = useRecoilState(formattedData);
  const [cityCounts, setCityCounts] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchShift = () => {
      setLoading(true);
      getShifts().then((res: any) => {
        setData(res?.data);
        setLoading(false);
      });
    };
    fetchShift();
  }, []);

  useEffect(() => {
    countCities();
  }, [data]);

  const countCities = () => {
    const cityCount: { [key: string]: number } = {};
    data.map((shift: any) => {
      if (cityCount[shift.area]) {
        cityCount[shift.area] += 1;
      } else {
        cityCount[shift.area] = 1;
      }
    });
    setCityCounts(cityCount);
  };

  useEffect(()=>{
    handleTabClick('Helsinki');
  },[data]);

  const handleTabClick = (city: string) => {
    const filteredShifts = data.filter((shift: any) => shift.area === city);

    // Sort the filtered shifts by start time in ascending order
    filteredShifts.sort((a: any, b: any) => a.startTime - b.startTime);

    const formattedShifts: { date: string; shifts: any[] }[] = [];

    filteredShifts.forEach((shift: any) => {
      const formattedDate = getFormattedDate(shift.startTime);
      const index = formattedShifts.findIndex(
        (item) => item.date === formattedDate
      );

      if (index !== -1) {
        formattedShifts[index].shifts.push(shift);
      } else {
        formattedShifts.push({ date: formattedDate, shifts: [shift] });
      }
    });

    setFormattedArray(formattedShifts);
    return formattedShifts;
  };

  return (
    <div className="w-full px-10 bg-[#F1F4F8]">
      <ShiftCard
        cityCounts={cityCounts}
        totalDays={formattedArray}
        handleTabClick={handleTabClick}
        loading={loading}
      />
    </div>
  );
};

export default AvailableShift;
