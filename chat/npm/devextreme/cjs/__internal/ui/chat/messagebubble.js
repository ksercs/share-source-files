/**
* DevExtreme (cjs/__internal/ui/chat/messagebubble.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CHAT_MESSAGEBUBBLE_CLASS = void 0;
var _element = require("../../../core/element");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_MESSAGEBUBBLE_CLASS = exports.CHAT_MESSAGEBUBBLE_CLASS = 'dx-chat-messagebubble';
const CHAT_MESSAGEBUBBLE_CONTENT_CLASS = 'dx-chat-messagebubble-content';
class MessageBubble extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      text: '',
      template: null
    });
  }
  _initMarkup() {
    const $element = (0, _renderer.default)(this.element());
    $element.addClass(CHAT_MESSAGEBUBBLE_CLASS);
    (0, _renderer.default)('<div>').addClass(CHAT_MESSAGEBUBBLE_CONTENT_CLASS).appendTo($element);
    super._initMarkup();
    this._updateContent();
  }
  _updateContent() {
    const {
      text = '',
      template
    } = this.option();
    const $bubbleContainer = (0, _renderer.default)(this.element()).find(`.${CHAT_MESSAGEBUBBLE_CONTENT_CLASS}`);
    $bubbleContainer.empty();
    if (template) {
      template(text, (0, _element.getPublicElement)($bubbleContainer));
      return;
    }
    $bubbleContainer.text(text);
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'text':
      case 'template':
        this._updateContent();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = MessageBubble;
