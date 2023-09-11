"use strict";

exports.getAppointmentsViewModel = void 0;
var _m_view_model_generator = require("../../../../../__internal/scheduler/appointments/m_view_model_generator");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getAppointmentsViewModel = function getAppointmentsViewModel(model, filteredItems) {
  var appointmentViewModel = new _m_view_model_generator.AppointmentViewModelGenerator();
  return appointmentViewModel.generate(filteredItems, _extends({}, model, {
    isRenovatedAppointments: true
  }));
};
exports.getAppointmentsViewModel = getAppointmentsViewModel;