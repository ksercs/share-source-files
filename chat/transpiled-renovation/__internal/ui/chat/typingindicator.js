"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _dom_component = _interopRequireDefault(require("../../core/widget/dom_component"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_TYPINGINDICATOR_CLASS = 'dx-chat-typingindicator';
const CHAT_TYPINGINDICATOR_CONTENT_CLASS = 'dx-chat-typingindicator-content';
const CHAT_TYPINGINDICATOR_TEXT_CLASS = 'dx-chat-typingindicator-text';
const CHAT_TYPINGINDICATOR_BUBBLE_CLASS = 'dx-chat-typingindicator-bubble';
const CHAT_TYPINGINDICATOR_CIRCLE_CLASS = 'dx-chat-typingindicator-circle';
class TypingIndicator extends _dom_component.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      typingUsers: []
    });
  }
  _init() {
    super._init();
    (0, _renderer.default)(this.element()).addClass(CHAT_TYPINGINDICATOR_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    const {
      typingUsers
    } = this.option();
    if (typingUsers !== null && typingUsers !== void 0 && typingUsers.length) {
      this._renderContent();
    }
  }
  _renderContent() {
    this._renderContentElement();
    this._renderTextElement();
    this._updateText();
    this._renderBubble();
  }
  _renderContentElement() {
    this._$content = (0, _renderer.default)('<div>').addClass(CHAT_TYPINGINDICATOR_CONTENT_CLASS).appendTo(this.element());
  }
  _renderTextElement() {
    if (this._$content) {
      this._$text = (0, _renderer.default)('<div>').addClass(CHAT_TYPINGINDICATOR_TEXT_CLASS).appendTo(this._$content);
    }
  }
  _renderBubble() {
    if (this._$content) {
      const $bubble = (0, _renderer.default)('<div>').addClass(CHAT_TYPINGINDICATOR_BUBBLE_CLASS);
      new Array(3).fill(0).forEach(() => {
        (0, _renderer.default)('<div>').addClass(CHAT_TYPINGINDICATOR_CIRCLE_CLASS).appendTo($bubble);
      });
      $bubble.appendTo(this._$content);
    }
  }
  _getText() {
    const {
      typingUsers
    } = this.option();
    const usernames = typingUsers === null || typingUsers === void 0 ? void 0 : typingUsers.map(user => {
      var _user$name;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      const name = ((_user$name = user.name) === null || _user$name === void 0 ? void 0 : _user$name.trim()) || _message.default.format('dxChat-defaultUserName');
      return name;
    });
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 1) {
      const username = usernames[0];
      return _message.default.format('dxChat-typingMessageSingleUser',
      // @ts-expect-error
      username);
    }
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 2) {
      const [usernameFirst, usernameSecond] = usernames;
      return _message.default.format('dxChat-typingMessageTwoUsers',
      // @ts-expect-error
      usernameFirst, usernameSecond);
    }
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 3) {
      const [usernameFirst, usernameSecond, usernameThird] = usernames;
      return _message.default.format('dxChat-typingMessageThreeUsers',
      // @ts-expect-error
      usernameFirst, usernameSecond, usernameThird);
    }
    const usernameString = usernames.slice(0, 3).join(', ');
    return _message.default.format('dxChat-typingMessageMultipleUsers',
    // @ts-expect-error
    usernameString);
  }
  _updateText() {
    var _this$_$text;
    const value = this._getText();
    (_this$_$text = this._$text) === null || _this$_$text === void 0 || _this$_$text.text(value);
  }
  _processTypingUsersUpdating(previousValue) {
    const {
      typingUsers
    } = this.option();
    if (previousValue !== null && previousValue !== void 0 && previousValue.length && typingUsers !== null && typingUsers !== void 0 && typingUsers.length) {
      this._updateText();
      return;
    }
    if (typingUsers !== null && typingUsers !== void 0 && typingUsers.length) {
      this._renderContent();
      return;
    }
    this._cleanContent();
  }
  _cleanContent() {
    this.$element().empty();
  }
  _optionChanged(args) {
    const {
      name,
      previousValue
    } = args;
    switch (name) {
      case 'typingUsers':
        this._processTypingUsersUpdating(previousValue ?? []);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = TypingIndicator;