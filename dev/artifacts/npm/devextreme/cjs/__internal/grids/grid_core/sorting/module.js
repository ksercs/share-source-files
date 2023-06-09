/**
* DevExtreme (cjs/__internal/grids/grid_core/sorting/module.js)
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
exports.sortingModule = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var click_1 = require("../../../../events/click");
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var ui_grid_core_sorting_mixin_1 = __importDefault(require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"));
var message_1 = __importDefault(require("../../../../localization/message"));
var index_1 = require("../../../../events/utils/index");
var COLUMN_HEADERS_VIEW_NAMESPACE = 'dxDataGridColumnHeadersView';
var ColumnHeadersViewSortingExtender = extend_1.extend({}, ui_grid_core_sorting_mixin_1.default, {
    _createRow: function (row) {
        var _this = this;
        var $row = this.callBase(row);
        if (row.rowType === 'header') {
            events_engine_1.default.on($row, index_1.addNamespace(click_1.name, COLUMN_HEADERS_VIEW_NAMESPACE), 'td', this.createAction(function (e) {
                _this._processHeaderAction(e.event, $row);
            }));
        }
        return $row;
    },
    _processHeaderAction: function (event, $row) {
        if (renderer_1.default(event.currentTarget).parent().get(0) !== $row.get(0)) {
            return;
        }
        var that = this;
        var keyName = null;
        var $cellElementFromEvent = renderer_1.default(event.currentTarget);
        var rowIndex = $cellElementFromEvent.parent().index();
        var columnIndex = -1;
        // eslint-disable-next-line array-callback-return
        [].slice.call(that.getCellElements(rowIndex)).some(function ($cellElement, index) {
            if ($cellElement === $cellElementFromEvent.get(0)) {
                columnIndex = index;
                return true;
            }
            return undefined;
        });
        var visibleColumns = that._columnsController.getVisibleColumns(rowIndex);
        var column = visibleColumns[columnIndex];
        var editingController = that.getController('editing');
        var editingMode = that.option('editing.mode');
        var isCellEditing = editingController && editingController.isEditing() && (editingMode === 'batch' || editingMode === 'cell');
        if (isCellEditing || !that._isSortableElement(renderer_1.default(event.target))) {
            return;
        }
        if (column && !type_1.isDefined(column.groupIndex) && !column.command) {
            if (event.shiftKey) {
                keyName = 'shift';
            }
            else if (index_1.isCommandKeyPressed(event)) {
                keyName = 'ctrl';
            }
            setTimeout(function () {
                that._columnsController.changeSortOrder(column.index, keyName);
            });
        }
    },
    _renderCellContent: function ($cell, options) {
        var that = this;
        var column = options.column;
        if (!column.command && options.rowType === 'header') {
            that._applyColumnState({
                name: 'sort',
                rootElement: $cell,
                column: column,
                showColumnLines: that.option('showColumnLines'),
            });
        }
        this.callBase.apply(this, arguments);
    },
    _columnOptionChanged: function (e) {
        var changeTypes = e.changeTypes;
        if (changeTypes.length === 1 && changeTypes.sorting) {
            this._updateIndicators('sort');
            return;
        }
        this.callBase(e);
    },
    optionChanged: function (args) {
        var that = this;
        switch (args.name) {
            case 'sorting':
                that._invalidate();
                args.handled = true;
                break;
            default:
                that.callBase(args);
        }
    },
});
var HeaderPanelSortingExtender = extend_1.extend({}, ui_grid_core_sorting_mixin_1.default, {
    _createGroupPanelItem: function ($rootElement, groupColumn) {
        var that = this;
        // @ts-expect-error
        var $item = that.callBase.apply(that, arguments);
        events_engine_1.default.on($item, index_1.addNamespace(click_1.name, 'dxDataGridHeaderPanel'), that.createAction(function () {
            that._processGroupItemAction(groupColumn.index);
        }));
        that._applyColumnState({
            name: 'sort',
            rootElement: $item,
            column: {
                alignment: that.option('rtlEnabled') ? 'right' : 'left',
                allowSorting: groupColumn.allowSorting,
                sortOrder: groupColumn.sortOrder === 'desc' ? 'desc' : 'asc',
            },
            showColumnLines: true,
        });
        return $item;
    },
    _processGroupItemAction: function (groupColumnIndex) {
        var _this = this;
        setTimeout(function () { return _this.getController('columns').changeSortOrder(groupColumnIndex); });
    },
    optionChanged: function (args) {
        var that = this;
        switch (args.name) {
            case 'sorting':
                that._invalidate();
                args.handled = true;
                break;
            default:
                that.callBase(args);
        }
    },
});
exports.sortingModule = {
    defaultOptions: function () {
        return {
            sorting: {
                mode: 'single',
                ascendingText: message_1.default.format('dxDataGrid-sortingAscendingText'),
                descendingText: message_1.default.format('dxDataGrid-sortingDescendingText'),
                clearText: message_1.default.format('dxDataGrid-sortingClearText'),
                showSortIndexes: true,
            },
        };
    },
    extenders: {
        views: {
            columnHeadersView: ColumnHeadersViewSortingExtender,
            headerPanel: HeaderPanelSortingExtender,
        },
    },
};
