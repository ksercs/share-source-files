/**
* DevExtreme (esm/ui/button_group.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../core/renderer';
import Widget from './widget/ui.widget';
import Button from './button';
import CollectionWidget from './collection/ui.collection_widget.edit';
import registerComponent from '../core/component_registrator';
import { extend } from '../core/utils/extend';
import { isDefined, isFunction } from '../core/utils/type';
import { BindableTemplate } from '../core/templates/bindable_template';

// STYLE buttonGroup

var BUTTON_GROUP_CLASS = 'dx-buttongroup';
var BUTTON_GROUP_WRAPPER_CLASS = BUTTON_GROUP_CLASS + '-wrapper';
var BUTTON_GROUP_ITEM_CLASS = BUTTON_GROUP_CLASS + '-item';
var BUTTON_GROUP_FIRST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-first-item';
var BUTTON_GROUP_LAST_ITEM_CLASS = BUTTON_GROUP_CLASS + '-last-item';
var BUTTON_GROUP_ITEM_HAS_WIDTH = BUTTON_GROUP_ITEM_CLASS + '-has-width';
var SHAPE_STANDARD_CLASS = 'dx-shape-standard';
var BUTTON_GROUP_STYLING_MODE_CLASS = {
  contained: 'dx-buttongroup-mode-contained',
  outlined: 'dx-buttongroup-mode-outlined',
  text: 'dx-buttongroup-mode-text'
};
var ButtonCollection = CollectionWidget.inherit({
  _initTemplates() {
    this.callBase();
    /**
     * @name dxButtonGroupItem.html
     * @hidden
     */
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data, model) => {
        this._prepareItemStyles($container);
        var template = this.option('buttonTemplate');
        this._createComponent($container, Button, extend({}, model, data, this._getBasicButtonOptions(), {
          _templateData: this._hasCustomTemplate(template) ? model : {},
          template: model.template || template
        }));
      }, ['text', 'type', 'icon', 'disabled', 'visible', 'hint'], this.option('integrationOptions.watchMethod'))
    });
  },
  _getBasicButtonOptions() {
    return {
      focusStateEnabled: false,
      onClick: null,
      hoverStateEnabled: this.option('hoverStateEnabled'),
      activeStateEnabled: this.option('activeStateEnabled'),
      stylingMode: this.option('stylingMode')
    };
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      itemTemplateProperty: null
    });
  },
  _hasCustomTemplate(template) {
    return isFunction(template) || this.option('integrationOptions.templates')[template];
  },
  _selectedItemClass() {
    return 'dx-item-selected dx-state-selected';
  },
  _prepareItemStyles($item) {
    var itemIndex = $item.data('dxItemIndex');
    itemIndex === 0 && $item.addClass(BUTTON_GROUP_FIRST_ITEM_CLASS);
    var items = this.option('items');
    items && itemIndex === items.length - 1 && $item.addClass(BUTTON_GROUP_LAST_ITEM_CLASS);
    $item.addClass(SHAPE_STANDARD_CLASS);
  },
  _renderItemContent(args) {
    args.container = $(args.container).parent();
    return this.callBase(args);
  },
  _setAriaSelectionAttribute: function _setAriaSelectionAttribute($target, value) {
    this.setAria('pressed', value, $target);
  },
  _renderItemContentByNode: function _renderItemContentByNode(args, $node) {
    args.container = $(args.container.children().first());
    return this.callBase(args, $node);
  },
  _focusTarget() {
    return this.$element().parent();
  },
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  },
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  },
  _itemClass() {
    return BUTTON_GROUP_ITEM_CLASS;
  },
  _itemSelectHandler: function _itemSelectHandler(e) {
    if (this.option('selectionMode') === 'single' && this.isItemSelected(e.currentTarget)) {
      return;
    }
    this.callBase(e);
  }
});
var ButtonGroup = Widget.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      hoverStateEnabled: true,
      focusStateEnabled: true,
      selectionMode: 'single',
      selectedItems: [],
      selectedItemKeys: [],
      stylingMode: 'contained',
      keyExpr: 'text',
      items: [],
      buttonTemplate: 'content',
      onSelectionChanged: null,
      onItemClick: null
    });
  },
  _init() {
    this.callBase();
    this._createItemClickAction();
  },
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick');
  },
  _initMarkup() {
    this.setAria('role', 'group');
    this.$element().addClass(BUTTON_GROUP_CLASS);
    this._renderStylingMode();
    this._renderButtons();
    this._syncSelectionOptions();
    this.callBase();
  },
  _renderStylingMode() {
    var _BUTTON_GROUP_STYLING;
    var {
      stylingMode
    } = this.option();
    for (var key in BUTTON_GROUP_STYLING_MODE_CLASS) {
      this.$element().removeClass(BUTTON_GROUP_STYLING_MODE_CLASS[key]);
    }
    this.$element().addClass((_BUTTON_GROUP_STYLING = BUTTON_GROUP_STYLING_MODE_CLASS[stylingMode]) !== null && _BUTTON_GROUP_STYLING !== void 0 ? _BUTTON_GROUP_STYLING : BUTTON_GROUP_STYLING_MODE_CLASS.contained);
  },
  _fireSelectionChangeEvent: function _fireSelectionChangeEvent(addedItems, removedItems) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })({
      addedItems: addedItems,
      removedItems: removedItems
    });
  },
  _renderButtons() {
    var $buttons = $('<div>').addClass(BUTTON_GROUP_WRAPPER_CLASS).appendTo(this.$element());
    var selectedItems = this.option('selectedItems');
    var options = {
      selectionMode: this.option('selectionMode'),
      items: this.option('items'),
      keyExpr: this.option('keyExpr'),
      buttonTemplate: this.option('buttonTemplate'),
      scrollingEnabled: false,
      selectedItemKeys: this.option('selectedItemKeys'),
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      activeStateEnabled: this.option('activeStateEnabled'),
      stylingMode: this.option('stylingMode'),
      accessKey: this.option('accessKey'),
      tabIndex: this.option('tabIndex'),
      noDataText: '',
      selectionRequired: false,
      onItemRendered: e => {
        var width = this.option('width');
        isDefined(width) && $(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
      },
      onSelectionChanged: e => {
        this._syncSelectionOptions();
        this._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      },
      onItemClick: e => {
        this._itemClickAction(e);
      }
    };
    if (isDefined(selectedItems) && selectedItems.length) {
      options.selectedItems = selectedItems;
    }
    this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options);
  },
  _syncSelectionOptions() {
    this._setOptionWithoutOptionChange('selectedItems', this._buttonsCollection.option('selectedItems'));
    this._setOptionWithoutOptionChange('selectedItemKeys', this._buttonsCollection.option('selectedItemKeys'));
  },
  _optionChanged(args) {
    switch (args.name) {
      case 'stylingMode':
      case 'selectionMode':
      case 'keyExpr':
      case 'buttonTemplate':
      case 'items':
      case 'activeStateEnabled':
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
      case 'tabIndex':
        this._invalidate();
        break;
      case 'selectedItemKeys':
      case 'selectedItems':
        this._buttonsCollection.option(args.name, args.value);
        break;
      case 'onItemClick':
        this._createItemClickAction();
        break;
      case 'onSelectionChanged':
        break;
      case 'width':
        this.callBase(args);
        this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!args.value);
        break;
      default:
        this.callBase(args);
    }
  }
});
registerComponent('dxButtonGroup', ButtonGroup);
export default ButtonGroup;

/**
 * @name dxButtonGroupItem
 * @inherits CollectionWidgetItem
 * @type object
 */
