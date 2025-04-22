// TODO Vinogradov: Refactor offsets: number[] -> ...offsets: number[]
const addOffsets = (date, offsets) => {
  const newDateMs = offsets.reduce((result, offset) => result + offset, date.getTime());
  return new Date(newDateMs);
};
// eslint-disable-next-line @stylistic/max-len
const isValidDate = date => Boolean(date && !isNaN(new Date(date).valueOf()));
export const dateUtilsTs = {
  addOffsets,
  isValidDate
};