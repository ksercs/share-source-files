"use strict";

exports.viewFunction = exports.PagerContentProps = exports.PagerContent = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _info = require("./info");
var _page_index_selector = require("./pages/page_index_selector");
var _selector = require("./page_size/selector");
var _consts = require("./common/consts");
var _pager_props = require("./common/pager_props");
var _combine_classes = require("../../utils/combine_classes");
var _widget = require("../common/widget");
var _accessibility = require("../../../ui/shared/accessibility");
var _keyboard_action_context = require("./common/keyboard_action_context");
var _excluded = ["className", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var viewFunction = function viewFunction(_ref) {
  var aria = _ref.aria,
    classes = _ref.classes,
    infoVisible = _ref.infoVisible,
    isLargeDisplayMode = _ref.isLargeDisplayMode,
    pageIndexSelectorVisible = _ref.pageIndexSelectorVisible,
    pagesContainerVisibility = _ref.pagesContainerVisibility,
    pagesContainerVisible = _ref.pagesContainerVisible,
    _ref$props = _ref.props,
    hasKnownLastPage = _ref$props.hasKnownLastPage,
    infoText = _ref$props.infoText,
    infoTextRef = _ref$props.infoTextRef,
    maxPagesCount = _ref$props.maxPagesCount,
    pageCount = _ref$props.pageCount,
    pageIndex = _ref$props.pageIndex,
    pageIndexChange = _ref$props.pageIndexChange,
    pageSize = _ref$props.pageSize,
    pageSizeChange = _ref$props.pageSizeChange,
    pageSizes = _ref$props.pageSizes,
    pageSizesRef = _ref$props.pageSizesRef,
    pagesCountText = _ref$props.pagesCountText,
    pagesRef = _ref$props.pagesRef,
    rtlEnabled = _ref$props.rtlEnabled,
    showNavigationButtons = _ref$props.showNavigationButtons,
    showPageSizes = _ref$props.showPageSizes,
    totalCount = _ref$props.totalCount,
    visible = _ref$props.visible,
    restAttributes = _ref.restAttributes,
    widgetRootElementRef = _ref.widgetRootElementRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "rootElementRef": widgetRootElementRef,
    "rtlEnabled": rtlEnabled,
    "classes": classes,
    "visible": visible,
    "aria": aria
  }, restAttributes, {
    children: [showPageSizes && (0, _inferno.createComponentVNode)(2, _selector.PageSizeSelector, {
      "rootElementRef": pageSizesRef,
      "isLargeDisplayMode": isLargeDisplayMode,
      "pageSize": pageSize,
      "pageSizeChange": pageSizeChange,
      "pageSizes": pageSizes
    }), pagesContainerVisible && (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGES_CLASS, [infoVisible && (0, _inferno.createComponentVNode)(2, _info.InfoText, {
      "rootElementRef": infoTextRef,
      "infoText": infoText,
      "pageCount": pageCount,
      "pageIndex": pageIndex,
      "totalCount": totalCount
    }), pageIndexSelectorVisible && (0, _inferno.createVNode)(1, "div", _consts.PAGER_PAGE_INDEXES_CLASS, (0, _inferno.createComponentVNode)(2, _page_index_selector.PageIndexSelector, {
      "hasKnownLastPage": hasKnownLastPage,
      "isLargeDisplayMode": isLargeDisplayMode,
      "maxPagesCount": maxPagesCount,
      "pageCount": pageCount,
      "pageIndex": pageIndex,
      "pageIndexChange": pageIndexChange,
      "pagesCountText": pagesCountText,
      "showNavigationButtons": showNavigationButtons,
      "totalCount": totalCount
    }), 2, null, null, pagesRef)], 0, {
      "style": (0, _inferno2.normalizeStyles)({
        visibility: pagesContainerVisibility
      })
    })]
  })));
};
exports.viewFunction = viewFunction;
var PagerContentProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_pager_props.InternalPagerProps), Object.getOwnPropertyDescriptors({
  infoTextVisible: true,
  isLargeDisplayMode: true
})));
exports.PagerContentProps = PagerContentProps;
var PagerContent = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(PagerContent, _InfernoComponent);
  function PagerContent(props) {
    var _this;
    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.widgetRootElementRef = (0, _inferno.createRef)();
    _this.__getterCache = {};
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.createFakeInstance = _this.createFakeInstance.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = PagerContent.prototype;
  _proto.createEffects = function createEffects() {
    return [new _inferno2.InfernoEffect(this.setRootElementRef, [])];
  };
  _proto.getChildContext = function getChildContext() {
    return _extends({}, this.context, {
      [_keyboard_action_context.KeyboardActionContext.id]: this.keyboardAction || _keyboard_action_context.KeyboardActionContext.defaultValue
    });
  };
  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;
    if (rootElementRef) {
      rootElementRef.current = this.widgetRootElementRef.current;
    }
  };
  _proto.createFakeInstance = function createFakeInstance() {
    var _this2 = this;
    return {
      option: function option() {
        return false;
      },
      element: function element() {
        return _this2.widgetRootElementRef.current;
      },
      _createActionByOption: function _createActionByOption() {
        return function (e) {
          var _this2$props$onKeyDow, _this2$props;
          (_this2$props$onKeyDow = (_this2$props = _this2.props).onKeyDown) === null || _this2$props$onKeyDow === void 0 ? void 0 : _this2$props$onKeyDow.call(_this2$props, e);
        };
      }
    };
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    _InfernoComponent.prototype.componentWillUpdate.call(this);
    if (this.props['onKeyDown'] !== nextProps['onKeyDown']) {
      this.__getterCache['keyboardAction'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRootElementRef: this.widgetRootElementRef,
      keyboardAction: this.keyboardAction,
      infoVisible: this.infoVisible,
      pageIndexSelectorVisible: this.pageIndexSelectorVisible,
      pagesContainerVisible: this.pagesContainerVisible,
      pagesContainerVisibility: this.pagesContainerVisibility,
      isLargeDisplayMode: this.isLargeDisplayMode,
      classes: this.classes,
      aria: this.aria,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PagerContent, [{
    key: "keyboardAction",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['keyboardAction'] !== undefined) {
        return this.__getterCache['keyboardAction'];
      }
      return this.__getterCache['keyboardAction'] = function () {
        return {
          registerKeyboardAction: function registerKeyboardAction(element, action) {
            var fakePagerInstance = _this3.createFakeInstance();
            return (0, _accessibility.registerKeyboardAction)('pager', fakePagerInstance, element, undefined, action);
          }
        };
      }();
    }
  }, {
    key: "infoVisible",
    get: function get() {
      var _this$props = this.props,
        infoTextVisible = _this$props.infoTextVisible,
        showInfo = _this$props.showInfo;
      return showInfo && infoTextVisible;
    }
  }, {
    key: "pageIndexSelectorVisible",
    get: function get() {
      return this.props.pageSize !== 0;
    }
  }, {
    key: "normalizedDisplayMode",
    get: function get() {
      var _this$props2 = this.props,
        displayMode = _this$props2.displayMode,
        lightModeEnabled = _this$props2.lightModeEnabled;
      if (displayMode === 'adaptive' && lightModeEnabled !== undefined) {
        return lightModeEnabled ? 'compact' : 'full';
      }
      return displayMode;
    }
  }, {
    key: "pagesContainerVisible",
    get: function get() {
      return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0;
    }
  }, {
    key: "pagesContainerVisibility",
    get: function get() {
      if (this.props.pagesNavigatorVisible === 'auto' && this.props.pageCount === 1 && this.props.hasKnownLastPage) {
        return 'hidden';
      }
      return undefined;
    }
  }, {
    key: "isLargeDisplayMode",
    get: function get() {
      var displayMode = this.normalizedDisplayMode;
      var result = false;
      if (displayMode === 'adaptive') {
        result = this.props.isLargeDisplayMode;
      } else {
        result = displayMode === 'full';
      }
      return result;
    }
  }, {
    key: "classes",
    get: function get() {
      var classesMap = {
        ["".concat(this.props.className)]: !!this.props.className,
        [_consts.PAGER_CLASS]: true,
        [_consts.LIGHT_MODE_CLASS]: !this.isLargeDisplayMode
      };
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "aria",
    get: function get() {
      return {
        role: 'navigation',
        label: this.props.label
      };
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props3 = this.props,
        className = _this$props3.className,
        displayMode = _this$props3.displayMode,
        gridCompatibility = _this$props3.gridCompatibility,
        hasKnownLastPage = _this$props3.hasKnownLastPage,
        infoText = _this$props3.infoText,
        infoTextRef = _this$props3.infoTextRef,
        infoTextVisible = _this$props3.infoTextVisible,
        isLargeDisplayMode = _this$props3.isLargeDisplayMode,
        label = _this$props3.label,
        lightModeEnabled = _this$props3.lightModeEnabled,
        maxPagesCount = _this$props3.maxPagesCount,
        onKeyDown = _this$props3.onKeyDown,
        pageCount = _this$props3.pageCount,
        pageIndex = _this$props3.pageIndex,
        pageIndexChange = _this$props3.pageIndexChange,
        pageSize = _this$props3.pageSize,
        pageSizeChange = _this$props3.pageSizeChange,
        pageSizes = _this$props3.pageSizes,
        pageSizesRef = _this$props3.pageSizesRef,
        pagesCountText = _this$props3.pagesCountText,
        pagesNavigatorVisible = _this$props3.pagesNavigatorVisible,
        pagesRef = _this$props3.pagesRef,
        rootElementRef = _this$props3.rootElementRef,
        rtlEnabled = _this$props3.rtlEnabled,
        showInfo = _this$props3.showInfo,
        showNavigationButtons = _this$props3.showNavigationButtons,
        showPageSizes = _this$props3.showPageSizes,
        totalCount = _this$props3.totalCount,
        visible = _this$props3.visible,
        restProps = _objectWithoutProperties(_this$props3, _excluded);
      return restProps;
    }
  }]);
  return PagerContent;
}(_inferno2.InfernoComponent);
exports.PagerContent = PagerContent;
PagerContent.defaultProps = PagerContentProps;