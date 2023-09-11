/**
* DevExtreme (renovation/ui/scheduler/timeZoneCalculator/createTimeZoneCalculator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.createTimeZoneCalculator = void 0;
var _utils = require("./utils");
var _m_utils_time_zone = _interopRequireDefault(require("../../../../__internal/scheduler/m_utils_time_zone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var createTimeZoneCalculator = function createTimeZoneCalculator(currentTimeZone) {
  return new _utils.TimeZoneCalculator({
    getClientOffset: function getClientOffset(date) {
      return _m_utils_time_zone.default.getClientTimezoneOffset(date);
    },
    tryGetCommonOffset: function tryGetCommonOffset(date) {
      return _m_utils_time_zone.default.calculateTimezoneByValue(currentTimeZone, date);
    },
    tryGetAppointmentOffset: function tryGetAppointmentOffset(date, appointmentTimezone) {
      return _m_utils_time_zone.default.calculateTimezoneByValue(appointmentTimezone, date);
    }
  });
};
exports.createTimeZoneCalculator = createTimeZoneCalculator;
