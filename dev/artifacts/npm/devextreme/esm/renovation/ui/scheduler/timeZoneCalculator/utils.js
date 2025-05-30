/**
* DevExtreme (esm/renovation/ui/scheduler/timeZoneCalculator/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../../core/utils/type';
import dateUtils from '../../../../core/utils/date';
import { PathTimeZoneConversion } from './types';
var MS_IN_MINUTE = 60000;
var MS_IN_HOUR = 60 * MS_IN_MINUTE;
export class TimeZoneCalculator {
  constructor(options) {
    this.options = options;
  }
  createDate(sourceDate, info) {
    var date = new Date(sourceDate);
    switch (info.path) {
      case PathTimeZoneConversion.fromSourceToAppointment:
        return this.getConvertedDate(date, info.appointmentTimeZone, true, false);
      case PathTimeZoneConversion.fromAppointmentToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, true, true);
      case PathTimeZoneConversion.fromSourceToGrid:
        return this.getConvertedDate(date, info.appointmentTimeZone, false, false);
      case PathTimeZoneConversion.fromGridToSource:
        return this.getConvertedDate(date, info.appointmentTimeZone, false, true);
      default:
        throw new Error('not specified pathTimeZoneConversion');
    }
  }
  getOffsets(date, appointmentTimezone) {
    var clientOffset = -this.getClientOffset(date) / dateUtils.dateToMilliseconds('hour');
    var commonOffset = this.getCommonOffset(date);
    var appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
    return {
      client: clientOffset,
      common: !isDefined(commonOffset) ? clientOffset : commonOffset,
      appointment: typeof appointmentOffset !== 'number' ? clientOffset : appointmentOffset
    };
  }
  getConvertedDateByOffsets(date, clientOffset, targetOffset, isBack) {
    var direction = isBack ? -1 : 1;
    var resultDate = new Date(date);
    resultDate.setMinutes(resultDate.getMinutes() - direction * (60 * clientOffset));
    resultDate.setMinutes(resultDate.getMinutes() + direction * (60 * targetOffset));
    return new Date(resultDate);
  }
  getOriginStartDateOffsetInMs(date, timezone, isUTCDate) {
    var offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
    return offsetInHours * MS_IN_HOUR;
  }
  getOffsetInHours(date, timezone, isUTCDate) {
    var {
      appointment,
      client,
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
  getConvertedDate(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
    var newDate = new Date(date.getTime());
    var offsets = this.getOffsets(newDate, appointmentTimezone);
    if (useAppointmentTimeZone && !!appointmentTimezone) {
      return this.getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack);
    }
    return this.getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack);
  }
}
