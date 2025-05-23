/**
* DevExtreme (cjs/__internal/scheduler/appointments/resizing/m_core.js)
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
exports.getAppointmentDateRange = void 0;
var _m_utils = require("./m_utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var getAppointmentLeftCell = function getAppointmentLeftCell(options) {
  var cellHeight = options.cellHeight,
    cellWidth = options.cellWidth,
    viewDataProvider = options.viewDataProvider,
    relativeAppointmentRect = options.relativeAppointmentRect,
    appointmentSettings = options.appointmentSettings,
    rtlEnabled = options.rtlEnabled;
  var cellRowIndex = Math.floor(relativeAppointmentRect.top / cellHeight);
  var cellColumnIndex = Math.round(relativeAppointmentRect.left / cellWidth);
  var leftCell = viewDataProvider.getCellData(cellRowIndex, cellColumnIndex, appointmentSettings.allDay, rtlEnabled);
  return leftCell;
};
var getDateRangeHorizontal = function getDateRangeHorizontal(options) {
  var cellWidth = options.cellWidth,
    cellCountInRow = options.cellCountInRow,
    relativeAppointmentRect = options.relativeAppointmentRect,
    viewDataProvider = options.viewDataProvider,
    appointmentSettings = options.appointmentSettings,
    handles = options.handles;
  var appointmentFirstCell = getAppointmentLeftCell(options);
  var appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
  var appointmentLastCellIndex = appointmentFirstCell.index + (appointmentCellsAmount - 1);
  var _appointmentSettings$ = appointmentSettings.info,
    allDay = _appointmentSettings$.allDay,
    sourceAppointment = _appointmentSettings$.sourceAppointment;
  if (handles.left) {
    var startDate = (0, _m_utils.normalizeStartDate)(options, appointmentFirstCell.startDate, sourceAppointment.startDate);
    return {
      startDate,
      endDate: sourceAppointment.endDate
    };
  }
  var appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
  var appointmentColumnIndex = appointmentLastCellIndex % cellCountInRow;
  var appointmentLastCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentColumnIndex, allDay);
  var endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
  endDate = (0, _m_utils.normalizeEndDate)(options, endDate, sourceAppointment.endDate);
  return {
    startDate: sourceAppointment.startDate,
    endDate
  };
};
var getDateRangeHorizontalRTL = function getDateRangeHorizontalRTL(options) {
  var viewDataProvider = options.viewDataProvider,
    cellCountInRow = options.cellCountInRow,
    appointmentSettings = options.appointmentSettings,
    handles = options.handles,
    cellWidth = options.cellWidth,
    relativeAppointmentRect = options.relativeAppointmentRect;
  var appointmentLastCell = getAppointmentLeftCell(options);
  var _appointmentSettings$2 = appointmentSettings.info,
    allDay = _appointmentSettings$2.allDay,
    sourceAppointment = _appointmentSettings$2.sourceAppointment;
  if (handles.right) {
    var appointmentLastCellIndex = appointmentLastCell.index;
    var appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
    var appointmentFirstCellIndex = appointmentLastCellIndex - appointmentCellsAmount + 1;
    var appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
    var appointmentFirstCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentFirstCellIndex, allDay, true);
    var startDate = (0, _m_utils.normalizeStartDate)(options, appointmentFirstCell.startDate, sourceAppointment.endDate);
    return {
      startDate,
      endDate: sourceAppointment.endDate
    };
  }
  var endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
  endDate = (0, _m_utils.normalizeEndDate)(options, endDate, sourceAppointment.endDate);
  return {
    startDate: sourceAppointment.startDate,
    endDate
  };
};
var getRelativeAppointmentRect = function getRelativeAppointmentRect(appointmentRect, parentAppointmentRect) {
  var left = appointmentRect.left - parentAppointmentRect.left;
  var top = appointmentRect.top - parentAppointmentRect.top;
  var width = left < 0 ? appointmentRect.width + left : appointmentRect.width;
  var height = top < 0 ? appointmentRect.height + top : appointmentRect.height;
  return {
    left: Math.max(0, left),
    top: Math.max(0, top),
    width,
    height
  };
};
var getAppointmentCellsInfo = function getAppointmentCellsInfo(options) {
  var appointmentSettings = options.appointmentSettings,
    isVerticalGroupedWorkSpace = options.isVerticalGroupedWorkSpace,
    DOMMetaData = options.DOMMetaData;
  var DOMMetaTable = appointmentSettings.allDay && !isVerticalGroupedWorkSpace ? [DOMMetaData.allDayPanelCellsMeta] : DOMMetaData.dateTableCellsMeta;
  var positionByMap = appointmentSettings.positionByMap;
  var _DOMMetaTable$positio = DOMMetaTable[positionByMap.rowIndex][positionByMap.columnIndex],
    cellHeight = _DOMMetaTable$positio.height,
    cellWidth = _DOMMetaTable$positio.width;
  var cellCountInRow = DOMMetaTable[positionByMap.rowIndex].length;
  return {
    cellWidth,
    cellHeight,
    cellCountInRow
  };
};
var getAppointmentDateRange = function getAppointmentDateRange(options) {
  var appointmentSettings = options.appointmentSettings;
  var relativeAppointmentRect = getRelativeAppointmentRect(options.appointmentRect, options.parentAppointmentRect);
  var cellInfo = getAppointmentCellsInfo(options);
  var considerTime = !options.isDateAndTimeView || appointmentSettings.allDay;
  var extendedOptions = _extends(_extends(_extends({}, options), cellInfo), {
    considerTime,
    relativeAppointmentRect
  });
  return !options.rtlEnabled ? getDateRangeHorizontal(extendedOptions) : getDateRangeHorizontalRTL(extendedOptions);
};
exports.getAppointmentDateRange = getAppointmentDateRange;
