!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/speed_dial_action/speed_dial_item.js"], ["../../core/renderer","../../core/utils/extend","../../events/core/events_engine","../../events/utils/index","../../events/click","../../core/utils/icon","../overlay/ui.overlay","../widget/utils.ink_ripple","../themes","../../core/utils/type","../../core/utils/window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/speed_dial_action/speed_dial_item.js", ["../../core/renderer", "../../core/utils/extend", "../../events/core/events_engine", "../../events/utils/index", "../../events/click", "../../core/utils/icon", "../overlay/ui.overlay", "../widget/utils.ink_ripple", "../themes", "../../core/utils/type", "../../core/utils/window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _click = $__require("../../events/click");
  var _icon = $__require("../../core/utils/icon");
  var _ui = _interopRequireDefault($__require("../overlay/ui.overlay"));
  var _utils = $__require("../widget/utils.ink_ripple");
  var _themes = $__require("../themes");
  var _type = $__require("../../core/utils/type");
  var _window = $__require("../../core/utils/window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var FAB_CLASS = 'dx-fa-button';
  var FAB_ICON_CLASS = 'dx-fa-button-icon';
  var FAB_LABEL_CLASS = 'dx-fa-button-label';
  var FAB_LABEL_WRAPPER_CLASS = 'dx-fa-button-label-wrapper';
  var FAB_CONTENT_REVERSE_CLASS = 'dx-fa-button-content-reverse';
  var OVERLAY_CONTENT_SELECTOR = '.dx-overlay-content';
  var SpeedDialItem = /*#__PURE__*/function (_Overlay) {
    _inheritsLoose(SpeedDialItem, _Overlay);
    function SpeedDialItem() {
      return _Overlay.apply(this, arguments) || this;
    }
    var _proto = SpeedDialItem.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Overlay.prototype._getDefaultOptions.call(this), {
        shading: false,
        useInkRipple: false,
        callOverlayRenderShading: false,
        width: 'auto',
        zIndex: 1500,
        _observeContentResize: false,
        container: this.$element(),
        visualContainer: (0, _window.getWindow)()
      });
    };
    _proto._defaultOptionsRules = function _defaultOptionsRules() {
      return _Overlay.prototype._defaultOptionsRules.call(this).concat([{
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          useInkRipple: true
        }
      }]);
    };
    _proto._render = function _render() {
      this.$element().addClass(FAB_CLASS);
      this._renderIcon();
      this._renderLabel();
      _Overlay.prototype._render.call(this);
      this.option('useInkRipple') && this._renderInkRipple();
      this._renderClick();
    };
    _proto._renderLabel = function _renderLabel() {
      !!this._$label && this._$label.remove();
      var labelText = this.option('label');
      if (!labelText) {
        this._$label = null;
        return;
      }
      var $element = (0, _renderer.default)('<div>').addClass(FAB_LABEL_CLASS);
      var $wrapper = (0, _renderer.default)('<div>').addClass(FAB_LABEL_WRAPPER_CLASS);
      this._$label = $wrapper.prependTo(this.$content()).append($element.text(labelText));
      this.$content().toggleClass(FAB_CONTENT_REVERSE_CLASS, this._isPositionLeft(this.option('parentPosition')));
    };
    _proto._isPositionLeft = function _isPositionLeft(position) {
      var currentLocation = '';
      if (position) {
        if ((0, _type.isPlainObject)(position) && position.at) {
          if (position.at.x) {
            currentLocation = position.at.x;
          } else {
            currentLocation = position.at;
          }
        } else {
          if (typeof position === 'string') {
            currentLocation = position;
          }
        }
      }
      return currentLocation.split(' ')[0] === 'left';
    };
    _proto._renderButtonIcon = function _renderButtonIcon($element, icon, iconClass) {
      !!$element && $element.remove();
      $element = (0, _renderer.default)('<div>').addClass(iconClass);
      var $iconElement = (0, _icon.getImageContainer)(icon);
      $element.append($iconElement).appendTo(this.$content());
      return $element;
    };
    _proto._renderIcon = function _renderIcon() {
      this._$icon = this._renderButtonIcon(this._$icon, this._options.silent('icon'), FAB_ICON_CLASS);
    };
    _proto._renderWrapper = function _renderWrapper() {
      if (this._options.silent('callOverlayRenderShading')) {
        _Overlay.prototype._renderWrapper.call(this);
      }
    };
    _proto._getVisibleActions = function _getVisibleActions(actions) {
      var currentActions = actions || this.option('actions') || [];
      return currentActions.filter(function (action) {
        return action.option('visible');
      });
    };
    _proto._getActionComponent = function _getActionComponent() {
      if (this._getVisibleActions().length === 1) {
        return this._getVisibleActions()[0];
      } else {
        return this.option('actionComponent') || this.option('actions')[0];
      }
    };
    _proto._initContentReadyAction = function _initContentReadyAction() {
      this._contentReadyAction = this._getActionComponent()._createActionByOption('onContentReady', {
        excludeValidators: ['disabled', 'readOnly']
      }, true);
    };
    _proto._fireContentReadyAction = function _fireContentReadyAction() {
      this._contentReadyAction({
        actionElement: this.$element()
      });
    };
    _proto._updateZIndexStackPosition = function _updateZIndexStackPosition() {
      var zIndex = this.option('zIndex');
      this._$wrapper.css('zIndex', zIndex);
      this._$content.css('zIndex', zIndex);
    };
    _proto._setClickAction = function _setClickAction() {
      var _this = this;
      var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
      var overlayContent = this.$element().find(OVERLAY_CONTENT_SELECTOR);
      _events_engine.default.off(overlayContent, eventName);
      _events_engine.default.on(overlayContent, eventName, function (e) {
        var clickActionArgs = {
          event: e,
          actionElement: _this.element(),
          element: _this._getActionComponent().$element()
        };
        _this._clickAction(clickActionArgs);
      });
    };
    _proto._defaultActionArgs = function _defaultActionArgs() {
      return {
        component: this._getActionComponent()
      };
    };
    _proto._renderClick = function _renderClick() {
      this._clickAction = this._getActionComponent()._createActionByOption('onClick');
      this._setClickAction();
    };
    _proto._renderInkRipple = function _renderInkRipple() {
      this._inkRipple = (0, _utils.render)();
    };
    _proto._getInkRippleContainer = function _getInkRippleContainer() {
      return this._$icon;
    };
    _proto._toggleActiveState = function _toggleActiveState($element, value, e) {
      _Overlay.prototype._toggleActiveState.apply(this, arguments);
      if (!this._inkRipple) {
        return;
      }
      var config = {
        element: this._getInkRippleContainer(),
        event: e
      };
      if (value) {
        this._inkRipple.showWave(config);
      } else {
        this._inkRipple.hideWave(config);
      }
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'icon':
          this._renderIcon();
          break;
        case 'onClick':
          this._renderClick();
          break;
        case 'label':
          this._renderLabel();
          break;
        case 'visible':
          this._currentVisible = args.previousValue;
          args.value ? this._show() : this._hide();
          break;
        case 'useInkRipple':
          this._render();
          break;
        default:
          _Overlay.prototype._optionChanged.call(this, args);
      }
    };
    return SpeedDialItem;
  }(_ui.default);
  var _default = SpeedDialItem;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../events/core/events_engine","../../events/utils/index","../../events/click","../../core/utils/icon","../overlay/ui.overlay","../widget/utils.ink_ripple","../themes","../../core/utils/type","../../core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../events/click"), require("../../core/utils/icon"), require("../overlay/ui.overlay"), require("../widget/utils.ink_ripple"), require("../themes"), require("../../core/utils/type"), require("../../core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=speed_dial_item.js.map