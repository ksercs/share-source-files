/**
* DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/agenda.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateStartViewDate = void 0;
var _base = require("./base");
var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour) {
  var validCurrentDate = new Date(currentDate);
  return (0, _base.setOptionHour)(validCurrentDate, startDayHour);
};
exports.calculateStartViewDate = calculateStartViewDate;
