import dayjs from "dayjs"

export const getFormattedDate = (timestamp: number): string => {
  //Function to get FormattedDate 'Today', 'Tommorrow'.....
  const currentDate = new Date();
  const date = new Date(timestamp);

  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();
  const isTomorrow =
    date.getDate() === currentDate.getDate() + 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  if (isToday) {
    return "Today";
  } else if (isTomorrow) {
    return "Tomorrow";
  } else {
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    return `${month} ${day}`;
  }
};

export function isOverlapping(timeInterval1: any, timeInterval2: any) {
  return timeInterval1.startTime < timeInterval2.endTime && timeInterval1.endTime > timeInterval2.startTime
}

export function timeDiffBetween(earlierTimestamp: any, laterTimestamp: any) {
  return dayjs(laterTimestamp).diff(dayjs(earlierTimestamp), "minute")
}

export function minutesToTime(minutesNumber : any) {
  const hours = Math.floor(minutesNumber / 60)
  const minutes = minutesNumber % 60
  return `${hours > 0 ? `${hours} h` : ""}${hours > 0 && minutes > 0 ? ` and ` : ""}${
    minutes > 0 ? `${minutes} min` : ""
  }`
}

export function formatSimpleTime(timestamp1: any, timestamp2: any) {
  const t1 = dayjs(timestamp1)
  const t2 = dayjs(timestamp2)

  return `${t1.format("HH:mm")} - ${t2.format("HH:mm")}`
}

export const isCurrentTime = (startTime: number, endTime: number) :boolean => {
    const currentTimestamp = new Date().getTime();
    const shiftStartTime = new Date(startTime).getTime();
    const shiftEndTime = new Date(endTime).getTime();
    return currentTimestamp >= shiftStartTime && currentTimestamp <= shiftEndTime;
}
