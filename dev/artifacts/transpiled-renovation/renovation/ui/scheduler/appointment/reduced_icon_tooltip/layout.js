"use strict";

exports.viewFunction = exports.ReducedIconTooltipProps = exports.ReducedIconTooltip = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _tooltip = require("../../../overlays/tooltip");
var _utils = require("../utils");
var _excluded = ["endDate", "target", "visible"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var wrapperAttr = {
  class: 'dx-scheduler-reduced-icon-tooltip'
};
var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
    target = _ref$props.target,
    visible = _ref$props.visible,
    text = _ref.text;
  return (0, _inferno.createComponentVNode)(2, _tooltip.Tooltip, {
    "visible": visible,
    "target": target,
    "wrapperAttr": wrapperAttr,
    children: (0, _inferno.createFragment)(text, 0)
  });
};
exports.viewFunction = viewFunction;
var ReducedIconTooltipProps = {
  visible: false
};
exports.ReducedIconTooltipProps = ReducedIconTooltipProps;
var ReducedIconTooltip = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(ReducedIconTooltip, _BaseInfernoComponent);
  function ReducedIconTooltip(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = ReducedIconTooltip.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      text: this.text,
      restAttributes: this.restAttributes
    });
  };
  _createClass(ReducedIconTooltip, [{
    key: "text",
    get: function get() {
      return (0, _utils.getReducedIconTooltipText)(this.props.endDate);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        endDate = _this$props.endDate,
        target = _this$props.target,
        visible = _this$props.visible,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return ReducedIconTooltip;
}(_inferno2.BaseInfernoComponent);
exports.ReducedIconTooltip = ReducedIconTooltip;
ReducedIconTooltip.defaultProps = ReducedIconTooltipProps;