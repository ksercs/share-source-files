!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scroll_view/scrollable.js"], ["inferno","@devextreme/runtime/inferno","./strategy/native","./strategy/simulated","./utils/get_element_location_internal","./utils/convert_location","./utils/get_offset_distance","../../../core/utils/type","../../../core/utils/window","./common/consts","./common/scrollable_props","../../utils/resolve_rtl","../../common/config_context"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scroll_view/scrollable.js", ["inferno", "@devextreme/runtime/inferno", "./strategy/native", "./strategy/simulated", "./utils/get_element_location_internal", "./utils/convert_location", "./utils/get_offset_distance", "../../../core/utils/type", "../../../core/utils/window", "./common/consts", "./common/scrollable_props", "../../utils/resolve_rtl", "../../common/config_context"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.Scrollable = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _native = $__require("./strategy/native");
  var _simulated = $__require("./strategy/simulated");
  var _get_element_location_internal = $__require("./utils/get_element_location_internal");
  var _convert_location = $__require("./utils/convert_location");
  var _get_offset_distance = $__require("./utils/get_offset_distance");
  var _type = $__require("../../../core/utils/type");
  var _window = $__require("../../../core/utils/window");
  var _consts = $__require("./common/consts");
  var _scrollable_props = $__require("./common/scrollable_props");
  var _resolve_rtl = $__require("../../utils/resolve_rtl");
  var _config_context = $__require("../../common/config_context");
  var _excluded = ["addWidgetClass", "aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "loadPanelTemplate", "needRenderScrollbars", "needScrollViewContentWrapper", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshStrategy", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];
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
  var viewFunction = function viewFunction(viewModel) {
    var isServerSide = viewModel.isServerSide,
        _viewModel$props = viewModel.props,
        aria = _viewModel$props.aria,
        bounceEnabled = _viewModel$props.bounceEnabled,
        children = _viewModel$props.children,
        classes = _viewModel$props.classes,
        direction = _viewModel$props.direction,
        disabled = _viewModel$props.disabled,
        forceGeneratePockets = _viewModel$props.forceGeneratePockets,
        height = _viewModel$props.height,
        inertiaEnabled = _viewModel$props.inertiaEnabled,
        loadPanelTemplate = _viewModel$props.loadPanelTemplate,
        needScrollViewContentWrapper = _viewModel$props.needScrollViewContentWrapper,
        onBounce = _viewModel$props.onBounce,
        onEnd = _viewModel$props.onEnd,
        onPullDown = _viewModel$props.onPullDown,
        onReachBottom = _viewModel$props.onReachBottom,
        onScroll = _viewModel$props.onScroll,
        onStart = _viewModel$props.onStart,
        onUpdated = _viewModel$props.onUpdated,
        onVisibilityChange = _viewModel$props.onVisibilityChange,
        pullDownEnabled = _viewModel$props.pullDownEnabled,
        pulledDownText = _viewModel$props.pulledDownText,
        pullingDownText = _viewModel$props.pullingDownText,
        reachBottomEnabled = _viewModel$props.reachBottomEnabled,
        reachBottomText = _viewModel$props.reachBottomText,
        refreshStrategy = _viewModel$props.refreshStrategy,
        refreshingText = _viewModel$props.refreshingText,
        scrollByContent = _viewModel$props.scrollByContent,
        scrollByThumb = _viewModel$props.scrollByThumb,
        showScrollbar = _viewModel$props.showScrollbar,
        useKeyboard = _viewModel$props.useKeyboard,
        useNative = _viewModel$props.useNative,
        useSimulatedScrollbar = _viewModel$props.useSimulatedScrollbar,
        visible = _viewModel$props.visible,
        width = _viewModel$props.width,
        restAttributes = viewModel.restAttributes,
        rtlEnabled = viewModel.rtlEnabled,
        scrollableNativeRef = viewModel.scrollableNativeRef,
        scrollableSimulatedRef = viewModel.scrollableSimulatedRef;
    return useNative ? (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _native.ScrollableNative, _extends({
      "aria": aria,
      "classes": classes,
      "width": width,
      "height": height,
      "disabled": disabled,
      "visible": visible,
      "rtlEnabled": rtlEnabled,
      "direction": direction,
      "showScrollbar": showScrollbar,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "forceGeneratePockets": forceGeneratePockets && !isServerSide,
      "needScrollViewContentWrapper": needScrollViewContentWrapper,
      "loadPanelTemplate": !isServerSide ? loadPanelTemplate : undefined,
      "needRenderScrollbars": !isServerSide,
      "onScroll": onScroll,
      "onUpdated": onUpdated,
      "onPullDown": onPullDown,
      "onReachBottom": onReachBottom,
      "refreshStrategy": refreshStrategy,
      "pulledDownText": pulledDownText,
      "pullingDownText": pullingDownText,
      "refreshingText": refreshingText,
      "reachBottomText": reachBottomText,
      "useSimulatedScrollbar": useSimulatedScrollbar
    }, restAttributes, {
      children: children
    }), null, scrollableNativeRef)) : (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _simulated.ScrollableSimulated, _extends({
      "aria": aria,
      "classes": classes,
      "width": width,
      "height": height,
      "disabled": disabled,
      "visible": visible,
      "rtlEnabled": rtlEnabled,
      "direction": direction,
      "showScrollbar": showScrollbar,
      "scrollByThumb": scrollByThumb,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "forceGeneratePockets": forceGeneratePockets && !isServerSide,
      "needScrollViewContentWrapper": needScrollViewContentWrapper,
      "loadPanelTemplate": !isServerSide ? loadPanelTemplate : undefined,
      "needRenderScrollbars": !isServerSide,
      "onScroll": onScroll,
      "onUpdated": onUpdated,
      "onPullDown": onPullDown,
      "onReachBottom": onReachBottom,
      "refreshStrategy": "simulated",
      "pulledDownText": pulledDownText,
      "pullingDownText": pullingDownText,
      "refreshingText": refreshingText,
      "reachBottomText": reachBottomText,
      "onVisibilityChange": onVisibilityChange,
      "inertiaEnabled": inertiaEnabled,
      "bounceEnabled": bounceEnabled,
      "scrollByContent": scrollByContent,
      "useKeyboard": useKeyboard,
      "onStart": onStart,
      "onEnd": onEnd,
      "onBounce": onBounce
    }, restAttributes, {
      children: children
    }), null, scrollableSimulatedRef));
  };
  exports.viewFunction = viewFunction;
  var getTemplate = function getTemplate(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function (props) {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
    } : TemplateProp);
  };
  var Scrollable = /*#__PURE__*/function (_InfernoWrapperCompon) {
    _inheritsLoose(Scrollable, _InfernoWrapperCompon);
    function Scrollable(props) {
      var _this;
      _this = _InfernoWrapperCompon.call(this, props) || this;
      _this.state = {};
      _this.scrollableNativeRef = (0, _inferno.createRef)();
      _this.scrollableSimulatedRef = (0, _inferno.createRef)();
      _this.content = _this.content.bind(_assertThisInitialized(_this));
      _this.container = _this.container.bind(_assertThisInitialized(_this));
      _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
      _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
      _this.updateHandler = _this.updateHandler.bind(_assertThisInitialized(_this));
      _this.release = _this.release.bind(_assertThisInitialized(_this));
      _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
      _this.scrollToElement = _this.scrollToElement.bind(_assertThisInitialized(_this));
      _this.scrollHeight = _this.scrollHeight.bind(_assertThisInitialized(_this));
      _this.scrollWidth = _this.scrollWidth.bind(_assertThisInitialized(_this));
      _this.scrollOffset = _this.scrollOffset.bind(_assertThisInitialized(_this));
      _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_this));
      _this.scrollLeft = _this.scrollLeft.bind(_assertThisInitialized(_this));
      _this.clientHeight = _this.clientHeight.bind(_assertThisInitialized(_this));
      _this.clientWidth = _this.clientWidth.bind(_assertThisInitialized(_this));
      _this.getScrollElementPosition = _this.getScrollElementPosition.bind(_assertThisInitialized(_this));
      _this.startLoading = _this.startLoading.bind(_assertThisInitialized(_this));
      _this.finishLoading = _this.finishLoading.bind(_assertThisInitialized(_this));
      _this.validate = _this.validate.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = Scrollable.prototype;
    _proto.createEffects = function createEffects() {
      return [(0, _inferno2.createReRenderEffect)()];
    };
    _proto.validate = function validate(event) {
      return this.scrollableRef.validate(event);
    };
    _proto.content = function content() {
      return this.scrollableRef.content();
    };
    _proto.container = function container() {
      return this.scrollableRef.container();
    };
    _proto.scrollTo = function scrollTo(targetLocation) {
      if (!this.props.useNative) {
        this.updateHandler();
      }
      var currentScrollOffset = this.props.useNative ? this.scrollOffset() : {
        top: this.container().scrollTop,
        left: this.container().scrollLeft
      };
      var distance = (0, _get_offset_distance.getOffsetDistance)((0, _convert_location.convertToLocation)(targetLocation, this.props.direction), currentScrollOffset);
      this.scrollBy(distance);
    };
    _proto.scrollBy = function scrollBy(distance) {
      var _convertToLocation = (0, _convert_location.convertToLocation)(distance, this.props.direction),
          left = _convertToLocation.left,
          top = _convertToLocation.top;
      if (!(0, _type.isDefined)(top) || !(0, _type.isNumeric)(top)) {
        top = 0;
      }
      if (!(0, _type.isDefined)(left) || !(0, _type.isNumeric)(top)) {
        left = 0;
      }
      if (top === 0 && left === 0) {
        return;
      }
      this.scrollableRef.scrollByLocation({
        top: top,
        left: left
      });
    };
    _proto.updateHandler = function updateHandler() {
      this.scrollableRef.updateHandler();
    };
    _proto.release = function release() {
      if (!this.isServerSide) {
        this.scrollableRef.release();
      }
    };
    _proto.refresh = function refresh() {
      if (!this.isServerSide) {
        this.scrollableRef.refresh();
      }
    };
    _proto.scrollToElement = function scrollToElement(element, offset) {
      if (!this.content().contains(element)) {
        return;
      }
      var scrollPosition = {
        top: 0,
        left: 0
      };
      var direction = this.props.direction;
      if (direction !== _consts.DIRECTION_VERTICAL) {
        scrollPosition.left = this.getScrollElementPosition(element, _consts.DIRECTION_HORIZONTAL, offset);
      }
      if (direction !== _consts.DIRECTION_HORIZONTAL) {
        scrollPosition.top = this.getScrollElementPosition(element, _consts.DIRECTION_VERTICAL, offset);
      }
      this.scrollTo(scrollPosition);
    };
    _proto.scrollHeight = function scrollHeight() {
      return this.scrollableRef.scrollHeight();
    };
    _proto.scrollWidth = function scrollWidth() {
      return this.scrollableRef.scrollWidth();
    };
    _proto.scrollOffset = function scrollOffset() {
      if (!this.isServerSide) {
        return this.scrollableRef.scrollOffset();
      }
      return {
        top: 0,
        left: 0
      };
    };
    _proto.scrollTop = function scrollTop() {
      return this.scrollableRef.scrollTop();
    };
    _proto.scrollLeft = function scrollLeft() {
      return this.scrollableRef.scrollLeft();
    };
    _proto.clientHeight = function clientHeight() {
      return this.scrollableRef.clientHeight();
    };
    _proto.clientWidth = function clientWidth() {
      return this.scrollableRef.clientWidth();
    };
    _proto.getScrollElementPosition = function getScrollElementPosition(targetElement, direction, offset) {
      var scrollOffset = this.scrollOffset();
      return (0, _get_element_location_internal.getElementLocationInternal)(targetElement, direction, this.container(), scrollOffset, offset);
    };
    _proto.startLoading = function startLoading() {
      this.scrollableRef.startLoading();
    };
    _proto.finishLoading = function finishLoading() {
      if (!this.isServerSide) {
        this.scrollableRef.finishLoading();
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props, {
          loadPanelTemplate: getTemplate(props.loadPanelTemplate)
        }),
        scrollableNativeRef: this.scrollableNativeRef,
        scrollableSimulatedRef: this.scrollableSimulatedRef,
        config: this.config,
        validate: this.validate,
        scrollableRef: this.scrollableRef,
        rtlEnabled: this.rtlEnabled,
        isServerSide: this.isServerSide,
        restAttributes: this.restAttributes
      });
    };
    _createClass(Scrollable, [{
      key: "config",
      get: function get() {
        if (this.context[_config_context.ConfigContext.id]) {
          return this.context[_config_context.ConfigContext.id];
        }
        return _config_context.ConfigContext.defaultValue;
      }
    }, {
      key: "scrollableRef",
      get: function get() {
        if (this.props.useNative) {
          return this.scrollableNativeRef.current;
        }
        return this.scrollableSimulatedRef.current;
      }
    }, {
      key: "rtlEnabled",
      get: function get() {
        var rtlEnabled = this.props.rtlEnabled;
        return !!(0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
      }
    }, {
      key: "isServerSide",
      get: function get() {
        return !(0, _window.hasWindow)();
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            addWidgetClass = _this$props.addWidgetClass,
            aria = _this$props.aria,
            bounceEnabled = _this$props.bounceEnabled,
            children = _this$props.children,
            classes = _this$props.classes,
            direction = _this$props.direction,
            disabled = _this$props.disabled,
            forceGeneratePockets = _this$props.forceGeneratePockets,
            height = _this$props.height,
            inertiaEnabled = _this$props.inertiaEnabled,
            loadPanelTemplate = _this$props.loadPanelTemplate,
            needRenderScrollbars = _this$props.needRenderScrollbars,
            needScrollViewContentWrapper = _this$props.needScrollViewContentWrapper,
            onBounce = _this$props.onBounce,
            onEnd = _this$props.onEnd,
            onPullDown = _this$props.onPullDown,
            onReachBottom = _this$props.onReachBottom,
            onScroll = _this$props.onScroll,
            onStart = _this$props.onStart,
            onUpdated = _this$props.onUpdated,
            onVisibilityChange = _this$props.onVisibilityChange,
            pullDownEnabled = _this$props.pullDownEnabled,
            pulledDownText = _this$props.pulledDownText,
            pullingDownText = _this$props.pullingDownText,
            reachBottomEnabled = _this$props.reachBottomEnabled,
            reachBottomText = _this$props.reachBottomText,
            refreshStrategy = _this$props.refreshStrategy,
            refreshingText = _this$props.refreshingText,
            rtlEnabled = _this$props.rtlEnabled,
            scrollByContent = _this$props.scrollByContent,
            scrollByThumb = _this$props.scrollByThumb,
            scrollLocationChange = _this$props.scrollLocationChange,
            showScrollbar = _this$props.showScrollbar,
            useKeyboard = _this$props.useKeyboard,
            useNative = _this$props.useNative,
            useSimulatedScrollbar = _this$props.useSimulatedScrollbar,
            visible = _this$props.visible,
            width = _this$props.width,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return Scrollable;
  }(_inferno2.InfernoWrapperComponent);
  exports.Scrollable = Scrollable;
  Scrollable.defaultProps = _scrollable_props.ScrollableProps;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./strategy/native","./strategy/simulated","./utils/get_element_location_internal","./utils/convert_location","./utils/get_offset_distance","../../../core/utils/type","../../../core/utils/window","./common/consts","./common/scrollable_props","../../utils/resolve_rtl","../../common/config_context"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./strategy/native"), require("./strategy/simulated"), require("./utils/get_element_location_internal"), require("./utils/convert_location"), require("./utils/get_offset_distance"), require("../../../core/utils/type"), require("../../../core/utils/window"), require("./common/consts"), require("./common/scrollable_props"), require("../../utils/resolve_rtl"), require("../../common/config_context"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollable.js.map