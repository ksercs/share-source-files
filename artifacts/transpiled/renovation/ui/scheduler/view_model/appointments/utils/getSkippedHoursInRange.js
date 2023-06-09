"use strict";

exports.default = void 0;
var _date = _interopRequireDefault(require("../../../../../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getSkippedHoursInRange = function getSkippedHoursInRange(startDate, endDate, viewDataProvider) {
  var msInHour = _date.default.dateToMilliseconds('hour');
  var startTime = _date.default.trimTime(startDate).getTime();
  var endTime = _date.default.setToDayEnd(new Date(endDate.getTime() - 1)).getTime();
  var allDayIntervalDuration = 24 * msInHour;
  var excludedHours = 0;
  for (var time = startTime; time < endTime; time += allDayIntervalDuration) {
    var checkDate = new Date(time);
    if (viewDataProvider.isSkippedDate(checkDate)) {
      excludedHours += 24;
    }
  }
  return excludedHours;
};
var _default = getSkippedHoursInRange;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;