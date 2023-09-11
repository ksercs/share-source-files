import _extends from "@babel/runtime/helpers/esm/extends";
import { getCellWidth, getCellHeight, getAllDayHeight, PositionHelper } from '../../../../__internal/scheduler/workspaces/helpers/m_position_helper';
import { getGroupCount } from '../../../../__internal/scheduler/resources/m_utils';
import { isGroupingByDate } from '../workspaces/utils';
import dateUtils from '../../../../core/utils/date';
import { calculateIsGroupedAllDayPanel, getCellDuration } from '../view_model/to_test/views/utils/base';
import { getAppointmentRenderingStrategyName } from './utils';
var toMs = name => dateUtils.dateToMilliseconds(name);
export var getAppointmentsConfig = (schedulerConfig, viewConfig, loadedResources, viewDataProvider, isAllDayPanelSupported) => {
  var groupCount = getGroupCount(loadedResources);
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
    startViewDate,
    loadedResources,
    appointmentCountPerCell: 2,
    appointmentOffset: 26,
    allowResizing: false,
    allowAllDayResizing: false,
    dateTableOffset: 0,
    groupCount,
    dateRange
  };
};
export var getAppointmentsModel = (appointmentsConfig, viewDataProvider, timeZoneCalculator, dataAccessors, cellsMetaData) => {
  var groupedByDate = isGroupingByDate(appointmentsConfig.groups, appointmentsConfig.groupOrientation, appointmentsConfig.groupByDate);
  var {
    groupCount,
    isVerticalGroupOrientation
  } = appointmentsConfig;
  var positionHelper = new PositionHelper({
    viewDataProvider,
    groupedByDate,
    rtlEnabled: appointmentsConfig.rtlEnabled,
    groupCount,
    isVerticalGrouping: groupCount && isVerticalGroupOrientation,
    getDOMMetaDataCallback: () => cellsMetaData
  });
  var isGroupedAllDayPanel = calculateIsGroupedAllDayPanel(appointmentsConfig.loadedResources, appointmentsConfig.groupOrientation, appointmentsConfig.showAllDayPanel);
  var rowCount = viewDataProvider.getRowCount({
    intervalCount: appointmentsConfig.intervalCount,
    currentDate: appointmentsConfig.currentDate,
    viewType: appointmentsConfig.viewType,
    hoursInterval: appointmentsConfig.hoursInterval,
    startDayHour: appointmentsConfig.startDayHour,
    endDayHour: appointmentsConfig.endDayHour
  });
  var allDayHeight = getAllDayHeight(appointmentsConfig.showAllDayPanel, appointmentsConfig.isVerticalGroupOrientation, cellsMetaData);
  var endViewDate = viewDataProvider.getLastCellEndDate();
  var visibleDayDuration = viewDataProvider.getVisibleDayDuration(appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  var {
    startCellIndex: leftVirtualCellCount,
    startRowIndex: topVirtualRowCount
  } = viewDataProvider.getViewOptions();
  var cellDuration = getCellDuration(appointmentsConfig.viewType, appointmentsConfig.startDayHour, appointmentsConfig.endDayHour, appointmentsConfig.hoursInterval);
  var appointmentRenderingStrategyName = getAppointmentRenderingStrategyName(appointmentsConfig.viewType);
  return _extends({}, appointmentsConfig, {
    appointmentRenderingStrategyName,
    loadedResources: appointmentsConfig.loadedResources,
    dataAccessors,
    timeZoneCalculator,
    viewDataProvider,
    positionHelper,
    isGroupedAllDayPanel,
    rowCount,
    cellWidth: getCellWidth(cellsMetaData),
    cellHeight: getCellHeight(cellsMetaData),
    allDayHeight,
    isGroupedByDate: groupedByDate,
    endViewDate,
    visibleDayDuration,
    intervalDuration: cellDuration,
    allDayIntervalDuration: toMs('day'),
    leftVirtualCellCount,
    topVirtualCellCount: topVirtualRowCount,
    cellDuration,
    resizableStep: positionHelper.getResizableStep(),
    DOMMetaData: cellsMetaData
  });
};