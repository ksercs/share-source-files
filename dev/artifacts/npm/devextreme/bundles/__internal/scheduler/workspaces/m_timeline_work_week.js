/**
* DevExtreme (bundles/__internal/scheduler/workspaces/m_timeline_work_week.js)
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
var _work_week = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week");
var _m_constants = require("../m_constants");
var _m_timeline_week = _interopRequireDefault(require("./m_timeline_week"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var TIMELINE_CLASS = 'dx-scheduler-timeline-work-week';
var LAST_DAY_WEEK_INDEX = 5;
var SchedulerTimelineWorkWeek = /*#__PURE__*/function (_SchedulerTimelineWee) {
  _inheritsLoose(SchedulerTimelineWorkWeek, _SchedulerTimelineWee);
  function SchedulerTimelineWorkWeek() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // @ts-expect-error
    _this = _SchedulerTimelineWee.call.apply(_SchedulerTimelineWee, [this].concat(args)) || this;
    _this._getWeekendsCount = _work_week.getWeekendsCount;
    return _this;
  }
  var _proto = SchedulerTimelineWorkWeek.prototype;
  _proto._getElementClass = function _getElementClass() {
    return TIMELINE_CLASS;
  };
  _proto._incrementDate = function _incrementDate(date) {
    var day = date.getDay();
    if (day === LAST_DAY_WEEK_INDEX) {
      date.setDate(date.getDate() + 2);
    }
    _SchedulerTimelineWee.prototype._incrementDate.call(this, date);
  };
  _createClass(SchedulerTimelineWorkWeek, [{
    key: "type",
    get: function get() {
      return _m_constants.VIEWS.TIMELINE_WORK_WEEK;
    }
  }]);
  return SchedulerTimelineWorkWeek;
}(_m_timeline_week.default);
(0, _component_registrator.default)('dxSchedulerTimelineWorkWeek', SchedulerTimelineWorkWeek);
var _default = SchedulerTimelineWorkWeek;
exports.default = _default;
