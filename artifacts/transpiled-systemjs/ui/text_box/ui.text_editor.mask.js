!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/text_box/ui.text_editor.mask.js"], ["../../core/renderer","./utils.caret","../../core/utils/iterator","../../events/utils/index","../../events/core/events_engine","../../core/utils/extend","../widget/selectors","../../core/utils/type","../../localization/message","../../core/utils/common","../../core/utils/string","../../events/core/wheel","./ui.text_editor.mask.rule","./ui.text_editor.base","./ui.text_editor.mask.strategy"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/text_box/ui.text_editor.mask.js", ["../../core/renderer", "./utils.caret", "../../core/utils/iterator", "../../events/utils/index", "../../events/core/events_engine", "../../core/utils/extend", "../widget/selectors", "../../core/utils/type", "../../localization/message", "../../core/utils/common", "../../core/utils/string", "../../events/core/wheel", "./ui.text_editor.mask.rule", "./ui.text_editor.base", "./ui.text_editor.mask.strategy"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _utils = _interopRequireDefault($__require("./utils.caret"));
  var _iterator = $__require("../../core/utils/iterator");
  var _index = $__require("../../events/utils/index");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _extend = $__require("../../core/utils/extend");
  var _selectors = $__require("../widget/selectors");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _common = $__require("../../core/utils/common");
  var _string = $__require("../../core/utils/string");
  var _wheel = $__require("../../events/core/wheel");
  var _uiText_editorMask = $__require("./ui.text_editor.mask.rule");
  var _uiText_editor = _interopRequireDefault($__require("./ui.text_editor.base"));
  var _uiText_editorMask2 = _interopRequireDefault($__require("./ui.text_editor.mask.strategy"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var stubCaret = function stubCaret() {
    return {};
  };
  var caret = _utils.default;
  var EMPTY_CHAR = ' ';
  var ESCAPED_CHAR = '\\';
  var TEXTEDITOR_MASKED_CLASS = 'dx-texteditor-masked';
  var FORWARD_DIRECTION = 'forward';
  var BACKWARD_DIRECTION = 'backward';
  var buildInMaskRules = {
    '0': /[0-9]/,
    '9': /[0-9\s]/,
    '#': /[-+0-9\s]/,
    'L': function L(char) {
      return isLiteralChar(char);
    },
    'l': function l(char) {
      return isLiteralChar(char) || isSpaceChar(char);
    },
    'C': /\S/,
    'c': /./,
    'A': function A(char) {
      return isLiteralChar(char) || isNumericChar(char);
    },
    'a': function a(char) {
      return isLiteralChar(char) || isNumericChar(char) || isSpaceChar(char);
    }
  };
  function isNumericChar(char) {
    return (/[0-9]/.test(char)
    );
  }
  function isLiteralChar(char) {
    var code = char.charCodeAt();
    return 64 < code && code < 91 || 96 < code && code < 123 || code > 127;
  }
  function isSpaceChar(char) {
    return char === ' ';
  }
  var TextEditorMask = _uiText_editor.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        mask: '',
        maskChar: '_',
        maskRules: {},
        maskInvalidMessage: _message.default.format('validation-mask'),
        useMaskedValue: false,
        showMaskMode: 'always'
      });
    },
    _supportedKeys: function _supportedKeys() {
      var that = this;
      var keyHandlerMap = {
        del: that._maskStrategy.getHandler('del'),
        enter: that._changeHandler
      };
      var result = that.callBase();
      (0, _iterator.each)(keyHandlerMap, function (key, callback) {
        var parentHandler = result[key];
        result[key] = function (e) {
          that.option('mask') && callback.call(that, e);
          parentHandler && parentHandler(e);
        };
      });
      return result;
    },
    _getSubmitElement: function _getSubmitElement() {
      return !this.option('mask') ? this.callBase() : this._$hiddenElement;
    },
    _init: function _init() {
      this.callBase();
      this._initMaskStrategy();
    },
    _initMaskStrategy: function _initMaskStrategy() {
      this._maskStrategy = new _uiText_editorMask2.default(this);
    },
    _initMarkup: function _initMarkup() {
      this._renderHiddenElement();
      this.callBase();
    },
    _attachMouseWheelEventHandlers: function _attachMouseWheelEventHandlers() {
      var hasMouseWheelHandler = this._onMouseWheel !== _common.noop;
      if (!hasMouseWheelHandler) {
        return;
      }
      var input = this._input();
      var eventName = (0, _index.addNamespace)(_wheel.name, this.NAME);
      var mouseWheelAction = this._createAction(function (e) {
        var event = e.event;
        if ((0, _selectors.focused)(input) && !(0, _index.isCommandKeyPressed)(event)) {
          this._onMouseWheel(event);
          event.preventDefault();
          event.stopPropagation();
        }
      }.bind(this));
      _events_engine.default.off(input, eventName);
      _events_engine.default.on(input, eventName, function (e) {
        mouseWheelAction({
          event: e
        });
      });
    },
    _onMouseWheel: _common.noop,
    _render: function _render() {
      this._renderMask();
      this.callBase();
      this._attachMouseWheelEventHandlers();
    },
    _renderHiddenElement: function _renderHiddenElement() {
      if (this.option('mask')) {
        this._$hiddenElement = (0, _renderer.default)('<input>').attr('type', 'hidden').appendTo(this._inputWrapper());
      }
    },
    _removeHiddenElement: function _removeHiddenElement() {
      this._$hiddenElement && this._$hiddenElement.remove();
    },
    _renderMask: function _renderMask() {
      this.$element().removeClass(TEXTEDITOR_MASKED_CLASS);
      this._maskRulesChain = null;
      this._maskStrategy.detachEvents();
      if (!this.option('mask')) {
        return;
      }
      this.$element().addClass(TEXTEDITOR_MASKED_CLASS);
      this._maskStrategy.attachEvents();
      this._parseMask();
      this._renderMaskedValue();
    },
    _suppressCaretChanging: function _suppressCaretChanging(callback, args) {
      caret = stubCaret;
      try {
        callback.apply(this, args);
      } finally {
        caret = _utils.default;
      }
    },
    _changeHandler: function _changeHandler(e) {
      var $input = this._input();
      var inputValue = $input.val();
      if (inputValue === this._changedValue) {
        return;
      }
      this._changedValue = inputValue;
      var changeEvent = (0, _index.createEvent)(e, {
        type: 'change'
      });
      _events_engine.default.trigger($input, changeEvent);
    },
    _parseMask: function _parseMask() {
      this._maskRules = (0, _extend.extend)({}, buildInMaskRules, this.option('maskRules'));
      this._maskRulesChain = this._parseMaskRule(0);
    },
    _parseMaskRule: function _parseMaskRule(index) {
      var mask = this.option('mask');
      if (index >= mask.length) {
        return new _uiText_editorMask.EmptyMaskRule();
      }
      var currentMaskChar = mask[index];
      var isEscapedChar = currentMaskChar === ESCAPED_CHAR;
      var result = isEscapedChar ? new _uiText_editorMask.StubMaskRule({
        maskChar: mask[index + 1]
      }) : this._getMaskRule(currentMaskChar);
      result.next(this._parseMaskRule(index + 1 + isEscapedChar));
      return result;
    },
    _getMaskRule: function _getMaskRule(pattern) {
      var ruleConfig;
      (0, _iterator.each)(this._maskRules, function (rulePattern, allowedChars) {
        if (rulePattern === pattern) {
          ruleConfig = {
            pattern: rulePattern,
            allowedChars: allowedChars
          };
          return false;
        }
      });
      return (0, _type.isDefined)(ruleConfig) ? new _uiText_editorMask.MaskRule((0, _extend.extend)({
        maskChar: this.option('maskChar')
      }, ruleConfig)) : new _uiText_editorMask.StubMaskRule({
        maskChar: pattern
      });
    },
    _renderMaskedValue: function _renderMaskedValue() {
      if (!this._maskRulesChain) {
        return;
      }
      var value = this.option('value') || '';
      this._maskRulesChain.clear(this._normalizeChainArguments());
      var chainArgs = {
        length: value.length
      };
      chainArgs[this._isMaskedValueMode() ? 'text' : 'value'] = value;
      this._handleChain(chainArgs);
      this._displayMask();
    },
    _replaceSelectedText: function _replaceSelectedText(text, selection, char) {
      if (char === undefined) {
        return text;
      }
      var textBefore = text.slice(0, selection.start);
      var textAfter = text.slice(selection.end);
      var edited = textBefore + char + textAfter;
      return edited;
    },
    _isMaskedValueMode: function _isMaskedValueMode() {
      return this.option('useMaskedValue');
    },
    _displayMask: function _displayMask(caret) {
      caret = caret || this._caret();
      this._renderValue();
      this._caret(caret);
    },
    _isValueEmpty: function _isValueEmpty() {
      return (0, _string.isEmpty)(this._value);
    },
    _shouldShowMask: function _shouldShowMask() {
      var showMaskMode = this.option('showMaskMode');
      if (showMaskMode === 'onFocus') {
        return (0, _selectors.focused)(this._input()) || !this._isValueEmpty();
      }
      return true;
    },
    _showMaskPlaceholder: function _showMaskPlaceholder() {
      if (this._shouldShowMask()) {
        var text = this._maskRulesChain.text();
        this.option('text', text);
        if (this.option('showMaskMode') === 'onFocus') {
          this._renderDisplayText(text);
        }
      }
    },
    _renderValue: function _renderValue() {
      if (this._maskRulesChain) {
        this._showMaskPlaceholder();
        if (this._$hiddenElement) {
          var value = this._maskRulesChain.value();
          var submitElementValue = !(0, _string.isEmpty)(value) ? this._getPreparedValue() : '';
          this._$hiddenElement.val(submitElementValue);
        }
      }
      return this.callBase();
    },
    _getPreparedValue: function _getPreparedValue() {
      return this._convertToValue().replace(/\s+$/, '');
    },
    _valueChangeEventHandler: function _valueChangeEventHandler(e) {
      if (!this._maskRulesChain) {
        this.callBase.apply(this, arguments);
        return;
      }
      this._saveValueChangeEvent(e);
      this.option('value', this._getPreparedValue());
    },
    _isControlKeyFired: function _isControlKeyFired(e) {
      return this._isControlKey((0, _index.normalizeKeyName)(e)) || (0, _index.isCommandKeyPressed)(e);
    },
    _handleChain: function _handleChain(args) {
      var handledCount = this._maskRulesChain.handle(this._normalizeChainArguments(args));
      this._value = this._maskRulesChain.value();
      this._textValue = this._maskRulesChain.text();
      return handledCount;
    },
    _normalizeChainArguments: function _normalizeChainArguments(args) {
      args = args || {};
      args.index = 0;
      args.fullText = this._maskRulesChain.text();
      return args;
    },
    _convertToValue: function _convertToValue(text) {
      if (this._isMaskedValueMode()) {
        text = this._replaceMaskCharWithEmpty(text || this._textValue || '');
      } else {
        text = text || this._value || '';
      }
      return text;
    },
    _replaceMaskCharWithEmpty: function _replaceMaskCharWithEmpty(text) {
      return text.replace(new RegExp(this.option('maskChar'), 'g'), EMPTY_CHAR);
    },
    _maskKeyHandler: function _maskKeyHandler(e, keyHandler) {
      var _this = this;
      if (this.option('readOnly')) {
        return;
      }
      this.setForwardDirection();
      e.preventDefault();
      this._handleSelection();
      var previousText = this._input().val();
      var raiseInputEvent = function raiseInputEvent() {
        if (previousText !== _this._input().val()) {
          _events_engine.default.trigger(_this._input(), 'input');
        }
      };
      var handled = keyHandler();
      if (handled) {
        handled.then(raiseInputEvent);
      } else {
        this.setForwardDirection();
        this._adjustCaret();
        this._displayMask();
        this._maskRulesChain.reset();
        raiseInputEvent();
      }
    },
    _handleKey: function _handleKey(key, direction) {
      this._direction(direction || FORWARD_DIRECTION);
      this._adjustCaret(key);
      this._handleKeyChain(key);
      this._moveCaret();
    },
    _handleSelection: function _handleSelection() {
      if (!this._hasSelection()) {
        return;
      }
      var caret = this._caret();
      var emptyChars = new Array(caret.end - caret.start + 1).join(EMPTY_CHAR);
      this._handleKeyChain(emptyChars);
    },
    _handleKeyChain: function _handleKeyChain(chars) {
      var caret = this._caret();
      var start = this.isForwardDirection() ? caret.start : caret.start - 1;
      var end = this.isForwardDirection() ? caret.end : caret.end - 1;
      var length = start === end ? 1 : end - start;
      this._handleChain({
        text: chars,
        start: start,
        length: length
      });
    },
    _tryMoveCaretBackward: function _tryMoveCaretBackward() {
      this.setBackwardDirection();
      var currentCaret = this._caret().start;
      this._adjustCaret();
      return !currentCaret || currentCaret !== this._caret().start;
    },
    _adjustCaret: function _adjustCaret(char) {
      var caretStart = this._caret().start;
      var isForwardDirection = this.isForwardDirection();
      var caret = this._maskRulesChain.adjustedCaret(caretStart, isForwardDirection, char);
      this._caret({
        start: caret,
        end: caret
      });
    },
    _moveCaret: function _moveCaret() {
      var currentCaret = this._caret().start;
      var maskRuleIndex = currentCaret + (this.isForwardDirection() ? 0 : -1);
      var caret = this._maskRulesChain.isAccepted(maskRuleIndex) ? currentCaret + (this.isForwardDirection() ? 1 : -1) : currentCaret;
      this._caret({
        start: caret,
        end: caret
      });
    },
    _caret: function _caret(position, force) {
      var $input = this._input();
      if (!$input.length) {
        return;
      }
      if (!arguments.length) {
        return caret($input);
      }
      caret($input, position, force);
    },
    _hasSelection: function _hasSelection() {
      var caret = this._caret();
      return caret.start !== caret.end;
    },
    _direction: function _direction(direction) {
      if (!arguments.length) {
        return this._typingDirection;
      }
      this._typingDirection = direction;
    },
    setForwardDirection: function setForwardDirection() {
      this._direction(FORWARD_DIRECTION);
    },
    setBackwardDirection: function setBackwardDirection() {
      this._direction(BACKWARD_DIRECTION);
    },
    isForwardDirection: function isForwardDirection() {
      return this._direction() === FORWARD_DIRECTION;
    },
    _clean: function _clean() {
      this._maskStrategy && this._maskStrategy.clean();
      this.callBase();
    },
    _validateMask: function _validateMask() {
      if (!this._maskRulesChain) {
        return;
      }
      var isValid = (0, _string.isEmpty)(this.option('value')) || this._maskRulesChain.isValid(this._normalizeChainArguments());
      this.option({
        isValid: isValid,
        validationError: isValid ? null : {
          editorSpecific: true,
          message: this.option('maskInvalidMessage')
        }
      });
    },
    _updateHiddenElement: function _updateHiddenElement() {
      this._removeHiddenElement();
      if (this.option('mask')) {
        this._input().removeAttr('name');
        this._renderHiddenElement();
      }
      this._setSubmitElementName(this.option('name'));
    },
    _updateMaskOption: function _updateMaskOption() {
      this._updateHiddenElement();
      this._renderMask();
      this._validateMask();
    },
    _processEmptyMask: function _processEmptyMask(mask) {
      if (mask) return;
      var value = this.option('value');
      this.option({
        text: value,
        isValid: true
      });
      this.validationRequest.fire({
        value: value,
        editor: this
      });
      this._renderValue();
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'mask':
          this._updateMaskOption();
          this._processEmptyMask(args.value);
          break;
        case 'maskChar':
        case 'maskRules':
        case 'useMaskedValue':
          this._updateMaskOption();
          break;
        case 'value':
          this._renderMaskedValue();
          this._validateMask();
          this.callBase(args);
          this._changedValue = this._input().val();
          break;
        case 'maskInvalidMessage':
          break;
        case 'showMaskMode':
          this.option('text', '');
          this._renderValue();
          break;
        default:
          this.callBase(args);
      }
    }
  });
  var _default = TextEditorMask;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","./utils.caret","../../core/utils/iterator","../../events/utils/index","../../events/core/events_engine","../../core/utils/extend","../widget/selectors","../../core/utils/type","../../localization/message","../../core/utils/common","../../core/utils/string","../../events/core/wheel","./ui.text_editor.mask.rule","./ui.text_editor.base","./ui.text_editor.mask.strategy"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("./utils.caret"), require("../../core/utils/iterator"), require("../../events/utils/index"), require("../../events/core/events_engine"), require("../../core/utils/extend"), require("../widget/selectors"), require("../../core/utils/type"), require("../../localization/message"), require("../../core/utils/common"), require("../../core/utils/string"), require("../../events/core/wheel"), require("./ui.text_editor.mask.rule"), require("./ui.text_editor.base"), require("./ui.text_editor.mask.strategy"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.text_editor.mask.js.map