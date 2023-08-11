import React, { FC } from "react";
import Button from "../Button";

const Shifts: FC<IShifts.IProps> = ({
  area,
  booked,
  canBeCancelled,
  handleBook,
  handleCancel,
  isOverlapping,
  showArea,
  timeStamp,
  loader
}) => {

  return (
    <div className="flex items-center">
      <div className="text-18">
        {timeStamp}
        {showArea && <div className="mt-5 text-16 text-[#A4B8D3]">{area}</div>}
      </div>
      <div className="ml-auto flex items-center font-bold">
        {isOverlapping && (
          <div className="mr-20 text-red-500">Overlapping</div>
        )}
        {!booked ? (
          <Button
            title="Book"
            loaderClassName = 'border-[#16A64D] border-r-[#CAEFD8] border-b-[#CAEFD8]'
            className="min-w-120 border-[#55CB82] text-[#16A64D] text-extrabold"
            disabled={isOverlapping}
            onClick={handleBook}
            loader={loader}
            />
        ) : (
          <div className="text-[#4F6C92] mr-20 text-[14px] font-semibold">Booked</div>
        )}
        {canBeCancelled && (
          <Button
            title="Cancel"
            loaderClassName = 'border-[#E2006A] border-r-[#EED2DF] border-b-[#EED2DF]'
            className="min-w-120 border-[#FE93B3] text-[#E2006A] text-extrabold"
            onClick={handleCancel}
            disabled={false}
            loader={loader}
          />
        )}
      </div>
    </div>
  );
};

export default Shifts;
