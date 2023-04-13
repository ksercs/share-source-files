/**
* DevExtreme (cjs/ui/text_box/ui.text_editor.mask.strategy.input_events.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _uiText_editorMaskStrategy = _interopRequireDefault(require("./ui.text_editor.mask.strategy.base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DELETE_INPUT_TYPE = 'deleteContentBackward';
var HISTORY_INPUT_TYPES = ['historyUndo', 'historyRedo'];
var InputEventsMaskStrategy = /*#__PURE__*/function (_BaseMaskStrategy) {
  _inheritsLoose(InputEventsMaskStrategy, _BaseMaskStrategy);
  function InputEventsMaskStrategy() {
    return _BaseMaskStrategy.apply(this, arguments) || this;
  }
  var _proto = InputEventsMaskStrategy.prototype;
  _proto._getStrategyName = function _getStrategyName() {
    return 'inputEvents';
  };
  _proto.getHandleEventNames = function getHandleEventNames() {
    return [].concat(_toConsumableArray(_BaseMaskStrategy.prototype.getHandleEventNames.call(this)), ['beforeInput']);
  };
  _proto._beforeInputHandler = function _beforeInputHandler() {
    this._prevCaret = this.editorCaret();
  };
  _proto._inputHandler = function _inputHandler(event) {
    var originalEvent = event.originalEvent;
    if (!originalEvent) {
      return;
    }
    var inputType = originalEvent.inputType,
      data = originalEvent.data;
    var currentCaret = this.editorCaret();
    if (HISTORY_INPUT_TYPES.includes(inputType)) {
      this._updateEditorMask({
        start: currentCaret.start,
        length: currentCaret.end - currentCaret.start,
        text: ''
      });
      this.editorCaret(this._prevCaret);
      event.stopImmediatePropagation();
      return;
    } else if (inputType === DELETE_INPUT_TYPE) {
      var length = this._prevCaret.end - this._prevCaret.start || 1;
      this.editor.setBackwardDirection();
      this._updateEditorMask({
        start: currentCaret.start,
        length: length,
        text: this._getEmptyString(length)
      });
      var beforeAdjustCaret = this.editorCaret();
      this.editor.setForwardDirection();
      this.editor._adjustCaret();
      var adjustedForwardCaret = this.editorCaret();
      if (adjustedForwardCaret.start !== beforeAdjustCaret.start) {
        this.editor.setBackwardDirection();
        this.editor._adjustCaret();
      }
    } else {
      var _this$_prevCaret;
      if (!currentCaret.end) {
        return;
      }
      this._autoFillHandler(originalEvent);
      this.editorCaret(currentCaret);
      this.editor.setForwardDirection();
      var hasValidChars = this._updateEditorMask({
        start: (_this$_prevCaret = this._prevCaret) === null || _this$_prevCaret === void 0 ? void 0 : _this$_prevCaret.start,
        length: 1,
        text: data !== null && data !== void 0 ? data : ''
      });
      if (!hasValidChars) {
        event.stopImmediatePropagation();
        this.editorCaret(this._prevCaret);
      }
    }
  };
  _proto._getEmptyString = function _getEmptyString(length) {
    return Array(length + 1).join(' ');
  };
  _proto._updateEditorMask = function _updateEditorMask(args) {
    var textLength = args.text.length;
    var updatedCharsCount = this.editor._handleChain(args);
    this.editor._displayMask();
    if (this.editor.isForwardDirection()) {
      var _this$editorCaret = this.editorCaret(),
        start = _this$editorCaret.start,
        end = _this$editorCaret.end;
      var correction = updatedCharsCount - textLength;
      if (updatedCharsCount > 1) {
        this.editorCaret({
          start: start + correction,
          end: end + correction
        });
      }
      this.editor._adjustCaret();
    }
    return !!updatedCharsCount;
  };
  return InputEventsMaskStrategy;
}(_uiText_editorMaskStrategy.default);
var _default = InputEventsMaskStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
