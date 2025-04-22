export const isInteger = value => Number.isInteger(value);
export const greaterThan = function (value, minimalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value > minimalValue : value >= minimalValue;
};
export const lessThan = function (value, maximalValue) {
  let strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return strict ? value < maximalValue : value <= maximalValue;
};
export const inRange = (value, _ref) => {
  let [from, to] = _ref;
  return value >= from && value <= to;
};
export const divisibleBy = (value, divider) => value % divider === 0;