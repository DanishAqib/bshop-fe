export const formatePrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formateDateAndTime = (date) => {
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const year = date.slice(0, 4);
  const time = date.slice(11, 16);
  const monthName = new Date(year, month - 1, day).toLocaleString("default", {
    month: "long",
  });
  return `${monthName} ${day}, ${year} at ${time}`;
};
