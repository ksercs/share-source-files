"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _week = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/week");
var _m_constants = require("../m_constants");
var _m_work_space_vertical = _interopRequireDefault(require("./m_work_space_vertical"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var WEEK_CLASS = 'dx-scheduler-work-space-week';
var SchedulerWorkSpaceWeek = /*#__PURE__*/function (_SchedulerWorkSpaceVe) {
  _inheritsLoose(SchedulerWorkSpaceWeek, _SchedulerWorkSpaceVe);
  function SchedulerWorkSpaceWeek() {
    return _SchedulerWorkSpaceVe.apply(this, arguments) || this;
  }
  var _proto = SchedulerWorkSpaceWeek.prototype;
  _proto._getElementClass = function _getElementClass() {
    return WEEK_CLASS;
  };
  _proto._calculateViewStartDate = function _calculateViewStartDate() {
    return (0, _week.calculateViewStartDate)(this.option('startDate'), this._firstDayOfWeek());
  };
  _createClass(SchedulerWorkSpaceWeek, [{
    key: "type",
    get: function get() {
      return _m_constants.VIEWS.WEEK;
    }
  }]);
  return SchedulerWorkSpaceWeek;
}(_m_work_space_vertical.default);
(0, _component_registrator.default)('dxSchedulerWorkSpaceWeek', SchedulerWorkSpaceWeek);
var _default = SchedulerWorkSpaceWeek;
exports.default = _default;