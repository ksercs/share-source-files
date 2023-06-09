/**
* DevExtreme (cjs/__internal/grids/grid_core/context_menu/module.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextMenuModule = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var element_1 = require("../../../../core/element");
var common_1 = require("../../../../core/utils/common");
var iterator_1 = require("../../../../core/utils/iterator");
var context_menu_1 = __importDefault(require("../../../../ui/context_menu"));
var modules_1 = __importDefault(require("../modules"));
var CONTEXT_MENU = 'dx-context-menu';
var viewName = {
    columnHeadersView: 'header',
    rowsView: 'content',
    footerView: 'footer',
    headerPanel: 'headerPanel',
};
var VIEW_NAMES = ['columnHeadersView', 'rowsView', 'footerView', 'headerPanel'];
var ContextMenuController = modules_1.default.ViewController.inherit({
    init: function () {
        this.createAction('onContextMenuPreparing');
    },
    getContextMenuItems: function (dxEvent) {
        if (!dxEvent) {
            return false;
        }
        var that = this;
        var $targetElement = renderer_1.default(dxEvent.target);
        var $element;
        var $targetRowElement;
        var $targetCellElement;
        var menuItems;
        iterator_1.each(VIEW_NAMES, function () {
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
                    targetElement: element_1.getPublicElement($targetElement),
                    target: viewName[this],
                    rowIndex: rowIndex,
                    row: view._getRows()[rowIndex],
                    columnIndex: columnIndex,
                    column: (_b = (_a = rowOptions === null || rowOptions === void 0 ? void 0 : rowOptions.cells) === null || _a === void 0 ? void 0 : _a[columnIndex]) === null || _b === void 0 ? void 0 : _b.column,
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
    _contextMenuPrepared: common_1.noop,
});
var ContextMenuView = modules_1.default.View.inherit({
    _renderCore: function () {
        var that = this;
        var $element = that.element().addClass(CONTEXT_MENU);
        this.setAria('role', 'presentation', $element);
        this._createComponent($element, context_menu_1.default, {
            onPositioning: function (actionArgs) {
                var event = actionArgs.event;
                var contextMenuInstance = actionArgs.component;
                var items = that.getController('contextMenu').getContextMenuItems(event);
                if (items) {
                    contextMenuInstance.option('items', items);
                    event.stopPropagation();
                }
                else {
                    actionArgs.cancel = true;
                }
            },
            onItemClick: function (params) {
                params.itemData.onItemClick && params.itemData.onItemClick(params);
            },
            cssClass: that.getWidgetContainerClass(),
            target: that.component.$element(),
        });
    },
});
exports.contextMenuModule = {
    defaultOptions: function () {
        return {
            onContextMenuPreparing: null,
        };
    },
    controllers: {
        contextMenu: ContextMenuController,
    },
    views: {
        contextMenuView: ContextMenuView,
    },
};
