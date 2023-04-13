/**
* DevExtreme (cjs/ui/date_box/ui.date_box.strategy.calendar.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _calendar = _interopRequireDefault(require("../calendar"));
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.strategy"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var CalendarStrategy = _uiDate_box.default.inherit({
  NAME: 'Calendar',
  getDefaultOptions: function getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      todayButtonText: _message.default.format('dxCalendar-todayButtonText')
    });
  },
  supportedKeys: function supportedKeys() {
    var homeEndHandler = function homeEndHandler(e) {
      if (this.option('opened')) {
        e.preventDefault();
        return true;
      }
      return false;
    };
    return {
      rightArrow: function rightArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      leftArrow: function leftArrow() {
        if (this.option('opened')) {
          return true;
        }
      },
      enter: function (e) {
        if (this.dateBox.option('opened')) {
          e.preventDefault();
          if (this._widget.option('zoomLevel') === this._widget.option('maxZoomLevel')) {
            var viewValue = this._getContouredValue();
            var lastActionElement = this._lastActionElement;
            var shouldCloseDropDown = this._closeDropDownByEnter();
            if (shouldCloseDropDown && viewValue && lastActionElement === 'calendar') {
              this.dateBoxValue(viewValue, e);
            }
            shouldCloseDropDown && this.dateBox.close();
            this.dateBox._valueChangeEventHandler(e);
            return !shouldCloseDropDown;
          } else {
            return true;
          }
        } else {
          this.dateBox._valueChangeEventHandler(e);
        }
      }.bind(this),
      home: homeEndHandler,
      end: homeEndHandler
    };
  },
  getDisplayFormat: function getDisplayFormat(displayFormat) {
    return displayFormat || 'shortdate';
  },
  _closeDropDownByEnter: function _closeDropDownByEnter() {
    return true;
  },
  _getWidgetName: function _getWidgetName() {
    return _calendar.default;
  },
  _getContouredValue: function _getContouredValue() {
    return this._widget._view.option('contouredDate');
  },
  getKeyboardListener: function getKeyboardListener() {
    return this._widget;
  },
  _getWidgetOptions: function _getWidgetOptions() {
    var disabledDates = this.dateBox.option('disabledDates');
    return (0, _extend.extend)(this.dateBox.option('calendarOptions'), {
      value: this.dateBoxValue() || null,
      dateSerializationFormat: null,
      min: this.dateBox.dateOption('min'),
      max: this.dateBox.dateOption('max'),
      onValueChanged: this._valueChangedHandler.bind(this),
      onCellClick: this._cellClickHandler.bind(this),
      tabIndex: null,
      disabledDates: (0, _type.isFunction)(disabledDates) ? this._injectComponent(disabledDates.bind(this.dateBox)) : disabledDates,
      onContouredChanged: this._refreshActiveDescendant.bind(this),
      skipFocusCheck: true
    });
  },
  _injectComponent: function _injectComponent(func) {
    var that = this;
    return function (params) {
      (0, _extend.extend)(params, {
        component: that.dateBox
      });
      return func(params);
    };
  },
  _refreshActiveDescendant: function _refreshActiveDescendant(e) {
    this._lastActionElement = 'calendar';
    this.dateBox.setAria('activedescendant', e.actionValue);
  },
  _getTodayButtonConfig: function _getTodayButtonConfig() {
    var _this = this;
    var buttonsLocation = this.dateBox.option('buttonsLocation');
    var isButtonsLocationDefault = buttonsLocation === 'default';
    var position = isButtonsLocationDefault ? ['bottom', 'center'] : (0, _common.splitPair)(buttonsLocation);
    return {
      widget: 'dxButton',
      toolbar: position[0],
      location: position[1] === 'after' ? 'before' : position[1],
      options: {
        onInitialized: function (e) {
          e.component.registerKeyHandler('escape', this._escapeHandler.bind(this));
        }.bind(this),
        onClick: function onClick(args) {
          _this._widget._toTodayView(args);
        },
        text: this.dateBox.option('todayButtonText'),
        type: 'today'
      }
    };
  },
  _isCalendarVisible: function _isCalendarVisible() {
    var _this$dateBox$option = this.dateBox.option(),
      calendarOptions = _this$dateBox$option.calendarOptions;
    return (0, _type.isEmptyObject)(calendarOptions) || calendarOptions.visible !== false;
  },
  _getPopupToolbarItems: function _getPopupToolbarItems(toolbarItems) {
    var useButtons = this.dateBox.option('applyValueMode') === 'useButtons';
    var shouldRenderTodayButton = useButtons && this._isCalendarVisible();
    if (shouldRenderTodayButton) {
      var todayButton = this._getTodayButtonConfig();
      return [todayButton].concat(_toConsumableArray(toolbarItems));
    }
    return toolbarItems;
  },
  popupConfig: function popupConfig(_popupConfig) {
    return (0, _extend.extend)(true, _popupConfig, {
      position: {
        collision: 'flipfit flip'
      },
      width: 'auto'
    });
  },
  _escapeHandler: function _escapeHandler() {
    this.dateBox.close();
    this.dateBox.focus();
  },
  _valueChangedHandler: function _valueChangedHandler(e) {
    var value = e.value;
    var prevValue = e.previousValue;
    if (_date.default.sameDate(value, prevValue) && _date.default.sameHoursAndMinutes(value, prevValue)) {
      return;
    }
    if (this.dateBox.option('applyValueMode') === 'instantly') {
      this.dateBoxValue(this.getValue(), e.event);
    }
  },
  _updateValue: function _updateValue() {
    if (!this._widget) {
      return;
    }
    this._widget.option('value', this.dateBoxValue());
  },
  textChangedHandler: function textChangedHandler() {
    this._lastActionElement = 'input';
    if (this.dateBox.option('opened') && this._widget) {
      this._updateValue(true);
    }
  },
  _cellClickHandler: function _cellClickHandler(e) {
    var dateBox = this.dateBox;
    if (dateBox.option('applyValueMode') === 'instantly') {
      dateBox.option('opened', false);
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
});
var _default = CalendarStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
