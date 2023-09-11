"use strict";

exports.getDateForHeaderText = void 0;
var _m_utils_time_zone = _interopRequireDefault(require("../../../../../../../__internal/scheduler/m_utils_time_zone"));
var _base = require("./base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var getDateForHeaderText = function getDateForHeaderText(index, date, options) {
  if (!_m_utils_time_zone.default.isTimezoneChangeInDate(date)) {
    return date;
  }
  var cellCountInDay = options.cellCountInDay,
    interval = options.interval,
    startDayHour = options.startDayHour,
    startViewDate = options.startViewDate;
  var result = (0, _base.getStartViewDateWithoutDST)(startViewDate, startDayHour);
  var validIndex = index % cellCountInDay;
  result.setTime(result.getTime() + validIndex * interval);
  return result;
};
exports.getDateForHeaderText = getDateForHeaderText;