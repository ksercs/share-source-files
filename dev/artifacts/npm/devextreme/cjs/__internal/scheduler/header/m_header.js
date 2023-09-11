/**
* DevExtreme (cjs/__internal/scheduler/header/m_header.js)
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
exports.SchedulerHeader = void 0;
require("../../../ui/button_group");
require("../../../ui/drop_down_button");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _extend = require("../../../core/utils/extend");
var _untyped_getCurrentView = require("../../../renovation/ui/scheduler/model/untyped_getCurrentView");
var _toolbar = _interopRequireDefault(require("../../../ui/toolbar"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
var _m_calendar = _interopRequireDefault(require("./m_calendar"));
var _m_date_navigator = require("./m_date_navigator");
var _m_utils = require("./m_utils");
var _m_view_switcher = require("./m_view_switcher");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DEFAULT_ELEMENT = 'defaultElement';
var VIEW_SWITCHER = 'viewSwitcher';
var DATE_NAVIGATOR = 'dateNavigator';
var COMPONENT_CLASS = 'dx-scheduler-header';
var SchedulerHeader = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(SchedulerHeader, _Widget);
  function SchedulerHeader() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = SchedulerHeader.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    // @ts-expect-error
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      _useShortDateFormat: !_devices.default.real().generic || _devices.default.isSimulator()
    });
  };
  _proto._createEventMap = function _createEventMap() {
    var _this = this;
    this.eventMap = new Map([['currentView', [function (view) {
      _this.currentView = (0, _untyped_getCurrentView.renovationGetCurrentView)((0, _m_utils.getViewName)(view),
      // @ts-expect-error
      _this.option('views'));
    }]], ['items', [this.repaint.bind(this)]], ['views', [_m_utils.validateViews]], ['currentDate', [this._getCalendarOptionUpdater('date')]], ['min', [this._getCalendarOptionUpdater('min')]], ['max', [this._getCalendarOptionUpdater('max')]], ['tabIndex', [this.repaint.bind(this)]], ['focusStateEnabled', [this.repaint.bind(this)]], ['useDropDownViewSwitcher', [this.repaint.bind(this)]]]);
  };
  _proto._addEvent = function _addEvent(name, event) {
    if (!this.eventMap.has(name)) {
      this.eventMap.set(name, []);
    }
    var events = this.eventMap.get(name);
    this.eventMap.set(name, [].concat(_toConsumableArray(events), [event]));
  };
  _proto._optionChanged = function _optionChanged(args) {
    var name = args.name,
      value = args.value;
    if (this.eventMap.has(name)) {
      var events = this.eventMap.get(name);
      events.forEach(function (event) {
        event(value);
      });
    }
  };
  _proto._init = function _init() {
    // @ts-expect-error
    _Widget.prototype._init.call(this);
    this._createEventMap();
    // @ts-expect-error
    this.$element().addClass(COMPONENT_CLASS);
    this.currentView = (0, _untyped_getCurrentView.renovationGetCurrentView)((0, _m_utils.getViewName)(this.option('currentView')),
    // @ts-expect-error
    this.option('views'));
  };
  _proto._render = function _render() {
    // @ts-expect-error
    _Widget.prototype._render.call(this);
    this._createEventMap();
    this._renderToolbar();
  };
  _proto._renderToolbar = function _renderToolbar() {
    var config = this._createToolbarConfig();
    var toolbarElement = (0, _renderer.default)('<div>');
    toolbarElement.appendTo(this.$element());
    // @ts-expect-error
    this._toolbar = this._createComponent(toolbarElement, _toolbar.default, config);
  };
  _proto._createToolbarConfig = function _createToolbarConfig() {
    var _this2 = this;
    var items = this.option('items');
    var parsedItems = items.map(function (element) {
      return _this2._parseItem(element);
    });
    return {
      items: parsedItems
    };
  };
  _proto._parseItem = function _parseItem(item) {
    var isDefaultElement = this._isDefaultItem(item);
    if (isDefaultElement) {
      var defaultElementType = item[DEFAULT_ELEMENT];
      switch (defaultElementType) {
        case VIEW_SWITCHER:
          if (this.option('useDropDownViewSwitcher')) {
            return (0, _m_view_switcher.getDropDownViewSwitcher)(this, item);
          }
          return (0, _m_view_switcher.getViewSwitcher)(this, item);
        case DATE_NAVIGATOR:
          this._renderCalendar();
          return (0, _m_date_navigator.getDateNavigator)(this, item);
        default:
          _errors.default.log("Unknown default element type: ".concat(defaultElementType));
          break;
      }
    }
    return item;
  };
  _proto._callEvent = function _callEvent(event, arg) {
    if (this.eventMap.has(event)) {
      var events = this.eventMap.get(event);
      events.forEach(function (event) {
        return event(arg);
      });
    }
  };
  _proto._updateCurrentView = function _updateCurrentView(view) {
    var onCurrentViewChange = this.option('onCurrentViewChange');
    onCurrentViewChange(view.name);
    this._callEvent('currentView', view);
  };
  _proto._updateCalendarValueAndCurrentDate = function _updateCalendarValueAndCurrentDate(date) {
    this._updateCurrentDate(date);
    this._calendar.option('value', date);
  };
  _proto._updateCurrentDate = function _updateCurrentDate(date) {
    var onCurrentDateChange = this.option('onCurrentDateChange');
    onCurrentDateChange(date);
    this._callEvent('currentDate', date);
  };
  _proto._renderCalendar = function _renderCalendar() {
    var _this3 = this;
    // @ts-expect-error
    this._calendar = this._createComponent('<div>', _m_calendar.default, {
      value: this.option('currentDate'),
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      onValueChanged: function onValueChanged(e) {
        _this3._updateCurrentDate(e.value);
        _this3._calendar.hide();
      }
    });
    this._calendar.$element().appendTo(this.$element());
  };
  _proto._getCalendarOptionUpdater = function _getCalendarOptionUpdater(name) {
    var _this4 = this;
    return function (value) {
      if (_this4._calendar) {
        _this4._calendar.option(name, value);
      }
    };
  };
  _proto._getNextDate = function _getNextDate(direction) {
    var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var date = initialDate !== null && initialDate !== void 0 ? initialDate : this.option('currentDate');
    var options = _extends(_extends({}, this.intervalOptions), {
      date
    });
    return (0, _m_utils.getNextIntervalDate)(options, direction);
  };
  _proto._isMonth = function _isMonth() {
    var currentView = this.currentView;
    return (0, _m_utils.getViewType)(currentView) === 'month';
  };
  _proto._getDisplayedDate = function _getDisplayedDate() {
    var startViewDate = this.option('startViewDate');
    if (this._isMonth()) {
      return (0, _m_utils.nextWeek)(startViewDate);
    }
    return new Date(startViewDate);
  };
  _proto._getCaption = function _getCaption() {
    var date = this.option('currentDate');
    if (this.option('startViewDate')) {
      date = this._getDisplayedDate();
    }
    date = _date.default.trimTime(date);
    var options = _extends(_extends({}, this.intervalOptions), {
      date
    });
    var customizationFunction = this.option('customizeDateNavigatorText');
    var useShortDateFormat = this.option('_useShortDateFormat');
    return (0, _m_utils.getCaption)(options, useShortDateFormat, customizationFunction);
  };
  _proto._updateDateByDirection = function _updateDateByDirection(direction) {
    var date = this._getNextDate(direction);
    this._updateCalendarValueAndCurrentDate(date);
  };
  _proto._showCalendar = function _showCalendar(e) {
    this._calendar.show(e.element);
  };
  _proto._hideCalendar = function _hideCalendar() {
    this._calendar.hide();
  };
  _proto._isDefaultItem = function _isDefaultItem(item) {
    return Object.prototype.hasOwnProperty.call(item, DEFAULT_ELEMENT);
  };
  _createClass(SchedulerHeader, [{
    key: "views",
    get: function get() {
      return this.option('views');
    }
  }, {
    key: "captionText",
    get: function get() {
      return this._getCaption().text;
    }
  }, {
    key: "intervalOptions",
    get: function get() {
      var step = (0, _m_utils.getStep)(this.currentView);
      var intervalCount = this.option('intervalCount');
      var firstDayOfWeek = this.option('firstDayOfWeek');
      var agendaDuration = this.option('agendaDuration');
      return {
        step,
        intervalCount,
        firstDayOfWeek,
        agendaDuration
      };
    }
  }]);
  return SchedulerHeader;
}(_ui.default); // @ts-expect-error
exports.SchedulerHeader = SchedulerHeader;
(0, _component_registrator.default)('dxSchedulerHeader', SchedulerHeader);
