import BaseMaskStrategy from './ui.text_editor.mask.strategy.base';
var DELETE_INPUT_TYPES = ['deleteContentBackward', 'deleteSoftLineBackward', 'deleteContent', 'deleteHardLineBackward'];
var HISTORY_INPUT_TYPES = ['historyUndo', 'historyRedo'];
class InputEventsMaskStrategy extends BaseMaskStrategy {
  _getStrategyName() {
    return 'inputEvents';
  }
  getHandleEventNames() {
    return [...super.getHandleEventNames(), 'beforeInput'];
  }
  _beforeInputHandler() {
    this._previousText = this.editor.option('text');
    this._prevCaret = this.editorCaret();
  }
  _inputHandler(event) {
    var {
      originalEvent
    } = event;
    if (!originalEvent) {
      return;
    }
    var {
      inputType,
      data
    } = originalEvent;
    var currentCaret = this.editorCaret();
    if (HISTORY_INPUT_TYPES.includes(inputType)) {
      this._updateEditorMask({
        start: currentCaret.start,
        length: currentCaret.end - currentCaret.start,
        text: ''
      });
      this.editorCaret(this._prevCaret);
    } else if (DELETE_INPUT_TYPES.includes(inputType)) {
      var length = this._prevCaret.end - this._prevCaret.start || 1;
      this.editor.setBackwardDirection();
      this._updateEditorMask({
        start: currentCaret.start,
        length,
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
      var _this$_prevCaret, _this$_prevCaret2, _this$_prevCaret3;
      if (!currentCaret.end) {
        return;
      }
      var _length = ((_this$_prevCaret = this._prevCaret) === null || _this$_prevCaret === void 0 ? void 0 : _this$_prevCaret.end) - ((_this$_prevCaret2 = this._prevCaret) === null || _this$_prevCaret2 === void 0 ? void 0 : _this$_prevCaret2.start) || 1;
      if (_length > 1) {
        this.editor.setBackwardDirection();
        this._updateEditorMask({
          start: currentCaret.start,
          length: _length,
          text: this._getEmptyString(_length)
        });
      }
      this._autoFillHandler(originalEvent);
      this.editorCaret(currentCaret);
      this.editor.setForwardDirection();
      var hasValidChars = this._updateEditorMask({
        start: (_this$_prevCaret3 = this._prevCaret) === null || _this$_prevCaret3 === void 0 ? void 0 : _this$_prevCaret3.start,
        length: (data === null || data === void 0 ? void 0 : data.length) || 1,
        text: data !== null && data !== void 0 ? data : ''
      });
      if (!hasValidChars) {
        this.editorCaret(this._prevCaret);
      }
    }
    if (this.editor.option('text') === this._previousText) {
      event.stopImmediatePropagation();
    }
  }
  _getEmptyString(length) {
    return Array(length + 1).join(' ');
  }
  _updateEditorMask(args) {
    var textLength = args.text.length;
    var updatedCharsCount = this.editor._handleChain(args);
    this.editor._displayMask();
    if (this.editor.isForwardDirection()) {
      var {
        start,
        end
      } = this.editorCaret();
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
  }
}
export default InputEventsMaskStrategy;