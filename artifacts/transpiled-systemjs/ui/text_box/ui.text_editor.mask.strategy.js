!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/text_box/ui.text_editor.mask.strategy.js"], ["../../events/core/events_engine","../../events/utils/index","../../core/utils/browser","../../core/utils/dom"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/text_box/ui.text_editor.mask.strategy.js", ["../../events/core/events_engine", "../../events/utils/index", "../../core/utils/browser", "../../core/utils/dom"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _dom = $__require("../../core/utils/dom");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var MASK_EVENT_NAMESPACE = 'dxMask';
  var BLUR_EVENT = 'blur beforedeactivate';
  var EMPTY_CHAR = ' ';
  var DELETE_INPUT_TYPES = ['deleteContentBackward', 'deleteSoftLineBackward', 'deleteContent', 'deleteHardLineBackward'];
  var HISTORY_INPUT_TYPES = ['historyUndo', 'historyRedo'];
  var EVENT_NAMES = ['focusIn', 'focusOut', 'input', 'paste', 'cut', 'drop', 'beforeInput'];
  function getEmptyString(length) {
    return EMPTY_CHAR.repeat(length);
  }
  var MaskStrategy = /*#__PURE__*/function () {
    function MaskStrategy(editor) {
      this.editor = editor;
    }
    var _proto = MaskStrategy.prototype;
    _proto._editorOption = function _editorOption() {
      var _this$editor;
      return (_this$editor = this.editor).option.apply(_this$editor, arguments);
    };
    _proto._editorInput = function _editorInput() {
      return this.editor._input();
    };
    _proto._editorCaret = function _editorCaret(newCaret) {
      if (!newCaret) {
        return this.editor._caret();
      }
      this.editor._caret(newCaret);
    };
    _proto._attachChangeEventHandler = function _attachChangeEventHandler() {
      var _this = this;
      if (!this._editorOption('valueChangeEvent').split(' ').includes('change')) {
        return;
      }
      var $input = this._editorInput();
      var namespace = (0, _index.addNamespace)(BLUR_EVENT, MASK_EVENT_NAMESPACE);
      _events_engine.default.on($input, namespace, function (e) {
        _this.editor._changeHandler(e);
      });
    };
    _proto._beforeInputHandler = function _beforeInputHandler() {
      this._previousText = this._editorOption('text');
      this._prevCaret = this._editorCaret();
    };
    _proto._inputHandler = function _inputHandler(event) {
      var originalEvent = event.originalEvent;
      if (!originalEvent) {
        return;
      }
      var inputType = originalEvent.inputType;
      if (HISTORY_INPUT_TYPES.includes(inputType)) {
        this._handleHistoryInputEvent();
      } else if (DELETE_INPUT_TYPES.includes(inputType)) {
        this._handleBackwardDeleteInputEvent();
      } else {
        var currentCaret = this._editorCaret();
        if (!currentCaret.end) {
          return;
        }
        this._clearSelectedText();
        this._autoFillHandler(originalEvent);
        this._editorCaret(currentCaret);
        this._handleInsertTextInputEvent(originalEvent.data);
      }
      if (this._editorOption('text') === this._previousText) {
        event.stopImmediatePropagation();
      }
    };
    _proto._handleHistoryInputEvent = function _handleHistoryInputEvent() {
      var caret = this._editorCaret();
      this._updateEditorMask({
        start: caret.start,
        length: caret.end - caret.start,
        text: ''
      });
      this._editorCaret(this._prevCaret);
    };
    _proto._handleBackwardDeleteInputEvent = function _handleBackwardDeleteInputEvent() {
      this._clearSelectedText();
      var caret = this._editorCaret();
      this.editor.setForwardDirection();
      this.editor._adjustCaret();
      var adjustedForwardCaret = this._editorCaret();
      if (adjustedForwardCaret.start !== caret.start) {
        this.editor.setBackwardDirection();
        this.editor._adjustCaret();
      }
    };
    _proto._clearSelectedText = function _clearSelectedText() {
      var _this$_prevCaret, _this$_prevCaret2;
      var length = ((_this$_prevCaret = this._prevCaret) === null || _this$_prevCaret === void 0 ? void 0 : _this$_prevCaret.end) - ((_this$_prevCaret2 = this._prevCaret) === null || _this$_prevCaret2 === void 0 ? void 0 : _this$_prevCaret2.start) || 1;
      var caret = this._editorCaret();
      if (!this._isAutoFill()) {
        this.editor.setBackwardDirection();
        this._updateEditorMask({
          start: caret.start,
          length: length,
          text: getEmptyString(length)
        });
      }
    };
    _proto._handleInsertTextInputEvent = function _handleInsertTextInputEvent(data) {
      var _this$_prevCaret$star, _this$_prevCaret3;
      // NOTE: data has length > 1 when autosuggestion is applied.
      var text = data !== null && data !== void 0 ? data : '';
      this.editor.setForwardDirection();
      var hasValidChars = this._updateEditorMask({
        start: (_this$_prevCaret$star = (_this$_prevCaret3 = this._prevCaret) === null || _this$_prevCaret3 === void 0 ? void 0 : _this$_prevCaret3.start) !== null && _this$_prevCaret$star !== void 0 ? _this$_prevCaret$star : 0,
        length: text.length || 1,
        text: text
      });
      if (!hasValidChars) {
        this._editorCaret(this._prevCaret);
      }
    };
    _proto._updateEditorMask = function _updateEditorMask(args) {
      var textLength = args.text.length;
      var processedCharsCount = this.editor._handleChain(args);
      this.editor._displayMask();
      if (this.editor.isForwardDirection()) {
        var _this$_editorCaret = this._editorCaret(),
            start = _this$_editorCaret.start,
            end = _this$_editorCaret.end;
        var correction = processedCharsCount - textLength;
        var hasSkippedStub = processedCharsCount > 1;
        if (hasSkippedStub && textLength === 1) {
          this._editorCaret({
            start: start + correction,
            end: end + correction
          });
        }
        this.editor._adjustCaret();
      }
      return !!processedCharsCount;
    };
    _proto._focusInHandler = function _focusInHandler() {
      var _this2 = this;
      this.editor._showMaskPlaceholder();
      this.editor.setForwardDirection();
      if (!this.editor._isValueEmpty() && this._editorOption('isValid')) {
        this.editor._adjustCaret();
      } else {
        var caret = this.editor._maskRulesChain.first();
        this._caretTimeout = setTimeout(function () {
          _this2._editorCaret({
            start: caret,
            end: caret
          });
        }, 0);
      }
    };
    _proto._focusOutHandler = function _focusOutHandler(event) {
      this.editor._changeHandler(event);
      if (this._editorOption('showMaskMode') === 'onFocus' && this.editor._isValueEmpty()) {
        this._editorOption('text', '');
        this.editor._renderDisplayText('');
      }
    };
    _proto._delHandler = function _delHandler(event) {
      var editor = this.editor;
      editor._maskKeyHandler(event, function () {
        if (!editor._hasSelection()) {
          editor._handleKey(EMPTY_CHAR);
        }
      });
    };
    _proto._cutHandler = function _cutHandler(event) {
      var caret = this._editorCaret();
      var selectedText = this._editorInput().val().substring(caret.start, caret.end);
      this.editor._maskKeyHandler(event, function () {
        return (0, _dom.clipboardText)(event, selectedText);
      });
    };
    _proto._dropHandler = function _dropHandler() {
      var _this3 = this;
      this._clearDragTimer();
      this._dragTimer = setTimeout(function () {
        var value = _this3.editor._convertToValue(_this3._editorInput().val());
        _this3._editorOption('value', value);
      });
    };
    _proto._pasteHandler = function _pasteHandler(event) {
      var editor = this.editor;
      if (this._editorOption('disabled')) {
        return;
      }
      var caret = this._editorCaret();
      editor._maskKeyHandler(event, function () {
        var pastedText = (0, _dom.clipboardText)(event);
        var restText = editor._maskRulesChain.text().substring(caret.end);
        var accepted = editor._handleChain({
          text: pastedText,
          start: caret.start,
          length: pastedText.length
        });
        var newCaret = caret.start + accepted;
        editor._handleChain({
          text: restText,
          start: newCaret,
          length: restText.length
        });
        editor._caret({
          start: newCaret,
          end: newCaret
        });
      });
    };
    _proto._autoFillHandler = function _autoFillHandler(event) {
      var _this4 = this;
      var editor = this.editor;
      var inputVal = this._editorInput().val();
      this._inputHandlerTimer = setTimeout(function () {
        if (_this4._isAutoFill()) {
          editor._maskKeyHandler(event, function () {
            editor._handleChain({
              text: inputVal,
              start: 0,
              length: inputVal.length
            });
          });
          editor._validateMask();
        }
      });
    };
    _proto._isAutoFill = function _isAutoFill() {
      var $input = this._editorInput();
      if (_browser.default.webkit) {
        var _input$matches;
        var input = $input.get(0);
        return (_input$matches = input === null || input === void 0 ? void 0 : input.matches(':-webkit-autofill')) !== null && _input$matches !== void 0 ? _input$matches : false;
      }
      return false;
    };
    _proto._clearDragTimer = function _clearDragTimer() {
      clearTimeout(this._dragTimer);
    };
    _proto.getHandler = function getHandler(handlerName) {
      var _this5 = this;
      return function (args) {
        var _this6;
        (_this6 = _this5["_".concat(handlerName, "Handler")]) === null || _this6 === void 0 ? void 0 : _this6.call(_this5, args);
      };
    };
    _proto.attachEvents = function attachEvents() {
      var _this7 = this;
      var $input = this._editorInput();
      EVENT_NAMES.forEach(function (eventName) {
        var namespace = (0, _index.addNamespace)(eventName.toLowerCase(), MASK_EVENT_NAMESPACE);
        _events_engine.default.on($input, namespace, _this7.getHandler(eventName));
      });
      this._attachChangeEventHandler();
    };
    _proto.detachEvents = function detachEvents() {
      _events_engine.default.off(this._editorInput(), ".".concat(MASK_EVENT_NAMESPACE));
    };
    _proto.clean = function clean() {
      this._clearDragTimer();
      clearTimeout(this._caretTimeout);
      clearTimeout(this._inputHandlerTimer);
    };
    return MaskStrategy;
  }();
  exports.default = MaskStrategy;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","../../events/utils/index","../../core/utils/browser","../../core/utils/dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../core/utils/browser"), require("../../core/utils/dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.text_editor.mask.strategy.js.map