"use strict";

exports.viewFunction = exports.TooltipItemLayoutProps = exports.TooltipItemLayout = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _marker = require("./marker");
var _item_content = require("./item_content");
var _delete_button = require("./delete_button");
var _excluded = ["index", "item"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(viewModel) {
  return (0, _inferno.createVNode)(1, "div", "dx-tooltip-appointment-item", [(0, _inferno.createComponentVNode)(2, _marker.Marker), (0, _inferno.createComponentVNode)(2, _item_content.TooltipItemContent, {
    "text": viewModel.text,
    "formattedDate": viewModel.dateText
  }), (0, _inferno.createComponentVNode)(2, _delete_button.DeleteButton)], 4);
};
exports.viewFunction = viewFunction;
var TooltipItemLayoutProps = {
  index: 0
};
exports.TooltipItemLayoutProps = TooltipItemLayoutProps;
var TooltipItemLayout = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TooltipItemLayout, _BaseInfernoComponent);
  function TooltipItemLayout(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = TooltipItemLayout.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      text: this.text,
      dateText: this.dateText,
      restAttributes: this.restAttributes
    });
  };
  _createClass(TooltipItemLayout, [{
    key: "text",
    get: function get() {
      return this.props.item.appointment.text;
    }
  }, {
    key: "dateText",
    get: function get() {
      return this.props.item.info.dateText;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        index = _this$props.index,
        item = _this$props.item,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return TooltipItemLayout;
}(_inferno2.BaseInfernoComponent);
exports.TooltipItemLayout = TooltipItemLayout;
TooltipItemLayout.defaultProps = TooltipItemLayoutProps;