export const stringToDateString = (date: string): string | undefined => {
  const [month, day, year] = date.split('/');

  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));

  if (isNaN(parsedDate.getTime())) {
    //console.warn('Invalid date');
    return undefined;
  }

  return parsedDate.toDateString();
};

export const dateToFormattedString = (date: string): string => {
  const dateObject = new Date(date);
  if (isNaN(dateObject.getTime())) {
    console.warn('Invalid date');
    return 'Invalid date';
  }

  const formatted = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;

  return formatted;
};
