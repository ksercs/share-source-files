"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../../../core/component_registrator"));
var _group_panel = require("../../../../../component_wrapper/scheduler/group_panel");
var _group_panel2 = require("./group_panel");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var GroupPanel = /*#__PURE__*/function (_GroupPanelWrapper) {
  _inheritsLoose(GroupPanel, _GroupPanelWrapper);
  function GroupPanel() {
    return _GroupPanelWrapper.apply(this, arguments) || this;
  }
  _createClass(GroupPanel, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [],
        allowNull: [],
        elements: [],
        templates: ['resourceCellTemplate'],
        props: ['groups', 'groupOrientation', 'groupPanelData', 'groupByDate', 'height', 'className', 'resourceCellTemplate']
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _group_panel2.GroupPanel;
    }
  }]);
  return GroupPanel;
}(_group_panel.GroupPanelWrapper);
exports.default = GroupPanel;
(0, _component_registrator.default)('dxGroupPanel', GroupPanel);
module.exports = exports.default;
module.exports.default = exports.default;