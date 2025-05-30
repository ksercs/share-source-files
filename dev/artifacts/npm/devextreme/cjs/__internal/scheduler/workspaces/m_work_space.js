/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_work_space.js)
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
exports.default = void 0;
var _translator = require("../../../animation/translator");
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _data = require("../../../core/utils/data");
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _position = require("../../../core/utils/position");
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _click = require("../../../events/click");
var _contextmenu = require("../../../events/contextmenu");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _drag = require("../../../events/drag");
var _pointer = _interopRequireDefault(require("../../../events/pointer"));
var _index = require("../../../events/utils/index");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _getMemoizeScrollTo = require("../../../renovation/ui/common/utils/scroll/getMemoizeScrollTo");
var _base = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _ui = _interopRequireDefault(require("../../../ui/scroll_view/ui.scrollable"));
var _ui2 = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _table = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/table.j"));
var _title = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/title.j"));
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/date_table/layout.j"));
var _group_panel = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/group_panel/group_panel.j"));
var _layout2 = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j"));
var _layout3 = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/time_panel/layout.j"));
var _m_widget_observer = _interopRequireDefault(require("../base/m_widget_observer"));
var _m_appointment_drag_behavior = _interopRequireDefault(require("../m_appointment_drag_behavior"));
var _m_classes = require("../m_classes");
var _m_constants = require("../m_constants");
var _m_table_creator = _interopRequireDefault(require("../m_table_creator"));
var _m_utils = require("../m_utils");
var _m_utils2 = require("../resources/m_utils");
var _m_current_time_shader_vertical = _interopRequireDefault(require("../shaders/m_current_time_shader_vertical"));
var _m_position_helper = require("./helpers/m_position_helper");
var _m_cache = require("./m_cache");
var _m_cells_selection_controller = require("./m_cells_selection_controller");
var _m_cells_selection_state = _interopRequireDefault(require("./m_cells_selection_state"));
var _m_virtual_scrolling = require("./m_virtual_scrolling");
var _m_work_space_grouped_strategy_horizontal = _interopRequireDefault(require("./m_work_space_grouped_strategy_horizontal"));
var _m_work_space_grouped_strategy_vertical = _interopRequireDefault(require("./m_work_space_grouped_strategy_vertical"));
var _m_view_data_provider = _interopRequireDefault(require("./view_model/m_view_data_provider"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // NOTE: Renovation component section
// @ts-expect-error
// @ts-expect-error
// @ts-expect-error
// @ts-expect-error
// @ts-expect-error
// @ts-expect-error
var tableCreator = _m_table_creator.default.tableCreator;
// TODO: The constant is needed so that the dragging is not sharp. To prevent small twitches
var DRAGGING_MOUSE_FAULT = 10;
// @ts-expect-error
var abstract = _m_widget_observer.default.abstract;
var toMs = _date.default.dateToMilliseconds;
var COMPONENT_CLASS = 'dx-scheduler-work-space';
var GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-grouped';
var VERTICAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-vertical-grouped';
var WORKSPACE_VERTICAL_GROUP_TABLE_CLASS = 'dx-scheduler-work-space-vertical-group-table';
var WORKSPACE_WITH_BOTH_SCROLLS_CLASS = 'dx-scheduler-work-space-both-scrollbar';
var WORKSPACE_WITH_COUNT_CLASS = 'dx-scheduler-work-space-count';
var WORKSPACE_WITH_GROUP_BY_DATE_CLASS = 'dx-scheduler-work-space-group-by-date';
var WORKSPACE_WITH_ODD_CELLS_CLASS = 'dx-scheduler-work-space-odd-cells';
var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
var ALL_DAY_PANEL_CLASS = 'dx-scheduler-all-day-panel';
var ALL_DAY_TABLE_CLASS = 'dx-scheduler-all-day-table';
var ALL_DAY_CONTAINER_CLASS = 'dx-scheduler-all-day-appointments';
var ALL_DAY_TITLE_CLASS = 'dx-scheduler-all-day-title';
var ALL_DAY_TABLE_CELL_CLASS = 'dx-scheduler-all-day-table-cell';
var ALL_DAY_TABLE_ROW_CLASS = 'dx-scheduler-all-day-table-row';
var WORKSPACE_WITH_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day';
var WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day-collapsed';
var WORKSPACE_WITH_MOUSE_SELECTION_CLASS = 'dx-scheduler-work-space-mouse-selection';
var HORIZONTAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-horizontal';
var VERTICAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-vertical';
var HEADER_PANEL_CLASS = 'dx-scheduler-header-panel';
var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
var GROUP_HEADER_CLASS = 'dx-scheduler-group-header';
var DATE_TABLE_CELL_CLASS = 'dx-scheduler-date-table-cell';
var DATE_TABLE_FOCUSED_CELL_CLASS = 'dx-scheduler-focused-cell';
var VIRTUAL_ROW_CLASS = 'dx-scheduler-virtual-row';
var DATE_TABLE_DROPPABLE_CELL_CLASS = 'dx-scheduler-date-table-droppable-cell';
var SCHEDULER_HEADER_SCROLLABLE_CLASS = 'dx-scheduler-header-scrollable';
var SCHEDULER_SIDEBAR_SCROLLABLE_CLASS = 'dx-scheduler-sidebar-scrollable';
var SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS = 'dx-scheduler-date-table-scrollable';
var SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, 'dxSchedulerWorkSpace');
var DragEventNames = {
  ENTER: (0, _index.addNamespace)(_drag.enter, 'dxSchedulerDateTable'),
  DROP: (0, _index.addNamespace)(_drag.drop, 'dxSchedulerDateTable'),
  LEAVE: (0, _index.addNamespace)(_drag.leave, 'dxSchedulerDateTable')
};
var SCHEDULER_CELL_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.down, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.move, 'dxSchedulerDateTable');
var CELL_DATA = 'dxCellData';
var DATE_TABLE_MIN_CELL_WIDTH = 75;
var DAY_MS = toMs('day');
var HOUR_MS = toMs('hour');
var DRAG_AND_DROP_SELECTOR = ".".concat(_m_classes.DATE_TABLE_CLASS, " td, .").concat(ALL_DAY_TABLE_CLASS, " td");
var CELL_SELECTOR = ".".concat(DATE_TABLE_CELL_CLASS, ", .").concat(ALL_DAY_TABLE_CELL_CLASS);
var CELL_INDEX_CALCULATION_EPSILON = 0.05;
var SchedulerWorkSpace = /*#__PURE__*/function (_WidgetObserver) {
  _inheritsLoose(SchedulerWorkSpace, _WidgetObserver);
  function SchedulerWorkSpace() {
    var _this;
    _this = _WidgetObserver.apply(this, arguments) || this;
    _this.viewDirection = 'vertical';
    return _this;
  }
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  var _proto = SchedulerWorkSpace.prototype;
  _proto._supportedKeys = function _supportedKeys() {
    var _this3 = this;
    var clickHandler = function clickHandler(e) {
      var _this2 = this;
      e.preventDefault();
      e.stopPropagation();
      var selectedCells = this.cellsSelectionState.getSelectedCells();
      if (selectedCells === null || selectedCells === void 0 ? void 0 : selectedCells.length) {
        var selectedCellsElement = selectedCells.map(function (cellData) {
          return _this2._getCellByData(cellData);
        }).filter(function (cell) {
          return !!cell;
        });
        e.target = selectedCellsElement;
        this._showPopup = true;
        this._cellClickAction({
          event: e,
          cellElement: (0, _renderer.default)(selectedCellsElement),
          cellData: selectedCells[0]
        });
      }
    };
    var onArrowPressed = function onArrowPressed(e, key) {
      var _a;
      e.preventDefault();
      e.stopPropagation();
      var focusedCellData = (_a = _this3.cellsSelectionState.focusedCell) === null || _a === void 0 ? void 0 : _a.cellData;
      if (focusedCellData) {
        var isAllDayPanelCell = focusedCellData.allDay && !_this3._isVerticalGroupedWorkSpace();
        var isMultiSelection = e.shiftKey;
        var isMultiSelectionAllowed = _this3.option('allowMultipleCellSelection');
        var isRTL = _this3._isRTL();
        var groupCount = _this3._getGroupCount();
        var isGroupedByDate = _this3.isGroupedByDate();
        var isHorizontalGrouping = _this3._isHorizontalGroupedWorkSpace();
        var focusedCellPosition = _this3.viewDataProvider.findCellPositionInMap(_extends(_extends({}, focusedCellData), {
          isAllDay: focusedCellData.allDay
        }));
        var edgeIndices = isHorizontalGrouping && isMultiSelection && !isGroupedByDate ? _this3.viewDataProvider.getGroupEdgeIndices(focusedCellData.groupIndex, isAllDayPanelCell) : _this3.viewDataProvider.getViewEdgeIndices(isAllDayPanelCell);
        var nextCellData = _this3.cellsSelectionController.handleArrowClick({
          focusedCellPosition,
          edgeIndices,
          isRTL,
          isGroupedByDate,
          groupCount,
          isMultiSelection,
          isMultiSelectionAllowed,
          viewType: _this3.type,
          key,
          getCellDataByPosition: _this3.viewDataProvider.getCellData.bind(_this3.viewDataProvider),
          isAllDayPanelCell,
          focusedCellData
        });
        _this3._processNextSelectedCell(nextCellData, focusedCellData, isMultiSelection && isMultiSelectionAllowed);
      }
    };
    // @ts-expect-error
    return (0, _extend.extend)(_WidgetObserver.prototype._supportedKeys.call(this), {
      enter: clickHandler,
      space: clickHandler,
      downArrow: function downArrow(e) {
        onArrowPressed(e, 'down');
      },
      upArrow: function upArrow(e) {
        onArrowPressed(e, 'up');
      },
      rightArrow: function rightArrow(e) {
        onArrowPressed(e, 'right');
      },
      leftArrow: function leftArrow(e) {
        onArrowPressed(e, 'left');
      }
    });
  };
  _proto._isRTL = function _isRTL() {
    return this.option('rtlEnabled');
  };
  _proto._moveToCell = function _moveToCell($cell, isMultiSelection) {
    if (!(0, _type.isDefined)($cell) || !$cell.length) {
      return;
    }
    var isMultiSelectionAllowed = this.option('allowMultipleCellSelection');
    var currentCellData = this._getFullCellData($cell);
    var focusedCellData = this.cellsSelectionState.focusedCell.cellData;
    var nextFocusedCellData = this.cellsSelectionController.moveToCell({
      isMultiSelection,
      isMultiSelectionAllowed,
      currentCellData,
      focusedCellData,
      isVirtualCell: $cell.hasClass(_m_classes.VIRTUAL_CELL_CLASS)
    });
    this._processNextSelectedCell(nextFocusedCellData, focusedCellData, isMultiSelectionAllowed && isMultiSelection);
  };
  _proto._processNextSelectedCell = function _processNextSelectedCell(nextCellData, focusedCellData, isMultiSelection) {
    var nextCellPosition = this.viewDataProvider.findCellPositionInMap({
      startDate: nextCellData.startDate,
      groupIndex: nextCellData.groupIndex,
      isAllDay: nextCellData.allDay,
      index: nextCellData.index
    });
    if (!this.viewDataProvider.isSameCell(focusedCellData, nextCellData)) {
      var $cell = nextCellData.allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(nextCellPosition.columnIndex) : this._dom_getDateCell(nextCellPosition);
      var isNextCellAllDay = nextCellData.allDay;
      this._setSelectedCellsStateAndUpdateSelection(isNextCellAllDay, nextCellPosition, isMultiSelection, $cell);
      this._dateTableScrollable.scrollToElement($cell);
    }
  };
  _proto._setSelectedCellsStateAndUpdateSelection = function _setSelectedCellsStateAndUpdateSelection(isAllDay, cellPosition, isMultiSelection, $nextFocusedCell) {
    var nextCellCoordinates = {
      rowIndex: cellPosition.rowIndex,
      columnIndex: cellPosition.columnIndex,
      allDay: isAllDay
    };
    this.cellsSelectionState.setFocusedCell(nextCellCoordinates.rowIndex, nextCellCoordinates.columnIndex, isAllDay);
    if (isMultiSelection) {
      this.cellsSelectionState.setSelectedCells(nextCellCoordinates);
    } else {
      this.cellsSelectionState.setSelectedCells(nextCellCoordinates, nextCellCoordinates);
    }
    this.updateCellsSelection();
    this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells(), $nextFocusedCell);
  };
  _proto._hasAllDayClass = function _hasAllDayClass($cell) {
    return $cell.hasClass(ALL_DAY_TABLE_CELL_CLASS);
  };
  _proto._focusInHandler = function _focusInHandler(e) {
    if ((0, _renderer.default)(e.target).is(this._focusTarget()) && this._isCellClick !== false) {
      delete this._isCellClick;
      delete this._contextMenuHandled;
      // @ts-expect-error
      _WidgetObserver.prototype._focusInHandler.apply(this, arguments);
      this.cellsSelectionState.restoreSelectedAndFocusedCells();
      if (!this.cellsSelectionState.focusedCell) {
        var cellCoordinates = {
          columnIndex: 0,
          rowIndex: 0,
          allDay: this._isVerticalGroupedWorkSpace() && this.isAllDayPanelVisible
        };
        this.cellsSelectionState.setFocusedCell(cellCoordinates.rowIndex, cellCoordinates.columnIndex, cellCoordinates.allDay);
        this.cellsSelectionState.setSelectedCells(cellCoordinates, cellCoordinates);
      }
      this.updateCellsSelection();
      this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells());
    }
  };
  _proto._focusOutHandler = function _focusOutHandler() {
    // @ts-expect-error
    _WidgetObserver.prototype._focusOutHandler.apply(this, arguments);
    if (!this._contextMenuHandled && !this._disposed) {
      this.cellsSelectionState.releaseSelectedAndFocusedCells();
      this.viewDataProvider.updateViewData(this.generateRenderOptions());
      this.updateCellsSelection();
    }
  };
  _proto._focusTarget = function _focusTarget() {
    return this.$element();
  };
  _proto._isVerticalGroupedWorkSpace = function _isVerticalGroupedWorkSpace() {
    var _a;
    return !!((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) && this.option('groupOrientation') === 'vertical';
  };
  _proto._isHorizontalGroupedWorkSpace = function _isHorizontalGroupedWorkSpace() {
    var _a;
    return !!((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) && this.option('groupOrientation') === 'horizontal';
  };
  _proto._isWorkSpaceWithCount = function _isWorkSpaceWithCount() {
    return this.option('intervalCount') > 1;
  };
  _proto._isWorkspaceWithOddCells = function _isWorkspaceWithOddCells() {
    return this.option('hoursInterval') === 0.5 && !this.isVirtualScrolling();
  };
  _proto._getRealGroupOrientation = function _getRealGroupOrientation() {
    return this._isVerticalGroupedWorkSpace() ? 'vertical' : 'horizontal';
  };
  _proto.createRAllDayPanelElements = function createRAllDayPanelElements() {
    this._$allDayPanel = (0, _renderer.default)('<div>').addClass(ALL_DAY_PANEL_CLASS);
    this._$allDayTitle = (0, _renderer.default)('<div>').appendTo(this._$headerPanelEmptyCell);
  };
  _proto._dateTableScrollableConfig = function _dateTableScrollableConfig() {
    var _this4 = this;
    var config = {
      useKeyboard: false,
      bounceEnabled: false,
      updateManually: true,
      onScroll: function onScroll() {
        var _a;
        (_a = _this4._groupedStrategy.cache) === null || _a === void 0 ? void 0 : _a.clear();
      }
    };
    if (this._needCreateCrossScrolling()) {
      config = (0, _extend.extend)(config, this._createCrossScrollingConfig(config));
    }
    if (this.isVirtualScrolling() && (this.virtualScrollingDispatcher.horizontalScrollingAllowed || this.virtualScrollingDispatcher.height)) {
      var currentOnScroll = config.onScroll;
      config = _extends(_extends({}, config), {
        onScroll: function onScroll(e) {
          currentOnScroll === null || currentOnScroll === void 0 ? void 0 : currentOnScroll(e);
          _this4.virtualScrollingDispatcher.handleOnScrollEvent(e === null || e === void 0 ? void 0 : e.scrollOffset);
        }
      });
    }
    return config;
  };
  _proto._createCrossScrollingConfig = function _createCrossScrollingConfig(_ref) {
    var _this5 = this;
    var _onScroll = _ref.onScroll;
    return {
      direction: 'both',
      onScroll: function onScroll(event) {
        _onScroll === null || _onScroll === void 0 ? void 0 : _onScroll();
        _this5._scrollSync.sidebar({
          top: event.scrollOffset.top
        });
        _this5._scrollSync.header({
          left: event.scrollOffset.left
        });
      },
      onEnd: function onEnd() {
        _this5.option('onScrollEnd')();
      }
    };
  };
  _proto._headerScrollableConfig = function _headerScrollableConfig() {
    var _this6 = this;
    return {
      useKeyboard: false,
      showScrollbar: 'never',
      direction: 'horizontal',
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: function onScroll(event) {
        _this6._scrollSync.dateTable({
          left: event.scrollOffset.left
        });
      }
    };
  };
  _proto._visibilityChanged = function _visibilityChanged(visible) {
    this.cache.clear();
    if (visible) {
      this._updateGroupTableHeight();
    }
    if (visible && this._needCreateCrossScrolling()) {
      this._setTableSizes();
    }
  };
  _proto._setTableSizes = function _setTableSizes() {
    this.cache.clear();
    this._attachTableClasses();
    var cellWidth = this.getCellWidth();
    if (cellWidth < this.getCellMinWidth()) {
      cellWidth = this.getCellMinWidth();
    }
    var minWidth = this.getWorkSpaceMinWidth();
    var groupCount = this._getGroupCount();
    var totalCellCount = this._getTotalCellCount(groupCount);
    var width = cellWidth * totalCellCount;
    if (width < minWidth) {
      width = minWidth;
    }
    (0, _size.setWidth)(this._$headerPanel, width);
    (0, _size.setWidth)(this._$dateTable, width);
    if (this._$allDayTable) {
      (0, _size.setWidth)(this._$allDayTable, width);
    }
    this._attachHeaderTableClasses();
    this._updateGroupTableHeight();
    this._updateScrollable();
  };
  _proto.getWorkSpaceMinWidth = function getWorkSpaceMinWidth() {
    return this._groupedStrategy.getWorkSpaceMinWidth();
  };
  _proto._dimensionChanged = function _dimensionChanged() {
    // NOTE: It's a base widget method. Be careful :)
    // @ts-expect-error
    if (!this._isVisible()) {
      return;
    }
    if (this.option('crossScrollingEnabled')) {
      this._setTableSizes();
    }
    this.updateHeaderEmptyCellWidth();
    this._updateScrollable();
    this.cache.clear();
  };
  _proto._needCreateCrossScrolling = function _needCreateCrossScrolling() {
    return this.option('crossScrollingEnabled');
  };
  _proto._getElementClass = function _getElementClass() {
    return (0, _common.noop)();
  };
  _proto._getRowCount = function _getRowCount() {
    return this.viewDataProvider.getRowCount({
      intervalCount: this.option('intervalCount'),
      currentDate: this.option('currentDate'),
      viewType: this.type,
      hoursInterval: this.option('hoursInterval'),
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour')
    });
  };
  _proto._getCellCount = function _getCellCount() {
    return this.viewDataProvider.getCellCount({
      intervalCount: this.option('intervalCount'),
      currentDate: this.option('currentDate'),
      viewType: this.type,
      hoursInterval: this.option('hoursInterval'),
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour')
    });
  };
  _proto.isRenovatedRender = function isRenovatedRender() {
    return this.renovatedRenderSupported() && this.option('renovateRender');
  };
  _proto._isVirtualModeOn = function _isVirtualModeOn() {
    return this.option('scrolling.mode') === 'virtual';
  };
  _proto.isVirtualScrolling = function isVirtualScrolling() {
    return this.isRenovatedRender() && this._isVirtualModeOn();
  };
  _proto._initVirtualScrolling = function _initVirtualScrolling() {
    if (this.virtualScrollingDispatcher) {
      this.virtualScrollingDispatcher.dispose();
      this.virtualScrollingDispatcher = null;
    }
    this.virtualScrollingDispatcher = new _m_virtual_scrolling.VirtualScrollingDispatcher(this._getVirtualScrollingDispatcherOptions());
    this.virtualScrollingDispatcher.attachScrollableEvents();
    this.renderer = new _m_virtual_scrolling.VirtualScrollingRenderer(this);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.onDataSourceChanged = function onDataSourceChanged(argument) {};
  _proto.isGroupedAllDayPanel = function isGroupedAllDayPanel() {
    return (0, _base.calculateIsGroupedAllDayPanel)(this.option('groups'), this.option('groupOrientation'), this.isAllDayPanelVisible);
  };
  _proto.generateRenderOptions = function generateRenderOptions(isProvideVirtualCellsWidth) {
    var _a;
    var groupCount = this._getGroupCount();
    var groupOrientation = groupCount > 0 ? this.option('groupOrientation') : this._getDefaultGroupStrategy();
    var options = _extends({
      groupByDate: this.option('groupByDate'),
      startRowIndex: 0,
      startCellIndex: 0,
      groupOrientation,
      today: (_a = this._getToday) === null || _a === void 0 ? void 0 : _a.call(this),
      groups: this.option('groups'),
      isProvideVirtualCellsWidth,
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      selectedCells: this.cellsSelectionState.getSelectedCells(),
      focusedCell: this.cellsSelectionState.focusedCell,
      headerCellTextFormat: this._getFormat(),
      getDateForHeaderText: function getDateForHeaderText(_, date) {
        return date;
      },
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour'),
      cellDuration: this.getCellDuration(),
      viewType: this.type,
      intervalCount: this.option('intervalCount'),
      hoursInterval: this.option('hoursInterval'),
      currentDate: this.option('currentDate'),
      startDate: this.option('startDate'),
      firstDayOfWeek: this.option('firstDayOfWeek')
    }, this.virtualScrollingDispatcher.getRenderState());
    return options;
  };
  _proto.renovatedRenderSupported = function renovatedRenderSupported() {
    return true;
  };
  _proto._updateGroupTableHeight = function _updateGroupTableHeight() {
    if (this._isVerticalGroupedWorkSpace() && (0, _window.hasWindow)()) {
      this._setHorizontalGroupHeaderCellsHeight();
    }
  };
  _proto.updateHeaderEmptyCellWidth = function updateHeaderEmptyCellWidth() {
    if ((0, _window.hasWindow)() && this._isRenderHeaderPanelEmptyCell()) {
      var timePanelWidth = this.getTimePanelWidth();
      var groupPanelWidth = this.getGroupTableWidth();
      this._$headerPanelEmptyCell.css('width', timePanelWidth + groupPanelWidth);
    }
  };
  _proto._isGroupsSpecified = function _isGroupsSpecified(resources) {
    var _a;
    return ((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) && resources;
  };
  _proto._getGroupIndexByResourceId = function _getGroupIndexByResourceId(id) {
    var groups = this.option('groups');
    var resourceTree = (0, _m_utils2.createResourcesTree)(groups);
    if (!resourceTree.length) return 0;
    return this._getGroupIndexRecursively(resourceTree, id);
  };
  _proto._getGroupIndexRecursively = function _getGroupIndexRecursively(resourceTree, id) {
    var _this7 = this;
    var currentKey = resourceTree[0].name;
    var currentValue = id[currentKey];
    return resourceTree.reduce(function (prevIndex, _ref2) {
      var leafIndex = _ref2.leafIndex,
        value = _ref2.value,
        children = _ref2.children;
      var areValuesEqual = currentValue === value;
      if (areValuesEqual && leafIndex !== undefined) {
        return leafIndex;
      }
      if (areValuesEqual) {
        return _this7._getGroupIndexRecursively(children, id);
      }
      return prevIndex;
    }, 0);
  };
  _proto._getViewStartByOptions = function _getViewStartByOptions() {
    return (0, _base.getViewStartByOptions)(this.option('startDate'), this.option('currentDate'), this._getIntervalDuration(), this.option('startDate') ? this._calculateViewStartDate() : undefined);
  };
  _proto._getIntervalDuration = function _getIntervalDuration() {
    return this.viewDataProvider.getIntervalDuration(this.option('intervalCount'));
  };
  _proto._getHeaderDate = function _getHeaderDate() {
    return this.getStartViewDate();
  };
  _proto._calculateViewStartDate = function _calculateViewStartDate() {
    return (0, _base.calculateViewStartDate)(this.option('startDate'));
  };
  _proto._firstDayOfWeek = function _firstDayOfWeek() {
    return this.viewDataProvider.getFirstDayOfWeek(this.option('firstDayOfWeek'));
  };
  _proto._attachEvents = function _attachEvents() {
    this._createSelectionChangedAction();
    this._attachClickEvent();
    this._attachContextMenuEvent();
  };
  _proto._attachClickEvent = function _attachClickEvent() {
    var that = this;
    var pointerDownAction = this._createAction(function (e) {
      that._pointerDownHandler(e.event);
    });
    this._createCellClickAction();
    var cellSelector = ".".concat(DATE_TABLE_CELL_CLASS, ",.").concat(ALL_DAY_TABLE_CELL_CLASS);
    var $element = this.$element();
    _events_engine.default.off($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME);
    _events_engine.default.off($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME);
    _events_engine.default.on($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME, function (e) {
      if ((0, _index.isMouseEvent)(e) && e.which > 1) {
        e.preventDefault();
        return;
      }
      pointerDownAction({
        event: e
      });
    });
    _events_engine.default.on($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME, cellSelector, function (e) {
      var $cell = (0, _renderer.default)(e.target);
      that._cellClickAction({
        event: e,
        cellElement: (0, _element.getPublicElement)($cell),
        cellData: that.getCellData($cell)
      });
    });
  };
  _proto._createCellClickAction = function _createCellClickAction() {
    var _this8 = this;
    this._cellClickAction = this._createActionByOption('onCellClick', {
      afterExecute: function afterExecute(e) {
        return _this8._cellClickHandler(e.args[0].event);
      }
    });
  };
  _proto._createSelectionChangedAction = function _createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._cellClickHandler = function _cellClickHandler(argument) {
    if (this._showPopup) {
      delete this._showPopup;
      this._handleSelectedCellsClick();
    }
  };
  _proto._pointerDownHandler = function _pointerDownHandler(e) {
    var $target = (0, _renderer.default)(e.target);
    if (!$target.hasClass(DATE_TABLE_CELL_CLASS) && !$target.hasClass(ALL_DAY_TABLE_CELL_CLASS)) {
      this._isCellClick = false;
      return;
    }
    this._isCellClick = true;
    if ($target.hasClass(DATE_TABLE_FOCUSED_CELL_CLASS)) {
      this._showPopup = true;
    } else {
      var cellCoordinates = this._getCoordinatesByCell($target);
      var isAllDayCell = this._hasAllDayClass($target);
      this._setSelectedCellsStateAndUpdateSelection(isAllDayCell, cellCoordinates, false, $target);
    }
  };
  _proto._handleSelectedCellsClick = function _handleSelectedCellsClick() {
    var selectedCells = this.cellsSelectionState.getSelectedCells();
    var firstCellData = selectedCells[0];
    var lastCellData = selectedCells[selectedCells.length - 1];
    var result = {
      startDate: firstCellData.startDate,
      endDate: lastCellData.endDate
    };
    if (lastCellData.allDay !== undefined) {
      result.allDay = lastCellData.allDay;
    }
    this.option('onSelectedCellsClick')(result, lastCellData.groups);
  };
  _proto._attachContextMenuEvent = function _attachContextMenuEvent() {
    this._createContextMenuAction();
    var cellSelector = ".".concat(DATE_TABLE_CELL_CLASS, ",.").concat(ALL_DAY_TABLE_CELL_CLASS);
    var $element = this.$element();
    var eventName = (0, _index.addNamespace)(_contextmenu.name, this.NAME);
    _events_engine.default.off($element, eventName, cellSelector);
    _events_engine.default.on($element, eventName, cellSelector, this._contextMenuHandler.bind(this));
  };
  _proto._contextMenuHandler = function _contextMenuHandler(e) {
    var $cell = (0, _renderer.default)(e.target);
    this._contextMenuAction({
      event: e,
      cellElement: (0, _element.getPublicElement)($cell),
      cellData: this.getCellData($cell)
    });
    this._contextMenuHandled = true;
  };
  _proto._createContextMenuAction = function _createContextMenuAction() {
    this._contextMenuAction = this._createActionByOption('onCellContextMenu');
  };
  _proto._getGroupHeaderContainer = function _getGroupHeaderContainer() {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$groupTable;
    }
    return this._$thead;
  };
  _proto._getDateHeaderContainer = function _getDateHeaderContainer() {
    return this._$thead;
  };
  _proto._getCalculateHeaderCellRepeatCount = function _getCalculateHeaderCellRepeatCount() {
    return this._groupedStrategy.calculateHeaderCellRepeatCount();
  };
  _proto._updateScrollable = function _updateScrollable() {
    var _a, _b;
    this._dateTableScrollable.update();
    (_a = this._headerScrollable) === null || _a === void 0 ? void 0 : _a.update();
    (_b = this._sidebarScrollable) === null || _b === void 0 ? void 0 : _b.update();
  };
  _proto._getTimePanelRowCount = function _getTimePanelRowCount() {
    return this._getCellCountInDay();
  };
  _proto._getCellCountInDay = function _getCellCountInDay() {
    var hoursInterval = this.option('hoursInterval');
    var startDayHour = this.option('startDayHour');
    var endDayHour = this.option('endDayHour');
    return this.viewDataProvider.getCellCountInDay(startDayHour, endDayHour, hoursInterval);
  };
  _proto._getTotalCellCount = function _getTotalCellCount(groupCount) {
    return this._groupedStrategy.getTotalCellCount(groupCount);
  };
  _proto._getTotalRowCount = function _getTotalRowCount(groupCount, includeAllDayPanelRows) {
    var result = this._groupedStrategy.getTotalRowCount(groupCount);
    if (includeAllDayPanelRows && this.isAllDayPanelVisible) {
      result += groupCount;
    }
    return result;
  };
  _proto._getGroupIndex = function _getGroupIndex(rowIndex, columnIndex) {
    return this._groupedStrategy.getGroupIndex(rowIndex, columnIndex);
  };
  _proto.calculateEndDate = function calculateEndDate(startDate) {
    var viewDataGenerator = this.viewDataProvider.viewDataGenerator;
    return viewDataGenerator.calculateEndDate(startDate, viewDataGenerator.getInterval(this.option('hoursInterval')), this.option('endDayHour'));
  };
  _proto._getGroupCount = function _getGroupCount() {
    return (0, _m_utils2.getGroupCount)(this.option('groups'));
  };
  _proto._attachTablesEvents = function _attachTablesEvents() {
    var element = this.$element();
    this._attachDragEvents(element);
    this._attachPointerEvents(element);
  };
  _proto._detachDragEvents = function _detachDragEvents(element) {
    _events_engine.default.off(element, DragEventNames.ENTER);
    _events_engine.default.off(element, DragEventNames.LEAVE);
    _events_engine.default.off(element, DragEventNames.DROP);
  };
  _proto._attachDragEvents = function _attachDragEvents(element) {
    var _this9 = this;
    this._detachDragEvents(element);
    var onDragEnter = function onDragEnter(e) {
      if (!_this9.preventDefaultDragging) {
        _this9.removeDroppableCellClass();
        (0, _renderer.default)(e.target).addClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
      }
    };
    var removeClasses = function removeClasses() {
      if (!_this9.preventDefaultDragging) {
        _this9.removeDroppableCellClass();
      }
    };
    var onCheckDropTarget = function onCheckDropTarget(target, event) {
      return !_this9._isOutsideScrollable(target, event);
    };
    _events_engine.default.on(element, DragEventNames.ENTER, DRAG_AND_DROP_SELECTOR, {
      checkDropTarget: onCheckDropTarget
    }, onDragEnter);
    _events_engine.default.on(element, DragEventNames.LEAVE, removeClasses);
    _events_engine.default.on(element, DragEventNames.DROP, DRAG_AND_DROP_SELECTOR, function () {
      var _a, _b;
      if (!_this9.dragBehavior) {
        return;
      }
      if (!((_a = _this9.dragBehavior) === null || _a === void 0 ? void 0 : _a.dragBetweenComponentsPromise)) {
        _this9.dragBehavior.removeDroppableClasses();
        return;
      }
      (_b = _this9.dragBehavior.dragBetweenComponentsPromise) === null || _b === void 0 ? void 0 : _b.then(function () {
        _this9.dragBehavior.removeDroppableClasses();
      });
    });
  };
  _proto._attachPointerEvents = function _attachPointerEvents(element) {
    var _this10 = this;
    var isPointerDown = false;
    _events_engine.default.off(element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME);
    _events_engine.default.off(element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME);
    _events_engine.default.on(element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME, DRAG_AND_DROP_SELECTOR, function (e) {
      if ((0, _index.isMouseEvent)(e) && e.which === 1) {
        isPointerDown = true;
        _this10.$element().addClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);
        _events_engine.default.off(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);
        _events_engine.default.on(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME, function () {
          isPointerDown = false;
          _this10.$element().removeClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);
        });
      }
    });
    _events_engine.default.on(element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME, DRAG_AND_DROP_SELECTOR, function (e) {
      if (isPointerDown && _this10._dateTableScrollable && !_this10._dateTableScrollable.option('scrollByContent')) {
        e.preventDefault();
        e.stopPropagation();
        _this10._moveToCell((0, _renderer.default)(e.target), true);
      }
    });
  };
  _proto._getFormat = function _getFormat() {
    return abstract();
  };
  _proto.getWorkArea = function getWorkArea() {
    return this._$dateTableContainer;
  };
  _proto.getScrollable = function getScrollable() {
    return this._dateTableScrollable;
  };
  _proto.getScrollableScrollTop = function getScrollableScrollTop() {
    return this._dateTableScrollable.scrollTop();
  };
  _proto.getGroupedScrollableScrollTop = function getGroupedScrollableScrollTop(allDay) {
    return this._groupedStrategy.getScrollableScrollTop(allDay);
  };
  _proto.getScrollableScrollLeft = function getScrollableScrollLeft() {
    return this._dateTableScrollable.scrollLeft();
  };
  _proto.getScrollableOuterWidth = function getScrollableOuterWidth() {
    return this._dateTableScrollable.scrollWidth();
  };
  _proto.getScrollableContainer = function getScrollableContainer() {
    return (0, _renderer.default)(this._dateTableScrollable.container());
  };
  _proto.getHeaderPanelHeight = function getHeaderPanelHeight() {
    return this._$headerPanel && (0, _size.getOuterHeight)(this._$headerPanel, true);
  };
  _proto.getTimePanelWidth = function getTimePanelWidth() {
    return this._$timePanel && (0, _position.getBoundingRect)(this._$timePanel.get(0)).width;
  };
  _proto.getGroupTableWidth = function getGroupTableWidth() {
    return this._$groupTable ? (0, _size.getOuterWidth)(this._$groupTable) : 0;
  };
  _proto.getWorkSpaceLeftOffset = function getWorkSpaceLeftOffset() {
    return this._groupedStrategy.getLeftOffset();
  };
  _proto._getCellCoordinatesByIndex = function _getCellCoordinatesByIndex(index) {
    var columnIndex = Math.floor(index / this._getRowCount());
    var rowIndex = index - this._getRowCount() * columnIndex;
    return {
      columnIndex,
      rowIndex
    };
  }
  // TODO: necessary for old render
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getDateGenerationOptions = function _getDateGenerationOptions() {
    var isOldRender = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var _a;
    return {
      startDayHour: this.option('startDayHour'),
      endDayHour: this.option('endDayHour'),
      isWorkView: this.viewDataProvider.viewDataGenerator.isWorkView,
      interval: (_a = this.viewDataProvider.viewDataGenerator) === null || _a === void 0 ? void 0 : _a.getInterval(this.option('hoursInterval')),
      startViewDate: this.getStartViewDate(),
      firstDayOfWeek: this._firstDayOfWeek()
    };
  }
  // TODO: refactor current time indicator
  ;
  _proto._getIntervalBetween = function _getIntervalBetween(currentDate, allDay) {
    var firstViewDate = this.getStartViewDate();
    var startDayTime = this.option('startDayHour') * HOUR_MS;
    var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
    var fullInterval = currentDate.getTime() - firstViewDate.getTime() - timeZoneOffset;
    var days = this._getDaysOfInterval(fullInterval, startDayTime);
    var weekendsCount = this._getWeekendsCount(days);
    var result = (days - weekendsCount) * DAY_MS;
    if (!allDay) {
      var hiddenInterval = this.viewDataProvider.hiddenInterval;
      var visibleDayDuration = this.getVisibleDayDuration();
      result = fullInterval - days * hiddenInterval - weekendsCount * visibleDayDuration;
    }
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._getWeekendsCount = function _getWeekendsCount(argument) {
    return 0;
  };
  _proto._getDaysOfInterval = function _getDaysOfInterval(fullInterval, startDayTime) {
    return Math.floor((fullInterval + startDayTime) / DAY_MS);
  };
  _proto._updateIndex = function _updateIndex(index) {
    return index * this._getRowCount();
  };
  _proto._getDroppableCell = function _getDroppableCell() {
    return this._getDateTables().find(".".concat(DATE_TABLE_DROPPABLE_CELL_CLASS));
  };
  _proto._getWorkSpaceWidth = function _getWorkSpaceWidth() {
    var _this11 = this;
    return this.cache.get('workspaceWidth', function () {
      if (_this11._needCreateCrossScrolling()) {
        return (0, _position.getBoundingRect)(_this11._$dateTable.get(0)).width;
      }
      var totalWidth = (0, _position.getBoundingRect)(_this11.$element().get(0)).width;
      var timePanelWidth = _this11.getTimePanelWidth();
      var groupTableWidth = _this11.getGroupTableWidth();
      return totalWidth - timePanelWidth - groupTableWidth;
    });
  };
  _proto._getCellByCoordinates = function _getCellByCoordinates(cellCoordinates, groupIndex, inAllDayRow) {
    var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow);
    return this._dom_getDateCell(indexes);
  }
  // TODO DOM adapter
  ;
  _proto._dom_getDateCell = function _dom_getDateCell(position) {
    return this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).eq(position.rowIndex).find("td:not(.".concat(_m_classes.VIRTUAL_CELL_CLASS, ")")).eq(position.columnIndex);
  };
  _proto._dom_getAllDayPanelCell = function _dom_getAllDayPanelCell(columnIndex) {
    return this._$allDayPanel.find('tr').eq(0).find('td').eq(columnIndex);
  };
  _proto._getCells = function _getCells(allDay, direction) {
    var cellClass = allDay ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;
    if (direction === 'vertical') {
      var result = [];
      for (var i = 1;; i++) {
        var cells = this.$element().find("tr .".concat(cellClass, ":nth-child(").concat(i, ")"));
        if (!cells.length) break;
        result = result.concat(cells.toArray());
      }
      return (0, _renderer.default)(result);
    }
    return this.$element().find(".".concat(cellClass));
  };
  _proto._getFirstAndLastDataTableCell = function _getFirstAndLastDataTableCell() {
    var selector = this.isVirtualScrolling() ? ".".concat(DATE_TABLE_CELL_CLASS, ", .").concat(_m_classes.VIRTUAL_CELL_CLASS) : ".".concat(DATE_TABLE_CELL_CLASS);
    var $cells = this.$element().find(selector);
    return [$cells[0], $cells[$cells.length - 1]];
  };
  _proto._getAllCells = function _getAllCells(allDay) {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$dateTable.find("td:not(.".concat(_m_classes.VIRTUAL_CELL_CLASS, ")"));
    }
    var cellClass = allDay && this.supportAllDayRow() ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;
    return this.$element().find(".".concat(cellClass));
  };
  _proto._setHorizontalGroupHeaderCellsHeight = function _setHorizontalGroupHeaderCellsHeight() {
    var _getBoundingRect = (0, _position.getBoundingRect)(this._$dateTable.get(0)),
      height = _getBoundingRect.height;
    (0, _size.setOuterHeight)(this._$groupTable, height);
  };
  _proto._getGroupHeaderCells = function _getGroupHeaderCells() {
    return this.$element().find(".".concat(GROUP_HEADER_CLASS));
  };
  _proto._getScrollCoordinates = function _getScrollCoordinates(hours, minutes, date, groupIndex, allDay) {
    var currentDate = date || new Date(this.option('currentDate'));
    var startDayHour = this.option('startDayHour');
    var endDayHour = this.option('endDayHour');
    if (hours < startDayHour) {
      hours = startDayHour;
    }
    if (hours >= endDayHour) {
      hours = endDayHour - 1;
    }
    currentDate.setHours(hours, minutes, 0, 0);
    var cell = this.viewDataProvider.findGlobalCellPosition(currentDate, groupIndex, allDay);
    var position = cell.position,
      cellData = cell.cellData;
    return this.virtualScrollingDispatcher.calculateCoordinatesByDataAndPosition(cellData, position, currentDate, (0, _base.isDateAndTimeView)(this.type), this.viewDirection === 'vertical');
  };
  _proto._isOutsideScrollable = function _isOutsideScrollable(target, event) {
    var $dateTableScrollableElement = this._dateTableScrollable.$element();
    var scrollableSize = (0, _position.getBoundingRect)($dateTableScrollableElement.get(0));
    var window = (0, _window.getWindow)();
    var isTargetInAllDayPanel = !(0, _renderer.default)(target).closest($dateTableScrollableElement).length;
    var isOutsideHorizontalScrollable = event.pageX < scrollableSize.left || event.pageX > scrollableSize.left + scrollableSize.width + (window.scrollX || 0);
    var isOutsideVerticalScrollable = event.pageY < scrollableSize.top || event.pageY > scrollableSize.top + scrollableSize.height + (window.scrollY || 0);
    if (isTargetInAllDayPanel && !isOutsideHorizontalScrollable) {
      return false;
    }
    return isOutsideVerticalScrollable || isOutsideHorizontalScrollable;
  };
  _proto.setCellDataCache = function setCellDataCache(cellCoordinates, groupIndex, $cell) {
    var key = JSON.stringify({
      rowIndex: cellCoordinates.rowIndex,
      columnIndex: cellCoordinates.columnIndex,
      groupIndex
    });
    this.cache.set(key, this.getCellData($cell));
  };
  _proto.setCellDataCacheAlias = function setCellDataCacheAlias(appointment, geometry) {
    var key = JSON.stringify({
      rowIndex: appointment.rowIndex,
      columnIndex: appointment.columnIndex,
      groupIndex: appointment.groupIndex
    });
    var aliasKey = JSON.stringify({
      top: geometry.top,
      left: geometry.left
    });
    this.cache.set(aliasKey, this.cache.get(key));
  };
  _proto.supportAllDayRow = function supportAllDayRow() {
    return true;
  };
  _proto.keepOriginalHours = function keepOriginalHours() {
    return false;
  };
  _proto._filterCellDataFields = function _filterCellDataFields(cellData) {
    return (0, _extend.extend)(true, {}, {
      startDate: cellData.startDate,
      endDate: cellData.endDate,
      groups: cellData.groups,
      groupIndex: cellData.groupIndex,
      allDay: cellData.allDay
    });
  };
  _proto.getCellData = function getCellData($cell) {
    var cellData = this._getFullCellData($cell) || {};
    return this._filterCellDataFields(cellData);
  };
  _proto._getFullCellData = function _getFullCellData($cell) {
    var currentCell = $cell[0];
    if (currentCell) {
      return this._getDataByCell($cell);
    }
    return undefined;
  };
  _proto._getVirtualRowOffset = function _getVirtualRowOffset() {
    return this.virtualScrollingDispatcher.virtualRowOffset;
  };
  _proto._getVirtualCellOffset = function _getVirtualCellOffset() {
    return this.virtualScrollingDispatcher.virtualCellOffset;
  };
  _proto._getDataByCell = function _getDataByCell($cell) {
    var rowIndex = $cell.parent().index() - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var columnIndex = $cell.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var viewDataProvider = this.viewDataProvider;
    var isAllDayCell = this._hasAllDayClass($cell);
    var cellData = viewDataProvider.getCellData(rowIndex, columnIndex, isAllDayCell);
    return cellData || undefined;
  };
  _proto.isGroupedByDate = function isGroupedByDate() {
    return this.option('groupByDate') && this._isHorizontalGroupedWorkSpace() && this._getGroupCount() > 0;
  }
  // TODO: refactor current time indicator
  ;
  _proto.getCellIndexByDate = function getCellIndexByDate(date, inAllDayRow) {
    var viewDataGenerator = this.viewDataProvider.viewDataGenerator;
    var timeInterval = inAllDayRow ? 24 * 60 * 60 * 1000 : viewDataGenerator.getInterval(this.option('hoursInterval'));
    var startViewDateOffset = (0, _base.getStartViewDateTimeOffset)(this.getStartViewDate(), this.option('startDayHour'));
    var dateTimeStamp = this._getIntervalBetween(date, inAllDayRow) + startViewDateOffset;
    var index = Math.floor(dateTimeStamp / timeInterval);
    if (inAllDayRow) {
      index = this._updateIndex(index);
    }
    if (index < 0) {
      index = 0;
    }
    return index;
  };
  _proto.getDroppableCellIndex = function getDroppableCellIndex() {
    var $droppableCell = this._getDroppableCell();
    var $row = $droppableCell.parent();
    var rowIndex = $row.index();
    return rowIndex * $row.find('td').length + $droppableCell.index();
  };
  _proto.getDataByDroppableCell = function getDataByDroppableCell() {
    var cellData = this.getCellData((0, _renderer.default)(this._getDroppableCell()));
    var allDay = cellData.allDay;
    var startDate = cellData.startDate;
    var endDate = cellData.endDate;
    return {
      startDate,
      endDate,
      allDay,
      groups: cellData.groups
    };
  };
  _proto.getDateRange = function getDateRange() {
    return [this.getStartViewDate(), this.getEndViewDateByEndDayHour()];
  };
  _proto.getCellMinWidth = function getCellMinWidth() {
    return DATE_TABLE_MIN_CELL_WIDTH;
  };
  _proto.getRoundedCellWidth = function getRoundedCellWidth(groupIndex, startIndex, cellCount) {
    if (groupIndex < 0 || !(0, _window.hasWindow)()) {
      return 0;
    }
    var $row = this.$element().find(".".concat(_m_classes.DATE_TABLE_ROW_CLASS)).eq(0);
    var width = 0;
    var $cells = $row.find(".".concat(DATE_TABLE_CELL_CLASS));
    var totalCellCount = this._getCellCount() * groupIndex;
    cellCount = cellCount || this._getCellCount();
    if (!(0, _type.isDefined)(startIndex)) {
      startIndex = totalCellCount;
    }
    for (var i = startIndex; i < totalCellCount + cellCount; i++) {
      var element = (0, _renderer.default)($cells).eq(i).get(0);
      var elementWidth = element ? (0, _position.getBoundingRect)(element).width : 0;
      width += elementWidth;
    }
    return width / (totalCellCount + cellCount - startIndex);
  }
  // Mappings
  ;
  _proto.getCellWidth = function getCellWidth() {
    return (0, _m_position_helper.getCellWidth)(this.getDOMElementsMetaData());
  };
  _proto.getCellHeight = function getCellHeight() {
    return (0, _m_position_helper.getCellHeight)(this.getDOMElementsMetaData());
  };
  _proto.getAllDayHeight = function getAllDayHeight() {
    return (0, _m_position_helper.getAllDayHeight)(this.option('showAllDayPanel'), this._isVerticalGroupedWorkSpace(), this.getDOMElementsMetaData());
  };
  _proto.getMaxAllowedPosition = function getMaxAllowedPosition(groupIndex) {
    return (0, _m_position_helper.getMaxAllowedPosition)(groupIndex, this.viewDataProvider, this.option('rtlEnabled'), this.getDOMElementsMetaData());
  };
  _proto.getAllDayOffset = function getAllDayOffset() {
    return this._groupedStrategy.getAllDayOffset();
  }
  // NOTE: refactor leftIndex calculation
  ;
  _proto.getCellIndexByCoordinates = function getCellIndexByCoordinates(coordinates, allDay) {
    var cellCount = this._getTotalCellCount(this._getGroupCount());
    var cellWidth = this.getCellWidth();
    var cellHeight = allDay ? this.getAllDayHeight() : this.getCellHeight();
    var topIndex = Math.floor(Math.floor(coordinates.top) / Math.floor(cellHeight));
    var leftIndex = coordinates.left / cellWidth;
    leftIndex = Math.floor(leftIndex + CELL_INDEX_CALCULATION_EPSILON);
    if (this._isRTL()) {
      leftIndex = cellCount - leftIndex - 1;
    }
    return cellCount * topIndex + leftIndex;
  };
  _proto.getStartViewDate = function getStartViewDate() {
    return this.viewDataProvider.getStartViewDate();
  };
  _proto.getEndViewDate = function getEndViewDate() {
    return this.viewDataProvider.getLastCellEndDate();
  };
  _proto.getEndViewDateByEndDayHour = function getEndViewDateByEndDayHour() {
    return this.viewDataProvider.getLastViewDateByEndDayHour(this.option('endDayHour'));
  };
  _proto.getCellDuration = function getCellDuration() {
    return (0, _base.getCellDuration)(this.type, this.option('startDayHour'), this.option('endDayHour'), this.option('hoursInterval'));
  };
  _proto.getIntervalDuration = function getIntervalDuration(allDay) {
    return allDay ? toMs('day') : this.getCellDuration();
  };
  _proto.getVisibleDayDuration = function getVisibleDayDuration() {
    var startDayHour = this.option('startDayHour');
    var endDayHour = this.option('endDayHour');
    var hoursInterval = this.option('hoursInterval');
    return this.viewDataProvider.getVisibleDayDuration(startDayHour, endDayHour, hoursInterval);
  };
  _proto.getGroupBounds = function getGroupBounds(coordinates) {
    var groupBounds = this._groupedStrategy instanceof _m_work_space_grouped_strategy_vertical.default ? this.getGroupBoundsVertical(coordinates.groupIndex) : this.getGroupBoundsHorizontal(coordinates);
    return this._isRTL() ? this.getGroupBoundsRtlCorrection(groupBounds) : groupBounds;
  };
  _proto.getGroupBoundsVertical = function getGroupBoundsVertical(groupIndex) {
    var $firstAndLastCells = this._getFirstAndLastDataTableCell();
    return this._groupedStrategy.getGroupBoundsOffset(groupIndex, $firstAndLastCells);
  };
  _proto.getGroupBoundsHorizontal = function getGroupBoundsHorizontal(coordinates) {
    var cellCount = this._getCellCount();
    var $cells = this._getCells();
    var cellWidth = this.getCellWidth();
    var groupedDataMap = this.viewDataProvider.groupedDataMap;
    return this._groupedStrategy.getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates, groupedDataMap);
  };
  _proto.getGroupBoundsRtlCorrection = function getGroupBoundsRtlCorrection(groupBounds) {
    var cellWidth = this.getCellWidth();
    return _extends(_extends({}, groupBounds), {
      left: groupBounds.right - cellWidth * 2,
      right: groupBounds.left + cellWidth * 2
    });
  };
  _proto.needRecalculateResizableArea = function needRecalculateResizableArea() {
    return this._isVerticalGroupedWorkSpace() && this.getScrollable().scrollTop() !== 0;
  };
  _proto.getCellDataByCoordinates = function getCellDataByCoordinates(coordinates, allDay) {
    var _this12 = this;
    var key = JSON.stringify({
      top: coordinates.top,
      left: coordinates.left
    });
    return this.cache.get(key, function () {
      var $cells = _this12._getCells(allDay);
      var cellIndex = _this12.getCellIndexByCoordinates(coordinates, allDay);
      var $cell = $cells.eq(cellIndex);
      return _this12.getCellData($cell);
    });
  };
  _proto.getVisibleBounds = function getVisibleBounds() {
    var result = {};
    var $scrollable = this.getScrollable().$element();
    var cellHeight = this.getCellHeight();
    var scrolledCellCount = this.getScrollableScrollTop() / cellHeight;
    var totalCellCount = scrolledCellCount + (0, _size.getHeight)($scrollable) / cellHeight;
    result.top = {
      hours: Math.floor(scrolledCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
      minutes: scrolledCellCount % 2 ? 30 : 0
    };
    result.bottom = {
      hours: Math.floor(totalCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
      minutes: Math.floor(totalCellCount) % 2 ? 30 : 0
    };
    return result;
  };
  _proto.updateScrollPosition = function updateScrollPosition(date, groups) {
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var newDate = this.timeZoneCalculator.createDate(date, {
      path: 'toGrid'
    });
    var inAllDayRow = allDay && this.isAllDayPanelVisible;
    if (this.needUpdateScrollPosition(newDate, groups, inAllDayRow)) {
      this.scrollTo(newDate, groups, inAllDayRow, false);
    }
  };
  _proto.needUpdateScrollPosition = function needUpdateScrollPosition(date, groups, inAllDayRow) {
    var _this13 = this;
    var cells = this._getCellsInViewport(inAllDayRow);
    var groupIndex = this._isGroupsSpecified(groups) ? this._getGroupIndexByResourceId(groups) : 0;
    var time = date.getTime();
    var trimmedTime = _date.default.trimTime(date).getTime();
    return cells.reduce(function (currentResult, cell) {
      var _this13$getCellData = _this13.getCellData(cell),
        cellStartDate = _this13$getCellData.startDate,
        cellEndDate = _this13$getCellData.endDate,
        cellGroupIndex = _this13$getCellData.groupIndex;
      var cellStartTime = cellStartDate.getTime();
      var cellEndTime = cellEndDate.getTime();
      if ((!inAllDayRow && cellStartTime <= time && time < cellEndTime || inAllDayRow && trimmedTime === cellStartTime) && groupIndex === cellGroupIndex) {
        return false;
      }
      return currentResult;
    }, true);
  };
  _proto._getCellsInViewport = function _getCellsInViewport(inAllDayRow) {
    var $scrollable = this.getScrollable().$element();
    var cellHeight = this.getCellHeight();
    var cellWidth = this.getCellWidth();
    var totalColumnCount = this._getTotalCellCount(this._getGroupCount());
    var scrollableScrollTop = this.getScrollableScrollTop();
    var scrollableScrollLeft = this.getScrollableScrollLeft();
    var fullScrolledRowCount = scrollableScrollTop / cellHeight - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var scrolledRowCount = Math.floor(fullScrolledRowCount);
    if (scrollableScrollTop % cellHeight !== 0) {
      scrolledRowCount += 1;
    }
    // TODO horizontal v-scrolling
    var fullScrolledColumnCount = scrollableScrollLeft / cellWidth;
    var scrolledColumnCount = Math.floor(fullScrolledColumnCount);
    if (scrollableScrollLeft % cellWidth !== 0) {
      scrolledColumnCount += 1;
    }
    var rowCount = Math.floor(fullScrolledRowCount + (0, _size.getHeight)($scrollable) / cellHeight);
    var columnCount = Math.floor(fullScrolledColumnCount + (0, _size.getWidth)($scrollable) / cellWidth);
    var $cells = this._getAllCells(inAllDayRow);
    var result = [];
    $cells.each(function (index) {
      var $cell = (0, _renderer.default)(this);
      var columnIndex = index % totalColumnCount;
      var rowIndex = index / totalColumnCount;
      if (scrolledColumnCount <= columnIndex && columnIndex < columnCount && scrolledRowCount <= rowIndex && rowIndex < rowCount) {
        result.push($cell);
      }
    });
    return result;
  };
  _proto.scrollToTime = function scrollToTime(hours, minutes, date) {
    if (!this._isValidScrollDate(date)) {
      return;
    }
    var coordinates = this._getScrollCoordinates(hours, minutes, date);
    var scrollable = this.getScrollable();
    scrollable.scrollBy({
      top: coordinates.top - scrollable.scrollTop(),
      left: 0
    });
  };
  _proto.scrollTo = function scrollTo(date, groups) {
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var throwWarning = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (!this._isValidScrollDate(date, throwWarning)) {
      return;
    }
    var groupIndex = this._getGroupCount() && groups ? this._getGroupIndexByResourceId(groups) : 0;
    var isScrollToAllDay = allDay && this.isAllDayPanelVisible;
    var coordinates = this._getScrollCoordinates(date.getHours(), date.getMinutes(), date, groupIndex, isScrollToAllDay);
    var scrollable = this.getScrollable();
    var $scrollable = scrollable.$element();
    var cellWidth = this.getCellWidth();
    var offset = this.option('rtlEnabled') ? cellWidth : 0;
    var scrollableHeight = (0, _size.getHeight)($scrollable);
    var scrollableWidth = (0, _size.getWidth)($scrollable);
    var cellHeight = this.getCellHeight();
    var xShift = (scrollableWidth - cellWidth) / 2;
    var yShift = (scrollableHeight - cellHeight) / 2;
    var left = coordinates.left - scrollable.scrollLeft() - xShift - offset;
    var top = coordinates.top - scrollable.scrollTop() - yShift;
    if (isScrollToAllDay && !this._isVerticalGroupedWorkSpace()) {
      top = 0;
    }
    if (this.option('templatesRenderAsynchronously')) {
      setTimeout(function () {
        scrollable.scrollBy({
          left,
          top
        });
      });
    } else {
      scrollable.scrollBy({
        left,
        top
      });
    }
  };
  _proto._isValidScrollDate = function _isValidScrollDate(date) {
    var throwWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var min = this.getStartViewDate();
    var max = this.getEndViewDate();
    if (date < min || date > max) {
      throwWarning && _ui2.default.log('W1008', date);
      return false;
    }
    return true;
  };
  _proto.needApplyCollectorOffset = function needApplyCollectorOffset() {
    return false;
  };
  _proto.removeDroppableCellClass = function removeDroppableCellClass($cellElement) {
    var $cell = $cellElement || this._getDroppableCell();
    $cell === null || $cell === void 0 ? void 0 : $cell.removeClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
  };
  _proto._getCoordinatesByCell = function _getCoordinatesByCell($cell) {
    var columnIndex = $cell.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var rowIndex = $cell.parent().index();
    var isAllDayCell = this._hasAllDayClass($cell);
    var isVerticalGrouping = this._isVerticalGroupedWorkSpace();
    if (!(isAllDayCell && !isVerticalGrouping)) {
      rowIndex -= this.virtualScrollingDispatcher.topVirtualRowsCount;
    }
    return {
      rowIndex,
      columnIndex
    };
  };
  _proto._isShowAllDayPanel = function _isShowAllDayPanel() {
    return this.option('showAllDayPanel');
  };
  _proto._getTimePanelCells = function _getTimePanelCells() {
    return this.$element().find(".".concat(TIME_PANEL_CELL_CLASS));
  };
  _proto._getRDateTableProps = function _getRDateTableProps() {
    return {
      viewData: this.viewDataProvider.viewData,
      dataCellTemplate: this.option('dataCellTemplate'),
      addDateTableClass: !this.option('crossScrollingEnabled') || this.isVirtualScrolling(),
      groupOrientation: this.option('groupOrientation'),
      addVerticalSizesClassToRows: false
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto._updateSelectedCellDataOption = function _updateSelectedCellDataOption(selectedCellData, $nextFocusedCell) {
    var correctedSelectedCellData = selectedCellData.map(function (_ref3) {
      var startDate = _ref3.startDate,
        endDate = _ref3.endDate,
        allDay = _ref3.allDay,
        groupIndex = _ref3.groupIndex,
        groups = _ref3.groups;
      return {
        startDate,
        endDate,
        allDay,
        groupIndex,
        groups
      };
    });
    this.option('selectedCellData', correctedSelectedCellData);
    this._selectionChangedAction({
      selectedCellData: correctedSelectedCellData
    });
  };
  _proto._getCellByData = function _getCellByData(cellData) {
    var startDate = cellData.startDate,
      groupIndex = cellData.groupIndex,
      allDay = cellData.allDay,
      index = cellData.index;
    var position = this.viewDataProvider.findCellPositionInMap({
      startDate,
      groupIndex,
      isAllDay: allDay,
      index
    });
    if (!position) {
      return undefined;
    }
    return allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(position.columnIndex) : this._dom_getDateCell(position);
  }
  // Must replace all DOM manipulations
  ;
  _proto.getDOMElementsMetaData = function getDOMElementsMetaData() {
    var _this14 = this;
    return this.cache.get('cellElementsMeta', function () {
      return {
        dateTableCellsMeta: _this14._getDateTableDOMElementsInfo(),
        allDayPanelCellsMeta: _this14._getAllDayPanelDOMElementsInfo()
      };
    });
  };
  _proto._getDateTableDOMElementsInfo = function _getDateTableDOMElementsInfo() {
    var _this15 = this;
    var dateTableCells = this._getAllCells(false);
    if (!dateTableCells.length || !(0, _window.hasWindow)()) {
      return [[{}]];
    }
    var dateTable = this._getDateTable();
    // We should use getBoundingClientRect in renovation
    var dateTableRect = (0, _position.getBoundingRect)(dateTable.get(0));
    var columnsCount = this.viewDataProvider.getColumnsCount();
    var result = [];
    dateTableCells.each(function (index, cell) {
      var rowIndex = Math.floor(index / columnsCount);
      if (result.length === rowIndex) {
        result.push([]);
      }
      _this15._addCellMetaData(result[rowIndex], cell, dateTableRect);
    });
    return result;
  };
  _proto._getAllDayPanelDOMElementsInfo = function _getAllDayPanelDOMElementsInfo() {
    var _this16 = this;
    var result = [];
    if (this.isAllDayPanelVisible && !this._isVerticalGroupedWorkSpace() && (0, _window.hasWindow)()) {
      var allDayCells = this._getAllCells(true);
      if (!allDayCells.length) {
        return [{}];
      }
      var allDayAppointmentContainer = this._$allDayPanel;
      var allDayPanelRect = (0, _position.getBoundingRect)(allDayAppointmentContainer.get(0));
      allDayCells.each(function (_, cell) {
        _this16._addCellMetaData(result, cell, allDayPanelRect);
      });
    }
    return result;
  };
  _proto._addCellMetaData = function _addCellMetaData(cellMetaDataArray, cell, parentRect) {
    var cellRect = (0, _position.getBoundingRect)(cell);
    cellMetaDataArray.push({
      left: cellRect.left - parentRect.left,
      top: cellRect.top - parentRect.top,
      width: cellRect.width,
      height: cellRect.height
    });
  }
  // TODO: remove along with old render
  ;
  _proto._oldRender_getAllDayCellData = function _oldRender_getAllDayCellData(groupIndex) {
    var _this17 = this;
    return function (cell, rowIndex, columnIndex) {
      var validColumnIndex = columnIndex % _this17._getCellCount();
      var options = _this17._getDateGenerationOptions(true);
      var startDate = _this17.viewDataProvider.viewDataGenerator.getDateByCellIndices(options, rowIndex, validColumnIndex, _this17._getCellCountInDay());
      startDate = _date.default.trimTime(startDate);
      var validGroupIndex = groupIndex || 0;
      if (_this17.isGroupedByDate()) {
        validGroupIndex = Math.floor(columnIndex % _this17._getGroupCount());
      } else if (_this17._isHorizontalGroupedWorkSpace()) {
        validGroupIndex = Math.floor(columnIndex / _this17._getCellCount());
      }
      var data = {
        startDate,
        endDate: startDate,
        allDay: true,
        groupIndex: validGroupIndex
      };
      var groupsArray = (0, _m_utils2.getCellGroups)(validGroupIndex, _this17.option('groups'));
      if (groupsArray.length) {
        data.groups = (0, _m_utils2.getGroupsObjectFromGroupsArray)(groupsArray);
      }
      return {
        key: CELL_DATA,
        value: data
      };
    };
  }
  // ------------
  // Methods that render renovated components. Useless in renovation
  // ------------
  ;
  _proto.renderRWorkSpace = function renderRWorkSpace(componentsToRender) {
    var allComponents = {
      header: true,
      timePanel: true,
      dateTable: true,
      allDayPanel: true
    };
    var components = componentsToRender !== null && componentsToRender !== void 0 ? componentsToRender : allComponents;
    components.header && this.renderRHeaderPanel();
    components.timePanel && this.renderRTimeTable();
    components.dateTable && this.renderRDateTable();
    components.allDayPanel && this.renderRAllDayPanel();
  };
  _proto.renderRDateTable = function renderRDateTable() {
    _m_utils.utils.renovation.renderComponent(this, this._$dateTable, _layout.default, 'renovatedDateTable', this._getRDateTableProps());
  };
  _proto.renderRGroupPanel = function renderRGroupPanel() {
    var _a;
    var options = {
      groups: this.option('groups'),
      groupOrientation: this.option('groupOrientation'),
      groupByDate: this.isGroupedByDate(),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      className: this.verticalGroupTableClass,
      groupPanelData: this.viewDataProvider.getGroupPanelData(this.generateRenderOptions())
    };
    if ((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) {
      this._attachGroupCountClass();
      _m_utils.utils.renovation.renderComponent(this, this._getGroupHeaderContainer(), _group_panel.default, 'renovatedGroupPanel', options);
    } else {
      this._detachGroupCountClass();
    }
  };
  _proto.renderRAllDayPanel = function renderRAllDayPanel() {
    var _a;
    var visible = this.isAllDayPanelVisible && !this.isGroupedAllDayPanel();
    if (visible) {
      this._toggleAllDayVisibility(false);
      var options = _extends({
        viewData: this.viewDataProvider.viewData,
        dataCellTemplate: this.option('dataCellTemplate'),
        startCellIndex: 0
      }, ((_a = this.virtualScrollingDispatcher.horizontalVirtualScrolling) === null || _a === void 0 ? void 0 : _a.getRenderState()) || {});
      _m_utils.utils.renovation.renderComponent(this, this._$allDayTable, _table.default, 'renovatedAllDayPanel', options);
      _m_utils.utils.renovation.renderComponent(this, this._$allDayTitle, _title.default, 'renovatedAllDayPanelTitle', {});
    }
    this._toggleAllDayVisibility(true);
  };
  _proto.renderRTimeTable = function renderRTimeTable() {
    _m_utils.utils.renovation.renderComponent(this, this._$timePanel, _layout3.default, 'renovatedTimePanel', {
      timePanelData: this.viewDataProvider.timePanelData,
      timeCellTemplate: this.option('timeCellTemplate'),
      groupOrientation: this.option('groupOrientation')
    });
  };
  _proto.renderRHeaderPanel = function renderRHeaderPanel() {
    var isRenderDateHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var _a;
    if ((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) {
      this._attachGroupCountClass();
    } else {
      this._detachGroupCountClass();
    }
    _m_utils.utils.renovation.renderComponent(this, this._$thead, this.renovatedHeaderPanelComponent, 'renovatedHeaderPanel', {
      dateHeaderData: this.viewDataProvider.dateHeaderData,
      groupPanelData: this.viewDataProvider.getGroupPanelData(this.generateRenderOptions()),
      dateCellTemplate: this.option('dateCellTemplate'),
      timeCellTemplate: this.option('timeCellTemplate'),
      groups: this.option('groups'),
      groupByDate: this.isGroupedByDate(),
      groupOrientation: this.option('groupOrientation'),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      isRenderDateHeader
    });
  }
  // ------------
  // DnD should be removed from work-space
  // ------------
  ;
  _proto.initDragBehavior = function initDragBehavior(scheduler) {
    if (!this.dragBehavior && scheduler) {
      this.dragBehavior = new _m_appointment_drag_behavior.default(scheduler);
      var $rootElement = (0, _renderer.default)(scheduler.element());
      this._createDragBehavior(this.getWorkArea(), $rootElement);
      this._createDragBehavior(this._$allDayPanel, $rootElement);
    }
  };
  _proto._createDragBehavior = function _createDragBehavior($targetElement, $rootElement) {
    var getItemData = function getItemData(itemElement, appointments) {
      return appointments._getItemData(itemElement);
    };
    var getItemSettings = function getItemSettings($itemElement) {
      return $itemElement.data(_m_constants.APPOINTMENT_SETTINGS_KEY);
    };
    var options = {
      getItemData,
      getItemSettings
    };
    this._createDragBehaviorBase($targetElement, $rootElement, options);
  };
  _proto._createDragBehaviorBase = function _createDragBehaviorBase(targetElement, rootElement, options) {
    var _this18 = this;
    var container = this.$element().find(".".concat(_m_classes.FIXED_CONTAINER_CLASS));
    var disableDefaultDragging = function disableDefaultDragging() {
      if (!_this18.isDefaultDraggingMode) {
        _this18.preventDefaultDragging = true;
      }
    };
    var enableDefaultDragging = function enableDefaultDragging() {
      if (!_this18.isDefaultDraggingMode) {
        _this18.preventDefaultDragging = false;
      }
    };
    this.dragBehavior.addTo(targetElement, createDragBehaviorConfig(container, rootElement, this.isDefaultDraggingMode, this.dragBehavior, enableDefaultDragging, disableDefaultDragging, function () {
      return _this18._getDroppableCell();
    }, function () {
      return _this18._getDateTables();
    }, function () {
      return _this18.removeDroppableCellClass();
    }, function () {
      return _this18.getCellWidth();
    }, options));
  }
  // --------------
  // We do not need these methods in renovation
  // --------------
  ;
  _proto._isRenderHeaderPanelEmptyCell = function _isRenderHeaderPanelEmptyCell() {
    return this._isVerticalGroupedWorkSpace();
  };
  _proto._dispose = function _dispose() {
    // @ts-expect-error
    _WidgetObserver.prototype._dispose.call(this);
    this.virtualScrollingDispatcher.dispose();
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    // @ts-expect-error
    return (0, _extend.extend)(_WidgetObserver.prototype._getDefaultOptions.call(this), {
      currentDate: new Date(),
      intervalCount: 1,
      startDate: null,
      firstDayOfWeek: undefined,
      startDayHour: 0,
      endDayHour: 24,
      hoursInterval: 0.5,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      groups: [],
      showAllDayPanel: true,
      allDayExpanded: false,
      onCellClick: null,
      crossScrollingEnabled: false,
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      allowMultipleCellSelection: true,
      indicatorTime: new Date(),
      indicatorUpdateInterval: 5 * toMs('minute'),
      shadeUntilCurrentTime: true,
      groupOrientation: 'horizontal',
      selectedCellData: [],
      groupByDate: false,
      scrolling: {
        mode: 'standard'
      },
      allDayPanelMode: 'all',
      renovateRender: true,
      height: undefined,
      draggingMode: 'outlook',
      onScrollEnd: function onScrollEnd() {},
      getHeaderHeight: undefined,
      onRenderAppointments: function onRenderAppointments() {},
      onShowAllDayPanel: function onShowAllDayPanel() {},
      onSelectedCellsClick: function onSelectedCellsClick() {},
      timeZoneCalculator: undefined,
      schedulerHeight: undefined,
      schedulerWidth: undefined
    });
  };
  _proto._optionChanged = function _optionChanged(args) {
    switch (args.name) {
      case 'startDayHour':
        (0, _base.validateDayHours)(args.value, this.option('endDayHour'));
        this._cleanWorkSpace();
        break;
      case 'endDayHour':
        (0, _base.validateDayHours)(this.option('startDayHour'), args.value);
        this._cleanWorkSpace();
        break;
      case 'dateCellTemplate':
      case 'resourceCellTemplate':
      case 'dataCellTemplate':
      case 'timeCellTemplate':
      case 'hoursInterval':
      case 'firstDayOfWeek':
      case 'currentDate':
      case 'startDate':
        this._cleanWorkSpace();
        break;
      case 'groups':
        this._cleanView();
        this._removeAllDayElements();
        this._initGrouping();
        this.repaint();
        break;
      case 'groupOrientation':
        this._initGroupedStrategy();
        this._createAllDayPanelElements();
        this._removeAllDayElements();
        this._cleanWorkSpace();
        this._toggleGroupByDateClass();
        break;
      case 'showAllDayPanel':
        if (this._isVerticalGroupedWorkSpace()) {
          this._cleanView();
          this._removeAllDayElements();
          this._initGrouping();
          this.repaint();
        } else if (!this.isRenovatedRender()) {
          this._toggleAllDayVisibility(true);
        } else {
          this.renderWorkSpace();
        }
        break;
      case 'allDayExpanded':
        this._changeAllDayVisibility();
        this._attachTablesEvents();
        this._updateScrollable();
        break;
      case 'onSelectionChanged':
        this._createSelectionChangedAction();
        break;
      case 'onCellClick':
        this._createCellClickAction();
        break;
      case 'onCellContextMenu':
        this._attachContextMenuEvent();
        break;
      case 'intervalCount':
        this._cleanWorkSpace();
        this._toggleWorkSpaceCountClass();
        break;
      case 'groupByDate':
        this._cleanWorkSpace();
        this._toggleGroupByDateClass();
        break;
      case 'crossScrollingEnabled':
        this._toggleHorizontalScrollClass();
        this._dateTableScrollable.option(this._dateTableScrollableConfig());
        break;
      case 'allDayPanelMode':
        this.updateShowAllDayPanel();
        this.updateAppointments();
        break;
      case 'width':
        // @ts-expect-error
        _WidgetObserver.prototype._optionChanged.call(this, args);
        this._dimensionChanged();
        break;
      case 'timeZoneCalculator':
      case 'allowMultipleCellSelection':
        break;
      case 'selectedCellData':
        break;
      case 'renovateRender':
      case 'scrolling':
        this.repaint();
        break;
      case 'schedulerHeight':
      case 'schedulerWidth':
        this.virtualScrollingDispatcher.updateDimensions(true);
        break;
      default:
        // @ts-expect-error
        _WidgetObserver.prototype._optionChanged.call(this, args);
    }
  };
  _proto.updateShowAllDayPanel = function updateShowAllDayPanel() {
    var isHiddenAllDayPanel = this.option('allDayPanelMode') === 'hidden';
    this.option('onShowAllDayPanel')(!isHiddenAllDayPanel);
  };
  _proto._getVirtualScrollingDispatcherOptions = function _getVirtualScrollingDispatcherOptions() {
    var _this19 = this;
    return {
      getCellHeight: this.getCellHeight.bind(this),
      getCellWidth: this.getCellWidth.bind(this),
      getCellMinWidth: this.getCellMinWidth.bind(this),
      isRTL: this._isRTL.bind(this),
      getSchedulerHeight: function getSchedulerHeight() {
        return _this19.option('schedulerHeight');
      },
      getSchedulerWidth: function getSchedulerWidth() {
        return _this19.option('schedulerWidth');
      },
      getViewHeight: function getViewHeight() {
        return _this19.$element().height ? _this19.$element().height() : (0, _size.getHeight)(_this19.$element());
      },
      getViewWidth: function getViewWidth() {
        return _this19.$element().width ? _this19.$element().width() : (0, _size.getWidth)(_this19.$element());
      },
      getWindowHeight: function getWindowHeight() {
        return (0, _window.getWindow)().innerHeight;
      },
      getWindowWidth: function getWindowWidth() {
        return (0, _window.getWindow)().innerWidth;
      },
      getScrolling: function getScrolling() {
        return _this19.option('scrolling');
      },
      getScrollableOuterWidth: this.getScrollableOuterWidth.bind(this),
      getScrollable: this.getScrollable.bind(this),
      createAction: this._createAction.bind(this),
      updateRender: this.updateRender.bind(this),
      updateGrid: this.updateGrid.bind(this),
      getGroupCount: this._getGroupCount.bind(this),
      isVerticalGrouping: this._isVerticalGroupedWorkSpace.bind(this),
      getTotalRowCount: this._getTotalRowCount.bind(this),
      getTotalCellCount: this._getTotalCellCount.bind(this)
    };
  };
  _proto._cleanWorkSpace = function _cleanWorkSpace() {
    this._cleanView();
    this._toggleGroupedClass();
    this._toggleWorkSpaceWithOddCells();
    this.virtualScrollingDispatcher.updateDimensions(true);
    this._renderView();
    this.option('crossScrollingEnabled') && this._setTableSizes();
    this.cache.clear();
  };
  _proto._init = function _init() {
    this._scrollSync = {};
    this._viewDataProvider = null;
    this._cellsSelectionState = null;
    this._activeStateUnit = CELL_SELECTOR;
    // @ts-expect-error
    _WidgetObserver.prototype._init.call(this);
    this._initGrouping();
    this._toggleHorizontalScrollClass();
    this._toggleWorkSpaceCountClass();
    this._toggleGroupByDateClass();
    this._toggleWorkSpaceWithOddCells();
    this.$element().addClass(COMPONENT_CLASS).addClass(this._getElementClass());
  };
  _proto._initPositionHelper = function _initPositionHelper() {
    this.positionHelper = new _m_position_helper.PositionHelper({
      key: this.option('key'),
      viewDataProvider: this.viewDataProvider,
      viewStartDayHour: this.option('startDayHour'),
      viewEndDayHour: this.option('endDayHour'),
      cellDuration: this.getCellDuration(),
      groupedStrategy: this._groupedStrategy,
      isGroupedByDate: this.isGroupedByDate(),
      rtlEnabled: this.option('rtlEnabled'),
      startViewDate: this.getStartViewDate(),
      isVerticalGrouping: this._isVerticalGroupedWorkSpace(),
      groupCount: this._getGroupCount(),
      isVirtualScrolling: this.isVirtualScrolling(),
      getDOMMetaDataCallback: this.getDOMElementsMetaData.bind(this)
    });
  };
  _proto._initGrouping = function _initGrouping() {
    this._initGroupedStrategy();
    this._toggleGroupingDirectionClass();
    this._toggleGroupByDateClass();
  };
  _proto.isVerticalOrientation = function isVerticalOrientation() {
    var _a;
    var orientation = ((_a = this.option('groups')) === null || _a === void 0 ? void 0 : _a.length) ? this.option('groupOrientation') : this._getDefaultGroupStrategy();
    return orientation === 'vertical';
  };
  _proto._initGroupedStrategy = function _initGroupedStrategy() {
    var Strategy = this.isVerticalOrientation() ? _m_work_space_grouped_strategy_vertical.default : _m_work_space_grouped_strategy_horizontal.default;
    this._groupedStrategy = new Strategy(this);
  };
  _proto._getDefaultGroupStrategy = function _getDefaultGroupStrategy() {
    return 'horizontal';
  };
  _proto._toggleHorizontalScrollClass = function _toggleHorizontalScrollClass() {
    this.$element().toggleClass(WORKSPACE_WITH_BOTH_SCROLLS_CLASS, this.option('crossScrollingEnabled'));
  };
  _proto._toggleGroupByDateClass = function _toggleGroupByDateClass() {
    this.$element().toggleClass(WORKSPACE_WITH_GROUP_BY_DATE_CLASS, this.isGroupedByDate());
  };
  _proto._toggleWorkSpaceCountClass = function _toggleWorkSpaceCountClass() {
    this.$element().toggleClass(WORKSPACE_WITH_COUNT_CLASS, this._isWorkSpaceWithCount());
  };
  _proto._toggleWorkSpaceWithOddCells = function _toggleWorkSpaceWithOddCells() {
    this.$element().toggleClass(WORKSPACE_WITH_ODD_CELLS_CLASS, this._isWorkspaceWithOddCells());
  };
  _proto._toggleGroupingDirectionClass = function _toggleGroupingDirectionClass() {
    this.$element().toggleClass(VERTICAL_GROUPED_WORKSPACE_CLASS, this._isVerticalGroupedWorkSpace());
  };
  _proto._getDateTableCellClass = function _getDateTableCellClass(rowIndex, columnIndex) {
    var cellClass = "".concat(DATE_TABLE_CELL_CLASS, " ").concat(HORIZONTAL_SIZES_CLASS, " ").concat(VERTICAL_SIZES_CLASS);
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, columnIndex + 1, rowIndex, columnIndex);
  };
  _proto._getGroupHeaderClass = function _getGroupHeaderClass(i) {
    var cellClass = GROUP_HEADER_CLASS;
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1);
  };
  _proto._initWorkSpaceUnits = function _initWorkSpaceUnits() {
    this._$headerPanelContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-header-panel-container');
    this._$headerTablesContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-header-tables-container');
    this._$headerPanel = (0, _renderer.default)('<table>');
    this._$thead = (0, _renderer.default)('<thead>').appendTo(this._$headerPanel);
    this._$headerPanelEmptyCell = (0, _renderer.default)('<div>').addClass('dx-scheduler-header-panel-empty-cell');
    this._$allDayTable = (0, _renderer.default)('<table>');
    this._$fixedContainer = (0, _renderer.default)('<div>').addClass(_m_classes.FIXED_CONTAINER_CLASS);
    this._$allDayContainer = (0, _renderer.default)('<div>').addClass(ALL_DAY_CONTAINER_CLASS);
    this._$dateTableScrollableContent = (0, _renderer.default)('<div>').addClass('dx-scheduler-date-table-scrollable-content');
    this._$sidebarScrollableContent = (0, _renderer.default)('<div>').addClass('dx-scheduler-side-bar-scrollable-content');
    this._initAllDayPanelElements();
    if (this.isRenovatedRender()) {
      this.createRAllDayPanelElements();
    } else {
      this._createAllDayPanelElements();
    }
    this._$timePanel = (0, _renderer.default)('<table>').addClass(_m_classes.TIME_PANEL_CLASS);
    this._$dateTable = (0, _renderer.default)('<table>');
    this._$dateTableContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-date-table-container');
    this._$groupTable = (0, _renderer.default)('<div>').addClass(WORKSPACE_VERTICAL_GROUP_TABLE_CLASS);
  };
  _proto._initAllDayPanelElements = function _initAllDayPanelElements() {
    this._allDayTitles = [];
    this._allDayTables = [];
    this._allDayPanels = [];
  };
  _proto._initDateTableScrollable = function _initDateTableScrollable() {
    var _this20 = this;
    var $dateTableScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS);
    // @ts-expect-error
    this._dateTableScrollable = this._createComponent($dateTableScrollable, _ui.default, this._dateTableScrollableConfig());
    this._scrollSync.dateTable = (0, _getMemoizeScrollTo.getMemoizeScrollTo)(function () {
      return _this20._dateTableScrollable;
    });
  };
  _proto._createWorkSpaceElements = function _createWorkSpaceElements() {
    if (this.option('crossScrollingEnabled')) {
      this._createWorkSpaceScrollableElements();
    } else {
      this._createWorkSpaceStaticElements();
    }
  };
  _proto._createWorkSpaceStaticElements = function _createWorkSpaceStaticElements() {
    var _a;
    this._$dateTableContainer.append(this._$dateTable);
    if (this._isVerticalGroupedWorkSpace()) {
      this._$dateTableContainer.append(this._$allDayContainer);
      this._$dateTableScrollableContent.append(this._$groupTable, this._$timePanel, this._$dateTableContainer);
      this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
      this._$headerTablesContainer.append(this._$headerPanel);
    } else {
      this._$dateTableScrollableContent.append(this._$timePanel, this._$dateTableContainer);
      this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
      this._$headerTablesContainer.append(this._$headerPanel, this._$allDayPanel);
      (_a = this._$allDayPanel) === null || _a === void 0 ? void 0 : _a.append(this._$allDayContainer, this._$allDayTable);
    }
    this._appendHeaderPanelEmptyCellIfNecessary();
    this._$headerPanelContainer.append(this._$headerTablesContainer);
    this.$element().append(this._$fixedContainer, this._$headerPanelContainer, this._dateTableScrollable.$element());
  };
  _proto._createWorkSpaceScrollableElements = function _createWorkSpaceScrollableElements() {
    var _a;
    this.$element().append(this._$fixedContainer);
    this._$flexContainer = (0, _renderer.default)('<div>').addClass('dx-scheduler-work-space-flex-container');
    this._createHeaderScrollable();
    this._headerScrollable.$content().append(this._$headerPanel);
    this._appendHeaderPanelEmptyCellIfNecessary();
    this._$headerPanelContainer.append(this._$headerTablesContainer);
    this.$element().append(this._$headerPanelContainer);
    this.$element().append(this._$flexContainer);
    this._createSidebarScrollable();
    this._$flexContainer.append(this._dateTableScrollable.$element());
    this._$dateTableContainer.append(this._$dateTable);
    this._$dateTableScrollableContent.append(this._$dateTableContainer);
    this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
    if (this._isVerticalGroupedWorkSpace()) {
      this._$dateTableContainer.append(this._$allDayContainer);
      this._$sidebarScrollableContent.append(this._$groupTable, this._$timePanel);
    } else {
      this._headerScrollable.$content().append(this._$allDayPanel);
      (_a = this._$allDayPanel) === null || _a === void 0 ? void 0 : _a.append(this._$allDayContainer, this._$allDayTable);
      this._$sidebarScrollableContent.append(this._$timePanel);
    }
    this._sidebarScrollable.$content().append(this._$sidebarScrollableContent);
  };
  _proto._appendHeaderPanelEmptyCellIfNecessary = function _appendHeaderPanelEmptyCellIfNecessary() {
    this._isRenderHeaderPanelEmptyCell() && this._$headerPanelContainer.append(this._$headerPanelEmptyCell);
  };
  _proto._createHeaderScrollable = function _createHeaderScrollable() {
    var _this21 = this;
    var $headerScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_HEADER_SCROLLABLE_CLASS).appendTo(this._$headerTablesContainer);
    // @ts-expect-error
    this._headerScrollable = this._createComponent($headerScrollable, _ui.default, this._headerScrollableConfig());
    this._scrollSync.header = (0, _getMemoizeScrollTo.getMemoizeScrollTo)(function () {
      return _this21._headerScrollable;
    });
  };
  _proto._createSidebarScrollable = function _createSidebarScrollable() {
    var _this22 = this;
    var $timePanelScrollable = (0, _renderer.default)('<div>').addClass(SCHEDULER_SIDEBAR_SCROLLABLE_CLASS).appendTo(this._$flexContainer);
    // @ts-expect-error
    this._sidebarScrollable = this._createComponent($timePanelScrollable, _ui.default, {
      useKeyboard: false,
      showScrollbar: 'never',
      direction: 'vertical',
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: function onScroll(event) {
        _this22._scrollSync.dateTable({
          top: event.scrollOffset.top
        });
      }
    });
    this._scrollSync.sidebar = (0, _getMemoizeScrollTo.getMemoizeScrollTo)(function () {
      return _this22._sidebarScrollable;
    });
  };
  _proto._attachTableClasses = function _attachTableClasses() {
    this._addTableClass(this._$dateTable, _m_classes.DATE_TABLE_CLASS);
    if (this._isVerticalGroupedWorkSpace()) {
      var groupCount = this._getGroupCount();
      for (var i = 0; i < groupCount; i++) {
        this._addTableClass(this._allDayTables[i], ALL_DAY_TABLE_CLASS);
      }
    } else if (!this.isRenovatedRender()) {
      this._addTableClass(this._$allDayTable, ALL_DAY_TABLE_CLASS);
    }
  };
  _proto._attachHeaderTableClasses = function _attachHeaderTableClasses() {
    this._addTableClass(this._$headerPanel, HEADER_PANEL_CLASS);
  };
  _proto._addTableClass = function _addTableClass($el, className) {
    $el && !$el.hasClass(className) && $el.addClass(className);
  };
  _proto._initMarkup = function _initMarkup() {
    this.cache.clear();
    this._initWorkSpaceUnits();
    this._initVirtualScrolling();
    this._initDateTableScrollable();
    this._createWorkSpaceElements();
    // @ts-expect-error
    _WidgetObserver.prototype._initMarkup.call(this);
    if (!this.option('crossScrollingEnabled')) {
      this._attachTableClasses();
      this._attachHeaderTableClasses();
    }
    this._toggleGroupedClass();
    this._renderView();
    this._attachEvents();
  };
  _proto._render = function _render() {
    // @ts-expect-error
    _WidgetObserver.prototype._render.call(this);
    this._renderDateTimeIndication();
    this._setIndicationUpdateInterval();
  };
  _proto._toggleGroupedClass = function _toggleGroupedClass() {
    this.$element().toggleClass(GROUPED_WORKSPACE_CLASS, this._getGroupCount() > 0);
  };
  _proto._renderView = function _renderView() {
    if (this.isRenovatedRender()) {
      if (this._isVerticalGroupedWorkSpace()) {
        this.renderRGroupPanel();
      }
    } else {
      this._applyCellTemplates(this._renderGroupHeader());
    }
    this.renderWorkSpace();
    if (this.isRenovatedRender()) {
      this.virtualScrollingDispatcher.updateDimensions();
    }
    this._updateGroupTableHeight();
    this.updateHeaderEmptyCellWidth();
    this._shader = new _m_current_time_shader_vertical.default(this);
  };
  _proto.updateCellsSelection = function updateCellsSelection() {
    var renderOptions = this.generateRenderOptions();
    this.viewDataProvider.updateViewData(renderOptions);
    this.renderRWorkSpace({
      timePanel: true,
      dateTable: true,
      allDayPanel: true
    });
  };
  _proto._renderDateTimeIndication = function _renderDateTimeIndication() {
    return (0, _common.noop)();
  };
  _proto._setIndicationUpdateInterval = function _setIndicationUpdateInterval() {
    return (0, _common.noop)();
  };
  _proto._refreshDateTimeIndication = function _refreshDateTimeIndication() {
    return (0, _common.noop)();
  };
  _proto._detachGroupCountClass = function _detachGroupCountClass() {
    var _this23 = this;
    _toConsumableArray(_m_classes.VERTICAL_GROUP_COUNT_CLASSES).forEach(function (className) {
      _this23.$element().removeClass(className);
    });
  };
  _proto._attachGroupCountClass = function _attachGroupCountClass() {
    var className = this._groupedStrategy.getGroupCountClass(this.option('groups'));
    this.$element().addClass(className);
  };
  _proto._getDateHeaderTemplate = function _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  };
  _proto._toggleAllDayVisibility = function _toggleAllDayVisibility(isUpdateScrollable) {
    var showAllDayPanel = this._isShowAllDayPanel();
    this.$element().toggleClass(WORKSPACE_WITH_ALL_DAY_CLASS, showAllDayPanel);
    this._changeAllDayVisibility();
    isUpdateScrollable && this._updateScrollable();
  };
  _proto._changeAllDayVisibility = function _changeAllDayVisibility() {
    this.cache.clear();
    this.$element().toggleClass(WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS, !this.option('allDayExpanded') && this._isShowAllDayPanel());
  };
  _proto._getDateTables = function _getDateTables() {
    return this._$dateTable.add(this._$allDayTable);
  };
  _proto._getDateTable = function _getDateTable() {
    return this._$dateTable;
  };
  _proto._removeAllDayElements = function _removeAllDayElements() {
    this._$allDayTable && this._$allDayTable.remove();
    this._$allDayTitle && this._$allDayTitle.remove();
  };
  _proto._cleanView = function _cleanView() {
    var _a, _b, _c;
    this.cache.clear();
    this._cleanTableWidths();
    this.cellsSelectionState.clearSelectedAndFocusedCells();
    if (!this.isRenovatedRender()) {
      this._$thead.empty();
      this._$dateTable.empty();
      this._$timePanel.empty();
      this._$groupTable.empty();
      (_a = this._$allDayTable) === null || _a === void 0 ? void 0 : _a.empty();
      (_b = this._$sidebarTable) === null || _b === void 0 ? void 0 : _b.empty();
    }
    (_c = this._shader) === null || _c === void 0 ? void 0 : _c.clean();
    delete this._interval;
  };
  _proto._clean = function _clean() {
    _events_engine.default.off(_dom_adapter.default.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);
    this._disposeRenovatedComponents();
    // @ts-expect-error
    _WidgetObserver.prototype._clean.call(this);
  };
  _proto._cleanTableWidths = function _cleanTableWidths() {
    this._$headerPanel.css('width', '');
    this._$dateTable.css('width', '');
    this._$allDayTable && this._$allDayTable.css('width', '');
  };
  _proto._disposeRenovatedComponents = function _disposeRenovatedComponents() {
    var _a, _b, _c, _d, _e;
    (_a = this.renovatedAllDayPanel) === null || _a === void 0 ? void 0 : _a.dispose();
    this.renovatedAllDayPanel = undefined;
    (_b = this.renovatedDateTable) === null || _b === void 0 ? void 0 : _b.dispose();
    this.renovatedDateTable = undefined;
    (_c = this.renovatedTimePanel) === null || _c === void 0 ? void 0 : _c.dispose();
    this.renovatedTimePanel = undefined;
    (_d = this.renovatedGroupPanel) === null || _d === void 0 ? void 0 : _d.dispose();
    this.renovatedGroupPanel = undefined;
    (_e = this.renovatedHeaderPanel) === null || _e === void 0 ? void 0 : _e.dispose();
    this.renovatedHeaderPanel = undefined;
  };
  _proto.getGroupedStrategy = function getGroupedStrategy() {
    return this._groupedStrategy;
  };
  _proto.getFixedContainer = function getFixedContainer() {
    return this._$fixedContainer;
  };
  _proto.getAllDayContainer = function getAllDayContainer() {
    return this._$allDayContainer;
  };
  _proto.updateRender = function updateRender() {
    this.renderer.updateRender();
  };
  _proto.updateGrid = function updateGrid() {
    this.renderer._renderGrid();
  };
  _proto.updateAppointments = function updateAppointments() {
    var _a;
    this.option('onRenderAppointments')();
    (_a = this.dragBehavior) === null || _a === void 0 ? void 0 : _a.updateDragSource();
  }
  // ----------------
  // These methods should be deleted when we get rid of old render
  // ----------------
  ;
  _proto._createAllDayPanelElements = function _createAllDayPanelElements() {
    var groupCount = this._getGroupCount();
    if (this._isVerticalGroupedWorkSpace() && groupCount !== 0) {
      for (var i = 0; i < groupCount; i++) {
        var $allDayTitle = (0, _renderer.default)('<div>').addClass(ALL_DAY_TITLE_CLASS).text(_message.default.format('dxScheduler-allDay'));
        this._allDayTitles.push($allDayTitle);
        this._$allDayTable = (0, _renderer.default)('<table>');
        this._allDayTables.push(this._$allDayTable);
        this._$allDayPanel = (0, _renderer.default)('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);
        this._allDayPanels.push(this._$allDayPanel);
      }
    } else {
      this._$allDayTitle = (0, _renderer.default)('<div>').addClass(ALL_DAY_TITLE_CLASS).text(_message.default.format('dxScheduler-allDay')).appendTo(this.$element());
      this._$allDayTable = (0, _renderer.default)('<table>');
      this._$allDayPanel = (0, _renderer.default)('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);
    }
  };
  _proto.renderWorkSpace = function renderWorkSpace() {
    var isGenerateNewViewData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.cache.clear();
    this.viewDataProvider.update(this.generateRenderOptions(), isGenerateNewViewData);
    if (this.isRenovatedRender()) {
      this.renderRWorkSpace();
    } else {
      this._renderDateHeader();
      this._renderTimePanel();
      this._renderGroupAllDayPanel();
      this._renderDateTable();
      this._renderAllDayPanel();
    }
    this._initPositionHelper();
  };
  _proto._renderGroupHeader = function _renderGroupHeader() {
    var $container = this._getGroupHeaderContainer();
    var groupCount = this._getGroupCount();
    var cellTemplates = [];
    if (groupCount) {
      var groupRows = this._makeGroupRows(this.option('groups'), this.option('groupByDate'));
      this._attachGroupCountClass();
      $container.append(groupRows.elements);
      cellTemplates = groupRows.cellTemplates;
    } else {
      this._detachGroupCountClass();
    }
    return cellTemplates;
  };
  _proto._applyCellTemplates = function _applyCellTemplates(templates) {
    templates === null || templates === void 0 ? void 0 : templates.forEach(function (template) {
      template();
    });
  };
  _proto._makeGroupRows = function _makeGroupRows(groups, groupByDate) {
    var tableCreatorStrategy = this._isVerticalGroupedWorkSpace() ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
    return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
      groupHeaderRowClass: _m_classes.GROUP_ROW_CLASS,
      groupRowClass: _m_classes.GROUP_ROW_CLASS,
      groupHeaderClass: this._getGroupHeaderClass.bind(this),
      groupHeaderContentClass: _m_classes.GROUP_HEADER_CONTENT_CLASS
    }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getGroupCount(), groupByDate);
  };
  _proto._renderDateHeader = function _renderDateHeader() {
    var container = this._getDateHeaderContainer();
    var $headerRow = (0, _renderer.default)('<tr>').addClass(HEADER_ROW_CLASS);
    var count = this._getCellCount();
    var cellTemplate = this._getDateHeaderTemplate();
    var repeatCount = this._getCalculateHeaderCellRepeatCount();
    var templateCallbacks = [];
    var groupByDate = this.isGroupedByDate();
    if (!groupByDate) {
      for (var rowIndex = 0; rowIndex < repeatCount; rowIndex++) {
        for (var columnIndex = 0; columnIndex < count; columnIndex++) {
          var templateIndex = rowIndex * count + columnIndex;
          this._renderDateHeaderTemplate($headerRow, columnIndex, templateIndex, cellTemplate, templateCallbacks);
        }
      }
      container.append($headerRow);
    } else {
      var colSpan = groupByDate ? this._getGroupCount() : 1;
      for (var _columnIndex = 0; _columnIndex < count; _columnIndex++) {
        var _templateIndex = _columnIndex * repeatCount;
        var cellElement = this._renderDateHeaderTemplate($headerRow, _columnIndex, _templateIndex, cellTemplate, templateCallbacks);
        cellElement.attr('colSpan', colSpan);
      }
      container.prepend($headerRow);
    }
    this._applyCellTemplates(templateCallbacks);
    return $headerRow;
  };
  _proto._renderDateHeaderTemplate = function _renderDateHeaderTemplate(container, panelCellIndex, templateIndex, cellTemplate, templateCallbacks) {
    var validTemplateIndex = this.isGroupedByDate() ? Math.floor(templateIndex / this._getGroupCount()) : templateIndex;
    var completeDateHeaderMap = this.viewDataProvider.completeDateHeaderMap;
    var _completeDateHeaderMa = completeDateHeaderMap[completeDateHeaderMap.length - 1][validTemplateIndex],
      text = _completeDateHeaderMa.text,
      date = _completeDateHeaderMa.startDate;
    var $cell = (0, _renderer.default)('<th>').addClass(this._getHeaderPanelCellClass(panelCellIndex)).attr('title', text);
    if (cellTemplate === null || cellTemplate === void 0 ? void 0 : cellTemplate.render) {
      templateCallbacks.push(cellTemplate.render.bind(cellTemplate, {
        model: _extends({
          text,
          date
        }, this._getGroupsForDateHeaderTemplate(templateIndex)),
        index: templateIndex,
        container: (0, _element.getPublicElement)($cell)
      }));
    } else {
      $cell.text(text);
    }
    container.append($cell);
    return $cell;
  };
  _proto._getGroupsForDateHeaderTemplate = function _getGroupsForDateHeaderTemplate(templateIndex) {
    var indexMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var groupIndex;
    var groups;
    if (this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate()) {
      groupIndex = this._getGroupIndex(0, templateIndex * indexMultiplier);
      var groupsArray = (0, _m_utils2.getCellGroups)(groupIndex, this.option('groups'));
      groups = (0, _m_utils2.getGroupsObjectFromGroupsArray)(groupsArray);
    }
    return {
      groups,
      groupIndex
    };
  };
  _proto._getHeaderPanelCellClass = function _getHeaderPanelCellClass(i) {
    var cellClass = "".concat(HEADER_PANEL_CELL_CLASS, " ").concat(HORIZONTAL_SIZES_CLASS);
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1, undefined, undefined, this.isGroupedByDate());
  };
  _proto._renderAllDayPanel = function _renderAllDayPanel(index) {
    var cellCount = this._getCellCount();
    if (!this._isVerticalGroupedWorkSpace()) {
      cellCount *= this._getGroupCount() || 1;
    }
    var cellTemplates = this._renderTableBody({
      container: this._allDayPanels.length ? (0, _element.getPublicElement)(this._allDayTables[index]) : (0, _element.getPublicElement)(this._$allDayTable),
      rowCount: 1,
      cellCount,
      cellClass: this._getAllDayPanelCellClass.bind(this),
      rowClass: ALL_DAY_TABLE_ROW_CLASS,
      cellTemplate: this.option('dataCellTemplate'),
      // TODO: remove along with old render
      getCellData: this._oldRender_getAllDayCellData(index),
      groupIndex: index
    }, true);
    this._toggleAllDayVisibility(true);
    this._applyCellTemplates(cellTemplates);
  };
  _proto._renderGroupAllDayPanel = function _renderGroupAllDayPanel() {
    if (this._isVerticalGroupedWorkSpace()) {
      var groupCount = this._getGroupCount();
      for (var i = 0; i < groupCount; i++) {
        this._renderAllDayPanel(i);
      }
    }
  };
  _proto._getAllDayPanelCellClass = function _getAllDayPanelCellClass(i, j) {
    var cellClass = "".concat(ALL_DAY_TABLE_CELL_CLASS, " ").concat(HORIZONTAL_SIZES_CLASS);
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, j + 1);
  };
  _proto._renderTimePanel = function _renderTimePanel() {
    var _this24 = this;
    var repeatCount = this._groupedStrategy.calculateTimeCellRepeatCount();
    var getTimeCellGroups = function getTimeCellGroups(rowIndex) {
      if (!_this24._isVerticalGroupedWorkSpace()) {
        return {};
      }
      var groupIndex = _this24._getGroupIndex(rowIndex, 0);
      var groupsArray = (0, _m_utils2.getCellGroups)(groupIndex, _this24.option('groups'));
      var groups = (0, _m_utils2.getGroupsObjectFromGroupsArray)(groupsArray);
      return {
        groupIndex,
        groups
      };
    };
    var getData = function getData(rowIndex, field) {
      var allDayPanelsCount = 0;
      if (_this24.isAllDayPanelVisible) {
        allDayPanelsCount = 1;
      }
      if (_this24.isGroupedAllDayPanel()) {
        allDayPanelsCount = Math.ceil((rowIndex + 1) / _this24._getRowCount());
      }
      var validRowIndex = rowIndex + allDayPanelsCount;
      return _this24.viewDataProvider.completeTimePanelMap[validRowIndex][field];
    };
    this._renderTableBody({
      container: (0, _element.getPublicElement)(this._$timePanel),
      rowCount: this._getTimePanelRowCount() * repeatCount,
      cellCount: 1,
      cellClass: this._getTimeCellClass.bind(this),
      rowClass: TIME_PANEL_ROW_CLASS,
      cellTemplate: this.option('timeCellTemplate'),
      getCellText: function getCellText(rowIndex) {
        return getData(rowIndex, 'text');
      },
      getCellDate: function getCellDate(rowIndex) {
        return getData(rowIndex, 'startDate');
      },
      groupCount: this._getGroupCount(),
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayTitles : undefined,
      getTemplateData: getTimeCellGroups.bind(this)
    });
  };
  _proto._getTimeCellClass = function _getTimeCellClass(i) {
    var cellClass = "".concat(TIME_PANEL_CELL_CLASS, " ").concat(VERTICAL_SIZES_CLASS);
    return this._isVerticalGroupedWorkSpace() ? this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i, i) : cellClass;
  };
  _proto._renderDateTable = function _renderDateTable() {
    var _this25 = this;
    var groupCount = this._getGroupCount();
    this._renderTableBody({
      container: (0, _element.getPublicElement)(this._$dateTable),
      rowCount: this._getTotalRowCount(groupCount),
      cellCount: this._getTotalCellCount(groupCount),
      cellClass: this._getDateTableCellClass.bind(this),
      rowClass: _m_classes.DATE_TABLE_ROW_CLASS,
      cellTemplate: this.option('dataCellTemplate'),
      // TODO: remove along with old render
      getCellData: function getCellData(_, rowIndex, columnIndex) {
        var isGroupedAllDayPanel = _this25.isGroupedAllDayPanel();
        var validRowIndex = rowIndex;
        if (isGroupedAllDayPanel) {
          var rowCount = _this25._getRowCount();
          var allDayPanelsCount = Math.ceil(rowIndex / rowCount);
          validRowIndex += allDayPanelsCount;
        }
        var cellData = _this25.viewDataProvider.viewDataMap.dateTableMap[validRowIndex][columnIndex].cellData;
        return {
          value: _this25._filterCellDataFields(cellData),
          fullValue: cellData,
          key: CELL_DATA
        };
      },
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayPanels : undefined,
      groupCount,
      groupByDate: this.option('groupByDate')
    });
  };
  _proto._insertAllDayRowsIntoDateTable = function _insertAllDayRowsIntoDateTable() {
    return this._groupedStrategy.insertAllDayRowsIntoDateTable();
  };
  _proto._renderTableBody = function _renderTableBody(options, delayCellTemplateRendering) {
    var result = [];
    if (!delayCellTemplateRendering) {
      this._applyCellTemplates(tableCreator.makeTable(options));
    } else {
      result = tableCreator.makeTable(options);
    }
    return result;
  };
  _createClass(SchedulerWorkSpace, [{
    key: "type",
    get: function get() {
      return '';
    }
  }, {
    key: "viewDataProvider",
    get: function get() {
      if (!this._viewDataProvider) {
        this._viewDataProvider = new _m_view_data_provider.default(this.type);
      }
      return this._viewDataProvider;
    }
  }, {
    key: "cache",
    get: function get() {
      if (!this._cache) {
        this._cache = new _m_cache.Cache();
      }
      return this._cache;
    }
  }, {
    key: "cellsSelectionState",
    get: function get() {
      var _this26 = this;
      if (!this._cellsSelectionState) {
        this._cellsSelectionState = new _m_cells_selection_state.default(this.viewDataProvider);
        var selectedCellsOption = this.option('selectedCellData');
        if ((selectedCellsOption === null || selectedCellsOption === void 0 ? void 0 : selectedCellsOption.length) > 0) {
          var validSelectedCells = selectedCellsOption.map(function (selectedCell) {
            var groups = selectedCell.groups;
            if (!groups || _this26._getGroupCount() === 0) {
              return _extends(_extends({}, selectedCell), {
                groupIndex: 0
              });
            }
            var groupIndex = _this26._getGroupIndexByResourceId(groups);
            return _extends(_extends({}, selectedCell), {
              groupIndex
            });
          });
          this._cellsSelectionState.setSelectedCellsByData(validSelectedCells);
        }
      }
      return this._cellsSelectionState;
    }
  }, {
    key: "cellsSelectionController",
    get: function get() {
      if (!this._cellsSelectionController) {
        this._cellsSelectionController = new _m_cells_selection_controller.CellsSelectionController();
      }
      return this._cellsSelectionController;
    }
  }, {
    key: "isAllDayPanelVisible",
    get: function get() {
      return this._isShowAllDayPanel() && this.supportAllDayRow();
    }
  }, {
    key: "verticalGroupTableClass",
    get: function get() {
      return WORKSPACE_VERTICAL_GROUP_TABLE_CLASS;
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function get() {
      return _layout2.default;
    }
  }, {
    key: "timeZoneCalculator",
    get: function get() {
      return this.option('timeZoneCalculator');
    }
  }, {
    key: "isDefaultDraggingMode",
    get: function get() {
      return this.option('draggingMode') === 'default';
    }
  }]);
  return SchedulerWorkSpace;
}(_m_widget_observer.default);
var createDragBehaviorConfig = function createDragBehaviorConfig(container, rootElement, isDefaultDraggingMode, dragBehavior, enableDefaultDragging, disableDefaultDragging, getDroppableCell, getDateTables, removeDroppableCellClass, getCellWidth, options) {
  var state = {
    dragElement: undefined,
    itemData: undefined
  };
  var isItemDisabled = function isItemDisabled() {
    var itemData = state.itemData;
    if (itemData) {
      var getter = (0, _data.compileGetter)('disabled');
      return getter(itemData);
    }
    return true;
  };
  var createDragAppointment = function createDragAppointment(itemData, settings, appointments) {
    var appointmentIndex = appointments.option('items').length;
    settings.isCompact = false;
    settings.virtual = false;
    var items = appointments._renderItem(appointmentIndex, {
      itemData,
      settings: [settings]
    });
    return items[0];
  };
  var onDragStart = function onDragStart(e) {
    if (!isDefaultDraggingMode) {
      disableDefaultDragging();
    }
    var canceled = e.cancel;
    var event = e.event;
    var $itemElement = (0, _renderer.default)(e.itemElement);
    var appointments = e.component._appointments;
    state.itemData = options.getItemData(e.itemElement, appointments);
    var settings = options.getItemSettings($itemElement, e);
    var initialPosition = options.initialPosition;
    if (!isItemDisabled()) {
      event.data = event.data || {};
      if (!canceled) {
        if (!settings.isCompact) {
          dragBehavior.updateDragSource(state.itemData, settings);
        }
        state.dragElement = createDragAppointment(state.itemData, settings, appointments);
        event.data.itemElement = state.dragElement;
        event.data.initialPosition = initialPosition !== null && initialPosition !== void 0 ? initialPosition : (0, _translator.locate)((0, _renderer.default)(state.dragElement));
        event.data.itemData = state.itemData;
        event.data.itemSettings = settings;
        dragBehavior.onDragStart(event.data);
        (0, _translator.resetPosition)((0, _renderer.default)(state.dragElement));
      }
    }
  };
  var getElementsFromPoint = function getElementsFromPoint() {
    var appointmentWidth = (0, _size.getWidth)(state.dragElement);
    var cellWidth = getCellWidth();
    var isWideAppointment = appointmentWidth > cellWidth;
    var isNarrowAppointment = appointmentWidth <= DRAGGING_MOUSE_FAULT;
    var dragElementContainer = (0, _renderer.default)(state.dragElement).parent();
    var boundingRect = (0, _position.getBoundingRect)(dragElementContainer.get(0));
    var newX = boundingRect.left;
    var newY = boundingRect.top;
    if (isWideAppointment) {
      return _dom_adapter.default.elementsFromPoint(newX + DRAGGING_MOUSE_FAULT, newY + DRAGGING_MOUSE_FAULT);
    }
    if (isNarrowAppointment) {
      return _dom_adapter.default.elementsFromPoint(newX, newY);
    }
    return _dom_adapter.default.elementsFromPoint(newX + appointmentWidth / 2, newY + DRAGGING_MOUSE_FAULT);
  };
  var onDragMove = function onDragMove() {
    if (isDefaultDraggingMode) {
      return;
    }
    var elements = getElementsFromPoint();
    var isMoveUnderControl = !!elements.find(function (el) {
      return el === rootElement.get(0);
    });
    var dateTables = getDateTables();
    var droppableCell = elements.find(function (el) {
      var classList = el.classList;
      var isCurrentSchedulerElement = dateTables.find(el).length === 1;
      return isCurrentSchedulerElement && (classList.contains(DATE_TABLE_CELL_CLASS) || classList.contains(ALL_DAY_TABLE_CELL_CLASS));
    });
    if (droppableCell) {
      if (!getDroppableCell().is(droppableCell)) {
        removeDroppableCellClass();
      }
      (0, _renderer.default)(droppableCell).addClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
    } else if (!isMoveUnderControl) {
      removeDroppableCellClass();
    }
  };
  var onDragEnd = function onDragEnd(e) {
    var _a;
    if (!isDefaultDraggingMode) {
      enableDefaultDragging();
    }
    if (!isItemDisabled()) {
      dragBehavior.onDragEnd(e);
    }
    (_a = state.dragElement) === null || _a === void 0 ? void 0 : _a.remove();
    removeDroppableCellClass();
  };
  var cursorOffset = options.isSetCursorOffset ? function () {
    var $dragElement = (0, _renderer.default)(state.dragElement);
    return {
      x: (0, _size.getWidth)($dragElement) / 2,
      y: (0, _size.getHeight)($dragElement) / 2
    };
  } : undefined;
  return {
    container,
    dragTemplate: function dragTemplate() {
      return state.dragElement;
    },
    onDragStart,
    onDragMove,
    onDragEnd,
    cursorOffset,
    filter: options.filter
  };
};
var _default = SchedulerWorkSpace;
exports.default = _default;
