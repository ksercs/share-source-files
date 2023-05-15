!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/overlay/overlay_position_controller.js"], ["../../core/renderer","../../core/utils/type","../../core/utils/extend","../../animation/position","../../animation/translator","../../core/utils/window","../widget/swatch_container"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/overlay/overlay_position_controller.js", ["../../core/renderer", "../../core/utils/type", "../../core/utils/extend", "../../animation/position", "../../animation/translator", "../../core/utils/window", "../widget/swatch_container"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.OverlayPositionController = exports.OVERLAY_POSITION_ALIASES = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _position = _interopRequireDefault($__require("../../animation/position"));
  var _translator = $__require("../../animation/translator");
  var _window = $__require("../../core/utils/window");
  var _swatch_container = _interopRequireDefault($__require("../widget/swatch_container"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
  var window = (0, _window.getWindow)();
  var OVERLAY_POSITION_ALIASES = {
    'top': {
      my: 'top center',
      at: 'top center'
    },
    'bottom': {
      my: 'bottom center',
      at: 'bottom center'
    },
    'right': {
      my: 'right center',
      at: 'right center'
    },
    'left': {
      my: 'left center',
      at: 'left center'
    },
    'center': {
      my: 'center',
      at: 'center'
    },
    'right bottom': {
      my: 'right bottom',
      at: 'right bottom'
    },
    'right top': {
      my: 'right top',
      at: 'right top'
    },
    'left bottom': {
      my: 'left bottom',
      at: 'left bottom'
    },
    'left top': {
      my: 'left top',
      at: 'left top'
    }
  };
  exports.OVERLAY_POSITION_ALIASES = OVERLAY_POSITION_ALIASES;
  var OVERLAY_DEFAULT_BOUNDARY_OFFSET = {
    h: 0,
    v: 0
  };
  var OverlayPositionController = /*#__PURE__*/function () {
    function OverlayPositionController(_ref) {
      var position = _ref.position,
          container = _ref.container,
          visualContainer = _ref.visualContainer,
          $root = _ref.$root,
          $content = _ref.$content,
          $wrapper = _ref.$wrapper,
          onPositioned = _ref.onPositioned,
          onVisualPositionChanged = _ref.onVisualPositionChanged,
          restorePosition = _ref.restorePosition,
          _fixWrapperPosition = _ref._fixWrapperPosition;
      this._props = {
        position: position,
        container: container,
        visualContainer: visualContainer,
        restorePosition: restorePosition,
        onPositioned: onPositioned,
        onVisualPositionChanged: onVisualPositionChanged,
        _fixWrapperPosition: _fixWrapperPosition
      };
      this._$root = $root;
      this._$content = $content;
      this._$wrapper = $wrapper;
      this._$markupContainer = undefined;
      this._$visualContainer = undefined;
      this._shouldRenderContentInitialPosition = true;
      this._visualPosition = undefined;
      this._initialPosition = undefined;
      this._previousVisualPosition = undefined;
      this.updateContainer(container);
      this.updatePosition(position);
      this.updateVisualContainer(visualContainer);
    }
    var _proto = OverlayPositionController.prototype;
    _proto.restorePositionOnNextRender = function restorePositionOnNextRender(value) {
      // NOTE: no visual position means it's a first render
      this._shouldRenderContentInitialPosition = value || !this._visualPosition;
    };
    _proto.openingHandled = function openingHandled() {
      var shouldRestorePosition = this._props.restorePosition;
      this.restorePositionOnNextRender(shouldRestorePosition);
    };
    _proto.updatePosition = function updatePosition(positionProp) {
      this._props.position = positionProp;
      this._position = this._normalizePosition(positionProp);
      this.updateVisualContainer();
    };
    _proto.updateContainer = function updateContainer() {
      var containerProp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.container;
      this._props.container = containerProp;
      this._$markupContainer = containerProp ? (0, _renderer.default)(containerProp) : _swatch_container.default.getSwatchContainer(this._$root);
      this.updateVisualContainer(this._props.visualContainer);
    };
    _proto.updateVisualContainer = function updateVisualContainer() {
      var visualContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._props.visualContainer;
      this._props.visualContainer = visualContainer;
      this._$visualContainer = this._getVisualContainer();
    };
    _proto.detectVisualPositionChange = function detectVisualPositionChange(event) {
      this._updateVisualPositionValue();
      this._raisePositionedEvents(event);
    };
    _proto.positionContent = function positionContent() {
      if (this._shouldRenderContentInitialPosition) {
        this._renderContentInitialPosition();
      } else {
        (0, _translator.move)(this._$content, this._visualPosition);
        this.detectVisualPositionChange();
      }
    };
    _proto.positionWrapper = function positionWrapper() {
      if (this._$visualContainer) {
        _position.default.setup(this._$wrapper, {
          my: 'top left',
          at: 'top left',
          of: this._$visualContainer
        });
      }
    };
    _proto.styleWrapperPosition = function styleWrapperPosition() {
      var useFixed = (0, _type.isWindow)(this.$visualContainer.get(0)) || this._props._fixWrapperPosition;
      var positionStyle = useFixed ? 'fixed' : 'absolute';
      this._$wrapper.css('position', positionStyle);
    };
    _proto._updateVisualPositionValue = function _updateVisualPositionValue() {
      this._previousVisualPosition = this._visualPosition;
      this._visualPosition = (0, _translator.locate)(this._$content);
    };
    _proto._renderContentInitialPosition = function _renderContentInitialPosition() {
      this._renderBoundaryOffset();
      (0, _translator.resetPosition)(this._$content);
      var wrapperOverflow = this._$wrapper.css('overflow');
      this._$wrapper.css('overflow', 'hidden');
      var resultPosition = _position.default.setup(this._$content, this._position);
      this._$wrapper.css('overflow', wrapperOverflow);
      this._initialPosition = resultPosition;
      this.detectVisualPositionChange();
    };
    _proto._raisePositionedEvents = function _raisePositionedEvents(event) {
      var previousPosition = this._previousVisualPosition;
      var newPosition = this._visualPosition;
      var isVisualPositionChanged = (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.top) !== newPosition.top || (previousPosition === null || previousPosition === void 0 ? void 0 : previousPosition.left) !== newPosition.left;
      if (isVisualPositionChanged) {
        this._props.onVisualPositionChanged({
          previousPosition: previousPosition,
          position: newPosition,
          event: event
        });
      }
      this._props.onPositioned({
        position: this._initialPosition
      });
    };
    _proto._renderBoundaryOffset = function _renderBoundaryOffset() {
      var _this$_position;
      var boundaryOffset = (_this$_position = this._position) !== null && _this$_position !== void 0 ? _this$_position : {
        boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
      };
      this._$content.css('margin', "".concat(boundaryOffset.v, "px ").concat(boundaryOffset.h, "px"));
    };
    _proto._getVisualContainer = function _getVisualContainer() {
      var _this$_props$position, _this$_props$position2;
      var containerProp = this._props.container;
      var visualContainerProp = this._props.visualContainer;
      var positionOf = (0, _type.isEvent)((_this$_props$position = this._props.position) === null || _this$_props$position === void 0 ? void 0 : _this$_props$position.of) ? this._props.position.of.target : (_this$_props$position2 = this._props.position) === null || _this$_props$position2 === void 0 ? void 0 : _this$_props$position2.of;
      if (visualContainerProp) {
        return (0, _renderer.default)(visualContainerProp);
      }
      if (containerProp) {
        return (0, _renderer.default)(containerProp);
      }
      if (positionOf) {
        return (0, _renderer.default)(positionOf);
      }
      return (0, _renderer.default)(window);
    };
    _proto._normalizePosition = function _normalizePosition(positionProp) {
      var defaultPositionConfig = {
        boundaryOffset: OVERLAY_DEFAULT_BOUNDARY_OFFSET
      };
      if ((0, _type.isDefined)(positionProp)) {
        return (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
      } else {
        return defaultPositionConfig;
      }
    };
    _proto._positionToObject = function _positionToObject(position) {
      if ((0, _type.isString)(position)) {
        return (0, _extend.extend)({}, OVERLAY_POSITION_ALIASES[position]);
      }
      return position;
    };
    _createClass(OverlayPositionController, [{
      key: "$container",
      get: function get() {
        this.updateContainer(); // NOTE: swatch classes can be updated runtime

        return this._$markupContainer;
      }
    }, {
      key: "$visualContainer",
      get: function get() {
        return this._$visualContainer;
      }
    }, {
      key: "position",
      get: function get() {
        return this._position;
      }
    }, {
      key: "fixWrapperPosition",
      set: function set(fixWrapperPosition) {
        this._props._fixWrapperPosition = fixWrapperPosition;
        this.styleWrapperPosition();
      }
    }, {
      key: "restorePosition",
      set: function set(restorePosition) {
        this._props.restorePosition = restorePosition;
      }
    }]);
    return OverlayPositionController;
  }();
  exports.OverlayPositionController = OverlayPositionController;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/type","../../core/utils/extend","../../animation/position","../../animation/translator","../../core/utils/window","../widget/swatch_container"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../animation/position"), require("../../animation/translator"), require("../../core/utils/window"), require("../widget/swatch_container"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=overlay_position_controller.js.map