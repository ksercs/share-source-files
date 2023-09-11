"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _element_data = require("../../core/element_data");
var _element = require("../../core/element");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _index = require("../../events/utils/index");
var _click = require("../../events/click");
var _hover = require("../../events/hover");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var abstract = _ui.default.abstract;
var CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
var CALENDAR_CELL_CLASS = 'dx-calendar-cell';
var CALENDAR_CELL_START_CLASS = 'dx-calendar-cell-start';
var CALENDAR_CELL_END_CLASS = 'dx-calendar-cell-end';
var CALENDAR_CELL_START_IN_ROW_CLASS = 'dx-calendar-cell-start-in-row';
var CALENDAR_CELL_END_IN_ROW_CLASS = 'dx-calendar-cell-end-in-row';
var CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
var CALENDAR_EMPTY_CELL_CLASS = 'dx-calendar-empty-cell';
var CALENDAR_TODAY_CLASS = 'dx-calendar-today';
var CALENDAR_SELECTED_DATE_CLASS = 'dx-calendar-selected-date';
var CALENDAR_CELL_IN_RANGE_CLASS = 'dx-calendar-cell-in-range';
var CALENDAR_CELL_RANGE_HOVER_CLASS = 'dx-calendar-cell-range-hover';
var CALENDAR_CELL_RANGE_HOVER_START_CLASS = 'dx-calendar-cell-range-hover-start';
var CALENDAR_CELL_RANGE_HOVER_END_CLASS = 'dx-calendar-cell-range-hover-end';
var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
var CALENDAR_CONTOURED_DATE_CLASS = 'dx-calendar-contoured-date';
var NOT_WEEK_CELL_SELECTOR = "td:not(.".concat(CALENDAR_WEEK_NUMBER_CELL_CLASS, ")");
var CALENDAR_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxCalendar');
var CALENDAR_DXHOVERSTART_EVENT_NAME = (0, _index.addNamespace)(_hover.start, 'dxCalendar');
var CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
var DAY_INTERVAL = 86400000;
var BaseView = _ui.default.inherit({
  _getViewName: function _getViewName() {
    return 'base';
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      date: new Date(),
      focusStateEnabled: false,
      cellTemplate: null,
      disabledDates: null,
      onCellClick: null,
      onCellHover: null,
      onWeekNumberClick: null,
      rowCount: 3,
      colCount: 4,
      allowValueSelection: true,
      _todayDate: function _todayDate() {
        return new Date();
      }
    });
  },
  _initMarkup: function _initMarkup() {
    this.callBase();
    this._renderImpl();
  },
  _renderImpl: function _renderImpl() {
    this.$element().append(this._createTable());
    this._createDisabledDatesHandler();
    this._renderBody();
    this._renderContouredDate();
    this._renderValue();
    this._renderRange();
    this._renderEvents();
  },
  _createTable: function _createTable() {
    this._$table = (0, _renderer.default)('<table>');
    var localizedWidgetName = _message.default.format('dxCalendar-ariaWidgetName');
    this.setAria({
      label: localizedWidgetName,
      role: 'grid'
    }, this._$table);
    return this._$table;
  },
  _renderBody: function _renderBody() {
    this.$body = (0, _renderer.default)('<tbody>').appendTo(this._$table);
    var rowData = {
      cellDate: this._getFirstCellData(),
      prevCellDate: null
    };
    for (var rowIndex = 0, rowCount = this.option('rowCount'); rowIndex < rowCount; rowIndex++) {
      rowData.row = this._createRow();
      for (var colIndex = 0, colCount = this.option('colCount'); colIndex < colCount; colIndex++) {
        this._renderCell(rowData, colIndex);
      }
      this._renderWeekNumberCell(rowData);
    }
  },
  _createRow: function _createRow() {
    var row = _dom_adapter.default.createElement('tr');
    this.setAria('role', 'row', (0, _renderer.default)(row));
    this.$body.get(0).appendChild(row);
    return row;
  },
  _createCell: function _createCell(cellDate, cellIndex) {
    var cell = _dom_adapter.default.createElement('td');
    var $cell = (0, _renderer.default)(cell);
    cell.className = this._getClassNameByDate(cellDate, cellIndex);
    cell.setAttribute('data-value', _date_serialization.default.serializeDate(cellDate, _date.default.getShortDateFormat()));
    (0, _element_data.data)(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
    this.setAria({
      'role': 'gridcell',
      'label': this.getCellAriaLabel(cellDate)
    }, $cell);
    return {
      cell,
      $cell
    };
  },
  _renderCell: function _renderCell(params, cellIndex) {
    var cellDate = params.cellDate,
      prevCellDate = params.prevCellDate,
      row = params.row;

    // T425127
    if (prevCellDate) {
      _date.default.fixTimezoneGap(prevCellDate, cellDate);
    }
    params.prevCellDate = cellDate;
    var _this$_createCell = this._createCell(cellDate, cellIndex),
      cell = _this$_createCell.cell,
      $cell = _this$_createCell.$cell;
    var cellTemplate = this.option('cellTemplate');
    (0, _renderer.default)(row).append(cell);
    if (cellTemplate) {
      cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell));
    } else {
      cell.innerHTML = this._getCellText(cellDate);
    }
    params.cellDate = this._getNextCellData(cellDate);
  },
  _getClassNameByDate: function _getClassNameByDate(cellDate, cellIndex) {
    var className = CALENDAR_CELL_CLASS;
    if (this._isTodayCell(cellDate)) {
      className += " ".concat(CALENDAR_TODAY_CLASS);
    }
    if (this._isDateOutOfRange(cellDate) || this.isDateDisabled(cellDate)) {
      className += " ".concat(CALENDAR_EMPTY_CELL_CLASS);
    }
    if (this._isOtherView(cellDate)) {
      className += " ".concat(CALENDAR_OTHER_VIEW_CLASS);
    }
    if (this.option('selectionMode') === 'range') {
      if (cellIndex === 0) {
        className += " ".concat(CALENDAR_CELL_START_IN_ROW_CLASS);
      }
      if (cellIndex === this.option('colCount') - 1) {
        className += " ".concat(CALENDAR_CELL_END_IN_ROW_CLASS);
      }
      if (this._isStartDayOfMonth(cellDate)) {
        className += " ".concat(CALENDAR_CELL_START_CLASS);
      }
      if (this._isEndDayOfMonth(cellDate)) {
        className += " ".concat(CALENDAR_CELL_END_CLASS);
      }
    }
    return className;
  },
  _prepareCellTemplateData: function _prepareCellTemplateData(cellDate, cellIndex, $cell) {
    var isDateCell = cellDate instanceof Date;
    var text = isDateCell ? this._getCellText(cellDate) : cellDate;
    var date = isDateCell ? cellDate : undefined;
    var view = this._getViewName();
    return {
      model: {
        text,
        date,
        view
      },
      container: (0, _element.getPublicElement)($cell),
      index: cellIndex
    };
  },
  _renderEvents: function _renderEvents() {
    var _this = this;
    this._createCellClickAction();
    _events_engine.default.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
    _events_engine.default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, function (e) {
      if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
        _this._cellClickAction({
          event: e,
          value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
        });
      }
    });
    var _this$option = this.option(),
      selectionMode = _this$option.selectionMode;
    _events_engine.default.off(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME);
    if (selectionMode === 'range') {
      this._createCellHoverAction();
      _events_engine.default.on(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, function (e) {
        if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
          _this._cellHoverAction({
            event: e,
            value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
          });
        }
      });
    }
    if (selectionMode !== 'single') {
      this._createWeekNumberCellClickAction();
      _events_engine.default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, ".".concat(CALENDAR_WEEK_NUMBER_CELL_CLASS), function (e) {
        var $row = (0, _renderer.default)(e.currentTarget).closest('tr');
        var firstDateInRow = $row.find(".".concat(CALENDAR_CELL_CLASS)).first().data(CALENDAR_DATE_VALUE_KEY);
        var lastDateInRow = $row.find(".".concat(CALENDAR_CELL_CLASS)).last().data(CALENDAR_DATE_VALUE_KEY);
        var rowDates = [].concat(_toConsumableArray(_date.default.getDatesOfInterval(firstDateInRow, lastDateInRow, DAY_INTERVAL)), [lastDateInRow]);
        _this._weekNumberCellClickAction({
          event: e,
          rowDates
        });
      });
    }
  },
  _createCellClickAction: function _createCellClickAction() {
    this._cellClickAction = this._createActionByOption('onCellClick');
  },
  _createCellHoverAction: function _createCellHoverAction() {
    this._cellHoverAction = this._createActionByOption('onCellHover');
  },
  _createWeekNumberCellClickAction: function _createWeekNumberCellClickAction() {
    this._weekNumberCellClickAction = this._createActionByOption('onWeekNumberClick');
  },
  _createDisabledDatesHandler: function _createDisabledDatesHandler() {
    var disabledDates = this.option('disabledDates');
    this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates || _common.noop;
  },
  _getDefaultDisabledDatesHandler: function _getDefaultDisabledDatesHandler(disabledDates) {
    return _common.noop;
  },
  _isTodayCell: abstract,
  _isDateOutOfRange: abstract,
  isDateDisabled: function isDateDisabled(cellDate) {
    var dateParts = {
      date: cellDate,
      view: this._getViewName()
    };
    return this._disabledDatesHandler(dateParts);
  },
  _isOtherView: abstract,
  _isStartDayOfMonth: abstract,
  _isEndDayOfMonth: abstract,
  _getCellText: abstract,
  _getFirstCellData: abstract,
  _getNextCellData: abstract,
  _renderContouredDate: function _renderContouredDate(contouredDate) {
    if (!this.option('focusStateEnabled')) {
      return;
    }
    contouredDate = contouredDate || this.option('contouredDate');
    var $oldContouredCell = this._getContouredCell();
    var $newContouredCell = this._getCellByDate(contouredDate);
    $oldContouredCell.removeClass(CALENDAR_CONTOURED_DATE_CLASS);
    if (contouredDate) {
      $newContouredCell.addClass(CALENDAR_CONTOURED_DATE_CLASS);
    }
  },
  _getContouredCell: function _getContouredCell() {
    return this._$table.find(".".concat(CALENDAR_CONTOURED_DATE_CLASS));
  },
  _renderValue: function _renderValue() {
    if (!this.option('allowValueSelection')) {
      return;
    }
    var value = this.option('value');
    if (!Array.isArray(value)) {
      value = [value];
    }
    this._updateSelectedClass(value);
  },
  _updateSelectedClass: function _updateSelectedClass(value) {
    var _this$_$selectedCells,
      _this2 = this;
    (_this$_$selectedCells = this._$selectedCells) === null || _this$_$selectedCells === void 0 ? void 0 : _this$_$selectedCells.forEach(function ($cell) {
      $cell.removeClass(CALENDAR_SELECTED_DATE_CLASS);
    });
    this._$selectedCells = value.map(function (value) {
      return _this2._getCellByDate(value);
    });
    this._$selectedCells.forEach(function ($cell) {
      $cell.addClass(CALENDAR_SELECTED_DATE_CLASS);
    });
  },
  _renderRange: function _renderRange() {
    var _this$_$rangeCells,
      _this$_$hoveredRangeC,
      _this$_$rangeStartHov,
      _this$_$rangeEndHover,
      _this$_$rangeStartDat,
      _this$_$rangeEndDateC,
      _this3 = this,
      _this$_$rangeStartDat2,
      _this$_$rangeEndDateC2;
    var _this$option2 = this.option(),
      allowValueSelection = _this$option2.allowValueSelection,
      selectionMode = _this$option2.selectionMode,
      value = _this$option2.value,
      range = _this$option2.range;
    if (!allowValueSelection || selectionMode !== 'range') {
      return;
    }
    (_this$_$rangeCells = this._$rangeCells) === null || _this$_$rangeCells === void 0 ? void 0 : _this$_$rangeCells.forEach(function ($cell) {
      $cell.removeClass(CALENDAR_CELL_IN_RANGE_CLASS);
    });
    (_this$_$hoveredRangeC = this._$hoveredRangeCells) === null || _this$_$hoveredRangeC === void 0 ? void 0 : _this$_$hoveredRangeC.forEach(function ($cell) {
      $cell.removeClass(CALENDAR_CELL_RANGE_HOVER_CLASS);
    });
    (_this$_$rangeStartHov = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov === void 0 ? void 0 : _this$_$rangeStartHov.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
    (_this$_$rangeEndHover = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover === void 0 ? void 0 : _this$_$rangeEndHover.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
    (_this$_$rangeStartDat = this._$rangeStartDateCell) === null || _this$_$rangeStartDat === void 0 ? void 0 : _this$_$rangeStartDat.removeClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC === void 0 ? void 0 : _this$_$rangeEndDateC.removeClass(CALENDAR_RANGE_END_DATE_CLASS);
    this._$rangeCells = range.map(function (value) {
      return _this3._getCellByDate(value);
    });
    this._$rangeStartDateCell = this._getCellByDate(value[0]);
    this._$rangeEndDateCell = this._getCellByDate(value[1]);
    this._$rangeCells.forEach(function ($cell) {
      $cell.addClass(CALENDAR_CELL_IN_RANGE_CLASS);
    });
    (_this$_$rangeStartDat2 = this._$rangeStartDateCell) === null || _this$_$rangeStartDat2 === void 0 ? void 0 : _this$_$rangeStartDat2.addClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC2 = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC2 === void 0 ? void 0 : _this$_$rangeEndDateC2.addClass(CALENDAR_RANGE_END_DATE_CLASS);
  },
  _renderHoveredRange() {
    var _this$_$hoveredRangeC2,
      _this$_$rangeStartHov2,
      _this$_$rangeEndHover2,
      _this4 = this,
      _this$_$rangeStartHov3,
      _this$_$rangeEndHover3;
    var _this$option3 = this.option(),
      allowValueSelection = _this$option3.allowValueSelection,
      selectionMode = _this$option3.selectionMode,
      hoveredRange = _this$option3.hoveredRange;
    if (!allowValueSelection || selectionMode !== 'range') {
      return;
    }
    (_this$_$hoveredRangeC2 = this._$hoveredRangeCells) === null || _this$_$hoveredRangeC2 === void 0 ? void 0 : _this$_$hoveredRangeC2.forEach(function ($cell) {
      $cell.removeClass(CALENDAR_CELL_RANGE_HOVER_CLASS);
    });
    (_this$_$rangeStartHov2 = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov2 === void 0 ? void 0 : _this$_$rangeStartHov2.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
    (_this$_$rangeEndHover2 = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover2 === void 0 ? void 0 : _this$_$rangeEndHover2.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
    this._$hoveredRangeCells = hoveredRange.map(function (value) {
      return _this4._getCellByDate(value);
    });
    this._$rangeStartHoverCell = this._getCellByDate(hoveredRange[0]);
    this._$rangeEndHoverCell = this._getCellByDate(hoveredRange[hoveredRange.length - 1]);
    this._$hoveredRangeCells.forEach(function ($cell) {
      $cell.addClass(CALENDAR_CELL_RANGE_HOVER_CLASS);
    });
    (_this$_$rangeStartHov3 = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov3 === void 0 ? void 0 : _this$_$rangeStartHov3.addClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
    (_this$_$rangeEndHover3 = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover3 === void 0 ? void 0 : _this$_$rangeEndHover3.addClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
  },
  getCellAriaLabel: function getCellAriaLabel(date) {
    return this._getCellText(date);
  },
  _getFirstAvailableDate: function _getFirstAvailableDate() {
    var date = this.option('date');
    var min = this.option('min');
    date = _date.default.getViewFirstCellDate(this._getViewName(), date);
    return new Date(min && date < min ? min : date);
  },
  _getCellByDate: abstract,
  isBoundary: abstract,
  _optionChanged: function _optionChanged(args) {
    var name = args.name,
      value = args.value;
    switch (name) {
      case 'value':
        this._renderValue();
        break;
      case 'range':
        this._renderRange();
        break;
      case 'hoveredRange':
        this._renderHoveredRange();
        break;
      case 'contouredDate':
        this._renderContouredDate(value);
        break;
      case 'onCellClick':
        this._createCellClickAction();
        break;
      case 'onCellHover':
        this._createCellHoverAction();
        break;
      case 'min':
      case 'max':
      case 'disabledDates':
      case 'cellTemplate':
      case 'selectionMode':
        this._invalidate();
        break;
      case '_todayDate':
        this._renderBody();
        break;
      default:
        this.callBase(args);
    }
  }
});
var _default = BaseView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;