!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/renovation/ui/scroll_view/scrollbar/scrollbar.js"], ["inferno","@devextreme/runtime/inferno","../../../utils/combine_classes","../../../../core/dom_adapter","../common/consts","../../../utils/subscribe_to_event","../common/scrollbar_props","../common/simulated_strategy_props"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/renovation/ui/scroll_view/scrollbar/scrollbar.js", ["inferno", "@devextreme/runtime/inferno", "../../../utils/combine_classes", "../../../../core/dom_adapter", "../common/consts", "../../../utils/subscribe_to_event", "../common/scrollbar_props", "../common/simulated_strategy_props"], true, function ($__require, exports, module) {
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
  exports.viewFunction = exports.THUMB_MIN_SIZE = exports.ScrollbarPropsType = exports.Scrollbar = void 0;
  var _inferno = $__require("inferno");
  var _inferno2 = $__require("@devextreme/runtime/inferno");
  var _combine_classes = $__require("../../../utils/combine_classes");
  var _dom_adapter = _interopRequireDefault($__require("../../../../core/dom_adapter"));
  var _consts = $__require("../common/consts");
  var _subscribe_to_event = $__require("../../../utils/subscribe_to_event");
  var _scrollbar_props = $__require("../common/scrollbar_props");
  var _simulated_strategy_props = $__require("../common/simulated_strategy_props");
  var _excluded = ["bounceEnabled", "containerHasSizes", "containerSize", "contentSize", "direction", "maxOffset", "minOffset", "scrollByThumb", "scrollLocation", "showScrollbar", "visible"];
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
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
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
  var THUMB_MIN_SIZE = 15;
  exports.THUMB_MIN_SIZE = THUMB_MIN_SIZE;
  var viewFunction = function viewFunction(viewModel) {
    var hidden = viewModel.hidden,
        scrollbarClasses = viewModel.scrollbarClasses,
        scrollbarRef = viewModel.scrollbarRef,
        thumbClasses = viewModel.thumbClasses,
        thumbRef = viewModel.thumbRef,
        thumbStyles = viewModel.thumbStyles;
    return (0, _inferno.createVNode)(1, "div", scrollbarClasses, (0, _inferno.createVNode)(1, "div", thumbClasses, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": (0, _inferno2.normalizeStyles)(thumbStyles)
    }, null, thumbRef), 2, {
      "hidden": hidden
    }, null, scrollbarRef);
  };
  exports.viewFunction = viewFunction;
  var ScrollbarPropsType = Object.defineProperties({}, {
    direction: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.direction;
      },
      configurable: true,
      enumerable: true
    },
    containerSize: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.containerSize;
      },
      configurable: true,
      enumerable: true
    },
    contentSize: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.contentSize;
      },
      configurable: true,
      enumerable: true
    },
    visible: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.visible;
      },
      configurable: true,
      enumerable: true
    },
    containerHasSizes: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.containerHasSizes;
      },
      configurable: true,
      enumerable: true
    },
    scrollLocation: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.scrollLocation;
      },
      configurable: true,
      enumerable: true
    },
    minOffset: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.minOffset;
      },
      configurable: true,
      enumerable: true
    },
    maxOffset: {
      get: function get() {
        return _scrollbar_props.ScrollbarProps.maxOffset;
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
    }
  });
  exports.ScrollbarPropsType = ScrollbarPropsType;
  var Scrollbar = /*#__PURE__*/function (_InfernoComponent) {
    _inheritsLoose(Scrollbar, _InfernoComponent);
    function Scrollbar(props) {
      var _this;
      _this = _InfernoComponent.call(this, props) || this;
      _this.scrollbarRef = (0, _inferno.createRef)();
      _this.scrollRef = (0, _inferno.createRef)();
      _this.thumbRef = (0, _inferno.createRef)();
      _this.__getterCache = {};
      _this.state = {
        hovered: false,
        active: false
      };
      _this.pointerDownEffect = _this.pointerDownEffect.bind(_assertThisInitialized(_this));
      _this.pointerUpEffect = _this.pointerUpEffect.bind(_assertThisInitialized(_this));
      _this.mouseEnterEffect = _this.mouseEnterEffect.bind(_assertThisInitialized(_this));
      _this.mouseLeaveEffect = _this.mouseLeaveEffect.bind(_assertThisInitialized(_this));
      _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
      _this.isScrollbar = _this.isScrollbar.bind(_assertThisInitialized(_this));
      _this.setActiveState = _this.setActiveState.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = Scrollbar.prototype;
    _proto.createEffects = function createEffects() {
      return [new _inferno2.InfernoEffect(this.pointerDownEffect, []), new _inferno2.InfernoEffect(this.pointerUpEffect, []), new _inferno2.InfernoEffect(this.mouseEnterEffect, [this.props.showScrollbar, this.props.scrollByThumb]), new _inferno2.InfernoEffect(this.mouseLeaveEffect, [this.props.showScrollbar, this.props.scrollByThumb])];
    };
    _proto.updateEffects = function updateEffects() {
      var _this$_effects$, _this$_effects$2;
      (_this$_effects$ = this._effects[2]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.showScrollbar, this.props.scrollByThumb]);
      (_this$_effects$2 = this._effects[3]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.showScrollbar, this.props.scrollByThumb]);
    };
    _proto.pointerDownEffect = function pointerDownEffect() {
      var _this2 = this;
      return (0, _subscribe_to_event.subscribeToDXPointerDownEvent)(this.thumbRef.current, function () {
        _this2.setState(function (__state_argument) {
          return {
            active: true
          };
        });
      });
    };
    _proto.pointerUpEffect = function pointerUpEffect() {
      var _this3 = this;
      return (0, _subscribe_to_event.subscribeToDXPointerUpEvent)(_dom_adapter.default.getDocument(), function () {
        _this3.setState(function (__state_argument) {
          return {
            active: false
          };
        });
      });
    };
    _proto.mouseEnterEffect = function mouseEnterEffect() {
      var _this4 = this;
      if (this.isExpandable) {
        return (0, _subscribe_to_event.subscribeToMouseEnterEvent)(this.scrollbarRef.current, function () {
          _this4.setState(function (__state_argument) {
            return {
              hovered: true
            };
          });
        });
      }
      return undefined;
    };
    _proto.mouseLeaveEffect = function mouseLeaveEffect() {
      var _this5 = this;
      if (this.isExpandable) {
        return (0, _subscribe_to_event.subscribeToMouseLeaveEvent)(this.scrollbarRef.current, function () {
          _this5.setState(function (__state_argument) {
            return {
              hovered: false
            };
          });
        });
      }
      return undefined;
    };
    _proto.isThumb = function isThumb(element) {
      return this.scrollbarRef.current.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CLASS)) === element || this.scrollbarRef.current.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CONTENT_CLASS)) === element;
    };
    _proto.isScrollbar = function isScrollbar(element) {
      return element === this.scrollbarRef.current;
    };
    _proto.setActiveState = function setActiveState() {
      this.setState(function (__state_argument) {
        return {
          active: true
        };
      });
    };
    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState, context) {
      _InfernoComponent.prototype.componentWillUpdate.call(this);
      if (this.props['direction'] !== nextProps['direction'] || this.props['containerSize'] !== nextProps['containerSize'] || this.props['contentSize'] !== nextProps['contentSize'] || this.props['showScrollbar'] !== nextProps['showScrollbar'] || this.props['scrollLocation'] !== nextProps['scrollLocation'] || this.props['maxOffset'] !== nextProps['maxOffset']) {
        this.__getterCache['thumbStyles'] = undefined;
      }
    };
    _proto.render = function render() {
      var props = this.props;
      return viewFunction({
        props: _extends({}, props),
        hovered: this.state.hovered,
        active: this.state.active,
        scrollbarRef: this.scrollbarRef,
        scrollRef: this.scrollRef,
        thumbRef: this.thumbRef,
        dimension: this.dimension,
        isHorizontal: this.isHorizontal,
        scrollSize: this.scrollSize,
        containerToContentRatio: this.containerToContentRatio,
        scrollRatio: this.scrollRatio,
        scrollbarClasses: this.scrollbarClasses,
        thumbStyles: this.thumbStyles,
        thumbTransform: this.thumbTransform,
        thumbClasses: this.thumbClasses,
        hidden: this.hidden,
        isThumbVisible: this.isThumbVisible,
        isExpandable: this.isExpandable,
        isHoverMode: this.isHoverMode,
        isAlwaysMode: this.isAlwaysMode,
        isNeverMode: this.isNeverMode,
        restAttributes: this.restAttributes
      });
    };
    _createClass(Scrollbar, [{
      key: "dimension",
      get: function get() {
        return this.isHorizontal ? 'width' : 'height';
      }
    }, {
      key: "isHorizontal",
      get: function get() {
        return this.props.direction === _consts.DIRECTION_HORIZONTAL;
      }
    }, {
      key: "scrollSize",
      get: function get() {
        return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
      }
    }, {
      key: "containerToContentRatio",
      get: function get() {
        return this.props.contentSize ? this.props.containerSize / this.props.contentSize : this.props.containerSize;
      }
    }, {
      key: "scrollRatio",
      get: function get() {
        var scrollOffsetMax = Math.abs(this.props.maxOffset);
        if (scrollOffsetMax) {
          return (this.props.containerSize - this.scrollSize) / scrollOffsetMax;
        }
        return 1;
      }
    }, {
      key: "scrollbarClasses",
      get: function get() {
        var _classesMap;
        var classesMap = (_classesMap = {}, _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_CLASS, true), _defineProperty(_classesMap, "dx-scrollbar-".concat(this.props.direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, this.state.active), _defineProperty(_classesMap, _consts.HOVER_ENABLED_STATE, this.isExpandable), _defineProperty(_classesMap, 'dx-state-invisible', this.hidden), _defineProperty(_classesMap, 'dx-state-hover', this.isExpandable && this.state.hovered), _classesMap);
        return (0, _combine_classes.combineClasses)(classesMap);
      }
    }, {
      key: "thumbStyles",
      get: function get() {
        var _this6 = this;
        if (this.__getterCache['thumbStyles'] !== undefined) {
          return this.__getterCache['thumbStyles'];
        }
        return this.__getterCache['thumbStyles'] = function () {
          var _ref;
          return _ref = {}, _defineProperty(_ref, _this6.dimension, Math.round(_this6.scrollSize) || THUMB_MIN_SIZE), _defineProperty(_ref, "transform", _this6.isNeverMode ? 'none' : _this6.thumbTransform), _ref;
        }();
      }
    }, {
      key: "thumbTransform",
      get: function get() {
        var translateValue = -this.props.scrollLocation * this.scrollRatio;
        if (this.isHorizontal) {
          return "translate(".concat(translateValue, "px, 0px)");
        }
        return "translate(0px, ".concat(translateValue, "px)");
      }
    }, {
      key: "thumbClasses",
      get: function get() {
        var _combineClasses;
        return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, _consts.SCROLLABLE_SCROLL_CLASS, true), _defineProperty(_combineClasses, 'dx-state-invisible', !this.isThumbVisible), _combineClasses));
      }
    }, {
      key: "hidden",
      get: function get() {
        return this.isNeverMode || this.props.maxOffset === 0 || this.props.containerSize < 15;
      }
    }, {
      key: "isThumbVisible",
      get: function get() {
        if (this.hidden) {
          return false;
        }
        if (this.isHoverMode) {
          return this.props.visible || this.state.hovered || this.state.active;
        }
        if (this.isAlwaysMode) {
          return true;
        }
        return this.props.visible;
      }
    }, {
      key: "isExpandable",
      get: function get() {
        return (this.isHoverMode || this.isAlwaysMode) && this.props.scrollByThumb;
      }
    }, {
      key: "isHoverMode",
      get: function get() {
        return this.props.showScrollbar === _consts.ShowScrollbarMode.HOVER;
      }
    }, {
      key: "isAlwaysMode",
      get: function get() {
        return this.props.showScrollbar === _consts.ShowScrollbarMode.ALWAYS;
      }
    }, {
      key: "isNeverMode",
      get: function get() {
        return this.props.showScrollbar === _consts.ShowScrollbarMode.NEVER;
      }
    }, {
      key: "restAttributes",
      get: function get() {
        var _this$props = this.props,
            bounceEnabled = _this$props.bounceEnabled,
            containerHasSizes = _this$props.containerHasSizes,
            containerSize = _this$props.containerSize,
            contentSize = _this$props.contentSize,
            direction = _this$props.direction,
            maxOffset = _this$props.maxOffset,
            minOffset = _this$props.minOffset,
            scrollByThumb = _this$props.scrollByThumb,
            scrollLocation = _this$props.scrollLocation,
            showScrollbar = _this$props.showScrollbar,
            visible = _this$props.visible,
            restProps = _objectWithoutProperties(_this$props, _excluded);
        return restProps;
      }
    }]);
    return Scrollbar;
  }(_inferno2.InfernoComponent);
  exports.Scrollbar = Scrollbar;
  Scrollbar.defaultProps = ScrollbarPropsType;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["inferno","@devextreme/runtime/inferno","../../../utils/combine_classes","../../../../core/dom_adapter","../common/consts","../../../utils/subscribe_to_event","../common/scrollbar_props","../common/simulated_strategy_props"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("inferno"), require("@devextreme/runtime/inferno"), require("../../../utils/combine_classes"), require("../../../../core/dom_adapter"), require("../common/consts"), require("../../../utils/subscribe_to_event"), require("../common/scrollbar_props"), require("../common/simulated_strategy_props"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollbar.js.map