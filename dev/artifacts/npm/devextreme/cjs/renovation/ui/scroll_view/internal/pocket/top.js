/**
* DevExtreme (cjs/renovation/ui/scroll_view/internal/pocket/top.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.viewFunction = exports.TopPocketProps = exports.TopPocket = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _load_indicator = require("../../../load_indicator");
var _combine_classes = require("../../../../utils/combine_classes");
var _message = _interopRequireDefault(require("../../../../../localization/message"));
var _consts = require("../../common/consts");
var _themes = require("../../../../../ui/themes");
var _excluded = ["pocketState", "pocketTop", "pullDownIconAngle", "pullDownOpacity", "pullDownTranslateTop", "pulledDownText", "pullingDownText", "refreshStrategy", "refreshingText", "topPocketRef", "topPocketTranslateTop", "visible"];
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
    pulledDownText = _viewModel$props.pulledDownText,
    pullingDownText = _viewModel$props.pullingDownText,
    refreshStrategy = _viewModel$props.refreshStrategy,
    refreshingText = _viewModel$props.refreshingText,
    topPocketRef = _viewModel$props.topPocketRef,
    pullDownClasses = viewModel.pullDownClasses,
    pullDownIconStyles = viewModel.pullDownIconStyles,
    pullDownRef = viewModel.pullDownRef,
    pullDownStyles = viewModel.pullDownStyles,
    readyVisibleClass = viewModel.readyVisibleClass,
    refreshVisibleClass = viewModel.refreshVisibleClass,
    releaseVisibleClass = viewModel.releaseVisibleClass,
    topPocketClasses = viewModel.topPocketClasses,
    topPocketStyles = viewModel.topPocketStyles;
  return (0, _inferno.createVNode)(1, "div", topPocketClasses, (0, _inferno.createVNode)(1, "div", pullDownClasses, [refreshStrategy !== 'swipeDown' && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_IMAGE_CLASS), refreshStrategy === 'swipeDown' && (0, _inferno.createVNode)(1, "div", _consts.PULLDOWN_ICON_CLASS, null, 1, {
    "style": (0, _inferno2.normalizeStyles)(pullDownIconStyles)
  }), (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_INDICATOR_CLASS, (0, _inferno.createComponentVNode)(2, _load_indicator.LoadIndicator), 2), refreshStrategy !== 'swipeDown' && (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_PULLDOWN_TEXT_CLASS, [(0, _inferno.createVNode)(1, "div", releaseVisibleClass, pullingDownText, 0), (0, _inferno.createVNode)(1, "div", readyVisibleClass, pulledDownText, 0), (0, _inferno.createVNode)(1, "div", refreshVisibleClass, refreshingText, 0)], 4)], 0, {
    "style": (0, _inferno2.normalizeStyles)(pullDownStyles)
  }, null, pullDownRef), 2, {
    "style": (0, _inferno2.normalizeStyles)(topPocketStyles)
  }, null, topPocketRef);
};
exports.viewFunction = viewFunction;
var TopPocketProps = Object.defineProperties({
  pullDownTranslateTop: 0,
  pullDownIconAngle: 0,
  pullDownOpacity: 0,
  pocketTop: 0,
  topPocketTranslateTop: 0,
  visible: true
}, {
  pullingDownText: {
    get: function get() {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? '' : _message.default.format('dxScrollView-pullingDownText');
    },
    configurable: true,
    enumerable: true
  },
  pulledDownText: {
    get: function get() {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? '' : _message.default.format('dxScrollView-pulledDownText');
    },
    configurable: true,
    enumerable: true
  },
  refreshingText: {
    get: function get() {
      return (0, _themes.isMaterial)((0, _themes.current)()) ? '' : _message.default.format('dxScrollView-refreshingText');
    },
    configurable: true,
    enumerable: true
  },
  pocketState: {
    get: function get() {
      return _consts.TopPocketState.STATE_RELEASED;
    },
    configurable: true,
    enumerable: true
  }
});
exports.TopPocketProps = TopPocketProps;
var TopPocket = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(TopPocket, _BaseInfernoComponent);
  function TopPocket(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.pullDownRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    return _this;
  }
  var _proto = TopPocket.prototype;
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.props['refreshStrategy'] !== nextProps['refreshStrategy'] || this.props['pullDownOpacity'] !== nextProps['pullDownOpacity'] || this.props['pullDownTranslateTop'] !== nextProps['pullDownTranslateTop']) {
      this.__getterCache['pullDownStyles'] = undefined;
    }
    if (this.props['refreshStrategy'] !== nextProps['refreshStrategy'] || this.props['pocketTop'] !== nextProps['pocketTop'] || this.props['topPocketTranslateTop'] !== nextProps['topPocketTranslateTop']) {
      this.__getterCache['topPocketStyles'] = undefined;
    }
    if (this.props['pullDownIconAngle'] !== nextProps['pullDownIconAngle']) {
      this.__getterCache['pullDownIconStyles'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pullDownRef: this.pullDownRef,
      releaseVisibleClass: this.releaseVisibleClass,
      readyVisibleClass: this.readyVisibleClass,
      refreshVisibleClass: this.refreshVisibleClass,
      pullDownClasses: this.pullDownClasses,
      topPocketClasses: this.topPocketClasses,
      pullDownStyles: this.pullDownStyles,
      topPocketStyles: this.topPocketStyles,
      pullDownIconStyles: this.pullDownIconStyles,
      restAttributes: this.restAttributes
    });
  };
  _createClass(TopPocket, [{
    key: "releaseVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_RELEASED ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "readyVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_READY ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "refreshVisibleClass",
    get: function get() {
      return this.props.pocketState === _consts.TopPocketState.STATE_REFRESHING ? _consts.SCROLLVIEW_PULLDOWN_VISIBLE_TEXT_CLASS : undefined;
    }
  }, {
    key: "pullDownClasses",
    get: function get() {
      var _this$props = this.props,
        pocketState = _this$props.pocketState,
        visible = _this$props.visible;
      var classesMap = {
        [_consts.SCROLLVIEW_PULLDOWN]: true,
        [_consts.SCROLLVIEW_PULLDOWN_READY_CLASS]: pocketState === _consts.TopPocketState.STATE_READY,
        [_consts.SCROLLVIEW_PULLDOWN_LOADING_CLASS]: pocketState === _consts.TopPocketState.STATE_REFRESHING,
        'dx-state-invisible': !visible
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "topPocketClasses",
    get: function get() {
      var classesMap = {
        [_consts.SCROLLVIEW_TOP_POCKET_CLASS]: true,
        'dx-state-invisible': !this.props.visible
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "pullDownStyles",
    get: function get() {
      var _this2 = this;
      if (this.__getterCache['pullDownStyles'] !== undefined) {
        return this.__getterCache['pullDownStyles'];
      }
      return this.__getterCache['pullDownStyles'] = function () {
        if (_this2.props.refreshStrategy === 'swipeDown') {
          return {
            opacity: _this2.props.pullDownOpacity,
            transform: "translate(0px, ".concat(_this2.props.pullDownTranslateTop, "px)")
          };
        }
        return undefined;
      }();
    }
  }, {
    key: "topPocketStyles",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['topPocketStyles'] !== undefined) {
        return this.__getterCache['topPocketStyles'];
      }
      return this.__getterCache['topPocketStyles'] = function () {
        if (_this3.props.refreshStrategy === 'pullDown') {
          return {
            top: "".concat(-_this3.props.pocketTop, "px"),
            transform: "translate(0px, ".concat(_this3.props.topPocketTranslateTop, "px)")
          };
        }
        return undefined;
      }();
    }
  }, {
    key: "pullDownIconStyles",
    get: function get() {
      var _this4 = this;
      if (this.__getterCache['pullDownIconStyles'] !== undefined) {
        return this.__getterCache['pullDownIconStyles'];
      }
      return this.__getterCache['pullDownIconStyles'] = function () {
        return {
          transform: "rotate(".concat(_this4.props.pullDownIconAngle, "deg)")
        };
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        pocketState = _this$props2.pocketState,
        pocketTop = _this$props2.pocketTop,
        pullDownIconAngle = _this$props2.pullDownIconAngle,
        pullDownOpacity = _this$props2.pullDownOpacity,
        pullDownTranslateTop = _this$props2.pullDownTranslateTop,
        pulledDownText = _this$props2.pulledDownText,
        pullingDownText = _this$props2.pullingDownText,
        refreshStrategy = _this$props2.refreshStrategy,
        refreshingText = _this$props2.refreshingText,
        topPocketRef = _this$props2.topPocketRef,
        topPocketTranslateTop = _this$props2.topPocketTranslateTop,
        visible = _this$props2.visible,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return TopPocket;
}(_inferno2.BaseInfernoComponent);
exports.TopPocket = TopPocket;
TopPocket.defaultProps = TopPocketProps;
