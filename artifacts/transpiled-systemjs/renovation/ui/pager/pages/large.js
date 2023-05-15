!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/pager/pages/large.js"], ["inferno","@devextreme/runtime/inferno","./page","../common/pager_props","../../../common/config_context"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/pager/pages/large.js", ["inferno", "@devextreme/runtime/inferno", "./page", "../common/pager_props", "../../../common/config_context"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.PagesLarge = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _page = $__require("./page");
  var _pager_props = $__require("../common/pager_props");
  var _config_context = $__require("../../../common/config_context");
  var _excluded = ["pageIndexes"],
      _excluded2 = ["maxPagesCount", "pageCount", "pageIndex", "pageIndexChange"];
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
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  var PAGER_PAGE_SEPARATOR_CLASS = 'dx-separator';
  var viewFunction = function viewFunction(_ref) {
    var pages = _ref.pages;
    var PagesMarkup = pages.map(function (_ref2) {
      var key = _ref2.key,
          pageProps = _ref2.pageProps;
      return pageProps ? (0, _inferno.createComponentVNode)(2, _page.Page, {
        "index": pageProps.index,
        "selected": pageProps.selected,
        "onClick": pageProps.onClick
      }, key) : (0, _inferno.createVNode)(1, "div", PAGER_PAGE_SEPARATOR_CLASS, ". . .", 16, null, key);
    });
    return (0, _inferno.createFragment)(PagesMarkup, 0);
  };
  exports.viewFunction = viewFunction;
  var PAGES_LIMITER = 4;
  function getDelimiterType(startIndex, slidingWindowSize, pageCount) {
    if (startIndex === 1) {
      return 'high';
    }
    if (startIndex + slidingWindowSize === pageCount - 1) {
      return 'low';
    }
    return 'both';
  }
  function createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter) {
    var pageIndexes = [];
    var indexesForReuse = [];
    switch (delimiter) {
      case 'none':
        pageIndexes = _toConsumableArray(slidingWindowIndexes);
        break;
      case 'both':
        pageIndexes = [0, 'low'].concat(_toConsumableArray(slidingWindowIndexes), ['high', pageCount - 1]);
        indexesForReuse = slidingWindowIndexes.slice(1, -1);
        break;
      case 'high':
        pageIndexes = [0].concat(_toConsumableArray(slidingWindowIndexes), ['high', pageCount - 1]);
        indexesForReuse = slidingWindowIndexes.slice(0, -1);
        break;
      case 'low':
        pageIndexes = [0, 'low'].concat(_toConsumableArray(slidingWindowIndexes), [pageCount - 1]);
        indexesForReuse = slidingWindowIndexes.slice(1);
        break;
    }
    return {
      slidingWindowIndexes: slidingWindowIndexes,
      indexesForReuse: indexesForReuse,
      pageIndexes: pageIndexes
    };
  }
  function createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter) {
    var slidingWindowIndexes = [];
    for (var i = 0; i < slidingWindowSize; i += 1) {
      slidingWindowIndexes.push(i + startIndex);
    }
    return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter);
  }
  var PagesLargePropsType = Object.defineProperties({}, {
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
    }
  });
  var PagesLarge = /*#__PURE__*/function (_BaseInfernoComponent) {
    _inheritsLoose(PagesLarge, _BaseInfernoComponent);
    function PagesLarge(props) {
      var _this;
      _this = _BaseInfernoComponent.call(this, props) || this;
      _this.state = {};
      _this.canReuseSlidingWindow = _this.canReuseSlidingWindow.bind(_assertThisInitialized(_this));
      _this.generatePageIndexes = _this.generatePageIndexes.bind(_assertThisInitialized(_this));
      _this.isSlidingWindowMode = _this.isSlidingWindowMode.bind(_assertThisInitialized(_this));
      _this.onPageClick = _this.onPageClick.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = PagesLarge.prototype;
    _proto.canReuseSlidingWindow = function canReuseSlidingWindow(currentPageCount, pageIndex) {
      var indexesForReuse = this.slidingWindowState.indexesForReuse;
      var lastPageIsFartherThanWindow = indexesForReuse.slice(-1)[0] < currentPageCount - 1;
      var pageIndexExistInIndexes = indexesForReuse.includes(pageIndex);
      return lastPageIsFartherThanWindow && pageIndexExistInIndexes;
    };
    _proto.generatePageIndexes = function generatePageIndexes() {
      var _this$props = this.props,
          pageCount = _this$props.pageCount,
          pageIndex = _this$props.pageIndex;
      var startIndex = 0;
      var slidingWindowIndexes = this.slidingWindowState.slidingWindowIndexes;
      if (pageIndex === slidingWindowIndexes[0]) {
        startIndex = pageIndex - 1;
      } else if (pageIndex === slidingWindowIndexes[slidingWindowIndexes.length - 1]) {
        startIndex = pageIndex + 2 - PAGES_LIMITER;
      } else if (pageIndex < PAGES_LIMITER) {
        startIndex = 1;
      } else if (pageIndex >= pageCount - PAGES_LIMITER) {
        startIndex = pageCount - PAGES_LIMITER - 1;
      } else {
        startIndex = pageIndex - 1;
      }
      var slidingWindowSize = PAGES_LIMITER;
      var delimiter = getDelimiterType(startIndex, slidingWindowSize, pageCount);
      var _createPageIndexes = createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter),
          pageIndexes = _createPageIndexes.pageIndexes,
          slidingWindowState = _objectWithoutProperties(_createPageIndexes, _excluded);
      this.slidingWindowStateHolder = slidingWindowState;
      return pageIndexes;
    };
    _proto.isSlidingWindowMode = function isSlidingWindowMode() {
      var _this$props2 = this.props,
          maxPagesCount = _this$props2.maxPagesCount,
          pageCount = _this$props2.pageCount;
      return pageCount <= PAGES_LIMITER || pageCount <= maxPagesCount;
    };
    _proto.onPageClick = function onPageClick(pageIndex) {
      this.props.pageIndexChange(pageIndex);
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        config: this.config,
        pageIndexes: this.pageIndexes,
        pages: this.pages,
        restAttributes: this.restAttributes
      });
    };
    _createClass(PagesLarge, [{
      key: "config",
      get: function get() {
        if (this.context[_config_context.ConfigContext.id]) {
          return this.context[_config_context.ConfigContext.id];
        }
        return _config_context.ConfigContext.defaultValue;
      }
    }, {
      key: "slidingWindowState",
      get: function get() {
        var slidingWindowState = this.slidingWindowStateHolder;
        if (!slidingWindowState) {
          return {
            indexesForReuse: [],
            slidingWindowIndexes: []
          };
        }
        return slidingWindowState;
      }
    }, {
      key: "pageIndexes",
      get: function get() {
        var pageCount = this.props.pageCount;
        if (this.isSlidingWindowMode()) {
          return createPageIndexes(0, pageCount, pageCount, 'none').pageIndexes;
        }
        if (this.canReuseSlidingWindow(pageCount, this.props.pageIndex)) {
          var slidingWindowIndexes = this.slidingWindowState.slidingWindowIndexes;
          var delimiter = getDelimiterType(slidingWindowIndexes[0], PAGES_LIMITER, pageCount);
          return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter).pageIndexes;
        }
        return this.generatePageIndexes();
      }
    }, {
      key: "pages",
      get: function get() {
        var _this2 = this,
            _this$config;
        var pageIndex = this.props.pageIndex;
        var createPage = function createPage(index) {
          var pagerProps = index === 'low' || index === 'high' ? null : {
            index: index,
            onClick: function onClick() {
              return _this2.onPageClick(index);
            },
            selected: pageIndex === index
          };
          return {
            key: index.toString(),
            pageProps: pagerProps
          };
        };
        var rtlPageIndexes = (_this$config = this.config) !== null && _this$config !== void 0 && _this$config.rtlEnabled ? _toConsumableArray(this.pageIndexes).reverse() : this.pageIndexes;
        return rtlPageIndexes.map(function (index) {
          return createPage(index);
        });
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props3 = this.props,
            maxPagesCount = _this$props3.maxPagesCount,
            pageCount = _this$props3.pageCount,
            pageIndex = _this$props3.pageIndex,
            pageIndexChange = _this$props3.pageIndexChange,
            restProps = _objectWithoutProperties(_this$props3, _excluded2);
        return restProps;
      }
    }]);
    return PagesLarge;
  }(_inferno2.BaseInfernoComponent);
  exports.PagesLarge = PagesLarge;
  PagesLarge.defaultProps = PagesLargePropsType;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./page","../common/pager_props","../../../common/config_context"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./page"), require("../common/pager_props"), require("../../../common/config_context"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=large.js.map