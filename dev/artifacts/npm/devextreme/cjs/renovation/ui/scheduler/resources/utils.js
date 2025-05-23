/**
* DevExtreme (cjs/renovation/ui/scheduler/resources/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
