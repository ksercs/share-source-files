!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/calendar/ui.calendar.js"], ["../../core/utils/size","../../core/renderer","../../core/guid","../../core/component_registrator","../../core/utils/common","../../core/utils/type","../../core/utils/math","../../core/utils/extend","../button","../editor/editor","../../events/gesture/swipeable","./ui.calendar.navigator","./ui.calendar.views","../../animation/translator","../../core/utils/date","../../core/utils/date_serialization","../../core/devices","../../animation/fx","../../core/utils/window","../../localization/message","../../localization/date","../../core/templates/function_template","../../events/utils/index","./ui.calendar.single.selection.strategy","./ui.calendar.multi.selection.strategy","./ui.calendar.range.selection.strategy"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/calendar/ui.calendar.js", ["../../core/utils/size", "../../core/renderer", "../../core/guid", "../../core/component_registrator", "../../core/utils/common", "../../core/utils/type", "../../core/utils/math", "../../core/utils/extend", "../button", "../editor/editor", "../../events/gesture/swipeable", "./ui.calendar.navigator", "./ui.calendar.views", "../../animation/translator", "../../core/utils/date", "../../core/utils/date_serialization", "../../core/devices", "../../animation/fx", "../../core/utils/window", "../../localization/message", "../../localization/date", "../../core/templates/function_template", "../../events/utils/index", "./ui.calendar.single.selection.strategy", "./ui.calendar.multi.selection.strategy", "./ui.calendar.range.selection.strategy"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _common = $__require("../../core/utils/common");
  var _type = $__require("../../core/utils/type");
  var _math = $__require("../../core/utils/math");
  var _extend = $__require("../../core/utils/extend");
  var _button = _interopRequireDefault($__require("../button"));
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _swipeable = _interopRequireDefault($__require("../../events/gesture/swipeable"));
  var _uiCalendar = _interopRequireDefault($__require("./ui.calendar.navigator"));
  var _uiCalendar2 = _interopRequireDefault($__require("./ui.calendar.views"));
  var _translator = $__require("../../animation/translator");
  var _date2 = _interopRequireDefault($__require("../../core/utils/date"));
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _fx = _interopRequireDefault($__require("../../animation/fx"));
  var _window = $__require("../../core/utils/window");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _date3 = _interopRequireDefault($__require("../../localization/date"));
  var _function_template = $__require("../../core/templates/function_template");
  var _index = $__require("../../events/utils/index");
  var _uiCalendarSingleSelection = _interopRequireDefault($__require("./ui.calendar.single.selection.strategy"));
  var _uiCalendarMultiSelection = _interopRequireDefault($__require("./ui.calendar.multi.selection.strategy"));
  var _uiCalendarRangeSelection = _interopRequireDefault($__require("./ui.calendar.range.selection.strategy"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  // STYLE calendar

  var CALENDAR_CLASS = 'dx-calendar';
  var CALENDAR_BODY_CLASS = 'dx-calendar-body';
  var CALENDAR_CELL_CLASS = 'dx-calendar-cell';
  var CALENDAR_FOOTER_CLASS = 'dx-calendar-footer';
  var CALENDAR_TODAY_BUTTON_CLASS = 'dx-calendar-today-button';
  var CALENDAR_HAS_FOOTER_CLASS = 'dx-calendar-with-footer';
  var CALENDAR_VIEWS_WRAPPER_CLASS = 'dx-calendar-views-wrapper';
  var CALENDAR_VIEW_CLASS = 'dx-calendar-view';
  var CALENDAR_MULTIVIEW_CLASS = 'dx-calendar-multiview';
  var CALENDAR_RANGE_CLASS = 'dx-calendar-range';
  var FOCUSED_STATE_CLASS = 'dx-state-focused';
  var GESTURE_COVER_CLASS = 'dx-gesture-cover';
  var ANIMATION_DURATION_SHOW_VIEW = 250;
  var POP_ANIMATION_FROM = 0.6;
  var POP_ANIMATION_TO = 1;
  var CALENDAR_INPUT_STANDARD_PATTERN = 'yyyy-MM-dd';
  var CALENDAR_DATE_VALUE_KEY = 'dxDateValueKey';
  var LEVEL_COMPARE_MAP = {
    'month': 3,
    'year': 2,
    'decade': 1,
    'century': 0
  };
  var ZOOM_LEVEL = {
    MONTH: 'month',
    YEAR: 'year',
    DECADE: 'decade',
    CENTURY: 'century'
  };
  var SELECTION_STRATEGIES = {
    SingleSelection: _uiCalendarSingleSelection.default,
    MultiSelection: _uiCalendarMultiSelection.default,
    RangeSelection: _uiCalendarRangeSelection.default
  };
  function elementHasFocus(element) {
    return element.hasClass(FOCUSED_STATE_CLASS);
  }
  var Calendar = _editor.default.inherit({
    _activeStateUnit: '.' + CALENDAR_CELL_CLASS,
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        hoverStateEnabled: true,
        activeStateEnabled: true,
        /**
        * @name dxCalendarOptions.currentDate
        * @type Date
        * @hidden
        * @default new Date()
        */
        currentDate: new Date(),
        value: null,
        values: [],
        dateSerializationFormat: undefined,
        min: new Date(1000, 0),
        max: new Date(3000, 0),
        firstDayOfWeek: undefined,
        viewsCount: 1,
        zoomLevel: ZOOM_LEVEL.MONTH,
        maxZoomLevel: ZOOM_LEVEL.MONTH,
        minZoomLevel: ZOOM_LEVEL.CENTURY,
        selectionMode: 'single',
        showTodayButton: false,
        showWeekNumbers: false,
        weekNumberRule: 'auto',
        cellTemplate: 'cell',
        disabledDates: null,
        onCellClick: null,
        onContouredChanged: null,
        skipFocusCheck: false,
        _todayDate: function _todayDate() {
          return new Date();
        }

        /**
        * @name dxCalendarOptions.onContentReady
        * @hidden true
        * @action
        */
      });
    },

    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _supportedKeys: function _supportedKeys() {
      return (0, _extend.extend)(this.callBase(), {
        rightArrow: function rightArrow(e) {
          e.preventDefault();
          if ((0, _index.isCommandKeyPressed)(e)) {
            this._waitRenderView(1);
          } else {
            this._moveCurrentDateByOffset(1 * this._getRtlCorrection());
          }
        },
        leftArrow: function leftArrow(e) {
          e.preventDefault();
          if ((0, _index.isCommandKeyPressed)(e)) {
            this._waitRenderView(-1);
          } else {
            this._moveCurrentDateByOffset(-1 * this._getRtlCorrection());
          }
        },
        upArrow: function upArrow(e) {
          e.preventDefault();
          if ((0, _index.isCommandKeyPressed)(e)) {
            this._navigateUp();
          } else {
            if (_fx.default.isAnimating(this._view.$element())) {
              return;
            }
            this._moveCurrentDateByOffset(-1 * this._view.option('colCount'));
          }
        },
        downArrow: function downArrow(e) {
          e.preventDefault();
          if ((0, _index.isCommandKeyPressed)(e)) {
            this._navigateDown();
          } else {
            if (_fx.default.isAnimating(this._view.$element())) {
              return;
            }
            this._moveCurrentDateByOffset(1 * this._view.option('colCount'));
          }
        },
        home: function home(e) {
          e.preventDefault();
          var zoomLevel = this.option('zoomLevel');
          var currentDate = this.option('currentDate');
          var min = this._dateOption('min');
          if (this._view.isDateDisabled(currentDate)) {
            return;
          }
          var date = _date2.default.sameView(zoomLevel, currentDate, min) ? min : _date2.default.getViewFirstCellDate(zoomLevel, currentDate);
          this._moveToClosestAvailableDate(date);
        },
        end: function end(e) {
          e.preventDefault();
          var zoomLevel = this.option('zoomLevel');
          var currentDate = this.option('currentDate');
          var max = this._dateOption('max');
          if (this._view.isDateDisabled(currentDate)) {
            return;
          }
          var date = _date2.default.sameView(zoomLevel, currentDate, max) ? max : _date2.default.getViewLastCellDate(zoomLevel, currentDate);
          this._moveToClosestAvailableDate(date);
        },
        pageUp: function pageUp(e) {
          e.preventDefault();
          this._waitRenderView(-1 * this._getRtlCorrection());
        },
        pageDown: function pageDown(e) {
          e.preventDefault();
          this._waitRenderView(1 * this._getRtlCorrection());
        },
        tab: _common.noop,
        enter: this._enterKeyHandler
      });
    },
    _enterKeyHandler: function _enterKeyHandler(e) {
      if (!this._isMaxZoomLevel()) {
        this._navigateDown();
      } else if (!this._view.isDateDisabled(this.option('currentDate'))) {
        var value = this._updateTimeComponent(this.option('currentDate'));
        this._selectionStrategy.selectValue(value, e);
      }
    },
    _getSerializationFormat: function _getSerializationFormat(optionName) {
      var value = this.option(optionName || 'value');
      if (this.option('dateSerializationFormat')) {
        return this.option('dateSerializationFormat');
      }
      if ((0, _type.isNumeric)(value)) {
        return 'number';
      }
      if (!(0, _type.isString)(value)) {
        return;
      }
      return _date_serialization.default.getDateSerializationFormat(value);
    },
    _convertToDate: function _convertToDate(value) {
      return _date_serialization.default.deserializeDate(value);
    },
    _dateValue: function _dateValue(value, event) {
      var optionName = Array.isArray(value) ? 'values' : 'value';
      if (event) {
        if (event.type === 'keydown') {
          var cellElement = this._view._getContouredCell().get(0);
          event.target = cellElement;
        }
        this._saveValueChangeEvent(event);
      }
      this._dateOption(optionName, value);
    },
    _dateOption: function _dateOption(optionName, optionValue) {
      var _this = this;
      if (arguments.length === 1) {
        var _this$option;
        var values = (_this$option = this.option('values')) !== null && _this$option !== void 0 ? _this$option : [];
        return optionName === 'values' ? values.map(function (value) {
          return _this._convertToDate(value);
        }) : this._convertToDate(this.option(optionName));
      }
      var serializationFormat = this._getSerializationFormat(optionName);
      var serializedValue = optionName === 'values' ? (optionValue === null || optionValue === void 0 ? void 0 : optionValue.map(function (value) {
        return _date_serialization.default.serializeDate(value, serializationFormat);
      })) || [] : _date_serialization.default.serializeDate(optionValue, serializationFormat);
      this.option(optionName, serializedValue);
    },
    _shiftDate: function _shiftDate(zoomLevel, date, offset, reverse) {
      switch (zoomLevel) {
        case ZOOM_LEVEL.MONTH:
          date.setDate(date.getDate() + offset * reverse);
          break;
        case ZOOM_LEVEL.YEAR:
          date.setMonth(date.getMonth() + offset * reverse);
          break;
        case ZOOM_LEVEL.DECADE:
          date.setFullYear(date.getFullYear() + offset * reverse);
          break;
        case ZOOM_LEVEL.CENTURY:
          date.setFullYear(date.getFullYear() + 10 * offset * reverse);
          break;
      }
    },
    _moveCurrentDateByOffset: function _moveCurrentDateByOffset(offset) {
      var baseDate = this.option('currentDate');
      var currentDate = new Date(baseDate);
      var zoomLevel = this.option('zoomLevel');
      this._shiftDate(zoomLevel, currentDate, offset, 1);
      var maxDate = this._getMaxDate();
      var minDate = this._getMinDate();
      var isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, currentDate, baseDate);
      var isDateForwardInRange = (0, _math.inRange)(currentDate, minDate, maxDate) && isDateForwardInNeighborView;
      var dateForward = new Date(currentDate);
      while (isDateForwardInRange) {
        if (!this._view.isDateDisabled(dateForward)) {
          currentDate = dateForward;
          break;
        }
        this._shiftDate(zoomLevel, dateForward, offset, 1);
        isDateForwardInNeighborView = this._areDatesInNeighborView(zoomLevel, dateForward, baseDate);
        isDateForwardInRange = (0, _math.inRange)(dateForward, minDate, maxDate) && isDateForwardInNeighborView;
      }
      if (this._view.isDateDisabled(baseDate) || this._view.isDateDisabled(currentDate)) {
        this._waitRenderView(offset > 0 ? 1 : -1);
      } else {
        this._skipNavigate = true;
        this.option('currentDate', currentDate);
      }
    },
    _areDatesInSameView: function _areDatesInSameView(zoomLevel, date1, date2) {
      switch (zoomLevel) {
        case ZOOM_LEVEL.MONTH:
          return date1.getMonth() === date2.getMonth();
        case ZOOM_LEVEL.YEAR:
          return date1.getYear() === date2.getYear();
        case ZOOM_LEVEL.DECADE:
          return parseInt(date1.getYear() / 10) === parseInt(date2.getYear() / 10);
        case ZOOM_LEVEL.CENTURY:
          return parseInt(date1.getYear() / 100) === parseInt(date2.getYear() / 100);
      }
    },
    _areDatesInNeighborView: function _areDatesInNeighborView(zoomLevel, date1, date2) {
      var monthMinDistance = function monthMinDistance(a, b) {
        var abs = Math.abs(a - b);
        return Math.min(abs, 12 - abs);
      };
      switch (zoomLevel) {
        case ZOOM_LEVEL.MONTH:
          return monthMinDistance(date1.getMonth(), date2.getMonth()) <= 1;
        case ZOOM_LEVEL.YEAR:
          return Math.abs(date1.getYear() - date2.getYear()) <= 1;
        case ZOOM_LEVEL.DECADE:
          return Math.abs(date1.getYear() - date2.getYear()) <= 10;
        case ZOOM_LEVEL.CENTURY:
          return Math.abs(date1.getYear() - date2.getYear()) <= 100;
      }
    },
    _moveToClosestAvailableDate: function _moveToClosestAvailableDate() {
      var baseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('currentDate');
      var currentDate = new Date(baseDate);
      var zoomLevel = this.option('zoomLevel');
      var isCurrentDateAvailable = !this._isDateNotAvailable(currentDate);
      var isDateForwardAvailable = isCurrentDateAvailable;
      var isDateBackwardAvailable = isCurrentDateAvailable;
      var isDateForwardInStartView;
      var isDateBackwardInStartView;
      var dateForward = new Date(currentDate);
      var dateBackward = new Date(currentDate);
      do {
        if (isDateForwardAvailable) {
          currentDate = dateForward;
          break;
        }
        if (isDateBackwardAvailable) {
          currentDate = dateBackward;
          break;
        }
        this._shiftDate(zoomLevel, dateForward, 1, 1);
        this._shiftDate(zoomLevel, dateBackward, 1, -1);
        isDateForwardInStartView = this._areDatesInSameView(zoomLevel, dateForward, baseDate);
        isDateBackwardInStartView = this._areDatesInSameView(zoomLevel, dateBackward, baseDate);
        isDateForwardAvailable = isDateForwardInStartView && !this._isDateNotAvailable(dateForward);
        isDateBackwardAvailable = isDateBackwardInStartView && !this._isDateNotAvailable(dateBackward);
      } while (isDateForwardInStartView || isDateBackwardInStartView);
      this.option('currentDate', currentDate);
    },
    _isDateNotAvailable: function _isDateNotAvailable(date) {
      var maxDate = this._getMaxDate();
      var minDate = this._getMinDate();
      return !(0, _math.inRange)(date, minDate, maxDate) || this._view.isDateDisabled(date);
    },
    _init: function _init() {
      this.callBase();
      this._initSelectionStrategy();
      this._correctZoomLevel();
      this._initCurrentDate();
      this._initActions();
    },
    _initSelectionStrategy: function _initSelectionStrategy() {
      var strategyName = this._getSelectionStrategyName();
      var strategy = SELECTION_STRATEGIES[strategyName];
      if (!this._selectionStrategy || this._selectionStrategy.NAME !== strategyName) {
        this._selectionStrategy = new strategy(this);
      }
    },
    _refreshSelectionStrategy: function _refreshSelectionStrategy() {
      this._initSelectionStrategy();
      this._refresh();
    },
    _getSelectionStrategyName: function _getSelectionStrategyName() {
      var selectionMode = this.option('selectionMode');
      switch (selectionMode) {
        case 'multi':
          return 'MultiSelection';
        case 'range':
          return 'RangeSelection';
        default:
          return 'SingleSelection';
      }
    },
    _correctZoomLevel: function _correctZoomLevel() {
      var minZoomLevel = this.option('minZoomLevel');
      var maxZoomLevel = this.option('maxZoomLevel');
      var zoomLevel = this.option('zoomLevel');
      if (LEVEL_COMPARE_MAP[maxZoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
        return;
      }
      if (LEVEL_COMPARE_MAP[zoomLevel] > LEVEL_COMPARE_MAP[maxZoomLevel]) {
        this.option('zoomLevel', maxZoomLevel);
      } else if (LEVEL_COMPARE_MAP[zoomLevel] < LEVEL_COMPARE_MAP[minZoomLevel]) {
        this.option('zoomLevel', minZoomLevel);
      }
    },
    _initCurrentDate: function _initCurrentDate() {
      var _this$_getNormalizedD;
      var currentDate = (_this$_getNormalizedD = this._getNormalizedDate(this._selectionStrategy.getDefaultCurrentDate())) !== null && _this$_getNormalizedD !== void 0 ? _this$_getNormalizedD : this._getNormalizedDate(this.option('currentDate'));
      this.option('currentDate', currentDate);
    },
    _getNormalizedDate: function _getNormalizedDate(date) {
      date = _date2.default.normalizeDate(date, this._getMinDate(), this._getMaxDate());
      return (0, _type.isDefined)(date) ? this._getDate(date) : date;
    },
    _initActions: function _initActions() {
      this._cellClickAction = this._createActionByOption('onCellClick');
      this._onContouredChanged = this._createActionByOption('onContouredChanged');
    },
    _initTemplates: function _initTemplates() {
      this._templateManager.addDefaultTemplates({
        cell: new _function_template.FunctionTemplate(function (options) {
          var data = options.model;
          (0, _renderer.default)(options.container).append((0, _renderer.default)('<span>').text(data && data.text || String(data)));
        })
      });
      this.callBase();
    },
    _updateCurrentDate: function _updateCurrentDate(date) {
      if (_fx.default.isAnimating(this._$viewsWrapper)) {
        _fx.default.stop(this._$viewsWrapper, true);
      }
      var min = this._getMinDate();
      var max = this._getMaxDate();
      if (min > max) {
        this.option('currentDate', new Date());
        return;
      }
      var normalizedDate = this._getNormalizedDate(date);
      if (date.getTime() !== normalizedDate.getTime()) {
        this.option('currentDate', new Date(normalizedDate));
        return;
      }
      var offset = this._getViewsOffset(this._view.option('date'), normalizedDate);
      if (offset !== 0 && !this._isMaxZoomLevel() && this._isOtherViewCellClicked) {
        offset = 0;
      }
      if (this._view && offset !== 0 && !this._suppressNavigation) {
        if (this._additionalView) {
          if (offset > 2 || offset < -1) {
            this._refreshViews();
            this._renderNavigator();
          } else if (offset === 1 && this._skipNavigate) {
            this._setViewContoured(normalizedDate);
            this._updateAriaId(normalizedDate);
          } else {
            this._navigate(offset, normalizedDate);
          }
        } else {
          this._navigate(offset, normalizedDate);
        }
      } else {
        this._renderNavigator();
        this._setViewContoured(normalizedDate);
        this._updateAriaId(normalizedDate);
      }
      this._skipNavigate = false;
    },
    _isAdditionalViewDate: function _isAdditionalViewDate(date) {
      var view = this._additionalView;
      return view && _date2.default.sameMonthAndYear(date, view.option('date'));
    },
    _getActiveView: function _getActiveView(date) {
      return this._isAdditionalViewDate(date) ? this._additionalView : this._view;
    },
    _setViewContoured: function _setViewContoured(date) {
      if (this.option('skipFocusCheck') || elementHasFocus(this._focusTarget())) {
        var _this$_additionalView;
        this._view.option('contouredDate', null);
        (_this$_additionalView = this._additionalView) === null || _this$_additionalView === void 0 ? void 0 : _this$_additionalView.option('contouredDate', null);
        var view = this._isAdditionalViewDate(date) ? this._additionalView : this._view;
        view.option('contouredDate', date);
      }
    },
    _getMinDate: function _getMinDate() {
      if (this.min) {
        return this.min;
      }
      this.min = this._dateOption('min') || new Date(1000, 0);
      return this.min;
    },
    _getMaxDate: function _getMaxDate() {
      if (this.max) {
        return this.max;
      }
      this.max = this._dateOption('max') || new Date(3000, 0);
      return this.max;
    },
    _getViewsOffset: function _getViewsOffset(startDate, endDate) {
      var zoomLevel = this.option('zoomLevel');
      if (zoomLevel === ZOOM_LEVEL.MONTH) {
        return this._getMonthsOffset(startDate, endDate);
      }
      var zoomCorrection;
      switch (zoomLevel) {
        case ZOOM_LEVEL.CENTURY:
          zoomCorrection = 100;
          break;
        case ZOOM_LEVEL.DECADE:
          zoomCorrection = 10;
          break;
        default:
          zoomCorrection = 1;
          break;
      }
      return parseInt(endDate.getFullYear() / zoomCorrection) - parseInt(startDate.getFullYear() / zoomCorrection);
    },
    _getMonthsOffset: function _getMonthsOffset(startDate, endDate) {
      var yearOffset = endDate.getFullYear() - startDate.getFullYear();
      var monthOffset = endDate.getMonth() - startDate.getMonth();
      return yearOffset * 12 + monthOffset;
    },
    _waitRenderView: function _waitRenderView(offset) {
      var _this2 = this;
      if (this._alreadyViewRender) {
        return;
      }
      this._alreadyViewRender = true;
      var date = this._getDateByOffset(offset * this._getRtlCorrection());
      this._moveToClosestAvailableDate(date);
      this._waitRenderViewTimeout = setTimeout(function () {
        _this2._alreadyViewRender = false;
      });
    },
    _getRtlCorrection: function _getRtlCorrection() {
      return this.option('rtlEnabled') ? -1 : 1;
    },
    _getDateByOffset: function _getDateByOffset(offset, date) {
      var _date;
      date = this._getDate((_date = date) !== null && _date !== void 0 ? _date : this.option('currentDate'));
      var currentDay = date.getDate();
      var difference = _date2.default.getDifferenceInMonth(this.option('zoomLevel')) * offset;
      date.setDate(1);
      date.setMonth(date.getMonth() + difference);
      var lastDay = _date2.default.getLastMonthDate(date).getDate();
      date.setDate(currentDay > lastDay ? lastDay : currentDay);
      return date;
    },
    _focusTarget: function _focusTarget() {
      return this.$element();
    },
    _initMarkup: function _initMarkup() {
      this._renderSubmitElement();
      this.callBase();
      var $element = this.$element();
      $element.addClass(CALENDAR_CLASS);
      $element.toggleClass(CALENDAR_RANGE_CLASS, this.option('selectionMode') === 'range');
      this._renderBody();
      $element.append(this.$body);
      this._renderViews();
      this._renderNavigator();
      $element.prepend(this._navigator.$element());
      this._renderSwipeable();
      this._renderFooter();
      this._selectionStrategy.updateAriaSelected();
      this._updateAriaId();
      this.setAria('role', 'application');
      this._moveToClosestAvailableDate();
    },
    _render: function _render() {
      this.callBase();
      this._setViewContoured(this.option('currentDate'));
    },
    _renderBody: function _renderBody() {
      if (!this._$viewsWrapper) {
        this.$body = (0, _renderer.default)('<div>').addClass(CALENDAR_BODY_CLASS);
        this._$viewsWrapper = (0, _renderer.default)('<div>').addClass(CALENDAR_VIEWS_WRAPPER_CLASS);
        this.$body.append(this._$viewsWrapper);
      }
    },
    _getKeyboardListeners: function _getKeyboardListeners() {
      return this.callBase().concat([this._view]);
    },
    _renderViews: function _renderViews() {
      this.$element().addClass(CALENDAR_VIEW_CLASS + '-' + this.option('zoomLevel'));
      var _this$option2 = this.option(),
          currentDate = _this$option2.currentDate,
          viewsCount = _this$option2.viewsCount;
      this.$element().toggleClass(CALENDAR_MULTIVIEW_CLASS, viewsCount > 1);
      this._view = this._renderSpecificView(currentDate);
      if ((0, _window.hasWindow)()) {
        var beforeDate = this._getDateByOffset(-1, currentDate);
        this._beforeView = this._isViewAvailable(beforeDate) ? this._renderSpecificView(beforeDate) : null;
        var afterDate = this._getDateByOffset(viewsCount, currentDate);
        afterDate.setDate(1);
        this._afterView = this._isViewAvailable(afterDate) ? this._renderSpecificView(afterDate) : null;
      }
      if (viewsCount > 1) {
        this._additionalView = this._renderSpecificView(this._getDateByOffset(1, currentDate));
      }
      this._translateViews();
    },
    _renderSpecificView: function _renderSpecificView(date) {
      var _this$option3 = this.option(),
          viewsCount = _this$option3.viewsCount,
          zoomLevel = _this$option3.zoomLevel;
      var specificView = _uiCalendar2.default[zoomLevel];
      var $view = (0, _renderer.default)('<div>').appendTo(this._$viewsWrapper);
      var config = this._viewConfig(date);
      var view = this._createComponent($view, specificView, config);
      $view.toggleClass(CALENDAR_MULTIVIEW_CLASS, viewsCount > 1);
      return view;
    },
    _viewConfig: function _viewConfig(date) {
      var _this$option4;
      var disabledDates = this.option('disabledDates');
      disabledDates = (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this)) : disabledDates;
      return _extends({}, this._selectionStrategy.getViewOptions(), {
        date: date,
        min: this._getMinDate(),
        max: this._getMaxDate(),
        firstDayOfWeek: (_this$option4 = this.option('firstDayOfWeek')) !== null && _this$option4 !== void 0 ? _this$option4 : _date3.default.firstDayOfWeekIndex(),
        showWeekNumbers: this.option('showWeekNumbers'),
        weekNumberRule: this.option('weekNumberRule'),
        zoomLevel: this.option('zoomLevel'),
        tabIndex: undefined,
        focusStateEnabled: this.option('focusStateEnabled'),
        hoverStateEnabled: this.option('hoverStateEnabled'),
        disabledDates: disabledDates,
        onCellClick: this._cellClickHandler.bind(this),
        cellTemplate: this._getTemplateByOption('cellTemplate'),
        allowValueSelection: this._isMaxZoomLevel(),
        _todayDate: this.option('_todayDate')
      });
    },
    _injectComponent: function _injectComponent(func) {
      var that = this;
      return function (params) {
        (0, _extend.extend)(params, {
          component: that
        });
        return func(params);
      };
    },
    _isViewAvailable: function _isViewAvailable(date) {
      var zoomLevel = this.option('zoomLevel');
      var min = _date2.default.getViewMinBoundaryDate(zoomLevel, this._getMinDate());
      var max = _date2.default.getViewMaxBoundaryDate(zoomLevel, this._getMaxDate());
      return _date2.default.dateInRange(date, min, max);
    },
    _translateViews: function _translateViews() {
      var _this$option5 = this.option(),
          viewsCount = _this$option5.viewsCount;
      (0, _translator.move)(this._view.$element(), {
        left: 0,
        top: 0
      });
      this._moveViewElement(this._beforeView, -1);
      this._moveViewElement(this._afterView, viewsCount);
      this._moveViewElement(this._additionalView, 1);
    },
    _moveViewElement: function _moveViewElement(view, coefficient) {
      view && (0, _translator.move)(view.$element(), {
        left: this._getViewPosition(coefficient),
        top: 0
      });
    },
    _getViewPosition: function _getViewPosition(coefficient) {
      var rtlCorrection = this.option('rtlEnabled') ? -1 : 1;
      return coefficient * 100 * rtlCorrection + '%';
    },
    _cellClickHandler: function _cellClickHandler(e) {
      var zoomLevel = this.option('zoomLevel');
      var nextView = _date2.default.getViewDown(zoomLevel);
      var isMaxZoomLevel = this._isMaxZoomLevel();
      if (nextView && !isMaxZoomLevel) {
        this._navigateDown(e.event.currentTarget);
      } else {
        var newValue = this._updateTimeComponent(e.value);
        this._selectionStrategy.selectValue(newValue, e.event);
        this._cellClickAction(e);
      }
    },
    _updateTimeComponent: function _updateTimeComponent(date) {
      var result = new Date(date);
      var currentValue = this._dateOption('value');
      if (currentValue) {
        result.setHours(currentValue.getHours());
        result.setMinutes(currentValue.getMinutes());
        result.setSeconds(currentValue.getSeconds());
        result.setMilliseconds(currentValue.getMilliseconds());
      }
      return result;
    },
    _isMaxZoomLevel: function _isMaxZoomLevel() {
      return this.option('zoomLevel') === this.option('maxZoomLevel');
    },
    _navigateDown: function _navigateDown(cell) {
      var zoomLevel = this.option('zoomLevel');
      if (this._isMaxZoomLevel()) {
        return;
      }
      var nextView = _date2.default.getViewDown(zoomLevel);
      if (!nextView) {
        return;
      }
      var newCurrentDate = this._view.option('contouredDate') || this._view.option('date');
      if (cell) {
        newCurrentDate = (0, _renderer.default)(cell).data(CALENDAR_DATE_VALUE_KEY);
      }
      this._isOtherViewCellClicked = true;
      this.option('currentDate', newCurrentDate);
      this.option('zoomLevel', nextView);
      this._isOtherViewCellClicked = false;
      this._renderNavigator();
      this._animateShowView();
      this._moveToClosestAvailableDate();
      this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
    },
    _renderNavigator: function _renderNavigator() {
      if (!this._navigator) {
        this._navigator = new _uiCalendar.default((0, _renderer.default)('<div>'), this._navigatorConfig());
      }
      this._navigator.option('text', this._getViewsCaption(this._view, this._additionalView));
      this._updateButtonsVisibility();
    },
    _navigatorConfig: function _navigatorConfig() {
      var _this$option6 = this.option(),
          rtlEnabled = _this$option6.rtlEnabled;
      return {
        text: this._getViewsCaption(this._view, this._additionalView),
        onClick: this._navigatorClickHandler.bind(this),
        onCaptionClick: this._navigateUp.bind(this),
        rtlEnabled: rtlEnabled
      };
    },
    _navigatorClickHandler: function _navigatorClickHandler(e) {
      var _this$option7 = this.option(),
          currentDate = _this$option7.currentDate,
          viewsCount = _this$option7.viewsCount;
      var offset = e.direction;
      if (viewsCount > 1) {
        var additionalViewActive = this._isAdditionalViewDate(currentDate);
        var shouldDoubleOffset = additionalViewActive && offset < 0 || !additionalViewActive && offset > 0;
        if (shouldDoubleOffset) {
          offset *= 2;
        }
      }
      var newCurrentDate = this._getDateByOffset(offset, currentDate);
      this._moveToClosestAvailableDate(newCurrentDate);
    },
    _navigateUp: function _navigateUp() {
      var zoomLevel = this.option('zoomLevel');
      var nextView = _date2.default.getViewUp(zoomLevel);
      if (!nextView || this._isMinZoomLevel(zoomLevel)) {
        return;
      }
      this.option('zoomLevel', nextView);
      this._renderNavigator();
      this._animateShowView();
      this._moveToClosestAvailableDate();
      this._setViewContoured(this._getNormalizedDate(this.option('currentDate')));
    },
    _isMinZoomLevel: function _isMinZoomLevel(zoomLevel) {
      var min = this._getMinDate();
      var max = this._getMaxDate();
      return _date2.default.sameView(zoomLevel, min, max) || this.option('minZoomLevel') === zoomLevel;
    },
    _updateButtonsVisibility: function _updateButtonsVisibility() {
      this._navigator.toggleButton('next', !(0, _type.isDefined)(this._getRequiredView('next')));
      this._navigator.toggleButton('prev', !(0, _type.isDefined)(this._getRequiredView('prev')));
    },
    _renderSwipeable: function _renderSwipeable() {
      if (!this._swipeable) {
        this._swipeable = this._createComponent(this.$element(), _swipeable.default, {
          onStart: this._swipeStartHandler.bind(this),
          onUpdated: this._swipeUpdateHandler.bind(this),
          onEnd: this._swipeEndHandler.bind(this),
          itemSizeFunc: this._viewWidth.bind(this)
        });
      }
    },
    _swipeStartHandler: function _swipeStartHandler(e) {
      _fx.default.stop(this._$viewsWrapper, true);
      var _this$option8 = this.option(),
          viewsCount = _this$option8.viewsCount;
      this._toggleGestureCoverCursor('grabbing');
      e.event.maxLeftOffset = this._getRequiredView('next') ? 1 / viewsCount : 0;
      e.event.maxRightOffset = this._getRequiredView('prev') ? 1 / viewsCount : 0;
    },
    _toggleGestureCoverCursor: function _toggleGestureCoverCursor(cursor) {
      (0, _renderer.default)(".".concat(GESTURE_COVER_CLASS)).css('cursor', cursor);
    },
    _getRequiredView: function _getRequiredView(name) {
      var view;
      var isRtl = this.option('rtlEnabled');
      if (name === 'next') {
        view = isRtl ? this._beforeView : this._afterView;
      } else if (name === 'prev') {
        view = isRtl ? this._afterView : this._beforeView;
      }
      return view;
    },
    _swipeUpdateHandler: function _swipeUpdateHandler(e) {
      var offset = e.event.offset;
      (0, _translator.move)(this._$viewsWrapper, {
        left: offset * this._viewWidth(),
        top: 0
      });
      this._updateNavigatorCaption(offset);
    },
    _swipeEndHandler: function _swipeEndHandler(e) {
      this._toggleGestureCoverCursor('auto');
      var _this$option9 = this.option(),
          currentDate = _this$option9.currentDate,
          rtlEnabled = _this$option9.rtlEnabled;
      var targetOffset = e.event.targetOffset;
      var moveOffset = !targetOffset ? 0 : targetOffset / Math.abs(targetOffset);
      var isAdditionalViewActive = this._isAdditionalViewDate(currentDate);
      var shouldDoubleOffset = isAdditionalViewActive && (rtlEnabled ? moveOffset === -1 : moveOffset === 1);
      if (moveOffset === 0) {
        this._animateWrapper(0, ANIMATION_DURATION_SHOW_VIEW);
        return;
      }
      var offset = -moveOffset * this._getRtlCorrection() * (shouldDoubleOffset ? 2 : 1);
      var date = this._getDateByOffset(offset);
      if (this._isDateInInvalidRange(date)) {
        if (moveOffset >= 0) {
          date = new Date(this._getMinDate());
        } else {
          date = new Date(this._getMaxDate());
        }
      }
      this.option('currentDate', date);
    },
    _viewWidth: function _viewWidth() {
      if (!this._viewWidthValue) {
        this._viewWidthValue = (0, _size.getWidth)(this.$element()) / this.option('viewsCount');
      }
      return this._viewWidthValue;
    },
    _updateNavigatorCaption: function _updateNavigatorCaption(offset) {
      offset *= this._getRtlCorrection();
      var isMultiView = this.option('viewsCount') > 1;
      var view;
      var additionalView;
      if (offset > 0.5 && this._beforeView) {
        view = this._beforeView;
        additionalView = isMultiView && this._view;
      } else if (offset < -0.5 && this._afterView) {
        view = isMultiView ? this._additionalView : this._afterView;
        additionalView = isMultiView ? this._afterView : null;
      } else {
        view = this._view;
        additionalView = isMultiView ? this._additionalView : null;
      }
      this._navigator.option('text', this._getViewsCaption(view, additionalView));
    },
    _getViewsCaption: function _getViewsCaption(view, additionalView) {
      var caption = view.getNavigatorCaption();
      var _this$option10 = this.option(),
          viewsCount = _this$option10.viewsCount,
          rtlEnabled = _this$option10.rtlEnabled;
      if (viewsCount > 1 && additionalView) {
        var additionalViewCaption = additionalView.getNavigatorCaption();
        caption = rtlEnabled ? "".concat(additionalViewCaption, " - ").concat(caption) : "".concat(caption, " - ").concat(additionalViewCaption);
      }
      return caption;
    },
    _isDateInInvalidRange: function _isDateInInvalidRange(date) {
      if (this._view.isBoundary(date)) {
        return;
      }
      var min = this._getMinDate();
      var max = this._getMaxDate();
      var normalizedDate = _date2.default.normalizeDate(date, min, max);
      return normalizedDate === min || normalizedDate === max;
    },
    _renderFooter: function _renderFooter() {
      var _this3 = this;
      var showTodayButton = this.option('showTodayButton');
      if (showTodayButton) {
        var $todayButton = this._createComponent((0, _renderer.default)('<div>'), _button.default, {
          focusStateEnabled: this.option('focusStateEnabled'),
          text: _message.default.format('dxCalendar-todayButtonText'),
          onClick: function onClick(args) {
            _this3._toTodayView(args);
          },
          type: 'default',
          stylingMode: 'text',
          integrationOptions: {}
        }).$element().addClass(CALENDAR_TODAY_BUTTON_CLASS);
        this._$footer = (0, _renderer.default)('<div>').addClass(CALENDAR_FOOTER_CLASS).append($todayButton);
        this.$element().append(this._$footer);
      }
      this.$element().toggleClass(CALENDAR_HAS_FOOTER_CLASS, showTodayButton);
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
      this._setSubmitValue(this.option('value'));
    },
    _setSubmitValue: function _setSubmitValue(value) {
      var dateValue = this._convertToDate(value);
      this._getSubmitElement().val(_date_serialization.default.serializeDate(dateValue, CALENDAR_INPUT_STANDARD_PATTERN));
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _animateShowView: function _animateShowView() {
      _fx.default.stop(this._view.$element(), true);
      this._popAnimationView(this._view, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
      if (this.option('viewsCount') > 1) {
        _fx.default.stop(this._additionalView.$element(), true);
        this._popAnimationView(this._additionalView, POP_ANIMATION_FROM, POP_ANIMATION_TO, ANIMATION_DURATION_SHOW_VIEW);
      }
    },
    _popAnimationView: function _popAnimationView(view, from, to, duration) {
      return _fx.default.animate(view.$element(), {
        type: 'pop',
        from: {
          scale: from,
          opacity: from
        },
        to: {
          scale: to,
          opacity: to
        },
        duration: duration
      });
    },
    _navigate: function _navigate(offset, value) {
      if (offset !== 0 && Math.abs(offset) !== 1 && this._isViewAvailable(value)) {
        var newView = this._renderSpecificView(value);
        if (offset > 0) {
          this._afterView && this._afterView.$element().remove();
          this._afterView = newView;
        } else {
          this._beforeView && this._beforeView.$element().remove();
          this._beforeView = newView;
        }
        this._translateViews();
      }
      var rtlCorrection = this._getRtlCorrection();
      var offsetSign = offset > 0 ? 1 : offset < 0 ? -1 : 0;
      var endPosition = -rtlCorrection * offsetSign * this._viewWidth();
      var viewsWrapperPosition = this._$viewsWrapper.position().left;
      if (viewsWrapperPosition !== endPosition) {
        if (this._preventViewChangeAnimation) {
          this._wrapperAnimationEndHandler(offset, value);
        } else {
          this._animateWrapper(endPosition, ANIMATION_DURATION_SHOW_VIEW).done(this._wrapperAnimationEndHandler.bind(this, offset, value));
        }
      }
    },
    _animateWrapper: function _animateWrapper(to, duration) {
      return _fx.default.animate(this._$viewsWrapper, {
        type: 'slide',
        from: {
          left: this._$viewsWrapper.position().left
        },
        to: {
          left: to
        },
        duration: duration
      });
    },
    _getDate: function _getDate(value) {
      return new Date(value);
    },
    _toTodayView: function _toTodayView(args) {
      var today = new Date();
      if (this._isMaxZoomLevel()) {
        this._selectionStrategy.selectValue(today, args.event);
        return;
      }
      this._preventViewChangeAnimation = true;
      this.option('zoomLevel', this.option('maxZoomLevel'));
      this._selectionStrategy.selectValue(today, args.event);
      this._animateShowView();
      this._preventViewChangeAnimation = false;
    },
    _wrapperAnimationEndHandler: function _wrapperAnimationEndHandler(offset, newDate) {
      this._rearrangeViews(offset);
      this._translateViews();
      this._resetLocation();
      this._renderNavigator();
      this._setViewContoured(newDate);
      this._updateAriaId(newDate);
      this._selectionStrategy.updateAriaSelected();
    },
    _rearrangeViews: function _rearrangeViews(offset) {
      var _this$viewToRemoveKey;
      if (offset === 0) {
        return;
      }
      var _this$option11 = this.option(),
          viewsCount = _this$option11.viewsCount;
      var viewOffset;
      var viewToCreateKey;
      var viewToRemoveKey;
      var viewBeforeCreateKey;
      var viewAfterRemoveKey;
      if (offset < 0) {
        viewOffset = 1;
        viewToCreateKey = '_beforeView';
        viewToRemoveKey = '_afterView';
        viewBeforeCreateKey = '_view';
        viewAfterRemoveKey = viewsCount === 1 ? '_view' : '_additionalView';
      } else {
        viewOffset = -1;
        viewToCreateKey = '_afterView';
        viewToRemoveKey = '_beforeView';
        viewBeforeCreateKey = viewsCount === 1 ? '_view' : '_additionalView';
        viewAfterRemoveKey = '_view';
      }
      if (!this[viewToCreateKey]) {
        return;
      }
      var destinationDate = this[viewToCreateKey].option('date');
      (_this$viewToRemoveKey = this[viewToRemoveKey]) === null || _this$viewToRemoveKey === void 0 ? void 0 : _this$viewToRemoveKey.$element().remove();
      this[viewToRemoveKey] = this._renderSpecificView(this._getDateByOffset(viewOffset * viewsCount, destinationDate));
      this[viewAfterRemoveKey].$element().remove();
      if (viewsCount === 1) {
        this[viewAfterRemoveKey] = this[viewToCreateKey];
      } else {
        this[viewAfterRemoveKey] = this[viewBeforeCreateKey];
        this[viewBeforeCreateKey] = this[viewToCreateKey];
      }
      var dateByOffset = this._getDateByOffset(-viewOffset, destinationDate);
      this[viewToCreateKey] = this._isViewAvailable(dateByOffset) ? this._renderSpecificView(dateByOffset) : null;
    },
    _resetLocation: function _resetLocation() {
      (0, _translator.move)(this._$viewsWrapper, {
        left: 0,
        top: 0
      });
    },
    _clean: function _clean() {
      this.callBase();
      this._clearViewWidthCache();
      delete this._$viewsWrapper;
      delete this._navigator;
      delete this._$footer;
    },
    _clearViewWidthCache: function _clearViewWidthCache() {
      delete this._viewWidthValue;
    },
    _disposeViews: function _disposeViews() {
      this._view.$element().remove();
      this._beforeView && this._beforeView.$element().remove();
      this._additionalView && this._additionalView.$element().remove();
      this._afterView && this._afterView.$element().remove();
      delete this._view;
      delete this._additionalView;
      delete this._beforeView;
      delete this._afterView;
      delete this._skipNavigate;
    },
    _dispose: function _dispose() {
      clearTimeout(this._waitRenderViewTimeout);
      this.callBase();
    },
    _refreshViews: function _refreshViews() {
      this._resetActiveState();
      this._disposeViews();
      this._renderViews();
    },
    _visibilityChanged: function _visibilityChanged() {
      this._translateViews();
    },
    _focusInHandler: function _focusInHandler() {
      this.callBase.apply(this, arguments);
      this._setViewContoured(this.option('currentDate'));
    },
    _focusOutHandler: function _focusOutHandler() {
      var _this$_additionalView2;
      this.callBase.apply(this, arguments);
      this._view.option('contouredDate', null);
      (_this$_additionalView2 = this._additionalView) === null || _this$_additionalView2 === void 0 ? void 0 : _this$_additionalView2.option('contouredDate', null);
    },
    _updateViewsOption: function _updateViewsOption(optionName, newValue) {
      var _this$_additionalView3, _this$_beforeView, _this$_afterView;
      this._view.option(optionName, newValue);
      (_this$_additionalView3 = this._additionalView) === null || _this$_additionalView3 === void 0 ? void 0 : _this$_additionalView3.option(optionName, newValue);
      (_this$_beforeView = this._beforeView) === null || _this$_beforeView === void 0 ? void 0 : _this$_beforeView.option(optionName, newValue);
      (_this$_afterView = this._afterView) === null || _this$_afterView === void 0 ? void 0 : _this$_afterView.option(optionName, newValue);
    },
    _setViewsMinOption: function _setViewsMinOption(min) {
      this._restoreViewsMinMaxOptions();
      this._updateViewsOption('min', this._convertToDate(min));
    },
    _setViewsMaxOption: function _setViewsMaxOption(max) {
      this._restoreViewsMinMaxOptions();
      this._updateViewsOption('max', this._convertToDate(max));
    },
    _restoreViewsMinMaxOptions: function _restoreViewsMinMaxOptions() {
      this._updateViewsOption('min', this._getMinDate());
      this._updateViewsOption('max', this._getMaxDate());
    },
    _updateAriaSelected: function _updateAriaSelected(value, previousValue) {
      var _this4 = this;
      previousValue.forEach(function (item) {
        _this4.setAria('selected', undefined, _this4._view._getCellByDate(item));
      });
      value.forEach(function (item) {
        _this4.setAria('selected', true, _this4._view._getCellByDate(item));
      });
      if (this.option('viewsCount') > 1) {
        previousValue.forEach(function (item) {
          _this4.setAria('selected', undefined, _this4._additionalView._getCellByDate(item));
        });
        value.forEach(function (item) {
          _this4.setAria('selected', true, _this4._additionalView._getCellByDate(item));
        });
      }
    },
    _updateAriaId: function _updateAriaId(value) {
      var _value;
      value = (_value = value) !== null && _value !== void 0 ? _value : this.option('currentDate');
      var ariaId = 'dx-' + new _guid.default();
      var view = this._getActiveView(value);
      var $newCell = view._getCellByDate(value);
      this.setAria('id', ariaId, $newCell);
      this.setAria('activedescendant', ariaId);
      this._onContouredChanged(ariaId);
    },
    _suppressingNavigation: function _suppressingNavigation(callback, args) {
      this._suppressNavigation = true;
      callback.apply(this, args);
      delete this._suppressNavigation;
    },
    _optionChanged: function _optionChanged(args) {
      var value = args.value,
          previousValue = args.previousValue;
      switch (args.name) {
        case 'width':
          this.callBase(args);
          this._clearViewWidthCache();
          break;
        case 'min':
        case 'max':
          this.min = undefined;
          this.max = undefined;
          this._suppressingNavigation(this._updateCurrentDate, [this.option('currentDate')]);
          this._refreshViews();
          this._renderNavigator();
          break;
        case 'selectionMode':
          this._refreshSelectionStrategy();
          this._initCurrentDate();
          break;
        case 'firstDayOfWeek':
          this._refreshViews();
          this._updateButtonsVisibility();
          break;
        case 'currentDate':
          this.setAria('id', undefined, this._view._getCellByDate(previousValue));
          this._updateCurrentDate(value);
          break;
        case 'zoomLevel':
          this.$element().removeClass(CALENDAR_VIEW_CLASS + '-' + previousValue);
          this._correctZoomLevel();
          this._refreshViews();
          this._renderNavigator();
          this._updateAriaId();
          break;
        case 'minZoomLevel':
        case 'maxZoomLevel':
          this._correctZoomLevel();
          this._updateButtonsVisibility();
          break;
        case 'value':
          if (this.option('selectionMode') === 'single') {
            this._selectionStrategy.processValueChanged([value], [previousValue]);
          }
          this._setSubmitValue(value);
          this.callBase(args);
          break;
        case 'values':
          if (this.option('selectionMode') !== 'single') {
            this._selectionStrategy.processValueChanged(value, previousValue);
          }
          this._raiseValueChangeAction(value, previousValue);
          this._saveValueChangeEvent(undefined);
          break;
        case 'viewsCount':
          this._refreshViews();
          this._renderNavigator();
          break;
        case 'onCellClick':
          this._view.option('onCellClick', value);
          break;
        case 'onContouredChanged':
          this._onContouredChanged = this._createActionByOption('onContouredChanged');
          break;
        case 'disabledDates':
        case 'dateSerializationFormat':
        case 'cellTemplate':
        case 'showTodayButton':
          this._invalidate();
          break;
        case 'skipFocusCheck':
          break;
        case '_todayDate':
        case 'showWeekNumbers':
        case 'weekNumberRule':
          this._refreshViews();
          break;
        default:
          this.callBase(args);
      }
    },
    getContouredDate: function getContouredDate() {
      return this._view.option('contouredDate');
    }
  });
  (0, _component_registrator.default)('dxCalendar', Calendar);
  var _default = Calendar;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/guid","../../core/component_registrator","../../core/utils/common","../../core/utils/type","../../core/utils/math","../../core/utils/extend","../button","../editor/editor","../../events/gesture/swipeable","./ui.calendar.navigator","./ui.calendar.views","../../animation/translator","../../core/utils/date","../../core/utils/date_serialization","../../core/devices","../../animation/fx","../../core/utils/window","../../localization/message","../../localization/date","../../core/templates/function_template","../../events/utils/index","./ui.calendar.single.selection.strategy","./ui.calendar.multi.selection.strategy","./ui.calendar.range.selection.strategy"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/guid"), require("../../core/component_registrator"), require("../../core/utils/common"), require("../../core/utils/type"), require("../../core/utils/math"), require("../../core/utils/extend"), require("../button"), require("../editor/editor"), require("../../events/gesture/swipeable"), require("./ui.calendar.navigator"), require("./ui.calendar.views"), require("../../animation/translator"), require("../../core/utils/date"), require("../../core/utils/date_serialization"), require("../../core/devices"), require("../../animation/fx"), require("../../core/utils/window"), require("../../localization/message"), require("../../localization/date"), require("../../core/templates/function_template"), require("../../events/utils/index"), require("./ui.calendar.single.selection.strategy"), require("./ui.calendar.multi.selection.strategy"), require("./ui.calendar.range.selection.strategy"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.calendar.js.map