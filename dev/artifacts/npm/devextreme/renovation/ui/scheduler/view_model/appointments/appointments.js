/**
* DevExtreme (renovation/ui/scheduler/view_model/appointments/appointments.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getAppointmentsViewModel = void 0;
var _viewModelGenerator = require("../../../../../ui/scheduler/appointments/viewModelGenerator");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getAppointmentsViewModel = function getAppointmentsViewModel(model, filteredItems) {
  var appointmentViewModel = new _viewModelGenerator.AppointmentViewModelGenerator();
  return appointmentViewModel.generate(filteredItems, _extends({}, model, {
    isRenovatedAppointments: true
  }));
};
exports.getAppointmentsViewModel = getAppointmentsViewModel;
