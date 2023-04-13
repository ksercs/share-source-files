/**
* DevExtreme (esm/ui/text_box/ui.text_editor.mask.strategy.input_events.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import BaseMaskStrategy from './ui.text_editor.mask.strategy.base';
var DELETE_INPUT_TYPE = 'deleteContentBackward';
var HISTORY_INPUT_TYPES = ['historyUndo', 'historyRedo'];
class InputEventsMaskStrategy extends BaseMaskStrategy {
  _getStrategyName() {
    return 'inputEvents';
  }
  getHandleEventNames() {
    return [...super.getHandleEventNames(), 'beforeInput'];
  }
  _beforeInputHandler() {
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
      event.stopImmediatePropagation();
      return;
    } else if (inputType === DELETE_INPUT_TYPE) {
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
