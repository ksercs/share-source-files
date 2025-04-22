"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _index = require("../../scheduler/r1/utils/index");
var _constants = require("../constants");
var _m_work_space_vertical = _interopRequireDefault(require("./m_work_space_vertical"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WEEK_CLASS = 'dx-scheduler-work-space-week';
class SchedulerWorkSpaceWeek extends _m_work_space_vertical.default {
  get type() {
    return _constants.VIEWS.WEEK;
  }
  _getElementClass() {
    return WEEK_CLASS;
  }
  _calculateViewStartDate() {
    return _index.weekUtils.calculateViewStartDate(this.option('startDate'), this._firstDayOfWeek());
  }
}
(0, _component_registrator.default)('dxSchedulerWorkSpaceWeek', SchedulerWorkSpaceWeek);
var _default = exports.default = SchedulerWorkSpaceWeek;