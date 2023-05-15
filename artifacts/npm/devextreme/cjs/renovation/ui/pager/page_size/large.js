/**
* DevExtreme (cjs/renovation/ui/pager/page_size/large.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.viewFunction = exports.PageSizeLargeProps = exports.PageSizeLarge = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _combine_classes = require("../../../utils/combine_classes");
var _light_button = require("../common/light_button");
var _pager_props = require("../common/pager_props");
var _consts = require("../common/consts");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _string = require("../../../../core/utils/string");
var _excluded = ["pageSize", "pageSizeChange", "pageSizes"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var viewFunction = function viewFunction(_ref) {
  var pageSizesText = _ref.pageSizesText;
  return (0, _inferno.createFragment)(pageSizesText.map(function (_ref2) {
    var className = _ref2.className,
      click = _ref2.click,
      label = _ref2.label,
      text = _ref2.text;
    return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
      "className": className,
      "label": label,
      "onClick": click,
      children: text
    }, text);
  }), 0);
};
exports.viewFunction = viewFunction;
var PageSizeLargeProps = {};
exports.PageSizeLargeProps = PageSizeLargeProps;
var PageSizeLargePropsType = Object.defineProperties({}, {
  pageSize: {
    get: function get() {
      return _pager_props.InternalPagerProps.pageSize;
    },
    configurable: true,
    enumerable: true
  }
});
var PageSizeLarge = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PageSizeLarge, _BaseInfernoComponent);
  function PageSizeLarge(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = PageSizeLarge.prototype;
  _proto.onPageSizeChange = function onPageSizeChange(processedPageSize) {
    var _this2 = this;
    return function () {
      _this2.props.pageSizeChange(processedPageSize);
      return _this2.props.pageSize;
    };
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['pageSize'] !== nextProps['pageSize'] || this.props['pageSizes'] !== nextProps['pageSizes'] || this.props['pageSizeChange'] !== nextProps['pageSizeChange']) {
      this.__getterCache['pageSizesText'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pageSizesText: this.pageSizesText,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PageSizeLarge, [{
    key: "pageSizesText",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['pageSizesText'] !== undefined) {
        return this.__getterCache['pageSizesText'];
      }
      return this.__getterCache['pageSizesText'] = function () {
        var _this3$props = _this3.props,
          pageSize = _this3$props.pageSize,
          pageSizes = _this3$props.pageSizes;
        return pageSizes.map(function (_ref3, index) {
          var _combineClasses;
          var text = _ref3.text,
            processedPageSize = _ref3.value;
          var selected = processedPageSize === pageSize;
          var className = (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, selected ? _consts.PAGER_SELECTED_PAGE_SIZE_CLASS : _consts.PAGER_PAGE_SIZE_CLASS, true), _defineProperty(_combineClasses, _consts.FIRST_CHILD_CLASS, index === 0), _combineClasses));
          return {
            className: className,
            click: _this3.onPageSizeChange(processedPageSize),
            label: (0, _string.format)(_message.default.getFormatter('dxPager-pageSize'), processedPageSize || _message.default.getFormatter('dxPager-pageSizesAllText')),
            text: text
          };
        });
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        pageSize = _this$props.pageSize,
        pageSizeChange = _this$props.pageSizeChange,
        pageSizes = _this$props.pageSizes,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return PageSizeLarge;
}(_inferno2.BaseInfernoComponent);
exports.PageSizeLarge = PageSizeLarge;
PageSizeLarge.defaultProps = PageSizeLargePropsType;
