!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/validation_message.js"], ["../core/utils/size","../core/renderer","../core/component_registrator","./overlay/ui.overlay","../core/utils/extend","../core/utils/string","../core/utils/position"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/validation_message.js", ["../core/utils/size", "../core/renderer", "../core/component_registrator", "./overlay/ui.overlay", "../core/utils/extend", "../core/utils/string", "../core/utils/position"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("./overlay/ui.overlay"));
  var _extend = $__require("../core/utils/extend");
  var _string = $__require("../core/utils/string");
  var _position = $__require("../core/utils/position");
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
  var INVALID_MESSAGE = 'dx-invalid-message';
  var INVALID_MESSAGE_AUTO = 'dx-invalid-message-auto';
  var INVALID_MESSAGE_ALWAYS = 'dx-invalid-message-always';
  var INVALID_MESSAGE_CONTENT = 'dx-invalid-message-content';
  var VALIDATION_MESSAGE_MIN_WIDTH = 100;
  var ValidationMessage = _ui.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        integrationOptions: {},
        templatesRenderAsynchronously: false,
        shading: false,
        width: 'auto',
        height: 'auto',
        hideOnOutsideClick: false,
        animation: null,
        visible: true,
        propagateOutsideClick: true,
        _checkParentVisibility: false,
        rtlEnabled: false,
        contentTemplate: this._renderInnerHtml,
        maxWidth: '100%',
        container: this.$element(),
        target: undefined,
        mode: 'auto',
        validationErrors: undefined,
        preventScrollEvents: false,
        positionSide: 'top',
        boundary: undefined,
        offset: {
          h: 0,
          v: 0
        },
        contentId: undefined
      });
    },
    _init: function _init() {
      this.callBase();
      this.updateMaxWidth();
      this._updatePosition();
    },
    _initMarkup: function _initMarkup() {
      this.callBase();
      this._ensureMessageNotEmpty();
      this._updatePositionByTarget();
      this._toggleModeClass();
      this._updateContentId();
    },
    _updatePositionByTarget: function _updatePositionByTarget() {
      var _this$option = this.option(),
          target = _this$option.target;
      this.option('position.of', target);
    },
    _ensureMessageNotEmpty: function _ensureMessageNotEmpty() {
      this._textMarkup = this._getTextMarkup();
      var shouldShowMessage = this.option('visible') && this._textMarkup;
      this._toggleVisibilityClasses(shouldShowMessage);
    },
    _toggleVisibilityClasses: function _toggleVisibilityClasses(visible) {
      if (visible) {
        this.$element().addClass(INVALID_MESSAGE);
        this.$wrapper().addClass(INVALID_MESSAGE);
      } else {
        this.$element().removeClass(INVALID_MESSAGE);
        this.$wrapper().removeClass(INVALID_MESSAGE);
      }
    },
    _updateContentId: function _updateContentId() {
      var _this$option2 = this.option(),
          container = _this$option2.container,
          contentId = _this$option2.contentId;
      var id = contentId !== null && contentId !== void 0 ? contentId : (0, _renderer.default)(container).attr('aria-describedby');
      this.$content().addClass(INVALID_MESSAGE_CONTENT).attr('id', id);
    },
    _renderInnerHtml: function _renderInnerHtml(element) {
      var $element = element && (0, _renderer.default)(element);
      $element === null || $element === void 0 ? void 0 : $element.html(this._textMarkup);
    },
    _getTextMarkup: function _getTextMarkup() {
      var _this$option3;
      var validationErrors = (_this$option3 = this.option('validationErrors')) !== null && _this$option3 !== void 0 ? _this$option3 : [];
      var validationErrorMessage = '';
      validationErrors.forEach(function (err) {
        var _err$message;
        var separator = validationErrorMessage ? '<br />' : '';
        validationErrorMessage += separator + (0, _string.encodeHtml)((_err$message = err === null || err === void 0 ? void 0 : err.message) !== null && _err$message !== void 0 ? _err$message : '');
      });
      return validationErrorMessage;
    },
    _toggleModeClass: function _toggleModeClass() {
      var mode = this.option('mode');
      this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, mode === 'auto').toggleClass(INVALID_MESSAGE_ALWAYS, mode === 'always');
    },
    updateMaxWidth: function updateMaxWidth() {
      var target = this.option('target');
      var targetWidth = (0, _size.getOuterWidth)(target);
      var maxWidth = '100%';
      if (targetWidth) {
        maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH);
      }
      this.option({
        maxWidth: maxWidth
      });
    },
    _getPositionsArray: function _getPositionsArray(positionSide, rtlSide) {
      switch (positionSide) {
        case 'top':
          return ["".concat(rtlSide, " bottom"), "".concat(rtlSide, " top")];
        case 'left':
          return ['right', 'left'];
        case 'right':
          return ['left', 'right'];
        default:
          return ["".concat(rtlSide, " top"), "".concat(rtlSide, " bottom")];
      }
    },
    _updatePosition: function _updatePosition() {
      var _this$option4 = this.option(),
          positionSide = _this$option4.positionSide,
          rtlEnabled = _this$option4.rtlEnabled,
          componentOffset = _this$option4.offset,
          boundary = _this$option4.boundary;
      var rtlSide = (0, _position.getDefaultAlignment)(rtlEnabled);
      var positions = this._getPositionsArray(positionSide, rtlSide);
      var offset = _extends({}, componentOffset);
      this.$element().addClass("dx-invalid-message-".concat(positionSide));
      if (rtlEnabled && positionSide !== 'left' && positionSide !== 'right') offset.h = -offset.h;
      if (positionSide === 'top') offset.v = -offset.v;
      if (positionSide === 'left') offset.h = -offset.h;
      this.option('position', {
        offset: offset,
        boundary: boundary,
        my: positions[0],
        at: positions[1],
        collision: 'none flip'
      });
    },
    _optionChanged: function _optionChanged(args) {
      var name = args.name,
          value = args.value,
          previousValue = args.previousValue;
      switch (name) {
        case 'target':
          this._updatePositionByTarget();
          this.updateMaxWidth();
          this.callBase(args);
          break;
        case 'boundary':
          this.option('position.boundary', value);
          break;
        case 'mode':
          this._toggleModeClass(value);
          break;
        case 'rtlEnabled':
        case 'offset':
        case 'positionSide':
          this.$element().removeClass("dx-invalid-message-".concat(previousValue));
          this._updatePosition();
          break;
        case 'container':
          this._updateContentId();
          this.callBase(args);
          break;
        case 'contentId':
          this._updateContentId();
          break;
        case 'validationErrors':
          this._ensureMessageNotEmpty();
          this._renderInnerHtml(this.$content());
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxValidationMessage', ValidationMessage);
  var _default = ValidationMessage;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/component_registrator","./overlay/ui.overlay","../core/utils/extend","../core/utils/string","../core/utils/position"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/component_registrator"), require("./overlay/ui.overlay"), require("../core/utils/extend"), require("../core/utils/string"), require("../core/utils/position"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validation_message.js.map