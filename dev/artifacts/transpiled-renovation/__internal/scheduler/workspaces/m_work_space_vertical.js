"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _base = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _m_work_space_indicator = _interopRequireDefault(require("./m_work_space_indicator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var SchedulerWorkspaceVertical = /*#__PURE__*/function (_SchedulerWorkSpaceIn) {
  _inheritsLoose(SchedulerWorkspaceVertical, _SchedulerWorkSpaceIn);
  function SchedulerWorkspaceVertical() {
    return _SchedulerWorkSpaceIn.apply(this, arguments) || this;
  }
  var _proto = SchedulerWorkspaceVertical.prototype;
  _proto._getFormat = function _getFormat() {
    return _base.formatWeekdayAndDay;
  };
  _proto.generateRenderOptions = function generateRenderOptions() {
    var options = _SchedulerWorkSpaceIn.prototype.generateRenderOptions.call(this);
    return _extends(_extends({}, options), {
      isGenerateTimePanelData: true
    });
  };
  _proto._isRenderHeaderPanelEmptyCell = function _isRenderHeaderPanelEmptyCell() {
    return true;
  };
  return SchedulerWorkspaceVertical;
}(_m_work_space_indicator.default);
var _default = SchedulerWorkspaceVertical;
exports.default = _default;