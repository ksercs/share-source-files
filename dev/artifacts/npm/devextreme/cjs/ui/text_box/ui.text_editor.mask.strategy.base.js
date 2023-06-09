/**
* DevExtreme (cjs/ui/text_box/ui.text_editor.mask.strategy.base.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _dom = require("../../core/utils/dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var MASK_EVENT_NAMESPACE = 'dxMask';
var BLUR_EVENT = 'blur beforedeactivate';
var EMPTY_CHAR = ' ';
var BaseMaskStrategy = /*#__PURE__*/function () {
  function BaseMaskStrategy(editor) {
    this.editor = editor;
    this.DIRECTION = {
      FORWARD: 'forward',
      BACKWARD: 'backward'
    };
    this.NAME = this._getStrategyName();
  }
  var _proto = BaseMaskStrategy.prototype;
  _proto._getStrategyName = function _getStrategyName() {
    return 'base';
  };
  _proto.editorOption = function editorOption() {
    var _this$editor;
    return (_this$editor = this.editor).option.apply(_this$editor, arguments);
  };
  _proto.editorInput = function editorInput() {
    return this.editor._input();
  };
  _proto.editorCaret = function editorCaret(newCaret) {
    if (!newCaret) {
      return this.editor._caret();
    }
    this.editor._caret(newCaret);
  };
  _proto.getHandler = function getHandler(handlerName) {
    var handler = this["_".concat(handlerName, "Handler")] || function () {};
    return handler.bind(this);
  };
  _proto.attachEvents = function attachEvents() {
    var _this = this;
    var $input = this.editorInput();
    this.getHandleEventNames().forEach(function (eventName) {
      var subscriptionName = (0, _index.addNamespace)(eventName.toLowerCase(), MASK_EVENT_NAMESPACE);
      _events_engine.default.on($input, subscriptionName, _this.getEventHandler(eventName));
    });
    this._attachChangeEventHandlers();
  };
  _proto.getHandleEventNames = function getHandleEventNames() {
    return ['focusIn', 'focusOut', 'keyDown', 'input', 'paste', 'cut', 'drop'];
  };
  _proto.getEventHandler = function getEventHandler(eventName) {
    return this["_".concat(eventName, "Handler")].bind(this);
  };
  _proto.detachEvents = function detachEvents() {
    _events_engine.default.off(this.editorInput(), ".".concat(MASK_EVENT_NAMESPACE));
  };
  _proto._attachChangeEventHandlers = function _attachChangeEventHandlers() {
    if (!this.editorOption('valueChangeEvent').split(' ').includes('change')) {
      return;
    }
    _events_engine.default.on(this.editorInput(), (0, _index.addNamespace)(BLUR_EVENT, MASK_EVENT_NAMESPACE), function (e) {
      // NOTE: input is focused on caret changing in IE(T304159)
      this._suppressCaretChanging(this._changeHandler, [e]);
      this._changeHandler(e);
    }.bind(this.editor));
  };
  _proto._focusInHandler = function _focusInHandler() {
    this.editor._showMaskPlaceholder();
    this.editor._direction(this.DIRECTION.FORWARD);
    if (!this.editor._isValueEmpty() && this.editorOption('isValid')) {
      this.editor._adjustCaret();
    } else {
      var caret = this.editor._maskRulesChain.first();
      this._caretTimeout = setTimeout(function () {
        this._caret({
          start: caret,
          end: caret
        });
      }.bind(this.editor), 0);
    }
  };
  _proto._focusOutHandler = function _focusOutHandler(event) {
    this.editor._changeHandler(event);
    if (this.editorOption('showMaskMode') === 'onFocus' && this.editor._isValueEmpty()) {
      this.editorOption('text', '');
      this.editor._renderDisplayText('');
    }
  };
  _proto._cutHandler = function _cutHandler(event) {
    var caret = this.editorCaret();
    var selectedText = this.editorInput().val().substring(caret.start, caret.end);
    this.editor._maskKeyHandler(event, function () {
      return (0, _dom.clipboardText)(event, selectedText);
    });
  };
  _proto._dropHandler = function _dropHandler() {
    this._clearDragTimer();
    this._dragTimer = setTimeout(function () {
      this.option('value', this._convertToValue(this._input().val()));
    }.bind(this.editor));
  };
  _proto._clearDragTimer = function _clearDragTimer() {
    clearTimeout(this._dragTimer);
  };
  _proto._keyDownHandler = function _keyDownHandler() {
    this._keyPressHandled = false;
  };
  _proto._pasteHandler = function _pasteHandler(event) {
    var editor = this.editor;
    if (editor.option('disabled')) {
      return;
    }
    this._keyPressHandled = true;
    var caret = this.editorCaret();
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
    var _this2 = this;
    var editor = this.editor;
    var inputVal = this.editorInput().val();
    this._inputHandlerTimer = setTimeout(function () {
      _this2._keyPressHandled = true;
      if (_this2._isAutoFill()) {
        _this2._keyPressHandled = true;
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
    var $input = this.editor._input();
    var result = false;
    if (_browser.default.webkit) {
      var input = $input.get(0);
      result = input && input.matches(':-webkit-autofill');
    }
    return result;
  };
  _proto.runWithoutEventProcessing = function runWithoutEventProcessing(action) {
    var keyPressHandled = this._keyPressHandled;
    this._keyPressHandled = true;
    action();
    this._keyPressHandled = keyPressHandled;
  };
  _proto._backspaceHandler = function _backspaceHandler() {};
  _proto._delHandler = function _delHandler(event) {
    var editor = this.editor;
    this._keyPressHandled = true;
    editor._maskKeyHandler(event, function () {
      return !editor._hasSelection() && editor._handleKey(EMPTY_CHAR);
    });
  };
  _proto.clean = function clean() {
    this._clearDragTimer();
    clearTimeout(this._backspaceHandlerTimeout);
    clearTimeout(this._caretTimeout);
    clearTimeout(this._inputHandlerTimer);
  };
  return BaseMaskStrategy;
}();
exports.default = BaseMaskStrategy;
module.exports = exports.default;
module.exports.default = exports.default;
