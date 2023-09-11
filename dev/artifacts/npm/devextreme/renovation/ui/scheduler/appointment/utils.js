/**
* DevExtreme (renovation/ui/scheduler/appointment/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.mergeStylesWithColor = exports.getReducedIconTooltipText = exports.getAppointmentStyles = exports.getAppointmentKey = void 0;
var _utils = require("../workspaces/utils");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _date = _interopRequireDefault(require("../../../../localization/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EditorLabelLocalizationConst = 'dxScheduler-editorLabelEndDate';
var getAppointmentStyles = function getAppointmentStyles(viewModel) {
  var defaultSize = 50;
  var _viewModel$geometry = viewModel.geometry,
    height = _viewModel$geometry.height,
    left = _viewModel$geometry.left,
    top = _viewModel$geometry.top,
    width = _viewModel$geometry.width;
  return (0, _utils.addToStyles)([{
    attr: 'height',
    value: "".concat(height || defaultSize, "px")
  }, {
    attr: 'width',
    value: "".concat(width || defaultSize, "px")
  }, {
    attr: 'top',
    value: "".concat(top, "px")
  }, {
    attr: 'left',
    value: "".concat(left, "px")
  }]);
};
exports.getAppointmentStyles = getAppointmentStyles;
var getAppointmentKey = function getAppointmentKey(geometry) {
  var height = geometry.height,
    left = geometry.left,
    top = geometry.top,
    width = geometry.width;
  return "".concat(left, "-").concat(top, "-").concat(width, "-").concat(height);
};
exports.getAppointmentKey = getAppointmentKey;
var getReducedIconTooltipText = function getReducedIconTooltipText(endDate) {
  var tooltipLabel = _message.default.format(EditorLabelLocalizationConst);
  if (!endDate) {
    return tooltipLabel;
  }
  var date = new Date(endDate);
  var monthAndDay = _date.default.format(date, 'monthAndDay');
  var year = _date.default.format(date, 'year');
  return "".concat(tooltipLabel, ": ").concat(monthAndDay, ", ").concat(year);
};
exports.getReducedIconTooltipText = getReducedIconTooltipText;
var mergeStylesWithColor = function mergeStylesWithColor(color, styles) {
  return !color ? styles : (0, _utils.addToStyles)([{
    attr: 'backgroundColor',
    value: color
  }], styles);
};
exports.mergeStylesWithColor = mergeStylesWithColor;
