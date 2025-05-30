/**
* DevExtreme (cjs/__internal/scheduler/header/m_date_navigator.js)
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
exports.getDateNavigator = void 0;
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _themes = require("../../../ui/themes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var trimTime = _date.default.trimTime;
var DATE_NAVIGATOR_CLASS = 'dx-scheduler-navigator';
var PREVIOUS_BUTTON_CLASS = 'dx-scheduler-navigator-previous';
var CALENDAR_BUTTON_CLASS = 'dx-scheduler-navigator-caption';
var NEXT_BUTTON_CLASS = 'dx-scheduler-navigator-next';
var DIRECTION_LEFT = -1;
var DIRECTION_RIGHT = 1;
var getDateNavigator = function getDateNavigator(header, item) {
  var items = [getPreviousButtonOptions(header), getCalendarButtonOptions(header), getNextButtonOptions(header)];
  // @ts-expect-error
  var stylingMode = (0, _themes.isMaterial)() ? 'text' : 'contained';
  return _extends({
    widget: 'dxButtonGroup',
    cssClass: DATE_NAVIGATOR_CLASS,
    options: {
      items,
      stylingMode,
      selectionMode: 'none',
      onItemClick: function onItemClick(e) {
        e.itemData.clickHandler(e);
      }
    }
  }, item);
};
exports.getDateNavigator = getDateNavigator;
var getPreviousButtonOptions = function getPreviousButtonOptions(header) {
  return {
    key: 'previous',
    icon: 'chevronprev',
    elementAttr: {
      class: PREVIOUS_BUTTON_CLASS
    },
    clickHandler: function clickHandler() {
      return header._updateDateByDirection(DIRECTION_LEFT);
    },
    onContentReady: function onContentReady(e) {
      var previousButton = e.component;
      previousButton.option('disabled', isPreviousButtonDisabled(header));
      header._addEvent('min', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
      header._addEvent('currentDate', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
      header._addEvent('startViewDate', function () {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
    }
  };
};
var getCalendarButtonOptions = function getCalendarButtonOptions(header) {
  return {
    key: 'calendar',
    text: header.captionText,
    elementAttr: {
      class: CALENDAR_BUTTON_CLASS
    },
    clickHandler: function clickHandler(e) {
      return header._showCalendar(e);
    },
    onContentReady: function onContentReady(e) {
      var calendarButton = e.component;
      header._addEvent('currentView', function () {
        calendarButton.option('text', header.captionText);
      });
      header._addEvent('currentDate', function () {
        calendarButton.option('text', header.captionText);
      });
      header._addEvent('startViewDate', function () {
        calendarButton.option('text', header.captionText);
      });
      header._addEvent('views', function () {
        calendarButton.option('text', header.captionText);
      });
      header._addEvent('firstDayOfWeek', function () {
        calendarButton.option('text', header.captionText);
      });
    }
  };
};
var getNextButtonOptions = function getNextButtonOptions(header) {
  return {
    key: 'next',
    icon: 'chevronnext',
    elementAttr: {
      class: NEXT_BUTTON_CLASS
    },
    clickHandler: function clickHandler() {
      return header._updateDateByDirection(DIRECTION_RIGHT);
    },
    onContentReady: function onContentReady(e) {
      var nextButton = e.component;
      nextButton.option('disabled', isNextButtonDisabled(header));
      header._addEvent('min', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
      header._addEvent('currentDate', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
      header._addEvent('startViewDate', function () {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
    }
  };
};
var isPreviousButtonDisabled = function isPreviousButtonDisabled(header) {
  var min = header.option('min');
  if (!min) return false;
  min = new Date(min);
  var caption = header._getCaption();
  min = trimTime(min);
  var previousDate = header._getNextDate(-1, caption.endDate);
  return previousDate < min;
};
var isNextButtonDisabled = function isNextButtonDisabled(header) {
  var max = header.option('max');
  if (!max) return false;
  max = new Date(max);
  var caption = header._getCaption();
  max = max.setHours(23, 59, 59);
  var nextDate = header._getNextDate(1, caption.startDate);
  return nextDate > max;
};
