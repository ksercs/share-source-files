!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/calendar/ui.calendar.views.js"], ["../../core/renderer","./ui.calendar.base_view","../../core/dom_adapter","../../core/utils/common","../../core/utils/date","../../core/utils/extend","../../localization/date","../../core/utils/date_serialization"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/calendar/ui.calendar.views.js", ["../../core/renderer", "./ui.calendar.base_view", "../../core/dom_adapter", "../../core/utils/common", "../../core/utils/date", "../../core/utils/extend", "../../localization/date", "../../core/utils/date_serialization"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _uiCalendar = _interopRequireDefault($__require("./ui.calendar.base_view"));
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _common = $__require("../../core/utils/common");
  var _date = _interopRequireDefault($__require("../../core/utils/date"));
  var _extend = $__require("../../core/utils/extend");
  var _date2 = _interopRequireDefault($__require("../../localization/date"));
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var CALENDAR_OTHER_MONTH_CLASS = 'dx-calendar-other-month';
  var CALENDAR_OTHER_VIEW_CLASS = 'dx-calendar-other-view';
  var CALENDAR_WEEK_NUMBER_CELL_CLASS = 'dx-calendar-week-number-cell';
  var Views = {
    'month': _uiCalendar.default.inherit({
      _getViewName: function _getViewName() {
        return 'month';
      },
      _getDefaultOptions: function _getDefaultOptions() {
        return (0, _extend.extend)(this.callBase(), {
          firstDayOfWeek: 0,
          rowCount: 6,
          colCount: 7
        });
      },
      _renderImpl: function _renderImpl() {
        this.callBase();
        this._renderHeader();
      },
      _renderBody: function _renderBody() {
        this.callBase();
        this._$table.find(".".concat(CALENDAR_OTHER_VIEW_CLASS)).addClass(CALENDAR_OTHER_MONTH_CLASS);
      },
      _renderFocusTarget: _common.noop,
      getCellAriaLabel: function getCellAriaLabel(date) {
        return _date2.default.format(date, 'longdate');
      },
      _renderHeader: function _renderHeader() {
        var $headerRow = (0, _renderer.default)('<tr>');
        var $header = (0, _renderer.default)('<thead>').append($headerRow);
        this._$table.prepend($header);
        for (var colIndex = 0, colCount = this.option('colCount'); colIndex < colCount; colIndex++) {
          this._renderHeaderCell(colIndex, $headerRow);
        }
        if (this.option('showWeekNumbers')) {
          this._renderWeekHeaderCell($headerRow);
        }
      },
      _renderHeaderCell: function _renderHeaderCell(cellIndex, $headerRow) {
        var _this$option = this.option(),
            firstDayOfWeek = _this$option.firstDayOfWeek;
        var _this$_getDayCaption = this._getDayCaption(firstDayOfWeek + cellIndex),
            fullCaption = _this$_getDayCaption.full,
            abbrCaption = _this$_getDayCaption.abbreviated;
        var $cell = (0, _renderer.default)('<th>').attr({
          scope: 'col',
          abbr: fullCaption
        }).text(abbrCaption);
        this._appendCell($headerRow, $cell);
      },
      _renderWeekHeaderCell: function _renderWeekHeaderCell($headerRow) {
        var $weekNumberHeaderCell = (0, _renderer.default)('<th>').attr({
          scope: 'col',
          abbr: 'WeekNumber',
          class: 'dx-week-number-header'
        });
        var rtlEnabled = this.option('rtlEnabled');
        if (rtlEnabled) {
          $headerRow.append($weekNumberHeaderCell);
        } else {
          $headerRow.prepend($weekNumberHeaderCell);
        }
      },
      _renderWeekNumberCell: function _renderWeekNumberCell(rowData) {
        var _this$option2 = this.option(),
            showWeekNumbers = _this$option2.showWeekNumbers,
            rtlEnabled = _this$option2.rtlEnabled,
            cellTemplate = _this$option2.cellTemplate;
        if (!showWeekNumbers) {
          return;
        }
        var weekNumber = this._getWeekNumber(rowData.prevCellDate);
        var cell = _dom_adapter.default.createElement('td');
        var $cell = (0, _renderer.default)(cell);
        cell.className = CALENDAR_WEEK_NUMBER_CELL_CLASS;
        if (cellTemplate) {
          cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell));
        } else {
          cell.innerHTML = weekNumber;
        }
        if (rtlEnabled) {
          rowData.row.append(cell);
        } else {
          rowData.row.prepend(cell);
        }
        this.setAria({
          'role': 'gridcell',
          'label': "Week ".concat(weekNumber)
        }, $cell);
      },
      _getWeekNumber: function _getWeekNumber(date) {
        var _this$option3 = this.option(),
            weekNumberRule = _this$option3.weekNumberRule,
            firstDayOfWeek = _this$option3.firstDayOfWeek;
        if (weekNumberRule === 'auto') {
          return _date.default.getWeekNumber(date, firstDayOfWeek, firstDayOfWeek === 1 ? 'firstFourDays' : 'firstDay');
        }
        return _date.default.getWeekNumber(date, firstDayOfWeek, weekNumberRule);
      },
      getNavigatorCaption: function getNavigatorCaption() {
        return _date2.default.format(this.option('date'), 'monthandyear');
      },
      _isTodayCell: function _isTodayCell(cellDate) {
        var today = this.option('_todayDate')();
        return _date.default.sameDate(cellDate, today);
      },
      _isDateOutOfRange: function _isDateOutOfRange(cellDate) {
        var minDate = this.option('min');
        var maxDate = this.option('max');
        return !_date.default.dateInRange(cellDate, minDate, maxDate, 'date');
      },
      _isOtherView: function _isOtherView(cellDate) {
        return cellDate.getMonth() !== this.option('date').getMonth();
      },
      _getCellText: function _getCellText(cellDate) {
        return _date2.default.format(cellDate, 'd');
      },
      _getDayCaption: function _getDayCaption(day) {
        var daysInWeek = this.option('colCount');
        var dayIndex = day % daysInWeek;
        return {
          full: _date2.default.getDayNames()[dayIndex],
          abbreviated: _date2.default.getDayNames('abbreviated')[dayIndex]
        };
      },
      _getFirstCellData: function _getFirstCellData() {
        var _this$option4 = this.option(),
            firstDayOfWeek = _this$option4.firstDayOfWeek;
        var firstDay = _date.default.getFirstMonthDate(this.option('date'));
        var firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
        var daysInWeek = this.option('colCount');
        if (firstMonthDayOffset >= 0) {
          firstMonthDayOffset -= daysInWeek;
        }
        firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
        return firstDay;
      },
      _getNextCellData: function _getNextCellData(date) {
        date = new Date(date);
        date.setDate(date.getDate() + 1);
        return date;
      },
      _getCellByDate: function _getCellByDate(date) {
        return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(date, _date.default.getShortDateFormat()), "']"));
      },
      isBoundary: function isBoundary(date) {
        return _date.default.sameMonthAndYear(date, this.option('min')) || _date.default.sameMonthAndYear(date, this.option('max'));
      },
      _getDefaultDisabledDatesHandler: function _getDefaultDisabledDatesHandler(disabledDates) {
        return function (args) {
          var isDisabledDate = disabledDates.some(function (item) {
            return _date.default.sameDate(item, args.date);
          });
          if (isDisabledDate) {
            return true;
          }
        };
      }
    }),
    'year': _uiCalendar.default.inherit({
      _getViewName: function _getViewName() {
        return 'year';
      },
      _isTodayCell: function _isTodayCell(cellDate) {
        var today = this.option('_todayDate')();
        return _date.default.sameMonthAndYear(cellDate, today);
      },
      _isDateOutOfRange: function _isDateOutOfRange(cellDate) {
        return !_date.default.dateInRange(cellDate, _date.default.getFirstMonthDate(this.option('min')), _date.default.getLastMonthDate(this.option('max')));
      },
      _isOtherView: function _isOtherView() {
        return false;
      },
      _getCellText: function _getCellText(cellDate) {
        return _date2.default.getMonthNames('abbreviated')[cellDate.getMonth()];
      },
      _getFirstCellData: function _getFirstCellData() {
        var currentDate = this.option('date');
        var data = new Date(currentDate);
        data.setDate(1);
        data.setMonth(0);
        return data;
      },
      _getNextCellData: function _getNextCellData(date) {
        date = new Date(date);
        date.setMonth(date.getMonth() + 1);
        return date;
      },
      _getCellByDate: function _getCellByDate(date) {
        var foundDate = new Date(date);
        foundDate.setDate(1);
        return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"));
      },
      getCellAriaLabel: function getCellAriaLabel(date) {
        return _date2.default.format(date, 'monthandyear');
      },
      getNavigatorCaption: function getNavigatorCaption() {
        return _date2.default.format(this.option('date'), 'yyyy');
      },
      isBoundary: function isBoundary(date) {
        return _date.default.sameYear(date, this.option('min')) || _date.default.sameYear(date, this.option('max'));
      },
      _renderWeekNumberCell: _common.noop
    }),
    'decade': _uiCalendar.default.inherit({
      _getViewName: function _getViewName() {
        return 'decade';
      },
      _isTodayCell: function _isTodayCell(cellDate) {
        var today = this.option('_todayDate')();
        return _date.default.sameYear(cellDate, today);
      },
      _isDateOutOfRange: function _isDateOutOfRange(cellDate) {
        var min = this.option('min');
        var max = this.option('max');
        return !_date.default.dateInRange(cellDate.getFullYear(), min && min.getFullYear(), max && max.getFullYear());
      },
      _isOtherView: function _isOtherView(cellDate) {
        var date = new Date(cellDate);
        date.setMonth(1);
        return !_date.default.sameDecade(date, this.option('date'));
      },
      _getCellText: function _getCellText(cellDate) {
        return _date2.default.format(cellDate, 'yyyy');
      },
      _getFirstCellData: function _getFirstCellData() {
        var year = _date.default.getFirstYearInDecade(this.option('date')) - 1;
        return _date.default.createDateWithFullYear(year, 0, 1);
      },
      _getNextCellData: function _getNextCellData(date) {
        date = new Date(date);
        date.setFullYear(date.getFullYear() + 1);
        return date;
      },
      getNavigatorCaption: function getNavigatorCaption() {
        var currentDate = this.option('date');
        var firstYearInDecade = _date.default.getFirstYearInDecade(currentDate);
        var startDate = new Date(currentDate);
        var endDate = new Date(currentDate);
        startDate.setFullYear(firstYearInDecade);
        endDate.setFullYear(firstYearInDecade + 9);
        return _date2.default.format(startDate, 'yyyy') + '-' + _date2.default.format(endDate, 'yyyy');
      },
      _isValueOnCurrentView: function _isValueOnCurrentView(currentDate, value) {
        return _date.default.sameDecade(currentDate, value);
      },
      _getCellByDate: function _getCellByDate(date) {
        var foundDate = new Date(date);
        foundDate.setDate(1);
        foundDate.setMonth(0);
        return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"));
      },
      isBoundary: function isBoundary(date) {
        return _date.default.sameDecade(date, this.option('min')) || _date.default.sameDecade(date, this.option('max'));
      },
      _renderWeekNumberCell: _common.noop
    }),
    'century': _uiCalendar.default.inherit({
      _getViewName: function _getViewName() {
        return 'century';
      },
      _isTodayCell: function _isTodayCell(cellDate) {
        var today = this.option('_todayDate')();
        return _date.default.sameDecade(cellDate, today);
      },
      _isDateOutOfRange: function _isDateOutOfRange(cellDate) {
        var decade = _date.default.getFirstYearInDecade(cellDate);
        var minDecade = _date.default.getFirstYearInDecade(this.option('min'));
        var maxDecade = _date.default.getFirstYearInDecade(this.option('max'));
        return !_date.default.dateInRange(decade, minDecade, maxDecade);
      },
      _isOtherView: function _isOtherView(cellDate) {
        var date = new Date(cellDate);
        date.setMonth(1);
        return !_date.default.sameCentury(date, this.option('date'));
      },
      _getCellText: function _getCellText(cellDate) {
        var startDate = _date2.default.format(cellDate, 'yyyy');
        var endDate = new Date(cellDate);
        endDate.setFullYear(endDate.getFullYear() + 9);
        return startDate + ' - ' + _date2.default.format(endDate, 'yyyy');
      },
      _getFirstCellData: function _getFirstCellData() {
        var decade = _date.default.getFirstDecadeInCentury(this.option('date')) - 10;
        return _date.default.createDateWithFullYear(decade, 0, 1);
      },
      _getNextCellData: function _getNextCellData(date) {
        date = new Date(date);
        date.setFullYear(date.getFullYear() + 10);
        return date;
      },
      _getCellByDate: function _getCellByDate(date) {
        var foundDate = new Date(date);
        foundDate.setDate(1);
        foundDate.setMonth(0);
        foundDate.setFullYear(_date.default.getFirstYearInDecade(foundDate));
        return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"));
      },
      getNavigatorCaption: function getNavigatorCaption() {
        var currentDate = this.option('date');
        var firstDecadeInCentury = _date.default.getFirstDecadeInCentury(currentDate);
        var startDate = new Date(currentDate);
        var endDate = new Date(currentDate);
        startDate.setFullYear(firstDecadeInCentury);
        endDate.setFullYear(firstDecadeInCentury + 99);
        return _date2.default.format(startDate, 'yyyy') + '-' + _date2.default.format(endDate, 'yyyy');
      },
      isBoundary: function isBoundary(date) {
        return _date.default.sameCentury(date, this.option('min')) || _date.default.sameCentury(date, this.option('max'));
      },
      _renderWeekNumberCell: _common.noop
    })
  };
  var _default = Views;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./ui.calendar.base_view","../../core/dom_adapter","../../core/utils/common","../../core/utils/date","../../core/utils/extend","../../localization/date","../../core/utils/date_serialization"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./ui.calendar.base_view"), require("../../core/dom_adapter"), require("../../core/utils/common"), require("../../core/utils/date"), require("../../core/utils/extend"), require("../../localization/date"), require("../../core/utils/date_serialization"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.calendar.views.js.map