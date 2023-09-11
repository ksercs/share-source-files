"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _m_date_adapter = _interopRequireDefault(require("./m_date_adapter"));
var _m_utils_timezones_data = _interopRequireDefault(require("./timezones/m_utils_timezones_data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* globals Intl */
var toMs = _date.default.dateToMilliseconds;
var MINUTES_IN_HOUR = 60;
var MS_IN_MINUTE = 60000;
var createUTCDateWithLocalOffset = function createUTCDateWithLocalOffset(date) {
  if (!date) {
    return null;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
var createDateFromUTCWithLocalOffset = function createDateFromUTCWithLocalOffset(date) {
  var result = (0, _m_date_adapter.default)(date);
  var timezoneOffsetBeforeInMin = result.getTimezoneOffset();
  result.addTime(result.getTimezoneOffset('minute'));
  result.subtractMinutes(timezoneOffsetBeforeInMin - result.getTimezoneOffset());
  return result.source;
};
var getTimeZones = function getTimeZones() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var dateInUTC = createUTCDate(date);
  return _m_utils_timezones_data.default.getDisplayedTimeZones(dateInUTC.getTime());
};
var createUTCDate = function createUTCDate(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes()));
};
var getTimezoneOffsetChangeInMinutes = function getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) {
  return getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
};
var getTimezoneOffsetChangeInMs = function getTimezoneOffsetChangeInMs(startDate, endDate, updatedStartDate, updatedEndDate) {
  return getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs('minute');
};
var getDaylightOffset = function getDaylightOffset(startDate, endDate) {
  return new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
};
var getDaylightOffsetInMs = function getDaylightOffsetInMs(startDate, endDate) {
  return getDaylightOffset(startDate, endDate) * toMs('minute');
};
var calculateTimezoneByValue = function calculateTimezoneByValue(timezone) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  // NOTE: This check could be removed. We don't support numerical timezones
  if (typeof timezone === 'string') {
    var dateUtc = createUTCDate(date);
    return _m_utils_timezones_data.default.getTimeZoneOffsetById(timezone, dateUtc.getTime());
  }
  return timezone;
};
// eslint-disable-next-line @typescript-eslint/naming-convention
var _getDaylightOffsetByTimezone = function _getDaylightOffsetByTimezone(startDate, endDate, timeZone) {
  return calculateTimezoneByValue(timeZone, startDate) - calculateTimezoneByValue(timeZone, endDate);
};
var getCorrectedDateByDaylightOffsets = function getCorrectedDateByDaylightOffsets(convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) {
  var daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
  var daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
  var diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
  return new Date(date.getTime() - diff * toMs('hour'));
};
var correctRecurrenceExceptionByTimezone = function correctRecurrenceExceptionByTimezone(exception, exceptionByStartDate, timeZone, startDateTimeZone) {
  var isBackConversion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / MINUTES_IN_HOUR;
  if (startDateTimeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, startDateTimeZone);
  } else if (timeZone) {
    timezoneOffset = _getDaylightOffsetByTimezone(exceptionByStartDate, exception, timeZone);
  }
  return new Date(exception.getTime() + (isBackConversion ? -1 : 1) * timezoneOffset * toMs('hour'));
};
var isTimezoneChangeInDate = function isTimezoneChangeInDate(date) {
  var startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  var endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
  return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
};
var getDateWithoutTimezoneChange = function getDateWithoutTimezoneChange(date) {
  var clonedDate = new Date(date);
  if (isTimezoneChangeInDate(clonedDate)) {
    var result = new Date(clonedDate);
    return new Date(result.setDate(result.getDate() + 1));
  }
  return clonedDate;
};
var isSameAppointmentDates = function isSameAppointmentDates(startDate, endDate) {
  // NOTE: subtract 1 millisecond to avoid 00.00 time. Method should return 'true' for "2020:10:10 22:00:00" and "2020:10:11 00:00:00", for example.
  endDate = new Date(endDate.getTime() - 1);
  return _date.default.sameDate(startDate, endDate);
};
var getClientTimezoneOffset = function getClientTimezoneOffset() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return date.getTimezoneOffset() * MS_IN_MINUTE;
};
var getDiffBetweenClientTimezoneOffsets = function getDiffBetweenClientTimezoneOffsets() {
  var firstDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var secondDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
};
var isEqualLocalTimeZone = function isEqualLocalTimeZone(timeZoneName) {
  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  if (Intl) {
    var localTimeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (localTimeZoneName === timeZoneName) {
      return true;
    }
  }
  return isEqualLocalTimeZoneByDeclaration(timeZoneName, date);
};
// TODO: Not used anywhere, if it isn't use in the future, then it must be removed
var hasDSTInLocalTimeZone = function hasDSTInLocalTimeZone() {
  var _getExtremeDates = getExtremeDates(),
    _getExtremeDates2 = _slicedToArray(_getExtremeDates, 2),
    startDate = _getExtremeDates2[0],
    endDate = _getExtremeDates2[1];
  return startDate.getTimezoneOffset() !== endDate.getTimezoneOffset();
};
var isEqualLocalTimeZoneByDeclaration = function isEqualLocalTimeZoneByDeclaration(timeZoneName, date) {
  var year = date.getFullYear();
  var getOffset = function getOffset(date) {
    return -date.getTimezoneOffset() / 60;
  };
  var getDateAndMoveHourBack = function getDateAndMoveHourBack(dateStamp) {
    return new Date(dateStamp - 3600000);
  };
  var configTuple = _m_utils_timezones_data.default.getTimeZoneDeclarationTuple(timeZoneName, year);
  var _configTuple = _slicedToArray(configTuple, 2),
    summerTime = _configTuple[0],
    winterTime = _configTuple[1];
  var noDSTInTargetTimeZone = configTuple.length < 2;
  if (noDSTInTargetTimeZone) {
    var targetTimeZoneOffset = _m_utils_timezones_data.default.getTimeZoneOffsetById(timeZoneName, date);
    var localTimeZoneOffset = getOffset(date);
    if (targetTimeZoneOffset !== localTimeZoneOffset) {
      return false;
    }
    return !hasDSTInLocalTimeZone();
  }
  var localSummerOffset = getOffset(new Date(summerTime.date));
  var localWinterOffset = getOffset(new Date(winterTime.date));
  if (localSummerOffset !== summerTime.offset) {
    return false;
  }
  if (localSummerOffset === getOffset(getDateAndMoveHourBack(summerTime.date))) {
    return false;
  }
  if (localWinterOffset !== winterTime.offset) {
    return false;
  }
  if (localWinterOffset === getOffset(getDateAndMoveHourBack(winterTime.date))) {
    return false;
  }
  return true;
};
// TODO: Getting two dates in january or june is the standard mechanism for determining that an offset has occurred.
var getExtremeDates = function getExtremeDates() {
  var nowDate = new Date(Date.now());
  var startDate = new Date();
  var endDate = new Date();
  startDate.setFullYear(nowDate.getFullYear(), 0, 1);
  endDate.setFullYear(nowDate.getFullYear(), 6, 1);
  return [startDate, endDate];
};
var setOffsetsToDate = function setOffsetsToDate(targetDate, offsetsArray) {
  var newDateMs = offsetsArray.reduce(function (result, offset) {
    return result + offset;
  }, targetDate.getTime());
  return new Date(newDateMs);
};
var utils = {
  getDaylightOffset,
  getDaylightOffsetInMs,
  getTimezoneOffsetChangeInMinutes,
  getTimezoneOffsetChangeInMs,
  calculateTimezoneByValue,
  getCorrectedDateByDaylightOffsets,
  isSameAppointmentDates,
  correctRecurrenceExceptionByTimezone,
  getClientTimezoneOffset,
  getDiffBetweenClientTimezoneOffsets,
  createUTCDateWithLocalOffset,
  createDateFromUTCWithLocalOffset,
  createUTCDate,
  isTimezoneChangeInDate,
  getDateWithoutTimezoneChange,
  hasDSTInLocalTimeZone,
  isEqualLocalTimeZone,
  isEqualLocalTimeZoneByDeclaration,
  getTimeZones,
  setOffsetsToDate
};
var _default = utils;
exports.default = _default;