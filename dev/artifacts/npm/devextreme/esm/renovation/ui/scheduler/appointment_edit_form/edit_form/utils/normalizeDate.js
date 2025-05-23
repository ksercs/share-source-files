/**
* DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/utils/normalizeDate.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateSerialization from '../../../../../../core/utils/date_serialization';
var validateAppointmentFormDate = date => date === null || !!date && !!new Date(date).getDate();
var normalizeNewDate = (newDate, currentDate, currentOppositeDate, needCorrect) => {
  if (!validateAppointmentFormDate(newDate)) {
    return currentDate;
  }
  var normalizedDate = dateSerialization.deserializeDate(newDate);
  var normalizedOppositeDate = dateSerialization.deserializeDate(currentOppositeDate);
  var result = normalizedDate;
  if (normalizedOppositeDate && normalizedDate && needCorrect(normalizedOppositeDate, normalizedDate)) {
    var duration = normalizedOppositeDate.getTime() - normalizedDate.getTime();
    result = new Date(normalizedDate.getTime() + duration);
  }
  return result;
};
export var normalizeNewStartDate = (newStartDate, currentStartDate, currentEndDate) => normalizeNewDate(newStartDate, currentStartDate, currentEndDate, (endDate, startDate) => endDate < startDate);
export var normalizeNewEndDate = (newEndDate, currentStartDate, currentEndDate) => normalizeNewDate(newEndDate, currentEndDate, currentStartDate, (startDate, endDate) => endDate < startDate);
