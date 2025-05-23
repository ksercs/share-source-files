/**
* DevExtreme (esm/ui/html_editor/modules/tableContextMenu.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
import $ from '../../../core/renderer';
import BaseModule from './base';
import eventsEngine from '../../../events/core/events_engine';
import { addNamespace } from '../../../events/utils/index';
import ContextMenu from '../../context_menu';
import localizationMessage from '../../../localization/message';
import { getTableFormats } from '../utils/table_helper';
import { getFormatHandlers, getDefaultClickHandler, ICON_MAP } from '../utils/toolbar_helper';
import { each } from '../../../core/utils/iterator';
import { isString, isObject } from '../../../core/utils/type';
import { titleize, camelize } from '../../../core/utils/inflector';
import { extend } from '../../../core/utils/extend';
var MODULE_NAMESPACE = 'dxHtmlEditorTableContextMenu';
var CONTEXT_MENU_EVENT = addNamespace('dxcontextmenu', MODULE_NAMESPACE);
var TableContextMenuModule = BaseModule;
var localize = name => {
  return localizationMessage.format("dxHtmlEditor-".concat(camelize(name)));
};
if (Quill) {
  TableContextMenuModule = class TableContextMenuModule extends BaseModule {
    constructor(quill, options) {
      super(quill, options);
      this.enabled = !!options.enabled;
      this._quillContainer = this.editorInstance._getQuillContainer();
      this.addCleanCallback(this.prepareCleanCallback());
      this._formatHandlers = getFormatHandlers(this);
      this._tableFormats = getTableFormats(quill);
      if (this.enabled) {
        this._enableContextMenu(options.items);
      }
    }
    _enableContextMenu(items) {
      var _this$_contextMenu;
      (_this$_contextMenu = this._contextMenu) === null || _this$_contextMenu === void 0 ? void 0 : _this$_contextMenu.dispose();
      this._contextMenu = this._createContextMenu(items);
      this._attachEvents();
    }
    _attachEvents() {
      eventsEngine.on(this.editorInstance._getContent(), CONTEXT_MENU_EVENT, this._prepareContextMenuHandler());
    }
    _detachEvents() {
      eventsEngine.off(this.editorInstance._getContent(), CONTEXT_MENU_EVENT);
    }
    _createContextMenu(items) {
      var $container = $('<div>').appendTo(this.editorInstance.$element());
      var menuConfig = this._getMenuConfig(items);
      return this.editorInstance._createComponent($container, ContextMenu, menuConfig);
    }
    showPropertiesForm() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cell';
      var $element = $(this._targetElement).closest(type === 'cell' ? 'th, td' : 'table');
      this._contextMenu.hide();
      this._formatHandlers["".concat(type, "Properties")]($element);
      this._targetElement = null;
    }
    _isAcceptableItem(widget, acceptableWidgetName) {
      return !widget || widget === acceptableWidgetName;
    }
    _handleObjectItem(item) {
      if (item.name && this._isAcceptableItem(item.widget, 'dxButton')) {
        var defaultButtonItemConfig = this._prepareMenuItemConfig(item.name);
        var buttonItemConfig = extend(true, defaultButtonItemConfig, item);
        return buttonItemConfig;
      } else if (item.items) {
        item.items = this._prepareMenuItems(item.items);
        return item;
      } else {
        return item;
      }
    }
    _prepareMenuItemConfig(name) {
      var _ICON_MAP$name, _this$_formatHandlers;
      var iconName = (_ICON_MAP$name = ICON_MAP[name]) !== null && _ICON_MAP$name !== void 0 ? _ICON_MAP$name : name;
      var buttonText = titleize(name);
      return {
        text: localize(buttonText),
        icon: iconName.toLowerCase(),
        onClick: (_this$_formatHandlers = this._formatHandlers[name]) !== null && _this$_formatHandlers !== void 0 ? _this$_formatHandlers : getDefaultClickHandler(this, name)
      };
    }
    _prepareMenuItems(items) {
      var resultItems = [];
      each(items, (_, item) => {
        var newItem;
        if (isObject(item)) {
          newItem = this._handleObjectItem(item);
        } else if (isString(item)) {
          newItem = this._prepareMenuItemConfig(item);
        }
        if (newItem) {
          resultItems.push(newItem);
        }
      });
      return resultItems;
    }
    _getMenuConfig(items) {
      var defaultItems = [{
        text: localize('insert'),
        items: ['insertHeaderRow', 'insertRowAbove', 'insertRowBelow', extend(this._prepareMenuItemConfig('insertColumnLeft'), {
          beginGroup: true
        }), 'insertColumnRight']
      }, {
        text: localize('delete'),
        items: ['deleteColumn', 'deleteRow', 'deleteTable']
      }, extend(this._prepareMenuItemConfig('cellProperties'), {
        onClick: e => {
          this.showPropertiesForm('cell');
        }
      }), extend(this._prepareMenuItemConfig('tableProperties'), {
        onClick: e => {
          this.showPropertiesForm('table');
        }
      })];
      var customItems = this._prepareMenuItems(items !== null && items !== void 0 && items.length ? items : defaultItems);
      return {
        target: this._quillContainer,
        showEvent: null,
        hideOnParentScroll: false,
        items: customItems
      };
    }
    _prepareContextMenuHandler() {
      return event => {
        if (this._isTableTarget(event.target)) {
          this._targetElement = event.target;
          this._setContextMenuPosition(event);
          this._contextMenu.show();
          event.preventDefault();
        }
      };
    }
    _setContextMenuPosition(event) {
      var startPosition = this._quillContainer.get(0).getBoundingClientRect();
      this._contextMenu.option({
        position: {
          my: 'left top',
          at: 'left top',
          collision: 'fit fit',
          offset: {
            x: event.clientX - startPosition.left,
            y: event.clientY - startPosition.top
          }
        }
      });
    }
    _isTableTarget(targetElement) {
      return !!$(targetElement).closest('.dx-htmleditor-content td, .dx-htmleditor-content th').length;
    }
    clean() {
      this._detachEvents();
    }
    option(option, value) {
      if (option === 'tableContextMenu') {
        this.handleOptionChangeValue(value);
        return;
      }
      if (option === 'enabled') {
        this.enabled = value;
        value ? this._enableContextMenu() : this.clean();
      } else if (option === 'items') {
        var _this$_contextMenu2;
        (_this$_contextMenu2 = this._contextMenu) === null || _this$_contextMenu2 === void 0 ? void 0 : _this$_contextMenu2.dispose();
        this._contextMenu = this._createContextMenu(value);
      }
    }
    prepareCleanCallback() {
      return () => {
        this.clean();
      };
    }
  };
}
export default TableContextMenuModule;
