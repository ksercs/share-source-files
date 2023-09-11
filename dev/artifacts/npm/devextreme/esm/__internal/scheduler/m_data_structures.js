/**
* DevExtreme (esm/__internal/scheduler/m_data_structures.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-extraneous-class */
export class AppointmentTooltipInfo {
  constructor(appointment) {
    var targetedAppointment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var settings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    this.appointment = appointment;
    this.targetedAppointment = targetedAppointment;
    this.color = color;
    this.settings = settings;
  }
}
