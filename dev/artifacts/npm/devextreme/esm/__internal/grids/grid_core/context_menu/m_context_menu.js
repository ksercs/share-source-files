/**
* DevExtreme (esm/__internal/grids/grid_core/context_menu/m_context_menu.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getPublicElement } from '../../../../core/element';
import $ from '../../../../core/renderer';
import { noop } from '../../../../core/utils/common';
import { each } from '../../../../core/utils/iterator';
import ContextMenu from '../../../../ui/context_menu';
import modules from '../m_modules';
var CONTEXT_MENU = 'dx-context-menu';
var viewName = {
  columnHeadersView: 'header',
  rowsView: 'content',
  footerView: 'footer',
  headerPanel: 'headerPanel'
};
var VIEW_NAMES = ['columnHeadersView', 'rowsView', 'footerView', 'headerPanel'];
var ContextMenuController = modules.ViewController.inherit({
  init() {
    this.createAction('onContextMenuPreparing');
  },
  getContextMenuItems(dxEvent) {
    if (!dxEvent) {
      return false;
    }
    var that = this;
    var $targetElement = $(dxEvent.target);
    var $element;
    var $targetRowElement;
    var $targetCellElement;
    var menuItems;
    each(VIEW_NAMES, function () {
      var _a, _b;
      var view = that.getView(this);
      $element = view && view.element();
      if ($element && ($element.is($targetElement) || $element.find($targetElement).length)) {
        $targetCellElement = $targetElement.closest('.dx-row > td, .dx-row > tr');
        $targetRowElement = $targetCellElement.parent();
        var rowIndex = view.getRowIndex($targetRowElement);
        var columnIndex = $targetCellElement[0] && $targetCellElement[0].cellIndex;
        var rowOptions = $targetRowElement.data('options');
        var options = {
          event: dxEvent,
          targetElement: getPublicElement($targetElement),
          target: viewName[this],
          rowIndex,
          row: view._getRows()[rowIndex],
          columnIndex,
          column: (_b = (_a = rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.cells) === null || _a === void 0 ? void 0 : _a[columnIndex]) === null || _b === void 0 ? void 0 : _b.column
        };
        options.items = view.getContextMenuItems && view.getContextMenuItems(options);
        that.executeAction('onContextMenuPreparing', options);
        that._contextMenuPrepared(options);
        menuItems = options.items;
        if (menuItems) {
          return false;
        }
      }
      return undefined;
    });
    return menuItems;
  },
  _contextMenuPrepared: noop
});
var ContextMenuView = modules.View.inherit({
  _renderCore() {
    var that = this;
    var $element = that.element().addClass(CONTEXT_MENU);
    this.setAria('role', 'presentation', $element);
    this._createComponent($element, ContextMenu, {
      onPositioning(actionArgs) {
        var {
          event
        } = actionArgs;
        var contextMenuInstance = actionArgs.component;
        var items = that.getController('contextMenu').getContextMenuItems(event);
        if (items) {
          contextMenuInstance.option('items', items);
          event.stopPropagation();
        } else {
          actionArgs.cancel = true;
        }
      },
      onItemClick(params) {
        params.itemData.onItemClick && params.itemData.onItemClick(params);
      },
      cssClass: that.getWidgetContainerClass(),
      target: that.component.$element()
    });
  }
});
export var contextMenuModule = {
  defaultOptions() {
    return {
      onContextMenuPreparing: null
    };
  },
  controllers: {
    contextMenu: ContextMenuController
  },
  views: {
    contextMenuView: ContextMenuView
  }
};
