"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../common");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _data_helper = _interopRequireDefault(require("../../../data_helper"));
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
var _alertlist = _interopRequireDefault(require("../../ui/chat/alertlist"));
var _messagebox = _interopRequireDefault(require("../../ui/chat/messagebox"));
var _messagelist = _interopRequireDefault(require("../../ui/chat/messagelist"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHAT_CLASS = 'dx-chat';
const TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
class Chat extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      showDayHeaders: true,
      activeStateEnabled: true,
      editing: {
        allowUpdating: false,
        allowDeleting: false
      },
      focusStateEnabled: true,
      hoverStateEnabled: true,
      items: [],
      dataSource: null,
      user: {
        id: new _common.Guid().toString()
      },
      dayHeaderFormat: 'shortdate',
      messageTemplate: null,
      messageTimestampFormat: 'shorttime',
      alerts: [],
      showAvatar: true,
      showUserName: true,
      showMessageTimestamp: true,
      typingUsers: [],
      onMessageEntered: undefined,
      reloadOnChange: true,
      onTypingStart: undefined,
      onTypingEnd: undefined
    });
  }
  _init() {
    super._init();
    // @ts-expect-error
    this._initDataController();
    // @ts-expect-error
    this._refreshDataSource();
    this._createMessageEnteredAction();
    this._createTypingStartAction();
    this._createTypingEndAction();
  }
  _dataSourceLoadErrorHandler() {
    this.option('items', []);
  }
  _dataSourceChangedHandler(newItems, e) {
    if (e !== null && e !== void 0 && e.changes) {
      this._messageList._modifyByChanges(e.changes);
      this._setOptionWithoutOptionChange('items', newItems.slice());
      this._messageList._setOptionWithoutOptionChange('items', newItems.slice());
      this._messageList._toggleEmptyView();
    } else {
      this.option('items', newItems.slice());
    }
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    var _this$_messageList;
    (_this$_messageList = this._messageList) === null || _this$_messageList === void 0 || _this$_messageList.option('isLoading', isLoading);
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _initMarkup() {
    (0, _renderer.default)(this.element()).addClass(CHAT_CLASS);
    super._initMarkup();
    this._renderMessageList();
    this._renderAlertList();
    this._renderMessageBox();
    this._updateRootAria();
    this._updateMessageBoxAria();
  }
  _renderMessageList() {
    const $messageList = (0, _renderer.default)('<div>');
    this.$element().append($messageList);
    this._messageList = this._createComponent($messageList, _messagelist.default, this._getMessageListOptions());
  }
  _getMessageListOptions() {
    const {
      items = [],
      user,
      showDayHeaders = false,
      showAvatar = false,
      showUserName = false,
      showMessageTimestamp = false,
      dayHeaderFormat,
      messageTimestampFormat,
      typingUsers = []
    } = this.option();
    // @ts-expect-error
    const isLoading = this._dataController.isLoading();
    const currentUserId = user === null || user === void 0 ? void 0 : user.id;
    const options = {
      items,
      currentUserId,
      allowUpdating: message => this._allowEditAction(message),
      allowDeleting: message => this._allowDeleteAction(message),
      messageTemplate: this._getMessageTemplate(),
      showDayHeaders,
      showAvatar,
      showUserName,
      showMessageTimestamp,
      dayHeaderFormat,
      messageTimestampFormat,
      typingUsers,
      isLoading,
      onMessageEditingStart: () => {
        console.log('onMessageEditingStart');
      },
      onMessageDeleting: () => {
        console.log('onMessageDeleting');
      }
    };
    return options;
  }
  _allowEditAction(message) {
    const {
      editing
    } = this.option();
    const {
      allowUpdating
    } = editing;
    if (typeof allowUpdating === 'function') {
      return allowUpdating({
        component: this,
        message
      });
    }
    return allowUpdating;
  }
  _allowDeleteAction(message) {
    const {
      editing
    } = this.option();
    const {
      allowDeleting
    } = editing;
    if (typeof allowDeleting === 'function') {
      return allowDeleting({
        component: this,
        message
      });
    }
    return allowDeleting;
  }
  _getMessageTemplate() {
    const {
      messageTemplate
    } = this.option();
    if (messageTemplate) {
      return (message, $container) => {
        const template = this._getTemplateByOption('messageTemplate');
        template.render({
          container: $container,
          model: {
            component: this,
            message
          }
        });
      };
    }
    return null;
  }
  _renderAlertList() {
    const $errors = (0, _renderer.default)('<div>');
    this.$element().append($errors);
    const {
      alerts = []
    } = this.option();
    this._alertList = this._createComponent($errors, _alertlist.default, {
      items: alerts
    });
  }
  _renderMessageBox() {
    const {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.option();
    const $messageBox = (0, _renderer.default)('<div>');
    this.$element().append($messageBox);
    const configuration = {
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled,
      onMessageEntered: e => {
        this._messageEnteredHandler(e);
      },
      onTypingStart: e => {
        this._typingStartHandler(e);
      },
      onTypingEnd: () => {
        this._typingEndHandler();
      }
    };
    this._messageBox = this._createComponent($messageBox, _messagebox.default, configuration);
  }
  _updateRootAria() {
    const aria = {
      role: 'group',
      label: _message.default.format('dxChat-elementAriaLabel')
    };
    this.setAria(aria, this.$element());
  }
  _updateMessageBoxAria() {
    const emptyViewId = this._messageList.getEmptyViewId();
    this._messageBox.updateInputAria(emptyViewId);
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
  _messageEnteredHandler(e) {
    var _this$_messageEntered;
    const {
      text,
      event
    } = e;
    const {
      user
    } = this.option();
    const message = {
      timestamp: new Date(),
      author: user,
      text
    };
    // @ts-expect-error
    const dataSource = this.getDataSource();
    if ((0, _type.isDefined)(dataSource)) {
      dataSource.store().insert(message).done(() => {
        const {
          reloadOnChange
        } = this.option();
        if (reloadOnChange) {
          dataSource.reload();
        }
      });
    }
    (_this$_messageEntered = this._messageEnteredAction) === null || _this$_messageEntered === void 0 || _this$_messageEntered.call(this, {
      message,
      event
    });
  }
  _typingStartHandler(e) {
    var _this$_typingStartAct;
    const {
      event
    } = e;
    const {
      user
    } = this.option();
    (_this$_typingStartAct = this._typingStartAction) === null || _this$_typingStartAct === void 0 || _this$_typingStartAct.call(this, {
      user,
      event
    });
  }
  _typingEndHandler() {
    var _this$_typingEndActio;
    const {
      user
    } = this.option();
    (_this$_typingEndActio = this._typingEndAction) === null || _this$_typingEndActio === void 0 || _this$_typingEndActio.call(this, {
      user
    });
  }
  _focusTarget() {
    const $input = (0, _renderer.default)(this.element()).find(`.${TEXTEDITOR_INPUT_CLASS}`);
    return $input;
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
        this._messageBox.option(name, value);
        break;
      case 'user':
        {
          const author = value;
          this._messageList.option('currentUserId', author === null || author === void 0 ? void 0 : author.id);
          break;
        }
      case 'editing':
        break;
      case 'items':
        this._messageList.option(name, value);
        this._updateMessageBoxAria();
        break;
      case 'dataSource':
        // @ts-expect-error
        this._refreshDataSource();
        break;
      case 'alerts':
        this._alertList.option('items', value ?? []);
        break;
      case 'onMessageEntered':
        this._createMessageEnteredAction();
        break;
      case 'onTypingStart':
        this._createTypingStartAction();
        break;
      case 'onTypingEnd':
        this._createTypingEndAction();
        break;
      case 'showDayHeaders':
      case 'showAvatar':
      case 'showUserName':
      case 'showMessageTimestamp':
        this._messageList.option(name, !!value);
        break;
      case 'dayHeaderFormat':
      case 'messageTimestampFormat':
      case 'typingUsers':
        this._messageList.option(name, value);
        break;
      case 'messageTemplate':
        this._messageList.option(name, this._getMessageTemplate());
        break;
      case 'reloadOnChange':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _insertNewItem(item) {
    const {
      items
    } = this.option();
    const newItems = [...(items ?? []), item];
    this.option('items', newItems);
  }
  renderMessage() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._insertNewItem(message);
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Chat.include(_data_helper.default);
(0, _component_registrator.default)('dxChat', Chat);
var _default = exports.default = Chat;