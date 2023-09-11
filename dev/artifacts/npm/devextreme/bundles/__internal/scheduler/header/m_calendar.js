/**
* DevExtreme (bundles/__internal/scheduler/header/m_calendar.js)
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
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _calendar = _interopRequireDefault(require("../../../ui/calendar"));
var _ui = _interopRequireDefault(require("../../../ui/popover/ui.popover"));
var _ui2 = _interopRequireDefault(require("../../../ui/popup/ui.popup"));
var _ui3 = _interopRequireDefault(require("../../../ui/scroll_view/ui.scrollable"));
var _ui4 = _interopRequireDefault(require("../../../ui/widget/ui.widget"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var CALENDAR_CLASS = 'dx-scheduler-navigator-calendar';
var CALENDAR_POPOVER_CLASS = 'dx-scheduler-navigator-calendar-popover';
var SchedulerCalendar = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(SchedulerCalendar, _Widget);
  function SchedulerCalendar() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = SchedulerCalendar.prototype;
  _proto.show = function show(target) {
    if (!this._isMobileLayout()) {
      this._overlay.option('target', target);
    }
    this._overlay.show();
  };
  _proto.hide = function hide() {
    this._overlay.hide();
  };
  _proto._keyboardHandler = function _keyboardHandler(opts) {
    var _a;
    (_a = this._calendar) === null || _a === void 0 ? void 0 : _a._keyboardHandler(opts);
  };
  _proto._init = function _init() {
    // @ts-expect-error
    _Widget.prototype._init.call(this);
    this.$element();
  };
  _proto._render = function _render() {
    // @ts-expect-error
    _Widget.prototype._render.call(this);
    this._renderOverlay();
  };
  _proto._renderOverlay = function _renderOverlay() {
    var _this = this;
    // @ts-expect-error
    this.$element().addClass(CALENDAR_POPOVER_CLASS);
    var isMobileLayout = this._isMobileLayout();
    var overlayType = isMobileLayout ? _ui2.default : _ui.default;
    // @ts-expect-error
    this._overlay = this._createComponent(this.$element(), overlayType, {
      contentTemplate: function contentTemplate() {
        return _this._createOverlayContent();
      },
      onShown: function onShown() {
        return _this._calendar.focus();
      },
      defaultOptionsRules: [{
        device: function device() {
          return isMobileLayout;
        },
        options: {
          fullScreen: true,
          showCloseButton: false,
          toolbarItems: [{
            shortcut: 'cancel'
          }]
        }
      }]
    });
  };
  _proto._createOverlayContent = function _createOverlayContent() {
    var result = (0, _renderer.default)('<div>').addClass(CALENDAR_CLASS);
    // @ts-expect-error
    this._calendar = this._createComponent(result, _calendar.default, this._getCalendarOptions());
    if (this._isMobileLayout()) {
      var scrollable = this._createScrollable(result);
      return scrollable.$element();
    }
    return result;
  };
  _proto._createScrollable = function _createScrollable(content) {
    // @ts-expect-error
    var result = this._createComponent('<div>', _ui3.default, {
      direction: 'vertical'
    });
    result.$content().append(content);
    return result;
  };
  _proto._optionChanged = function _optionChanged(_ref) {
    var name = _ref.name,
      value = _ref.value;
    var _a;
    switch (name) {
      case 'value':
        (_a = this._calendar) === null || _a === void 0 ? void 0 : _a.option('value', value);
        break;
      default:
        break;
    }
  };
  _proto._getCalendarOptions = function _getCalendarOptions() {
    return {
      value: this.option('value'),
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      focusStateEnabled: this.option('focusStateEnabled'),
      onValueChanged: this.option('onValueChanged'),
      skipFocusCheck: true,
      tabIndex: this.option('tabIndex')
    };
  };
  _proto._isMobileLayout = function _isMobileLayout() {
    return !_devices.default.current().generic;
  };
  return SchedulerCalendar;
}(_ui4.default); // @ts-expect-error
exports.default = SchedulerCalendar;
(0, _component_registrator.default)('dxSchedulerCalendarPopup', SchedulerCalendar);
