/**
* DevExtreme (cjs/ui/scheduler/dataStructures.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.AppointmentTooltipInfo = void 0;
var AppointmentTooltipInfo = function AppointmentTooltipInfo(appointment) {
  var targetedAppointment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var settings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  // TODO
  this.appointment = appointment;
  this.targetedAppointment = targetedAppointment;
  this.color = color;
  this.settings = settings;
};
exports.AppointmentTooltipInfo = AppointmentTooltipInfo;
