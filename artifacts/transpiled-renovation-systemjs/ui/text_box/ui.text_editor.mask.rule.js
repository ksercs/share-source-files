!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/text_box/ui.text_editor.mask.rule.js"], ["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/text_box/ui.text_editor.mask.rule.js", ["../../core/class", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.StubMaskRule = exports.MaskRule = exports.EmptyMaskRule = void 0;
  var _class = _interopRequireDefault($__require("../../core/class"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _common = $__require("../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var EMPTY_CHAR = ' ';
  var BaseMaskRule = _class.default.inherit({
    ctor: function ctor(config) {
      this._value = EMPTY_CHAR;
      (0, _extend.extend)(this, config);
    },
    next: function next(rule) {
      if (!arguments.length) {
        return this._next;
      }
      this._next = rule;
    },
    text: _common.noop,
    value: _common.noop,
    rawValue: _common.noop,
    handle: _common.noop,
    _prepareHandlingArgs: function _prepareHandlingArgs(args, config) {
      var _config$str, _config$start, _config$length;
      config = config || {};
      var handlingProperty = Object.prototype.hasOwnProperty.call(args, 'value') ? 'value' : 'text';
      args[handlingProperty] = (_config$str = config.str) !== null && _config$str !== void 0 ? _config$str : args[handlingProperty];
      args.start = (_config$start = config.start) !== null && _config$start !== void 0 ? _config$start : args.start;
      args.length = (_config$length = config.length) !== null && _config$length !== void 0 ? _config$length : args.length;
      args.index = args.index + 1;
      return args;
    },
    reset: _common.noop,
    clear: _common.noop,
    first: function first(index) {
      index = index || 0;
      return this.next().first(index + 1);
    },
    isAccepted: function isAccepted() {
      return false;
    },
    adjustedCaret: function adjustedCaret(caret, isForwardDirection, char) {
      return isForwardDirection ? this._adjustedForward(caret, 0, char) : this._adjustedBackward(caret, 0, char);
    },
    _adjustedForward: _common.noop,
    _adjustedBackward: _common.noop,
    isValid: _common.noop
  });
  var EmptyMaskRule = BaseMaskRule.inherit({
    next: _common.noop,
    handle: function handle() {
      return 0;
    },
    text: function text() {
      return '';
    },
    value: function value() {
      return '';
    },
    first: function first() {
      return 0;
    },
    rawValue: function rawValue() {
      return '';
    },
    adjustedCaret: function adjustedCaret() {
      return 0;
    },
    isValid: function isValid() {
      return true;
    }
  });
  exports.EmptyMaskRule = EmptyMaskRule;
  var MaskRule = BaseMaskRule.inherit({
    text: function text() {
      return (this._value !== EMPTY_CHAR ? this._value : this.maskChar) + this.next().text();
    },
    value: function value() {
      return this._value + this.next().value();
    },
    rawValue: function rawValue() {
      return this._value + this.next().rawValue();
    },
    handle: function handle(args) {
      var str = Object.prototype.hasOwnProperty.call(args, 'value') ? args.value : args.text;
      if (!str || !str.length || !args.length) {
        return 0;
      }
      if (args.start) {
        return this.next().handle(this._prepareHandlingArgs(args, {
          start: args.start - 1
        }));
      }
      var char = str[0];
      var rest = str.substring(1);
      this._tryAcceptChar(char, args);
      return this._accepted() ? this.next().handle(this._prepareHandlingArgs(args, {
        str: rest,
        length: args.length - 1
      })) + 1 : this.handle(this._prepareHandlingArgs(args, {
        str: rest,
        length: args.length - 1
      }));
    },
    clear: function clear(args) {
      this._tryAcceptChar(EMPTY_CHAR, args);
      this.next().clear(this._prepareHandlingArgs(args));
    },
    reset: function reset() {
      this._accepted(false);
      this.next().reset();
    },
    _tryAcceptChar: function _tryAcceptChar(char, args) {
      this._accepted(false);
      if (!this._isAllowed(char, args)) {
        return;
      }
      var acceptedChar = char === EMPTY_CHAR ? this.maskChar : char;
      args.fullText = args.fullText.substring(0, args.index) + acceptedChar + args.fullText.substring(args.index + 1);
      this._accepted(true);
      this._value = char;
    },
    _accepted: function _accepted(value) {
      if (!arguments.length) {
        return !!this._isAccepted;
      }
      this._isAccepted = !!value;
    },
    first: function first(index) {
      return this._value === EMPTY_CHAR ? index || 0 : this.callBase(index);
    },
    _isAllowed: function _isAllowed(char, args) {
      if (char === EMPTY_CHAR) {
        return true;
      }
      return this._isValid(char, args);
    },
    _isValid: function _isValid(char, args) {
      var allowedChars = this.allowedChars;
      if (allowedChars instanceof RegExp) {
        return allowedChars.test(char);
      }
      if ((0, _type.isFunction)(allowedChars)) {
        return allowedChars(char, args.index, args.fullText);
      }
      if (Array.isArray(allowedChars)) {
        return allowedChars.includes(char);
      }
      return allowedChars === char;
    },
    isAccepted: function isAccepted(caret) {
      return caret === 0 ? this._accepted() : this.next().isAccepted(caret - 1);
    },
    _adjustedForward: function _adjustedForward(caret, index, char) {
      if (index >= caret) {
        return index;
      }
      return this.next()._adjustedForward(caret, index + 1, char) || index + 1;
    },
    _adjustedBackward: function _adjustedBackward(caret, index) {
      if (index >= caret - 1) {
        return caret;
      }
      return this.next()._adjustedBackward(caret, index + 1) || index + 1;
    },
    isValid: function isValid(args) {
      return this._isValid(this._value, args) && this.next().isValid(this._prepareHandlingArgs(args));
    }
  });
  exports.MaskRule = MaskRule;
  var StubMaskRule = MaskRule.inherit({
    value: function value() {
      return this.next().value();
    },
    handle: function handle(args) {
      var hasValueProperty = Object.prototype.hasOwnProperty.call(args, 'value');
      var str = hasValueProperty ? args.value : args.text;
      if (!str.length || !args.length) {
        return 0;
      }
      if (args.start || hasValueProperty) {
        return this.next().handle(this._prepareHandlingArgs(args, {
          start: args.start && args.start - 1
        }));
      }
      var char = str[0];
      var rest = str.substring(1);
      this._tryAcceptChar(char);
      var nextArgs = this._isAllowed(char) ? this._prepareHandlingArgs(args, {
        str: rest,
        length: args.length - 1
      }) : args;
      return this.next().handle(nextArgs) + 1;
    },
    clear: function clear(args) {
      this._accepted(false);
      this.next().clear(this._prepareHandlingArgs(args));
    },
    _tryAcceptChar: function _tryAcceptChar(char) {
      this._accepted(this._isValid(char));
    },
    _isValid: function _isValid(char) {
      return char === this.maskChar;
    },
    first: function first(index) {
      index = index || 0;
      return this.next().first(index + 1);
    },
    _adjustedForward: function _adjustedForward(caret, index, char) {
      if (index >= caret && char === this.maskChar) {
        return index;
      }
      if (caret === index + 1 && this._accepted()) {
        return caret;
      }
      return this.next()._adjustedForward(caret, index + 1, char);
    },
    _adjustedBackward: function _adjustedBackward(caret, index) {
      if (index >= caret - 1) {
        return 0;
      }
      return this.next()._adjustedBackward(caret, index + 1);
    },
    isValid: function isValid(args) {
      return this.next().isValid(this._prepareHandlingArgs(args));
    }
  });
  exports.StubMaskRule = StubMaskRule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/class","../../core/utils/extend","../../core/utils/type","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/class"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.text_editor.mask.rule.js.map