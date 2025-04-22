import dateUtils from '../../../../core/utils/date';
import { isDefined } from '../../../../core/utils/type';
import { dateUtilsTs } from '../../../core/utils/date';
import { PathTimeZoneConversion } from './const';
const MS_IN_MINUTE = 60000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const toMs = dateUtils.dateToMilliseconds;
export class TimeZoneCalculator {
  constructor(options) {
    this.options = options;
  }
  createDate(sourceDate, info) {
    const date = new Date(sourceDate);
    switch (info.path) {
      case PathTimeZoneConversion.fromSourceToAppointment:
        return this.getConvertedDate(date, info.appointmentTimeZone, false);
      case PathTimeZoneConversion.fromAppointmentToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, true);
      case PathTimeZoneConversion.fromSourceToGrid:
        return this.getConvertedDate(date, undefined, false);
      case PathTimeZoneConversion.fromGridToSource:
        return this.getConvertedDate(date, undefined, true);
      default:
        throw new Error('not specified pathTimeZoneConversion');
    }
  }
  getOffsets(date, appointmentTimezone) {
    const clientOffset = -this.getClientOffset(date) / dateUtils.dateToMilliseconds('hour');
    const commonOffset = this.getCommonOffset(date);
    const appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
    return {
      client: clientOffset,
      common: !isDefined(commonOffset) ? clientOffset : commonOffset,
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
    return dateUtilsTs.addOffsets(newDate, [direction * toMs('hour') * offsets[targetOffsetName], -direction * toMs('hour') * offsets.client]);
  }
}