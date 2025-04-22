import _extends from "@babel/runtime/helpers/esm/extends";
import dateLocalization from '../../../common/core/localization/date';
import messageLocalization from '../../../common/core/localization/message';
import $ from '../../../core/renderer';
import dateSerialization from '../../../core/utils/date_serialization';
import { isDate } from '../../../core/utils/type';
import Widget from '../../core/widget/widget';
import Avatar from './avatar';
import MessageBubble from './messagebubble';
export const MESSAGE_DATA_KEY = 'dxMessageData';
export const CHAT_MESSAGEGROUP_CLASS = 'dx-chat-messagegroup';
export const CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS = 'dx-chat-messagegroup-alignment-start';
export const CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS = 'dx-chat-messagegroup-alignment-end';
const CHAT_MESSAGEGROUP_INFORMATION_CLASS = 'dx-chat-messagegroup-information';
const CHAT_MESSAGEGROUP_TIME_CLASS = 'dx-chat-messagegroup-time';
const CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS = 'dx-chat-messagegroup-author-name';
const CHAT_MESSAGEGROUP_CONTENT_CLASS = 'dx-chat-messagegroup-content';
class MessageGroup extends Widget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      items: [],
      alignment: 'start',
      showAvatar: true,
      showUserName: true,
      showMessageTimestamp: true,
      messageTemplate: null,
      messageTimestampFormat: 'shorttime'
    });
  }
  _updateAlignmentClass() {
    const {
      alignment
    } = this.option();
    $(this.element()).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS).removeClass(CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS);
    const alignmentClass = alignment === 'start' ? CHAT_MESSAGEGROUP_ALIGNMENT_START_CLASS : CHAT_MESSAGEGROUP_ALIGNMENT_END_CLASS;
    $(this.element()).addClass(alignmentClass);
  }
  _initMarkup() {
    const {
      alignment,
      items,
      showAvatar
    } = this.option();
    $(this.element()).addClass(CHAT_MESSAGEGROUP_CLASS);
    this._updateAlignmentClass();
    super._initMarkup();
    if (items.length === 0) {
      return;
    }
    if (showAvatar && alignment === 'start') {
      this._renderAvatar();
    }
    this._renderMessageGroupInformation(items === null || items === void 0 ? void 0 : items[0]);
    this._renderMessageBubbles(items);
  }
  _renderAvatar() {
    const $avatar = $('<div>').appendTo(this.element());
    const {
      items
    } = this.option();
    const {
      author
    } = items[0];
    const authorName = author === null || author === void 0 ? void 0 : author.name;
    const authorAvatarUrl = author === null || author === void 0 ? void 0 : author.avatarUrl;
    const authorAvatarAlt = author === null || author === void 0 ? void 0 : author.avatarAlt;
    this._avatar = this._createComponent($avatar, Avatar, {
      name: authorName,
      url: authorAvatarUrl,
      alt: authorAvatarAlt
    });
  }
  _renderMessageBubble(message) {
    const $bubble = $('<div>').data(MESSAGE_DATA_KEY, message);
    this._createComponent($bubble, MessageBubble, this._getMessageBubbleOptions(message));
    this._$messageBubbleContainer.append($bubble);
  }
  _getMessageBubbleOptions(message) {
    const options = {
      text: message.text
    };
    const {
      messageTemplate
    } = this.option();
    if (messageTemplate) {
      options.template = (text, container) => {
        messageTemplate(_extends({}, message, {
          text
        }), container);
      };
    }
    return options;
  }
  _renderMessageBubbles(items) {
    this._$messageBubbleContainer = $('<div>').addClass(CHAT_MESSAGEGROUP_CONTENT_CLASS);
    items.forEach(message => {
      this._renderMessageBubble(message);
    });
    this._$messageBubbleContainer.appendTo(this.element());
  }
  _renderMessageGroupInformation(message) {
    const {
      alignment,
      showUserName,
      showMessageTimestamp
    } = this.option();
    const {
      timestamp,
      author
    } = message;
    const $information = $('<div>').addClass(CHAT_MESSAGEGROUP_INFORMATION_CLASS);
    if (showUserName) {
      const authorName = (author === null || author === void 0 ? void 0 : author.name) ?? messageLocalization.format('dxChat-defaultUserName');
      const authorNameText = alignment === 'start' ? authorName : '';
      $('<div>').addClass(CHAT_MESSAGEGROUP_AUTHOR_NAME_CLASS).text(authorNameText).appendTo($information);
    }
    if (showMessageTimestamp) {
      const $time = $('<div>').addClass(CHAT_MESSAGEGROUP_TIME_CLASS).appendTo($information);
      const shouldAddTimeValue = this._shouldAddTimeValue(timestamp);
      if (shouldAddTimeValue) {
        const timeValue = this._getTimeValue(timestamp);
        $time.text(timeValue);
      }
    }
    $information.appendTo(this.element());
  }
  _shouldAddTimeValue(timestamp) {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);
    return isDate(deserializedDate) && !isNaN(deserializedDate.getTime());
  }
  _getTimeValue(timestamp) {
    const deserializedDate = dateSerialization.deserializeDate(timestamp);
    const {
      messageTimestampFormat
    } = this.option();
    const formattedTime = dateLocalization.format(deserializedDate, messageTimestampFormat);
    return formattedTime;
  }
  _clean() {
    this._lastBubble = null;
    super._clean();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'items':
      case 'alignment':
      case 'showAvatar':
      case 'showUserName':
      case 'showMessageTimestamp':
      case 'messageTemplate':
      case 'messageTimestampFormat':
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  renderMessage(message) {
    const {
      items
    } = this.option();
    const newItems = [...items, message];
    this._setOptionWithoutOptionChange('items', newItems);
    this._renderMessageBubble(message);
  }
}
export default MessageGroup;