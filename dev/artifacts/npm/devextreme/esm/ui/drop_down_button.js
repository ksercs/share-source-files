/**
* DevExtreme (esm/ui/drop_down_button.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../core/renderer';
import Widget from './widget/ui.widget';
import { FunctionTemplate } from '../core/templates/function_template';
import registerComponent from '../core/component_registrator';
import ButtonGroup from './button_group';
import Popup from './popup/ui.popup';
import List from './list_light';
import { compileGetter } from '../core/utils/data';
import { getPublicElement } from '../core/element';
import { getImageContainer } from '../core/utils/icon';
import DataHelperMixin from '../data_helper';
import { DataSource } from '../data/data_source/data_source';
import ArrayStore from '../data/array_store';
import { Deferred } from '../core/utils/deferred';
import { extend } from '../core/utils/extend';
import { isPlainObject, isDefined } from '../core/utils/type';
import { ensureDefined, noop } from '../core/utils/common';
import Guid from '../core/guid';
import { getElementWidth, getSizeValue } from './drop_down_editor/utils';
import messageLocalization from '../localization/message';

// STYLE dropDownButton

var DROP_DOWN_BUTTON_CLASS = 'dx-dropdownbutton';
var DROP_DOWN_BUTTON_CONTENT = 'dx-dropdownbutton-content';
var DROP_DOWN_BUTTON_ACTION_CLASS = 'dx-dropdownbutton-action';
var DROP_DOWN_BUTTON_TOGGLE_CLASS = 'dx-dropdownbutton-toggle';
var DROP_DOWN_BUTTON_HAS_ARROW_CLASS = 'dx-dropdownbutton-has-arrow';
var DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS = 'dx-dropdownbutton-popup-wrapper';
var DROP_DOWN_EDITOR_OVERLAY_CLASS = 'dx-dropdowneditor-overlay';
var DX_BUTTON_CLASS = 'dx-button';
var DX_BUTTON_TEXT_CLASS = 'dx-button-text';
var DX_ICON_RIGHT_CLASS = 'dx-icon-right';
var DropDownButton = Widget.inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
      /**
       * @name dxDropDownButtonItem.key
       * @hidden
       */
      /**
       * @name dxDropDownButtonItem.showChevron
       * @hidden
       */

      itemTemplate: 'item',
      keyExpr: 'this',
      displayExpr: undefined,
      selectedItem: null,
      selectedItemKey: null,
      stylingMode: 'outlined',
      deferRendering: true,
      noDataText: messageLocalization.format('dxCollectionWidget-noDataText'),
      useSelectMode: false,
      splitButton: false,
      showArrowIcon: true,
      text: '',
      icon: undefined,
      onButtonClick: null,
      onSelectionChanged: null,
      onItemClick: null,
      opened: false,
      items: null,
      dataSource: null,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      dropDownOptions: {},
      dropDownContentTemplate: 'content',
      wrapItemText: false,
      useItemTextAsTitle: true,
      grouped: false,
      groupTemplate: 'group',
      buttonGroupOptions: {}
    });
  },
  _setOptionsByReference() {
    this.callBase();
    extend(this._optionsByReference, {
      selectedItem: true
    });
  },
  _init() {
    this.callBase();
    this._createItemClickAction();
    this._createActionClickAction();
    this._createSelectionChangedAction();
    this._initDataSource();
    this._compileKeyGetter();
    this._compileDisplayGetter();
    this._itemsToDataSource(this.option('items'));
    this._options.cache('buttonGroupOptions', this.option('buttonGroupOptions'));
    this._options.cache('dropDownOptions', this.option('dropDownOptions'));
  },
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      content: new FunctionTemplate(options => {
        var $popupContent = $(options.container);
        var $listContainer = $('<div>').appendTo($popupContent);
        this._list = this._createComponent($listContainer, List, this._listOptions());
        this._list.registerKeyHandler('escape', this._escHandler.bind(this));
        this._list.registerKeyHandler('tab', this._escHandler.bind(this));
        this._list.registerKeyHandler('leftArrow', this._escHandler.bind(this));
        this._list.registerKeyHandler('rightArrow', this._escHandler.bind(this));
      })
    });
    this.callBase();
  },
  _itemsToDataSource: function _itemsToDataSource(value) {
    if (!this._dataSource) {
      this._dataSource = new DataSource({
        store: new ArrayStore({
          key: this._getKey(),
          data: value
        }),
        pageSize: 0
      });
    }
  },
  _getKey: function _getKey() {
    var _this$_dataSource;
    var keyExpr = this.option('keyExpr');
    var storeKey = (_this$_dataSource = this._dataSource) === null || _this$_dataSource === void 0 ? void 0 : _this$_dataSource.key();
    return isDefined(storeKey) && (!isDefined(keyExpr) || keyExpr === 'this') ? storeKey : keyExpr;
  },
  _compileKeyGetter() {
    this._keyGetter = compileGetter(this._getKey());
  },
  _compileDisplayGetter() {
    this._displayGetter = compileGetter(this.option('displayExpr'));
  },
  _initMarkup() {
    this.callBase();
    this.$element().addClass(DROP_DOWN_BUTTON_CLASS);
    this._renderButtonGroup();
    this._updateArrowClass();
    if (isDefined(this.option('selectedItemKey'))) {
      this._loadSelectedItem().done(this._updateActionButton.bind(this));
    }
  },
  // T977758
  _renderFocusTarget: noop,
  _render() {
    if (!this.option('deferRendering') || this.option('opened')) {
      this._renderPopup();
    }
    this.callBase();
  },
  _renderContentImpl() {
    if (this._popup) {
      this._renderPopupContent();
    }
    return this.callBase();
  },
  _loadSelectedItem() {
    var _this$_loadSingleDefe;
    (_this$_loadSingleDefe = this._loadSingleDeferred) === null || _this$_loadSingleDefe === void 0 ? void 0 : _this$_loadSingleDefe.reject();
    var d = new Deferred();
    if (this._list && this._lastSelectedItemData !== undefined) {
      var cachedResult = this.option('useSelectMode') ? this._list.option('selectedItem') : this._lastSelectedItemData;
      return d.resolve(cachedResult);
    }
    this._lastSelectedItemData = undefined;
    var selectedItemKey = this.option('selectedItemKey');
    this._loadSingle(this._getKey(), selectedItemKey).done(d.resolve).fail(() => {
      d.resolve(null);
    });
    this._loadSingleDeferred = d;
    return d.promise();
  },
  _createActionClickAction() {
    this._actionClickAction = this._createActionByOption('onButtonClick');
  },
  _createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
  },
  _createItemClickAction() {
    this._itemClickAction = this._createActionByOption('onItemClick');
  },
  _fireSelectionChangedAction(_ref) {
    var {
      previousValue,
      value
    } = _ref;
    this._selectionChangedAction({
      item: value,
      previousItem: previousValue
    });
  },
  _fireItemClickAction(_ref2) {
    var {
      event,
      itemElement,
      itemData
    } = _ref2;
    return this._itemClickAction({
      event,
      itemElement,
      itemData: this._actionItem || itemData
    });
  },
  _actionButtonConfig() {
    return {
      text: this.option('text'),
      icon: this.option('icon'),
      elementAttr: {
        class: DROP_DOWN_BUTTON_ACTION_CLASS
      }
    };
  },
  _getButtonGroupItems() {
    var items = [];
    items.push(this._actionButtonConfig());
    if (this.option('splitButton')) {
      items.push({
        icon: 'spindown',
        elementAttr: {
          class: DROP_DOWN_BUTTON_TOGGLE_CLASS
        }
      });
    }
    return items;
  },
  _buttonGroupItemClick(_ref3) {
    var {
      event,
      itemData
    } = _ref3;
    var isActionButton = itemData.elementAttr.class === DROP_DOWN_BUTTON_ACTION_CLASS;
    var isToggleButton = itemData.elementAttr.class === DROP_DOWN_BUTTON_TOGGLE_CLASS;
    if (isToggleButton) {
      this.toggle();
    } else if (isActionButton) {
      this._actionClickAction({
        event,
        selectedItem: this.option('selectedItem')
      });
      if (!this.option('splitButton')) {
        this.toggle();
      }
    }
  },
  _buttonGroupOptions() {
    var {
      splitButton,
      showArrowIcon,
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode,
      accessKey,
      tabIndex
    } = this.option();
    var buttonTemplate = splitButton || !showArrowIcon ? 'content' : (_ref4, buttonContent) => {
      var {
        text,
        icon
      } = _ref4;
      var $firstIcon = getImageContainer(icon);
      var $textContainer = text ? $('<span>').text(text).addClass(DX_BUTTON_TEXT_CLASS) : undefined;
      var $secondIcon = getImageContainer('spindown').addClass(DX_ICON_RIGHT_CLASS);
      $(buttonContent).append($firstIcon, $textContainer, $secondIcon);
    };
    return extend({
      items: this._getButtonGroupItems(),
      onItemClick: this._buttonGroupItemClick.bind(this),
      width: '100%',
      height: '100%',
      selectionMode: 'none',
      onKeyboardHandled: e => this._keyboardHandler(e),
      buttonTemplate,
      focusStateEnabled,
      hoverStateEnabled,
      stylingMode,
      accessKey,
      tabIndex
    }, this._options.cache('buttonGroupOptions'));
  },
  _renderPopupContent() {
    var $content = this._popup.$content();
    var template = this._getTemplateByOption('dropDownContentTemplate');
    $content.empty();
    this._popupContentId = 'dx-' + new Guid();
    this.setAria('id', this._popupContentId, $content);
    return template.render({
      container: getPublicElement($content),
      model: this.option('items') || this._dataSource
    });
  },
  _popupOptions() {
    var horizontalAlignment = this.option('rtlEnabled') ? 'right' : 'left';
    return extend({
      dragEnabled: false,
      focusStateEnabled: false,
      deferRendering: this.option('deferRendering'),
      hideOnOutsideClick: e => {
        var $element = this.$element();
        var $buttonClicked = $(e.target).closest(".".concat(DROP_DOWN_BUTTON_CLASS));
        return !$buttonClicked.is($element);
      },
      showTitle: false,
      animation: {
        show: {
          type: 'fade',
          duration: 0,
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          duration: 400,
          from: 1,
          to: 0
        }
      },
      _ignoreFunctionValueDeprecation: true,
      width: () => getElementWidth(this.$element()),
      height: 'auto',
      shading: false,
      position: {
        of: this.$element(),
        collision: 'flipfit',
        my: horizontalAlignment + ' top',
        at: horizontalAlignment + ' bottom'
      },
      _wrapperClassExternal: DROP_DOWN_EDITOR_OVERLAY_CLASS
    }, this._options.cache('dropDownOptions'), {
      visible: this.option('opened')
    });
  },
  _listOptions() {
    var selectedItemKey = this.option('selectedItemKey');
    var useSelectMode = this.option('useSelectMode');
    return {
      selectionMode: useSelectMode ? 'single' : 'none',
      wrapItemText: this.option('wrapItemText'),
      focusStateEnabled: this.option('focusStateEnabled'),
      hoverStateEnabled: this.option('hoverStateEnabled'),
      useItemTextAsTitle: this.option('useItemTextAsTitle'),
      onContentReady: () => this._fireContentReadyAction(),
      selectedItemKeys: isDefined(selectedItemKey) && useSelectMode ? [selectedItemKey] : [],
      grouped: this.option('grouped'),
      groupTemplate: this.option('groupTemplate'),
      keyExpr: this._getKey(),
      noDataText: this.option('noDataText'),
      displayExpr: this.option('displayExpr'),
      itemTemplate: this.option('itemTemplate'),
      items: this.option('items'),
      dataSource: this._dataSource,
      onItemClick: e => {
        if (!this.option('useSelectMode')) {
          this._lastSelectedItemData = e.itemData;
        }
        this.option('selectedItemKey', this._keyGetter(e.itemData));
        var actionResult = this._fireItemClickAction(e);
        if (actionResult !== false) {
          this.toggle(false);
          this._buttonGroup.focus();
        }
      }
    };
  },
  _upDownKeyHandler() {
    if (this._popup && this._popup.option('visible') && this._list) {
      this._list.focus();
    } else {
      this.open();
    }
    return true;
  },
  _escHandler() {
    this.close();
    this._buttonGroup.focus();
    return true;
  },
  _tabHandler() {
    this.close();
    return true;
  },
  _renderPopup() {
    var $popup = $('<div>');
    this.$element().append($popup);
    this._popup = this._createComponent($popup, Popup, this._popupOptions());
    this._popup.$content().addClass(DROP_DOWN_BUTTON_CONTENT);
    this._popup.$wrapper().addClass(DROP_DOWN_BUTTON_POPUP_WRAPPER_CLASS);
    this._popup.on('hiding', this._popupHidingHandler.bind(this));
    this._popup.on('showing', this._popupShowingHandler.bind(this));
    this._bindInnerWidgetOptions(this._popup, 'dropDownOptions');
  },
  _popupHidingHandler() {
    this.option('opened', false);
    this._updateAriaAttributes(false);
  },
  _popupOptionChanged: function _popupOptionChanged(args) {
    var options = Widget.getOptionsFromContainer(args);
    this._setPopupOption(options);
    var optionsKeys = Object.keys(options);
    if (optionsKeys.indexOf('width') !== -1 || optionsKeys.indexOf('height') !== -1) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function _dimensionChanged() {
    var popupWidth = getSizeValue(this.option('dropDownOptions.width'));
    if (popupWidth === undefined) {
      this._setPopupOption('width', () => getElementWidth(this.$element()));
    }
  },
  _setPopupOption: function _setPopupOption(optionName, value) {
    this._setWidgetOption('_popup', arguments);
  },
  _popupShowingHandler() {
    this.option('opened', true);
    this._updateAriaAttributes(true);
  },
  _setElementAria(value) {
    var elementAria = {
      owns: value ? this._popupContentId : undefined
    };
    this.setAria(elementAria, this.$element());
  },
  _setButtonsAria(value) {
    var commonButtonAria = {
      expanded: value,
      haspopup: 'listbox'
    };
    var firstButtonAria = {};
    if (!this.option('text')) {
      firstButtonAria.label = 'dropdownbutton';
    }
    this._getButtons().each((index, $button) => {
      if (index === 0) {
        this.setAria(_extends({}, firstButtonAria, commonButtonAria), $($button));
      } else {
        this.setAria(commonButtonAria, $($button));
      }
    });
  },
  _updateAriaAttributes(value) {
    this._setElementAria(value);
    this._setButtonsAria(value);
  },
  _getButtons() {
    return this._buttonGroup.$element().find(".".concat(DX_BUTTON_CLASS));
  },
  _renderButtonGroup() {
    var $buttonGroup = this._buttonGroup && this._buttonGroup.$element() || $('<div>');
    if (!this._buttonGroup) {
      this.$element().append($buttonGroup);
    }
    this._buttonGroup = this._createComponent($buttonGroup, ButtonGroup, this._buttonGroupOptions());
    this._buttonGroup.registerKeyHandler('downArrow', this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler('tab', this._tabHandler.bind(this));
    this._buttonGroup.registerKeyHandler('upArrow', this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler('escape', this._escHandler.bind(this));
    this._bindInnerWidgetOptions(this._buttonGroup, 'buttonGroupOptions');
    this._updateAriaAttributes(this.option('opened'));
  },
  _updateArrowClass() {
    var hasArrow = this.option('splitButton') || this.option('showArrowIcon');
    this.$element().toggleClass(DROP_DOWN_BUTTON_HAS_ARROW_CLASS, hasArrow);
  },
  toggle(visible) {
    if (!this._popup) {
      this._renderPopup();
      this._renderContent();
    }
    return this._popup.toggle(visible);
  },
  open() {
    return this.toggle(true);
  },
  close() {
    return this.toggle(false);
  },
  _setListOption(name, value) {
    this._list && this._list.option(name, value);
  },
  _getDisplayValue(item) {
    var isPrimitiveItem = !isPlainObject(item);
    var displayValue = isPrimitiveItem ? item : this._displayGetter(item);
    return !isPlainObject(displayValue) ? String(ensureDefined(displayValue, '')) : '';
  },
  _updateActionButton(selectedItem) {
    if (this.option('useSelectMode')) {
      this.option({
        text: this._getDisplayValue(selectedItem),
        icon: isPlainObject(selectedItem) ? selectedItem.icon : undefined
      });
    }
    this._setOptionWithoutOptionChange('selectedItem', selectedItem);
    this._setOptionWithoutOptionChange('selectedItemKey', this._keyGetter(selectedItem));
  },
  _clean() {
    this._list && this._list.$element().remove();
    this._popup && this._popup.$element().remove();
  },
  _selectedItemKeyChanged(value) {
    this._setListOption('selectedItemKeys', this.option('useSelectMode') && isDefined(value) ? [value] : []);
    var previousItem = this.option('selectedItem');
    this._loadSelectedItem().done(selectedItem => {
      this._updateActionButton(selectedItem);
      if (this._displayGetter(previousItem) !== this._displayGetter(selectedItem)) {
        this._fireSelectionChangedAction({
          previousValue: previousItem,
          value: selectedItem
        });
      }
    });
  },
  _updateButtonGroup(name, value) {
    this._buttonGroup.option(name, value);
    this._updateAriaAttributes(this.option('opened'));
  },
  _actionButtonOptionChanged(_ref5) {
    var {
      name,
      value
    } = _ref5;
    var newConfig = {};
    newConfig[name] = value;
    this._updateButtonGroup('items[0]', extend({}, this._actionButtonConfig(), newConfig));
    this._popup && this._popup.repaint();
  },
  _selectModeChanged(value) {
    if (value) {
      this._setListOption('selectionMode', 'single');
      var selectedItemKey = this.option('selectedItemKey');
      this._setListOption('selectedItemKeys', isDefined(selectedItemKey) ? [selectedItemKey] : []);
      this._selectedItemKeyChanged(this.option('selectedItemKey'));
    } else {
      this._setListOption('selectionMode', 'none');
      this.option({
        'selectedItemKey': undefined,
        'selectedItem': undefined
      });
      this._actionButtonOptionChanged({
        text: this.option('text')
      });
    }
  },
  _updateItemCollection(optionName) {
    var selectedItemKey = this.option('selectedItemKey');
    this._setListOption('selectedItem', null);
    this._setWidgetOption('_list', [optionName]);
    if (isDefined(selectedItemKey)) {
      this._loadSelectedItem().done(selectedItem => {
        this._setListOption('selectedItemKeys', [selectedItemKey]);
        this._setListOption('selectedItem', selectedItem);
      }).fail(error => {
        this._setListOption('selectedItemKeys', []);
      }).always(this._updateActionButton.bind(this));
    }
  },
  _updateDataSource: function _updateDataSource() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._dataSource.items();
    this._dataSource = undefined;
    this._itemsToDataSource(items);
    this._updateKeyExpr();
  },
  _updateKeyExpr: function _updateKeyExpr() {
    this._compileKeyGetter();
    this._setListOption('keyExpr', this._getKey());
  },
  focus: function focus() {
    this._buttonGroup.focus();
  },
  _optionChanged(args) {
    var _this$_popup;
    var {
      name,
      value
    } = args;
    switch (name) {
      case 'useSelectMode':
        this._selectModeChanged(value);
        break;
      case 'splitButton':
        this._updateArrowClass();
        this._renderButtonGroup();
        break;
      case 'displayExpr':
        this._compileDisplayGetter();
        this._setListOption(name, value);
        this._updateActionButton(this.option('selectedItem'));
        break;
      case 'keyExpr':
        this._updateDataSource();
        break;
      case 'buttonGroupOptions':
        this._innerWidgetOptionChanged(this._buttonGroup, args);
        break;
      case 'dropDownOptions':
        if (args.fullName === 'dropDownOptions.visible') {
          break;
        }
        if (args.value.visible !== undefined) {
          delete args.value.visible;
        }
        this._popupOptionChanged(args);
        this._innerWidgetOptionChanged(this._popup, args);
        break;
      case 'opened':
        this.toggle(value);
        break;
      case 'focusStateEnabled':
      case 'hoverStateEnabled':
        this._setListOption(name, value);
        this._updateButtonGroup(name, value);
        this.callBase(args);
        break;
      case 'items':
        this._updateDataSource(this.option('items'));
        this._updateItemCollection(name);
        break;
      case 'dataSource':
        if (Array.isArray(value)) {
          this._updateDataSource(this.option('dataSource'));
        } else {
          this._initDataSource();
          this._updateKeyExpr();
        }
        this._updateItemCollection(name);
        break;
      case 'icon':
      case 'text':
        this._actionButtonOptionChanged(args);
        break;
      case 'showArrowIcon':
        this._updateArrowClass();
        this._renderButtonGroup();
        this._popup && this._popup.repaint();
        break;
      case 'width':
      case 'height':
        this.callBase(args);
        (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.repaint();
        break;
      case 'stylingMode':
        this._updateButtonGroup(name, value);
        break;
      case 'itemTemplate':
      case 'grouped':
      case 'noDataText':
      case 'groupTemplate':
      case 'wrapItemText':
      case 'useItemTextAsTitle':
        this._setListOption(name, value);
        break;
      case 'dropDownContentTemplate':
        this._renderContent();
        break;
      case 'selectedItemKey':
        this._selectedItemKeyChanged(value);
        break;
      case 'selectedItem':
        break;
      case 'onItemClick':
        this._createItemClickAction();
        break;
      case 'onButtonClick':
        this._createActionClickAction();
        break;
      case 'onSelectionChanged':
        this._createSelectionChangedAction();
        break;
      case 'deferRendering':
        this.toggle(this.option('opened'));
        break;
      case 'tabIndex':
        this._updateButtonGroup(name, value);
        break;
      default:
        this.callBase(args);
    }
  }
}).include(DataHelperMixin);
registerComponent('dxDropDownButton', DropDownButton);
export default DropDownButton;

/**
 * @name dxDropDownButtonItem
 * @inherits dxListItem
 * @type object
 */
