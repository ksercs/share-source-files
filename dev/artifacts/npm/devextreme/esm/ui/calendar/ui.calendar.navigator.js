/**
* DevExtreme (esm/ui/calendar/ui.calendar.navigator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import Widget from '../widget/ui.widget';
import Button from '../button';
import { isMaterial } from '../themes';
var CALENDAR_NAVIGATOR_CLASS = 'dx-calendar-navigator';
var CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS = 'dx-calendar-navigator-previous-month';
var CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS = 'dx-calendar-navigator-next-month';
var CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS = 'dx-calendar-navigator-previous-view';
var CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS = 'dx-calendar-navigator-next-view';
var CALENDAR_NAVIGATOR_DISABLED_LINK_CLASS = 'dx-calendar-disabled-navigator-link';
var CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS = 'dx-calendar-caption-button';
var BUTTON_TEXT_CLASS = 'dx-button-text';
class Navigator extends Widget {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      onClick: null,
      onCaptionClick: null,
      type: 'normal',
      stylingMode: 'outlined',
      text: ''
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: function device() {
        return isMaterial();
      },
      options: {
        type: 'default',
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
    this.$element().addClass(CALENDAR_NAVIGATOR_CLASS);
    this._renderButtons();
    this._renderCaption();
  }
  _renderButtons() {
    var {
      rtlEnabled,
      type,
      stylingMode,
      focusStateEnabled
    } = this.option();
    var direction = 1;
    this._prevButton = this._createComponent($('<div>'), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronright' : 'chevronleft',
      onClick: e => {
        this._clickAction({
          direction: -direction,
          event: e
        });
      },
      type,
      stylingMode,
      integrationOptions: {}
    });
    var $prevButton = this._prevButton.$element().addClass(CALENDAR_NAVIGATOR_PREVIOUS_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_PREVIOUS_MONTH_CLASS);
    this._nextButton = this._createComponent($('<div>'), Button, {
      focusStateEnabled,
      icon: rtlEnabled ? 'chevronleft' : 'chevronright',
      onClick: e => {
        this._clickAction({
          direction: direction,
          event: e
        });
      },
      type,
      stylingMode,
      integrationOptions: {}
    });
    var $nextButton = this._nextButton.$element().addClass(CALENDAR_NAVIGATOR_NEXT_VIEW_CLASS).addClass(CALENDAR_NAVIGATOR_NEXT_MONTH_CLASS);
    this._caption = this._createComponent($('<div>').addClass(CALENDAR_NAVIGATOR_CAPTION_BUTTON_CLASS), Button, {
      focusStateEnabled,
      onClick: e => {
        this._captionClickAction({
          event: e
        });
      },
      type,
      stylingMode,
      template: (_, content) => {
        var {
          text
        } = this.option();
        var captionSeparator = ' - ';
        var viewCaptionTexts = text.split(captionSeparator);
        viewCaptionTexts.forEach(captionText => {
          $(content).append($('<span>').addClass(BUTTON_TEXT_CLASS).text(captionText));
        });
      },
      integrationOptions: {}
    });
    var $caption = this._caption.$element();
    this.$element().append($prevButton, $caption, $nextButton);
  }
  _renderCaption() {
    this._caption.option('text', this.option('text'));
  }
  toggleButton(buttonPrefix, value) {
    var buttonName = '_' + buttonPrefix + 'Button';
    var button = this[buttonName];
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
export default Navigator;
