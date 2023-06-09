"use strict";

exports.getAppointmentsModel = exports.getAppointmentsConfig = exports.getAppointmentRenderingStrategyName = void 0;
var _positionHelper = require("../../../../ui/scheduler/workspaces/helpers/positionHelper");
var _utils = require("../../../../ui/scheduler/resources/utils");
var _utils2 = require("../workspaces/utils");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _base = require("../view_model/to_test/views/utils/base");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var toMs = function toMs(name) {
  return _date.default.dateToMilliseconds(name);
};
var getAppointmentRenderingStrategyName = function getAppointmentRenderingStrategyName(viewType) {
  var appointmentRenderingStrategyMap = {
    day: {
      renderingStrategy: 'vertical'
    },
    week: {
      renderingStrategy: 'week'
    },
    workWeek: {
      renderingStrategy: 'week'
    },
    month: {
      renderingStrategy: 'horizontalMonth'
    },
    timelineDay: {
      renderingStrategy: 'horizontal'
    },
    timelineWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineWorkWeek: {
      renderingStrategy: 'horizontal'
    },
    timelineMonth: {
      renderingStrategy: 'horizontalMonthLine'
    },
    agenda: {
      renderingStrategy: 'agenda'
    }
  };
  var renderingStrategy = appointmentRenderingStrategyMap[viewType].renderingStrategy;
  return renderingStrategy;
};
exports.getAppointmentRenderingStrategyName = getAppointmentRenderingStrategyName;
var getAppointmentsConfig = function getAppointmentsConfig(schedulerConfig, viewConfig, loadedResources, viewDataProvider, isAllDayPanelSupported) {
  var groupCount = (0, _utils.getGroupCount)(loadedResources);
  var startViewDate = viewDataProvider.getStartViewDate();
  var dateRange = [startViewDate, viewDataProvider.getLastViewDateByEndDayHour(viewConfig.endDayHour)];
  return {
    adaptivityEnabled: schedulerConfig.adaptivityEnabled,
    rtlEnabled: schedulerConfig.rtlEnabled,
    resources: schedulerConfig.resources,
    timeZone: schedulerConfig.timeZone,
    groups: schedulerConfig.groups,
    startDayHour: viewConfig.startDayHour,
    viewStartDayHour: viewConfig.startDayHour,
    endDayHour: viewConfig.endDayHour,
    viewEndDayHour: viewConfig.endDayHour,
    currentDate: viewConfig.currentDate,
    isVirtualScrolling: viewConfig.scrolling.mode === 'virtual',
    intervalCount: viewConfig.intervalCount,
    hoursInterval: viewConfig.hoursInterval,
    showAllDayPanel: viewConfig.showAllDayPanel,
    allDayPanelMode: viewConfig.allDayPanelMode,
    supportAllDayRow: isAllDayPanelSupported,
    groupOrientation: viewDataProvider.getViewOptions().groupOrientation,
    firstDayOfWeek: viewConfig.firstDayOfWeek,
    viewType: viewConfig.type,
    cellDurationInMinutes: viewConfig.cellDuration,
    maxAppointmentsPerCell: viewConfig.maxAppointmentsPerCell,
    isVerticalGroupOrientation: viewDataProvider.getViewOptions().isVerticalGrouping,
    groupByDate: viewDataProvider.getViewOptions().isGroupedByDate,
    startViewDate: startViewDate,
    loadedResources: loadedResources,
    appointmentCountPerCell: 2,
    appointmentOffset: 26,
    allowResizing: false,
    allowAllDayResizing: false,
    dateTableOffset: 0,
    groupCount: groupCount,
    dateRange: dateRange
  };
};
exports.getAppointmentsConfig = getAppointmentsConfig;
var getAppointmentsModel = function getAppointmentsModel(appointmentsConfig, viewDataProvider, timeZoneCalculator, dataAccessors, cellsMetaData) {
  var groupedByDate = (0, _utils2.isGroupingByDate)(appointmentsConfig.groups, appointmentsConfig.groupOrientation, appointmentsConfig.groupByDate);
  var groupCount = appointmentsConfig.groupCount,
    isVerticalGroupOrientation = appointmentsConfig.isVerticalGroupOrientation;
  var positionHelper = new _positionHelper.PositionHelper({
    viewDataProvider: viewDataProvider,
    groupedByDate: groupedByDate,
    rtlEnabled: appointmentsConfig.rtlEnabled,
    groupCount: groupCount,
    isVerticalGrouping: groupCount && isVerticalGroupOrientation,
    getDOMMetaDataCallback: function getDOMMetaDataCallback() {
      return cellsMetaData;
    }
  });
  var isGroupedAllDayPanel = (0, _base.calculateIsGroupedAllDayPanel)(appointmentsConfig.loadedResources, appointmentsConfig.groupOrientation, appointmentsConfig.showAllDayPanel);
  var rowCount = viewDataProvider.getRowCount({
    intervalCount: appointmentsConfig.intervalCount,
    currentDate: appointmentsConfig.currentDate,
    viewType: appointmentsConfig.viewType,
    hoursInterval: appointmentsConfig.hoursInterval,
    startDayHour: appointmentsConfig.startDayHour,
    endDayHour: appointmentsConfig.endDayHour
  });
  var allDayHeight = (0, _positionHelper.getAllDayHeight)(appointmentsConfig.showAllDayPanel, appointmentsConfig.isVerticalGroupOrientation, cellsMetaData);
  var endViewDate = viewDataProvider.getLastCellEndDate();
  var visibleDayDuration = viewDataProvider.getVisibleDayDuration(appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  var _viewDataProvider$get = viewDataProvider.getViewOptions(),
    leftVirtualCellCount = _viewDataProvider$get.startCellIndex,
    topVirtualRowCount = _viewDataProvider$get.startRowIndex;
  var cellDuration = (0, _base.getCellDuration)(appointmentsConfig.viewType, appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  var appointmentRenderingStrategyName = getAppointmentRenderingStrategyName(appointmentsConfig.viewType);
  return _extends({}, appointmentsConfig, {
    appointmentRenderingStrategyName: appointmentRenderingStrategyName,
    loadedResources: appointmentsConfig.loadedResources,
    dataAccessors: dataAccessors,
    timeZoneCalculator: timeZoneCalculator,
    viewDataProvider: viewDataProvider,
    positionHelper: positionHelper,
    isGroupedAllDayPanel: isGroupedAllDayPanel,
    rowCount: rowCount,
    cellWidth: (0, _positionHelper.getCellWidth)(cellsMetaData),
    cellHeight: (0, _positionHelper.getCellHeight)(cellsMetaData),
    allDayHeight: allDayHeight,
    isGroupedByDate: groupedByDate,
    endViewDate: endViewDate,
    visibleDayDuration: visibleDayDuration,
    intervalDuration: cellDuration,
    allDayIntervalDuration: toMs('day'),
    leftVirtualCellCount: leftVirtualCellCount,
    topVirtualCellCount: topVirtualRowCount,
    cellDuration: cellDuration,
    resizableStep: positionHelper.getResizableStep(),
    DOMMetaData: cellsMetaData
  });
};
exports.getAppointmentsModel = getAppointmentsModel;