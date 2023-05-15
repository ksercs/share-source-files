!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/popover/popover_position_controller.js"], ["../../core/utils/type","../../core/utils/extend","../../animation/position","../../core/utils/common","../../renovation/ui/resizable/utils","../../core/utils/size","../overlay/overlay_position_controller"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/popover/popover_position_controller.js", ["../../core/utils/type", "../../core/utils/extend", "../../animation/position", "../../core/utils/common", "../../renovation/ui/resizable/utils", "../../core/utils/size", "../overlay/overlay_position_controller"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = void 0;
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _position = _interopRequireDefault($__require("../../animation/position"));
  var _common = $__require("../../core/utils/common");
  var _utils = $__require("../../renovation/ui/resizable/utils");
  var _size = $__require("../../core/utils/size");
  var _overlay_position_controller = $__require("../overlay/overlay_position_controller");
  var _excluded = ["shading", "target", "$arrow"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var WEIGHT_OF_SIDES = {
    'left': -1,
    'top': -1,
    'center': 0,
    'right': 1,
    'bottom': 1
  };
  var POPOVER_POSITION_ALIASES = {
    // NOTE: public API
    'top': {
      my: 'bottom center',
      at: 'top center',
      collision: 'fit flip'
    },
    'bottom': {
      my: 'top center',
      at: 'bottom center',
      collision: 'fit flip'
    },
    'right': {
      my: 'left center',
      at: 'right center',
      collision: 'flip fit'
    },
    'left': {
      my: 'right center',
      at: 'left center',
      collision: 'flip fit'
    }
  };
  exports.POPOVER_POSITION_ALIASES = POPOVER_POSITION_ALIASES;
  var POPOVER_DEFAULT_BOUNDARY_OFFSET = {
    h: 10,
    v: 10
  };
  var PopoverPositionController = /*#__PURE__*/function (_OverlayPositionContr) {
    _inheritsLoose(PopoverPositionController, _OverlayPositionContr);
    function PopoverPositionController(_ref) {
      var _this;
      var shading = _ref.shading,
          target = _ref.target,
          $arrow = _ref.$arrow,
          args = _objectWithoutProperties(_ref, _excluded);
      _this = _OverlayPositionContr.call(this, args) || this;
      _this._props = _extends({}, _this._props, {
        shading: shading,
        target: target
      });
      _this._$arrow = $arrow;
      _this._positionSide = undefined;
      _this.updatePosition(_this._props.position);
      return _this;
    }
    var _proto = PopoverPositionController.prototype;
    _proto.positionWrapper = function positionWrapper() {
      if (this._props.shading) {
        this._$wrapper.css({
          top: 0,
          left: 0
        });
      }
    };
    _proto.updateTarget = function updateTarget(target) {
      this._props.target = target;
      this.updatePosition(this._props.position);
    };
    _proto._renderBoundaryOffset = function _renderBoundaryOffset() {};
    _proto._getContainerPosition = function _getContainerPosition() {
      var offset = (0, _common.pairToObject)(this._position.offset || '');
      var hOffset = offset.h,
          vOffset = offset.v;
      var isVerticalSide = this._isVerticalSide();
      var isHorizontalSide = this._isHorizontalSide();
      if (isVerticalSide || isHorizontalSide) {
        var isPopoverInside = this._isPopoverInside();
        var sign = (isPopoverInside ? -1 : 1) * WEIGHT_OF_SIDES[this._positionSide];
        var arrowSize = isVerticalSide ? (0, _size.getHeight)(this._$arrow) : (0, _size.getWidth)(this._$arrow);
        var arrowSizeCorrection = this._getContentBorderWidth(this._positionSide);
        var arrowOffset = sign * (arrowSize - arrowSizeCorrection);
        isVerticalSide ? vOffset += arrowOffset : hOffset += arrowOffset;
      }
      return (0, _extend.extend)({}, this._position, {
        offset: hOffset + ' ' + vOffset
      });
    };
    _proto._getContentBorderWidth = function _getContentBorderWidth(side) {
      var borderWidth = this._$content.css(_utils.borderWidthStyles[side]);
      return parseInt(borderWidth) || 0;
    };
    _proto._isPopoverInside = function _isPopoverInside() {
      var my = _position.default.setup.normalizeAlign(this._position.my);
      var at = _position.default.setup.normalizeAlign(this._position.at);
      return my.h === at.h && my.v === at.v;
    };
    _proto._isVerticalSide = function _isVerticalSide() {
      var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
      return side === 'top' || side === 'bottom';
    };
    _proto._isHorizontalSide = function _isHorizontalSide() {
      var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._positionSide;
      return side === 'left' || side === 'right';
    };
    _proto._getDisplaySide = function _getDisplaySide(position) {
      var my = _position.default.setup.normalizeAlign(position.my);
      var at = _position.default.setup.normalizeAlign(position.at);
      var weightSign = WEIGHT_OF_SIDES[my.h] === WEIGHT_OF_SIDES[at.h] && WEIGHT_OF_SIDES[my.v] === WEIGHT_OF_SIDES[at.v] ? -1 : 1;
      var horizontalWeight = Math.abs(WEIGHT_OF_SIDES[my.h] - weightSign * WEIGHT_OF_SIDES[at.h]);
      var verticalWeight = Math.abs(WEIGHT_OF_SIDES[my.v] - weightSign * WEIGHT_OF_SIDES[at.v]);
      return horizontalWeight > verticalWeight ? at.h : at.v;
    };
    _proto._normalizePosition = function _normalizePosition(positionProp) {
      var defaultPositionConfig = {
        of: this._props.target,
        boundaryOffset: POPOVER_DEFAULT_BOUNDARY_OFFSET
      };
      var resultPosition;
      if ((0, _type.isDefined)(positionProp)) {
        resultPosition = (0, _extend.extend)(true, {}, defaultPositionConfig, this._positionToObject(positionProp));
      } else {
        resultPosition = defaultPositionConfig;
      }
      this._positionSide = this._getDisplaySide(resultPosition);
      return resultPosition;
    };
    _proto._positionToObject = function _positionToObject(positionProp) {
      if ((0, _type.isString)(positionProp)) {
        return (0, _extend.extend)({}, POPOVER_POSITION_ALIASES[positionProp]);
      }
      return positionProp;
    };
    return PopoverPositionController;
  }(_overlay_position_controller.OverlayPositionController);
  exports.PopoverPositionController = PopoverPositionController;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","../../core/utils/extend","../../animation/position","../../core/utils/common","../../renovation/ui/resizable/utils","../../core/utils/size","../overlay/overlay_position_controller"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("../../core/utils/extend"), require("../../animation/position"), require("../../core/utils/common"), require("../../renovation/ui/resizable/utils"), require("../../core/utils/size"), require("../overlay/overlay_position_controller"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=popover_position_controller.js.map