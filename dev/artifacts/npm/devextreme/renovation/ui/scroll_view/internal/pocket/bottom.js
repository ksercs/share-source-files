/**
* DevExtreme (renovation/ui/scroll_view/internal/pocket/bottom.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.BottomPocketProps = exports.BottomPocket = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _load_indicator = require("../../../load_indicator");
var _consts = require("../../common/consts");
var _themes = require("../../../../../ui/themes");
var _combine_classes = require("../../../../utils/combine_classes");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _excluded = ["bottomPocketRef", "reachBottomText", "visible"];
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
var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
    bottomPocketRef = _viewModel$props.bottomPocketRef,
    reachBottomText = _viewModel$props.reachBottomText,
    reachBottomClasses = viewModel.reachBottomClasses;
  return (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_BOTTOM_POCKET_CLASS, (0, _inferno.createVNode)(1, "div", reachBottomClasses, [(0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_REACHBOTTOM_TEXT_CLASS, (0, _inferno.createVNode)(1, "div", null, reachBottomText, 0), 2)], 4), 2, null, null, bottomPocketRef);
};
exports.viewFunction = viewFunction;
var BottomPocketProps = Object.defineProperties({
  visible: true
}, {
  reachBottomText: {
    get: function get() {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? '' : _message.default.format('dxScrollView-reachBottomText');
    },
    configurable: true,
    enumerable: true
  }
});
exports.BottomPocketProps = BottomPocketProps;
var BottomPocket = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(BottomPocket, _BaseInfernoComponent);
  function BottomPocket(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    return _this;
  }
  var _proto = BottomPocket.prototype;
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      reachBottomClasses: this.reachBottomClasses,
      restAttributes: this.restAttributes
    });
  };
  _createClass(BottomPocket, [{
    key: "reachBottomClasses",
    get: function get() {
      var visible = this.props.visible;
      var classesMap = {
        [_consts.SCROLLVIEW_REACHBOTTOM_CLASS]: true,
        'dx-state-invisible': !visible
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props = this.props,
        bottomPocketRef = _this$props.bottomPocketRef,
        reachBottomText = _this$props.reachBottomText,
        visible = _this$props.visible,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      return restProps;
    }
  }]);
  return BottomPocket;
}(_inferno2.BaseInfernoComponent);
exports.BottomPocket = BottomPocket;
BottomPocket.defaultProps = BottomPocketProps;
