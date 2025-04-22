"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockFieldExpressions = exports.mockAppointmentDataAccessor = void 0;
var _utils = require("../utils");
const mockFieldExpressions = exports.mockFieldExpressions = {
  startDateExpr: 'startDate',
  endDateExpr: 'endDate',
  startDateTimeZoneExpr: 'startDateTimeZone',
  endDateTimeZoneExpr: 'endDateTimeZone',
  allDayExpr: 'allDay',
  textExpr: 'text',
  descriptionExpr: 'description',
  recurrenceRuleExpr: 'recurrenceRule',
  recurrenceExceptionExpr: 'recurrenceException',
  disabledExpr: 'disabled',
  visibleExpr: 'visible'
};
const mockAppointmentDataAccessor = exports.mockAppointmentDataAccessor = new _utils.AppointmentDataAccessor(mockFieldExpressions, true);