/**
* DevExtreme (cjs/renovation/ui/pager/pages/page_index_selector.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
exports.viewFunction = exports.PageIndexSelectorProps = exports.PageIndexSelector = exports.PAGER_BUTTON_DISABLE_CLASS = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _light_button = require("../common/light_button");
var _large = require("./large");
var _small = require("./small");
var _pager_props = require("../common/pager_props");
var _config_context = require("../../../common/config_context");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _excluded = ["hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var PAGER_NAVIGATE_BUTTON = 'dx-navigate-button';
var PAGER_PREV_BUTTON_CLASS = 'dx-prev-button';
var PAGER_NEXT_BUTTON_CLASS = 'dx-next-button';
var PAGER_BUTTON_DISABLE_CLASS = 'dx-button-disable';
exports.PAGER_BUTTON_DISABLE_CLASS = PAGER_BUTTON_DISABLE_CLASS;
var getNextButtonLabel = function getNextButtonLabel() {
  return _message.default.getFormatter('dxPager-nextPage')();
};
var getPrevButtonLabel = function getPrevButtonLabel() {
  return _message.default.getFormatter('dxPager-prevPage')();
};
var classNames = {
  nextEnabledClass: "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS),
  prevEnabledClass: "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS),
  nextDisabledClass: "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS),
  prevDisabledClass: "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS)
};
var reverseDirections = {
  next: 'prev',
  prev: 'next'
};
var viewFunction = function viewFunction(_ref) {
  var nextButtonProps = _ref.nextButtonProps,
    pageIndexChange = _ref.pageIndexChange,
    prevButtonProps = _ref.prevButtonProps,
    _ref$props = _ref.props,
    isLargeDisplayMode = _ref$props.isLargeDisplayMode,
    maxPagesCount = _ref$props.maxPagesCount,
    pageCount = _ref$props.pageCount,
    pageIndex = _ref$props.pageIndex,
    pagesCountText = _ref$props.pagesCountText,
    renderNextButton = _ref.renderNextButton,
    renderPrevButton = _ref.renderPrevButton;
  return (0, _inferno.createFragment)([renderPrevButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
    "label": getPrevButtonLabel(),
    "className": prevButtonProps.className,
    "tabIndex": prevButtonProps.tabIndex,
    "onClick": prevButtonProps.navigate
  }), isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _large.PagesLarge, {
    "maxPagesCount": maxPagesCount,
    "pageCount": pageCount,
    "pageIndex": pageIndex,
    "pageIndexChange": pageIndexChange
  }), !isLargeDisplayMode && (0, _inferno.createComponentVNode)(2, _small.PagesSmall, {
    "pageCount": pageCount,
    "pageIndex": pageIndex,
    "pageIndexChange": pageIndexChange,
    "pagesCountText": pagesCountText
  }), renderNextButton && (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
    "label": getNextButtonLabel(),
    "className": nextButtonProps.className,
    "tabIndex": nextButtonProps.tabIndex,
    "onClick": nextButtonProps.navigate
  })], 0);
};
exports.viewFunction = viewFunction;
function getIncrement(direction) {
  return direction === 'next' ? +1 : -1;
}
var PageIndexSelectorProps = {
  isLargeDisplayMode: true
};
exports.PageIndexSelectorProps = PageIndexSelectorProps;
var PageIndexSelectorPropsType = Object.defineProperties({}, {
  pageIndex: {
    get: function get() {
      return _pager_props.InternalPagerProps.pageIndex;
    },
    configurable: true,
    enumerable: true
  },
  maxPagesCount: {
    get: function get() {
      return _pager_props.InternalPagerProps.maxPagesCount;
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
  hasKnownLastPage: {
    get: function get() {
      return _pager_props.InternalPagerProps.hasKnownLastPage;
    },
    configurable: true,
    enumerable: true
  },
  showNavigationButtons: {
    get: function get() {
      return _pager_props.InternalPagerProps.showNavigationButtons;
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
  },
  isLargeDisplayMode: {
    get: function get() {
      return PageIndexSelectorProps.isLargeDisplayMode;
    },
    configurable: true,
    enumerable: true
  }
});
var PageIndexSelector = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(PageIndexSelector, _BaseInfernoComponent);
  function PageIndexSelector(props) {
    var _this;
    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {};
    _this.__getterCache = {};
    _this.pageIndexChange = _this.pageIndexChange.bind(_assertThisInitialized(_this));
    _this.getButtonProps = _this.getButtonProps.bind(_assertThisInitialized(_this));
    _this.canNavigateToPage = _this.canNavigateToPage.bind(_assertThisInitialized(_this));
    _this.getNextPageIndex = _this.getNextPageIndex.bind(_assertThisInitialized(_this));
    _this.canNavigateTo = _this.canNavigateTo.bind(_assertThisInitialized(_this));
    _this.navigateToPage = _this.navigateToPage.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = PageIndexSelector.prototype;
  _proto.pageIndexChange = function pageIndexChange(pageIndex) {
    if (this.canNavigateToPage(pageIndex)) {
      this.props.pageIndexChange(pageIndex);
    }
  };
  _proto.getButtonProps = function getButtonProps(direction) {
    var _this$config,
      _this2 = this;
    var rtlAwareDirection = (_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled ? reverseDirections[direction] : direction;
    var canNavigate = this.canNavigateTo(rtlAwareDirection);
    var className = classNames["".concat(direction).concat(canNavigate ? 'Enabled' : 'Disabled', "Class")];
    return {
      className: className,
      tabIndex: canNavigate ? 0 : -1,
      navigate: function navigate() {
        return _this2.navigateToPage(rtlAwareDirection);
      }
    };
  };
  _proto.canNavigateToPage = function canNavigateToPage(pageIndex) {
    if (!this.props.hasKnownLastPage) {
      return pageIndex >= 0;
    }
    return pageIndex >= 0 && pageIndex <= this.props.pageCount - 1;
  };
  _proto.getNextPageIndex = function getNextPageIndex(direction) {
    return this.props.pageIndex + getIncrement(direction);
  };
  _proto.canNavigateTo = function canNavigateTo(direction) {
    return this.canNavigateToPage(this.getNextPageIndex(direction));
  };
  _proto.navigateToPage = function navigateToPage(direction) {
    this.pageIndexChange(this.getNextPageIndex(direction));
  };
  _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
    if (this.context[_config_context.ConfigContext.id] !== context[_config_context.ConfigContext.id] || this.props['hasKnownLastPage'] !== nextProps['hasKnownLastPage'] || this.props['pageCount'] !== nextProps['pageCount'] || this.props['pageIndex'] !== nextProps['pageIndex'] || this.props['pageIndexChange'] !== nextProps['pageIndexChange']) {
      this.__getterCache['prevButtonProps'] = undefined;
    }
    if (this.context[_config_context.ConfigContext.id] !== context[_config_context.ConfigContext.id] || this.props['hasKnownLastPage'] !== nextProps['hasKnownLastPage'] || this.props['pageCount'] !== nextProps['pageCount'] || this.props['pageIndex'] !== nextProps['pageIndex'] || this.props['pageIndexChange'] !== nextProps['pageIndexChange']) {
      this.__getterCache['nextButtonProps'] = undefined;
    }
  };
  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      config: this.config,
      pageIndexChange: this.pageIndexChange,
      renderPrevButton: this.renderPrevButton,
      renderNextButton: this.renderNextButton,
      prevButtonProps: this.prevButtonProps,
      nextButtonProps: this.nextButtonProps,
      restAttributes: this.restAttributes
    });
  };
  _createClass(PageIndexSelector, [{
    key: "config",
    get: function get() {
      if (this.context[_config_context.ConfigContext.id]) {
        return this.context[_config_context.ConfigContext.id];
      }
      return _config_context.ConfigContext.defaultValue;
    }
  }, {
    key: "renderPrevButton",
    get: function get() {
      var _this$props = this.props,
        isLargeDisplayMode = _this$props.isLargeDisplayMode,
        showNavigationButtons = _this$props.showNavigationButtons;
      return !isLargeDisplayMode || showNavigationButtons;
    }
  }, {
    key: "renderNextButton",
    get: function get() {
      return this.renderPrevButton || !this.props.hasKnownLastPage;
    }
  }, {
    key: "prevButtonProps",
    get: function get() {
      var _this3 = this;
      if (this.__getterCache['prevButtonProps'] !== undefined) {
        return this.__getterCache['prevButtonProps'];
      }
      return this.__getterCache['prevButtonProps'] = function () {
        return _this3.getButtonProps('prev');
      }();
    }
  }, {
    key: "nextButtonProps",
    get: function get() {
      var _this4 = this;
      if (this.__getterCache['nextButtonProps'] !== undefined) {
        return this.__getterCache['nextButtonProps'];
      }
      return this.__getterCache['nextButtonProps'] = function () {
        return _this4.getButtonProps('next');
      }();
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props2 = this.props,
        hasKnownLastPage = _this$props2.hasKnownLastPage,
        isLargeDisplayMode = _this$props2.isLargeDisplayMode,
        maxPagesCount = _this$props2.maxPagesCount,
        pageCount = _this$props2.pageCount,
        pageIndex = _this$props2.pageIndex,
        pageIndexChange = _this$props2.pageIndexChange,
        pagesCountText = _this$props2.pagesCountText,
        showNavigationButtons = _this$props2.showNavigationButtons,
        totalCount = _this$props2.totalCount,
        restProps = _objectWithoutProperties(_this$props2, _excluded);
      return restProps;
    }
  }]);
  return PageIndexSelector;
}(_inferno2.BaseInfernoComponent);
exports.PageIndexSelector = PageIndexSelector;
PageIndexSelector.defaultProps = PageIndexSelectorPropsType;
