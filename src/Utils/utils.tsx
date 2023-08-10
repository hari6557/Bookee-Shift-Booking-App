export const formatTime = (timestamp: string): string => {
  const time = new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });
  return time;
};

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

export const isCurrentTime = (startTime: number, endTime: number) :boolean => {
    const currentTimestamp = new Date().getTime();
    const shiftStartTime = new Date(startTime).getTime();
    const shiftEndTime = new Date(endTime).getTime();
    return currentTimestamp >= shiftStartTime && currentTimestamp <= shiftEndTime;
}

export const calculateTotalHours = (shifts: any[]): number => {
  let totalHours = 0;
  shifts.forEach((shift) => {
    const startTime = new Date(shift.startTime).getTime();
    const endTime = new Date(shift.endTime).getTime();
    const shiftDuration = (endTime - startTime) / (1000 * 60 * 60); // Convert to hours
    totalHours += shiftDuration;
  });
  return totalHours;
};