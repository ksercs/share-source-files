/**
* DevExtreme (cjs/__internal/scheduler/workspaces/m_timeline_month.js)
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
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _base = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _month = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/month");
var _layout = _interopRequireDefault(require("../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j"));
var _m_constants = require("../m_constants");
var _m_timeline = _interopRequireDefault(require("./m_timeline"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // NOTE: Renovation component import.
// @ts-expect-error
var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
var SchedulerTimelineMonth = /*#__PURE__*/function (_SchedulerTimeline) {
  _inheritsLoose(SchedulerTimelineMonth, _SchedulerTimeline);
  function SchedulerTimelineMonth() {
    var _this;
    _this = _SchedulerTimeline.apply(this, arguments) || this;
    _this.viewDirection = 'horizontal';
    return _this;
  }
  var _proto = SchedulerTimelineMonth.prototype;
  _proto._renderView = function _renderView() {
    _SchedulerTimeline.prototype._renderView.call(this);
    this._updateScrollable();
  };
  _proto._getElementClass = function _getElementClass() {
    return TIMELINE_CLASS;
  };
  _proto._getDateHeaderTemplate = function _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  };
  _proto._calculateDurationInCells = function _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  };
  _proto.isIndicatorVisible = function isIndicatorVisible() {
    return true;
  };
  _proto._getFormat = function _getFormat() {
    return _base.formatWeekdayAndDay;
  };
  _proto._getIntervalBetween = function _getIntervalBetween(currentDate) {
    var firstViewDate = this.getStartViewDate();
    var timeZoneOffset = _date.default.getTimezonesDifference(firstViewDate, currentDate);
    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  };
  _proto._getViewStartByOptions = function _getViewStartByOptions() {
    return (0, _month.getViewStartByOptions)(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), _date.default.getFirstMonthDate(this.option('startDate')));
  };
  _proto.generateRenderOptions = function generateRenderOptions() {
    var options = _SchedulerTimeline.prototype.generateRenderOptions.call(this, true);
    return _extends(_extends({}, options), {
      getDateForHeaderText: function getDateForHeaderText(_, date) {
        return date;
      }
    });
  };
  _createClass(SchedulerTimelineMonth, [{
    key: "type",
    get: function get() {
      return _m_constants.VIEWS.TIMELINE_MONTH;
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function get() {
      return _layout.default;
    }
  }]);
  return SchedulerTimelineMonth;
}(_m_timeline.default);
(0, _component_registrator.default)('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
var _default = SchedulerTimelineMonth;
exports.default = _default;
