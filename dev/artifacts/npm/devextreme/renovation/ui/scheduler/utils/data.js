/**
* DevExtreme (renovation/ui/scheduler/utils/data.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.resolveDataItems = exports.getPreparedDataItems = void 0;
var _m_utils = require("../../../../__internal/scheduler/appointments/data_provider/m_utils");
var _m_appointment_adapter = require("../../../../__internal/scheduler/m_appointment_adapter");
var _type = require("../../../../core/utils/type");
var RECURRENCE_FREQ = 'freq';
var getPreparedDataItems = function getPreparedDataItems(dataItems, dataAccessors, cellDurationInMinutes, timeZoneCalculator) {
  var result = [];
  dataItems === null || dataItems === void 0 ? void 0 : dataItems.forEach(function (rawAppointment) {
    var _recurrenceRule$match;
    var startDate = new Date(dataAccessors.getter.startDate(rawAppointment));
    var endDate = new Date(dataAccessors.getter.endDate(rawAppointment));
    (0, _m_utils.replaceWrongEndDate)(rawAppointment, startDate, endDate, cellDurationInMinutes, dataAccessors);
    var adapter = (0, _m_appointment_adapter.createAppointmentAdapter)(rawAppointment, dataAccessors, timeZoneCalculator);
    var comparableStartDate = adapter.startDate && adapter.calculateStartDate('toGrid');
    var comparableEndDate = adapter.endDate && adapter.calculateEndDate('toGrid');
    var regex = new RegExp(RECURRENCE_FREQ, 'gi');
    var recurrenceRule = adapter.recurrenceRule;
    var hasRecurrenceRule = !!(recurrenceRule !== null && recurrenceRule !== void 0 && (_recurrenceRule$match = recurrenceRule.match(regex)) !== null && _recurrenceRule$match !== void 0 && _recurrenceRule$match.length);
    var visible = (0, _type.isDefined)(rawAppointment.visible) ? !!rawAppointment.visible : true;
    if (comparableStartDate && comparableEndDate) {
      result.push({
        allDay: !!adapter.allDay,
        startDate: comparableStartDate,
        startDateTimeZone: rawAppointment.startDateTimeZone,
        endDate: comparableEndDate,
        endDateTimeZone: rawAppointment.endDateTimeZone,
        recurrenceRule: adapter.recurrenceRule,
        recurrenceException: adapter.recurrenceException,
        hasRecurrenceRule,
        visible,
        rawAppointment
      });
    }
  });
  return result;
};
exports.getPreparedDataItems = getPreparedDataItems;
var resolveDataItems = function resolveDataItems(options) {
  return Array.isArray(options) ? options : options.data;
};
exports.resolveDataItems = resolveDataItems;
