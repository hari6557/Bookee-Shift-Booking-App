import React, { FC, Fragment } from "react";
import {
  formatSimpleTime,
  minutesToTime,
  timeDiffBetween,
} from "../../Utils/utils";
import { useRecoilValue } from "recoil";
import { loadingIds, shiftsState } from "../../Store";
import Shifts from "../Shifts";
import { useShiftActions } from "../../Services";

const ListShifts: FC<IListShift.IProps> = ({
  emptyStateMessage,
  list,
  showArea,
  showShiftsAmount,
  overLappingList,
}) => {
  const data = useRecoilValue(shiftsState);
  const loader = useRecoilValue(loadingIds)
  const { bookShift, cancelShift } = useShiftActions();

  return (
    <div className="border-solid border-1 border-gray-300">
      {Object.keys(list).map((date, tid) => {
        const numberOfShifts = list[date].length;
        let cumulatedMinutes;
        if (showShiftsAmount && numberOfShifts > 0) {
          cumulatedMinutes = list[date]
            .map((id: any) =>
              timeDiffBetween(data[id].startTime, data[id].endTime)
            )
            .reduce((total: any, hours: any) => total + hours);
        }
        return (
          <div key={tid}>
            <div className="text-[#4F6C92] font-bold flex items-center flex-col sm:flex-row bg-[#F7F8FB] px-10 py-5 border-0 border-b-1 border-solid border-gray-300">
              <h3 key={`${tid}-title`}>{date}</h3>
              {showShiftsAmount && numberOfShifts > 0 && (
                <div className="sm:text-14 text-[#A4B8D3] font-normal ml-10">
                  {numberOfShifts} {numberOfShifts > 1 ? "shifts" : "shift"},{" "}
                  {minutesToTime(cumulatedMinutes)}
                </div>
              )}
            </div>
            <ul className="bg-white-000 text-[#4F6C92]" key={`${tid}-list`}>
              {numberOfShifts === 0 ? (
                <li className="py-20 italic text-center border-0 border-b-1 border-solid border-gray-300">
                  {emptyStateMessage}
                </li>
              ) : (
                list[date].map((id: any) => {
                  const shift = data[id];
                  const canBeBooked =
                    shift.startTime > Date.now() && shift.endTime > Date.now();
                  const canBeCancelled =
                    shift.startTime > Date.now() && shift.booked;
                  return canBeBooked ? (
                    <li
                      className="px-10 py-5 border border-b-1 border-solid"
                      key={id}
                    >
                      <Shifts
                        area={shift.area}
                        booked={shift.booked}
                        timeStamp={formatSimpleTime(
                          shift.startTime,
                          shift.endTime
                        )}
                        showArea={showArea}
                        isOverlapping={overLappingList && overLappingList.includes(id)}
                        canBeCancelled={canBeCancelled}
                        handleBook={() => {
                          bookShift(id);
                        }}
                        handleCancel={() => {
                          cancelShift(id);
                        }}
                        loader={loader[id]}
                      />
                    </li>
                  ) : (
                    <Fragment key={id} />
                  );
                })
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ListShifts;
