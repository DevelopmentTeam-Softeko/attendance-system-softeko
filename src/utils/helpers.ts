const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

const formateDate = (dateStr: Date) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("en-CA"); // '

  return formattedDate;
};

const helpers = {
  formatTime,
  formateDate,
};

export default helpers;
