/**
* DevExtreme (cjs/__internal/ui/calendar/m_calendar.navigator.js)
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
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _button = _interopRequireDefault(require("../../../ui/button"));
var _themes = require("../../../ui/themes");
var _widget = _interopRequireDefault(require("../../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CALENDAR_NAVIGATOR_CLASS = 'dx-calendar-navigator';
const CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS = 'dx-calendar-navigator-previous-month';
const CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS = 'dx-calendar-navigator-next-month';
const CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS = 'dx-calendar-navigator-previous-view';
const CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS = 'dx-calendar-navigator-next-view';
const CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS = 'dx-calendar-disabled-navigator-link';
const CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS = 'dx-calendar-caption-button';
const BUTTON_TEXT_CLASS = 'dx-button-text';
class Navigator extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      onClick: undefined,
      onCaptionClick: undefined,
      type: 'normal',
      stylingMode: 'outlined',
      text: ''
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        // @ts-expect-error
        return (0, _themes.isMaterial)();
      },
      options: {
        type: 'default',
        stylingMode: 'text'
      }
    }, {
      device() {
        // @ts-expect-error
        return (0, _themes.isFluent)();
      },
      options: {
        type: 'normal',
        stylingMode: 'text'
      }
    }]);
  }
  _init() {
    super._init();
    this._initActions();
  }
  _initActions() {
    this._clickAction = this._createActionByOption('onClick');
    this._captionClickAction = this._createActionByOption('onCaptionClick');
  }
  _initMarkup() {
    super._initMarkup();
    (0, _renderer.default)(this.element()).addClass(CALENDAR_NAVIGATOR_CLASS);
    this._renderButtons();
    this._renderCaption();
  }
  _renderButtons() {
    const {
      rtlEnabled,
      type,
      stylingMode,
      focusStateEnabled
    } = this.option();
    const direction = 1;
    this._prevButton = this._createComponent((0, _renderer.default)('<div>'), _button.default, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronright' : 'chevronleft',
      onClick: e => {
        var _this$_clickAction;
        (_this$_clickAction = this._clickAction) === null || _this$_clickAction === void 0 || _this$_clickAction.call(this, {
          direction: -direction,
          event: e
        });
      },
      type,
      stylingMode,
      integrationOptions: {}
    });
    const $prevButton = (0, _renderer.default)(this._prevButton.element()).addClass(CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS);
    this._nextButton = this._createComponent((0, _renderer.default)('<div>'), _button.default, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronleft' : 'chevronright',
      onClick: e => {
        var _this$_clickAction2;
        (_this$_clickAction2 = this._clickAction) === null || _this$_clickAction2 === void 0 || _this$_clickAction2.call(this, {
          direction,
          event: e
        });
      },
      type,
      stylingMode,
      integrationOptions: {}
    });
    const $nextButton = (0, _renderer.default)(this._nextButton.element()).addClass(CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS);
    this._caption = this._createComponent((0, _renderer.default)('<div>').addClass(CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS), _button.default, {
      focusStateEnabled,
      onClick: e => {
        var _this$_captionClickAc;
        (_this$_captionClickAc = this._captionClickAction) === null || _this$_captionClickAc === void 0 || _this$_captionClickAc.call(this, {
          event: e
        });
      },
      type,
      stylingMode,
      template: (_, content) => {
        const {
          text
        } = this.option();
        const captionSeparator = ' - ';
        const viewCaptionTexts = text.split(captionSeparator);
        viewCaptionTexts.forEach(captionText => {
          (0, _renderer.default)(content).append((0, _renderer.default)('<span>').addClass(BUTTON_TEXT_CLASS).text(captionText));
        });
      },
      integrationOptions: {}
    });
    const $caption = this._caption.$element();
    this.$element().append($prevButton).append($caption).append($nextButton);
  }
  _renderCaption() {
    var _this$_caption;
    const {
      text
    } = this.option();
    (_this$_caption = this._caption) === null || _this$_caption === void 0 || _this$_caption.option('text', text);
  }
  toggleButton(buttonPrefix, value) {
    const buttonName = `_${buttonPrefix}Button`;
    const button = this[buttonName];
    if (button) {
      button.option('disabled', value);
      button.$element().toggleClass(CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS, value);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'text':
        this._renderCaption();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
var _default = exports.default = Navigator;
