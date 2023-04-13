/**
* DevExtreme (cjs/ui/scheduler/appointments/render.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.renderAppointments = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _utils = require("../utils");
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/appointment/layout.j"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// This is temporary - to creating appointments from the old code
var renderAppointments = function renderAppointments(options) {
  var instance = options.instance,
    $dateTable = options.$dateTable,
    viewModel = options.viewModel;
  var container = getAppointmentsContainer($dateTable);
  _utils.utils.renovation.renderComponent(instance, container, _layout.default, 'renovatedAppointments', viewModel);
};
exports.renderAppointments = renderAppointments;
var getAppointmentsContainer = function getAppointmentsContainer($dateTable) {
  var container = (0, _renderer.default)('.dx-appointments-container');
  if (container.length === 0) {
    container = (0, _renderer.default)('<div>').addClass('dx-appointments-container').appendTo($dateTable);
  }
  return container;
};
