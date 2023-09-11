/**
* DevExtreme (cjs/ui/button_group.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _button = _interopRequireDefault(require("./button"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _bindable_template = require("../core/templates/bindable_template");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
var ButtonCollection = _uiCollection_widget.default.inherit({
  _initTemplates() {
    var _this = this;
    this.callBase();
    /**
     * @name dxButtonGroupItem.html
     * @hidden
     */
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(function ($container, data, model) {
        _this._prepareItemStyles($container);
        var template = _this.option('buttonTemplate');
        _this._createComponent($container, _button.default, (0, _extend.extend)({}, model, data, _this._getBasicButtonOptions(), {
          _templateData: _this._hasCustomTemplate(template) ? model : {},
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
    return (0, _extend.extend)(this.callBase(), {
      itemTemplateProperty: null
    });
  },
  _hasCustomTemplate(template) {
    return (0, _type.isFunction)(template) || this.option('integrationOptions.templates')[template];
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
    args.container = (0, _renderer.default)(args.container).parent();
    return this.callBase(args);
  },
  _setAriaSelectionAttribute: function _setAriaSelectionAttribute($target, value) {
    this.setAria('pressed', value, $target);
  },
  _renderItemContentByNode: function _renderItemContentByNode(args, $node) {
    args.container = (0, _renderer.default)(args.container.children().first());
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
var ButtonGroup = _ui.default.inherit({
  _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
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
    var _this$option = this.option(),
      stylingMode = _this$option.stylingMode;
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
    var _this2 = this;
    var $buttons = (0, _renderer.default)('<div>').addClass(BUTTON_GROUP_WRAPPER_CLASS).appendTo(this.$element());
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
      onItemRendered: function onItemRendered(e) {
        var width = _this2.option('width');
        (0, _type.isDefined)(width) && (0, _renderer.default)(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
      },
      onSelectionChanged: function onSelectionChanged(e) {
        _this2._syncSelectionOptions();
        _this2._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      },
      onItemClick: function onItemClick(e) {
        _this2._itemClickAction(e);
      }
    };
    if ((0, _type.isDefined)(selectedItems) && selectedItems.length) {
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
(0, _component_registrator.default)('dxButtonGroup', ButtonGroup);
var _default = ButtonGroup;
/**
 * @name dxButtonGroupItem
 * @inherits CollectionWidgetItem
 * @type object
 */
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
