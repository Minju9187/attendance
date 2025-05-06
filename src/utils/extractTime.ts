type Hours = number;
type Minutes = number;
type Time = {
  hours: Hours;
  minutes: Minutes;
};

export function extractTimeFromMinutes(minutes: Minutes): Time {
  if (minutes === undefined) {
    return { hours: 0, minutes: 0 };
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

export function extractHoursFromMinutes(minutes: Minutes): Hours {
  if (minutes === undefined) {
    return 0;
  }
  return Math.floor(minutes / 60);
}
