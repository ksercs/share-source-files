/**
* DevExtreme (cjs/ui/calendar/ui.calendar.base_view.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
var abstract = _ui.default.abstract;
var CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
var CALENDAR_CELL_CLASS = 'dx-calendar-cell';
var CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
var CALENDAR_EMPTY_CELL_CLASS = 'dx-calendar-empty-cell';
var CALENDAR_TODAY_CLASS = 'dx-calendar-today';
var CALENDAR_SELECTED_DATE_CLASS = 'dx-calendar-selected-date';
var CALENDAR_RANGE_DATE_CLASS = 'dx-calendar-range-date';
var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
var CALENDAR_CONTOURED_DATE_CLASS = 'dx-calendar-contoured-date';
var NOT_WEEK_CELL_SELECTOR = "td:not(.".concat(CALENDAR_WEEK_NUMBER_CELL_CLASS, ")");
var CALENDAR_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxCalendar');
var CALENDAR_DXHOVERSTART_EVENT_NAME = (0, _index.addNamespace)(_hover.start, 'dxCalendar');
var CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
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
    this.setAria({
      label: _message.default.format('dxCalendar-ariaWidgetName'),
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
  _appendCell: function _appendCell(row, cell) {
    if (!this._appendMethodName) {
      this._cacheAppendMethodName();
    }
    (0, _renderer.default)(row)[this._appendMethodName](cell);
  },
  _cacheAppendMethodName: function _cacheAppendMethodName(rtlEnabled) {
    this._appendMethodName = (rtlEnabled !== null && rtlEnabled !== void 0 ? rtlEnabled : this.option('rtlEnabled')) ? 'prepend' : 'append';
  },
  _createCell: function _createCell(cellDate) {
    var cell = _dom_adapter.default.createElement('td');
    var $cell = (0, _renderer.default)(cell);
    cell.className = this._getClassNameByDate(cellDate);
    cell.setAttribute('data-value', _date_serialization.default.serializeDate(cellDate, _date.default.getShortDateFormat()));
    (0, _element_data.data)(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
    this.setAria({
      'role': 'gridcell',
      'label': this.getCellAriaLabel(cellDate)
    }, $cell);
    return {
      cell: cell,
      $cell: $cell
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
    var _this$_createCell = this._createCell(cellDate),
      cell = _this$_createCell.cell,
      $cell = _this$_createCell.$cell;
    var cellTemplate = this.option('cellTemplate');
    this._appendCell(row, cell);
    if (cellTemplate) {
      cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell));
    } else {
      cell.innerHTML = this._getCellText(cellDate);
    }
    params.cellDate = this._getNextCellData(cellDate);
  },
  _getClassNameByDate: function _getClassNameByDate(cellDate) {
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
    return className;
  },
  _prepareCellTemplateData: function _prepareCellTemplateData(cellDate, cellIndex, $cell) {
    var isDateCell = cellDate instanceof Date;
    var text = isDateCell ? this._getCellText(cellDate) : cellDate;
    var date = isDateCell ? cellDate : undefined;
    var view = this._getViewName();
    return {
      model: {
        text: text,
        date: date,
        view: view
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
    if (this.option('selectionMode') === 'range') {
      this._createCellHoverAction();
      _events_engine.default.off(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME);
      _events_engine.default.on(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, function (e) {
        if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
          _this._cellHoverAction({
            event: e,
            value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
          });
        }
      });
    }
  },
  _createCellClickAction: function _createCellClickAction() {
    this._cellClickAction = this._createActionByOption('onCellClick');
  },
  _createCellHoverAction: function _createCellHoverAction() {
    this._cellHoverAction = this._createActionByOption('onCellHover');
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
    $newContouredCell.addClass(CALENDAR_CONTOURED_DATE_CLASS);
  },
  _getContouredCell: function _getContouredCell() {
    return this._$table.find(".".concat(CALENDAR_CONTOURED_DATE_CLASS));
  },
  _renderValue: function _renderValue() {
    var _this$_$selectedCells,
      _this2 = this;
    if (!this.option('allowValueSelection')) {
      return;
    }
    var value = this.option('value');
    if (!Array.isArray(value)) {
      value = [value];
    }
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
      _this$_$rangeStartDat,
      _this$_$rangeEndDateC,
      _this3 = this,
      _this$_$rangeStartDat2,
      _this$_$rangeEndDateC2;
    var _this$option = this.option(),
      allowValueSelection = _this$option.allowValueSelection,
      selectionMode = _this$option.selectionMode,
      value = _this$option.value,
      range = _this$option.range;
    if (!allowValueSelection || selectionMode !== 'range') {
      return;
    }
    (_this$_$rangeCells = this._$rangeCells) === null || _this$_$rangeCells === void 0 ? void 0 : _this$_$rangeCells.forEach(function ($cell) {
      $cell.removeClass(CALENDAR_RANGE_DATE_CLASS);
    });
    (_this$_$rangeStartDat = this._$rangeStartDateCell) === null || _this$_$rangeStartDat === void 0 ? void 0 : _this$_$rangeStartDat.removeClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC === void 0 ? void 0 : _this$_$rangeEndDateC.removeClass(CALENDAR_RANGE_END_DATE_CLASS);
    this._$rangeCells = range.map(function (value) {
      return _this3._getCellByDate(value);
    });
    this._$rangeStartDateCell = this._getCellByDate(value[0]);
    this._$rangeEndDateCell = this._getCellByDate(value[1]);
    this._$rangeCells.forEach(function ($cell) {
      $cell.addClass(CALENDAR_RANGE_DATE_CLASS);
    });
    (_this$_$rangeStartDat2 = this._$rangeStartDateCell) === null || _this$_$rangeStartDat2 === void 0 ? void 0 : _this$_$rangeStartDat2.addClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC2 = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC2 === void 0 ? void 0 : _this$_$rangeEndDateC2.addClass(CALENDAR_RANGE_END_DATE_CLASS);
  },
  getCellAriaLabel: function getCellAriaLabel(date) {
    return this._getCellText(date);
  },
  _getFirstAvailableDate: function _getFirstAvailableDate() {
    var date = this.option('date');
    var min = this.option('min');
    date = _date.default.getFirstDateView(this._getViewName(), date);
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
      case 'contouredDate':
        this._renderContouredDate(value);
        break;
      case 'onCellClick':
        this._createCellClickAction();
        break;
      case 'onCellHover':
        this._createCellHoverAction();
        break;
      case 'disabledDates':
      case 'cellTemplate':
        this._invalidate();
        break;
      case 'rtlEnabled':
        this._cacheAppendMethodName(value);
        this.callBase(args);
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
