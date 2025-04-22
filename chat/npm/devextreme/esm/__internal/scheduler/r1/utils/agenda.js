/**
* DevExtreme (esm/__internal/scheduler/r1/utils/agenda.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setOptionHour } from './base';
export const calculateStartViewDate = (currentDate, startDayHour) => {
  const validCurrentDate = new Date(currentDate);
  return setOptionHour(validCurrentDate, startDayHour);
};
