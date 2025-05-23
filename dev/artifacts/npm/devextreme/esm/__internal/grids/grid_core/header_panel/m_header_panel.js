/**
* DevExtreme (esm/__internal/grids/grid_core/header_panel/m_header_panel.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import { noop } from '../../../../core/utils/common';
import { getPathParts } from '../../../../core/utils/data';
import { extend } from '../../../../core/utils/extend';
import { isDefined, isString } from '../../../../core/utils/type';
import messageLocalization from '../../../../localization/message';
import Toolbar from '../../../../ui/toolbar';
import { ColumnsView } from '../views/m_columns_view';
var HEADER_PANEL_CLASS = 'header-panel';
var TOOLBAR_BUTTON_CLASS = 'toolbar-button';
var TOOLBAR_ARIA_LABEL = '-ariaToolbar';
var DEFAULT_TOOLBAR_ITEM_NAMES = ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'];
var members = {
  _getToolbarItems() {
    return [];
  },
  _getButtonContainer() {
    return $('<div>').addClass(this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS));
  },
  _getToolbarButtonClass(specificClass) {
    var secondClass = specificClass ? " ".concat(specificClass) : '';
    return this.addWidgetPrefix(TOOLBAR_BUTTON_CLASS) + secondClass;
  },
  _getToolbarOptions() {
    var userToolbarOptions = this.option('toolbar');
    var options = {
      toolbarOptions: {
        items: this._getToolbarItems(),
        visible: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.visible,
        disabled: userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.disabled,
        onItemRendered(e) {
          var itemRenderedCallback = e.itemData.onItemRendered;
          if (itemRenderedCallback) {
            itemRenderedCallback(e);
          }
        }
      }
    };
    var userItems = userToolbarOptions === null || userToolbarOptions === void 0 ? void 0 : userToolbarOptions.items;
    options.toolbarOptions.items = this._normalizeToolbarItems(options.toolbarOptions.items, userItems);
    this.executeAction('onToolbarPreparing', options);
    if (options.toolbarOptions && !isDefined(options.toolbarOptions.visible)) {
      var toolbarItems = options.toolbarOptions.items;
      options.toolbarOptions.visible = !!(toolbarItems === null || toolbarItems === void 0 ? void 0 : toolbarItems.length);
    }
    return options.toolbarOptions;
  },
  _normalizeToolbarItems(defaultItems, userItems) {
    defaultItems.forEach(button => {
      if (!DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
        throw new Error("Default toolbar item '".concat(button.name, "' is not added to DEFAULT_TOOLBAR_ITEM_NAMES"));
      }
    });
    var defaultProps = {
      location: 'after'
    };
    var isArray = Array.isArray(userItems);
    if (!isDefined(userItems)) {
      return defaultItems;
    }
    if (!isArray) {
      userItems = [userItems];
    }
    var defaultButtonsByNames = {};
    defaultItems.forEach(button => {
      defaultButtonsByNames[button.name] = button;
    });
    var normalizedItems = userItems.map(button => {
      if (isString(button)) {
        button = {
          name: button
        };
      }
      if (isDefined(button.name)) {
        if (isDefined(defaultButtonsByNames[button.name])) {
          button = extend(true, {}, defaultButtonsByNames[button.name], button);
        } else if (DEFAULT_TOOLBAR_ITEM_NAMES.includes(button.name)) {
          button = _extends(_extends({}, button), {
            visible: false
          });
        }
      }
      return extend(true, {}, defaultProps, button);
    });
    return isArray ? normalizedItems : normalizedItems[0];
  },
  _renderCore() {
    if (!this._toolbar) {
      var $headerPanel = this.element();
      $headerPanel.addClass(this.addWidgetPrefix(HEADER_PANEL_CLASS));
      var label = messageLocalization.format(this.component.NAME + TOOLBAR_ARIA_LABEL);
      var $toolbar = $('<div>').attr('aria-label', label).appendTo($headerPanel);
      this._toolbar = this._createComponent($toolbar, Toolbar, this._toolbarOptions);
    } else {
      this._toolbar.option(this._toolbarOptions);
    }
  },
  _columnOptionChanged: noop,
  _handleDataChanged() {
    if (this._requireReady) {
      this.render();
    }
  },
  init() {
    this.callBase();
    this.createAction('onToolbarPreparing', {
      excludeValidators: ['disabled', 'readOnly']
    });
  },
  render() {
    this._toolbarOptions = this._getToolbarOptions();
    this.callBase.apply(this, arguments);
  },
  setToolbarItemDisabled(name, disabled) {
    var toolbar = this._toolbar;
    if (!toolbar) {
      return;
    }
    var items = toolbar.option('items') || [];
    var itemIndex = items.findIndex(item => item.name === name);
    if (itemIndex < 0) {
      return;
    }
    var item = toolbar.option("items[".concat(itemIndex, "]"));
    toolbar.option("items[".concat(itemIndex, "].disabled"), disabled);
    if (item.options) {
      toolbar.option("items[".concat(itemIndex, "].options.disabled"), disabled);
    }
  },
  updateToolbarDimensions() {
    var _a;
    (_a = this._toolbar) === null || _a === void 0 ? void 0 : _a.updateDimensions();
  },
  getHeaderPanel() {
    return this.element();
  },
  getHeight() {
    return this.getElementHeight();
  },
  optionChanged(args) {
    if (args.name === 'onToolbarPreparing') {
      this._invalidate();
      args.handled = true;
    }
    if (args.name === 'toolbar') {
      args.handled = true;
      if (this._toolbar) {
        var parts = getPathParts(args.fullName);
        var optionName = args.fullName.replace(/^toolbar\./, '');
        if (parts.length === 1) {
          // `toolbar` case
          var toolbarOptions = this._getToolbarOptions();
          this._toolbar.option(toolbarOptions);
        } else if (parts[1] === 'items') {
          if (parts.length === 2) {
            // `toolbar.items` case
            var _toolbarOptions = this._getToolbarOptions();
            this._toolbar.option('items', _toolbarOptions.items);
          } else if (parts.length === 3) {
            // `toolbar.items[i]` case
            var normalizedItem = this._normalizeToolbarItems(this._getToolbarItems(), args.value);
            this._toolbar.option(optionName, normalizedItem);
          } else if (parts.length >= 4) {
            // `toolbar.items[i].prop` case
            this._toolbar.option(optionName, args.value);
          }
        } else {
          // `toolbar.visible`, `toolbar.disabled` case
          this._toolbar.option(optionName, args.value);
        }
      }
    }
    this.callBase(args);
  },
  isVisible() {
    return !!(this._toolbarOptions && this._toolbarOptions.visible);
  },
  allowDragging: noop,
  hasGroupedColumns: noop
};
var HeaderPanel = ColumnsView.inherit(members);
export var headerPanelModule = {
  defaultOptions() {
    return {};
  },
  views: {
    headerPanel: HeaderPanel
  },
  extenders: {
    controllers: {
      resizing: {
        _updateDimensionsCore() {
          this.callBase.apply(this, arguments);
          this.getView('headerPanel').updateToolbarDimensions();
        }
      }
    }
  }
};
