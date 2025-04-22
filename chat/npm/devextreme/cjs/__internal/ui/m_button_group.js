/**
* DevExtreme (cjs/__internal/ui/m_button_group.js)
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
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _bindable_template = require("../../core/templates/bindable_template");
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _button = _interopRequireDefault(require("../../ui/button"));
var _uiCollection_widget = _interopRequireDefault(require("../../ui/collection/ui.collection_widget.edit"));
var _widget = _interopRequireDefault(require("../core/widget/widget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable max-classes-per-file */
const BUTTON_GROUP_CLASS = 'dx-buttongroup';
const BUTTON_GROUP_WRAPPER_CLASS = `${BUTTON_GROUP_CLASS}-wrapper`;
const BUTTON_GROUP_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-item`;
const BUTTON_GROUP_FIRST_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-first-item`;
const BUTTON_GROUP_LAST_ITEM_CLASS = `${BUTTON_GROUP_CLASS}-last-item`;
const BUTTON_GROUP_ITEM_HAS_WIDTH = `${BUTTON_GROUP_ITEM_CLASS}-has-width`;
const SHAPE_STANDARD_CLASS = 'dx-shape-standard';
const BUTTON_GROUP_STYLING_MODE_CLASS = {
  contained: 'dx-buttongroup-mode-contained',
  outlined: 'dx-buttongroup-mode-outlined',
  text: 'dx-buttongroup-mode-text'
};
class ButtonCollection extends _uiCollection_widget.default {
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(($container, data, model) => {
        this._prepareItemStyles($container);
        const template = this.option('buttonTemplate');
        this._createComponent($container, _button.default, (0, _extend.extend)({}, model, data, this._getBasicButtonOptions(), {
          _templateData: this._hasCustomTemplate(template) ? model : {},
          template: model.template || template
        }));
      }, ['text', 'type', 'icon', 'disabled', 'visible', 'hint'], this.option('integrationOptions.watchMethod'))
    });
  }
  _getBasicButtonOptions() {
    const {
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    } = this.option();
    return {
      focusStateEnabled: false,
      // @ts-expect-error ts-error
      onClick: null,
      hoverStateEnabled,
      activeStateEnabled,
      stylingMode
    };
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      itemTemplateProperty: null
    });
  }
  _hasCustomTemplate(template) {
    return (0, _type.isFunction)(template) || this.option('integrationOptions.templates')[template];
  }
  // eslint-disable-next-line class-methods-use-this
  _selectedItemClass() {
    return 'dx-item-selected dx-state-selected';
  }
  _prepareItemStyles($item) {
    const itemIndex = $item.data('dxItemIndex');
    if (itemIndex === 0) {
      $item.addClass(BUTTON_GROUP_FIRST_ITEM_CLASS);
    }
    const {
      items
    } = this.option();
    items && itemIndex === items.length - 1 && $item.addClass(BUTTON_GROUP_LAST_ITEM_CLASS);
    $item.addClass(SHAPE_STANDARD_CLASS);
  }
  _renderItemContent(args) {
    args.container = (0, _renderer.default)(args.container).parent();
    return super._renderItemContent(args);
  }
  _setAriaSelectionAttribute($target, value) {
    this.setAria('pressed', value, $target);
  }
  _renderItemContentByNode(args, $node) {
    args.container = (0, _renderer.default)(args.container.children().first());
    return super._renderItemContentByNode(args, $node);
  }
  _focusTarget() {
    return this.$element().parent();
  }
  _keyboardEventBindingTarget() {
    return this._focusTarget();
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _itemClass() {
    return BUTTON_GROUP_ITEM_CLASS;
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    if (selectionMode === 'single' && this.isItemSelected(e.currentTarget)) {
      return;
    }
    super._itemSelectHandler(e);
  }
}
class ButtonGroup extends _widget.default {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      focusStateEnabled: true,
      selectionMode: 'single',
      selectedItems: [],
      selectedItemKeys: [],
      stylingMode: 'contained',
      keyExpr: 'text',
      items: [],
      buttonTemplate: 'content',
      // @ts-expect-error ts-error
      onSelectionChanged: null,
      // @ts-expect-error ts-error
      onItemClick: null
    });
  }
  _init() {
    super._init();
    this._createItemClickAction();
  }
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick');
  }
  _initMarkup() {
    this.setAria('role', 'group');
    this.$element().addClass(BUTTON_GROUP_CLASS);
    this._renderStylingMode();
    this._renderButtons();
    this._syncSelectionOptions();
    super._initMarkup();
  }
  _renderStylingMode() {
    const {
      stylingMode
    } = this.option();
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in BUTTON_GROUP_STYLING_MODE_CLASS) {
      this.$element().removeClass(BUTTON_GROUP_STYLING_MODE_CLASS[key]);
    }
    this.$element().addClass(BUTTON_GROUP_STYLING_MODE_CLASS[stylingMode ?? 'contained']);
  }
  _fireSelectionChangeEvent(addedItems, removedItems) {
    this._createActionByOption('onSelectionChanged', {
      excludeValidators: ['disabled', 'readOnly']
    })({
      addedItems,
      removedItems
    });
  }
  _renderButtons() {
    const $buttons = (0, _renderer.default)('<div>').addClass(BUTTON_GROUP_WRAPPER_CLASS).appendTo(this.$element());
    const {
      selectedItems
    } = this.option();
    const options = {
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
        const width = this.option('width');
        if ((0, _type.isDefined)(width)) {
          (0, _renderer.default)(e.itemElement).addClass(BUTTON_GROUP_ITEM_HAS_WIDTH);
        }
      },
      onSelectionChanged: e => {
        this._syncSelectionOptions();
        this._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      },
      onItemClick: e => {
        this._itemClickAction(e);
      }
    };
    if ((0, _type.isDefined)(selectedItems) && selectedItems.length) {
      options.selectedItems = selectedItems;
    }
    this._buttonsCollection = this._createComponent($buttons, ButtonCollection, options);
  }
  _syncSelectionOptions() {
    this._setOptionWithoutOptionChange('selectedItems', this._buttonsCollection.option('selectedItems'));
    this._setOptionWithoutOptionChange('selectedItemKeys', this._buttonsCollection.option('selectedItemKeys'));
  }
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
        super._optionChanged(args);
        this._buttonsCollection.itemElements().toggleClass(BUTTON_GROUP_ITEM_HAS_WIDTH, !!args.value);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
(0, _component_registrator.default)('dxButtonGroup', ButtonGroup);
var _default = exports.default = ButtonGroup;
