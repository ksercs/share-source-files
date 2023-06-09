/**
* DevExtreme (cjs/__internal/grids/data_grid/grouping/module.js)
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
exports.GroupingHeaderPanelExtender = void 0;
var ui_grid_core_accessibility_1 = require("../../../../ui/grid_core/ui.grid_core.accessibility");
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var message_1 = __importDefault(require("../../../../localization/message"));
var type_1 = require("../../../../core/utils/type");
var iterator_1 = require("../../../../core/utils/iterator");
var devices_1 = __importDefault(require("../../../../core/devices"));
var deferred_1 = require("../../../../core/utils/deferred");
var accessibility_1 = require("../../../../ui/shared/accessibility");
var module_data_source_adapter_1 = __importDefault(require("../module_data_source_adapter"));
var module_collapsed_1 = require("./module_collapsed");
var module_expanded_1 = require("./module_expanded");
var module_core_1 = __importDefault(require("../module_core"));
var DATAGRID_GROUP_PANEL_CLASS = 'dx-datagrid-group-panel';
var DATAGRID_GROUP_PANEL_MESSAGE_CLASS = 'dx-group-panel-message';
var DATAGRID_GROUP_PANEL_ITEM_CLASS = 'dx-group-panel-item';
var DATAGRID_GROUP_PANEL_LABEL_CLASS = 'dx-toolbar-label';
var DATAGRID_GROUP_PANEL_CONTAINER_CLASS = 'dx-toolbar-item';
var DATAGRID_EXPAND_CLASS = 'dx-datagrid-expand';
var DATAGRID_GROUP_ROW_CLASS = 'dx-group-row';
var HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
var GroupingDataSourceAdapterExtender = (function () {
    return {
        init: function () {
            this.callBase.apply(this, arguments);
            this._initGroupingHelper();
        },
        _initGroupingHelper: function (options) {
            var grouping = this._grouping;
            var isAutoExpandAll = this.option('grouping.autoExpandAll');
            var isFocusedRowEnabled = this.option('focusedRowEnabled');
            var remoteOperations = options ? options.remoteOperations : this.remoteOperations();
            var isODataRemoteOperations = remoteOperations.filtering && remoteOperations.sorting && remoteOperations.paging;
            if (isODataRemoteOperations && !remoteOperations.grouping && (isAutoExpandAll || !isFocusedRowEnabled)) {
                if (!grouping || grouping instanceof module_collapsed_1.GroupingHelper) {
                    this._grouping = new module_expanded_1.GroupingHelper(this);
                }
            }
            else if (!grouping || grouping instanceof module_expanded_1.GroupingHelper) {
                this._grouping = new module_collapsed_1.GroupingHelper(this);
            }
        },
        totalItemsCount: function () {
            var that = this;
            var totalCount = that.callBase();
            return totalCount > 0 && that._dataSource.group() && that._dataSource.requireTotalCount() ? totalCount + that._grouping.totalCountCorrection() : totalCount;
        },
        itemsCount: function () {
            return this._dataSource.group() ? this._grouping.itemsCount() || 0 : this.callBase.apply(this, arguments);
        },
        allowCollapseAll: function () {
            return this._grouping.allowCollapseAll();
        },
        isGroupItemCountable: function (item) {
            return this._grouping.isGroupItemCountable(item);
        },
        isRowExpanded: function (key) {
            var groupInfo = this._grouping.findGroupInfo(key);
            return groupInfo ? groupInfo.isExpanded : !this._grouping.allowCollapseAll();
        },
        collapseAll: function (groupIndex) {
            return this._collapseExpandAll(groupIndex, false);
        },
        expandAll: function (groupIndex) {
            return this._collapseExpandAll(groupIndex, true);
        },
        _collapseExpandAll: function (groupIndex, isExpand) {
            var that = this;
            var dataSource = that._dataSource;
            var group = dataSource.group();
            var groups = module_core_1.default.normalizeSortingInfo(group || []);
            if (groups.length) {
                for (var i = 0; i < groups.length; i++) {
                    if (groupIndex === undefined || groupIndex === i) {
                        groups[i].isExpanded = isExpand;
                    }
                    else if (group && group[i]) {
                        groups[i].isExpanded = group[i].isExpanded;
                    }
                }
                dataSource.group(groups);
                that._grouping.foreachGroups(function (groupInfo, parents) {
                    if (groupIndex === undefined || groupIndex === parents.length - 1) {
                        groupInfo.isExpanded = isExpand;
                    }
                }, false, true);
                that.resetPagesCache();
            }
            return true;
        },
        refresh: function () {
            this.callBase.apply(this, arguments);
            return this._grouping.refresh.apply(this._grouping, arguments);
        },
        changeRowExpand: function (path) {
            var that = this;
            var dataSource = that._dataSource;
            if (dataSource.group()) {
                dataSource.beginLoading();
                if (that._lastLoadOptions) {
                    that._lastLoadOptions.groupExpand = true;
                }
                return that._changeRowExpandCore(path).always(function () {
                    dataSource.endLoading();
                });
            }
        },
        _changeRowExpandCore: function (path) {
            return this._grouping.changeRowExpand(path);
        },
        /// #DEBUG
        getGroupsInfo: function () {
            return this._grouping._groupsInfo;
        },
        /// #ENDDEBUG
        // @ts-expect-error
        _hasGroupLevelsExpandState: function (group, isExpanded) {
            if (group && Array.isArray(group)) {
                for (var i = 0; i < group.length; i++) {
                    if (group[i].isExpanded === isExpanded) {
                        return true;
                    }
                }
            }
        },
        _customizeRemoteOperations: function (options, operationTypes) {
            var remoteOperations = options.remoteOperations;
            if (options.storeLoadOptions.group) {
                if (remoteOperations.grouping && !options.isCustomLoading) {
                    if (!remoteOperations.groupPaging || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, true)) {
                        remoteOperations.paging = false;
                    }
                }
                if (!remoteOperations.grouping && (!remoteOperations.sorting || !remoteOperations.filtering || options.isCustomLoading || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, false))) {
                    remoteOperations.paging = false;
                }
            }
            else if (!options.isCustomLoading && remoteOperations.paging && operationTypes.grouping) {
                this.resetCache();
            }
            this.callBase.apply(this, arguments);
        },
        _handleDataLoading: function (options) {
            this.callBase(options);
            this._initGroupingHelper(options);
            return this._grouping.handleDataLoading(options);
        },
        _handleDataLoaded: function (options) {
            return this._grouping.handleDataLoaded(options, this.callBase.bind(this));
        },
        _handleDataLoadedCore: function (options) {
            return this._grouping.handleDataLoadedCore(options, this.callBase.bind(this));
        },
    };
}());
module_data_source_adapter_1.default.extend(GroupingDataSourceAdapterExtender);
var GroupingDataControllerExtender = (function () {
    return {
        init: function () {
            var that = this;
            that.callBase();
            that.createAction('onRowExpanding');
            that.createAction('onRowExpanded');
            that.createAction('onRowCollapsing');
            that.createAction('onRowCollapsed');
        },
        _beforeProcessItems: function (items) {
            var groupColumns = this._columnsController.getGroupColumns();
            items = this.callBase(items);
            if (items.length && groupColumns.length) {
                items = this._processGroupItems(items, groupColumns.length);
            }
            return items;
        },
        _processItem: function (item, options) {
            if (type_1.isDefined(item.groupIndex) && type_1.isString(item.rowType) && item.rowType.indexOf('group') === 0) {
                item = this._processGroupItem(item, options);
                options.dataIndex = 0;
            }
            else {
                item = this.callBase.apply(this, arguments);
            }
            return item;
        },
        _processGroupItem: function (item) {
            return item;
        },
        _processGroupItems: function (items, groupsCount, options) {
            var that = this;
            var groupedColumns = that._columnsController.getGroupColumns();
            var column = groupedColumns[groupedColumns.length - groupsCount];
            if (!options) {
                var scrollingMode = that.option('scrolling.mode');
                options = {
                    collectContinuationItems: scrollingMode !== 'virtual' && scrollingMode !== 'infinite',
                    resultItems: [],
                    path: [],
                    values: [],
                };
            }
            var resultItems = options.resultItems;
            if (options.data) {
                if (options.collectContinuationItems || !options.data.isContinuation) {
                    resultItems.push({
                        rowType: 'group',
                        data: options.data,
                        groupIndex: options.path.length - 1,
                        isExpanded: !!options.data.items,
                        key: options.path.slice(0),
                        values: options.values.slice(0),
                    });
                }
            }
            if (items) {
                if (groupsCount === 0) {
                    resultItems.push.apply(resultItems, items);
                }
                else {
                    for (var i = 0; i < items.length; i++) {
                        var item = items[i];
                        if (item && 'items' in item) {
                            options.data = item;
                            options.path.push(item.key);
                            options.values.push(column && column.deserializeValue && !column.calculateDisplayValue ? column.deserializeValue(item.key) : item.key);
                            that._processGroupItems(item.items, groupsCount - 1, options);
                            options.data = undefined;
                            options.path.pop();
                            options.values.pop();
                        }
                        else {
                            resultItems.push(item);
                        }
                    }
                }
            }
            return resultItems;
        },
        publicMethods: function () {
            return this.callBase().concat(['collapseAll', 'expandAll', 'isRowExpanded', 'expandRow', 'collapseRow']);
        },
        collapseAll: function (groupIndex) {
            var dataSource = this._dataSource;
            if (dataSource && dataSource.collapseAll(groupIndex)) {
                dataSource.pageIndex(0);
                dataSource.reload();
            }
        },
        expandAll: function (groupIndex) {
            var dataSource = this._dataSource;
            if (dataSource && dataSource.expandAll(groupIndex)) {
                dataSource.pageIndex(0);
                dataSource.reload();
            }
        },
        changeRowExpand: function (key) {
            var that = this;
            var expanded = that.isRowExpanded(key);
            var args = {
                key: key,
                expanded: expanded,
            };
            that.executeAction(expanded ? 'onRowCollapsing' : 'onRowExpanding', args);
            if (!args.cancel) {
                return deferred_1.when(that._changeRowExpandCore(key)).done(function () {
                    args.expanded = !expanded;
                    that.executeAction(expanded ? 'onRowCollapsed' : 'onRowExpanded', args);
                });
            }
            // @ts-expect-error
            return new deferred_1.Deferred().resolve();
        },
        _changeRowExpandCore: function (key) {
            var that = this;
            var dataSource = this._dataSource;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            if (!dataSource) {
                d.resolve();
            }
            else {
                deferred_1.when(dataSource.changeRowExpand(key)).done(function () {
                    that.load().done(d.resolve).fail(d.reject);
                }).fail(d.reject);
            }
            return d;
        },
        isRowExpanded: function (key) {
            var dataSource = this._dataSource;
            return dataSource && dataSource.isRowExpanded(key);
        },
        expandRow: function (key) {
            if (!this.isRowExpanded(key)) {
                return this.changeRowExpand(key);
            }
            // @ts-expect-error
            return new deferred_1.Deferred().resolve();
        },
        collapseRow: function (key) {
            if (this.isRowExpanded(key)) {
                return this.changeRowExpand(key);
            }
            // @ts-expect-error
            return new deferred_1.Deferred().resolve();
        },
        optionChanged: function (args) {
            if (args.name === 'grouping' /* autoExpandAll */) {
                args.name = 'dataSource';
            }
            this.callBase(args);
        },
    };
}());
var onGroupingMenuItemClick = function (column, params) {
    var columnsController = this._columnsController;
    // eslint-disable-next-line default-case
    switch (params.itemData.value) {
        case 'group': {
            var groups = columnsController._dataSource.group() || [];
            columnsController.columnOption(column.dataField, 'groupIndex', groups.length);
            break;
        }
        case 'ungroup':
            columnsController.columnOption(column.dataField, 'groupIndex', -1);
            break;
        case 'ungroupAll':
            this.component.clearGrouping();
            break;
    }
};
exports.GroupingHeaderPanelExtender = (function () {
    return {
        _getToolbarItems: function () {
            var items = this.callBase();
            return this._appendGroupingItem(items);
        },
        _appendGroupingItem: function (items) {
            var _this = this;
            if (this._isGroupPanelVisible()) {
                var isRendered_1 = false;
                var toolbarItem = {
                    template: function () {
                        var $groupPanel = renderer_1.default('<div>').addClass(DATAGRID_GROUP_PANEL_CLASS);
                        _this._updateGroupPanelContent($groupPanel);
                        ui_grid_core_accessibility_1.registerKeyboardAction('groupPanel', _this, $groupPanel, undefined, _this._handleActionKeyDown.bind(_this));
                        return $groupPanel;
                    },
                    name: 'groupPanel',
                    onItemRendered: function () {
                        isRendered_1 && _this.renderCompleted.fire();
                        isRendered_1 = true;
                    },
                    location: 'before',
                    locateInMenu: 'never',
                    sortIndex: 1,
                };
                items.push(toolbarItem);
                this.updateToolbarDimensions();
            }
            return items;
        },
        _handleActionKeyDown: function (args) {
            var event = args.event;
            var $target = renderer_1.default(event.target);
            var groupColumnIndex = $target.closest("." + DATAGRID_GROUP_PANEL_ITEM_CLASS).index();
            var column = this._columnsController.getGroupColumns()[groupColumnIndex];
            var columnIndex = column && column.index;
            if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
                this.getController('headerFilter').showHeaderFilterMenu(columnIndex, true);
            }
            else {
                this._processGroupItemAction(columnIndex);
            }
            event.preventDefault();
        },
        _isGroupPanelVisible: function () {
            var groupPanelOptions = this.option('groupPanel');
            var isVisible;
            if (groupPanelOptions) {
                isVisible = groupPanelOptions.visible;
                if (isVisible === 'auto') {
                    isVisible = devices_1.default.current().deviceType === 'desktop';
                }
            }
            return isVisible;
        },
        _renderGroupPanelItems: function ($groupPanel, groupColumns) {
            var that = this;
            $groupPanel.empty();
            iterator_1.each(groupColumns, function (index, groupColumn) {
                that._createGroupPanelItem($groupPanel, groupColumn);
            });
            accessibility_1.restoreFocus(this);
        },
        _createGroupPanelItem: function ($rootElement, groupColumn) {
            var $groupPanelItem = renderer_1.default('<div>')
                .addClass(groupColumn.cssClass)
                .addClass(DATAGRID_GROUP_PANEL_ITEM_CLASS)
                .data('columnData', groupColumn)
                .appendTo($rootElement)
                .text(groupColumn.caption);
            accessibility_1.setTabIndex(this, $groupPanelItem);
            return $groupPanelItem;
        },
        _columnOptionChanged: function (e) {
            if (!this._requireReady && !module_core_1.default.checkChanges(e.optionNames, ['width', 'visibleWidth'])) {
                var $toolbarElement = this.element();
                var $groupPanel = $toolbarElement && $toolbarElement.find("." + DATAGRID_GROUP_PANEL_CLASS);
                if ($groupPanel && $groupPanel.length) {
                    this._updateGroupPanelContent($groupPanel);
                    this.updateToolbarDimensions();
                    this.renderCompleted.fire();
                }
            }
            this.callBase();
        },
        _updateGroupPanelContent: function ($groupPanel) {
            var that = this;
            var groupColumns = that.getController('columns').getGroupColumns();
            var groupPanelOptions = that.option('groupPanel');
            that._renderGroupPanelItems($groupPanel, groupColumns);
            if (groupPanelOptions.allowColumnDragging && !groupColumns.length) {
                renderer_1.default('<div>')
                    .addClass(DATAGRID_GROUP_PANEL_MESSAGE_CLASS)
                    .text(groupPanelOptions.emptyPanelText)
                    .appendTo($groupPanel);
                $groupPanel.closest("." + DATAGRID_GROUP_PANEL_CONTAINER_CLASS).addClass(DATAGRID_GROUP_PANEL_LABEL_CLASS);
                $groupPanel.closest("." + DATAGRID_GROUP_PANEL_LABEL_CLASS).css('maxWidth', 'none');
            }
        },
        allowDragging: function (column) {
            var groupPanelOptions = this.option('groupPanel');
            return this._isGroupPanelVisible() && groupPanelOptions.allowColumnDragging && column && column.allowGrouping;
        },
        getColumnElements: function () {
            var $element = this.element();
            return $element && $element.find("." + DATAGRID_GROUP_PANEL_ITEM_CLASS);
        },
        getColumns: function () {
            return this.getController('columns').getGroupColumns();
        },
        getBoundingRect: function () {
            var that = this;
            var $element = that.element();
            if ($element && $element.find("." + DATAGRID_GROUP_PANEL_CLASS).length) {
                var offset = $element.offset();
                return {
                    top: offset.top,
                    bottom: offset.top + size_1.getHeight($element),
                };
            }
            return null;
        },
        getName: function () {
            return 'group';
        },
        getContextMenuItems: function (options) {
            var that = this;
            var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
            var $groupedColumnElement = renderer_1.default(options.targetElement).closest("." + DATAGRID_GROUP_PANEL_ITEM_CLASS);
            var items;
            if ($groupedColumnElement.length) {
                options.column = $groupedColumnElement.data('columnData');
            }
            if (contextMenuEnabled && options.column) {
                var column = options.column;
                var isGroupingAllowed = type_1.isDefined(column.allowGrouping) ? column.allowGrouping : true;
                if (isGroupingAllowed) {
                    var isColumnGrouped = type_1.isDefined(column.groupIndex) && column.groupIndex > -1;
                    var groupingTexts = that.option('grouping.texts');
                    var onItemClick = onGroupingMenuItemClick.bind(that, column);
                    items = [
                        {
                            text: groupingTexts.ungroup, value: 'ungroup', disabled: !isColumnGrouped,
                            onItemClick: onItemClick,
                        },
                        { text: groupingTexts.ungroupAll, value: 'ungroupAll', onItemClick: onItemClick },
                    ];
                }
            }
            return items;
        },
        isVisible: function () {
            return this.callBase() || this._isGroupPanelVisible();
        },
        optionChanged: function (args) {
            if (args.name === 'groupPanel') {
                this._invalidate();
                args.handled = true;
            }
            else {
                this.callBase(args);
            }
        },
    };
}());
var GroupingRowsViewExtender = (function () {
    return {
        getContextMenuItems: function (options) {
            var that = this;
            var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
            var items;
            if (contextMenuEnabled && options.row && options.row.rowType === 'group') {
                var columnsController = that._columnsController;
                var column = columnsController.columnOption("groupIndex:" + options.row.groupIndex);
                if (column && column.allowGrouping) {
                    var groupingTexts = that.option('grouping.texts');
                    var onItemClick = onGroupingMenuItemClick.bind(that, column);
                    items = [];
                    items.push({ text: groupingTexts.ungroup, value: 'ungroup', onItemClick: onItemClick }, { text: groupingTexts.ungroupAll, value: 'ungroupAll', onItemClick: onItemClick });
                }
            }
            return items;
        },
        _rowClick: function (e) {
            var that = this;
            var expandMode = that.option('grouping.expandMode');
            var scrollingMode = that.option('scrolling.mode');
            var isGroupRowStateChanged = scrollingMode !== 'infinite' && expandMode === 'rowClick' && renderer_1.default(e.event.target).closest("." + DATAGRID_GROUP_ROW_CLASS).length;
            var isExpandButtonClicked = renderer_1.default(e.event.target).closest("." + DATAGRID_EXPAND_CLASS).length;
            if (isGroupRowStateChanged || isExpandButtonClicked) {
                that._changeGroupRowState(e);
            }
            that.callBase(e);
        },
        _changeGroupRowState: function (e) {
            var dataController = this.getController('data');
            var row = dataController.items()[e.rowIndex];
            var allowCollapsing = this._columnsController.columnOption("groupIndex:" + row.groupIndex, 'allowCollapsing');
            if (row.rowType === 'data' || row.rowType === 'group' && allowCollapsing !== false) {
                dataController.changeRowExpand(row.key, true);
                e.event.preventDefault();
                e.handled = true;
            }
        },
    };
}());
var columnHeadersViewExtender = (function () {
    return {
        getContextMenuItems: function (options) {
            var that = this;
            var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
            var items = that.callBase(options);
            if (contextMenuEnabled && options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
                var column = options.column;
                if (!column.command && (!type_1.isDefined(column.allowGrouping) || column.allowGrouping)) {
                    var groupingTexts = that.option('grouping.texts');
                    var isColumnGrouped = type_1.isDefined(column.groupIndex) && column.groupIndex > -1;
                    var onItemClick = onGroupingMenuItemClick.bind(that, column);
                    items = items || [];
                    items.push({
                        text: groupingTexts.groupByThisColumn, value: 'group', beginGroup: true, disabled: isColumnGrouped,
                        onItemClick: onItemClick,
                    });
                    if (column.showWhenGrouped) {
                        items.push({
                            text: groupingTexts.ungroup, value: 'ungroup', disabled: !isColumnGrouped,
                            onItemClick: onItemClick,
                        });
                    }
                    items.push({ text: groupingTexts.ungroupAll, value: 'ungroupAll', onItemClick: onItemClick });
                }
            }
            return items;
        },
    };
}());
module_core_1.default.registerModule('grouping', {
    defaultOptions: function () {
        return {
            grouping: {
                autoExpandAll: true,
                allowCollapsing: true,
                contextMenuEnabled: false,
                expandMode: 'buttonClick',
                texts: {
                    groupContinuesMessage: message_1.default.format('dxDataGrid-groupContinuesMessage'),
                    groupContinuedMessage: message_1.default.format('dxDataGrid-groupContinuedMessage'),
                    groupByThisColumn: message_1.default.format('dxDataGrid-groupHeaderText'),
                    ungroup: message_1.default.format('dxDataGrid-ungroupHeaderText'),
                    ungroupAll: message_1.default.format('dxDataGrid-ungroupAllText'),
                },
            },
            groupPanel: {
                visible: false,
                emptyPanelText: message_1.default.format('dxDataGrid-groupPanelEmptyText'),
                allowColumnDragging: true,
            },
        };
    },
    extenders: {
        controllers: {
            data: GroupingDataControllerExtender,
            columns: {
                _getExpandColumnOptions: function () {
                    var options = this.callBase.apply(this, arguments);
                    options.cellTemplate = module_core_1.default.getExpandCellTemplate();
                    return options;
                },
            },
            editing: {
                _isProcessedItem: function (item) {
                    return type_1.isDefined(item.groupIndex) && type_1.isString(item.rowType) && item.rowType.indexOf('group') === 0;
                },
            },
        },
        views: {
            headerPanel: exports.GroupingHeaderPanelExtender,
            rowsView: GroupingRowsViewExtender,
            columnHeadersView: columnHeadersViewExtender,
        },
    },
});
