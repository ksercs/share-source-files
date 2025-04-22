/**
* DevExtreme (esm/__internal/ui/radio_group/m_radio_group.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { isDefined } from '../../../core/utils/type';
import DataExpressionMixin from '../../../ui/editor/ui.data_expression';
import Editor from '../../ui/editor/editor';
import RadioCollection from './m_radio_collection';
const RADIO_BUTTON_CLASS = 'dx-radiobutton';
const RADIO_GROUP_HORIZONTAL_CLASS = 'dx-radiogroup-horizontal';
const RADIO_GROUP_VERTICAL_CLASS = 'dx-radiogroup-vertical';
const RADIO_GROUP_CLASS = 'dx-radiogroup';
const RADIO_FEEDBACK_HIDE_TIMEOUT = 100;
class RadioGroup extends Editor {
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _defaultOptionsRules() {
    const defaultOptionsRules = super._defaultOptionsRules();
    return defaultOptionsRules.concat([{
      device: {
        tablet: true
      },
      options: {
        layout: 'horizontal'
      }
    }, {
      device: () => devices.real().deviceType === 'desktop' && !devices.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  // @ts-expect-error
  _fireContentReadyAction(force) {
    force && super._fireContentReadyAction();
  }
  _focusTarget() {
    return this.$element();
  }
  _getAriaTarget() {
    return this.$element();
  }
  _getDefaultOptions() {
    const defaultOptions = super._getDefaultOptions();
    // @ts-expect-error
    return extend(defaultOptions, extend(DataExpressionMixin._dataExpressionDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      layout: 'vertical'
    }));
  }
  _getItemValue(item) {
    // @ts-expect-error
    return this._valueGetter ? this._valueGetter(item) : item.text;
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _init() {
    super._init();
    this._activeStateUnit = `.${RADIO_BUTTON_CLASS}`;
    this._feedbackHideTimeout = RADIO_FEEDBACK_HIDE_TIMEOUT;
    // @ts-expect-error
    this._initDataExpressions();
  }
  _initMarkup() {
    $(this.element()).addClass(RADIO_GROUP_CLASS);
    this._renderSubmitElement();
    this.setAria('role', 'radiogroup');
    this._renderRadios();
    this._renderLayout();
    super._initMarkup();
  }
  _itemClickHandler(_ref) {
    let {
      itemElement,
      event,
      itemData
    } = _ref;
    // @ts-expect-error
    if (this.itemElements().is(itemElement)) {
      const newValue = this._getItemValue(itemData);
      if (newValue !== this.option('value')) {
        this._saveValueChangeEvent(event);
        this.option('value', newValue);
      }
    }
  }
  _getSelectedItemKeys() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('value');
    // @ts-expect-error
    const isNullSelectable = this.option('valueExpr') !== 'this';
    const shouldSelectValue = isNullSelectable && value === null || isDefined(value);
    return shouldSelectValue ? [value] : [];
  }
  _setSelection(currentValue) {
    // @ts-expect-error
    const value = this._unwrappedValue(currentValue);
    this._setCollectionWidgetOption('selectedItemKeys', this._getSelectedItemKeys(value));
  }
  _renderValidationState() {
    var _this$_validationMess;
    super._renderValidationState();
    // @ts-expect-error
    (_this$_validationMess = this._validationMessage) === null || _this$_validationMess === void 0 || _this$_validationMess.$content().attr('role', 'alert');
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    // @ts-expect-error
    this._dataExpressionOptionChanged(args);
    switch (name) {
      case 'dataSource':
        this._invalidate();
        break;
      case 'focusStateEnabled':
      case 'accessKey':
      case 'tabIndex':
        this._setCollectionWidgetOption(name, value);
        break;
      case 'disabled':
        super._optionChanged(args);
        this._setCollectionWidgetOption(name, value);
        break;
      case 'valueExpr':
        // @ts-expect-error
        this._setCollectionWidgetOption('keyExpr', this._getCollectionKeyExpr());
        break;
      case 'value':
        this._setSelection(value);
        this._setSubmitValue(value);
        super._optionChanged(args);
        break;
      case 'items':
        this._setSelection(this.option('value'));
        break;
      case 'itemTemplate':
      case 'displayExpr':
        break;
      case 'layout':
        this._renderLayout();
        this._updateItemsSize();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _render() {
    super._render();
    this._updateItemsSize();
  }
  _renderLayout() {
    const {
      layout
    } = this.option();
    const $element = $(this.element());
    $element.toggleClass(RADIO_GROUP_VERTICAL_CLASS, layout === 'vertical');
    $element.toggleClass(RADIO_GROUP_HORIZONTAL_CLASS, layout === 'horizontal');
  }
  _renderRadios() {
    this._areRadiosCreated = Deferred();
    const $radios = $('<div>').appendTo(this.$element());
    const {
      displayExpr,
      accessKey,
      focusStateEnabled,
      itemTemplate,
      tabIndex
    } = this.option();
    this._createComponent($radios, RadioCollection, {
      onInitialized: _ref2 => {
        let {
          component
        } = _ref2;
        this._radios = component;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onContentReady: e => {
        this._fireContentReadyAction(true);
      },
      // @ts-expect-error
      onItemClick: this._itemClickHandler.bind(this),
      displayExpr,
      accessKey,
      // @ts-expect-error
      dataSource: this._dataSource,
      focusStateEnabled,
      itemTemplate,
      // @ts-expect-error
      keyExpr: this._getCollectionKeyExpr(),
      noDataText: '',
      scrollingEnabled: false,
      selectByClick: false,
      selectionMode: 'single',
      selectedItemKeys: this._getSelectedItemKeys(),
      tabIndex
    });
    this._areRadiosCreated.resolve();
  }
  _renderSubmitElement() {
    this._$submitElement = $('<input>').attr('type', 'hidden').appendTo(this.$element());
    this._setSubmitValue();
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      value: true
    });
  }
  _setSubmitValue(value) {
    value = value ?? this.option('value');
    // @ts-expect-error
    const submitValue = this.option('valueExpr') === 'this'
    // @ts-expect-error
    ? this._displayGetter(value) : value;
    this._$submitElement.val(submitValue);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _setCollectionWidgetOption(name, value) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._areRadiosCreated.done(this._setWidgetOption.bind(this, '_radios', arguments));
  }
  _updateItemsSize() {
    const {
      layout
    } = this.option();
    if (layout === 'horizontal') {
      var _this$itemElements;
      (_this$itemElements = this.itemElements()) === null || _this$itemElements === void 0 || _this$itemElements.css('height', 'auto');
    } else {
      var _this$itemElements2;
      // @ts-expect-error
      const itemsCount = this.option('items').length;
      (_this$itemElements2 = this.itemElements()) === null || _this$itemElements2 === void 0 || _this$itemElements2.css('height', `${100 / itemsCount}%`);
    }
  }
  focus() {
    var _this$_radios;
    (_this$_radios = this._radios) === null || _this$_radios === void 0 || _this$_radios.focus();
  }
  itemElements() {
    var _this$_radios2;
    return (_this$_radios2 = this._radios) === null || _this$_radios2 === void 0 ? void 0 : _this$_radios2._itemElements();
  }
}
// @ts-expect-error
RadioGroup.include(DataExpressionMixin);
registerComponent('dxRadioGroup', RadioGroup);
export default RadioGroup;
