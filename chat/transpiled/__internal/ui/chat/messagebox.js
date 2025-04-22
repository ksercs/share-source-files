"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TYPING_END_DELAY = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../ui/button"));
var _dom_component = _interopRequireDefault(require("../../core/widget/dom_component"));
var _m_text_area = _interopRequireDefault(require("../../ui/m_text_area"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_MESSAGEBOX_CLASS = 'dx-chat-messagebox';
const CHAT_MESSAGEBOX_TEXTAREA_CLASS = 'dx-chat-messagebox-textarea';
const CHAT_MESSAGEBOX_BUTTON_CLASS = 'dx-chat-messagebox-button';
const TYPING_END_DELAY = exports.TYPING_END_DELAY = 2000;
class MessageBox extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      activeStateEnabled: true,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      onMessageEntered: undefined,
      onTypingStart: undefined,
      onTypingEnd: undefined
    });
  }
  _init() {
    super._init();
    this._createMessageEnteredAction();
    this._createTypingStartAction();
    this._createTypingEndAction();
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(CHAT_MESSAGEBOX_CLASS);
    super._initMarkup();
    this._renderTextArea();
    this._renderButton();
  }
  _renderTextArea() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $textArea = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBOX_TEXTAREA_CLASS).appendTo(this.element());
    this._textArea = this._createComponent($textArea, _m_text_area.default, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode: 'outlined',
      placeholder: _message.default.format('dxChat-textareaPlaceholder'),
      autoResizeEnabled: true,
      valueChangeEvent: 'input',
      maxHeight: '8em',
      onInput: e => {
        const shouldButtonBeDisabled = !this._isValuableTextEntered();
        this._toggleButtonDisableState(shouldButtonBeDisabled);
        this._triggerTypingStartAction(e);
        this._updateTypingEndTimeout();
      },
      onEnterKey: e => {
        var _e$event;
        if (!((_e$event = e.event) !== null && _e$event !== void 0 && _e$event.shiftKey)) {
          this._sendHandler(e);
        }
      }
    });
    this._textArea.registerKeyHandler('enter', event => {
      if (!event.shiftKey && this._isValuableTextEntered()) {
        event.preventDefault();
      }
    });
  }
  _renderButton() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $button = (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBOX_BUTTON_CLASS).appendTo(this.element());
    this._button = this._createComponent($button, _button.default, {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      icon: 'sendfilled',
      type: 'default',
      stylingMode: 'text',
      disabled: true,
      elementAttr: {
        'aria-label': _message.default.format('dxChat-sendButtonAriaLabel')
      },
      onClick: e => {
        this._sendHandler(e);
      }
    });
  }
  _createMessageEnteredAction() {
    this._messageEnteredAction = this._createActionByOption('onMessageEntered', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingStartAction() {
    this._typingStartAction = this._createActionByOption('onTypingStart', {
      excludeValidators: ['disabled']
    });
  }
  _createTypingEndAction() {
    this._typingEndAction = this._createActionByOption('onTypingEnd', {
      excludeValidators: ['disabled']
    });
  }
  _triggerTypingStartAction(e) {
    if (!this._typingEndTimeoutId) {
      var _this$_typingStartAct;
      (_this$_typingStartAct = this._typingStartAction) === null || _this$_typingStartAct === void 0 || _this$_typingStartAct.call(this, {
        event: e.event
      });
    }
  }
  _updateTypingEndTimeout() {
    clearTimeout(this._typingEndTimeoutId);
    // eslint-disable-next-line no-restricted-globals
    this._typingEndTimeoutId = setTimeout(() => {
      var _this$_typingEndActio;
      (_this$_typingEndActio = this._typingEndAction) === null || _this$_typingEndActio === void 0 || _this$_typingEndActio.call(this);
      this._clearTypingEndTimeout();
    }, TYPING_END_DELAY);
  }
  _clearTypingEndTimeout() {
    clearTimeout(this._typingEndTimeoutId);
    this._typingEndTimeoutId = undefined;
  }
  _sendHandler(e) {
    var _this$_typingEndActio2, _this$_messageEntered;
    if (!this._isValuableTextEntered()) {
      return;
    }
    this._clearTypingEndTimeout();
    (_this$_typingEndActio2 = this._typingEndAction) === null || _this$_typingEndActio2 === void 0 || _this$_typingEndActio2.call(this);
    const {
      text
    } = this._textArea.option();
    this._textArea.reset();
    this._toggleButtonDisableState(true);
    (_this$_messageEntered = this._messageEnteredAction) === null || _this$_messageEntered === void 0 || _this$_messageEntered.call(this, {
      text,
      event: e.event
    });
  }
  _toggleButtonDisableState(state) {
    this._button.option('disabled', state);
  }
  _isValuableTextEntered() {
    const {
      text
    } = this._textArea.option();
    return !!(text !== null && text !== void 0 && text.trim());
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        {
          this._button.option(name, value);
          this._textArea.option(name, value);
          break;
        }
      case 'onMessageEntered':
        this._createMessageEnteredAction();
        break;
      case 'onTypingStart':
        this._createTypingStartAction();
        break;
      case 'onTypingEnd':
        this._createTypingEndAction();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    this._clearTypingEndTimeout();
    super._clean();
  }
  updateInputAria(emptyViewId) {
    this._textArea.option({
      inputAttr: {
        'aria-labelledby': emptyViewId
      }
    });
  }
}
var _default = exports.default = MessageBox;