"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllDayPanelTitle = void 0;
var _inferno = require("inferno");
var _message = _interopRequireDefault(require("../../../../../common/core/localization/message"));
var _index = require("../../../../core/r1/runtime/inferno/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AllDayPanelTitle extends _index.InfernoWrapperComponent {
  createEffects() {
    return [(0, _index.createReRenderEffect)()];
  }
  render() {
    const text = _message.default.format('dxScheduler-allDay');
    return (0, _inferno.createVNode)(1, "div", "dx-scheduler-all-day-title", text, 0);
  }
}
exports.AllDayPanelTitle = AllDayPanelTitle;
AllDayPanelTitle.defaultProps = {};