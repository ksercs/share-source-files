/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/work_space.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "allDayAppointments", "allDayPanelExpanded", "allDayPanelMode", "allowMultipleCellSelection", "appointmentCollectorTemplate", "appointmentTemplate", "appointments", "cellDuration", "className", "crossScrollingEnabled", "currentDate", "dataCellTemplate", "dateCellTemplate", "disabled", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groupOrientation", "groups", "height", "hint", "hoursInterval", "hoverStateEnabled", "indicatorTime", "indicatorUpdateInterval", "intervalCount", "maxAppointmentsPerCell", "onClick", "onKeyDown", "onViewRendered", "resourceCellTemplate", "rtlEnabled", "schedulerHeight", "schedulerWidth", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDate", "startDayHour", "startViewDate", "tabIndex", "timeCellTemplate", "type", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { subscribeToDXPointerDownEvent, subscribeToDXPointerMoveEvent, subscribeToScrollEvent } from '../../../../utils/subscribe_to_event';
import { combineClasses } from '../../../../utils/combine_classes';
import { OrdinaryLayout } from './ordinary_layout';
import { VirtualScrollingDispatcher } from '../../../../../__internal/scheduler/workspaces/m_virtual_scrolling';
import ViewDataProvider from '../../../../../__internal/scheduler/workspaces/view_model/m_view_data_provider';
import { createCellElementMetaData, createVirtualScrollingOptions, DATE_TABLE_MIN_CELL_WIDTH, getCellIndices, getDateTableWidth, getSelectedCells, isCellAllDay } from './utils';
import { WorkSpaceProps } from '../props';
import { getViewRenderConfigByType } from './work_space_config';
import { isGroupingByDate, isHorizontalGroupingApplied, isVerticalGroupingApplied } from '../utils';
import { CrossScrollingLayout } from './cross_scrolling_layout';
import { getViewDataGeneratorByViewType } from '../../../../../__internal/scheduler/workspaces/view_model/m_utils';
import { calculateIsGroupedAllDayPanel } from '../../view_model/to_test/views/utils/base';
import { DateHeaderDataGenerator } from '../../../../../__internal/scheduler/workspaces/view_model/m_date_header_data_generator';
import { TimePanelDataGenerator } from '../../../../../__internal/scheduler/workspaces/view_model/m_time_panel_data_generator';
import { CellsSelectionController } from '../../../../../__internal/scheduler/workspaces/m_cells_selection_controller';
import { getGroupPanelData } from '../../view_model/group_panel/utils';
import { getWindow } from '../../../../../core/utils/window';
import domAdapter from '../../../../../core/dom_adapter';
import { ConfigContext } from '../../../../common/config_context';
import pointerEvents from '../../../../../events/pointer';
import eventsEngine from '../../../../../events/core/events_engine';
import { isMouseEvent } from '../../../../../events/utils/index';
import { ALL_DAY_PANEL_CELL_CLASS, DATE_TABLE_CELL_CLASS } from '../const';
import { DiagnosticUtils } from '../../../../utils/diagnostic';
var DATA_CELL_SELECTOR = ".".concat(DATE_TABLE_CELL_CLASS, ", .").concat(ALL_DAY_PANEL_CELL_CLASS);
var defaultVirtualScrollingMetaData = {
  cellHeight: 50,
  cellWidth: DATE_TABLE_MIN_CELL_WIDTH,
  viewWidth: 300,
  viewHeight: 300,
  scrollableWidth: 300,
  windowHeight: 300,
  windowWidth: 300
};
var calculateDefaultVirtualScrollingState = options => {
  var completeColumnCount = options.completeViewDataMap[0].length;
  var completeRowCount = options.completeViewDataMap.length;
  options.virtualScrollingDispatcher.setViewOptions(createVirtualScrollingOptions({
    cellHeight: defaultVirtualScrollingMetaData.cellHeight,
    cellWidth: defaultVirtualScrollingMetaData.cellWidth,
    schedulerHeight: options.schedulerHeight,
    schedulerWidth: options.schedulerWidth,
    viewHeight: defaultVirtualScrollingMetaData.viewHeight,
    viewWidth: defaultVirtualScrollingMetaData.viewWidth,
    scrolling: options.scrolling,
    scrollableWidth: defaultVirtualScrollingMetaData.scrollableWidth,
    groups: options.groups,
    isVerticalGrouping: options.isVerticalGrouping,
    completeRowCount,
    completeColumnCount,
    windowHeight: defaultVirtualScrollingMetaData.windowHeight,
    windowWidth: defaultVirtualScrollingMetaData.windowWidth,
    rtlEnabled: options.rtlEnabled
  }));
  options.virtualScrollingDispatcher.createVirtualScrolling();
  options.virtualScrollingDispatcher.updateDimensions(true);
  return options.virtualScrollingDispatcher.getRenderState();
};
export var prepareGenerationOptions = (workSpaceProps, renderConfig, isAllDayPanelVisible, virtualStartIndices) => {
  var {
    cellDuration,
    currentDate,
    endDayHour,
    firstDayOfWeek,
    groupByDate,
    groupOrientation,
    groups,
    hoursInterval,
    intervalCount,
    startDate,
    startDayHour,
    type
  } = workSpaceProps;
  var {
    getDateForHeaderText,
    headerCellTextFormat,
    isGenerateWeekDaysHeaderData,
    isProvideVirtualCellsWidth,
    isRenderTimePanel
  } = renderConfig;
  return {
    startRowIndex: virtualStartIndices.startRowIndex,
    startCellIndex: virtualStartIndices.startCellIndex,
    groupOrientation,
    groupByDate,
    groups,
    isProvideVirtualCellsWidth,
    isAllDayPanelVisible,
    selectedCells: undefined,
    focusedCell: undefined,
    headerCellTextFormat,
    getDateForHeaderText,
    startDayHour,
    endDayHour,
    cellDuration,
    viewType: type,
    intervalCount,
    hoursInterval,
    currentDate,
    startDate,
    firstDayOfWeek,
    isGenerateTimePanelData: isRenderTimePanel,
    isGenerateWeekDaysHeaderData
  };
};
export var viewFunction = _ref => {
  var {
    allDayPanelRef,
    classes,
    dateHeaderData,
    dateTableRef,
    groupOrientation,
    groupPanelData,
    groupPanelHeight,
    groupPanelRef,
    headerEmptyCellWidth,
    isAllDayPanelVisible,
    isGroupedByDate,
    isRenderHeaderEmptyCell,
    isStandaloneAllDayPanel,
    isVerticalGrouping,
    layoutRef,
    onScrollableScroll,
    props: {
      allDayAppointments,
      allDayPanelExpanded,
      appointments,
      dataCellTemplate,
      dateCellTemplate,
      groups,
      intervalCount,
      resourceCellTemplate,
      timeCellTemplate
    },
    renderConfig: {
      groupPanelClassName,
      isCreateCrossScrolling,
      isRenderDateHeader,
      isRenderTimePanel,
      isUseMonthDateTable,
      isUseTimelineHeader,
      scrollingDirection
    },
    tablesWidth,
    timePanelData,
    timePanelRef,
    viewData,
    widgetElementRef
  } = _ref;
  var Layout = isCreateCrossScrolling ? CrossScrollingLayout : OrdinaryLayout;
  return createComponentVNode(2, Layout, {
    "viewData": viewData,
    "dateHeaderData": dateHeaderData,
    "timePanelData": timePanelData,
    "groupPanelData": groupPanelData,
    "dataCellTemplate": dataCellTemplate,
    "dateCellTemplate": dateCellTemplate,
    "timeCellTemplate": timeCellTemplate,
    "resourceCellTemplate": resourceCellTemplate,
    "groups": groups,
    "groupByDate": isGroupedByDate,
    "groupOrientation": groupOrientation,
    "groupPanelClassName": groupPanelClassName,
    "intervalCount": intervalCount,
    "isUseMonthDateTable": isUseMonthDateTable,
    "isUseTimelineHeader": isUseTimelineHeader,
    "isRenderTimePanel": isRenderTimePanel,
    "isAllDayPanelCollapsed": !allDayPanelExpanded,
    "isAllDayPanelVisible": isAllDayPanelVisible,
    "isRenderDateHeader": isRenderDateHeader,
    "isRenderHeaderEmptyCell": isRenderHeaderEmptyCell,
    "isRenderGroupPanel": isVerticalGrouping,
    "isStandaloneAllDayPanel": isStandaloneAllDayPanel,
    "scrollingDirection": scrollingDirection,
    "groupPanelHeight": groupPanelHeight,
    "headerEmptyCellWidth": headerEmptyCellWidth,
    "tablesWidth": tablesWidth,
    "onScroll": onScrollableScroll,
    "className": classes,
    "dateTableRef": dateTableRef,
    "allDayPanelRef": allDayPanelRef,
    "timePanelRef": timePanelRef,
    "groupPanelRef": groupPanelRef,
    "widgetElementRef": widgetElementRef,
    "appointments": appointments,
    "allDayAppointments": allDayAppointments
  }, null, layoutRef);
};
import { createRef as infernoCreateRef } from 'inferno';
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class WorkSpace extends InfernoComponent {
  constructor(props) {
    super(props);
    this.dateTableRef = infernoCreateRef();
    this.allDayPanelRef = infernoCreateRef();
    this.timePanelRef = infernoCreateRef();
    this.groupPanelRef = infernoCreateRef();
    this.layoutRef = infernoCreateRef();
    this.widgetElementRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {
      groupPanelHeight: undefined,
      headerEmptyCellWidth: undefined,
      tablesWidth: undefined,
      virtualScrolling: new VirtualScrollingDispatcher(),
      virtualScrollingData: undefined,
      cellsSelectionState: null,
      isPointerDown: false
    };
    this.diagnosticEffect = this.diagnosticEffect.bind(this);
    this.headerEmptyCellWidthEffect = this.headerEmptyCellWidthEffect.bind(this);
    this.tablesWidthEffect = this.tablesWidthEffect.bind(this);
    this.virtualScrollingMetaDataEffect = this.virtualScrollingMetaDataEffect.bind(this);
    this.groupPanelHeightEffect = this.groupPanelHeightEffect.bind(this);
    this.onWindowScrollEffect = this.onWindowScrollEffect.bind(this);
    this.pointerEventsEffect = this.pointerEventsEffect.bind(this);
    this.onViewRendered = this.onViewRendered.bind(this);
    this.pointerUpEffect = this.pointerUpEffect.bind(this);
    this.createDateTableElementsMeta = this.createDateTableElementsMeta.bind(this);
    this.createAllDayPanelElementsMeta = this.createAllDayPanelElementsMeta.bind(this);
    this.onWindowScroll = this.onWindowScroll.bind(this);
    this.onScrollableScroll = this.onScrollableScroll.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.diagnosticEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new InfernoEffect(this.headerEmptyCellWidthEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new InfernoEffect(this.tablesWidthEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new InfernoEffect(this.virtualScrollingMetaDataEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new InfernoEffect(this.groupPanelHeightEffect, [this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]), new InfernoEffect(this.onWindowScrollEffect, [this.state.virtualScrolling, this.state.virtualScrollingData]), new InfernoEffect(this.pointerEventsEffect, [this.props.cellDuration, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.startDate, this.props.startDayHour, this.props.type, this.props.groupByDate, this.props.startViewDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.showAllDayPanel, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.props.scrolling, this.state.virtualScrolling, this.state.isPointerDown, this.state.cellsSelectionState]), new InfernoEffect(this.onViewRendered, [this.props.allDayPanelExpanded, this.props.cellDuration, this.props.crossScrollingEnabled, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.groupOrientation, this.props.type, this.props.intervalCount, this.props.groups, this.props.hoursInterval, this.props.onViewRendered, this.props.scrolling, this.props.showAllDayPanel, this.props.startDate, this.props.startDayHour, this.props.startViewDate, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.state.virtualScrolling, this.state.tablesWidth]), new InfernoEffect(this.pointerUpEffect, [])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
    (_this$_effects$3 = this._effects[2]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
    (_this$_effects$4 = this._effects[3]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
    (_this$_effects$5 = this._effects[4]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props, this.state.groupPanelHeight, this.state.headerEmptyCellWidth, this.state.tablesWidth, this.state.virtualScrolling, this.state.virtualScrollingData, this.state.cellsSelectionState, this.state.isPointerDown, this.config, this.props.dataCellTemplate, this.props.dateCellTemplate, this.props.timeCellTemplate, this.props.resourceCellTemplate, this.props.appointmentTemplate, this.props.appointmentCollectorTemplate, this.props.intervalCount, this.props.groups, this.props.groupByDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.startDayHour, this.props.endDayHour, this.props.firstDayOfWeek, this.props.currentDate, this.props.startDate, this.props.startViewDate, this.props.hoursInterval, this.props.showAllDayPanel, this.props.allDayPanelExpanded, this.props.allowMultipleCellSelection, this.props.indicatorTime, this.props.indicatorUpdateInterval, this.props.shadeUntilCurrentTime, this.props.selectedCellData, this.props.scrolling, this.props.cellDuration, this.props.showCurrentTimeIndicator, this.props.schedulerHeight, this.props.schedulerWidth, this.props.type, this.props.maxAppointmentsPerCell, this.props.allDayPanelMode, this.props.onViewRendered, this.props.appointments, this.props.allDayAppointments, this.props.className, this.props.accessKey, this.props.activeStateEnabled, this.props.disabled, this.props.focusStateEnabled, this.props.height, this.props.hint, this.props.hoverStateEnabled, this.props.onClick, this.props.onKeyDown, this.props.rtlEnabled, this.props.tabIndex, this.props.visible, this.props.width]);
    (_this$_effects$6 = this._effects[5]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.state.virtualScrolling, this.state.virtualScrollingData]);
    (_this$_effects$7 = this._effects[6]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.cellDuration, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groups, this.props.hoursInterval, this.props.intervalCount, this.props.startDate, this.props.startDayHour, this.props.type, this.props.groupByDate, this.props.startViewDate, this.props.groupOrientation, this.props.crossScrollingEnabled, this.props.showAllDayPanel, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.props.scrolling, this.state.virtualScrolling, this.state.isPointerDown, this.state.cellsSelectionState]);
    (_this$_effects$8 = this._effects[7]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.allDayPanelExpanded, this.props.cellDuration, this.props.crossScrollingEnabled, this.props.currentDate, this.props.endDayHour, this.props.firstDayOfWeek, this.props.groupByDate, this.props.groupOrientation, this.props.type, this.props.intervalCount, this.props.groups, this.props.hoursInterval, this.props.onViewRendered, this.props.scrolling, this.props.showAllDayPanel, this.props.startDate, this.props.startDayHour, this.props.startViewDate, this.state.virtualScrollingData, this.props.schedulerHeight, this.props.schedulerWidth, this.state.virtualScrolling, this.state.tablesWidth]);
  }
  diagnosticEffect() {
    DiagnosticUtils.incrementRenderCount('scheduler_workspace');
  }
  headerEmptyCellWidthEffect() {
    var _this$timePanelRef$cu, _this$timePanelRef$cu2, _this$groupPanelRef$c, _this$groupPanelRef$c2;
    var timePanelWidth = (_this$timePanelRef$cu = (_this$timePanelRef$cu2 = this.timePanelRef.current) === null || _this$timePanelRef$cu2 === void 0 ? void 0 : _this$timePanelRef$cu2.getBoundingClientRect().width) !== null && _this$timePanelRef$cu !== void 0 ? _this$timePanelRef$cu : 0;
    var groupPanelWidth = (_this$groupPanelRef$c = (_this$groupPanelRef$c2 = this.groupPanelRef.current) === null || _this$groupPanelRef$c2 === void 0 ? void 0 : _this$groupPanelRef$c2.getBoundingClientRect().width) !== null && _this$groupPanelRef$c !== void 0 ? _this$groupPanelRef$c : 0;
    this.setState(__state_argument => ({
      headerEmptyCellWidth: timePanelWidth + groupPanelWidth
    }));
  }
  tablesWidthEffect() {
    if (this.isCalculateTablesWidth) {
      var {
        currentDate,
        endDayHour,
        groups,
        hoursInterval,
        intervalCount,
        startDayHour,
        type: viewType
      } = this.props;
      this.setState(__state_argument => ({
        tablesWidth: getDateTableWidth(this.layoutRef.current.getScrollableWidth(), this.dateTableRef.current, this.viewDataProvider, {
          intervalCount,
          currentDate,
          viewType,
          hoursInterval,
          startDayHour,
          endDayHour,
          groups,
          groupOrientation: this.groupOrientation
        })
      }));
    }
  }
  virtualScrollingMetaDataEffect() {
    var dateTableCell = this.dateTableRef.current.querySelector('td:not(.dx-scheduler-virtual-cell)');
    var cellRect = dateTableCell.getBoundingClientRect();
    var cellHeight = Math.floor(cellRect.height);
    var cellWidth = Math.floor(cellRect.width);
    var scrollableWidth = this.layoutRef.current.getScrollableWidth();
    var widgetRect = this.widgetElementRef.current.getBoundingClientRect();
    var viewHeight = widgetRect.height;
    var viewWidth = widgetRect.width;
    var windowHeight = getWindow().innerHeight;
    var windowWidth = getWindow().innerWidth;
    var nextSizes = {
      cellHeight,
      cellWidth,
      scrollableWidth,
      viewHeight,
      viewWidth,
      windowHeight,
      windowWidth
    };
    var isNextMetaDataNotEqualToCurrent = !this.state.virtualScrollingData || Object.entries(nextSizes).some(_ref2 => {
      var [key, value] = _ref2;
      return value !== this.state.virtualScrollingData.sizes[key];
    });
    if (isNextMetaDataNotEqualToCurrent) {
      var _this$config;
      var {
        groups,
        schedulerHeight,
        schedulerWidth,
        scrolling
      } = this.props;
      var completeColumnCount = this.completeViewDataMap[0].length;
      var completeRowCount = this.completeViewDataMap.length;
      this.state.virtualScrolling.setViewOptions(createVirtualScrollingOptions({
        cellHeight: nextSizes.cellHeight,
        cellWidth: nextSizes.cellWidth,
        schedulerHeight,
        schedulerWidth,
        viewHeight: nextSizes.viewHeight,
        viewWidth: nextSizes.viewWidth,
        scrolling,
        scrollableWidth: nextSizes.scrollableWidth,
        groups,
        isVerticalGrouping: this.isVerticalGrouping,
        completeRowCount,
        completeColumnCount,
        windowHeight: nextSizes.windowHeight,
        windowWidth: nextSizes.windowWidth,
        rtlEnabled: !!((_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled)
      }));
      this.state.virtualScrolling.createVirtualScrolling();
      this.state.virtualScrolling.updateDimensions(true);
      this.setState(__state_argument => ({
        virtualScrollingData: {
          state: this.state.virtualScrolling.getRenderState(),
          sizes: nextSizes
        }
      }));
    }
  }
  groupPanelHeightEffect() {
    this.setState(__state_argument => {
      var _this$dateTableRef$cu;
      return {
        groupPanelHeight: (_this$dateTableRef$cu = this.dateTableRef.current) === null || _this$dateTableRef$cu === void 0 ? void 0 : _this$dateTableRef$cu.getBoundingClientRect().height
      };
    });
  }
  onWindowScrollEffect() {
    if (this.state.virtualScrolling.isAttachWindowScrollEvent()) {
      return subscribeToScrollEvent(domAdapter.getDocument(), () => this.onWindowScroll());
    }
    return undefined;
  }
  pointerEventsEffect() {
    var disposePointerDown = subscribeToDXPointerDownEvent(this.widgetElementRef.current, e => this.onPointerDown(e));
    var disposePointerMove = subscribeToDXPointerMoveEvent(this.widgetElementRef.current, e => this.onPointerMove(e));
    return () => {
      disposePointerDown();
      disposePointerMove();
    };
  }
  onViewRendered() {
    var {
      allDayPanelExpanded,
      cellDuration,
      crossScrollingEnabled,
      currentDate,
      endDayHour,
      firstDayOfWeek,
      groupByDate,
      groupOrientation,
      groups,
      hoursInterval,
      intervalCount,
      onViewRendered,
      scrolling,
      showAllDayPanel,
      startDate,
      startDayHour,
      type: viewType
    } = this.props;
    var tableWidths = getDateTableWidth(this.layoutRef.current.getScrollableWidth(), this.dateTableRef.current, this.viewDataProvider, {
      intervalCount,
      currentDate,
      viewType,
      hoursInterval,
      startDayHour,
      endDayHour,
      groups,
      groupOrientation: this.groupOrientation
    });
    if (!this.isCalculateTablesWidth || tableWidths === this.state.tablesWidth) {
      var columnCount = this.viewDataMap.dateTableMap[0].length;
      var dateTableCellsMeta = this.createDateTableElementsMeta(columnCount);
      var allDayPanelCellsMeta = this.createAllDayPanelElementsMeta();
      onViewRendered({
        viewDataProvider: this.viewDataProvider,
        cellsMetaData: {
          dateTableCellsMeta,
          allDayPanelCellsMeta
        },
        viewDataProviderValidationOptions: {
          intervalCount,
          currentDate,
          type: viewType,
          hoursInterval,
          startDayHour,
          endDayHour,
          groups,
          groupOrientation,
          groupByDate,
          crossScrollingEnabled,
          firstDayOfWeek,
          startDate,
          showAllDayPanel,
          allDayPanelExpanded,
          scrolling,
          cellDuration
        }
      });
    }
  }
  pointerUpEffect() {
    var onPointerUp = e => this.onPointerUp(e);
    eventsEngine.on(domAdapter.getDocument(), pointerEvents.up, onPointerUp);
    return () => {
      eventsEngine.off(domAdapter.getDocument(), pointerEvents.up, onPointerUp);
    };
  }
  get renderConfig() {
    if (this.__getterCache['renderConfig'] !== undefined) {
      return this.__getterCache['renderConfig'];
    }
    return this.__getterCache['renderConfig'] = (() => {
      return getViewRenderConfigByType(this.props.type, this.props.crossScrollingEnabled, this.props.intervalCount, this.props.groups, this.props.groupOrientation);
    })();
  }
  get groupOrientation() {
    var {
      groupOrientation
    } = this.props;
    var {
      defaultGroupOrientation
    } = this.renderConfig;
    return groupOrientation !== null && groupOrientation !== void 0 ? groupOrientation : defaultGroupOrientation;
  }
  get isVerticalGrouping() {
    return isVerticalGroupingApplied(this.props.groups, this.groupOrientation);
  }
  get isHorizontalGrouping() {
    return isHorizontalGroupingApplied(this.props.groups, this.groupOrientation);
  }
  get isGroupedByDate() {
    return isGroupingByDate(this.props.groups, this.groupOrientation, this.props.groupByDate);
  }
  get isAllDayPanelVisible() {
    var {
      showAllDayPanel
    } = this.props;
    var {
      isAllDayPanelSupported
    } = this.renderConfig;
    return isAllDayPanelSupported && showAllDayPanel;
  }
  get viewDataGenerator() {
    if (this.__getterCache['viewDataGenerator'] !== undefined) {
      return this.__getterCache['viewDataGenerator'];
    }
    return this.__getterCache['viewDataGenerator'] = (() => {
      return getViewDataGeneratorByViewType(this.props.type);
    })();
  }
  get dateHeaderDataGenerator() {
    if (this.__getterCache['dateHeaderDataGenerator'] !== undefined) {
      return this.__getterCache['dateHeaderDataGenerator'];
    }
    return this.__getterCache['dateHeaderDataGenerator'] = (() => {
      return new DateHeaderDataGenerator(this.viewDataGenerator);
    })();
  }
  get timePanelDataGenerator() {
    if (this.__getterCache['timePanelDataGenerator'] !== undefined) {
      return this.__getterCache['timePanelDataGenerator'];
    }
    return this.__getterCache['timePanelDataGenerator'] = (() => {
      return new TimePanelDataGenerator(this.viewDataGenerator);
    })();
  }
  get completeViewDataMap() {
    if (this.__getterCache['completeViewDataMap'] !== undefined) {
      return this.__getterCache['completeViewDataMap'];
    }
    return this.__getterCache['completeViewDataMap'] = (() => {
      var {
        cellDuration,
        currentDate,
        endDayHour,
        firstDayOfWeek,
        groupByDate,
        groups,
        hoursInterval,
        intervalCount,
        startDate,
        startDayHour,
        type
      } = this.props;
      return this.viewDataGenerator.getCompleteViewDataMap({
        currentDate,
        startDate,
        startDayHour,
        endDayHour,
        groupByDate,
        groups,
        intervalCount,
        firstDayOfWeek,
        hoursInterval,
        cellDuration,
        startViewDate: this.props.startViewDate,
        groupOrientation: this.groupOrientation,
        isVerticalGrouping: this.isVerticalGrouping,
        isHorizontalGrouping: this.isHorizontalGrouping,
        isGroupedByDate: this.isGroupedByDate,
        isAllDayPanelVisible: this.isAllDayPanelVisible,
        viewType: type,
        interval: this.viewDataGenerator.getInterval(hoursInterval)
      });
    })();
  }
  get correctedVirtualScrollingState() {
    if (this.__getterCache['correctedVirtualScrollingState'] !== undefined) {
      return this.__getterCache['correctedVirtualScrollingState'];
    }
    return this.__getterCache['correctedVirtualScrollingState'] = (_this$state$virtualSc => {
      var result = (_this$state$virtualSc = this.state.virtualScrollingData) === null || _this$state$virtualSc === void 0 ? void 0 : _this$state$virtualSc.state;
      if (!result) {
        var {
          groups,
          schedulerHeight,
          schedulerWidth,
          scrolling
        } = this.props;
        result = calculateDefaultVirtualScrollingState({
          virtualScrollingDispatcher: this.state.virtualScrolling,
          scrolling,
          groups,
          completeViewDataMap: this.completeViewDataMap,
          isVerticalGrouping: this.isVerticalGrouping,
          schedulerHeight,
          schedulerWidth,
          rtlEnabled: false
        });
      }
      return _extends({
        startCellIndex: 0,
        startRowIndex: 0
      }, result);
    })();
  }
  get viewDataMap() {
    if (this.__getterCache['viewDataMap'] !== undefined) {
      return this.__getterCache['viewDataMap'];
    }
    return this.__getterCache['viewDataMap'] = (() => {
      return this.viewDataGenerator.generateViewDataMap(this.completeViewDataMap, _extends({}, this.correctedVirtualScrollingState, {
        isVerticalGrouping: this.isVerticalGrouping,
        isAllDayPanelVisible: this.isAllDayPanelVisible
      }));
    })();
  }
  get viewDataMapWithSelection() {
    if (this.__getterCache['viewDataMapWithSelection'] !== undefined) {
      return this.__getterCache['viewDataMapWithSelection'];
    }
    return this.__getterCache['viewDataMapWithSelection'] = (() => {
      if (!this.state.cellsSelectionState) {
        return this.viewDataMap;
      }
      return this.viewDataGenerator.markSelectedAndFocusedCells(this.viewDataMap, this.state.cellsSelectionState);
    })();
  }
  get viewData() {
    if (this.__getterCache['viewData'] !== undefined) {
      return this.__getterCache['viewData'];
    }
    return this.__getterCache['viewData'] = (() => {
      var {
        groups
      } = this.props;
      var result = this.viewDataGenerator.getViewDataFromMap(this.completeViewDataMap, this.viewDataMapWithSelection, _extends({}, this.correctedVirtualScrollingState, {
        isProvideVirtualCellsWidth: this.renderConfig.isProvideVirtualCellsWidth,
        isVerticalGrouping: this.isVerticalGrouping,
        isAllDayPanelVisible: this.isAllDayPanelVisible,
        isGroupedAllDayPanel: calculateIsGroupedAllDayPanel(groups, this.groupOrientation, this.isAllDayPanelVisible)
      }));
      return result;
    })();
  }
  get completeDateHeaderData() {
    if (this.__getterCache['completeDateHeaderData'] !== undefined) {
      return this.__getterCache['completeDateHeaderData'];
    }
    return this.__getterCache['completeDateHeaderData'] = (() => {
      var {
        currentDate,
        endDayHour,
        groups,
        hoursInterval,
        intervalCount,
        startDayHour,
        type: viewType
      } = this.props;
      return this.dateHeaderDataGenerator.getCompleteDateHeaderMap({
        isGenerateWeekDaysHeaderData: this.renderConfig.isGenerateWeekDaysHeaderData,
        isGroupedByDate: this.isGroupedByDate,
        groups,
        groupOrientation: this.groupOrientation,
        isHorizontalGrouping: this.isHorizontalGrouping,
        startDayHour,
        endDayHour,
        hoursInterval,
        intervalCount,
        headerCellTextFormat: this.renderConfig.headerCellTextFormat,
        getDateForHeaderText: this.renderConfig.getDateForHeaderText,
        interval: this.viewDataGenerator.getInterval(hoursInterval),
        startViewDate: this.props.startViewDate,
        currentDate,
        viewType,
        today: new Date()
      }, this.completeViewDataMap);
    })();
  }
  get dateHeaderData() {
    if (this.__getterCache['dateHeaderData'] !== undefined) {
      return this.__getterCache['dateHeaderData'];
    }
    return this.__getterCache['dateHeaderData'] = (() => {
      var {
        endDayHour,
        groups,
        hoursInterval,
        startDayHour
      } = this.props;
      return this.dateHeaderDataGenerator.generateDateHeaderData(this.completeDateHeaderData, this.completeViewDataMap, _extends({
        isGenerateWeekDaysHeaderData: this.renderConfig.isGenerateWeekDaysHeaderData,
        isProvideVirtualCellsWidth: this.renderConfig.isProvideVirtualCellsWidth,
        isMonthDateHeader: this.renderConfig.isMonthDateHeader,
        startDayHour,
        endDayHour,
        hoursInterval,
        groups,
        groupOrientation: this.groupOrientation,
        isGroupedByDate: this.isGroupedByDate
      }, this.correctedVirtualScrollingState));
    })();
  }
  get completeTimePanelData() {
    if (this.__getterCache['completeTimePanelData'] !== undefined) {
      return this.__getterCache['completeTimePanelData'];
    }
    return this.__getterCache['completeTimePanelData'] = (() => {
      if (!this.renderConfig.isRenderTimePanel) {
        return undefined;
      }
      var {
        cellDuration,
        currentDate,
        endDayHour,
        hoursInterval,
        intervalCount,
        startDayHour,
        type
      } = this.props;
      return this.timePanelDataGenerator.getCompleteTimePanelMap({
        startViewDate: this.props.startViewDate,
        cellDuration,
        startDayHour,
        endDayHour,
        isVerticalGrouping: this.isVerticalGrouping,
        intervalCount,
        currentDate,
        viewType: type,
        hoursInterval
      }, this.completeViewDataMap);
    })();
  }
  get timePanelData() {
    if (this.__getterCache['timePanelData'] !== undefined) {
      return this.__getterCache['timePanelData'];
    }
    return this.__getterCache['timePanelData'] = (() => {
      if (!this.completeTimePanelData) {
        return undefined;
      }
      return this.timePanelDataGenerator.generateTimePanelData(this.completeTimePanelData, _extends({
        isGroupedAllDayPanel: calculateIsGroupedAllDayPanel(this.props.groups, this.groupOrientation, this.isAllDayPanelVisible),
        isVerticalGrouping: this.isVerticalGrouping,
        isAllDayPanelVisible: this.isAllDayPanelVisible
      }, this.correctedVirtualScrollingState));
    })();
  }
  get viewDataProvider() {
    if (this.__getterCache['viewDataProvider'] !== undefined) {
      return this.__getterCache['viewDataProvider'];
    }
    return this.__getterCache['viewDataProvider'] = (() => {
      var {
        cellDuration,
        currentDate,
        endDayHour,
        firstDayOfWeek,
        groups,
        hoursInterval,
        intervalCount,
        startDate,
        startDayHour,
        type
      } = this.props;
      var viewDataProvider = new ViewDataProvider(type);
      viewDataProvider.completeViewDataMap = this.completeViewDataMap;
      viewDataProvider.viewDataMap = this.viewDataMap;
      var generationOptions = prepareGenerationOptions({
        intervalCount,
        groups,
        groupByDate: this.isGroupedByDate,
        groupOrientation: this.groupOrientation,
        startDayHour,
        endDayHour,
        currentDate,
        startDate,
        firstDayOfWeek,
        hoursInterval,
        type,
        cellDuration
      }, this.renderConfig, this.isAllDayPanelVisible, this.correctedVirtualScrollingState);
      viewDataProvider.setViewOptions(generationOptions);
      viewDataProvider.createGroupedDataMapProvider();
      return viewDataProvider;
    })();
  }
  get groupPanelData() {
    if (this.__getterCache['groupPanelData'] !== undefined) {
      return this.__getterCache['groupPanelData'];
    }
    return this.__getterCache['groupPanelData'] = (() => {
      var {
        currentDate,
        endDayHour,
        groups,
        hoursInterval,
        intervalCount,
        startDayHour,
        type
      } = this.props;
      var columnCountPerGroup = this.viewDataGenerator.getCellCount({
        intervalCount,
        hoursInterval,
        currentDate,
        startDayHour,
        endDayHour,
        viewType: type
      });
      var groupPanelData = getGroupPanelData(groups, columnCountPerGroup, this.isGroupedByDate, this.isGroupedByDate ? 1 : columnCountPerGroup);
      return groupPanelData;
    })();
  }
  get isRenderHeaderEmptyCell() {
    return this.isVerticalGrouping || !!this.renderConfig.isRenderTimePanel;
  }
  get isWorkSpaceWithOddCells() {
    return false;
  }
  get classes() {
    var {
      allDayPanelExpanded,
      groups,
      intervalCount,
      scrolling
    } = this.props;
    return combineClasses({
      [this.renderConfig.className]: true,
      'dx-scheduler-work-space-count': intervalCount > 1,
      'dx-scheduler-work-space-odd-cells': !!this.isWorkSpaceWithOddCells,
      'dx-scheduler-work-space-all-day-collapsed': !allDayPanelExpanded && this.isAllDayPanelVisible,
      'dx-scheduler-work-space-all-day': this.isAllDayPanelVisible,
      'dx-scheduler-work-space-group-by-date': this.isGroupedByDate,
      'dx-scheduler-work-space-grouped': groups.length > 0,
      'dx-scheduler-work-space-vertical-grouped': this.isVerticalGrouping && this.renderConfig.defaultGroupOrientation !== 'vertical',
      'dx-scheduler-work-space-horizontal-grouped': isHorizontalGroupingApplied(groups, this.groupOrientation) && this.renderConfig.defaultGroupOrientation === 'vertical',
      'dx-scheduler-group-column-count-one': this.isVerticalGrouping && groups.length === 1,
      'dx-scheduler-group-column-count-two': this.isVerticalGrouping && groups.length === 2,
      'dx-scheduler-group-column-count-three': this.isVerticalGrouping && groups.length === 3,
      'dx-scheduler-work-space-both-scrollbar': this.props.crossScrollingEnabled,
      'dx-scheduler-work-space-virtual': scrolling.mode === 'virtual',
      'dx-scheduler-work-space': true
    });
  }
  get isStandaloneAllDayPanel() {
    var {
      groups
    } = this.props;
    return !isVerticalGroupingApplied(groups, this.groupOrientation) && this.isAllDayPanelVisible;
  }
  get isCalculateTablesWidth() {
    return this.props.crossScrollingEnabled && this.renderConfig.defaultGroupOrientation !== 'vertical';
  }
  createDateTableElementsMeta(totalCellCount) {
    var dateTableCells = this.dateTableRef.current.querySelectorAll('td:not(.dx-scheduler-virtual-cell)');
    var dateTableRect = this.dateTableRef.current.getBoundingClientRect();
    var dateTableCellsMeta = [];
    dateTableCells.forEach((cellElement, index) => {
      if (index % totalCellCount === 0) {
        dateTableCellsMeta.push([]);
      }
      var cellRect = cellElement.getBoundingClientRect();
      var validCellRect = createCellElementMetaData(dateTableRect, cellRect);
      dateTableCellsMeta[dateTableCellsMeta.length - 1].push(validCellRect);
    });
    return dateTableCellsMeta;
  }
  createAllDayPanelElementsMeta() {
    if (!this.allDayPanelRef.current) {
      return [];
    }
    var allDayPanelCells = this.allDayPanelRef.current.querySelectorAll('td');
    var allDayPanelRect = this.allDayPanelRef.current.getBoundingClientRect();
    var allDayPanelCellsMeta = [];
    allDayPanelCells.forEach(cellElement => {
      var cellRect = cellElement.getBoundingClientRect();
      allDayPanelCellsMeta.push(createCellElementMetaData(allDayPanelRect, cellRect));
    });
    return allDayPanelCellsMeta;
  }
  onWindowScroll() {
    var {
      scrollX,
      scrollY
    } = getWindow();
    this.onScroll({
      top: scrollY,
      left: scrollX
    });
  }
  onScrollableScroll(event) {
    if (this.props.scrolling.mode === 'virtual') {
      this.onScroll(event.scrollOffset);
    }
  }
  onScroll(scrollOffset) {
    this.state.virtualScrolling.handleOnScrollEvent(scrollOffset);
    var nextState = this.state.virtualScrolling.getRenderState();
    var isUpdateState = Object.entries(nextState).some(_ref3 => {
      var [key, value] = _ref3;
      return value !== this.state.virtualScrollingData.state[key];
    });
    if (isUpdateState) {
      this.setState(__state_argument => ({
        virtualScrollingData: {
          state: nextState,
          sizes: __state_argument.virtualScrollingData.sizes
        }
      }));
    }
  }
  onPointerDown(e) {
    var cell = e.target.closest(DATA_CELL_SELECTOR);
    if (cell && isMouseEvent(e) && e.button === 0) {
      var isAllDay = isCellAllDay(cell);
      var cellIndices = getCellIndices(cell);
      var cellData = this.viewDataProvider.getCellData(cellIndices.rowIndex, cellIndices.columnIndex, isAllDay);
      this.setState(__state_argument => ({
        cellsSelectionState: {
          focusedCell: {
            cellData,
            position: cellIndices
          },
          selectedCells: [cellData],
          firstSelectedCell: cellData
        }
      }));
      this.setState(__state_argument => ({
        isPointerDown: true
      }));
    }
  }
  onPointerUp(e) {
    if (isMouseEvent(e) && e.button === 0) {
      this.setState(__state_argument => ({
        isPointerDown: false
      }));
    }
  }
  onPointerMove(e) {
    var cell = e.target.closest(DATA_CELL_SELECTOR);
    if (cell && this.state.isPointerDown) {
      e.preventDefault();
      e.stopPropagation();
      var cellsSelectionController = new CellsSelectionController();
      var cellIndices = getCellIndices(cell);
      var isAllDay = isCellAllDay(cell);
      var cellData = this.viewDataProvider.getCellData(cellIndices.rowIndex, cellIndices.columnIndex, isAllDay);
      var nextFocusedCell = cellsSelectionController.moveToCell({
        isMultiSelection: true,
        isMultiSelectionAllowed: true,
        focusedCellData: this.state.cellsSelectionState.focusedCell.cellData,
        currentCellData: cellData
      });
      if (nextFocusedCell === cellData && this.state.cellsSelectionState.focusedCell.cellData.index !== cellData.index) {
        var firstCell = this.state.cellsSelectionState.firstSelectedCell;
        var lastCell = cellData;
        var selectedCells = getSelectedCells(this.viewDataProvider, firstCell, lastCell, !!firstCell.allDay);
        this.setState(__state_argument => ({
          cellsSelectionState: {
            focusedCell: {
              cellData,
              position: cellIndices
            },
            selectedCells,
            firstSelectedCell: __state_argument.cellsSelectionState.firstSelectedCell
          }
        }));
      }
    }
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props['type'] !== nextProps['type'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['groups'] !== nextProps['groups'] || this.props['groupOrientation'] !== nextProps['groupOrientation']) {
      this.__getterCache['renderConfig'] = undefined;
    }
    if (this.props['type'] !== nextProps['type']) {
      this.__getterCache['viewDataGenerator'] = undefined;
    }
    if (this.props['type'] !== nextProps['type']) {
      this.__getterCache['dateHeaderDataGenerator'] = undefined;
    }
    if (this.props['type'] !== nextProps['type']) {
      this.__getterCache['timePanelDataGenerator'] = undefined;
    }
    if (this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel']) {
      this.__getterCache['completeViewDataMap'] = undefined;
    }
    if (this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['groups'] !== nextProps['groups'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel']) {
      this.__getterCache['correctedVirtualScrollingState'] = undefined;
    }
    if (this.props['type'] !== nextProps['type'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['viewDataMap'] = undefined;
    }
    if (this.state['cellsSelectionState'] !== nextState['cellsSelectionState'] || this.props['type'] !== nextProps['type'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['viewDataMapWithSelection'] = undefined;
    }
    if (this.props['groups'] !== nextProps['groups'] || this.props['type'] !== nextProps['type'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['cellsSelectionState'] !== nextState['cellsSelectionState'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['viewData'] = undefined;
    }
    if (this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['startDate'] !== nextProps['startDate'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel']) {
      this.__getterCache['completeDateHeaderData'] = undefined;
    }
    if (this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['startDate'] !== nextProps['startDate'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['dateHeaderData'] = undefined;
    }
    if (this.props['type'] !== nextProps['type'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['groups'] !== nextProps['groups'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['startDate'] !== nextProps['startDate'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel']) {
      this.__getterCache['completeTimePanelData'] = undefined;
    }
    if (this.props['type'] !== nextProps['type'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['groups'] !== nextProps['groups'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['startDate'] !== nextProps['startDate'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['timePanelData'] = undefined;
    }
    if (this.props['cellDuration'] !== nextProps['cellDuration'] || this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['firstDayOfWeek'] !== nextProps['firstDayOfWeek'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDate'] !== nextProps['startDate'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['groupByDate'] !== nextProps['groupByDate'] || this.props['startViewDate'] !== nextProps['startViewDate'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['showAllDayPanel'] !== nextProps['showAllDayPanel'] || this.state['virtualScrollingData'] !== nextState['virtualScrollingData'] || this.props['schedulerHeight'] !== nextProps['schedulerHeight'] || this.props['schedulerWidth'] !== nextProps['schedulerWidth'] || this.props['scrolling'] !== nextProps['scrolling'] || this.state['virtualScrolling'] !== nextState['virtualScrolling']) {
      this.__getterCache['viewDataProvider'] = undefined;
    }
    if (this.props['currentDate'] !== nextProps['currentDate'] || this.props['endDayHour'] !== nextProps['endDayHour'] || this.props['groups'] !== nextProps['groups'] || this.props['hoursInterval'] !== nextProps['hoursInterval'] || this.props['intervalCount'] !== nextProps['intervalCount'] || this.props['startDayHour'] !== nextProps['startDayHour'] || this.props['type'] !== nextProps['type'] || this.props['groupOrientation'] !== nextProps['groupOrientation'] || this.props['crossScrollingEnabled'] !== nextProps['crossScrollingEnabled'] || this.props['groupByDate'] !== nextProps['groupByDate']) {
      this.__getterCache['groupPanelData'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate)
      }),
      groupPanelHeight: this.state.groupPanelHeight,
      headerEmptyCellWidth: this.state.headerEmptyCellWidth,
      tablesWidth: this.state.tablesWidth,
      virtualScrolling: this.state.virtualScrolling,
      virtualScrollingData: this.state.virtualScrollingData,
      cellsSelectionState: this.state.cellsSelectionState,
      isPointerDown: this.state.isPointerDown,
      dateTableRef: this.dateTableRef,
      allDayPanelRef: this.allDayPanelRef,
      timePanelRef: this.timePanelRef,
      groupPanelRef: this.groupPanelRef,
      widgetElementRef: this.widgetElementRef,
      layoutRef: this.layoutRef,
      config: this.config,
      renderConfig: this.renderConfig,
      groupOrientation: this.groupOrientation,
      isVerticalGrouping: this.isVerticalGrouping,
      isHorizontalGrouping: this.isHorizontalGrouping,
      isGroupedByDate: this.isGroupedByDate,
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      viewDataGenerator: this.viewDataGenerator,
      dateHeaderDataGenerator: this.dateHeaderDataGenerator,
      timePanelDataGenerator: this.timePanelDataGenerator,
      completeViewDataMap: this.completeViewDataMap,
      correctedVirtualScrollingState: this.correctedVirtualScrollingState,
      viewDataMap: this.viewDataMap,
      viewDataMapWithSelection: this.viewDataMapWithSelection,
      viewData: this.viewData,
      completeDateHeaderData: this.completeDateHeaderData,
      dateHeaderData: this.dateHeaderData,
      completeTimePanelData: this.completeTimePanelData,
      timePanelData: this.timePanelData,
      viewDataProvider: this.viewDataProvider,
      groupPanelData: this.groupPanelData,
      isRenderHeaderEmptyCell: this.isRenderHeaderEmptyCell,
      isWorkSpaceWithOddCells: this.isWorkSpaceWithOddCells,
      classes: this.classes,
      isStandaloneAllDayPanel: this.isStandaloneAllDayPanel,
      isCalculateTablesWidth: this.isCalculateTablesWidth,
      createDateTableElementsMeta: this.createDateTableElementsMeta,
      createAllDayPanelElementsMeta: this.createAllDayPanelElementsMeta,
      onWindowScroll: this.onWindowScroll,
      onScrollableScroll: this.onScrollableScroll,
      onScroll: this.onScroll,
      onPointerDown: this.onPointerDown,
      onPointerUp: this.onPointerUp,
      onPointerMove: this.onPointerMove,
      restAttributes: this.restAttributes
    });
  }
}
WorkSpace.defaultProps = WorkSpaceProps;
