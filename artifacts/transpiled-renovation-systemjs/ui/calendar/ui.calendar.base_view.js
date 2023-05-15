!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/calendar/ui.calendar.base_view.js"], ["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/element_data","../../core/element","../widget/ui.widget","../../core/utils/date","../../core/utils/extend","../../core/utils/common","../../core/utils/date_serialization","../../localization/message","../../events/utils/index","../../events/click","../../events/hover"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/calendar/ui.calendar.base_view.js", ["../../core/renderer", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/element_data", "../../core/element", "../widget/ui.widget", "../../core/utils/date", "../../core/utils/extend", "../../core/utils/common", "../../core/utils/date_serialization", "../../localization/message", "../../events/utils/index", "../../events/click", "../../events/hover"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _element_data = $__require("../../core/element_data");
  var _element = $__require("../../core/element");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _extend = $__require("../../core/utils/extend");
  var _common = $__require("../../core/utils/common");
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _index = $__require("../../events/utils/index");
  var _click = $__require("../../events/click");
  var _hover = $__require("../../events/hover");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var abstract = _ui.default.abstract;
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
      var localizedWidgetName = _message.default.format('dxCalendar-ariaWidgetName');
      var localizedHotKeysInfo = _message.default.format('dxCalendar-ariaHotKeysInfo');
      this.setAria({
        label: "".concat(localizedWidgetName, ". ").concat(localizedHotKeysInfo),
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
          _this$_$rangeStartDat,
          _this$_$rangeEndDateC,
          _this$_$rangeStartHov,
          _this$_$rangeEndHover,
          _this3 = this,
          _this$_$rangeStartHov2,
          _this$_$rangeEndHover2,
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
        $cell.removeClass(CALENDAR_CELL_IN_RANGE_CLASS);
      });
      (_this$_$rangeStartDat = this._$rangeStartDateCell) === null || _this$_$rangeStartDat === void 0 ? void 0 : _this$_$rangeStartDat.removeClass(CALENDAR_RANGE_START_DATE_CLASS);
      (_this$_$rangeEndDateC = this._$rangeEndDateCell) === null || _this$_$rangeEndDateC === void 0 ? void 0 : _this$_$rangeEndDateC.removeClass(CALENDAR_RANGE_END_DATE_CLASS);
      (_this$_$rangeStartHov = this._$rangeStartHoverCell) === null || _this$_$rangeStartHov === void 0 ? void 0 : _this$_$rangeStartHov.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
      (_this$_$rangeEndHover = this._$rangeEndHoverCell) === null || _this$_$rangeEndHover === void 0 ? void 0 : _this$_$rangeEndHover.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
      this._$rangeCells = range.map(function (value) {
        return _this3._getCellByDate(value);
      });
      if (this.option('rtlEnabled')) {
        this._$rangeStartHoverCell = this._getCellByDate(range[range.length - 1]);
        this._$rangeEndHoverCell = this._getCellByDate(range[0]);
      } else {
        this._$rangeStartHoverCell = this._getCellByDate(range[0]);
        this._$rangeEndHoverCell = this._getCellByDate(range[range.length - 1]);
      }
      this._$rangeStartDateCell = this._getCellByDate(value[0]);
      this._$rangeEndDateCell = this._getCellByDate(value[1]);
      this._$rangeCells.forEach(function ($cell) {
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
  var _default = BaseView;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/dom_adapter","../../events/core/events_engine","../../core/element_data","../../core/element","../widget/ui.widget","../../core/utils/date","../../core/utils/extend","../../core/utils/common","../../core/utils/date_serialization","../../localization/message","../../events/utils/index","../../events/click","../../events/hover"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/element_data"), require("../../core/element"), require("../widget/ui.widget"), require("../../core/utils/date"), require("../../core/utils/extend"), require("../../core/utils/common"), require("../../core/utils/date_serialization"), require("../../localization/message"), require("../../events/utils/index"), require("../../events/click"), require("../../events/hover"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.calendar.base_view.js.map