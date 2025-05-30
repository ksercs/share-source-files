/**
* DevExtreme (cjs/renovation/ui/scheduler/model/views.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getValidGroups = exports.getCurrentViewProps = exports.getCurrentViewConfig = exports.getCurrentView = void 0;
exports.getViewConfigProp = getViewConfigProp;
var _untyped_getCurrentView = require("./untyped_getCurrentView");
var _type = require("../../../../core/utils/type");
var _excluded = ["height", "scrolling", "width"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var getCurrentView = _untyped_getCurrentView.renovationGetCurrentView;
exports.getCurrentView = getCurrentView;
var getCurrentViewProps = function getCurrentViewProps(currentView, views) {
  var currentViewProps = getCurrentView(currentView, views);
  return (0, _type.isString)(currentViewProps) ? {
    type: currentViewProps
  } : currentViewProps;
};
exports.getCurrentViewProps = getCurrentViewProps;
function getViewConfigProp(schedulerProp, viewProp) {
  return viewProp !== undefined ? viewProp : schedulerProp;
}
var getCurrentViewConfig = function getCurrentViewConfig(currentViewProps, schedulerProps, currentDate) {
  var height = schedulerProps.height,
    schedulerScrolling = schedulerProps.scrolling,
    width = schedulerProps.width,
    restSchedulerProps = _objectWithoutProperties(schedulerProps, _excluded);
  var scrolling = currentViewProps.scrolling;
  var isVirtualScrolling = schedulerScrolling.mode === 'virtual' || (scrolling === null || scrolling === void 0 ? void 0 : scrolling.mode) === 'virtual';
  var crossScrollingEnabled = schedulerProps.crossScrollingEnabled || isVirtualScrolling;
  var result = _extends({
    scrolling: schedulerScrolling
  }, restSchedulerProps, currentViewProps, {
    schedulerHeight: schedulerProps.height,
    schedulerWidth: schedulerProps.width,
    crossScrollingEnabled,
    appointmentTemplate: currentViewProps.appointmentTemplate || restSchedulerProps.appointmentTemplate,
    dataCellTemplate: currentViewProps.dataCellTemplate || restSchedulerProps.dataCellTemplate,
    dateCellTemplate: currentViewProps.dateCellTemplate || restSchedulerProps.dateCellTemplate,
    timeCellTemplate: currentViewProps.timeCellTemplate || restSchedulerProps.timeCellTemplate,
    resourceCellTemplate: currentViewProps.resourceCellTemplate || restSchedulerProps.resourceCellTemplate,
    appointmentCollectorTemplate: currentViewProps.appointmentCollectorTemplate || restSchedulerProps.appointmentCollectorTemplate,
    appointmentTooltipTemplate: currentViewProps.appointmentTooltipTemplate || restSchedulerProps.appointmentTooltipTemplate,
    allDayPanelMode: currentViewProps.allDayPanelMode || restSchedulerProps.allDayPanelMode
  });
  return _extends({}, result, {
    hoursInterval: result.cellDuration / 60,
    allDayPanelExpanded: true,
    allowMultipleCellSelection: true,
    currentDate
  });
};
exports.getCurrentViewConfig = getCurrentViewConfig;
var getValidGroups = function getValidGroups(schedulerGroups, viewGroups) {
  return getViewConfigProp(schedulerGroups, viewGroups);
};
exports.getValidGroups = getValidGroups;
