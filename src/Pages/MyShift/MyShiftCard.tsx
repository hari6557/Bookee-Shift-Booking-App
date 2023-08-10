import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../../Components/Button";
import { cancelShift } from "../../Services";
import { shiftData } from "../../Store";
import {
  calculateTotalHours,
  formatTime,
  getFormattedDate,
  isCurrentTime,
} from "../../Utils/utils";

const MyShiftCard = () => {
  const [formattedArray, setFormattedArray] = useState<any>([]);
  const data = useRecoilValue(shiftData);
  const [loadingShiftId, setLoadingShiftId] = useState<string>("");
  const [disabledId, setDisabledId] = useState<string>("");
  const bookedData = data.filter((shift: any) => shift.booked);

  const handleFormattedData = () => {
    bookedData.sort((a: any, b: any) => a.startTime - b.startTime);

    const formattedShifts: { date: string; shifts: any[] }[] = [];

    bookedData.forEach((shift: any) => {
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

  const handleCancelShift = (shift: any) => {
    const id = shift.id;
    setLoadingShiftId(id);
    cancelShift(id)
      .then((res: any) => {
        setLoadingShiftId("");
      })
      .catch((err: any) => {
        setLoadingShiftId("");
        console.error(err);
      });
  };

  const handleDisabledButton = () => {
    formattedArray.map(({ date, shifts }: { date: string; shifts: any }) => {
      shifts.map((shift: any, index: number) => {
        if (isCurrentTime(shift.startTime, shift.endTime)) {
          setDisabledId(shift.id);
        }
      });
    });
    return disabledId;
  };

  useEffect(() => {
    handleDisabledButton();
  }, [disabledId]);

  useEffect(() => {
    handleFormattedData();
  }, []);
  return (
    <div className="flex pb-10 flex-col justify-center">
      {formattedArray.map(({ date, shifts }: { date: string; shifts: any }) => {
        const totalHours = calculateTotalHours(shifts);
        const totalShifts = shifts.length;
        return (
          <div
            key={date}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-full flex items-center sm:justify-start justify-center bg-[#F7F8FB] border px-10 py-2">
              <h1 className="text-[#4F6C92] md:text-[14px] text-[13px] font-bold">
                {date}
              </h1>
              <h1 className="text-[#CBD2E1] ml-5 md:text-[14px] text-[13px] flex items-center">
                {totalShifts} Shifts {totalHours}h
              </h1>
            </div>
            {shifts.map((shift: any, index: number) => {
              const startTime = formatTime(shift.startTime);
              const endTime = formatTime(shift.endTime);
              const isShiftBooked = shift.booked;
              return (
                <div className="flex justify-between items-center w-full bg-white border px-10 py-2">
                  {isShiftBooked && (
                    <div
                      key={index}
                      className="flex justify-between sm:flex-row flex-col items-center w-full"
                    >
                      <div>
                        <span className="text-[#4F6C92] md:text-[14px] text-[13px] sm:my-0 my-3">
                          {startTime} - {endTime}
                        </span>
                        <div className="flex justify-center">
                          <span className="md:text-[14px] text-[13px] text-[#CBD2E1] ">
                            {shift.area}
                          </span>
                        </div>
                      </div>
                      <Button
                        title={"Cancel"}
                        className="border-[#E2006A] text-[#E2006A] text-extrabold sm:my-0 my-3"
                        disabled={disabledId === shift.id}
                        loader={loadingShiftId === shift.id}
                        loaderClassName="border-[#E2006A] border-r-[#EED2DF] border-b-[#EED2DF]"
                        onClick={() => handleCancelShift(shift)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MyShiftCard;
