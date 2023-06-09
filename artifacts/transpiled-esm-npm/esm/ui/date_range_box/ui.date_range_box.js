import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../core/renderer';
import registerComponent from '../../core/component_registrator';
import domAdapter from '../../core/dom_adapter';
import { extend } from '../../core/utils/extend';
import { getImageContainer } from '../../core/utils/icon';
import config from '../../core/config';
import devices from '../../core/devices';
import messageLocalization from '../../localization/message';
import { current, isMaterial } from '../themes';
import Editor from '../editor/editor';
import MultiselectDateBox from './ui.multiselect_date_box';
import TextEditorButtonCollection from '../text_box/texteditor_button_collection/index';
import DropDownButton from '../drop_down_editor/ui.drop_down_button';
import ClearButton from '../text_box/ui.text_editor.clear';
import { FunctionTemplate } from '../../core/templates/function_template';
import { isSameDates, isSameDateArrays, sortDatesArray, getDeserializedDate } from './ui.date_range.utils';
import { each } from '../../core/utils/iterator';
import { camelize } from '../../core/utils/inflector';
var DATERANGEBOX_CLASS = 'dx-daterangebox';
var START_DATEBOX_CLASS = 'dx-start-datebox';
var END_DATEBOX_CLASS = 'dx-end-datebox';
var DATERANGEBOX_SEPARATOR_CLASS = 'dx-daterangebox-separator';
var DROP_DOWN_EDITOR_BUTTON_ICON = 'dx-dropdowneditor-icon';
var READONLY_STATE_CLASS = 'dx-state-readonly';
var TEXTEDITOR_INPUT_CLASS = 'dx-texteditor-input';
var ALLOWED_STYLING_MODES = ['outlined', 'filled', 'underlined'];
var SEPARATOR_ICON_NAME = 'to';
var EVENTS_LIST = ['KeyDown', 'KeyUp', 'Change', 'Cut', 'Copy', 'Paste', 'Input', 'EnterKey'];

// STYLE dateRangeBox

