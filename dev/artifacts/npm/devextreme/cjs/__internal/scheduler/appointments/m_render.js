/**
* DevExtreme (cjs/__internal/scheduler/appointments/m_render.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAppointments = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/appointment/layout.j"));
var _m_utils = require("../m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error

// This is temporary - to creating appointments from the old code
var renderAppointments = function renderAppointments(options) {
  var instance = options.instance,
    $dateTable = options.$dateTable,
    viewModel = options.viewModel;
  var container = getAppointmentsContainer($dateTable);
  _m_utils.utils.renovation.renderComponent(instance, container, _layout.default, 'renovatedAppointments', viewModel);
};
exports.renderAppointments = renderAppointments;
var getAppointmentsContainer = function getAppointmentsContainer($dateTable) {
  var container = (0, _renderer.default)('.dx-appointments-container');
  if (container.length === 0) {
    container = (0, _renderer.default)('<div>').addClass('dx-appointments-container').appendTo($dateTable);
  }
  return container;
};
