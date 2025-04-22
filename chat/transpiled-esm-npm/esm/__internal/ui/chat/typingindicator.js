import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import DOMComponent from '../../core/widget/dom_component';
const CHAT_TYPINGINDICATOR_CLASS = 'dx-chat-typingindicator';
const CHAT_TYPINGINDICATOR_CONTENT_CLASS = 'dx-chat-typingindicator-content';
const CHAT_TYPINGINDICATOR_TEXT_CLASS = 'dx-chat-typingindicator-text';
const CHAT_TYPINGINDICATOR_BUBBLE_CLASS = 'dx-chat-typingindicator-bubble';
const CHAT_TYPINGINDICATOR_CIRCLE_CLASS = 'dx-chat-typingindicator-circle';
class TypingIndicator extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      typingUsers: []
    });
  }
  _init() {
    super._init();
    $(this.element()).addClass(CHAT_TYPINGINDICATOR_CLASS);
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
    this._$content = $('<div>').addClass(CHAT_TYPINGINDICATOR_CONTENT_CLASS).appendTo(this.element());
  }
  _renderTextElement() {
    if (this._$content) {
      this._$text = $('<div>').addClass(CHAT_TYPINGINDICATOR_TEXT_CLASS).appendTo(this._$content);
    }
  }
  _renderBubble() {
    if (this._$content) {
      const $bubble = $('<div>').addClass(CHAT_TYPINGINDICATOR_BUBBLE_CLASS);
      new Array(3).fill(0).forEach(() => {
        $('<div>').addClass(CHAT_TYPINGINDICATOR_CIRCLE_CLASS).appendTo($bubble);
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
      const name = ((_user$name = user.name) === null || _user$name === void 0 ? void 0 : _user$name.trim()) || messageLocalization.format('dxChat-defaultUserName');
      return name;
    });
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 1) {
      const username = usernames[0];
      return messageLocalization.format('dxChat-typingMessageSingleUser',
      // @ts-expect-error
      username);
    }
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 2) {
      const [usernameFirst, usernameSecond] = usernames;
      return messageLocalization.format('dxChat-typingMessageTwoUsers',
      // @ts-expect-error
      usernameFirst, usernameSecond);
    }
    if ((usernames === null || usernames === void 0 ? void 0 : usernames.length) === 3) {
      const [usernameFirst, usernameSecond, usernameThird] = usernames;
      return messageLocalization.format('dxChat-typingMessageThreeUsers',
      // @ts-expect-error
      usernameFirst, usernameSecond, usernameThird);
    }
    const usernameString = usernames.slice(0, 3).join(', ');
    return messageLocalization.format('dxChat-typingMessageMultipleUsers',
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
export default TypingIndicator;