class DateRangeBox extends Editor {
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      acceptCustomValue: true,
      activeStateEnabled: true,
      applyButtonText: messageLocalization.format('OK'),
      applyValueMode: 'instantly',
      buttons: undefined,
      calendarOptions: {},
      cancelButtonText: messageLocalization.format('Cancel'),
      endDateOutOfRangeMessage: messageLocalization.format('dxDateBox-endDateOutOfRangeMessage'),
      dateSerializationFormat: undefined,
      deferRendering: true,
      disabledDates: null,
      displayFormat: null,
      dropDownButtonTemplate: 'dropDownButton',
      dropDownOptions: {},
      endDate: null,
      endDateInputAttr: {},
      endDateLabel: 'End Date',
      endDateName: '',
      endDatePlaceholder: '',
      endDateText: undefined,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      invalidStartDateMessage: messageLocalization.format('dxDateBox-invalidStartDateMessage'),
      invalidEndDateMessage: messageLocalization.format('dxDateBox-invalidEndDateMessage'),
      isValid: true,
      labelMode: 'static',
      max: undefined,
      min: undefined,
      multiView: true,
      onChange: null,
      onClosed: null,
      onCopy: null,
      onCut: null,
      onEnterKey: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onOpened: null,
      onPaste: null,
      onValueChanged: null,
      openOnFieldClick: true,
      opened: false,
      pickerType: 'calendar',
      readOnly: false,
      showClearButton: false,
      showDropDownButton: true,
      spellcheck: false,
      startDate: null,
      startDateInputAttr: {},
      startDateLabel: 'Start Date',
      startDateName: '',
      startDateOutOfRangeMessage: messageLocalization.format('dxDateBox-startDateOutOfRangeMessage'),
      startDatePlaceholder: '',
      startDateText: undefined,
      stylingMode: config().editorStylingMode || 'outlined',
      todayButtonText: messageLocalization.format('dxCalendar-todayButtonText'),
      useHiddenSubmitElement: false,
      useMaskBehavior: false,
      validationError: null,
      validationErrors: null,
      validationMessageMode: 'auto',
      validationMessagePosition: 'auto',
      validationStatus: 'valid',
      value: [null, null],
      valueChangeEvent: 'change',
      _internalValidationErrors: [],
      _currentSelection: 'startDate'
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: function device() {
        var themeName = current();
        return isMaterial(themeName);
      },
      options: {
        stylingMode: config().editorStylingMode || 'filled',
        labelMode: 'floating'
      }
    }, {
      device: function device() {
        var realDevice = devices.real();
        var platform = realDevice.platform;
        return platform === 'ios' || platform === 'android';
      },
      options: {
        multiView: false
      }
    }]);
  }
  _initOptions(options) {
    super._initOptions(options);
    var {
      value: initialValue
    } = this.initialOption();
    var {
      value,
      startDate,
      endDate
    } = this.option();
    if (value[0] && value[1] && getDeserializedDate(value[0]) > getDeserializedDate(value[1])) {
      value = [value[1], value[0]];
    }
    if (startDate && endDate && getDeserializedDate(startDate) > getDeserializedDate(endDate)) {
      [startDate, endDate] = [endDate, startDate];
    }
    if (isSameDateArrays(initialValue, value)) {
      value = [startDate, endDate];
    } else {
      [startDate, endDate] = value;
    }
    this.option({
      startDate,
      endDate,
      value
    });
  }
  _createOpenAction() {
    this._openAction = this._createActionByOption('onOpened', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _raiseOpenAction() {
    if (!this._openAction) {
      this._createOpenAction();
    }
    this._openAction();
  }
  _createCloseAction() {
    this._closeAction = this._createActionByOption('onClosed', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  _raiseCloseAction() {
    if (!this._closeAction) {
      this._createCloseAction();
    }
    this._closeAction();
  }
  _createEventAction(eventName) {
    this["_".concat(camelize(eventName), "Action")] = this._createActionByOption("on".concat(eventName), {
      excludeValidators: ['readOnly']
    });
  }
  _raiseAction(eventName, event) {
    var action = this["_".concat(camelize(eventName), "Action")];
    if (!action) {
      this._createEventAction(eventName);
    }
    this["_".concat(camelize(eventName), "Action")]({
      event
    });
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new FunctionTemplate(function (options) {
        var $icon = $('<div>').addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
        $(options.container).append($icon);
      })
    });
    this.callBase();
  }
  _getDefaultButtons() {
    return [{
      name: 'clear',
      Ctor: ClearButton
    }, {
      name: 'dropDown',
      Ctor: DropDownButton
    }];
  }
  _initMarkup() {
    this.$element().addClass(DATERANGEBOX_CLASS)
    // TODO: remove next classes after adding styles
    .addClass('dx-texteditor').addClass('dx-datebox-date').addClass('dx-dropdowneditor');
    this._toggleReadOnlyState();
    this._renderStylingMode();
    // TODO: probably it need to update styling mode for dropDown in buttons container. It depends from design decision

    this._renderStartDateBox();
    this._renderSeparator();
    this._renderEndDateBox();
    this._renderButtonsContainer();
    super._initMarkup();
  }
  _attachKeyboardEvents() {
    if (!this.option('readOnly')) {
      super._attachKeyboardEvents();
    }
  }
  _toggleReadOnlyState() {
    var {
      readOnly
    } = this.option();
    this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly);
    // TODO: should we add area readonly here?
  }

  _getStylingModePrefix() {
    return "".concat(DATERANGEBOX_CLASS, "-");
  }

  // TODO: extract this part from Editor to separate file and use it here
  _renderStylingMode() {
    var optionName = 'stylingMode';
    var optionValue = this.option(optionName);
    var prefix = this._getStylingModePrefix();
    var allowedStylingClasses = ALLOWED_STYLING_MODES.map(mode => {
      return prefix + mode;
    });
    allowedStylingClasses.forEach(className => this.$element().removeClass(className));
    var stylingModeClass = prefix + optionValue;
    if (allowedStylingClasses.indexOf(stylingModeClass) === -1) {
      var defaultOptionValue = this._getDefaultOptions()[optionName];
      var platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
      stylingModeClass = prefix + (platformOptionValue || defaultOptionValue);
    }
    this.$element().addClass(stylingModeClass);
  }
  _renderStartDateBox() {
    this._$startDateBox = $('<div>').addClass(START_DATEBOX_CLASS).appendTo(this.$element());
    this._startDateBox = this._createComponent(this._$startDateBox, MultiselectDateBox, this._getStartDateBoxConfig());
  }
  _renderEndDateBox() {
    this._$endDateBox = $('<div>').addClass(END_DATEBOX_CLASS).appendTo(this.$element());
    this._endDateBox = this._createComponent(this._$endDateBox, MultiselectDateBox, this._getEndDateBoxConfig());
  }
  _renderSeparator() {
    // TODO: request design for rtl mode and research rtl mode appearance
    // TODO: add transform: scale(-1, 1) for mirror of the icon in rtl mode
    var $icon = getImageContainer(SEPARATOR_ICON_NAME);
    this._$separator = $('<div>').addClass(DATERANGEBOX_SEPARATOR_CLASS).appendTo(this.$element());
    $icon.appendTo(this._$separator);
  }
  _renderButtonsContainer() {
    this._buttonCollection = new TextEditorButtonCollection(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    var {
      buttons
    } = this.option();
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this.$element());
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this.$element());
  }
  _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  }
  _openHandler() {
    this._toggleOpenState();
  }
  _shouldCallOpenHandler() {
    return true;
  }
  _toggleOpenState() {
    var {
      opened
    } = this.option();
    if (!opened) {
      this.getStartDateBox()._focusInput();
    }
    if (!this.option('readOnly')) {
      this.option('opened', !this.option('opened'));
    }
  }
  _clearValueHandler(e) {
    this._saveValueChangeEvent(e);
    this._shouldSuppressValueSync = true;
    this.getEndDateBox()._clearValueHandler(e);
    this.getStartDateBox()._clearValueHandler(e);
    this._shouldSuppressValueSync = false;
    this.reset();
  }
  _isClearButtonVisible() {
    return this.option('showClearButton') && !this.option('readOnly');
  }
  _focusInHandler(event) {
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    super._focusInHandler(event);
  }
  _focusOutHandler(event) {
    if (this._shouldSkipFocusEvent(event)) {
      return;
    }
    super._focusOutHandler(event);
  }
  _shouldSkipFocusEvent(event) {
    var {
      target,
      relatedTarget
    } = event;
    return $(target).is(this.startDateField()) && $(relatedTarget).is(this.endDateField()) || $(target).is(this.endDateField()) && $(relatedTarget).is(this.startDateField());
  }
  _getPickerType() {
    var {
      pickerType
    } = this.option();
    return ['calendar', 'native'].includes(pickerType) ? pickerType : 'calendar';
  }
  _getRestErrors(allErrors, partialErrors) {
    return allErrors.filter(error => {
      return !partialErrors.some(prevError => error.message === prevError.message);
    });
  }
  _syncValidationErrors(optionName, newPartialErrors, previousPartialErrors) {
    newPartialErrors || (newPartialErrors = []);
    previousPartialErrors || (previousPartialErrors = []);
    var allErrors = this.option(optionName) || [];
    var otherErrors = this._getRestErrors(allErrors, previousPartialErrors);
    this.option(optionName, [...otherErrors, ...newPartialErrors]);
  }
  _getDateBoxConfig() {
    var options = this.option();
    var dateBoxConfig = {
      acceptCustomValue: options.acceptCustomValue,
      activeStateEnabled: options.activeStateEnabled,
      applyValueMode: options.applyValueMode,
      dateOutOfRangeMessage: options.dateOutOfRangeMessage,
      dateSerializationFormat: options.dateSerializationFormat,
      deferRendering: options.deferRendering,
      disabled: options.disabled,
      displayFormat: options.displayFormat,
      focusStateEnabled: options.focusStateEnabled,
      tabIndex: options.tabIndex,
      height: options.height,
      hoverStateEnabled: options.hoverStateEnabled,
      labelMode: options.labelMode,
      max: options.max,
      min: options.min,
      openOnFieldClick: options.openOnFieldClick,
      pickerType: this._getPickerType(),
      readOnly: options.readOnly,
      rtlEnabled: options.rtlEnabled,
      spellcheck: options.spellcheck,
      stylingMode: 'underlined',
      type: 'date',
      useMaskBehavior: options.useMaskBehavior,
      validationMessageMode: options.validationMessageMode,
      validationMessagePosition: options.validationMessagePosition,
      valueChangeEvent: options.valueChangeEvent,
      onKeyDown: options.onKeyUp,
      onKeyUp: options.onKeyUp,
      onChange: options.onChange,
      onInput: options.onInput,
      onCut: options.onCut,
      onCopy: options.onCopy,
      onPaste: options.onPaste,
      onEnterKey: options.onEnterKey,
      _dateRangeBoxInstance: this,
      _showValidationMessage: false
    };
    each(EVENTS_LIST, (_, eventName) => {
      var optionName = "on".concat(eventName);
      if (this.hasActionSubscription(optionName)) {
        dateBoxConfig[optionName] = e => {
          this._raiseAction(eventName, e.event);
        };
      }
    });
    return dateBoxConfig;
  }
  _getStartDateBoxConfig() {
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      applyButtonText: options.applyButtonText,
      calendarOptions: options.calendarOptions,
      cancelButtonText: options.cancelButtonText,
      dateOutOfRangeMessage: options.startDateOutOfRangeMessage,
      deferRendering: options.deferRendering,
      disabledDates: options.disabledDates,
      dropDownOptions: options.dropDownOptions,
      invalidDateMessage: options.invalidStartDateMessage,
      onValueChanged: _ref => {
        var {
          value,
          event
        } = _ref;
        if (!this._shouldSuppressValueSync) {
          var newValue = [value, this.option('value')[1]];
          this.updateValue(newValue, event);
        }
      },
      opened: options.opened,
      onOpened: () => {
        this.option('opened', true);
        this._raiseOpenAction();
      },
      onClosed: () => {
        this.option('opened', false);
        this._raiseCloseAction();
      },
      onOptionChanged: args => {
        var {
          name,
          value,
          previousValue
        } = args;
        if (name === 'text') {
          this.option('startDateText', value);
        }
        if (name === 'validationErrors') {
          this._syncValidationErrors('_internalValidationErrors', value, previousValue);
        }
      },
      todayButtonText: options.todayButtonText,
      showClearButton: false,
      showDropDownButton: false,
      value: this.option('value')[0],
      label: options.startDateLabel,
      placeholder: options.startDatePlaceholder,
      inputAttr: options.startDateInputAttr,
      name: options.startDateName,
      _showValidationIcon: false
    });
  }
  _getEndDateBoxConfig() {
    var options = this.option();
    return _extends({}, this._getDateBoxConfig(), {
      invalidDateMessage: options.invalidEndDateMessage,
      dateOutOfRangeMessage: options.endDateOutOfRangeMessage,
      dropDownOptions: {
        onShowing: e => {
          e.cancel = true;
          this.getStartDateBox().open();

          // TODO: datebox doesn't clear opened state after prevent of opening
          this.getEndDateBox().option('opened', false);
        }
      },
      onValueChanged: _ref2 => {
        var {
          value,
          event
        } = _ref2;
        if (!this._shouldSuppressValueSync) {
          var newValue = [this.option('value')[0], value];
          this.updateValue(newValue, event);
        }
      },
      onOptionChanged: args => {
        var {
          name,
          value,
          previousValue
        } = args;
        if (name === 'text') {
          this.option('endDateText', value);
        }
        if (name === 'validationErrors') {
          this._syncValidationErrors('_internalValidationErrors', value, previousValue);
        }
      },
      showClearButton: false,
      showDropDownButton: false,
      value: this.option('value')[1],
      label: options.endDateLabel,
      placeholder: options.endDatePlaceholder,
      deferRendering: true,
      inputAttr: options.endDateInputAttr,
      name: options.endDateName
    });
  }
  _getValidationMessagePosition() {
    var {
      validationMessagePosition
    } = this.option();
    if (validationMessagePosition === 'auto') {
      return this.option('opened') ? 'top' : 'bottom';
    }
    return validationMessagePosition;
  }
  updateValue(newValue, event) {
    if (!isSameDateArrays(newValue, this.option('value'))) {
      if (event) {
        this._saveValueChangeEvent(event);
      }
      this.option('value', newValue);
    }
  }
  _updateDateBoxesValue(newValue) {
    var startDateBox = this.getStartDateBox();
    var endDateBox = this.getEndDateBox();
    var [newStartDate, newEndDate] = newValue;
    var oldStartDate = startDateBox.option('value');
    var oldEndDate = endDateBox.option('value');
    if (!isSameDates(newStartDate, oldStartDate)) {
      startDateBox.option('value', newStartDate);
    }
    if (!isSameDates(newEndDate, oldEndDate)) {
      endDateBox.option('value', newEndDate);
    }
  }
  _renderAccessKey() {
    var $startDateInput = $(this.field()[0]);
    var {
      accessKey
    } = this.option();
    $startDateInput.attr('accesskey', accessKey);
  }
  _focusTarget() {
    return this.$element().find(".".concat(TEXTEDITOR_INPUT_CLASS));
  }
  _focusEventTarget() {
    return this.element();
  }
  _focusClassTarget() {
    return this.$element();
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, this._focusClassTarget($element));
  }
  _hasActiveElement() {
    var [startDateInput, endDateInput] = this.field();
    return this._isActiveElement(startDateInput) || this._isActiveElement(endDateInput);
  }
  _isActiveElement(input) {
    return $(input).is(domAdapter.getActiveElement(input));
  }
  _cleanButtonContainers() {
    var _this$_$beforeButtons, _this$_$afterButtonsC;
    (_this$_$beforeButtons = this._$beforeButtonsContainer) === null || _this$_$beforeButtons === void 0 ? void 0 : _this$_$beforeButtons.remove();
    (_this$_$afterButtonsC = this._$afterButtonsContainer) === null || _this$_$afterButtonsC === void 0 ? void 0 : _this$_$afterButtonsC.remove();
    this._buttonCollection.clean();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
  }
  _applyCustomValidation(value) {
    this.validationRequest.fire({
      editor: this,
      value
    });
  }
  _clean() {
    var _this$_$startDateBox, _this$_$endDateBox, _this$_$separator;
    this._cleanButtonContainers();
    (_this$_$startDateBox = this._$startDateBox) === null || _this$_$startDateBox === void 0 ? void 0 : _this$_$startDateBox.remove();
    (_this$_$endDateBox = this._$endDateBox) === null || _this$_$endDateBox === void 0 ? void 0 : _this$_$endDateBox.remove();
    (_this$_$separator = this._$separator) === null || _this$_$separator === void 0 ? void 0 : _this$_$separator.remove();
    super._clean();
  }
  _optionChanged(args) {
    var {
      name,
      fullName,
      value,
      previousValue
    } = args;
    switch (name) {
      case 'acceptCustomValue':
      case 'dateSerializationFormat':
      case 'displayFormat':
      case 'max':
      case 'min':
      case 'rtlEnabled': // super() call for rtlEnabled?
      case 'labelMode':
      case 'spellcheck':
      case 'useMaskBehavior':
      case 'valueChangeEvent':
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'applyButtonText':
      case 'applyValueMode':
      case 'cancelButtonText':
      case 'deferRendering':
      case 'disabledDates':
      case 'opened':
      case 'todayButtonText':
        this.getStartDateBox().option(name, value);
        break;
      case 'buttons':
        this._cleanButtonContainers();
        this._renderButtonsContainer();
        break;
      case 'calendarOptions':
      case 'dropDownOptions':
        this.getStartDateBox().option(fullName, value);
        break;
      case 'pickerType':
        {
          var pickerType = this._getPickerType();
          this.getStartDateBox().option(name, pickerType);
          this.getEndDateBox().option(name, pickerType);
          break;
        }
      case 'dateOutOfRangeMessage':
        break;
      case 'height':
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        super._optionChanged(args);
        break;
      case 'dropDownButtonTemplate':
      case 'showDropDownButton':
        this._updateButtons(['dropDown']);
        break;
      case 'showClearButton':
        this._updateButtons(['clear']);
        break;
      case 'endDate':
        this.updateValue([this.option('value')[0], value]);
        break;
      case 'startDateLabel':
        this.getStartDateBox().option('label', value);
        break;
      case 'endDateLabel':
        this.getEndDateBox().option('label', value);
        break;
      case 'startDatePlaceholder':
        this.getStartDateBox().option('placeholder', value);
        break;
      case 'endDatePlaceholder':
        this.getEndDateBox().option('placeholder', value);
        break;
      case 'startDateInputAttr':
        this.getStartDateBox().option('inputAttr', value);
        break;
      case 'startDateName':
        this.getStartDateBox().option('name', value);
        break;
      case 'endDateInputAttr':
        this.getEndDateBox().option('inputAttr', value);
        break;
      case 'endDateName':
        this.getEndDateBox().option('name', value);
        break;
      case 'multiView':
        this.getStartDateBox().option('calendarOptions.viewsCount', value ? 2 : 1);
        break;
      case 'tabIndex':
      case 'focusStateEnabled':
        super._optionChanged(args);
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'onValueChanged':
        this._createValueChangeAction();
        break;
      case 'onOpened':
        this._createOpenAction();
        break;
      case 'onClosed':
        this._createCloseAction();
        break;
      case 'onKeyDown':
      case 'onKeyUp':
      case 'onChange':
      case 'onInput':
      case 'onCut':
      case 'onCopy':
      case 'onPaste':
      case 'onEnterKey':
        this._createEventAction(name.replace('on', ''));
        break;
      case 'openOnFieldClick':
        break;
      case 'readOnly':
        this._updateButtons();
        super._optionChanged(args);
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'disabled':
        this._updateButtons();
        super._optionChanged(args);
        this.getStartDateBox().option(name, value);
        this.getEndDateBox().option(name, value);
        break;
      case 'startDate':
        this.updateValue([value, this.option('value')[1]]);
        break;
      case 'stylingMode':
        this._renderStylingMode();
        break;
      case 'startDateText':
      case 'endDateText':
      case 'useHiddenSubmitElement':
        break;
      case 'invalidStartDateMessage':
        this.getStartDateBox().option('invalidDateMessage', value);
        break;
      case 'invalidEndDateMessage':
        this.getEndDateBox().option('invalidDateMessage', value);
        break;
      case 'startDateOutOfRangeMessage':
        this.getStartDateBox().option('dateOutOfRangeMessage', value);
        break;
      case 'endDateOutOfRangeMessage':
        this.getEndDateBox().option('dateOutOfRangeMessage', value);
        break;
      case 'validationMessagePosition':
        this.getStartDateBox().option(name, value);
        super._optionChanged(args);
        break;
      case '_internalValidationErrors':
        {
          this._syncValidationErrors('validationErrors', value, previousValue);
          var validationErrors = this.option('validationErrors');
          this.option('isValid', !(validationErrors !== null && validationErrors !== void 0 && validationErrors.length));
          break;
        }
      case 'isValid':
        {
          this.getEndDateBox().option(name, value);
          var isValid = value && !this.option('_internalValidationErrors').length;
          if (this._shouldSkipIsValidChange || isValid === value) {
            super._optionChanged(args);
            return;
          }
          this._shouldSkipIsValidChange = true;
          this.option('isValid', isValid);
          this._shouldSkipIsValidChange = false;
          break;
        }
      case 'validationErrors':
        {
          var internalValidationErrors = this.option('_internalValidationErrors') || [];
          var allErrors = value || [];
          var externalErrors = this._getRestErrors(allErrors, internalValidationErrors);
          var errors = [...externalErrors, ...internalValidationErrors];
          var newValue = errors.length ? errors : null;
          this._options.silent('validationErrors', newValue);
          super._optionChanged(_extends({}, args, {
            value: newValue
          }));
          break;
        }
      case 'value':
        {
          var _newValue = sortDatesArray(value);
          if (!isSameDateArrays(_newValue, previousValue)) {
            this._setOptionWithoutOptionChange('value', _newValue);
            this._setOptionWithoutOptionChange('startDate', _newValue[0]);
            this._setOptionWithoutOptionChange('endDate', _newValue[1]);
            this._applyCustomValidation(_newValue);
            this._raiseValueChangeAction(_newValue, previousValue);
            this._saveValueChangeEvent(undefined);
            this._updateDateBoxesValue(_newValue);
          }
          break;
        }
      case '_currentSelection':
        // TODO: change calendar option here?
        break;
      default:
        super._optionChanged(args);
    }
  }
  getStartDateBox() {
    return this._startDateBox;
  }
  getEndDateBox() {
    return this._endDateBox;
  }
  getButton(name) {
    return this._buttonCollection.getButton(name);
  }
  open() {
    this.option('opened', true);
  }
  close() {
    this.option('opened', false);
  }
  content() {
    return this.getStartDateBox().content();
  }
  field() {
    return [this.startDateField(), this.endDateField()];
  }
  startDateField() {
    return this.getStartDateBox().field();
  }
  endDateField() {
    return this.getEndDateBox().field();
  }
  focus() {
    this.getStartDateBox().focus();
  }
  reset() {
    // this.getEndDateBox().reset();
    // this.getStartDateBox().reset();

    super.reset();
  }
}
registerComponent('dxDateRangeBox', DateRangeBox);
export default DateRangeBox;