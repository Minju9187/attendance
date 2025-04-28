const getCurrentDate = () => {
  const dateToday = new Date();
  const yearToday = dateToday.getFullYear();
  const monthToday = String(dateToday.getMonth() + 1).padStart(2, "0");
  const dayToday = String(dateToday.getDate()).padStart(2, "0");
  return yearToday + "-" + monthToday + "-" + dayToday;
};

const getTomorrowDate = () => {
  const dateTomo = new Date();
  dateTomo.setDate(dateTomo.getDate() + 1);
  const yearTomo = dateTomo.getFullYear();
  const monthTomo = String(dateTomo.getMonth() + 1).padStart(2, "0");
  const dayTomo = String(dateTomo.getDate()).padStart(2, "0");
  return yearTomo + "-" + monthTomo + "-" + dayTomo;
};

export const today = getCurrentDate();
export const tomorrow = getTomorrowDate();
