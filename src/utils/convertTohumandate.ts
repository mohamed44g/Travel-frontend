export const convertDate = (date: string) => {
  const timeStampdate = new Date(date);

  // Format the date to "Month Day, Year, HH:MM"
  const options = {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = timeStampdate.toLocaleString("eg-EG", options);
  return formattedDate;
};
