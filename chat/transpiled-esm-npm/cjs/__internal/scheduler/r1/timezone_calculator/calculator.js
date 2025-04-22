"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeZoneCalculator = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _type = require("../../../../core/utils/type");
var _date2 = require("../../../core/utils/date");
var _const = require("./const");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MS_IN_MINUTE = 60000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const toMs = _date.default.dateToMilliseconds;
class TimeZoneCalculator {
  constructor(options) {
    this.options = options;
  }
  createDate(sourceDate, info) {
    const date = new Date(sourceDate);
    switch (info.path) {
      case _const.PathTimeZoneConversion.fromSourceToAppointment:
        return this.getConvertedDate(date, info.appointmentTimeZone, false);
      case _const.PathTimeZoneConversion.fromAppointmentToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, true);
      case _const.PathTimeZoneConversion.fromSourceToGrid:
        return this.getConvertedDate(date, undefined, false);
      case _const.PathTimeZoneConversion.fromGridToSource:
        return this.getConvertedDate(date, undefined, true);
      default:
        throw new Error('not specified pathTimeZoneConversion');
    }
  }
  getOffsets(date, appointmentTimezone) {
    const clientOffset = -this.getClientOffset(date) / _date.default.dateToMilliseconds('hour');
    const commonOffset = this.getCommonOffset(date);
    const appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
    return {
      client: clientOffset,
      common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
      appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
    };
  }
  getOriginStartDateOffsetInMs(date, timezone, isUTCDate) {
    const offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
    return offsetInHours * MS_IN_HOUR;
  }
  getOffsetInHours(date, timezone, isUTCDate) {
    const {
      client,
      appointment,
      common
    } = this.getOffsets(date, timezone);
    if (!!timezone && isUTCDate) {
      return appointment - client;
    }
    if (!!timezone && !isUTCDate) {
      return appointment - common;
    }
    if (!timezone && isUTCDate) {
      return common - client;
    }
    return 0;
  }
  getClientOffset(date) {
    return this.options.getClientOffset(date);
  }
  getCommonOffset(date) {
    return this.options.tryGetCommonOffset(date);
  }
  getAppointmentOffset(date, appointmentTimezone) {
    return this.options.tryGetAppointmentOffset(date, appointmentTimezone);
  }
  getConvertedDate(date, appointmentTimezone, isBack) {
    const newDate = new Date(date.getTime());
    const offsets = this.getOffsets(newDate, appointmentTimezone);
    const targetOffsetName = appointmentTimezone ? 'appointment' : 'common';
    const direction = isBack ? -1 : 1;
    return _date2.dateUtilsTs.addOffsets(newDate, [direction * toMs('hour') * offsets[targetOffsetName], -direction * toMs('hour') * offsets.client]);
  }
}
exports.TimeZoneCalculator = TimeZoneCalculator;