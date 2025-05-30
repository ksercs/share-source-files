"use strict";

exports.viewFunction = exports.PageSizeSmallProps = exports.PageSizeSmall = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _select_box = require("../../editors/drop_down_editors/select_box");
var _calculate_values_fitted_width = require("../utils/calculate_values_fitted_width");
var _get_element_width = require("../utils/get_element_width");
var _pager_props = require("../common/pager_props");
var _excluded = ["inputAttr", "pageSize", "pageSizeChange", "pageSizes", "parentRef"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var _ref$props = _ref.props,
    inputAttr = _ref$props.inputAttr,
    pageSize = _ref$props.pageSize,
    pageSizeChange = _ref$props.pageSizeChange,
    pageSizes = _ref$props.pageSizes,
    width = _ref.width;
  return (0, _inferno.createComponentVNode)(2, _select_box.SelectBox, {
    "displayExpr": "text",
    "valueExpr": "value",
    "dataSource": pageSizes,
    "value": pageSize,
    "valueChange": pageSizeChange,
    "width": width,
    "inputAttr": inputAttr
  });
};
exports.viewFunction = viewFunction;
var PageSizeSmallProps = {
  inputAttr: Object.freeze({
    'aria-label': _message.default.format('dxPager-ariaPageSize')
  })
};
exports.PageSizeSmallProps = PageSizeSmallProps;
var PageSizeSmallPropsType = Object.defineProperties({}, {
  pageSize: {
    get: function get() {
      return _pager_props.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function get() {
      return PageSizeSmallProps.inputAttr;
    },
    configurable: true,
    enumerable: true
  }
});
var PageSizeSmall = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(PageSizeSmall, _InfernoComponent);
  function PageSizeSmall(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {
      minWidth: 10
    };
    _this.updateWidth = _this.updateWidth.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = PageSizeSmall.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.updateWidth, [this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr])];
  };
  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props, this.state.minWidth, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.inputAttr]);
  };
  _proto.updateWidth = function updateWidth() {
    var _this2 = this;
    this.setState(function (__state_argument) {
      return {
        minWidth: (0, _get_element_width.getElementMinWidth)(_this2.props.parentRef.current) || __state_argument.minWidth
      };
    });
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      width: this.width,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PageSizeSmall, [{
    key: "width",
    get: function get() {
      return (0, _calculate_values_fitted_width.calculateValuesFittedWidth)(this.state.minWidth, this.props.pageSizes.map(function (p) {
        return p.value;
      }));
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        inputAttr = _this$props.inputAttr,
        pageSize = _this$props.pageSize,
        pageSizeChange = _this$props.pageSizeChange,
        pageSizes = _this$props.pageSizes,
        parentRef = _this$props.parentRef,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return PageSizeSmall;
}(_inferno2.InfernoComponent);
exports.PageSizeSmall = PageSizeSmall;
PageSizeSmall.defaultProps = PageSizeSmallPropsType;