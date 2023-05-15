import $ from '../../core/renderer';
import domAdapter from '../../core/dom_adapter';
import eventsEngine from '../../events/core/events_engine';
import { data as elementData } from '../../core/element_data';
import { getPublicElement } from '../../core/element';
import Widget from '../widget/ui.widget';
import coreDateUtils from '../../core/utils/date';
import { extend } from '../../core/utils/extend';
import { noop } from '../../core/utils/common';
import dateSerialization from '../../core/utils/date_serialization';
import messageLocalization from '../../localization/message';
import { addNamespace } from '../../events/utils/index';
import { name as clickEventName } from '../../events/click';
import { start as hoverStartEventName } from '../../events/hover';
var {
  abstract
} = Widget;
var CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
var CALENDAR_CELL_CLASS = 'dx-calendar-cell';
var CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
var CALENDAR_EMPTY_CELL_CLASS = 'dx-calendar-empty-cell';
var CALENDAR_TODAY_CLASS = 'dx-calendar-today';
var CALENDAR_SELECTED_DATE_CLASS = 'dx-calendar-selected-date';
var CALENDAR_CELL_IN_RANGE_CLASS = 'dx-calendar-cell-in-range';
var CALENDAR_CELL_RANGE_HOVER_START_CLASS = 'dx-calendar-cell-range-hover-start';
var CALENDAR_CELL_RANGE_HOVER_END_CLASS = 'dx-calendar-cell-range-hover-end';
var CALENDAR_RANGE_START_DATE_CLASS = 'dx-calendar-range-start-date';
var CALENDAR_RANGE_END_DATE_CLASS = 'dx-calendar-range-end-date';
var CALENDAR_CONTOURED_DATE_CLASS = 'dx-calendar-contoured-date';
var NOT_WEEK_CELL_SELECTOR = "td:not(.".concat(CALENDAR_WEEK_NUMBER_CELL_CLASS, ")");
var CALENDAR_DXCLICK_EVENT_NAME = addNamespace(clickEventName, 'dxCalendar');
var CALENDAR_DXHOVERSTART_EVENT_NAME = addNamespace(hoverStartEventName, 'dxCalendar');
var CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
var BaseView = Widget.inherit({
  _getViewName: function _getViewName() {
    return 'base';
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      date: new Date(),
      focusStateEnabled: false,
      cellTemplate: null,
      disabledDates: null,
      onCellClick: null,
      onCellHover: null,
      rowCount: 3,
      colCount: 4,
      allowValueSelection: true,
      _todayDate: () => new Date()
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
    this._$table = $('<table>');
    var localizedWidgetName = messageLocalization.format('dxCalendar-ariaWidgetName');
    var localizedHotKeysInfo = messageLocalization.format('dxCalendar-ariaHotKeysInfo');
    this.setAria({
      label: "".concat(localizedWidgetName, ". ").concat(localizedHotKeysInfo),
      role: 'grid'
    }, this._$table);
    return this._$table;
  },
  _renderBody: function _renderBody() {
    this.$body = $('<tbody>').appendTo(this._$table);
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
    var row = domAdapter.createElement('tr');
    this.setAria('role', 'row', $(row));
    this.$body.get(0).appendChild(row);
    return row;
  },
  _appendCell: function _appendCell(row, cell) {
    if (!this._appendMethodName) {
      this._cacheAppendMethodName();
    }
    $(row)[this._appendMethodName](cell);
  },
  _cacheAppendMethodName: function _cacheAppendMethodName(rtlEnabled) {
    this._appendMethodName = (rtlEnabled !== null && rtlEnabled !== void 0 ? rtlEnabled : this.option('rtlEnabled')) ? 'prepend' : 'append';
  },
  _createCell: function _createCell(cellDate) {
    var cell = domAdapter.createElement('td');
    var $cell = $(cell);
    cell.className = this._getClassNameByDate(cellDate);
    cell.setAttribute('data-value', dateSerialization.serializeDate(cellDate, coreDateUtils.getShortDateFormat()));
    elementData(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
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
    var {
      cellDate,
      prevCellDate,
      row
    } = params;

    // T425127
    if (prevCellDate) {
      coreDateUtils.fixTimezoneGap(prevCellDate, cellDate);
    }
    params.prevCellDate = cellDate;
    var {
      cell,
      $cell
    } = this._createCell(cellDate);
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
        text,
        date,
        view
      },
      container: getPublicElement($cell),
      index: cellIndex
    };
  },
  _renderEvents: function _renderEvents() {
    this._createCellClickAction();
    eventsEngine.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
    eventsEngine.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, e => {
      if (!$(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
        this._cellClickAction({
          event: e,
          value: $(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
        });
      }
    });
    if (this.option('selectionMode') === 'range') {
      this._createCellHoverAction();
      eventsEngine.off(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME);
      eventsEngine.on(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, e => {
        if (!$(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
          this._cellHoverAction({
            event: e,
            value: $(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
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
    this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates || noop;
  },
  _getDefaultDisabledDatesHandler: function _getDefaultDisabledDatesHandler(disabledDates) {
    return noop;
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
    var _this$_$selectedCells;
    (_this$_$selectedCells = this._$selectedCells) === null || _this$_$selectedCells === void 0 ? void 0 : _this$_$selectedCells.forEach($cell => {
      $cell.removeClass(CALENDAR_SELECTED_DATE_CLASS);
    });
    this._$selectedCells = value.map(value => this._getCellByDate(value));
    this._$selectedCells.forEach($cell => {
      $cell.addClass(CALENDAR_SELECTED_DATE_CLASS);
    });
  },
  _renderRange: function _renderRange() {
    var _this$_$rangeCells, _this$_$rangeStartDat, _this$_$rangeEndDateC, _this$_$rangeStartHov, _this$_$rangeEndHover, _this$_$rangeStartHov2, _this$_$rangeEndHover2, _this$_$rangeStartDat2, _this$_$rangeEndDateC2;
    var {
      allowValueSelection,
      selectionMode,
      value,
      range
    } = this.option();
    if (!allowValueSelection || selectionMode !== 'range') {
      return;
    }
    (_this$_$rangeCells = this._$rangeCells) === null || _this$_$rangeCells === void 0 ? void 0 : _this$_$rangeCells.forEach($cell => {
      $cell.removeClass(CALENDAR_CELL_IN_RANGE_CLASS);
    });
    (_this$_$rangeStartDat = this._$rangeStartDateCell) === null || _this$_$rangeStartDat === void 0 ? void 0 : _this$_$rangeStartDat.removeClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC === void 0 ? void 0 : _this$_$rangeEndDateC.removeClass(CALENDAR_RANGE_END_DATE_CLASS);
    (_this$_$rangeStartHov = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov === void 0 ? void 0 : _this$_$rangeStartHov.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
    (_this$_$rangeEndHover = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover === void 0 ? void 0 : _this$_$rangeEndHover.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
    this._$rangeCells = range.map(value => this._getCellByDate(value));
    if (this.option('rtlEnabled')) {
      this._$rangeStartHoverCell = this._getCellByDate(range[range.length - 1]);
      this._$rangeEndHoverCell = this._getCellByDate(range[0]);
    } else {
      this._$rangeStartHoverCell = this._getCellByDate(range[0]);
      this._$rangeEndHoverCell = this._getCellByDate(range[range.length - 1]);
    }
    this._$rangeStartDateCell = this._getCellByDate(value[0]);
    this._$rangeEndDateCell = this._getCellByDate(value[1]);
    this._$rangeCells.forEach($cell => {
      $cell.addClass(CALENDAR_CELL_IN_RANGE_CLASS);
    });
    (_this$_$rangeStartHov2 = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov2 === void 0 ? void 0 : _this$_$rangeStartHov2.addClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
    (_this$_$rangeEndHover2 = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover2 === void 0 ? void 0 : _this$_$rangeEndHover2.addClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
    (_this$_$rangeStartDat2 = this._$rangeStartDateCell) === null || _this$_$rangeStartDat2 === void 0 ? void 0 : _this$_$rangeStartDat2.addClass(CALENDAR_RANGE_START_DATE_CLASS);
    (_this$_$rangeEndDateC2 = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC2 === void 0 ? void 0 : _this$_$rangeEndDateC2.addClass(CALENDAR_RANGE_END_DATE_CLASS);
  },
  getCellAriaLabel: function getCellAriaLabel(date) {
    return this._getCellText(date);
  },
  _getFirstAvailableDate: function _getFirstAvailableDate() {
    var date = this.option('date');
    var min = this.option('min');
    date = coreDateUtils.getFirstDateView(this._getViewName(), date);
    return new Date(min && date < min ? min : date);
  },
  _getCellByDate: abstract,
  isBoundary: abstract,
  _optionChanged: function _optionChanged(args) {
    var {
      name,
      value
    } = args;
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
      case 'min':
      case 'max':
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
export default BaseView;