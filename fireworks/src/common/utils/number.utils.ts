export const getRandomUUID = (): number => Math.floor(Math.random() * 100000);

export const addDecimalMark = (numberToFormat: number | string): string => {
  numberToFormat = numberToFormat ?? 0;
  return (typeof numberToFormat === 'number' ? String(numberToFormat) : numberToFormat).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ','
  );
};
