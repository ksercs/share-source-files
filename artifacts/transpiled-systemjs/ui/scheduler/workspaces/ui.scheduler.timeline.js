!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/scheduler/workspaces/ui.scheduler.timeline.js"], ["../../../core/utils/size","../../../core/renderer","../../../core/utils/common","../../../core/utils/extend","../../../core/utils/position","../../../core/component_registrator","./ui.scheduler.work_space.indicator","../../../core/utils/date","../table_creator","../shaders/ui.scheduler.current_time_shader.horizontal","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week","../utils.timeZone","../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/scheduler/workspaces/ui.scheduler.timeline.js", ["../../../core/utils/size", "../../../core/renderer", "../../../core/utils/common", "../../../core/utils/extend", "../../../core/utils/position", "../../../core/component_registrator", "./ui.scheduler.work_space.indicator", "../../../core/utils/date", "../table_creator", "../shaders/ui.scheduler.current_time_shader.horizontal", "../classes", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week", "../utils.timeZone", "../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j", "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base", "../../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _size = $__require("../../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _common = $__require("../../../core/utils/common");
  var _extend = $__require("../../../core/utils/extend");
  var _position = $__require("../../../core/utils/position");
  var _component_registrator = _interopRequireDefault($__require("../../../core/component_registrator"));
  var _uiSchedulerWork_space = _interopRequireDefault($__require("./ui.scheduler.work_space.indicator"));
  var _date = _interopRequireDefault($__require("../../../core/utils/date"));
  var _table_creator = _interopRequireDefault($__require("../table_creator"));
  var _uiSchedulerCurrent_time_shader = _interopRequireDefault($__require("../shaders/ui.scheduler.current_time_shader.horizontal"));
  var _classes = $__require("../classes");
  var _timeline_week = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week");
  var _utils = _interopRequireDefault($__require("../utils.timeZone"));
  var _layout = _interopRequireDefault($__require("../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j"));
  var _base = $__require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
  var _window = $__require("../../../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var tableCreator = _table_creator.default.tableCreator;
  var TIMELINE_CLASS = 'dx-scheduler-timeline';
  var GROUP_TABLE_CLASS = 'dx-scheduler-group-table';
  var HORIZONTAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-horizontal-grouped';
  var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
  var HEADER_PANEL_WEEK_CELL_CLASS = 'dx-scheduler-header-panel-week-cell';
  var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
  var HORIZONTAL = 'horizontal';
  var DATE_TABLE_CELL_BORDER = 1;
  var DATE_TABLE_HEADER_MARGIN = 10;
  var toMs = _date.default.dateToMilliseconds;
  var SchedulerTimeline = /*#__PURE__*/function (_SchedulerWorkSpace) {
    _inheritsLoose(SchedulerTimeline, _SchedulerWorkSpace);
    function SchedulerTimeline() {
      return _SchedulerWorkSpace.apply(this, arguments) || this;
    }
    var _proto = SchedulerTimeline.prototype;
    _proto.getGroupTableWidth = function getGroupTableWidth() {
      return this._$sidebarTable ? (0, _size.getOuterWidth)(this._$sidebarTable) : 0;
    };
    _proto._getTotalRowCount = function _getTotalRowCount(groupCount) {
      if (this._isHorizontalGroupedWorkSpace()) {
        return this._getRowCount();
      } else {
        groupCount = groupCount || 1;
        return this._getRowCount() * groupCount;
      }
    };
    _proto._getFormat = function _getFormat() {
      return 'shorttime';
    };
    _proto._getWorkSpaceHeight = function _getWorkSpaceHeight() {
      if (this.option('crossScrollingEnabled') && (0, _window.hasWindow)()) {
        return (0, _position.getBoundingRect)(this._$dateTable.get(0)).height;
      }
      return (0, _position.getBoundingRect)(this.$element().get(0)).height;
    };
    _proto._dateTableScrollableConfig = function _dateTableScrollableConfig() {
      var config = _SchedulerWorkSpace.prototype._dateTableScrollableConfig.call(this);
      var timelineConfig = {
        direction: HORIZONTAL
      };
      return this.option('crossScrollingEnabled') ? config : (0, _extend.extend)(config, timelineConfig);
    };
    _proto._needCreateCrossScrolling = function _needCreateCrossScrolling() {
      return true;
    };
    _proto._headerScrollableConfig = function _headerScrollableConfig() {
      var config = _SchedulerWorkSpace.prototype._headerScrollableConfig.call(this);
      return (0, _extend.extend)(config, {
        scrollByContent: true
      });
    };
    _proto.supportAllDayRow = function supportAllDayRow() {
      return false;
    };
    _proto._getGroupHeaderContainer = function _getGroupHeaderContainer() {
      if (this._isHorizontalGroupedWorkSpace()) {
        return this._$thead;
      }
      return this._$sidebarTable;
    };
    _proto._insertAllDayRowsIntoDateTable = function _insertAllDayRowsIntoDateTable() {
      return false;
    };
    _proto._needRenderWeekHeader = function _needRenderWeekHeader() {
      return false;
    };
    _proto._incrementDate = function _incrementDate(date) {
      date.setDate(date.getDate() + 1);
    };
    _proto.getIndicationCellCount = function getIndicationCellCount() {
      var timeDiff = this._getTimeDiff();
      return this._calculateDurationInCells(timeDiff);
    };
    _proto._getTimeDiff = function _getTimeDiff() {
      var today = this._getToday();
      var date = this._getIndicationFirstViewDate();
      var startViewDate = this.getStartViewDate();
      var dayLightOffset = _utils.default.getDaylightOffsetInMs(startViewDate, today);
      if (dayLightOffset) {
        today = new Date(today.getTime() + dayLightOffset);
      }
      return today.getTime() - date.getTime();
    };
    _proto._calculateDurationInCells = function _calculateDurationInCells(timeDiff) {
      var today = this._getToday();
      var differenceInDays = Math.floor(timeDiff / toMs('day'));
      var duration = (timeDiff - differenceInDays * toMs('day') - this.option('startDayHour') * toMs('hour')) / this.getCellDuration();
      if (today.getHours() > this.option('endDayHour')) {
        duration = this._getCellCountInDay();
      }
      if (duration < 0) {
        duration = 0;
      }
      return differenceInDays * this._getCellCountInDay() + duration;
    };
    _proto.getIndicationWidth = function getIndicationWidth() {
      if (this.isGroupedByDate()) {
        var cellCount = this.getIndicationCellCount();
        var integerPart = Math.floor(cellCount);
        var fractionPart = cellCount - integerPart;
        return this.getCellWidth() * (integerPart * this._getGroupCount() + fractionPart);
      } else {
        return this.getIndicationCellCount() * this.getCellWidth();
      }
    };
    _proto._isVerticalShader = function _isVerticalShader() {
      return false;
    };
    _proto._isCurrentTimeHeaderCell = function _isCurrentTimeHeaderCell() {
      return false;
    };
    _proto._setTableSizes = function _setTableSizes() {
      var minHeight = this._getWorkSpaceMinHeight();
      (0, _size.setHeight)(this._$sidebarTable, minHeight);
      (0, _size.setHeight)(this._$dateTable, minHeight);
      _SchedulerWorkSpace.prototype._setTableSizes.call(this);
      this.virtualScrollingDispatcher.updateDimensions();
    };
    _proto._getWorkSpaceMinHeight = function _getWorkSpaceMinHeight() {
      var minHeight = this._getWorkSpaceHeight();
      var workspaceContainerHeight = (0, _size.getOuterHeight)(this.$element(), true) - this.getHeaderPanelHeight() - 2 * DATE_TABLE_CELL_BORDER - DATE_TABLE_HEADER_MARGIN;
      if (minHeight < workspaceContainerHeight) {
        minHeight = workspaceContainerHeight;
      }
      return minHeight;
    };
    _proto._getCellCoordinatesByIndex = function _getCellCoordinatesByIndex(index) {
      return {
        columnIndex: index % this._getCellCount(),
        rowIndex: 0
      };
    };
    _proto._getCellByCoordinates = function _getCellByCoordinates(cellCoordinates, groupIndex) {
      var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex);
      return this._$dateTable.find('tr').eq(indexes.rowIndex).find('td').eq(indexes.columnIndex);
    };
    _proto._getWorkSpaceWidth = function _getWorkSpaceWidth() {
      return (0, _size.getOuterWidth)(this._$dateTable, true);
    };
    _proto._getIndicationFirstViewDate = function _getIndicationFirstViewDate() {
      return _date.default.trimTime(new Date(this.getStartViewDate()));
    };
    _proto._getIntervalBetween = function _getIntervalBetween(currentDate, allDay) {
      var startDayHour = this.option('startDayHour');
      var endDayHour = this.option('endDayHour');
      var firstViewDate = this.getStartViewDate();
      var firstViewDateTime = firstViewDate.getTime();
      var hiddenInterval = (24 - endDayHour + startDayHour) * toMs('hour');
      var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
      var apptStart = currentDate.getTime();
      var fullInterval = apptStart - firstViewDateTime - timeZoneOffset;
      var fullDays = Math.floor(fullInterval / toMs('day'));
      var tailDuration = fullInterval - fullDays * toMs('day');
      var tailDelta = 0;
      var cellCount = this._getCellCountInDay() * (fullDays - this._getWeekendsCount(fullDays));
      var gapBeforeAppt = apptStart - _date.default.trimTime(new Date(currentDate)).getTime();
      var result = cellCount * this.option('hoursInterval') * toMs('hour');
      if (!allDay) {
        if (currentDate.getHours() < startDayHour) {
          tailDelta = tailDuration - hiddenInterval + gapBeforeAppt;
        } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() < endDayHour) {
          tailDelta = tailDuration;
        } else if (currentDate.getHours() >= startDayHour && currentDate.getHours() >= endDayHour) {
          tailDelta = tailDuration - (gapBeforeAppt - endDayHour * toMs('hour'));
        } else if (!fullDays) {
          result = fullInterval;
        }
        result += tailDelta;
      }
      return result;
    };
    _proto._getWeekendsCount = function _getWeekendsCount() {
      return 0;
    };
    _proto.getAllDayContainer = function getAllDayContainer() {
      return null;
    };
    _proto.getTimePanelWidth = function getTimePanelWidth() {
      return 0;
    };
    _proto.getIntervalDuration = function getIntervalDuration(allDay) {
      return this.getCellDuration();
    };
    _proto.getCellMinWidth = function getCellMinWidth() {
      return 0;
    };
    _proto.getWorkSpaceLeftOffset = function getWorkSpaceLeftOffset() {
      return 0;
    };
    _proto.scrollToTime = function scrollToTime(hours, minutes, date) {
      var coordinates = this._getScrollCoordinates(hours, minutes, date);
      var scrollable = this.getScrollable();
      var offset = this.option('rtlEnabled') ? (0, _position.getBoundingRect)(this.getScrollableContainer().get(0)).width : 0;
      if (this.option('templatesRenderAsynchronously')) {
        setTimeout(function () {
          scrollable.scrollBy({
            left: coordinates.left - scrollable.scrollLeft() - offset,
            top: 0
          });
        });
      } else {
        scrollable.scrollBy({
          left: coordinates.left - scrollable.scrollLeft() - offset,
          top: 0
        });
      }
    };
    _proto.renderRAllDayPanel = function renderRAllDayPanel() {};
    _proto.renderRTimeTable = function renderRTimeTable() {};
    _proto._renderGroupAllDayPanel = function _renderGroupAllDayPanel() {};
    _proto.generateRenderOptions = function generateRenderOptions() {
      var options = _SchedulerWorkSpace.prototype.generateRenderOptions.call(this, true);
      return _extends({}, options, {
        isGenerateWeekDaysHeaderData: this._needRenderWeekHeader(),
        getDateForHeaderText: _timeline_week.getDateForHeaderText
      });
    }

    // -------------
    // We need these methods for now but they are useless for renovation
    // -------------
    ;
    _proto._init = function _init() {
      _SchedulerWorkSpace.prototype._init.call(this);
      this.$element().addClass(TIMELINE_CLASS);
      this._$sidebarTable = (0, _renderer.default)('<div>').addClass(GROUP_TABLE_CLASS);
    };
    _proto._getDefaultGroupStrategy = function _getDefaultGroupStrategy() {
      return 'vertical';
    };
    _proto._toggleGroupingDirectionClass = function _toggleGroupingDirectionClass() {
      this.$element().toggleClass(HORIZONTAL_GROUPED_WORKSPACE_CLASS, this._isHorizontalGroupedWorkSpace());
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_SchedulerWorkSpace.prototype._getDefaultOptions.call(this), {
        groupOrientation: 'vertical'
      });
    };
    _proto._createWorkSpaceElements = function _createWorkSpaceElements() {
      this._createWorkSpaceScrollableElements();
    };
    _proto._toggleAllDayVisibility = function _toggleAllDayVisibility() {
      return (0, _common.noop)();
    };
    _proto._changeAllDayVisibility = function _changeAllDayVisibility() {
      return (0, _common.noop)();
    };
    _proto._getDateHeaderTemplate = function _getDateHeaderTemplate() {
      return this.option('timeCellTemplate');
    };
    _proto._renderView = function _renderView() {
      var groupCellTemplates;
      if (!this.isRenovatedRender()) {
        groupCellTemplates = this._renderGroupHeader();
      }
      this.renderWorkSpace();
      if (this.isRenovatedRender()) {
        this.virtualScrollingDispatcher.updateDimensions();
      }
      this._shader = new _uiSchedulerCurrent_time_shader.default(this);
      this._$sidebarTable.appendTo(this._sidebarScrollable.$content());
      if (this.isRenovatedRender() && this._isVerticalGroupedWorkSpace()) {
        this.renderRGroupPanel();
      }
      this.updateHeaderEmptyCellWidth();
      this._applyCellTemplates(groupCellTemplates);
    };
    _proto._setHorizontalGroupHeaderCellsHeight = function _setHorizontalGroupHeaderCellsHeight() {
      return (0, _common.noop)();
    };
    _proto._setCurrentTimeCells = function _setCurrentTimeCells() {
      var timePanelCells = this._getTimePanelCells();
      var currentTimeCellIndices = this._getCurrentTimePanelCellIndices();
      currentTimeCellIndices.forEach(function (timePanelCellIndex) {
        timePanelCells.eq(timePanelCellIndex).addClass(_classes.HEADER_CURRENT_TIME_CELL_CLASS);
      });
    };
    _proto._cleanCurrentTimeCells = function _cleanCurrentTimeCells() {
      this.$element().find(".".concat(_classes.HEADER_CURRENT_TIME_CELL_CLASS)).removeClass(_classes.HEADER_CURRENT_TIME_CELL_CLASS);
    };
    _proto._getTimePanelCells = function _getTimePanelCells() {
      return this.$element().find(".".concat(HEADER_PANEL_CELL_CLASS, ":not(.").concat(HEADER_PANEL_WEEK_CELL_CLASS, ")"));
    };
    _proto._getCurrentTimePanelCellIndices = function _getCurrentTimePanelCellIndices() {
      var columnCountPerGroup = this._getCellCount();
      var today = this._getToday();
      var index = this.getCellIndexByDate(today);
      var _this$_getCellCoordin = this._getCellCoordinatesByIndex(index),
          currentTimeColumnIndex = _this$_getCellCoordin.columnIndex;
      if (currentTimeColumnIndex === undefined) {
        return [];
      }
      var horizontalGroupCount = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? this._getGroupCount() : 1;
      return _toConsumableArray(new Array(horizontalGroupCount)).map(function (_, groupIndex) {
        return columnCountPerGroup * groupIndex + currentTimeColumnIndex;
      });
    }

    // --------------
    // These methods should be deleted when we get rid of old render
    // --------------
    ;
    _proto._renderTimePanel = function _renderTimePanel() {
      return (0, _common.noop)();
    };
    _proto._renderAllDayPanel = function _renderAllDayPanel() {
      return (0, _common.noop)();
    };
    _proto._createAllDayPanelElements = function _createAllDayPanelElements() {
      return (0, _common.noop)();
    };
    _proto._renderDateHeader = function _renderDateHeader() {
      var $headerRow = _SchedulerWorkSpace.prototype._renderDateHeader.call(this);
      if (this._needRenderWeekHeader()) {
        var firstViewDate = new Date(this.getStartViewDate());
        var currentDate = new Date(firstViewDate);
        var $cells = [];
        var groupCount = this._getGroupCount();
        var cellCountInDay = this._getCellCountInDay();
        var colSpan = this.isGroupedByDate() ? cellCountInDay * groupCount : cellCountInDay;
        var cellTemplate = this.option('dateCellTemplate');
        var horizontalGroupCount = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? groupCount : 1;
        var cellsInGroup = this.viewDataProvider.viewDataGenerator.daysInInterval * this.option('intervalCount');
        var cellsCount = cellsInGroup * horizontalGroupCount;
        for (var templateIndex = 0; templateIndex < cellsCount; templateIndex++) {
          var $th = (0, _renderer.default)('<th>');
          var text = (0, _base.formatWeekdayAndDay)(currentDate);
          if (cellTemplate) {
            var templateOptions = {
              model: _extends({
                text: text,
                date: new Date(currentDate)
              }, this._getGroupsForDateHeaderTemplate(templateIndex, colSpan)),
              container: $th,
              index: templateIndex
            };
            cellTemplate.render(templateOptions);
          } else {
            $th.text(text);
          }
          $th.addClass(HEADER_PANEL_CELL_CLASS).addClass(HEADER_PANEL_WEEK_CELL_CLASS).attr('colSpan', colSpan);
          $cells.push($th);
          if (templateIndex % cellsInGroup === cellsInGroup - 1) {
            currentDate = new Date(firstViewDate);
          } else {
            this._incrementDate(currentDate);
          }
        }
        var $row = (0, _renderer.default)('<tr>').addClass(HEADER_ROW_CLASS).append($cells);
        $headerRow.before($row);
      }
    };
    _proto._renderIndicator = function _renderIndicator(height, rtlOffset, $container, groupCount) {
      var $indicator;
      var width = this.getIndicationWidth();
      if (this.option('groupOrientation') === 'vertical') {
        $indicator = this._createIndicator($container);
        (0, _size.setHeight)($indicator, (0, _position.getBoundingRect)($container.get(0)).height);
        $indicator.css('left', rtlOffset ? rtlOffset - width : width);
      } else {
        for (var i = 0; i < groupCount; i++) {
          var offset = this.isGroupedByDate() ? i * this.getCellWidth() : this._getCellCount() * this.getCellWidth() * i;
          $indicator = this._createIndicator($container);
          (0, _size.setHeight)($indicator, (0, _position.getBoundingRect)($container.get(0)).height);
          $indicator.css('left', rtlOffset ? rtlOffset - width - offset : width + offset);
        }
      }
    };
    _proto._makeGroupRows = function _makeGroupRows(groups, groupByDate) {
      var tableCreatorStrategy = this.option('groupOrientation') === 'vertical' ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
      return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
        groupRowClass: _classes.GROUP_ROW_CLASS,
        groupHeaderRowClass: _classes.GROUP_ROW_CLASS,
        groupHeaderClass: this._getGroupHeaderClass.bind(this),
        groupHeaderContentClass: _classes.GROUP_HEADER_CONTENT_CLASS
      }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getTotalRowCount(this._getGroupCount()), groupByDate);
    };
    _createClass(SchedulerTimeline, [{
      key: "verticalGroupTableClass",
      get: function get() {
        return GROUP_TABLE_CLASS;
      }
    }, {
      key: "viewDirection",
      get: function get() {
        return 'horizontal';
      }
    }, {
      key: "renovatedHeaderPanelComponent",
      get: function get() {
        return _layout.default;
      }
    }]);
    return SchedulerTimeline;
  }(_uiSchedulerWork_space.default);
  (0, _component_registrator.default)('dxSchedulerTimeline', SchedulerTimeline);
  var _default = SchedulerTimeline;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/utils/size","../../../core/renderer","../../../core/utils/common","../../../core/utils/extend","../../../core/utils/position","../../../core/component_registrator","./ui.scheduler.work_space.indicator","../../../core/utils/date","../table_creator","../shaders/ui.scheduler.current_time_shader.horizontal","../classes","../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week","../utils.timeZone","../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j","../../../renovation/ui/scheduler/view_model/to_test/views/utils/base","../../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/utils/size"), require("../../../core/renderer"), require("../../../core/utils/common"), require("../../../core/utils/extend"), require("../../../core/utils/position"), require("../../../core/component_registrator"), require("./ui.scheduler.work_space.indicator"), require("../../../core/utils/date"), require("../table_creator"), require("../shaders/ui.scheduler.current_time_shader.horizontal"), require("../classes"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/timeline_week"), require("../utils.timeZone"), require("../../../renovation/ui/scheduler/workspaces/timeline/header_panel/layout.j"), require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base"), require("../../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.scheduler.timeline.js.map