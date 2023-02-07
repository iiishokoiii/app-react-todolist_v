const zeroPadding = (num, length) => {
  return (Array(length).join('0') + num).slice(-length);
};

export const geteDateStr = () => {
  const date = new Date();
  return date.toString();
};

export const convertDateStr = (str) => {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = zeroPadding(date.getMonth() + 1, 2);
  const day = zeroPadding(date.getDate() + 1, 2);
  const hours = zeroPadding(date.getHours(), 2);
  const minutes = zeroPadding(date.getMinutes(), 2);
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
