/**
* DevExtreme (cjs/renovation/ui/scheduler/header/utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.isMonthView = exports.isMobileLayout = exports.formatViews = exports.formToolbarItem = void 0;
var _view_switcher = require("./view_switcher");
var _date_navigator = require("./date_navigator");
var _m_utils = require("../../../../__internal/scheduler/header/m_utils");
var _devices = _interopRequireDefault(require("../../../../core/devices"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var DEFAULT_ELEMENT = 'defaultElement';
var VIEW_SWITCHER = 'viewSwitcher';
var DATE_NAVIGATOR = 'dateNavigator';
var formToolbarItem = function formToolbarItem(item, options) {
  var captionText = options.captionText,
    isNextButtonDisabled = options.isNextButtonDisabled,
    isPreviousButtonDisabled = options.isPreviousButtonDisabled,
    selectedView = options.selectedView,
    setCurrentView = options.setCurrentView,
    showCalendar = options.showCalendar,
    updateDateByDirection = options.updateDateByDirection,
    useDropDownViewSwitcher = options.useDropDownViewSwitcher,
    views = options.views;
  if (item[DEFAULT_ELEMENT]) {
    var defaultElementType = item[DEFAULT_ELEMENT];
    switch (defaultElementType) {
      case VIEW_SWITCHER:
        if (useDropDownViewSwitcher) {
          return (0, _view_switcher.getDropDownViewSwitcher)(item, selectedView, views, setCurrentView);
        }
        return (0, _view_switcher.getViewSwitcher)(item, selectedView, views, setCurrentView);
      case DATE_NAVIGATOR:
        return (0, _date_navigator.getDateNavigator)(item, showCalendar, captionText, updateDateByDirection, isPreviousButtonDisabled, isNextButtonDisabled);
      default:
        throw new Error("Unknown default item in the scheduler's toolbar");
    }
  }
  return item;
};
exports.formToolbarItem = formToolbarItem;
var formatViews = function formatViews(views) {
  (0, _m_utils.validateViews)(views);
  return views.map(function (view) {
    var text = (0, _m_utils.getViewText)(view);
    var name = (0, _m_utils.getViewName)(view);
    return {
      text,
      name
    };
  });
};
exports.formatViews = formatViews;
var isMonthView = function isMonthView(currentView) {
  return (0, _m_utils.getViewType)(currentView) === 'month';
};
exports.isMonthView = isMonthView;
var isMobileLayout = function isMobileLayout() {
  return !_devices.default.current().generic;
};
exports.isMobileLayout = isMobileLayout;
