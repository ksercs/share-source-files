import _extends from "@babel/runtime/helpers/esm/extends";
import { normalizeKeyName } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import $ from '../../../core/renderer';
import { getOuterWidth, getWidth } from '../../../core/utils/size';
import { getWindow } from '../../../core/utils/window';
import TextEditor from '../../ui/text_box/m_text_editor.mask';
// STYLE textBox
const window = getWindow();
const ignoreKeys = ['backspace', 'tab', 'enter', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'rightArrow', 'downArrow', 'upArrow', 'del'];
const TEXTBOX_CLASS = 'dx-textbox';
const SEARCHBOX_CLASS = 'dx-searchbox';
const ICON_CLASS = 'dx-icon';
const SEARCH_ICON_CLASS = 'dx-icon-search';
class TextBox extends TextEditor {
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
    const $searchIcon = $('<div>').addClass(ICON_CLASS).addClass(SEARCH_ICON_CLASS);
    $searchIcon.prependTo(this._input().parent());
    this._$searchIcon = $searchIcon;
  }
  _getLabelContainerWidth() {
    if (this._$searchIcon) {
      const $inputContainer = this._input().parent();
      return getWidth($inputContainer) - this._getLabelBeforeWidth();
    }
    return super._getLabelContainerWidth();
  }
  _getLabelBeforeWidth() {
    let labelBeforeWidth = super._getLabelBeforeWidth();
    if (this._$searchIcon) {
      labelBeforeWidth += getOuterWidth(this._$searchIcon);
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
      const $input = $(e.target);
      const key = normalizeKeyName(e);
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
    const $input = $(e.target);
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
registerComponent('dxTextBox', TextBox);
export default TextBox;