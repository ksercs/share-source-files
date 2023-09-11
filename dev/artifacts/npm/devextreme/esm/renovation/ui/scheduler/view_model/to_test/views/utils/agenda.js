/**
* DevExtreme (esm/renovation/ui/scheduler/view_model/to_test/views/utils/agenda.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setOptionHour } from './base';
export var calculateStartViewDate = (currentDate, startDayHour) => {
  var validCurrentDate = new Date(currentDate);
  return setOptionHour(validCurrentDate, startDayHour);
};
