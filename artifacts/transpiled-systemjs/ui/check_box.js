!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/check_box.js"], ["../core/renderer","../events/core/events_engine","../core/devices","../core/utils/extend","./editor/editor","../core/component_registrator","../events/utils/index","../events/click"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/check_box.js", ["../core/renderer", "../events/core/events_engine", "../core/devices", "../core/utils/extend", "./editor/editor", "../core/component_registrator", "../events/utils/index", "../events/click"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _extend = $__require("../core/utils/extend");
  var _editor = _interopRequireDefault($__require("./editor/editor"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _index = $__require("../events/utils/index");
  var _click = $__require("../events/click");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // STYLE checkbox

  var CHECKBOX_CLASS = 'dx-checkbox';
  var CHECKBOX_ICON_CLASS = 'dx-checkbox-icon';
  var CHECKBOX_CHECKED_CLASS = 'dx-checkbox-checked';
  var CHECKBOX_CONTAINER_CLASS = 'dx-checkbox-container';
  var CHECKBOX_TEXT_CLASS = 'dx-checkbox-text';
  var CHECKBOX_HAS_TEXT_CLASS = 'dx-checkbox-has-text';
  var CHECKBOX_INDETERMINATE_CLASS = 'dx-checkbox-indeterminate';
  var CHECKBOX_FEEDBACK_HIDE_TIMEOUT = 100;
  var CheckBox = _editor.default.inherit({
    _supportedKeys: function _supportedKeys() {
      var click = function click(e) {
        e.preventDefault();
        this._clickAction({
          event: e
        });
      };
      return (0, _extend.extend)(this.callBase(), {
        space: click
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        hoverStateEnabled: true,
        activeStateEnabled: true,
        value: false,
        text: ''
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }]);
    },
    _canValueBeChangedByClick: function _canValueBeChangedByClick() {
      return true;
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _feedbackHideTimeout: CHECKBOX_FEEDBACK_HIDE_TIMEOUT,
    _initMarkup: function _initMarkup() {
      this._renderSubmitElement();
      this._$container = (0, _renderer.default)('<div>').addClass(CHECKBOX_CONTAINER_CLASS);
      this.setAria('role', 'checkbox');
      this.$element().addClass(CHECKBOX_CLASS);
      this._renderValue();
      this._renderIcon();
      this._renderText();
      this.$element().append(this._$container);
      this.callBase();
    },
    _render: function _render() {
      this._renderClick();
      this.callBase();
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this.$element());
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _renderIcon: function _renderIcon() {
      this._$icon = (0, _renderer.default)('<span>').addClass(CHECKBOX_ICON_CLASS).prependTo(this._$container);
    },
    _renderText: function _renderText() {
      var textValue = this.option('text');
      if (!textValue) {
        if (this._$text) {
          this._$text.remove();
          this.$element().removeClass(CHECKBOX_HAS_TEXT_CLASS);
        }
        return;
      }
      if (!this._$text) {
        this._$text = (0, _renderer.default)('<span>').addClass(CHECKBOX_TEXT_CLASS);
      }
      this._$text.text(textValue);
      this._$container.append(this._$text);
      this.$element().addClass(CHECKBOX_HAS_TEXT_CLASS);
    },
    _renderClick: function _renderClick() {
      var that = this;
      var eventName = (0, _index.addNamespace)(_click.name, that.NAME);
      that._clickAction = that._createAction(that._clickHandler);
      _events_engine.default.off(that.$element(), eventName);
      _events_engine.default.on(that.$element(), eventName, function (e) {
        that._clickAction({
          event: e
        });
      });
    },
    _clickHandler: function _clickHandler(args) {
      var that = args.component;
      that._saveValueChangeEvent(args.event);
      that.option('value', !that.option('value'));
    },
    _renderValue: function _renderValue() {
      var $element = this.$element();
      var checked = this.option('value');
      var indeterminate = checked === undefined;
      $element.toggleClass(CHECKBOX_CHECKED_CLASS, Boolean(checked));
      $element.toggleClass(CHECKBOX_INDETERMINATE_CLASS, indeterminate);
      this._getSubmitElement().val(checked);
      this.setAria('checked', indeterminate ? 'mixed' : checked || 'false');
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'value':
          this._renderValue();
          this.callBase(args);
          break;
        case 'text':
          this._renderText();
          this._renderDimensions();
          break;
        default:
          this.callBase(args);
      }
    }
  });
  (0, _component_registrator.default)('dxCheckBox', CheckBox);
  var _default = CheckBox;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../events/core/events_engine","../core/devices","../core/utils/extend","./editor/editor","../core/component_registrator","../events/utils/index","../events/click"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../events/core/events_engine"), require("../core/devices"), require("../core/utils/extend"), require("./editor/editor"), require("../core/component_registrator"), require("../events/utils/index"), require("../events/click"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=check_box.js.map