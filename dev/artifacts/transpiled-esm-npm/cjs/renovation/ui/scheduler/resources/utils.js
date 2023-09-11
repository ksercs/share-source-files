"use strict";

exports.getAppointmentColor = void 0;
var _m_utils = require("../../../../__internal/scheduler/resources/m_utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getAppointmentColor = function getAppointmentColor(resourceConfig, appointmentConfig) {
  return (0, _m_utils.getAppointmentColor)(_extends({}, resourceConfig, {
    dataAccessors: resourceConfig.resourcesDataAccessors
  }), appointmentConfig);
};
exports.getAppointmentColor = getAppointmentColor;