/**
* DevExtreme (cjs/ui/text_box/text_box.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _extend = require("../../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("./ui.text_editor"));
var _index = require("../../events/utils/index");
var _size = require("../../core/utils/size");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
// STYLE textBox

var ignoreKeys = ['backspace', 'tab', 'enter', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'rightArrow', 'downArrow', 'upArrow', 'del'];
var TEXTBOX_CLASS = 'dx-textbox';
var SEARCHBOX_CLASS = 'dx-searchbox';
var ICON_CLASS = 'dx-icon';
var SEARCH_ICON_CLASS = 'dx-icon-search';
var TextBox = _ui.default.inherit({
  ctor: function ctor(element, options) {
    if (options) {
      this._showClearButton = options.showClearButton;
    }
    this.callBase.apply(this, arguments);
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      value: '',
      mode: 'text',
      maxLength: null
    });
  },
  _initMarkup: function _initMarkup() {
    this.$element().addClass(TEXTBOX_CLASS);
    this.callBase();
    this.setAria('role', 'textbox');
  },
  _renderInputType: function _renderInputType() {
    this.callBase();
    this._renderSearchMode();
  },
  _useTemplates: function _useTemplates() {
    return false;
  },
  _renderProps: function _renderProps() {
    this.callBase();
    this._toggleMaxLengthProp();
  },
  _toggleMaxLengthProp: function _toggleMaxLengthProp() {
    var maxLength = this._getMaxLength();
    if (maxLength && maxLength > 0) {
      this._input().attr('maxLength', maxLength);
    } else {
      this._input().removeAttr('maxLength');
    }
  },
  _renderSearchMode: function _renderSearchMode() {
    var $element = this._$element;
    if (this.option('mode') === 'search') {
      $element.addClass(SEARCHBOX_CLASS);
      this._renderSearchIcon();
      if (this._showClearButton === undefined) {
        this._showClearButton = this.option('showClearButton');
        this.option('showClearButton', true);
      }
    } else {
      $element.removeClass(SEARCHBOX_CLASS);
      this._$searchIcon && this._$searchIcon.remove();
      this.option('showClearButton', this._showClearButton === undefined ? this.option('showClearButton') : this._showClearButton);
      delete this._showClearButton;
    }
  },
  _renderSearchIcon: function _renderSearchIcon() {
    var $searchIcon = (0, _renderer.default)('<div>').addClass(ICON_CLASS).addClass(SEARCH_ICON_CLASS);
    $searchIcon.prependTo(this._input().parent());
    this._$searchIcon = $searchIcon;
  },
  _getLabelContainerWidth: function _getLabelContainerWidth() {
    if (this._$searchIcon) {
      var $inputContainer = this._input().parent();
      return (0, _size.getWidth)($inputContainer) - this._getLabelBeforeWidth();
    }
    return this.callBase();
  },
  _getLabelBeforeWidth: function _getLabelBeforeWidth() {
    var labelBeforeWidth = this.callBase();
    if (this._$searchIcon) {
      labelBeforeWidth += (0, _size.getOuterWidth)(this._$searchIcon);
    }
    return labelBeforeWidth;
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'maxLength':
        this._toggleMaxLengthProp();
        break;
      case 'mode':
        this.callBase(args);
        this._updateLabelWidth();
        break;
      case 'mask':
        this.callBase(args);
        this._toggleMaxLengthProp();
        break;
      default:
        this.callBase(args);
    }
  },
  _onKeyDownCutOffHandler: function _onKeyDownCutOffHandler(e) {
    var actualMaxLength = this._getMaxLength();
    if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
      var $input = (0, _renderer.default)(e.target);
      var key = (0, _index.normalizeKeyName)(e);
      this._cutOffExtraChar($input);
      return $input.val().length < actualMaxLength || ignoreKeys.includes(key) || window.getSelection().toString() !== '';
    } else {
      return true;
    }
  },
  _onChangeCutOffHandler: function _onChangeCutOffHandler(e) {
    var $input = (0, _renderer.default)(e.target);
    if (this.option('maxLength')) {
      this._cutOffExtraChar($input);
    }
  },
  _cutOffExtraChar: function _cutOffExtraChar($input) {
    var actualMaxLength = this._getMaxLength();
    var textInput = $input.val();
    if (actualMaxLength && textInput.length > actualMaxLength) {
      $input.val(textInput.substr(0, actualMaxLength));
    }
  },
  _getMaxLength: function _getMaxLength() {
    var isMaskSpecified = !!this.option('mask');
    return isMaskSpecified ? null : this.option('maxLength');
  }
});
(0, _component_registrator.default)('dxTextBox', TextBox);
var _default = TextBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
