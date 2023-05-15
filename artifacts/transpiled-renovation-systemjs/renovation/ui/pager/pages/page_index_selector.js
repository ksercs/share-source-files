!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/pager/pages/page_index_selector.js"], ["inferno","@devextreme/runtime/inferno","../common/light_button","./large","./small","../common/pager_props","../../../common/config_context","../../../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/pager/pages/page_index_selector.js", ["inferno", "@devextreme/runtime/inferno", "../common/light_button", "./large", "./small", "../common/pager_props", "../../../common/config_context", "../../../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.viewFunction = exports.PageIndexSelectorProps = exports.PageIndexSelector = exports.PAGER_BUTTON_DISABLE_CLASS = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _light_button = $__require("../common/light_button");
  var _large = $__require("./large");
  var _small = $__require("./small");
  var _pager_props = $__require("../common/pager_props");
  var _config_context = $__require("../../../common/config_context");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _excluded = ["hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../common/light_button","./large","./small","../common/pager_props","../../../common/config_context","../../../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../common/light_button"), require("./large"), require("./small"), require("../common/pager_props"), require("../../../common/config_context"), require("../../../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=page_index_selector.js.map