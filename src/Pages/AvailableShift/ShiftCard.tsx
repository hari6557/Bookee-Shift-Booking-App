/* eslint-disable */
import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";
import { bookShift } from "../../Services";
import { cities } from "../../Utils/constants";
import { formatTime } from "../../Utils/utils";

const isShiftOverlappingWithPrev = (
  shifts: any[],
  currentIndex: number
): boolean => {
  const currentShift = shifts[currentIndex];
  const prevShift = shifts[currentIndex - 1];
  return prevShift && prevShift.booked && hasClash(currentShift, prevShift);
};

const isShiftOverlappingWithNext = (
  shifts: any[],
  currentIndex: number
): boolean => {
  const currentShift = shifts[currentIndex];
  const nextShift = shifts[currentIndex + 1];
  return nextShift && nextShift.booked && hasClash(currentShift, nextShift);
};

const hasClash = (currentShift: any, newShift: any): boolean => {
  let boolean = false;
  const currentStartTime = new Date(newShift.startTime).getHours();
  const currentEndTime = new Date(newShift.endTime).getHours();
  const nextStartTime = new Date(currentShift.startTime).getHours();
  const nextEndTime = new Date(currentShift.endTime).getHours();
  if (currentStartTime < nextEndTime && currentEndTime > nextStartTime) {
    boolean = true;
  }

  return boolean ? true : false;
};

const ShiftCard: FC<IAvailableShift.IShiftCardProps> = ({
  totalDays,
  handleTabClick,
  cityCounts,
  loading,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("Helsinki"); // Track selected city
  const [loadingShiftId, setLoadingShiftId] = useState<string>("");

  const handleOnClick = (shift: any) => {
    console.log('fbdgbfdb')
    const id = shift.id;
    setLoadingShiftId(id);
    bookShift(id)
      .then((res: any) => {
        setLoadingShiftId("");
      })
      .catch((err: any) => {
        setLoadingShiftId("");
        console.error(err);
      });
  };

  return (
    <div className="flex pb-10 flex-col justify-center rounded-t-lg">
      <div className="flex border  bg-white rounded-t-lg shadow-xl w-[1/3] justify-center">
        {cities.map((city: any) => (
          <div
            key={city}
            className="tab py-5 flex justify-center w-full cursor-pointer"
            onClick={() => {
              handleTabClick(city);
              setSelectedCity(city);
            }}
          >
            <span
              className={clsx(
                city === selectedCity
                  ? "text-[#004FB4] sm:text-[16px] font-bold text-[12px]"
                  : "text-[#CBD2E1] sm:text-[16px] font-bold text-[12px]"
              )}
            >
              {city}({cityCounts && cityCounts[city] ? cityCounts[city] : 0})
            </span>
          </div>
        ))}
      </div>
      {loading ? (
        <div className="flex absolute top-[50%] left-[50%] justify-center items-center">
          <Loader className="border-[#004FB4] border-r-[#CBD2E1] w-10 h-10 border-b-[#CBD2E1]" />
        </div>
      ) : (
        <div>
          {totalDays.map(({ date, shifts }: { date: any; shifts: any }) => {
            return (
              <div
                key={date}
                className="w-full flex flex-col items-center justify-center"
              >
                <div className="w-full flex items-center sm:justify-start justify-center bg-[#F7F8FB] border px-10 py-2">
                  <h1 className="text-[#4F6C92] font-bold">{date}</h1>
                </div>
                {shifts.map((shift: any, index: number) => {
                  const startTime = formatTime(shift.startTime);
                  const endTime = formatTime(shift.endTime);
                  const isShiftBooked = shift.booked;
                  const isShiftOverlapWithPrev = isShiftOverlappingWithPrev(
                    shifts,
                    index
                  );
                  const isShiftOverlapWithNext = isShiftOverlappingWithNext(
                    shifts,
                    index
                  );
                  return (
                    <div
                      key={index}
                      className={
                        "flex sm:flex-row flex-col justify-between items-center w-full bg-white border px-10 py-2"
                      }
                    >
                      <h1 className="sm:my-0 my-3">
                        {startTime} - {endTime}
                      </h1>
                      <div>
                        {shift.booked ? (
                          <span className="text-[#4F6C92] text-[14px] md:ml-72 lg:ml-96 font-semibold">
                            Booked
                          </span>
                        ) : (
                          ""
                        )}
                        {isShiftOverlapWithPrev && !isShiftBooked ? (
                          <span className="text-[#E2006A] text-[14px] md:ml-72 lg:ml-96 font-semibold">
                            Overlapping
                          </span>
                        ) : isShiftOverlapWithNext && !isShiftBooked ? (
                          <span className="text-[#E2006A] text-[14px] md:ml-72 lg:ml-96 font-semibold">
                            Overlapping
                          </span>
                        ) : null}
                      </div>
                      <Button
                        title={shift?.booked ? "Cancel" : "Book"}
                        className={clsx(
                          shift?.booked
                            ? "border-[#E2006A] text-[#E2006A] text-extrabold"
                            : "border-[#55CB82] text-[#16A64D] text-extrabold",
                          "sm:my-0 my-3"
                        )}
                        disabled={
                          isShiftOverlapWithPrev || isShiftOverlapWithNext
                        }
                        loader={loadingShiftId === shift.id}
                        loaderClassName={
                          shift?.booked
                            ? "border-[#E2006A] border-r-[#EED2DF] border-b-[#EED2DF]"
                            : "border-[#16A64D] border-r-[#CAEFD8] border-b-[#CAEFD8]"
                        }
                        onClick={() => handleOnClick(shift)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShiftCard;
