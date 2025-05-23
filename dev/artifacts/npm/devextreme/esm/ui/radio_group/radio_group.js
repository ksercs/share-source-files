/**
* DevExtreme (esm/ui/radio_group/radio_group.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import devices from '../../core/devices';
import { deferRender } from '../../core/utils/common';
import { isDefined } from '../../core/utils/type';
import registerComponent from '../../core/component_registrator';
import CollectionWidget from '../collection/ui.collection_widget.edit';
import DataExpressionMixin from '../editor/ui.data_expression';
import Editor from '../editor/editor';
import { Deferred } from '../../core/utils/deferred';

// STYLE radioGroup

var RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
var RADIO_BUTTON_CLASS = 'dx-radiobutton';
var RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
var RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
var RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
var RADIO_GROUP_HORIZONTAL_CLASS = 'dx-radiogroup-horizontal';
var RADIO_GROUP_VERTICAL_CLASS = 'dx-radiogroup-vertical';
var RADIO_VALUE_CONTAINER_CLASS = 'dx-radio-value-container';
var RADIO_GROUP_CLASS = 'dx-radiogroup';
var RADIO_FEEDBACK_HIDE_TIMEOUT = 100;
class RadioCollection extends CollectionWidget {
  _focusTarget() {
    return this.$element().parent();
  }
  _nullValueSelectionSupported() {
    return true;
  }
  _getDefaultOptions() {
    var defaultOptions = super._getDefaultOptions();
    return extend(defaultOptions, DataExpressionMixin._dataExpressionDefaultOptions(), {
      _itemAttributes: {
        role: 'radio'
      }
    });
  }
  _initMarkup() {
    super._initMarkup();
    deferRender(() => {
      this.itemElements().addClass(RADIO_BUTTON_CLASS);
    });
  }
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  }
  _postprocessRenderItem(args) {
    var {
      itemData: {
        html
      },
      itemElement
    } = args;
    if (!html) {
      var $radio = $('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
      $('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo($radio);
      var $radioContainer = $('<div>').append($radio).addClass(RADIO_VALUE_CONTAINER_CLASS);
      $(itemElement).prepend($radioContainer);
    }
    super._postprocessRenderItem(args);
  }
  _processSelectableItem($itemElement, isSelected) {
    super._processSelectableItem($itemElement, isSelected);
    $itemElement.toggleClass(RADIO_BUTTON_CHECKED_CLASS, isSelected).find(".".concat(RADIO_BUTTON_ICON_CLASS)).first().toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, isSelected);
    this.setAria('checked', isSelected, $itemElement);
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _supportedKeys() {
    var parent = super._supportedKeys();
    return extend({}, parent, {
      enter: function enter(e) {
        e.preventDefault();
        return parent.enter.apply(this, arguments);
      },
      space: function space(e) {
        e.preventDefault();
        return parent.space.apply(this, arguments);
      }
    });
  }
  _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  }
  _setAriaSelectionAttribute() {}
}
class RadioGroup extends Editor {
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _defaultOptionsRules() {
    var defaultOptionsRules = super._defaultOptionsRules();
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
    var defaultOptions = super._getDefaultOptions();
    return extend(defaultOptions, extend(DataExpressionMixin._dataExpressionDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      layout: 'vertical'
    }));
  }
  _getItemValue(item) {
    return this._valueGetter ? this._valueGetter(item) : item.text;
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _init() {
    super._init();
    this._activeStateUnit = ".".concat(RADIO_BUTTON_CLASS);
    this._feedbackHideTimeout = RADIO_FEEDBACK_HIDE_TIMEOUT;
    this._initDataExpressions();
  }
  _initMarkup() {
    this.$element().addClass(RADIO_GROUP_CLASS);
    this._renderSubmitElement();
    this.setAria('role', 'radiogroup');
    this._renderRadios();
    this._renderLayout();
    super._initMarkup();
  }
  _itemClickHandler(_ref) {
    var {
      itemElement,
      event,
      itemData
    } = _ref;
    if (this.itemElements().is(itemElement)) {
      var newValue = this._getItemValue(itemData);
      if (newValue !== this.option('value')) {
        this._saveValueChangeEvent(event);
        this.option('value', newValue);
      }
    }
  }
  _getSelectedItemKeys() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.option('value');
    var isNullSelectable = this.option('valueExpr') !== 'this';
    var shouldSelectValue = isNullSelectable && value === null || isDefined(value);
    return shouldSelectValue ? [value] : [];
  }
  _setSelection(currentValue) {
    var value = this._unwrappedValue(currentValue);
    this._setCollectionWidgetOption('selectedItemKeys', this._getSelectedItemKeys(value));
  }
  _optionChanged(args) {
    var {
      name,
      value
    } = args;
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
    var layout = this.option('layout');
    var $element = this.$element();
    $element.toggleClass(RADIO_GROUP_VERTICAL_CLASS, layout === 'vertical');
    $element.toggleClass(RADIO_GROUP_HORIZONTAL_CLASS, layout === 'horizontal');
  }
  _renderRadios() {
    this._areRadiosCreated = new Deferred();
    var $radios = $('<div>').appendTo(this.$element());
    var {
      displayExpr,
      accessKey,
      focusStateEnabled,
      itemTemplate,
      tabIndex
    } = this.option();
    this._createComponent($radios, RadioCollection, {
      onInitialized: _ref2 => {
        var {
          component
        } = _ref2;
        this._radios = component;
      },
      onContentReady: e => {
        this._fireContentReadyAction(true);
      },
      onItemClick: this._itemClickHandler.bind(this),
      displayExpr,
      accessKey,
      dataSource: this._dataSource,
      focusStateEnabled,
      itemTemplate,
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
    var _value;
    value = (_value = value) !== null && _value !== void 0 ? _value : this.option('value');
    var submitValue = this.option('valueExpr') === 'this' ? this._displayGetter(value) : value;
    this._$submitElement.val(submitValue);
  }
  _setCollectionWidgetOption() {
    this._areRadiosCreated.done(this._setWidgetOption.bind(this, '_radios', arguments));
  }
  _updateItemsSize() {
    if (this.option('layout') === 'horizontal') {
      this.itemElements().css('height', 'auto');
    } else {
      var itemsCount = this.option('items').length;
      this.itemElements().css('height', 100 / itemsCount + '%');
    }
  }
  focus() {
    var _this$_radios;
    (_this$_radios = this._radios) === null || _this$_radios === void 0 ? void 0 : _this$_radios.focus();
  }
  itemElements() {
    var _this$_radios2;
    return (_this$_radios2 = this._radios) === null || _this$_radios2 === void 0 ? void 0 : _this$_radios2.itemElements();
  }
}
RadioGroup.include(DataExpressionMixin);
registerComponent('dxRadioGroup', RadioGroup);
export default RadioGroup;
