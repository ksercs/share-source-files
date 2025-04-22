/**
* DevExtreme (esm/__internal/ui/text_box/m_text_editor.base.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../../common/core/events/core/events_engine';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace, normalizeKeyName } from '../../../common/core/events/utils/index';
import config from '../../../core/config';
import devices from '../../../core/devices';
import domAdapter from '../../../core/dom_adapter';
import Guid from '../../../core/guid';
import $ from '../../../core/renderer';
import resizeObserverSingleton from '../../../core/resize_observer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { each } from '../../../core/utils/iterator';
import { getWidth } from '../../../core/utils/size';
import { isDefined } from '../../../core/utils/type';
import LoadIndicator from '../../../ui/load_indicator';
import { current, isFluent, isMaterial } from '../../../ui/themes';
import { focused } from '../../../ui/widget/selectors';
import errors from '../../../ui/widget/ui.errors';
import Editor from '../../ui/editor/editor';
import ClearButton from './m_text_editor.clear';
import { TextEditorLabel } from './m_text_editor.label';
import TextEditorButtonCollection from './texteditor_button_collection/m_index';
export const TEXTEDITOR_CLASS = 'dx-texteditor';
const TEXTEDITOR_INPUT_CONTAINER_CLASS = 'dx-texteditor-input-container';
export const TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
const TEXTEDITOR_INPUT_SELECTOR = `.${TEXTEDITOR_INPUT_CLASS}`;
const TEXTEDITOR_CONTAINER_CLASS = 'dx-texteditor-container';
const TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
const TEXTEDITOR_PLACEHOLDER_CLASS = 'dx-placeholder';
const TEXTEDITOR_EMPTY_INPUT_CLASS = 'dx-texteditor-empty';
const STATE_INVISIBLE_CLASS = 'dx-state-invisible';
const TEXTEDITOR_PENDING_INDICATOR_CLASS = 'dx-pending-indicator';
const TEXTEDITOR_VALIDATION_PENDING_CLASS = 'dx-validation-pending';
const TEXTEDITOR_VALID_CLASS = 'dx-valid';
const EVENTS_LIST = ['KeyDown', 'KeyPress', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input'];
const CONTROL_KEYS = ['tab', 'enter', 'shift', 'control', 'alt', 'escape', 'pageUp', 'pageDown', 'end', 'home', 'leftArrow', 'upArrow', 'rightArrow', 'downArrow'];
let TextEditorLabelCreator = TextEditorLabel;
function checkButtonsOptionType(buttons) {
  if (isDefined(buttons) && !Array.isArray(buttons)) {
    throw errors.Error('E1053');
  }
}
class TextEditorBase extends Editor {
  ctor(element, options) {
    if (options) {
      checkButtonsOptionType(options.buttons);
    }
    // @ts-expect-error
    this._buttonCollection = new TextEditorButtonCollection(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._labelContainerElement = null;
    super.ctor(element, options);
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      // eslint-disable-next-line no-void
      buttons: void 0,
      value: '',
      spellcheck: false,
      showClearButton: false,
      valueChangeEvent: 'change',
      placeholder: '',
      inputAttr: {},
      onFocusIn: null,
      onFocusOut: null,
      onKeyDown: null,
      onKeyUp: null,
      onChange: null,
      onInput: null,
      onCut: null,
      onCopy: null,
      onPaste: null,
      onEnterKey: null,
      mode: 'text',
      hoverStateEnabled: true,
      focusStateEnabled: true,
      text: undefined,
      displayValueFormatter(value) {
        // @ts-expect-error ts-error
        return isDefined(value) && value !== false ? value : '';
      },
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      stylingMode: config().editorStylingMode || 'outlined',
      showValidationMark: true,
      label: '',
      labelMode: 'static',
      labelMark: ''
    });
  }
  _defaultOptionsRules() {
    // @ts-expect-error
    return super._defaultOptionsRules().concat([{
      device() {
        const themeName = current();
        return isMaterial(themeName);
      },
      options: {
        labelMode: 'floating',
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        stylingMode: config().editorStylingMode || 'filled'
      }
    }, {
      device() {
        const themeName = current();
        return isFluent(themeName);
      },
      options: {
        labelMode: 'outside'
      }
    }]);
  }
  // eslint-disable-next-line class-methods-use-this
  _getDefaultButtons() {
    // @ts-expect-error ts-error
    return [{
      name: 'clear',
      Ctor: ClearButton
    }];
  }
  _isClearButtonVisible() {
    return this.option('showClearButton') && !this.option('readOnly');
  }
  _input() {
    return this.$element().find(TEXTEDITOR_INPUT_SELECTOR).first();
  }
  _isFocused() {
    return focused(this._input()) || super._isFocused();
  }
  _inputWrapper() {
    return this.$element();
  }
  _buttonsContainer() {
    return this._inputWrapper().find(`.${TEXTEDITOR_BUTTONS_CONTAINER_CLASS}`).eq(0);
  }
  // eslint-disable-next-line class-methods-use-this
  _isControlKey(key) {
    return CONTROL_KEYS.includes(key);
  }
  _renderStylingMode() {
    super._renderStylingMode();
    const {
      stylingMode
    } = this.option();
    this._updateButtonsStyling(stylingMode);
  }
  _initMarkup() {
    this.$element().addClass(TEXTEDITOR_CLASS);
    this._renderInput();
    this._renderButtonContainers();
    this._renderStylingMode();
    this._renderInputType();
    this._renderPlaceholder();
    this._renderProps();
    super._initMarkup();
    this._renderValue();
    this._renderLabel();
  }
  _render() {
    super._render();
    this._refreshValueChangeEvent();
    this._refreshEvents();
    this._renderEnterKeyAction();
    this._renderEmptinessEvent();
  }
  _renderInput() {
    this._$textEditorContainer = $('<div>').addClass(TEXTEDITOR_CONTAINER_CLASS).appendTo(this.$element());
    this._$textEditorInputContainer = $('<div>').addClass(TEXTEDITOR_INPUT_CONTAINER_CLASS).appendTo(this._$textEditorContainer);
    this._$textEditorInputContainer.append(this._createInput());
  }
  _getInputContainer() {
    return this._$textEditorInputContainer;
  }
  _renderPendingIndicator() {
    this.$element().addClass(TEXTEDITOR_VALIDATION_PENDING_CLASS);
    const $inputContainer = this._getInputContainer();
    const $indicatorElement = $('<div>').addClass(TEXTEDITOR_PENDING_INDICATOR_CLASS).appendTo($inputContainer);
    this._pendingIndicator = this._createComponent($indicatorElement, LoadIndicator);
  }
  _disposePendingIndicator() {
    if (!this._pendingIndicator) {
      return;
    }
    this._pendingIndicator.dispose();
    this._pendingIndicator.$element().remove();
    this._pendingIndicator = null;
    this.$element().removeClass(TEXTEDITOR_VALIDATION_PENDING_CLASS);
  }
  _renderValidationState() {
    super._renderValidationState();
    // @ts-expect-error ts-error
    const isPending = this.option('validationStatus') === 'pending';
    if (isPending) {
      if (!this._pendingIndicator) {
        this._renderPendingIndicator();
      }
      this._showValidMark = false;
    } else {
      // @ts-expect-error ts-error
      if (this.option('validationStatus') === 'invalid') {
        this._showValidMark = false;
      }
      // @ts-expect-error ts-error
      if (!this._showValidMark && this.option('showValidationMark') === true) {
        // @ts-expect-error ts-error
        this._showValidMark = this.option('validationStatus') === 'valid' && !!this._pendingIndicator;
      }
      this._disposePendingIndicator();
    }
    this._toggleValidMark();
  }
  _getButtonsContainer() {
    return this._$textEditorContainer;
  }
  _renderButtonContainers() {
    const {
      buttons
    } = this.option();
    const $buttonsContainer = this._getButtonsContainer();
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, $buttonsContainer);
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, $buttonsContainer);
  }
  _cleanButtonContainers() {
    var _this$_$beforeButtons, _this$_$afterButtonsC;
    (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 || _this$_$beforeButtons.remove();
    (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 || _this$_$afterButtonsC.remove();
    this._buttonCollection.clean();
  }
  _clean() {
    this._buttonCollection.clean();
    this._disposePendingIndicator();
    this._unobserveLabelContainerResize();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    // @ts-expect-error ts-error
    this._$textEditorContainer = null;
    super._clean();
  }
  _createInput() {
    const $input = $('<input>');
    this._applyInputAttributes($input, this.option('inputAttr'));
    return $input;
  }
  _setSubmitElementName(name) {
    const {
      inputAttr
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    super._setSubmitElementName(name || (inputAttr === null || inputAttr === void 0 ? void 0 : inputAttr.name) || '');
  }
  _applyInputAttributes($input) {
    let customAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const inputAttributes = extend(this._getDefaultAttributes(), customAttributes);
    // @ts-expect-error ts-error
    $input.attr(inputAttributes).addClass(TEXTEDITOR_INPUT_CLASS);
    this._setInputMinHeight($input);
  }
  _setInputMinHeight($input) {
    $input.css('minHeight', this.option('height') ? '0' : '');
  }
  _getPlaceholderAttr() {
    const {
      ios,
      // @ts-expect-error ts-error
      mac
    } = devices.real();
    const {
      placeholder
    } = this.option();
    // WA to fix vAlign (T898735)
    // https://bugs.webkit.org/show_bug.cgi?id=142968
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const value = placeholder || (ios || mac ? ' ' : null);
    return value;
  }
  _getDefaultAttributes() {
    const defaultAttributes = {
      autocomplete: 'off',
      placeholder: this._getPlaceholderAttr()
    };
    return defaultAttributes;
  }
  _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  }
  _updateButtonsStyling(editorStylingMode) {
    each(this.option('buttons'), (_, _ref) => {
      let {
        options,
        name: buttonName
      } = _ref;
      if (options && !options.stylingMode && this.option('visible')) {
        const buttonInstance = this.getButton(buttonName);
        if (buttonInstance !== null && buttonInstance !== void 0 && buttonInstance.option) {
          buttonInstance.option('stylingMode', editorStylingMode === 'underlined' ? 'text' : 'contained');
        }
      }
    });
  }
  _renderValue() {
    const renderInputPromise = this._renderInputValue();
    // @ts-expect-error ts-error
    return renderInputPromise.promise();
  }
  _renderInputValue(value) {
    value = value ?? this.option('value');
    const {
      text,
      displayValue,
      displayValueFormatter
    } = this.option();
    let textValue = text;
    if (displayValue !== undefined && value !== null) {
      textValue = displayValueFormatter === null || displayValueFormatter === void 0 ? void 0 : displayValueFormatter(displayValue);
    } else if (!isDefined(textValue)) {
      textValue = displayValueFormatter === null || displayValueFormatter === void 0 ? void 0 : displayValueFormatter(value);
    }
    this.option('text', textValue);
    // fallback to empty string is required to support WebKit native date picker in some basic scenarios
    // can not be covered by QUnit
    // @ts-expect-error @ts-error
    if (this._input().val() !== (isDefined(textValue) ? textValue : '')) {
      this._renderDisplayText(textValue);
    } else {
      this._toggleEmptinessEventHandler();
    }
    return Deferred().resolve();
  }
  _renderDisplayText(text) {
    this._input().val(text);
    this._toggleEmptinessEventHandler();
  }
  _isValueValid() {
    if (this._input().length) {
      // @ts-expect-error ts-error
      const {
        validity
      } = this._input().get(0);
      if (validity) {
        return validity.valid;
      }
    }
    return true;
  }
  _toggleEmptiness(isEmpty) {
    this.$element().toggleClass(TEXTEDITOR_EMPTY_INPUT_CLASS, isEmpty);
    this._togglePlaceholder(isEmpty);
  }
  _togglePlaceholder(isEmpty) {
    this.$element().find(`.${TEXTEDITOR_PLACEHOLDER_CLASS}`).eq(0).toggleClass(STATE_INVISIBLE_CLASS, !isEmpty);
  }
  _renderProps() {
    this._toggleReadOnlyState();
    this._toggleSpellcheckState();
    this._toggleTabIndex();
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(value);
    const $input = this._input();
    $input.prop('disabled', value);
  }
  _toggleTabIndex() {
    const $input = this._input();
    const disabled = this.option('disabled');
    const focusStateEnabled = this.option('focusStateEnabled');
    if (disabled || !focusStateEnabled) {
      $input.attr('tabIndex', -1);
    } else {
      $input.removeAttr('tabIndex');
    }
  }
  _toggleReadOnlyState() {
    this._input().prop('readOnly', this._readOnlyPropValue());
    super._toggleReadOnlyState();
  }
  _readOnlyPropValue() {
    const {
      readOnly
    } = this.option();
    return !!readOnly;
  }
  _toggleSpellcheckState() {
    const {
      spellcheck
    } = this.option();
    // @ts-expect-error ts-error
    this._input().prop('spellcheck', spellcheck);
  }
  _unobserveLabelContainerResize() {
    if (this._labelContainerElement) {
      resizeObserverSingleton.unobserve(this._labelContainerElement);
      this._labelContainerElement = null;
    }
  }
  _getLabelContainer() {
    return this._input();
  }
  _getLabelContainerWidth() {
    return getWidth(this._getLabelContainer());
  }
  _getLabelBeforeWidth() {
    const buttonsBeforeWidth = this._$beforeButtonsContainer && getWidth(this._$beforeButtonsContainer);
    return buttonsBeforeWidth ?? 0;
  }
  _updateLabelWidth() {
    this._label.updateBeforeWidth(this._getLabelBeforeWidth());
    this._label.updateMaxWidth(this._getLabelContainerWidth());
  }
  _getFieldElement() {
    return this._getLabelContainer();
  }
  _setFieldAria(force) {
    var _this$_label;
    const inputAttr = this.option('inputAttr');
    const ariaLabel = inputAttr === null || inputAttr === void 0 ? void 0 : inputAttr['aria-label'];
    const labelId = (_this$_label = this._label) === null || _this$_label === void 0 ? void 0 : _this$_label.getId();
    const value = ariaLabel ? undefined : labelId;
    if (value || force) {
      const aria = {
        // eslint-disable-next-line spellcheck/spell-checker
        labelledby: value,
        label: ariaLabel
      };
      this.setAria(aria, this._getFieldElement());
    }
  }
  _renderLabel() {
    this._unobserveLabelContainerResize();
    this._labelContainerElement = $(this._getLabelContainer()).get(0);
    const {
      label,
      labelMode,
      labelMark,
      rtlEnabled
    } = this.option();
    const labelConfig = {
      onClickHandler: () => {
        this.focus();
      },
      onHoverHandler: e => {
        e.stopPropagation();
      },
      onActiveHandler: e => {
        e.stopPropagation();
      },
      $editor: this.$element(),
      text: label,
      mark: labelMark,
      mode: labelMode,
      rtlEnabled,
      containsButtonsBefore: !!this._$beforeButtonsContainer,
      getContainerWidth: () => this._getLabelContainerWidth(),
      getBeforeWidth: () => this._getLabelBeforeWidth()
    };
    this._label = new TextEditorLabelCreator(labelConfig);
    this._setFieldAria();
    if (this._labelContainerElement) {
      // NOTE: element can be not in DOM yet in React and Vue
      resizeObserverSingleton.observe(this._labelContainerElement, this._updateLabelWidth.bind(this));
    }
  }
  _renderPlaceholder() {
    this._renderPlaceholderMarkup();
    this._attachPlaceholderEvents();
  }
  _renderPlaceholderMarkup() {
    if (this._$placeholder) {
      this._$placeholder.remove();
      this._$placeholder = null;
    }
    const $input = this._input();
    const placeholder = this.option('placeholder');
    const placeholderAttributes = {
      id: placeholder ? `dx-${new Guid()}` : undefined,
      'data-dx_placeholder': placeholder
    };
    const $placeholder = this._$placeholder = $('<div>')
    // @ts-expect-error ts-error
    .attr(placeholderAttributes);
    $placeholder.insertAfter($input);
    $placeholder.addClass(TEXTEDITOR_PLACEHOLDER_CLASS);
  }
  _attachPlaceholderEvents() {
    // @ts-expect-error ts-error
    const startEvent = addNamespace(pointerEvents.up, this.NAME);
    eventsEngine.on(this._$placeholder, startEvent, () => {
      // @ts-expect-error ts-error
      eventsEngine.trigger(this._input(), 'focus');
    });
    this._toggleEmptinessEventHandler();
  }
  _placeholder() {
    return this._$placeholder ?? $();
  }
  _clearValueHandler(e) {
    const $input = this._input();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    this._clearValue();
    if (!this._isFocused()) {
      // @ts-expect-error ts-error
      eventsEngine.trigger($input, 'focus');
    }
    // @ts-expect-error ts-error
    eventsEngine.trigger($input, 'input');
  }
  _clearValue() {
    this.clear();
  }
  _renderEvents() {
    const $input = this._input();
    each(EVENTS_LIST, (_, event) => {
      if (this.hasActionSubscription(`on${event}`)) {
        const action = this._createActionByOption(`on${event}`, {
          excludeValidators: ['readOnly']
        });
        // @ts-expect-error ts-error
        eventsEngine.on($input, addNamespace(event.toLowerCase(), this.NAME), e => {
          if (this._disposed) {
            return;
          }
          action({
            event: e
          });
        });
      }
    });
  }
  _refreshEvents() {
    const $input = this._input();
    each(EVENTS_LIST, (_, event) => {
      // @ts-expect-error ts-error
      eventsEngine.off($input, addNamespace(event.toLowerCase(), this.NAME));
    });
    this._renderEvents();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _keyPressHandler(e) {
    this.option('text', this._input().val());
  }
  _keyDownHandler(e) {
    const $input = this._input();
    const isCtrlEnter = e.ctrlKey && normalizeKeyName(e) === 'enter';
    const {
      value
    } = this.option();
    const isNewValue = $input.val() !== value;
    if (isCtrlEnter && isNewValue) {
      // @ts-expect-error ts-error
      eventsEngine.trigger($input, 'change');
    }
  }
  // eslint-disable-next-line class-methods-use-this
  _getValueChangeEventOptionName() {
    return 'valueChangeEvent';
  }
  _renderValueChangeEvent() {
    const keyPressEvent = addNamespace(this._renderValueEventName(), `${this.NAME}TextChange`);
    // @ts-expect-error ts-error
    const valueChangeEvent = addNamespace(this.option(this._getValueChangeEventOptionName()), `${this.NAME}ValueChange`);
    const keyDownEvent = addNamespace('keydown', `${this.NAME}TextChange`);
    const $input = this._input();
    eventsEngine.on($input, keyPressEvent, this._keyPressHandler.bind(this));
    eventsEngine.on($input, valueChangeEvent, this._valueChangeEventHandler.bind(this));
    eventsEngine.on($input, keyDownEvent, this._keyDownHandler.bind(this));
  }
  _cleanValueChangeEvent() {
    const valueChangeNamespace = `.${this.NAME}ValueChange`;
    const textChangeNamespace = `.${this.NAME}TextChange`;
    eventsEngine.off(this._input(), valueChangeNamespace);
    eventsEngine.off(this._input(), textChangeNamespace);
  }
  _refreshValueChangeEvent() {
    this._cleanValueChangeEvent();
    this._renderValueChangeEvent();
  }
  // eslint-disable-next-line class-methods-use-this
  _renderValueEventName() {
    return 'input change keypress';
  }
  _focusTarget() {
    return this._input();
  }
  // @ts-expect-error ts-error
  _focusEventTarget() {
    return this.element();
  }
  _isInput(element) {
    return element === this._input().get(0);
  }
  _preventNestedFocusEvent(event) {
    if (event.isDefaultPrevented()) {
      return true;
    }
    // @ts-expect-error ts-error
    let shouldPrevent = this._isNestedTarget(event.relatedTarget);
    if (event.type === 'focusin') {
      shouldPrevent = shouldPrevent && this._isNestedTarget(event.target) && !this._isInput(event.target);
    } else if (!shouldPrevent) {
      this._toggleFocusClass(false, this.$element());
    }
    if (shouldPrevent) {
      event.preventDefault();
    }
    return shouldPrevent;
  }
  _isNestedTarget(target) {
    return !!this.$element().find(target).length;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _focusClassTarget($element) {
    return this.$element();
  }
  _focusInHandler(event) {
    this._preventNestedFocusEvent(event);
    super._focusInHandler(event);
  }
  _focusOutHandler(event) {
    this._preventNestedFocusEvent(event);
    super._focusOutHandler(event);
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, this._focusClassTarget($element));
  }
  _hasFocusClass(element) {
    return super._hasFocusClass($(element || this.$element()));
  }
  _renderEmptinessEvent() {
    const $input = this._input();
    eventsEngine.on($input, 'input blur', this._toggleEmptinessEventHandler.bind(this));
  }
  _toggleEmptinessEventHandler() {
    const text = this._input().val();
    // @ts-expect-error ts-error
    const isEmpty = (text === '' || text === null) && this._isValueValid();
    this._toggleEmptiness(isEmpty);
  }
  _valueChangeEventHandler(e, formattedValue) {
    if (this.option('readOnly')) {
      return;
    }
    this._saveValueChangeEvent(e);
    this.option('value', arguments.length > 1 ? formattedValue : this._input().val());
    this._saveValueChangeEvent(undefined);
  }
  _renderEnterKeyAction() {
    this._enterKeyAction = this._createActionByOption('onEnterKey', {
      excludeValidators: ['readOnly']
    });
    eventsEngine.off(this._input(), 'keyup.onEnterKey.dxTextEditor');
    eventsEngine.on(this._input(), 'keyup.onEnterKey.dxTextEditor', this._enterKeyHandlerUp.bind(this));
  }
  _enterKeyHandlerUp(e) {
    if (this._disposed) {
      return;
    }
    if (normalizeKeyName(e) === 'enter') {
      var _this$_enterKeyAction;
      (_this$_enterKeyAction = this._enterKeyAction) === null || _this$_enterKeyAction === void 0 || _this$_enterKeyAction.call(this, {
        event: e
      });
    }
  }
  _updateValue() {
    this._options.silent('text', null);
    this._renderValue();
  }
  _dispose() {
    this._enterKeyAction = undefined;
    super._dispose();
  }
  _getSubmitElement() {
    return this._input();
  }
  _hasActiveElement() {
    // @ts-expect-error ts-error
    return this._input().is(domAdapter.getActiveElement(this._input()[0]));
  }
  _optionChanged(args) {
    const {
      name,
      fullName,
      value
    } = args;
    const eventName = name.replace('on', '');
    if (EVENTS_LIST.includes(eventName)) {
      this._refreshEvents();
      return;
    }
    switch (name) {
      case 'valueChangeEvent':
        this._refreshValueChangeEvent();
        this._refreshFocusEvent();
        this._refreshEvents();
        break;
      case 'onValueChanged':
        this._createValueChangeAction();
        break;
      case 'focusStateEnabled':
        super._optionChanged(args);
        this._toggleTabIndex();
        break;
      case 'spellcheck':
        this._toggleSpellcheckState();
        break;
      case 'mode':
        this._renderInputType();
        break;
      case 'onEnterKey':
        this._renderEnterKeyAction();
        break;
      case 'placeholder':
        this._renderPlaceholder();
        this._setFieldAria(true);
        // @ts-expect-error ts-error
        this._input().attr({
          placeholder: this._getPlaceholderAttr()
        });
        break;
      case 'label':
        this._label.updateText(value);
        this._setFieldAria(true);
        break;
      case 'labelMark':
        this._label.updateMark(value);
        break;
      case 'labelMode':
        this._label.updateMode(value);
        this._setFieldAria();
        break;
      case 'width':
        super._optionChanged(args);
        this._label.updateMaxWidth(this._getLabelContainerWidth());
        break;
      case 'readOnly':
      case 'disabled':
        this._updateButtons();
        super._optionChanged(args);
        break;
      case 'showClearButton':
        this._updateButtons(['clear']);
        break;
      case 'text':
        break;
      case 'value':
        this._updateValue();
        super._optionChanged(args);
        break;
      case 'inputAttr':
        this._applyInputAttributes(this._input(), this.option(name));
        break;
      case 'stylingMode':
        this._renderStylingMode();
        this._updateLabelWidth();
        break;
      case 'buttons':
        {
          if (fullName === name) {
            checkButtonsOptionType(value);
          }
          this._cleanButtonContainers();
          this._renderButtonContainers();
          const {
            stylingMode
          } = this.option();
          this._updateButtonsStyling(stylingMode);
          this._updateLabelWidth();
          this._label.updateContainsButtonsBefore(!!this._$beforeButtonsContainer);
          break;
        }
      case 'visible':
        {
          super._optionChanged(args);
          if (value && this.option('buttons')) {
            this._cleanButtonContainers();
            this._renderButtonContainers();
            const {
              stylingMode
            } = this.option();
            this._updateButtonsStyling(stylingMode);
          }
          break;
        }
      case 'displayValueFormatter':
        this._invalidate();
        break;
      case 'showValidationMark':
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderInputType() {
    // B218621, B231875
    this._setInputType(this.option('mode'));
  }
  _setInputType(type) {
    const input = this._input();
    if (type === 'search') {
      type = 'text';
    }
    try {
      input.prop('type', type);
    } catch (e) {
      input.prop('type', 'text');
    }
  }
  getButton(name) {
    return this._buttonCollection.getButton(name);
  }
  focus() {
    // @ts-expect-error ts-error
    eventsEngine.trigger(this._input(), 'focus');
  }
  clear() {
    if (this._showValidMark) {
      this._showValidMark = false;
      this._renderValidationState();
    }
    const defaultOptions = this._getDefaultOptions();
    if (this.option('value') === defaultOptions.value) {
      this._options.silent('text', '');
      this._renderValue();
    } else {
      this.option('value', defaultOptions.value);
    }
  }
  _resetInputText() {
    this._options.silent('text', this._initialValue);
    this._renderValue();
  }
  _isValueEqualToInitial() {
    const {
      value
    } = this.option();
    const initialValue = this._initialValue;
    return value === initialValue;
  }
  _resetToInitialValue() {
    const shouldResetInputText = this._isValueEqualToInitial();
    if (shouldResetInputText) {
      this._resetInputText();
    } else {
      super._resetToInitialValue();
    }
    this._disposePendingIndicator();
    this._showValidMark = false;
    this._toggleValidMark();
  }
  _toggleValidMark() {
    this.$element().toggleClass(TEXTEDITOR_VALID_CLASS, !!this._showValidMark);
  }
  reset() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (arguments.length) {
      super.reset(value);
    } else {
      super.reset();
    }
  }
  on(eventName, eventHandler) {
    const result = super.on(eventName, eventHandler);
    const event = eventName.charAt(0).toUpperCase() + eventName.substr(1);
    if (EVENTS_LIST.includes(event)) {
      this._refreshEvents();
    }
    return result;
  }
}
export default TextEditorBase;
