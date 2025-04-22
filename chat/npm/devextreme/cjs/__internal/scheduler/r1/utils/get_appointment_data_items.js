/**
* DevExtreme (cjs/__internal/scheduler/r1/utils/get_appointment_data_items.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceIncorrectEndDate = exports.getAppointmentDataItems = void 0;
var _type = require("../../../../core/utils/type");
var _date = require("../../../core/utils/date");
var _m_date = require("../../../core/utils/m_date");
var _m_appointment_adapter = require("../../m_appointment_adapter");
const RECURRENCE_FREQ = 'freq';
const toMs = _m_date.dateUtils.dateToMilliseconds;
const replaceIncorrectEndDate = (rawAppointment, appointmentDuration, dataAccessors) => {
  const startDate = new Date(dataAccessors.get('startDate', rawAppointment));
  const endDate = new Date(dataAccessors.get('endDate', rawAppointment));
  if (!_date.dateUtilsTs.isValidDate(startDate)) {
    return false;
  }
  const isEndDateIncorrect = !_date.dateUtilsTs.isValidDate(endDate) || startDate.getTime() > endDate.getTime();
  if (isEndDateIncorrect) {
    const isAllDay = Boolean(dataAccessors.get('allDay', rawAppointment));
    const correctedEndDate = isAllDay ? _m_date.dateUtils.setToDayEnd(new Date(startDate)) : new Date(startDate.getTime() + appointmentDuration * toMs('minute'));
    // TODO(4): fixme. serializationFormat auto-detection will not the same as in startDate
    dataAccessors.set('endDate', rawAppointment, correctedEndDate);
  }
  return true;
};
exports.replaceIncorrectEndDate = replaceIncorrectEndDate;
const getAppointmentDataItems = (dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) => {
  const result = [];
  dataItems === null || dataItems === void 0 || dataItems.forEach(rawAppointment => {
    var _recurrenceRule$match;
    const isAppointmentSafe = replaceIncorrectEndDate(rawAppointment, cellDurationInMinutes, dataAccessors);
    if (!isAppointmentSafe) {
      return;
    }
    const adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, dataAccessors, timeZoneCalculator);
    const regex = new RegExp(RECURRENCE_FREQ, 'gi');
    const {
      recurrenceRule
    } = adapter;
    const hasRecurrenceRule = Boolean(recurrenceRule === null || recurrenceRule === void 0 || (_recurrenceRule$match = recurrenceRule.match(regex)) === null || _recurrenceRule$match === void 0 ? void 0 : _recurrenceRule$match.length);
    const visible = (0, _type.isDefined)(rawAppointment.visible) ? Boolean(rawAppointment.visible) : true;
    result.push({
      allDay: Boolean(adapter.allDay),
      startDate: adapter.calculateStartDate('toGrid'),
      startDateTimeZone: rawAppointment.startDateTimeZone,
      endDate: adapter.calculateEndDate('toGrid'),
      endDateTimeZone: rawAppointment.endDateTimeZone,
      recurrenceRule,
      recurrenceException: adapter.recurrenceException,
      hasRecurrenceRule,
      visible,
      rawAppointment
    });
  });
  return result;
};
exports.getAppointmentDataItems = getAppointmentDataItems;
