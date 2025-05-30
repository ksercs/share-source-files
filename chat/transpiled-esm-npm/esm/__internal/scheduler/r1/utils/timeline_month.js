import dateUtils from '../../../../core/utils/date';
import { setOptionHour } from './base';
import { getViewStartByOptions } from './month';
export const calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount) => {
  const firstViewDate = dateUtils.getFirstMonthDate(getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate)));
  return setOptionHour(firstViewDate, startDayHour);
};