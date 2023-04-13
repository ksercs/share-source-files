/**
* DevExtreme (renovation/ui/scheduler/model/views.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getValidGroups = exports.getCurrentViewProps = exports.getCurrentViewConfig = exports.getCurrentView = void 0;
exports.getViewConfigProp = getViewConfigProp;
var _type = require("../../../../core/utils/type");
var _excluded = ["height", "scrolling", "width"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var VIEW_TYPES = ['day', 'week', 'workWeek', 'month', 'timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth', 'agenda'];
var getCurrentView = function getCurrentView(currentView, views) {
  var currentViewProps = views.find(function (view) {
    var names = (0, _type.isObject)(view) ? [view.name, view.type] : [view];
    if (names.includes(currentView)) {
      return true;
    }
    return false;
  });
  if (currentViewProps === undefined) {
    if (VIEW_TYPES.includes(currentView)) {
      currentViewProps = currentView;
    } else {
      var _views = _slicedToArray(views, 1);
      currentViewProps = _views[0];
    }
  }
  return currentViewProps;
};
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
    crossScrollingEnabled: crossScrollingEnabled,
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
    currentDate: currentDate
  });
};
exports.getCurrentViewConfig = getCurrentViewConfig;
var getValidGroups = function getValidGroups(schedulerGroups, viewGroups) {
  return getViewConfigProp(schedulerGroups, viewGroups);
};
exports.getValidGroups = getValidGroups;
