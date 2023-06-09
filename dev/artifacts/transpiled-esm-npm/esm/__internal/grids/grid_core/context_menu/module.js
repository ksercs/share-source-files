import $ from '../../../../core/renderer';
import { getPublicElement } from '../../../../core/element';
import { noop } from '../../../../core/utils/common';
import { each } from '../../../../core/utils/iterator';
import ContextMenu from '../../../../ui/context_menu';
import modules from '../modules';
const CONTEXT_MENU = 'dx-context-menu';
const viewName = {
    columnHeadersView: 'header',
    rowsView: 'content',
    footerView: 'footer',
    headerPanel: 'headerPanel',
};
const VIEW_NAMES = ['columnHeadersView', 'rowsView', 'footerView', 'headerPanel'];
const ContextMenuController = modules.ViewController.inherit({
    init() {
        this.createAction('onContextMenuPreparing');
    },
    getContextMenuItems(dxEvent) {
        if (!dxEvent) {
            return false;
        }
        const that = this;
        const $targetElement = $(dxEvent.target);
        let $element;
        let $targetRowElement;
        let $targetCellElement;
        let menuItems;
        each(VIEW_NAMES, function () {
            var _a, _b;
            const view = that.getView(this);
            $element = view && view.element();
            if ($element && ($element.is($targetElement) || $element.find($targetElement).length)) {
                $targetCellElement = $targetElement.closest('.dx-row > td, .dx-row > tr');
                $targetRowElement = $targetCellElement.parent();
                const rowIndex = view.getRowIndex($targetRowElement);
                const columnIndex = $targetCellElement[0] && $targetCellElement[0].cellIndex;
                const rowOptions = $targetRowElement.data('options');
                const options = {
                    event: dxEvent,
                    targetElement: getPublicElement($targetElement),
                    target: viewName[this],
                    rowIndex,
                    row: view._getRows()[rowIndex],
                    columnIndex,
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
    _contextMenuPrepared: noop,
});
const ContextMenuView = modules.View.inherit({
    _renderCore() {
        const that = this;
        const $element = that.element().addClass(CONTEXT_MENU);
        this.setAria('role', 'presentation', $element);
        this._createComponent($element, ContextMenu, {
            onPositioning(actionArgs) {
                const { event } = actionArgs;
                const contextMenuInstance = actionArgs.component;
                const items = that.getController('contextMenu').getContextMenuItems(event);
                if (items) {
                    contextMenuInstance.option('items', items);
                    event.stopPropagation();
                }
                else {
                    actionArgs.cancel = true;
                }
            },
            onItemClick(params) {
                params.itemData.onItemClick && params.itemData.onItemClick(params);
            },
            cssClass: that.getWidgetContainerClass(),
            target: that.component.$element(),
        });
    },
});
export const contextMenuModule = {
    defaultOptions() {
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