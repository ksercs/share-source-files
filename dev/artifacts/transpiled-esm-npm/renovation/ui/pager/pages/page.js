"use strict";

exports.viewFunction = exports.PageProps = exports.Page = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _light_button = require("../common/light_button");
var _consts = require("../common/consts");
var _combine_classes = require("../../../utils/combine_classes");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _string = require("../../../../core/utils/string");
var _excluded = ["className", "index", "onClick", "selected"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var className = _ref.className,
    label = _ref.label,
    _ref$props = _ref.props,
    onClick = _ref$props.onClick,
    selected = _ref$props.selected,
    value = _ref.value;
  return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
    "className": className,
    "label": label,
    "onClick": onClick,
    "selected": selected,
    children: value
  });
};
exports.viewFunction = viewFunction;
var PageProps = {
  index: 0,
  selected: false,
  className: _consts.PAGER_PAGE_CLASS
};
exports.PageProps = PageProps;
var Page = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Page, _BaseInfernoComponent);
  function Page(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = Page.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      label: this.label,
      value: this.value,
      className: this.className,
      restAttributes: this.restAttributes
    });
  };
  _createClass(Page, [{
    key: "label",
    get: function get() {
      return (0, _string.format)(_message.default.getFormatter('dxPager-page'), this.value);
    }
  }, {
    key: "value",
    get: function get() {
      return this.props.index + 1;
    }
  }, {
    key: "className",
    get: function get() {
      var selected = this.props.selected;
      return (0, _combine_classes.combineClasses)({
        ["".concat(this.props.className)]: !!this.props.className,
        [_consts.PAGER_SELECTION_CLASS]: !!selected
      });
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        className = _this$props.className,
        index = _this$props.index,
        onClick = _this$props.onClick,
        selected = _this$props.selected,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return Page;
}(_inferno2.BaseInfernoComponent);
exports.Page = Page;
Page.defaultProps = PageProps;