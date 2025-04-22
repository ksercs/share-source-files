"use strict";

exports.getGanttViewCore = getGanttViewCore;
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _devexpressGantt = _interopRequireDefault(require("devexpress-gantt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function getGanttViewCore() {
  if (!_devexpressGantt.default) {
    throw _ui.default.Error('E1041', 'devexpress-gantt');
  }
  return _devexpressGantt.default;
}