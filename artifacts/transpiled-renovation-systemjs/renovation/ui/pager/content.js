!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/ui/pager/content.js"], ["inferno","@devextreme/runtime/inferno","./info","./pages/page_index_selector","./page_size/selector","./common/consts","./common/pager_props","../../utils/combine_classes","../common/widget","../../../ui/shared/accessibility","./common/keyboard_action_context"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/ui/pager/content.js", ["inferno", "@devextreme/runtime/inferno", "./info", "./pages/page_index_selector", "./page_size/selector", "./common/consts", "./common/pager_props", "../../utils/combine_classes", "../common/widget", "../../../ui/shared/accessibility", "./common/keyboard_action_context"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.PagerContentProps = exports.PagerContent = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _info = $__require("./info");
  var _page_index_selector = $__require("./pages/page_index_selector");
  var _selector = $__require("./page_size/selector");
  var _consts = $__require("./common/consts");
  var _pager_props = $__require("./common/pager_props");
  var _combine_classes = $__require("../../utils/combine_classes");
  var _widget = $__require("../common/widget");
  var _accessibility = $__require("../../../ui/shared/accessibility");
  var _keyboard_action_context = $__require("./common/keyboard_action_context");
  var _excluded = ["className", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
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
      return _extends({}, this.context, _defineProperty({}, _keyboard_action_context.KeyboardActionContext.id, this.keyboardAction || _keyboard_action_context.KeyboardActionContext.defaultValue));
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
        var _classesMap;
        var classesMap = (_classesMap = {}, _defineProperty(_classesMap, "".concat(this.props.className), !!this.props.className), _defineProperty(_classesMap, _consts.PAGER_CLASS, true), _defineProperty(_classesMap, _consts.LIGHT_MODE_CLASS, !this.isLargeDisplayMode), _classesMap);
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./info","./pages/page_index_selector","./page_size/selector","./common/consts","./common/pager_props","../../utils/combine_classes","../common/widget","../../../ui/shared/accessibility","./common/keyboard_action_context"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./info"), require("./pages/page_index_selector"), require("./page_size/selector"), require("./common/consts"), require("./common/pager_props"), require("../../utils/combine_classes"), require("../common/widget"), require("../../../ui/shared/accessibility"), require("./common/keyboard_action_context"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=content.js.map