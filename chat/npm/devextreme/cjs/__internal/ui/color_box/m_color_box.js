/**
* DevExtreme (cjs/__internal/ui/color_box/m_color_box.js)
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
var _color = _interopRequireDefault(require("../../../color"));
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _m_drop_down_editor = _interopRequireDefault(require("../../ui/drop_down_editor/m_drop_down_editor"));
var _m_color_view = _interopRequireDefault(require("./m_color_view"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const COLOR_BOX_CLASS = 'dx-colorbox';
const COLOR_BOX_INPUT_CLASS = `${COLOR_BOX_CLASS}-input`;
const COLOR_BOX_INPUT_CONTAINER_CLASS = `${COLOR_BOX_INPUT_CLASS}-container`;
const COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = `${COLOR_BOX_CLASS}-color-result-preview`;
const COLOR_BOX_COLOR_IS_NOT_DEFINED = `${COLOR_BOX_CLASS}-color-is-not-defined`;
const COLOR_BOX_OVERLAY_CLASS = `${COLOR_BOX_CLASS}-overlay`;
const COLOR_BOX_CONTAINER_CELL_CLASS = 'dx-colorview-container-cell';
const COLOR_BOX_BUTTON_CELL_CLASS = 'dx-colorview-button-cell';
const COLOR_BOX_BUTTONS_CONTAINER_CLASS = 'dx-colorview-buttons-container';
const COLOR_BOX_APPLY_BUTTON_CLASS = 'dx-colorview-apply-button';
const COLOR_BOX_CANCEL_BUTTON_CLASS = 'dx-colorview-cancel-button';
const colorEditorPrototype = _m_color_view.default.prototype;
const colorUtils = {
  makeTransparentBackground: colorEditorPrototype._makeTransparentBackground.bind(colorEditorPrototype),
  makeRgba: colorEditorPrototype._makeRgba.bind(colorEditorPrototype)
};
class ColorBox extends _m_drop_down_editor.default {
  _supportedKeys() {
    // @ts-expect-error ts-error
    const arrowHandler = function (e) {
      e.stopPropagation();
      if (this.option('opened')) {
        e.preventDefault();
        return true;
      }
    };
    const upArrowHandler = function (e) {
      if (!this.option('opened')) {
        e.preventDefault();
        return false;
      }
      if (e.altKey) {
        this.close();
        return false;
      }
      return true;
    };
    const downArrowHandler = function (e) {
      if (!this.option('opened') && !e.altKey) {
        e.preventDefault();
        return false;
      }
      if (!this.option('opened') && e.altKey) {
        this._validatedOpening();
        return false;
      }
      return true;
    };
    return _extends({}, super._supportedKeys(), {
      enter: this._enterKeyHandler,
      leftArrow: arrowHandler,
      rightArrow: arrowHandler,
      upArrow: upArrowHandler,
      downArrow: downArrowHandler
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      editAlphaChannel: false,
      applyValueMode: 'useButtons',
      keyStep: 1,
      // @ts-expect-error ts-error
      fieldTemplate: null,
      buttonsLocation: 'bottom after'
    });
  }
  _popupHidingHandler() {
    super._popupHidingHandler();
    const {
      applyValueMode
    } = this.option();
    if (applyValueMode === 'useButtons') {
      this._updateColorViewValue(this.option('value'));
    }
  }
  _popupConfig() {
    return _extends({}, super._popupConfig(), {
      width: ''
    });
  }
  _contentReadyHandler() {
    this._createColorView();
    this._addPopupBottomClasses();
  }
  _addPopupBottomClasses() {
    const $popupBottom = this._popup.bottomToolbar();
    if ($popupBottom) {
      $popupBottom.addClass(COLOR_BOX_CONTAINER_CELL_CLASS).addClass(COLOR_BOX_BUTTON_CELL_CLASS).find('.dx-toolbar-items-container').addClass(COLOR_BOX_BUTTONS_CONTAINER_CLASS);
      $popupBottom.find('.dx-popup-done').addClass(COLOR_BOX_APPLY_BUTTON_CLASS);
      $popupBottom.find('.dx-popup-cancel').addClass(COLOR_BOX_CANCEL_BUTTON_CLASS);
    }
  }
  _createColorView() {
    this._popup.$overlayContent().addClass(COLOR_BOX_OVERLAY_CLASS);
    const $colorView = (0, _renderer.default)('<div>').appendTo(this._popup.$content());
    this._colorView = this._createComponent($colorView, _m_color_view.default, this._colorViewConfig());
  }
  _applyNewColor(value) {
    this.option('value', value);
    if (value) {
      colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
    }
    if (this._colorViewEnterKeyPressed) {
      this.close();
      this._colorViewEnterKeyPressed = false;
    }
  }
  _colorViewConfig() {
    const {
      editAlphaChannel,
      value,
      applyValueMode,
      focusStateEnabled,
      stylingMode
    } = this.option();
    const that = this;
    return {
      value,
      matchValue: value,
      editAlphaChannel,
      applyValueMode,
      focusStateEnabled,
      stylingMode,
      target: this._input(),
      onEnterKeyPressed(_ref) {
        let {
          event
        } = _ref;
        that._colorViewEnterKeyPressed = true;
        if (that._colorView.option('value') !== that.option('value')) {
          that._saveValueChangeEvent(event);
          that._applyNewColor(that._colorView.option('value'));
          that.close();
        }
      },
      onValueChanged(_ref2) {
        let {
          event,
          value,
          previousValue
        } = _ref2;
        // @ts-expect-error ts-error
        const instantlyMode = that.option('applyValueMode') === 'instantly';
        const isOldValue = colorUtils.makeRgba(value) === previousValue;
        const changesApplied = instantlyMode || that._colorViewEnterKeyPressed;
        const valueCleared = that._shouldSaveEmptyValue;
        if (isOldValue || !changesApplied || valueCleared) {
          return;
        }
        if (event) {
          // @ts-expect-error ts-error
          that._saveValueChangeEvent(event);
        }
        that._applyNewColor(value);
      }
    };
  }
  _enterKeyHandler(e) {
    const newValue = this._input().val();
    const {
      value,
      editAlphaChannel
    } = this.option();
    const oldValue = value && editAlphaChannel ? colorUtils.makeRgba(value) : value;
    if (!newValue) return false;
    const color = new _color.default(newValue);
    if (color.colorIsInvalid) {
      this._input().val(oldValue);
      return;
    }
    // @ts-expect-error ts-error
    if (newValue !== oldValue) {
      this._applyColorFromInput(newValue);
      this._saveValueChangeEvent(e);
      this.option('value', this.option('editAlphaChannel') ? colorUtils.makeRgba(newValue) : newValue);
    }
    if (this._colorView) {
      const colorViewValue = this._colorView.option('value');
      if (value !== colorViewValue) {
        this._saveValueChangeEvent(e);
        this.option('value', colorViewValue);
      }
    }
    this.close();
    return false;
  }
  _applyButtonHandler(e) {
    this._saveValueChangeEvent(e.event);
    this._applyNewColor(this._colorView.option('value'));
    super._applyButtonHandler();
  }
  _cancelButtonHandler() {
    this._resetInputValue();
    super._cancelButtonHandler();
  }
  _getKeyboardListeners() {
    return super._getKeyboardListeners().concat([this._colorView]);
  }
  _init() {
    super._init();
  }
  _initMarkup() {
    this.$element().addClass(COLOR_BOX_CLASS);
    super._initMarkup();
  }
  _renderInput() {
    super._renderInput();
    this._input().addClass(COLOR_BOX_INPUT_CLASS);
    this._renderColorPreview();
  }
  _renderColorPreview() {
    this.$element().wrapInner((0, _renderer.default)('<div>').addClass(COLOR_BOX_INPUT_CONTAINER_CLASS));
    this._$colorBoxInputContainer = this.$element().children().eq(0);
    this._$colorResultPreview = (0, _renderer.default)('<div>').addClass(COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS).appendTo(this._$textEditorInputContainer);
    if (!this.option('value')) {
      this._$colorBoxInputContainer.addClass(COLOR_BOX_COLOR_IS_NOT_DEFINED);
    } else {
      colorUtils.makeTransparentBackground(this._$colorResultPreview, this.option('value'));
    }
  }
  _renderValue() {
    const {
      value,
      editAlphaChannel
    } = this.option();
    const shouldConvertToColor = value && editAlphaChannel;
    const text = shouldConvertToColor ? colorUtils.makeRgba(value) : value;
    this.option('text', text);
    return super._renderValue();
  }
  _resetInputValue() {
    const $input = this._input();
    const value = this.option('value');
    // @ts-expect-error ts-error
    $input.val(value);
    this._updateColorViewValue(value);
  }
  _updateColorViewValue(value) {
    if (this._colorView) {
      this._colorView.option({
        value,
        matchValue: value
      });
    }
  }
  _valueChangeEventHandler(e) {
    let value = this._input().val();
    if (value) {
      value = this._applyColorFromInput(value);
      this._updateColorViewValue(value);
    }
    super._valueChangeEventHandler(e, value);
  }
  _applyColorFromInput(value) {
    const {
      editAlphaChannel
    } = this.option();
    const newColor = new _color.default(value);
    if (newColor.colorIsInvalid) {
      this._resetInputValue();
      return this.option('value');
    }
    if (editAlphaChannel) {
      return colorUtils.makeRgba(value);
    }
    return value;
  }
  _clean() {
    super._clean();
    delete this._shouldSaveEmptyValue;
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'value':
        this._$colorBoxInputContainer.toggleClass(COLOR_BOX_COLOR_IS_NOT_DEFINED, !value);
        if (value) {
          colorUtils.makeTransparentBackground(this._$colorResultPreview, value);
        } else {
          this._$colorResultPreview.removeAttr('style');
        }
        if (value === null) {
          this._shouldSaveEmptyValue = true;
        }
        this._updateColorViewValue(value);
        this._shouldSaveEmptyValue = false;
        super._optionChanged(args);
        break;
      case 'applyButtonText':
      case 'cancelButtonText':
        super._optionChanged(args);
        this._popup && this._addPopupBottomClasses();
        break;
      case 'editAlphaChannel':
      case 'keyStep':
        if (this._colorView) {
          this._colorView.option(name, value);
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxColorBox', ColorBox);
var _default = exports.default = ColorBox;
