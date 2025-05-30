"use strict";

exports.viewFunction = exports.PAGER_INFO_CLASS = exports.InfoTextProps = exports.InfoText = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _string = require("../../../core/utils/string");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _pager_props = require("./common/pager_props");
var _excluded = ["infoText", "pageCount", "pageIndex", "rootElementRef", "totalCount"];
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
var PAGER_INFO_CLASS = 'dx-info';
exports.PAGER_INFO_CLASS = PAGER_INFO_CLASS;
var viewFunction = function viewFunction(_ref) {
  var rootElementRef = _ref.props.rootElementRef,
    text = _ref.text;
  return (0, _inferno.createVNode)(1, "div", PAGER_INFO_CLASS, text, 0, null, null, rootElementRef);
};
exports.viewFunction = viewFunction;
var InfoTextProps = {};
exports.InfoTextProps = InfoTextProps;
var InfoTextPropsType = Object.defineProperties({}, {
  pageIndex: {
    get: function get() {
      return _pager_props.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  pageCount: {
    get: function get() {
      return _pager_props.InternalPagerProps.pageCount;
    },
    configurable: true,
    enumerable: true
  },
  totalCount: {
    get: function get() {
      return _pager_props.InternalPagerProps.totalCount;
    },
    configurable: true,
    enumerable: true
  }
});
var InfoText = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(InfoText, _BaseInfernoComponent);
  function InfoText(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = InfoText.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      infoText: this.infoText,
      text: this.text,
      restAttributes: this.restAttributes
    });
  };
  _createClass(InfoText, [{
    key: "infoText",
    get: function get() {
      var _this$props$infoText;
      return ((_this$props$infoText = this.props.infoText) !== null && _this$props$infoText !== void 0 ? _this$props$infoText : '') || _message.default.getFormatter('dxPager-infoText')();
    }
  }, {
    key: "text",
    get: function get() {
      var _this$props = this.props,
        pageCount = _this$props.pageCount,
        pageIndex = _this$props.pageIndex,
        totalCount = _this$props.totalCount;
      return (0, _string.format)(this.infoText, (pageIndex + 1).toString(), pageCount.toString(), totalCount.toString());
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        infoText = _this$props2.infoText,
        pageCount = _this$props2.pageCount,
        pageIndex = _this$props2.pageIndex,
        rootElementRef = _this$props2.rootElementRef,
        totalCount = _this$props2.totalCount,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return InfoText;
}(_inferno2.BaseInfernoComponent);
exports.InfoText = InfoText;
InfoText.defaultProps = InfoTextPropsType;