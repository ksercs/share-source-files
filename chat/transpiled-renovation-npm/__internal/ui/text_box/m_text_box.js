"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../../common/core/events/utils/index");
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _window = require("../../../core/utils/window");
var _m_text_editor = _interopRequireDefault(require("../../ui/text_box/m_text_editor.mask"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// STYLE textBox
const window = (0, _window.getWindow)();
const ignoreKeys = ['backspace', 'tab', 'enter', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'rightArrow', 'downArrow', 'upArrow', 'del'];
const TEXTBOX_CLASS = 'dx-textbox';
const SEARCHBOX_CLASS = 'dx-searchbox';
const ICON_CLASS = 'dx-icon';
const SEARCH_ICON_CLASS = 'dx-icon-search';
class TextBox extends _m_text_editor.default {
  ctor(element, options) {
    if (options) {
      this._showClearButton = options.showClearButton;
    }
    super.ctor(element, options);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      value: '',
      mode: 'text',
      maxLength: null
    });
  }
  _initMarkup() {
    this.$element().addClass(TEXTBOX_CLASS);
    super._initMarkup();
    this.setAria('role', 'textbox');
  }
  _renderInputType() {
    super._renderInputType();
    this._renderSearchMode();
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
  _renderProps() {
    super._renderProps();
    this._toggleMaxLengthProp();
  }
  _toggleMaxLengthProp() {
    const maxLength = this._getMaxLength();
    if (maxLength && maxLength > 0) {
      this._input().attr('maxLength', maxLength);
    } else {
      this._input().removeAttr('maxLength');
    }
  }
  _renderSearchMode() {
    const {
      mode
    } = this.option();
    if (mode === 'search') {
      this.$element().addClass(SEARCHBOX_CLASS);
      this._renderSearchIcon();
      if (this._showClearButton === undefined) {
        const {
          showClearButton
        } = this.option();
        this._showClearButton = showClearButton;
        this.option('showClearButton', true);
      }
    } else {
      this.$element().removeClass(SEARCHBOX_CLASS);
      if (this._$searchIcon) {
        this._$searchIcon.remove();
      }
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      this.option('showClearButton', this._showClearButton === undefined ? this.option('showClearButton') : this._showClearButton);
      delete this._showClearButton;
    }
  }
  _renderSearchIcon() {
    const $searchIcon = (0, _renderer.default)('<div>').addClass(ICON_CLASS).addClass(SEARCH_ICON_CLASS);
    $searchIcon.prependTo(this._input().parent());
    this._$searchIcon = $searchIcon;
  }
  _getLabelContainerWidth() {
    if (this._$searchIcon) {
      const $inputContainer = this._input().parent();
      return (0, _size.getWidth)($inputContainer) - this._getLabelBeforeWidth();
    }
    return super._getLabelContainerWidth();
  }
  _getLabelBeforeWidth() {
    let labelBeforeWidth = super._getLabelBeforeWidth();
    if (this._$searchIcon) {
      labelBeforeWidth += (0, _size.getOuterWidth)(this._$searchIcon);
    }
    return labelBeforeWidth;
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'maxLength':
        this._toggleMaxLengthProp();
        break;
      case 'mode':
        super._optionChanged(args);
        this._updateLabelWidth();
        break;
      case 'mask':
        super._optionChanged(args);
        this._toggleMaxLengthProp();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _onKeyDownCutOffHandler(e) {
    const actualMaxLength = this._getMaxLength();
    if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
      const $input = (0, _renderer.default)(e.target);
      const key = (0, _index.normalizeKeyName)(e);
      this._cutOffExtraChar($input);
      return $input.val().length < actualMaxLength
      // @ts-expect-error ts-error
      || ignoreKeys.includes(key)
      // @ts-expect-error ts-error
      || window.getSelection().toString() !== '';
    }
    return true;
  }
  _onChangeCutOffHandler(e) {
    const $input = (0, _renderer.default)(e.target);
    if (this.option('maxLength')) {
      this._cutOffExtraChar($input);
    }
  }
  _cutOffExtraChar($input) {
    const actualMaxLength = this._getMaxLength();
    const textInput = $input.val();
    if (actualMaxLength && textInput.length > actualMaxLength) {
      // @ts-expect-error ts-error
      $input.val(textInput.substr(0, actualMaxLength));
    }
  }
  _getMaxLength() {
    const {
      mask,
      maxLength
    } = this.option();
    const isMaskSpecified = !!mask;
    // @ts-expect-error ts-error
    return isMaskSpecified ? null : maxLength;
  }
}
(0, _component_registrator.default)('dxTextBox', TextBox);
var _default = exports.default = TextBox;