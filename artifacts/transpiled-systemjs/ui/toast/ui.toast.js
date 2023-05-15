!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/toast/ui.toast.js"], ["../../core/renderer","../../core/utils/window","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/ready_callbacks","../../core/utils/type","../../core/utils/extend","../../events/pointer","../../core/component_registrator","../overlay/ui.overlay","../themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/toast/ui.toast.js", ["../../core/renderer", "../../core/utils/window", "../../core/dom_adapter", "../../events/core/events_engine", "../../core/utils/ready_callbacks", "../../core/utils/type", "../../core/utils/extend", "../../events/pointer", "../../core/component_registrator", "../overlay/ui.overlay", "../themes"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _ready_callbacks = _interopRequireDefault($__require("../../core/utils/ready_callbacks"));
  var _type = $__require("../../core/utils/type");
  var _extend = $__require("../../core/utils/extend");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("../overlay/ui.overlay"));
  var _themes = $__require("../themes");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var ready = _ready_callbacks.default.add;

  // STYLE toast

  var TOAST_CLASS = 'dx-toast';
  var TOAST_CLASS_PREFIX = TOAST_CLASS + '-';
  var TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + 'wrapper';
  var TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + 'content';
  var TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + 'message';
  var TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + 'icon';
  var WIDGET_NAME = 'dxToast';
  var toastTypes = ['info', 'warning', 'error', 'success'];
  var TOAST_STACK = [];
  var FIRST_Z_INDEX_OFFSET = 8000;
  var POSITION_ALIASES = {
    'top': {
      my: 'top',
      at: 'top',
      of: null,
      offset: '0 0'
    },
    'bottom': {
      my: 'bottom',
      at: 'bottom',
      of: null,
      offset: '0 -20'
    },
    'center': {
      my: 'center',
      at: 'center',
      of: null,
      offset: '0 0'
    },
    'right': {
      my: 'center right',
      at: 'center right',
      of: null,
      offset: '0 0'
    },
    'left': {
      my: 'center left',
      at: 'center left',
      of: null,
      offset: '0 0'
    }
  };
  var DEFAULT_BOUNDARY_OFFSET = {
    h: 0,
    v: 0
  };
  ready(function () {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, function (e) {
      for (var i = TOAST_STACK.length - 1; i >= 0; i--) {
        if (!TOAST_STACK[i]._proxiedDocumentDownHandler(e)) {
          return;
        }
      }
    });
  });
  var Toast = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        message: '',
        type: 'info',
        displayTime: 2000,
        position: 'bottom center',
        animation: {
          show: {
            type: 'fade',
            duration: 400,
            from: 0,
            to: 1
          },
          hide: {
            type: 'fade',
            duration: 400,
            from: 1,
            to: 0
          }
        },
        shading: false,
        /**
        * @name dxToastOptions.disabled
        * @hidden
        */

        height: 'auto',
        hideTopOverlayHandler: null,
        preventScrollEvents: false,
        closeOnSwipe: true,
        closeOnClick: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: {
          platform: 'android'
        },
        options: {
          hideOnOutsideClick: true,
          width: 'auto',
          position: {
            at: 'bottom left',
            my: 'bottom left',
            offset: '20 -20'
          },
          animation: {
            show: {
              type: 'slide',
              duration: 200,
              from: {
                position: {
                  my: 'top',
                  at: 'bottom',
                  of: window
                }
              }
            },
            hide: {
              type: 'slide',
              duration: 200,
              to: {
                position: {
                  my: 'top',
                  at: 'bottom',
                  of: window
                }
              }
            }
          }
        }
      }, {
        device: function device(_device) {
          var isPhone = _device.deviceType === 'phone';
          var isAndroid = _device.platform === 'android';
          return isPhone && isAndroid;
        },
        options: {
          width: '100vw',
          position: {
            at: 'bottom center',
            my: 'bottom center',
            offset: '0 0'
          }
        }
      }, {
        device: function device(_device2) {
          return _device2.deviceType === 'phone';
        },
        options: {
          width: '100vw'
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)();
        },
        options: {
          minWidth: 344,
          maxWidth: 568,
          displayTime: 4000
        }
      }]);
    },
    _init: function _init() {
      this.callBase();
      this._posStringToObject();
    },
    _renderContentImpl: function _renderContentImpl() {
      if (this.option('message')) {
        this._message = (0, _renderer.default)('<div>').addClass(TOAST_MESSAGE_CLASS).text(this.option('message')).appendTo(this.$content());
      }
      this.setAria('role', 'alert', this._message);
      if (toastTypes.includes(this.option('type').toLowerCase())) {
        this.$content().prepend((0, _renderer.default)('<div>').addClass(TOAST_ICON_CLASS));
      }
      this.callBase();
    },
    _render: function _render() {
      this.callBase();
      this.$element().addClass(TOAST_CLASS);
      this.$wrapper().addClass(TOAST_WRAPPER_CLASS);
      this.$content().addClass(TOAST_CLASS_PREFIX + String(this.option('type')).toLowerCase());
      this.$content().addClass(TOAST_CONTENT_CLASS);
      this._toggleCloseEvents('Swipe');
      this._toggleCloseEvents('Click');
    },
    _toggleCloseEvents: function _toggleCloseEvents(event) {
      var dxEvent = 'dx' + event.toLowerCase();
      _events_engine.default.off(this.$content(), dxEvent);
      this.option('closeOn' + event) && _events_engine.default.on(this.$content(), dxEvent, this.hide.bind(this));
    },
    _posStringToObject: function _posStringToObject() {
      if (!(0, _type.isString)(this.option('position'))) return;
      var verticalPosition = this.option('position').split(' ')[0];
      var horizontalPosition = this.option('position').split(' ')[1];
      this.option('position', (0, _extend.extend)({
        boundaryOffset: DEFAULT_BOUNDARY_OFFSET
      }, POSITION_ALIASES[verticalPosition]));
      switch (horizontalPosition) {
        case 'center':
        case 'left':
        case 'right':
          this.option('position').at += ' ' + horizontalPosition;
          this.option('position').my += ' ' + horizontalPosition;
          break;
      }
    },
    _show: function _show() {
      return this.callBase.apply(this, arguments).always(function () {
        clearTimeout(this._hideTimeout);
        this._hideTimeout = setTimeout(this.hide.bind(this), this.option('displayTime'));
      }.bind(this));
    },
    _overlayStack: function _overlayStack() {
      return TOAST_STACK;
    },
    _zIndexInitValue: function _zIndexInitValue() {
      return this.callBase() + FIRST_Z_INDEX_OFFSET;
    },
    _dispose: function _dispose() {
      clearTimeout(this._hideTimeout);
      this.callBase();
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'type':
          this.$content().removeClass(TOAST_CLASS_PREFIX + args.previousValue);
          this.$content().addClass(TOAST_CLASS_PREFIX + String(args.value).toLowerCase());
          break;
        case 'message':
          if (this._message) {
            this._message.text(args.value);
          }
          break;
        case 'closeOnSwipe':
          this._toggleCloseEvents('Swipe');
          break;
        case 'closeOnClick':
          this._toggleCloseEvents('Click');
          break;
        case 'displayTime':
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)(WIDGET_NAME, Toast);
  var _default = Toast;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/window","../../core/dom_adapter","../../events/core/events_engine","../../core/utils/ready_callbacks","../../core/utils/type","../../core/utils/extend","../../events/pointer","../../core/component_registrator","../overlay/ui.overlay","../themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/window"), require("../../core/dom_adapter"), require("../../events/core/events_engine"), require("../../core/utils/ready_callbacks"), require("../../core/utils/type"), require("../../core/utils/extend"), require("../../events/pointer"), require("../../core/component_registrator"), require("../overlay/ui.overlay"), require("../themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.toast.js.map