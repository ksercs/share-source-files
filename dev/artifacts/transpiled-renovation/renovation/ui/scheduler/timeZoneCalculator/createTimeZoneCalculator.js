"use strict";

exports.createTimeZoneCalculator = void 0;
var _utils = require("./utils");
var _utils2 = _interopRequireDefault(require("../../../../ui/scheduler/utils.timeZone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var createTimeZoneCalculator = function createTimeZoneCalculator(currentTimeZone) {
  return new _utils.TimeZoneCalculator({
    getClientOffset: function getClientOffset(date) {
      return _utils2.default.getClientTimezoneOffset(date);
    },
    tryGetCommonOffset: function tryGetCommonOffset(date) {
      return _utils2.default.calculateTimezoneByValue(currentTimeZone, date);
    },
    tryGetAppointmentOffset: function tryGetAppointmentOffset(date, appointmentTimezone) {
      return _utils2.default.calculateTimezoneByValue(appointmentTimezone, date);
    }
  });
};
exports.createTimeZoneCalculator = createTimeZoneCalculator;