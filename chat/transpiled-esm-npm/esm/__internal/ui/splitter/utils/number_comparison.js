import { toFixed } from '../../../../common/core/localization/utils';
export const PRECISION = 10;
export function compareNumbersWithPrecision(actual, expected) {
  let precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRECISION;
  const delta = parseFloat(toFixed(actual, precision)) - parseFloat(toFixed(expected, precision));
  if (delta === 0) {
    return 0;
  }
  return delta > 0 ? 1 : -1;
}