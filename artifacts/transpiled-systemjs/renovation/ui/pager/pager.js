!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/pager/pager.js"], ["inferno","@devextreme/runtime/inferno","./resizable_container","./common/pager_props","./content","../../utils/combine_classes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/pager/pager.js", ["inferno", "@devextreme/runtime/inferno", "./resizable_container", "./common/pager_props", "./content", "../../utils/combine_classes"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.Pager = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _resizable_container = $__require("./resizable_container");
  var _pager_props = $__require("./common/pager_props");
  var _content = $__require("./content");
  var _combine_classes = $__require("../../utils/combine_classes");
  var _excluded = ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
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
  var viewFunction = function viewFunction(_ref) {
    var pagerProps = _ref.pagerProps,
        restAttributes = _ref.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _resizable_container.ResizableContainer, _extends({
      "contentTemplate": _content.PagerContent,
      "pagerProps": pagerProps
    }, restAttributes)));
  };
  exports.viewFunction = viewFunction;
  var Pager = /*#__PURE__*/function (_InfernoWrapperCompon) {
    _inheritsLoose(Pager, _InfernoWrapperCompon);
    function Pager(props) {
      var _this;
      _this = _InfernoWrapperCompon.call(this, props) || this;
      _this.__getterCache = {};
      _this.state = {
        pageSize: _this.props.pageSize !== undefined ? _this.props.pageSize : _this.props.defaultPageSize,
        pageIndex: _this.props.pageIndex !== undefined ? _this.props.pageIndex : _this.props.defaultPageIndex
      };
      _this.pageIndexChange = _this.pageIndexChange.bind(_assertThisInitialized(_this));
      _this.pageSizeChange = _this.pageSizeChange.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = Pager.prototype;
    _proto.createEffects = function createEffects() {
      return [(0, _inferno2.createReRenderEffect)()];
    };
    _proto.pageIndexChange = function pageIndexChange(newPageIndex) {
      if (this.props.gridCompatibility) {
        {
          var __newValue;
          this.setState(function (__state_argument) {
            __newValue = newPageIndex + 1;
            return {
              pageIndex: __newValue
            };
          });
          this.props.pageIndexChange(__newValue);
        }
      } else {
        {
          var _newValue;
          this.setState(function (__state_argument) {
            _newValue = newPageIndex;
            return {
              pageIndex: _newValue
            };
          });
          this.props.pageIndexChange(_newValue);
        }
      }
    };
    _proto.pageSizeChange = function pageSizeChange(newPageSize) {
      {
        var __newValue;
        this.setState(function (__state_argument) {
          __newValue = newPageSize;
          return {
            pageSize: __newValue
          };
        });
        this.props.pageSizeChange(__newValue);
      }
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
      if (this.props !== nextProps || this.props['gridCompatibility'] !== nextProps['gridCompatibility'] || this.props['className'] !== nextProps['className'] || this.state['pageIndex'] !== nextState['pageIndex'] || this.props['pageIndex'] !== nextProps['pageIndex'] || this.props['pageIndexChange'] !== nextProps['pageIndexChange'] || this.props['pageSizeChange'] !== nextProps['pageSizeChange']) {
        this.__getterCache['pagerProps'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize,
          pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
        }),
        pageIndexChange: this.pageIndexChange,
        pageIndex: this.pageIndex,
        pageSizeChange: this.pageSizeChange,
        className: this.className,
        pagerProps: this.pagerProps,
        restAttributes: this.restAttributes
      });
    };
    _createClass(Pager, [{
      key: "pageIndex",
      get: function get() {
        if (this.props.gridCompatibility) {
          return (this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex) - 1;
        }
        return this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex;
      }
    }, {
      key: "className",
      get: function get() {
        if (this.props.gridCompatibility) {
          return (0, _combine_classes.combineClasses)(_defineProperty({
            'dx-datagrid-pager': true
          }, "".concat(this.props.className), !!this.props.className));
        }
        return this.props.className;
      }
    }, {
      key: "pagerProps",
      get: function get() {
        var _this2 = this;
        if (this.__getterCache['pagerProps'] !== undefined) {
          return this.__getterCache['pagerProps'];
        }
        return this.__getterCache['pagerProps'] = function () {
          return _extends({}, _extends({}, _this2.props, {
            pageSize: _this2.props.pageSize !== undefined ? _this2.props.pageSize : _this2.state.pageSize,
            pageIndex: _this2.props.pageIndex !== undefined ? _this2.props.pageIndex : _this2.state.pageIndex
          }), {
            className: _this2.className,
            pageIndex: _this2.pageIndex,
            pageIndexChange: function pageIndexChange(pageIndex) {
              return _this2.pageIndexChange(pageIndex);
            },
            pageSizeChange: function pageSizeChange(pageSize) {
              return _this2.pageSizeChange(pageSize);
            }
          });
        }();
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props$pageSize$ = _extends({}, this.props, {
          pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize,
          pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
        }),
            className = _this$props$pageSize$.className,
            defaultPageIndex = _this$props$pageSize$.defaultPageIndex,
            defaultPageSize = _this$props$pageSize$.defaultPageSize,
            displayMode = _this$props$pageSize$.displayMode,
            gridCompatibility = _this$props$pageSize$.gridCompatibility,
            hasKnownLastPage = _this$props$pageSize$.hasKnownLastPage,
            infoText = _this$props$pageSize$.infoText,
            label = _this$props$pageSize$.label,
            lightModeEnabled = _this$props$pageSize$.lightModeEnabled,
            maxPagesCount = _this$props$pageSize$.maxPagesCount,
            onKeyDown = _this$props$pageSize$.onKeyDown,
            pageCount = _this$props$pageSize$.pageCount,
            pageIndex = _this$props$pageSize$.pageIndex,
            pageIndexChange = _this$props$pageSize$.pageIndexChange,
            pageSize = _this$props$pageSize$.pageSize,
            pageSizeChange = _this$props$pageSize$.pageSizeChange,
            pageSizes = _this$props$pageSize$.pageSizes,
            pagesCountText = _this$props$pageSize$.pagesCountText,
            pagesNavigatorVisible = _this$props$pageSize$.pagesNavigatorVisible,
            rtlEnabled = _this$props$pageSize$.rtlEnabled,
            showInfo = _this$props$pageSize$.showInfo,
            showNavigationButtons = _this$props$pageSize$.showNavigationButtons,
            showPageSizes = _this$props$pageSize$.showPageSizes,
            totalCount = _this$props$pageSize$.totalCount,
            visible = _this$props$pageSize$.visible,
            restProps = _objectWithoutProperties(_this$props$pageSize$, _excluded);
        return restProps;
      }
    }]);
    return Pager;
  }(_inferno2.InfernoWrapperComponent);
  exports.Pager = Pager;
  Pager.defaultProps = _pager_props.PagerProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./resizable_container","./common/pager_props","./content","../../utils/combine_classes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./resizable_container"), require("./common/pager_props"), require("./content"), require("../../utils/combine_classes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pager.js.map