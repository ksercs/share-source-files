!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scroll_view/scrollbar/animated_scrollbar.js"], ["inferno","@devextreme/runtime/inferno","./scrollbar","../../../../animation/frame","../common/simulated_strategy_props","../../../../core/utils/math","../utils/clamp_into_range","../common/animated_scrollbar_props","../../../../events/utils/index","../common/consts","../../../common/config_context"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scroll_view/scrollbar/animated_scrollbar.js", ["inferno", "@devextreme/runtime/inferno", "./scrollbar", "../../../../animation/frame", "../common/simulated_strategy_props", "../../../../core/utils/math", "../utils/clamp_into_range", "../common/animated_scrollbar_props", "../../../../events/utils/index", "../common/consts", "../../../common/config_context"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.OUT_BOUNDS_ACCELERATION = exports.MIN_VELOCITY_LIMIT = exports.BOUNCE_MIN_VELOCITY_LIMIT = exports.BOUNCE_ACCELERATION_SUM = exports.AnimatedScrollbar = exports.ACCELERATION = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _scrollbar = $__require("./scrollbar");
  var _frame = $__require("../../../../animation/frame");
  var _simulated_strategy_props = $__require("../common/simulated_strategy_props");
  var _math = $__require("../../../../core/utils/math");
  var _clamp_into_range = $__require("../utils/clamp_into_range");
  var _animated_scrollbar_props = $__require("../common/animated_scrollbar_props");
  var _index = $__require("../../../../events/utils/index");
  var _consts = $__require("../common/consts");
  var _config_context = $__require("../../../common/config_context");
  var _excluded = ["bottomPocketSize", "bounceEnabled", "containerHasSizes", "containerSize", "contentPaddingBottom", "contentSize", "direction", "forceGeneratePockets", "inertiaEnabled", "maxOffset", "minOffset", "onBounce", "onEnd", "onLock", "onPullDown", "onReachBottom", "onScroll", "onUnlock", "pulledDown", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "showScrollbar", "visible"];
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
  var OUT_BOUNDS_ACCELERATION = 0.5;
  exports.OUT_BOUNDS_ACCELERATION = OUT_BOUNDS_ACCELERATION;
  var ACCELERATION = 0.92;
  exports.ACCELERATION = ACCELERATION;
  var MIN_VELOCITY_LIMIT = 1;
  exports.MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT;
  var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
  exports.BOUNCE_MIN_VELOCITY_LIMIT = BOUNCE_MIN_VELOCITY_LIMIT;
  var FRAME_DURATION = 17;
  var BOUNCE_DURATION = 400;
  var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
  var BOUNCE_ACCELERATION_SUM = (1 - Math.pow(ACCELERATION, BOUNCE_FRAMES)) / (1 - ACCELERATION);
  exports.BOUNCE_ACCELERATION_SUM = BOUNCE_ACCELERATION_SUM;
  var viewFunction = function viewFunction(viewModel) {
    var newScrollLocation = viewModel.newScrollLocation,
        _viewModel$props = viewModel.props,
        bounceEnabled = _viewModel$props.bounceEnabled,
        containerHasSizes = _viewModel$props.containerHasSizes,
        containerSize = _viewModel$props.containerSize,
        contentSize = _viewModel$props.contentSize,
        direction = _viewModel$props.direction,
        maxOffset = _viewModel$props.maxOffset,
        minOffset = _viewModel$props.minOffset,
        scrollByThumb = _viewModel$props.scrollByThumb,
        showScrollbar = _viewModel$props.showScrollbar,
        visible = _viewModel$props.visible,
        scrollbarRef = viewModel.scrollbarRef;
    return (0, _inferno.createComponentVNode)(2, _scrollbar.Scrollbar, {
      "direction": direction,
      "contentSize": contentSize,
      "containerSize": containerSize,
      "visible": visible,
      "minOffset": minOffset,
      "maxOffset": maxOffset,
      "scrollLocation": newScrollLocation,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "containerHasSizes": containerHasSizes
    }, null, scrollbarRef);
  };
  exports.viewFunction = viewFunction;
  var AnimatedScrollbarPropsType = Object.defineProperties({}, {
    pulledDown: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.pulledDown;
      },
      configurable: true,
      enumerable: true
    },
    bottomPocketSize: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.bottomPocketSize;
      },
      configurable: true,
      enumerable: true
    },
    contentPaddingBottom: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.contentPaddingBottom;
      },
      configurable: true,
      enumerable: true
    },
    direction: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.direction;
      },
      configurable: true,
      enumerable: true
    },
    containerSize: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.containerSize;
      },
      configurable: true,
      enumerable: true
    },
    contentSize: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.contentSize;
      },
      configurable: true,
      enumerable: true
    },
    visible: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.visible;
      },
      configurable: true,
      enumerable: true
    },
    containerHasSizes: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.containerHasSizes;
      },
      configurable: true,
      enumerable: true
    },
    scrollLocation: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.scrollLocation;
      },
      configurable: true,
      enumerable: true
    },
    minOffset: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.minOffset;
      },
      configurable: true,
      enumerable: true
    },
    maxOffset: {
      get: function get() {
        return _animated_scrollbar_props.AnimatedScrollbarProps.maxOffset;
      },
      configurable: true,
      enumerable: true
    },
    inertiaEnabled: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.inertiaEnabled;
      },
      configurable: true,
      enumerable: true
    },
    showScrollbar: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.showScrollbar;
      },
      configurable: true,
      enumerable: true
    },
    scrollByThumb: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.scrollByThumb;
      },
      configurable: true,
      enumerable: true
    },
    bounceEnabled: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.bounceEnabled;
      },
      configurable: true,
      enumerable: true
    },
    reachBottomEnabled: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.reachBottomEnabled;
      },
      configurable: true,
      enumerable: true
    },
    forceGeneratePockets: {
      get: function get() {
        return _simulated_strategy_props.ScrollableSimulatedProps.forceGeneratePockets;
      },
      configurable: true,
      enumerable: true
    }
  });
  var AnimatedScrollbar = /*#__PURE__*/function (_InfernoComponent) {
    _inheritsLoose(AnimatedScrollbar, _InfernoComponent);
    function AnimatedScrollbar(props) {
      var _this;
      _this = _InfernoComponent.call(this, props) || this;
      _this.scrollbarRef = (0, _inferno.createRef)();
      _this.rightScrollLocation = 0;
      _this.prevScrollLocation = 0;
      _this.thumbScrolling = false;
      _this.crossThumbScrolling = false;
      _this.stepAnimationFrame = 0;
      _this.velocity = 0;
      _this.refreshing = false;
      _this.loading = false;
      _this.state = {
        canceled: false,
        newScrollLocation: 0,
        forceAnimationToBottomBound: false,
        pendingRefreshing: false,
        pendingLoading: false,
        pendingBounceAnimator: false,
        pendingInertiaAnimator: false,
        needRiseEnd: false,
        wasRelease: false
      };
      _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
      _this.isScrollbar = _this.isScrollbar.bind(_assertThisInitialized(_this));
      _this.reachedMin = _this.reachedMin.bind(_assertThisInitialized(_this));
      _this.reachedMax = _this.reachedMax.bind(_assertThisInitialized(_this));
      _this.initHandler = _this.initHandler.bind(_assertThisInitialized(_this));
      _this.moveHandler = _this.moveHandler.bind(_assertThisInitialized(_this));
      _this.endHandler = _this.endHandler.bind(_assertThisInitialized(_this));
      _this.stopHandler = _this.stopHandler.bind(_assertThisInitialized(_this));
      _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
      _this.releaseHandler = _this.releaseHandler.bind(_assertThisInitialized(_this));
      _this.disposeAnimationFrame = _this.disposeAnimationFrame.bind(_assertThisInitialized(_this));
      _this.risePullDown = _this.risePullDown.bind(_assertThisInitialized(_this));
      _this.riseEnd = _this.riseEnd.bind(_assertThisInitialized(_this));
      _this.riseReachBottom = _this.riseReachBottom.bind(_assertThisInitialized(_this));
      _this.startAnimator = _this.startAnimator.bind(_assertThisInitialized(_this));
      _this.updateScrollLocationInRTL = _this.updateScrollLocationInRTL.bind(_assertThisInitialized(_this));
      _this.performAnimation = _this.performAnimation.bind(_assertThisInitialized(_this));
      _this.updateLockedState = _this.updateLockedState.bind(_assertThisInitialized(_this));
      _this.suppressVelocityBeforeBoundary = _this.suppressVelocityBeforeBoundary.bind(_assertThisInitialized(_this));
      _this.scrollToNextStep = _this.scrollToNextStep.bind(_assertThisInitialized(_this));
      _this.setActiveState = _this.setActiveState.bind(_assertThisInitialized(_this));
      _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_this));
      _this.moveToMouseLocation = _this.moveToMouseLocation.bind(_assertThisInitialized(_this));
      _this.resetThumbScrolling = _this.resetThumbScrolling.bind(_assertThisInitialized(_this));
      _this.stop = _this.stop.bind(_assertThisInitialized(_this));
      _this.cancel = _this.cancel.bind(_assertThisInitialized(_this));
      _this.calcThumbScrolling = _this.calcThumbScrolling.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = AnimatedScrollbar.prototype;
    _proto.createEffects = function createEffects() {
      return [new _inferno2.InfernoEffect(this.disposeAnimationFrame, []), new _inferno2.InfernoEffect(this.risePullDown, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.pulledDown, this.props.onPullDown]), new _inferno2.InfernoEffect(this.riseEnd, [this.props.scrollLocation, this.props.maxOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.forceGeneratePockets, this.props.pulledDown, this.props.reachBottomEnabled, this.state.wasRelease, this.props.onEnd, this.props.direction]), new _inferno2.InfernoEffect(this.riseReachBottom, [this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.onReachBottom]), new _inferno2.InfernoEffect(this.startAnimator, [this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.bounceEnabled, this.props.onBounce, this.props.inertiaEnabled]), new _inferno2.InfernoEffect(this.updateScrollLocationInRTL, [this.props.containerHasSizes, this.props.direction, this.props.rtlEnabled, this.props.maxOffset, this.props.scrollLocation, this.props.scrollLocationChange, this.props.onScroll]), new _inferno2.InfernoEffect(this.performAnimation, [this.state.pendingInertiaAnimator, this.state.canceled, this.state.pendingBounceAnimator, this.props.bounceEnabled, this.props.minOffset, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.scrollLocationChange, this.props.direction, this.props.onScroll]), new _inferno2.InfernoEffect(this.updateLockedState, [this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock, this.props.onUnlock])];
    };
    _proto.updateEffects = function updateEffects() {
      var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7;
      (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.pulledDown, this.props.onPullDown]);
      (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.scrollLocation, this.props.maxOffset, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.forceGeneratePockets, this.props.pulledDown, this.props.reachBottomEnabled, this.state.wasRelease, this.props.onEnd, this.props.direction]);
      (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.onReachBottom]);
      (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.state.needRiseEnd, this.state.pendingBounceAnimator, this.state.pendingInertiaAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.minOffset, this.props.bounceEnabled, this.props.onBounce, this.props.inertiaEnabled]);
      (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.containerHasSizes, this.props.direction, this.props.rtlEnabled, this.props.maxOffset, this.props.scrollLocation, this.props.scrollLocationChange, this.props.onScroll]);
      (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.state.pendingInertiaAnimator, this.state.canceled, this.state.pendingBounceAnimator, this.props.bounceEnabled, this.props.minOffset, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.reachBottomEnabled, this.state.forceAnimationToBottomBound, this.props.maxOffset, this.props.bottomPocketSize, this.props.contentPaddingBottom, this.props.scrollLocationChange, this.props.direction, this.props.onScroll]);
      (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.state.pendingBounceAnimator, this.state.pendingRefreshing, this.state.pendingLoading, this.props.onLock, this.props.onUnlock]);
    };
    _proto.disposeAnimationFrame = function disposeAnimationFrame() {
      var _this2 = this;
      return function () {
        _this2.cancel();
      };
    };
    _proto.risePullDown = function risePullDown() {
      if (this.props.forceGeneratePockets && this.isReadyToStart && this.inRange && this.props.pulledDown && !this.refreshing) {
        var _this$props$onPullDow, _this$props;
        this.refreshing = true;
        this.setState(function (__state_argument) {
          return {
            pendingRefreshing: true
          };
        });
        (_this$props$onPullDow = (_this$props = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props);
      }
    };
    _proto.riseEnd = function riseEnd() {
      var isInsideBounds = (0, _math.inRange)(this.props.scrollLocation, this.props.maxOffset, 0);
      if (isInsideBounds && this.isReadyToStart && this.finished && !this.pendingRelease) {
        var _this$props$onEnd, _this$props2;
        this.setState(function (__state_argument) {
          return {
            needRiseEnd: false
          };
        });
        this.setState(function (__state_argument) {
          return {
            wasRelease: false
          };
        });
        this.setState(function (__state_argument) {
          return {
            forceAnimationToBottomBound: false
          };
        });
        (_this$props$onEnd = (_this$props2 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props2, this.props.direction);
      }
    };
    _proto.riseReachBottom = function riseReachBottom() {
      if (this.props.forceGeneratePockets && this.isReadyToStart && this.inRange && this.isReachBottom && !this.loading && this.finished) {
        var _this$props$onReachBo, _this$props3;
        this.loading = true;
        this.setState(function (__state_argument) {
          return {
            pendingLoading: true
          };
        });
        (_this$props$onReachBo = (_this$props3 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props3);
      }
    };
    _proto.startAnimator = function startAnimator() {
      if (this.isReadyToStart) {
        this.setState(function (__state_argument) {
          return {
            canceled: false
          };
        });
        if (!this.inRange && this.props.bounceEnabled && !this.state.pendingBounceAnimator) {
          var _this$props$onBounce, _this$props4;
          var distanceToBound = (0, _clamp_into_range.clampIntoRange)(this.props.scrollLocation, this.props.minOffset, this.maxOffset) - this.props.scrollLocation;
          this.velocity = distanceToBound / BOUNCE_ACCELERATION_SUM;
          (_this$props$onBounce = (_this$props4 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props4);
          this.setState(function (__state_argument) {
            return {
              pendingBounceAnimator: true
            };
          });
        }
        if (this.inRange && this.props.inertiaEnabled && !this.finished && !this.state.pendingInertiaAnimator) {
          if (this.thumbScrolling || !this.thumbScrolling && this.crossThumbScrolling) {
            this.velocity = 0;
          }
          this.setState(function (__state_argument) {
            return {
              pendingInertiaAnimator: true
            };
          });
        }
      }
    };
    _proto.updateScrollLocationInRTL = function updateScrollLocationInRTL() {
      if (this.props.containerHasSizes && this.isHorizontal && this.props.rtlEnabled) {
        if (this.props.maxOffset === 0 && this.props.scrollLocation) {
          this.rightScrollLocation = 0;
        }
        this.moveTo(this.props.maxOffset - this.rightScrollLocation);
      }
    };
    _proto.performAnimation = function performAnimation() {
      if (this.state.pendingInertiaAnimator) {
        if (this.state.canceled) {
          this.setState(function (__state_argument) {
            return {
              needRiseEnd: false
            };
          });
          this.stop();
          return;
        }
        if (this.finished || !this.props.bounceEnabled && this.distanceToNearestBoundary === 0) {
          this.stop();
          return;
        }
        if (!this.props.bounceEnabled) {
          this.suppressVelocityBeforeBoundary();
        }
        this.scrollToNextStep();
      }
      if (this.state.pendingBounceAnimator) {
        if (this.distanceToNearestBoundary === 0) {
          this.stop();
          return;
        }
        this.suppressVelocityBeforeBoundary();
        this.scrollToNextStep();
      }
    };
    _proto.updateLockedState = function updateLockedState() {
      if (this.state.pendingBounceAnimator || this.state.pendingRefreshing || this.state.pendingLoading) {
        var _this$props$onLock, _this$props5;
        (_this$props$onLock = (_this$props5 = this.props).onLock) === null || _this$props$onLock === void 0 ? void 0 : _this$props$onLock.call(_this$props5);
      } else {
        var _this$props$onUnlock, _this$props6;
        (_this$props$onUnlock = (_this$props6 = this.props).onUnlock) === null || _this$props$onUnlock === void 0 ? void 0 : _this$props$onUnlock.call(_this$props6);
      }
    };
    _proto.suppressVelocityBeforeBoundary = function suppressVelocityBeforeBoundary() {
      if (Math.abs(this.distanceToMin) - Math.abs(this.velocity) <= 0) {
        this.velocity = this.distanceToMin;
      }
      if (Math.abs(this.distanceToMax) - Math.abs(this.velocity) <= 0) {
        this.velocity = this.distanceToMax;
      }
    };
    _proto.scrollToNextStep = function scrollToNextStep() {
      var _this3 = this;
      (0, _frame.cancelAnimationFrame)(this.stepAnimationFrame);
      this.stepAnimationFrame = (0, _frame.requestAnimationFrame)(function () {
        var prevVelocity = _this3.velocity;
        _this3.velocity *= _this3.acceleration;
        _this3.moveTo(_this3.props.scrollLocation + prevVelocity);
      });
    };
    _proto.setActiveState = function setActiveState() {
      this.scrollbarRef.current.setActiveState();
    };
    _proto.moveTo = function moveTo(value) {
      var _this$props$scrollLoc, _this$props7;
      this.rightScrollLocation = this.props.maxOffset - value;
      this.setState(function (__state_argument) {
        return {
          newScrollLocation: value
        };
      });
      var scrollDelta = Math.abs(this.prevScrollLocation - value);
      this.prevScrollLocation = value;
      (_this$props$scrollLoc = (_this$props7 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props7, {
        fullScrollProp: this.fullScrollProp,
        location: -value
      });
      if (scrollDelta > 0) {
        var _this$props$onScroll, _this$props8;
        (_this$props$onScroll = (_this$props8 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props8);
      }
    };
    _proto.moveToMouseLocation = function moveToMouseLocation(event, offset) {
      var mouseLocation = event["page".concat(this.axis.toUpperCase())] - offset;
      var containerToContentRatio = this.props.containerSize / this.props.contentSize;
      var delta = mouseLocation / containerToContentRatio - this.props.containerSize / 2;
      this.moveTo(Math.round(-delta));
    };
    _proto.resetThumbScrolling = function resetThumbScrolling() {
      this.thumbScrolling = false;
      this.crossThumbScrolling = false;
    };
    _proto.stop = function stop() {
      this.velocity = 0;
      this.setState(function (__state_argument) {
        return {
          pendingBounceAnimator: false
        };
      });
      this.setState(function (__state_argument) {
        return {
          pendingInertiaAnimator: false
        };
      });
    };
    _proto.cancel = function cancel() {
      this.setState(function (__state_argument) {
        return {
          canceled: true
        };
      });
      this.stop();
      (0, _frame.cancelAnimationFrame)(this.stepAnimationFrame);
    };
    _proto.calcThumbScrolling = function calcThumbScrolling(event, currentCrossThumbScrolling, isScrollbarClicked) {
      var target = event.originalEvent.target;
      this.thumbScrolling = isScrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
      this.crossThumbScrolling = !this.thumbScrolling && currentCrossThumbScrolling;
    };
    _proto.isThumb = function isThumb(element) {
      return this.scrollbarRef.current.isThumb(element);
    };
    _proto.isScrollbar = function isScrollbar(element) {
      return this.scrollbarRef.current.isScrollbar(element);
    };
    _proto.reachedMin = function reachedMin() {
      return this.props.scrollLocation <= this.maxOffset;
    };
    _proto.reachedMax = function reachedMax() {
      return this.props.scrollLocation >= this.props.minOffset;
    };
    _proto.initHandler = function initHandler(event, crossThumbScrolling, offset) {
      this.cancel();
      this.refreshing = false;
      this.loading = false;
      if (!(0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
        var target = event.originalEvent.target;
        var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);
        this.calcThumbScrolling(event, crossThumbScrolling, scrollbarClicked);
        if (scrollbarClicked) {
          this.moveToMouseLocation(event, offset);
        }
        if (this.thumbScrolling) {
          this.setActiveState();
        }
      }
    };
    _proto.moveHandler = function moveHandler(delta, isDxMouseWheel) {
      if (this.crossThumbScrolling) {
        return;
      }
      var resultDelta = delta;
      if (this.thumbScrolling) {
        resultDelta = -Math.round(delta / (this.props.containerSize / this.props.contentSize));
      }
      var isOutBounds = !(0, _math.inRange)(this.props.scrollLocation, this.maxOffset, this.props.minOffset);
      if (isOutBounds) {
        resultDelta *= OUT_BOUNDS_ACCELERATION;
      }
      var scrollValue = this.props.scrollLocation + resultDelta;
      this.moveTo(this.props.bounceEnabled && !isDxMouseWheel ? scrollValue : (0, _clamp_into_range.clampIntoRange)(scrollValue, this.props.minOffset, this.maxOffset));
    };
    _proto.endHandler = function endHandler(receivedVelocity, needRiseEnd) {
      this.velocity = this.props.inertiaEnabled && !this.thumbScrolling ? receivedVelocity : 0;
      this.setState(function (__state_argument) {
        return {
          needRiseEnd: needRiseEnd
        };
      });
      this.resetThumbScrolling();
    };
    _proto.stopHandler = function stopHandler() {
      if (this.thumbScrolling) {
        this.setState(function (__state_argument) {
          return {
            needRiseEnd: true
          };
        });
      }
      this.resetThumbScrolling();
    };
    _proto.scrollTo = function scrollTo(value, needRiseEnd) {
      this.loading = false;
      this.refreshing = false;
      this.moveTo(-(0, _clamp_into_range.clampIntoRange)(value, -this.maxOffset, 0));
      this.setState(function (__state_argument) {
        return {
          needRiseEnd: needRiseEnd
        };
      });
    };
    _proto.releaseHandler = function releaseHandler() {
      if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && (0, _math.inRange)(this.props.scrollLocation, this.maxOffset, this.props.maxOffset)) {
        this.setState(function (__state_argument) {
          return {
            forceAnimationToBottomBound: true
          };
        });
      }
      this.setState(function (__state_argument) {
        return {
          wasRelease: true
        };
      });
      this.setState(function (__state_argument) {
        return {
          needRiseEnd: true
        };
      });
      this.resetThumbScrolling();
      this.setState(function (__state_argument) {
        return {
          pendingRefreshing: false
        };
      });
      this.setState(function (__state_argument) {
        return {
          pendingLoading: false
        };
      });
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        canceled: this.state.canceled,
        newScrollLocation: this.state.newScrollLocation,
        forceAnimationToBottomBound: this.state.forceAnimationToBottomBound,
        pendingRefreshing: this.state.pendingRefreshing,
        pendingLoading: this.state.pendingLoading,
        pendingBounceAnimator: this.state.pendingBounceAnimator,
        pendingInertiaAnimator: this.state.pendingInertiaAnimator,
        needRiseEnd: this.state.needRiseEnd,
        wasRelease: this.state.wasRelease,
        scrollbarRef: this.scrollbarRef,
        config: this.config,
        isReadyToStart: this.isReadyToStart,
        distanceToNearestBoundary: this.distanceToNearestBoundary,
        suppressVelocityBeforeBoundary: this.suppressVelocityBeforeBoundary,
        scrollToNextStep: this.scrollToNextStep,
        setActiveState: this.setActiveState,
        moveTo: this.moveTo,
        moveToMouseLocation: this.moveToMouseLocation,
        resetThumbScrolling: this.resetThumbScrolling,
        stop: this.stop,
        cancel: this.cancel,
        calcThumbScrolling: this.calcThumbScrolling,
        distanceToMin: this.distanceToMin,
        distanceToMax: this.distanceToMax,
        pendingRelease: this.pendingRelease,
        inProgress: this.inProgress,
        inRange: this.inRange,
        isReachBottom: this.isReachBottom,
        finished: this.finished,
        acceleration: this.acceleration,
        maxOffset: this.maxOffset,
        isHorizontal: this.isHorizontal,
        axis: this.axis,
        fullScrollProp: this.fullScrollProp,
        restAttributes: this.restAttributes
      });
    };
    _createClass(AnimatedScrollbar, [{
      key: "config",
      get: function get() {
        if (this.context[_config_context.ConfigContext.id]) {
          return this.context[_config_context.ConfigContext.id];
        }
        return _config_context.ConfigContext.defaultValue;
      }
    }, {
      key: "isReadyToStart",
      get: function get() {
        return this.state.needRiseEnd && !this.inProgress && !(this.state.pendingRefreshing || this.state.pendingLoading);
      }
    }, {
      key: "distanceToNearestBoundary",
      get: function get() {
        return Math.min(Math.abs(this.distanceToMin), Math.abs(this.distanceToMax));
      }
    }, {
      key: "distanceToMin",
      get: function get() {
        return this.props.minOffset - this.props.scrollLocation;
      }
    }, {
      key: "distanceToMax",
      get: function get() {
        return this.maxOffset - this.props.scrollLocation;
      }
    }, {
      key: "pendingRelease",
      get: function get() {
        return this.props.forceGeneratePockets && (this.props.pulledDown || this.isReachBottom) && !this.state.wasRelease;
      }
    }, {
      key: "inProgress",
      get: function get() {
        return this.state.pendingBounceAnimator || this.state.pendingInertiaAnimator;
      }
    }, {
      key: "inRange",
      get: function get() {
        return (0, _math.inRange)(this.props.scrollLocation, this.maxOffset, this.props.minOffset);
      }
    }, {
      key: "isReachBottom",
      get: function get() {
        return this.props.reachBottomEnabled && this.props.maxOffset < 0 && Math.round(-Math.ceil(-this.props.scrollLocation) - this.props.maxOffset) <= 1;
      }
    }, {
      key: "finished",
      get: function get() {
        if (this.state.pendingBounceAnimator) {
          return Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
        }
        return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
      }
    }, {
      key: "acceleration",
      get: function get() {
        return this.state.pendingBounceAnimator || this.inRange ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
      }
    }, {
      key: "maxOffset",
      get: function get() {
        if (this.props.forceGeneratePockets && this.props.reachBottomEnabled && !this.state.forceAnimationToBottomBound) {
          return this.props.maxOffset - this.props.bottomPocketSize - this.props.contentPaddingBottom;
        }
        return this.props.maxOffset;
      }
    }, {
      key: "isHorizontal",
      get: function get() {
        return this.props.direction === _consts.DIRECTION_HORIZONTAL;
      }
    }, {
      key: "axis",
      get: function get() {
        return this.isHorizontal ? 'x' : 'y';
      }
    }, {
      key: "fullScrollProp",
      get: function get() {
        return this.isHorizontal ? 'scrollLeft' : 'scrollTop';
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props9 = this.props,
            bottomPocketSize = _this$props9.bottomPocketSize,
            bounceEnabled = _this$props9.bounceEnabled,
            containerHasSizes = _this$props9.containerHasSizes,
            containerSize = _this$props9.containerSize,
            contentPaddingBottom = _this$props9.contentPaddingBottom,
            contentSize = _this$props9.contentSize,
            direction = _this$props9.direction,
            forceGeneratePockets = _this$props9.forceGeneratePockets,
            inertiaEnabled = _this$props9.inertiaEnabled,
            maxOffset = _this$props9.maxOffset,
            minOffset = _this$props9.minOffset,
            onBounce = _this$props9.onBounce,
            onEnd = _this$props9.onEnd,
            onLock = _this$props9.onLock,
            onPullDown = _this$props9.onPullDown,
            onReachBottom = _this$props9.onReachBottom,
            onScroll = _this$props9.onScroll,
            onUnlock = _this$props9.onUnlock,
            pulledDown = _this$props9.pulledDown,
            reachBottomEnabled = _this$props9.reachBottomEnabled,
            rtlEnabled = _this$props9.rtlEnabled,
            scrollByThumb = _this$props9.scrollByThumb,
            scrollLocation = _this$props9.scrollLocation,
            scrollLocationChange = _this$props9.scrollLocationChange,
            showScrollbar = _this$props9.showScrollbar,
            visible = _this$props9.visible,
            restProps = _objectWithoutProperties(_this$props9, _excluded);
        return restProps;
      }
    }]);
    return AnimatedScrollbar;
  }(_inferno2.InfernoComponent);
  exports.AnimatedScrollbar = AnimatedScrollbar;
  AnimatedScrollbar.defaultProps = AnimatedScrollbarPropsType;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","./scrollbar","../../../../animation/frame","../common/simulated_strategy_props","../../../../core/utils/math","../utils/clamp_into_range","../common/animated_scrollbar_props","../../../../events/utils/index","../common/consts","../../../common/config_context"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("./scrollbar"), require("../../../../animation/frame"), require("../common/simulated_strategy_props"), require("../../../../core/utils/math"), require("../utils/clamp_into_range"), require("../common/animated_scrollbar_props"), require("../../../../events/utils/index"), require("../common/consts"), require("../../../common/config_context"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=animated_scrollbar.js.map