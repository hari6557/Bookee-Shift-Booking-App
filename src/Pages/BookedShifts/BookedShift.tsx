import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { bookedShiftsSelector, datesSelector, shiftsState } from "../../Store";
import ListShifts from "../../Components/ListShifts";
import { getFormattedDate } from "../../Utils/utils";

const BookedShift = () => {
  const dates = useRecoilValue(datesSelector);
  const data = useRecoilValue(shiftsState);
  const bookedShifts = useRecoilValue(bookedShiftsSelector);
  const bookedList = {} as any;

  dates.map((date) => {
    bookedList[date] = [];
  });

  Object.keys(data).map((id) => {
    const shift = data[id];
    bookedShifts.map((bid) => {
      if (bid === id) {
        bookedList[getFormattedDate(shift.startTime)] = [
            ...bookedList[getFormattedDate(shift.startTime)],
            id
        ]
      }
    });
  });

  useEffect(()=>{
    console.log("BOOKEDLIST", bookedList);
  },[bookedList])

  return (
    <div>
      <ListShifts
        showShiftsAmount={true}
        emptyStateMessage={"No shifts booked for that day"}
        list={bookedList}
        showArea={true}
      />
    </div>
  );
};

export default BookedShift;
