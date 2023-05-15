!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/text_box/text_box.js"], ["../../core/renderer","../../core/utils/window","../../core/utils/extend","../../core/component_registrator","./ui.text_editor","../../events/utils/index","../../core/utils/size"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/text_box/text_box.js", ["../../core/renderer", "../../core/utils/window", "../../core/utils/extend", "../../core/component_registrator", "./ui.text_editor", "../../events/utils/index", "../../core/utils/size"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _window = $__require("../../core/utils/window");
  var _extend = $__require("../../core/utils/extend");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("./ui.text_editor"));
  var _index = $__require("../../events/utils/index");
  var _size = $__require("../../core/utils/size");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  // STYLE textBox

  var ignoreKeys = ['backspace', 'tab', 'enter', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'rightArrow', 'downArrow', 'upArrow', 'del'];
  var TEXTBOX_CLASS = 'dx-textbox';
  var SEARCHBOX_CLASS = 'dx-searchbox';
  var ICON_CLASS = 'dx-icon';
  var SEARCH_ICON_CLASS = 'dx-icon-search';
  var TextBox = _ui.default.inherit({
    ctor: function ctor(element, options) {
      if (options) {
        this._showClearButton = options.showClearButton;
      }
      this.callBase.apply(this, arguments);
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        value: '',
        mode: 'text',
        maxLength: null
      });
    },
    _initMarkup: function _initMarkup() {
      this.$element().addClass(TEXTBOX_CLASS);
      this.callBase();
      this.setAria('role', 'textbox');
    },
    _renderInputType: function _renderInputType() {
      this.callBase();
      this._renderSearchMode();
    },
    _useTemplates: function _useTemplates() {
      return false;
    },
    _renderProps: function _renderProps() {
      this.callBase();
      this._toggleMaxLengthProp();
    },
    _toggleMaxLengthProp: function _toggleMaxLengthProp() {
      var maxLength = this._getMaxLength();
      if (maxLength && maxLength > 0) {
        this._input().attr('maxLength', maxLength);
      } else {
        this._input().removeAttr('maxLength');
      }
    },
    _renderSearchMode: function _renderSearchMode() {
      var $element = this._$element;
      if (this.option('mode') === 'search') {
        $element.addClass(SEARCHBOX_CLASS);
        this._renderSearchIcon();
        if (this._showClearButton === undefined) {
          this._showClearButton = this.option('showClearButton');
          this.option('showClearButton', true);
        }
      } else {
        $element.removeClass(SEARCHBOX_CLASS);
        this._$searchIcon && this._$searchIcon.remove();
        this.option('showClearButton', this._showClearButton === undefined ? this.option('showClearButton') : this._showClearButton);
        delete this._showClearButton;
      }
    },
    _renderSearchIcon: function _renderSearchIcon() {
      var $searchIcon = (0, _renderer.default)('<div>').addClass(ICON_CLASS).addClass(SEARCH_ICON_CLASS);
      $searchIcon.prependTo(this._input().parent());
      this._$searchIcon = $searchIcon;
    },
    _getLabelContainerWidth: function _getLabelContainerWidth() {
      if (this._$searchIcon) {
        var $inputContainer = this._input().parent();
        return (0, _size.getWidth)($inputContainer) - this._getLabelBeforeWidth();
      }
      return this.callBase();
    },
    _getLabelBeforeWidth: function _getLabelBeforeWidth() {
      var labelBeforeWidth = this.callBase();
      if (this._$searchIcon) {
        labelBeforeWidth += (0, _size.getOuterWidth)(this._$searchIcon);
      }
      return labelBeforeWidth;
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'maxLength':
          this._toggleMaxLengthProp();
          break;
        case 'mode':
          this.callBase(args);
          this._updateLabelWidth();
          break;
        case 'mask':
          this.callBase(args);
          this._toggleMaxLengthProp();
          break;
        default:
          this.callBase(args);
      }
    },
    _onKeyDownCutOffHandler: function _onKeyDownCutOffHandler(e) {
      var actualMaxLength = this._getMaxLength();
      if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
        var $input = (0, _renderer.default)(e.target);
        var key = (0, _index.normalizeKeyName)(e);
        this._cutOffExtraChar($input);
        return $input.val().length < actualMaxLength || ignoreKeys.includes(key) || window.getSelection().toString() !== '';
      } else {
        return true;
      }
    },
    _onChangeCutOffHandler: function _onChangeCutOffHandler(e) {
      var $input = (0, _renderer.default)(e.target);
      if (this.option('maxLength')) {
        this._cutOffExtraChar($input);
      }
    },
    _cutOffExtraChar: function _cutOffExtraChar($input) {
      var actualMaxLength = this._getMaxLength();
      var textInput = $input.val();
      if (actualMaxLength && textInput.length > actualMaxLength) {
        $input.val(textInput.substr(0, actualMaxLength));
      }
    },
    _getMaxLength: function _getMaxLength() {
      var isMaskSpecified = !!this.option('mask');
      return isMaskSpecified ? null : this.option('maxLength');
    }
  });
  (0, _component_registrator.default)('dxTextBox', TextBox);
  var _default = TextBox;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/window","../../core/utils/extend","../../core/component_registrator","./ui.text_editor","../../events/utils/index","../../core/utils/size"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/window"), require("../../core/utils/extend"), require("../../core/component_registrator"), require("./ui.text_editor"), require("../../events/utils/index"), require("../../core/utils/size"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=text_box.js.map