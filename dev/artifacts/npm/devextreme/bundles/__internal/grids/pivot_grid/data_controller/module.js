/**
* DevExtreme (bundles/__internal/grids/pivot_grid/data_controller/module.js)
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
exports.DataController__internals = exports.DataController = void 0;
var callbacks_1 = __importDefault(require("../../../../core/utils/callbacks"));
var deferred_1 = require("../../../../core/utils/deferred");
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var class_1 = __importDefault(require("../../../../core/class"));
var string_1 = require("../../../../core/utils/string");
var common_1 = require("../../../../core/utils/common");
var type_1 = require("../../../../core/utils/type");
var ui_grid_core_virtual_scrolling_core_1 = require("../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core");
var ui_grid_core_virtual_columns_core_1 = require("../../../../ui/grid_core/ui.grid_core.virtual_columns_core");
var ui_grid_core_state_storing_core_1 = __importDefault(require("../../../../ui/grid_core/ui.grid_core.state_storing_core"));
var module_1 = require("../data_source/module");
var module_widget_utils_1 = require("../module_widget_utils");
var math = Math;
var GRAND_TOTAL_TYPE = 'GT';
var TOTAL_TYPE = 'T';
var DATA_TYPE = 'D';
var NOT_AVAILABLE = '#N/A';
var CHANGING_DURATION_IF_PAGINATE = 300;
var proxyMethod = function (instance, methodName, defaultResult) {
    if (!instance[methodName]) {
        instance[methodName] = function () {
            var dataSource = this._dataSource;
            return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
        };
    }
};
var DataController = class_1.default.inherit((function () {
    // - @ts-expect-error
    function getHeaderItemText(item, description, options) {
        var text = item.text;
        if (type_1.isDefined(item.displayText)) {
            text = item.displayText;
        }
        else if (type_1.isDefined(item.caption)) {
            text = item.caption;
        }
        else if (item.type === GRAND_TOTAL_TYPE) {
            text = options.texts.grandTotal;
        }
        if (item.isAdditionalTotal) {
            text = string_1.format(options.texts.total || '', text);
        }
        return text;
    }
    function formatCellValue(value, dataField, errorText) {
        return value === NOT_AVAILABLE ? errorText : module_widget_utils_1.formatValue(value, dataField);
    }
    var createHeaderInfo = (function () {
        var getHeaderItemsDepth = function (headerItems) {
            var depth = 0;
            module_widget_utils_1.foreachTree(headerItems, function (items) {
                depth = math.max(depth, items.length);
            });
            return depth;
        };
        var createInfoItem = function (headerItem, breadth, isHorizontal, isTree) {
            var infoItem = {
                type: headerItem.type,
                text: headerItem.text,
            };
            if (headerItem.path) {
                infoItem.path = headerItem.path;
            }
            if (headerItem.width) {
                infoItem.width = headerItem.width;
            }
            if (type_1.isDefined(headerItem.wordWrapEnabled)) {
                infoItem.wordWrapEnabled = headerItem.wordWrapEnabled;
            }
            if (headerItem.isLast) {
                infoItem.isLast = true;
            }
            if (headerItem.sorted) {
                infoItem.sorted = true;
            }
            if (headerItem.isMetric) {
                infoItem.dataIndex = headerItem.dataIndex;
            }
            if (type_1.isDefined(headerItem.expanded)) {
                infoItem.expanded = headerItem.expanded;
            }
            if (breadth > 1) {
                infoItem[isHorizontal ? 'colspan' : 'rowspan'] = breadth;
            }
            if (headerItem.depthSize && headerItem.depthSize > 1) {
                infoItem[isHorizontal ? 'rowspan' : 'colspan'] = headerItem.depthSize;
            }
            if (headerItem.index >= 0) {
                infoItem.dataSourceIndex = headerItem.index;
            }
            if (isTree
                && headerItem.children
                && headerItem.children.length
                && !headerItem.children[0].isMetric) {
                infoItem.width = null;
                infoItem.isWhiteSpace = true;
            }
            return infoItem;
        };
        var addInfoItem = function (info, options) {
            var breadth = (options.lastIndex - options.index) || 1;
            var addInfoItemCore = function (info, infoItem, itemIndex, depthIndex, isHorizontal) {
                var index = isHorizontal ? depthIndex : itemIndex;
                while (!info[index]) {
                    info.push([]);
                }
                if (isHorizontal) {
                    info[index].push(infoItem);
                }
                else {
                    info[index].unshift(infoItem);
                }
            };
            var itemInfo = createInfoItem(options.headerItem, breadth, options.isHorizontal, options.isTree);
            addInfoItemCore(info, itemInfo, options.index, options.depth, options.isHorizontal);
            if (!options.headerItem.children || options.headerItem.children.length === 0) {
                return options.lastIndex + 1;
            }
            return options.lastIndex;
        };
        var isItemSorted = function (items, sortBySummaryPath) {
            var path;
            var item = items[0];
            var stringValuesUsed = type_1.isString(sortBySummaryPath[0]);
            var headerItem = item.dataIndex >= 0 ? items[1] : item;
            if ((stringValuesUsed && sortBySummaryPath[0].indexOf('&[') !== -1 && headerItem.key) || !headerItem.key) {
                path = module_widget_utils_1.createPath(items);
            }
            else {
                path = iterator_1.map(items, function (item) { return (item.dataIndex >= 0 ? item.value : item.text); }).reverse();
            }
            if (item.type === GRAND_TOTAL_TYPE) {
                path = path.slice(1);
            }
            return path.join('/') === sortBySummaryPath.join('/');
        };
        var getViewHeaderItems = function (headerItems, headerDescriptions, cellDescriptions, depthSize, options) {
            var cellDescriptionsCount = cellDescriptions.length;
            var viewHeaderItems = createViewHeaderItems(headerItems, headerDescriptions);
            var dataFields = options.dataFields;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            deferred_1.when(viewHeaderItems).done(function (viewHeaderItems) {
                options.notifyProgress(0.5);
                if (options.showGrandTotals) {
                    viewHeaderItems[!options.showTotalsPrior ? 'push' : 'unshift']({
                        type: GRAND_TOTAL_TYPE,
                        isEmpty: options.isEmptyGrandTotal,
                    });
                }
                var hideTotals = options.showTotals === false
                    || dataFields.length > 0
                        && (dataFields.length === options.hiddenTotals.length);
                var hideData = dataFields.length > 0 && options.hiddenValues.length === dataFields.length;
                if (hideData && hideTotals) {
                    depthSize = 1;
                }
                if (!hideTotals || options.layout === 'tree') {
                    addAdditionalTotalHeaderItems(viewHeaderItems, headerDescriptions, options.showTotalsPrior, options.layout === 'tree');
                }
                deferred_1.when(module_widget_utils_1.foreachTreeAsync(viewHeaderItems, function (items) {
                    var item = items[0];
                    if (!item.children || item.children.length === 0) {
                        item.depthSize = depthSize - items.length + 1;
                    }
                })).done(function () {
                    if (cellDescriptionsCount > 1) {
                        addMetricHeaderItems(viewHeaderItems, cellDescriptions, options);
                    }
                    !options.showEmpty && removeHiddenItems(viewHeaderItems);
                    options.notifyProgress(0.75);
                    deferred_1.when(module_widget_utils_1.foreachTreeAsync(viewHeaderItems, function (items) {
                        var item = items[0];
                        var isMetric = item.isMetric;
                        var field = headerDescriptions[items.length - 1] || {};
                        if (item.type === DATA_TYPE && !isMetric) {
                            item.width = field.width;
                        }
                        if (hideData && item.type === DATA_TYPE) {
                            var parentChildren = (items[1] ? items[1].children : viewHeaderItems) || [];
                            parentChildren.splice(parentChildren.indexOf(item), 1);
                            return;
                        }
                        if (isMetric) {
                            item.wordWrapEnabled = cellDescriptions[item.dataIndex].wordWrapEnabled;
                        }
                        else {
                            item.wordWrapEnabled = field.wordWrapEnabled;
                        }
                        item.isLast = !item.children || !item.children.length;
                        if (item.isLast) {
                            iterator_1.each(options.sortBySummaryPaths, function (_, sortBySummaryPath) {
                                if (!type_1.isDefined(item.dataIndex)) {
                                    sortBySummaryPath = sortBySummaryPath.slice(0);
                                    sortBySummaryPath.pop();
                                }
                                if (isItemSorted(items, sortBySummaryPath)) {
                                    item.sorted = true;
                                    return false;
                                }
                                return undefined;
                            });
                        }
                        item.text = getHeaderItemText(item, field, options);
                    })).done(function () {
                        if (!viewHeaderItems.length) {
                            viewHeaderItems.push({});
                        }
                        options.notifyProgress(1);
                        d.resolve(viewHeaderItems);
                    });
                });
            });
            return d;
        };
        function createHeaderItem(childrenStack, depth, index) {
            var parent = childrenStack[depth] = childrenStack[depth] || [];
            var node = parent[index] = {};
            if (childrenStack[depth + 1]) {
                node.children = childrenStack[depth + 1];
                // T541266
                for (var i = depth + 1; i < childrenStack.length; i += 1) {
                    childrenStack[i] = undefined;
                }
                childrenStack.length = depth + 1;
            }
            return node;
        }
        function createViewHeaderItems(headerItems, headerDescriptions) {
            var headerDescriptionsCount = (headerDescriptions && headerDescriptions.length) || 0;
            var childrenStack = [];
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            var headerItem;
            deferred_1.when(module_widget_utils_1.foreachTreeAsync(headerItems, function (items, index) {
                var item = items[0];
                var path = module_widget_utils_1.createPath(items);
                headerItem = createHeaderItem(childrenStack, path.length, index);
                headerItem.type = DATA_TYPE;
                headerItem.value = item.value;
                headerItem.path = path;
                headerItem.text = item.text;
                headerItem.index = item.index;
                headerItem.displayText = item.displayText;
                headerItem.key = item.key;
                headerItem.isEmpty = item.isEmpty;
                if (path.length < headerDescriptionsCount
                    && (!item.children || item.children.length !== 0)) {
                    headerItem.expanded = !!item.children;
                }
            })).done(function () {
                d.resolve(createHeaderItem(childrenStack, 0, 0).children || []);
            });
            return d;
        }
        function addMetricHeaderItems(headerItems, cellDescriptions, options) {
            module_widget_utils_1.foreachTree(headerItems, function (items) {
                var item = items[0];
                var i;
                if (!item.children || item.children.length === 0) {
                    item.children = [];
                    for (i = 0; i < cellDescriptions.length; i += 1) {
                        var isGrandTotal = item.type === GRAND_TOTAL_TYPE;
                        var isTotal = item.type === TOTAL_TYPE;
                        var isValue = item.type === DATA_TYPE;
                        var columnIsHidden = cellDescriptions[i].visible === false
                            || (isGrandTotal && options.hiddenGrandTotals.includes(i))
                            || (isTotal && options.hiddenTotals.includes(i))
                            || (isValue && options.hiddenValues.includes(i));
                        if (columnIsHidden) {
                            continue;
                        }
                        item.children.push({
                            caption: cellDescriptions[i].caption,
                            path: item.path,
                            type: item.type,
                            value: i,
                            index: item.index,
                            dataIndex: i,
                            isMetric: true,
                            isEmpty: item.isEmpty && item.isEmpty[i],
                        });
                    }
                }
            });
        }
        function addAdditionalTotalHeaderItems(headerItems, headerDescriptions, showTotalsPrior, isTree) {
            showTotalsPrior = showTotalsPrior || isTree;
            module_widget_utils_1.foreachTree(headerItems, function (items, index) {
                var item = items[0];
                var parentChildren = (items[1] ? items[1].children : headerItems) || [];
                var dataField = headerDescriptions[items.length - 1];
                if (item.type === DATA_TYPE
                    && item.expanded
                    && (dataField.showTotals !== false || isTree)) {
                    index !== -1 && parentChildren.splice(showTotalsPrior
                        ? index
                        : index + 1, 0, extend_1.extend({}, item, {
                        children: null,
                        type: TOTAL_TYPE,
                        expanded: showTotalsPrior ? true : null,
                        isAdditionalTotal: true,
                    }));
                    if (showTotalsPrior) {
                        item.expanded = null;
                    }
                }
            });
        }
        var removeEmptyParent = function (items, index) {
            var parent = items[index + 1];
            if (!items[index].children.length && parent && parent.children) {
                parent.children.splice(parent.children.indexOf(items[index]), 1);
                removeEmptyParent(items, index + 1);
            }
        };
        function removeHiddenItems(headerItems) {
            module_widget_utils_1.foreachTree([{ children: headerItems }], function (items, index) {
                var item = items[0];
                var parentChildren = (items[1] ? items[1].children : headerItems) || [];
                var isEmpty = item.isEmpty;
                if (isEmpty && isEmpty.length) {
                    isEmpty = item.isEmpty.filter(function (isEmpty) { return isEmpty; }).length === isEmpty.length;
                }
                if (item && !item.children && isEmpty) {
                    parentChildren.splice(index, 1);
                    removeEmptyParent(items, 1);
                }
            });
        }
        var fillHeaderInfo = function (info, viewHeaderItems, depthSize, isHorizontal, isTree) {
            var lastIndex = 0;
            var index;
            var depth;
            var indexesByDepth = [0];
            module_widget_utils_1.foreachTree(viewHeaderItems, function (items) {
                var headerItem = items[0];
                depth = headerItem.isMetric ? depthSize : items.length - 1;
                while (indexesByDepth.length - 1 < depth) {
                    indexesByDepth.push(indexesByDepth[indexesByDepth.length - 1]);
                }
                index = indexesByDepth[depth] || 0;
                lastIndex = addInfoItem(info, {
                    headerItem: headerItem,
                    index: index,
                    lastIndex: lastIndex,
                    depth: depth,
                    isHorizontal: isHorizontal,
                    isTree: isTree,
                });
                indexesByDepth.length = depth;
                indexesByDepth.push(lastIndex);
            });
        };
        return function (headerItems, headerDescriptions, cellDescriptions, isHorizontal, options) {
            var info = [];
            var depthSize = getHeaderItemsDepth(headerItems) || 1;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            getViewHeaderItems(headerItems, headerDescriptions, cellDescriptions, depthSize, options)
                .done(function (viewHeaderItems) {
                fillHeaderInfo(info, viewHeaderItems, depthSize, isHorizontal, options.layout === 'tree');
                options.notifyProgress(1);
                d.resolve(info);
            });
            return d;
        };
    }());
    function createSortPaths(headerFields, dataFields) {
        var sortBySummaryPaths = [];
        iterator_1.each(headerFields, function (_, headerField) {
            var fieldIndex = module_widget_utils_1.findField(dataFields, headerField.sortBySummaryField);
            if (fieldIndex >= 0) {
                sortBySummaryPaths.push((headerField.sortBySummaryPath || []).concat([fieldIndex]));
            }
        });
        return sortBySummaryPaths;
    }
    function foreachRowInfo(rowsInfo, callback) {
        var columnOffset = 0;
        var columnOffsetResetIndexes = [];
        for (var i = 0; i < rowsInfo.length; i += 1) {
            for (var j = 0; j < rowsInfo[i].length; j += 1) {
                var rowSpanOffset = (rowsInfo[i][j].rowspan || 1) - 1;
                var visibleIndex = i + rowSpanOffset;
                if (columnOffsetResetIndexes[i]) {
                    columnOffset -= columnOffsetResetIndexes[i];
                    columnOffsetResetIndexes[i] = 0;
                }
                if (callback(rowsInfo[i][j], visibleIndex, i, j, columnOffset) === false) {
                    break;
                }
                columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] = (columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] || 0) + 1;
                columnOffset += 1;
            }
        }
    }
    function createCellsInfo(rowsInfo, columnsInfo, data, dataFields, dataFieldArea, errorText) {
        var info = [];
        var dataFieldAreaInRows = dataFieldArea === 'row';
        var dataSourceCells = data.values;
        dataSourceCells.length && foreachRowInfo(rowsInfo, function (rowInfo, rowIndex) {
            var row = info[rowIndex] = [];
            var dataRow = dataSourceCells[rowInfo.dataSourceIndex >= 0
                ? rowInfo.dataSourceIndex
                : data.grandTotalRowIndex] || [];
            rowInfo.isLast && ui_grid_core_virtual_columns_core_1.foreachColumnInfo(columnsInfo, function (columnInfo, columnIndex) {
                var dataIndex = (dataFieldAreaInRows ? rowInfo.dataIndex : columnInfo.dataIndex) || 0;
                var dataField = dataFields[dataIndex];
                if (columnInfo.isLast && dataField && dataField.visible !== false) {
                    var cell = dataRow[columnInfo.dataSourceIndex >= 0
                        ? columnInfo.dataSourceIndex
                        : data.grandTotalColumnIndex];
                    if (!Array.isArray(cell)) {
                        cell = [cell];
                    }
                    var cellValue = cell[dataIndex];
                    row[columnIndex] = {
                        text: formatCellValue(cellValue, dataField, errorText),
                        value: cellValue,
                        format: dataField.format,
                        dataType: dataField.dataType,
                        columnType: columnInfo.type,
                        rowType: rowInfo.type,
                        rowPath: rowInfo.path || [],
                        columnPath: columnInfo.path || [],
                        dataIndex: dataIndex,
                    };
                    if (dataField.width) {
                        row[columnIndex].width = dataField.width;
                    }
                }
            });
        });
        return info;
    }
    function getHeaderIndexedItems(headerItems, options) {
        var visibleIndex = 0;
        var indexedItems = [];
        module_widget_utils_1.foreachTree(headerItems, function (items) {
            var headerItem = items[0];
            var path = module_widget_utils_1.createPath(items);
            if (headerItem.children && options.showTotals === false)
                return;
            var indexedItem = extend_1.extend(true, {}, headerItem, {
                visibleIndex: visibleIndex += 1,
                path: path,
            });
            if (type_1.isDefined(indexedItem.index)) {
                indexedItems[indexedItem.index] = indexedItem;
            }
            else {
                indexedItems.push(indexedItem);
            }
        });
        return indexedItems;
    }
    function createScrollController(dataController, component, dataAdapter) {
        return new ui_grid_core_virtual_scrolling_core_1.VirtualScrollController(component, extend_1.extend({
            hasKnownLastPage: function () {
                return true;
            },
            pageCount: function () {
                return math.ceil(this.totalItemsCount() / this.pageSize());
            },
            updateLoading: function () {
            },
            itemsCount: function () {
                if (this.pageIndex() < this.pageCount() - 1) {
                    return this.pageSize();
                }
                return this.totalItemsCount() % this.pageSize();
            },
            items: function () {
                return [];
            },
            viewportItems: function () {
                return [];
            },
            onChanged: function () {
            },
            isLoading: function () {
                return dataController.isLoading();
            },
            changingDuration: function () {
                var dataSource = dataController._dataSource;
                if (dataSource.paginate()) {
                    return CHANGING_DURATION_IF_PAGINATE;
                }
                return dataController._changingDuration || 0;
            },
        }, dataAdapter));
    }
    function getHiddenTotals(dataFields) {
        var result = [];
        iterator_1.each(dataFields, function (index, field) {
            if (field.showTotals === false) {
                result.push(index);
            }
        });
        return result;
    }
    function getHiddenValues(dataFields) {
        var result = [];
        dataFields.forEach(function (field, index) {
            if (field.showValues === undefined
                && field.showTotals === false
                || field.showValues === false) {
                result.push(index);
            }
        });
        return result;
    }
    function getHiddenGrandTotalsTotals(dataFields, columnFields) {
        var result = [];
        iterator_1.each(dataFields, function (index, field) {
            if (field.showGrandTotals === false) {
                result.push(index);
            }
        });
        if (columnFields.length === 0 && result.length === dataFields.length) {
            result = [];
        }
        return result;
    }
    var members = {
        ctor: function (options) {
            var that = this;
            var virtualScrollControllerChanged = that._fireChanged.bind(that);
            options = that._options = options || {};
            that.dataSourceChanged = callbacks_1.default();
            that._dataSource = that._createDataSource(options);
            if (options.component && options.component.option('scrolling.mode') === 'virtual') {
                that._rowsScrollController = createScrollController(that, options.component, {
                    totalItemsCount: function () {
                        return that.totalRowCount();
                    },
                    pageIndex: function (index) {
                        return that.rowPageIndex(index);
                    },
                    pageSize: function () {
                        return that.rowPageSize();
                    },
                    load: function () {
                        if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                            that._rowsScrollController.pageIndex(this.pageCount() - 1);
                        }
                        return that._rowsScrollController.handleDataChanged(function () {
                            if (that._dataSource.paginate()) {
                                that._dataSource.load();
                            }
                            else {
                                // - @ts-expect-error
                                virtualScrollControllerChanged.apply(this, arguments);
                            }
                        });
                    },
                });
                that._columnsScrollController = createScrollController(that, options.component, {
                    totalItemsCount: function () {
                        return that.totalColumnCount();
                    },
                    pageIndex: function (index) {
                        return that.columnPageIndex(index);
                    },
                    pageSize: function () {
                        return that.columnPageSize();
                    },
                    load: function () {
                        if (that._columnsScrollController.pageIndex() >= this.pageCount()) {
                            that._columnsScrollController.pageIndex(this.pageCount() - 1);
                        }
                        return that._columnsScrollController.handleDataChanged(function () {
                            if (that._dataSource.paginate()) {
                                that._dataSource.load();
                            }
                            else {
                                // - @ts-expect-error
                                virtualScrollControllerChanged.apply(this, arguments);
                            }
                        });
                    },
                });
            }
            // @ts-expect-error
            that._stateStoringController = new ui_grid_core_state_storing_core_1.default.StateStoringController(options.component).init();
            that._columnsInfo = [];
            that._rowsInfo = [];
            that._cellsInfo = [];
            that.expandValueChanging = callbacks_1.default();
            that.loadingChanged = callbacks_1.default();
            that.progressChanged = callbacks_1.default();
            that.scrollChanged = callbacks_1.default();
            that.load();
            that._update();
            that.changed = callbacks_1.default();
        },
        _fireChanged: function () {
            var that = this;
            var startChanging = new Date();
            that.changed && !that._lockChanged && that.changed.fire();
            that._changingDuration = new Date() - startChanging;
        },
        _correctSkipsTakes: function (rowIndex, rowSkip, rowSpan, levels, skips, takes) {
            var endIndex = rowSpan ? rowIndex + rowSpan - 1 : rowIndex;
            skips[levels.length] = skips[levels.length] || 0;
            takes[levels.length] = takes[levels.length] || 0;
            if (endIndex < rowSkip) {
                skips[levels.length] += 1;
            }
            else {
                takes[levels.length] += 1;
            }
        },
        _calculatePagingForRowExpandedPaths: function (options, skips, takes, rowExpandedSkips, rowExpandedTakes) {
            var rows = this._rowsInfo;
            var rowCount = Math.min(options.rowSkip + options.rowTake, rows.length);
            var rowExpandedPaths = options.rowExpandedPaths;
            var levels = [];
            var expandedPathIndexes = {};
            var i;
            var j;
            var path;
            rowExpandedPaths.forEach(function (path, index) {
                expandedPathIndexes[path] = index;
            });
            for (i = 0; i < rowCount; i += 1) {
                takes.length = skips.length = levels.length + 1;
                for (j = 0; j < rows[i].length; j += 1) {
                    var cell = rows[i][j];
                    if (cell.type === 'D') {
                        this._correctSkipsTakes(i, options.rowSkip, cell.rowspan, levels, skips, takes);
                        path = cell.path || path;
                        var expandIndex = path && path.length > 1
                            ? expandedPathIndexes[path.slice(0, -1)]
                            : -1;
                        if (expandIndex >= 0) {
                            rowExpandedSkips[expandIndex] = skips[levels.length] || 0;
                            rowExpandedTakes[expandIndex] = takes[levels.length] || 0;
                        }
                        if (cell.rowspan) {
                            levels.push(cell.rowspan);
                        }
                    }
                }
                levels = levels.map(function (level) { return level - 1; }).filter(function (level) { return level > 0; });
            }
        },
        _calculatePagingForColumnExpandedPaths: function (options, skips, takes, expandedSkips, expandedTakes) {
            var skipByPath = {};
            var takeByPath = {};
            ui_grid_core_virtual_columns_core_1.foreachColumnInfo(this._columnsInfo, function (columnInfo, columnIndex) {
                if (columnInfo.type === 'D' && columnInfo.path && columnInfo.dataIndex === undefined) {
                    var colspan = columnInfo.colspan || 1;
                    var path = columnInfo.path.slice(0, -1).toString();
                    skipByPath[path] = skipByPath[path] || 0;
                    takeByPath[path] = takeByPath[path] || 0;
                    if (columnIndex + colspan <= options.columnSkip) {
                        skipByPath[path] += 1;
                    }
                    else if (columnIndex < options.columnSkip + options.columnTake) {
                        takeByPath[path] += 1;
                    }
                }
            });
            skips[0] = skipByPath[''];
            takes[0] = takeByPath[''];
            options.columnExpandedPaths.forEach(function (path, index) {
                var skip = skipByPath[path];
                var take = takeByPath[path];
                if (skip !== undefined) {
                    expandedSkips[index] = skip;
                }
                if (take !== undefined) {
                    expandedTakes[index] = take;
                }
            });
        },
        _processPagingForExpandedPaths: function (options, area, storeLoadOptions, reload) {
            var expandedPaths = options[area + "ExpandedPaths"];
            var expandedSkips = expandedPaths.map(function () { return 0; });
            var expandedTakes = expandedPaths.map(function () { return (reload ? options.pageSize : 0); });
            var skips = [];
            var takes = [];
            if (!reload) {
                if (area === 'row') {
                    this._calculatePagingForRowExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
                }
                else {
                    this._calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
                }
            }
            this._savePagingForExpandedPaths(options, area, storeLoadOptions, skips[0], takes[0], expandedSkips, expandedTakes);
        },
        _savePagingForExpandedPaths: function (options, area, storeLoadOptions, skip, take, expandedSkips, expandedTakes) {
            var _a;
            var expandedPaths = options[area + "ExpandedPaths"];
            options[area + "ExpandedPaths"] = [];
            options[area + "Skip"] = skip !== undefined ? skip : options[area + "Skip"];
            options[area + "Take"] = take !== undefined ? take : options[area + "Take"];
            for (var i = 0; i < expandedPaths.length; i += 1) {
                if (expandedTakes[i]) {
                    var isOppositeArea = options.area && options.area !== area;
                    storeLoadOptions.push(extend_1.extend({
                        area: area,
                        headerName: area + "s",
                    }, options, (_a = {},
                        _a[area + "Skip"] = expandedSkips[i],
                        _a[area + "Take"] = expandedTakes[i],
                        _a[isOppositeArea ? 'oppositePath' : 'path'] = expandedPaths[i],
                        _a)));
                }
            }
        },
        _handleCustomizeStoreLoadOptions: function (storeLoadOptions, reload) {
            var _this = this;
            var options = storeLoadOptions[0];
            var rowsScrollController = this._rowsScrollController;
            if (this._dataSource.paginate() && rowsScrollController) {
                var rowPageSize = rowsScrollController.pageSize();
                if (options.headerName === 'rows') {
                    options.rowSkip = 0;
                    options.rowTake = rowPageSize;
                    options.rowExpandedPaths = [];
                }
                else {
                    options.rowSkip = rowsScrollController.beginPageIndex() * rowPageSize;
                    options.rowTake = (rowsScrollController.endPageIndex() - rowsScrollController.beginPageIndex() + 1) * rowPageSize;
                    this._processPagingForExpandedPaths(options, 'row', storeLoadOptions, reload);
                }
            }
            var columnsScrollController = this._columnsScrollController;
            if (this._dataSource.paginate() && columnsScrollController) {
                var columnPageSize_1 = columnsScrollController.pageSize();
                storeLoadOptions.forEach(function (options) {
                    if (options.headerName === 'columns') {
                        options.columnSkip = 0;
                        options.columnTake = columnPageSize_1;
                        options.columnExpandedPaths = [];
                    }
                    else {
                        options.columnSkip = columnsScrollController.beginPageIndex() * columnPageSize_1;
                        options.columnTake = (columnsScrollController.endPageIndex() - columnsScrollController.beginPageIndex() + 1) * columnPageSize_1;
                        _this._processPagingForExpandedPaths(options, 'column', storeLoadOptions, reload);
                    }
                });
            }
        },
        load: function () {
            var that = this;
            var stateStoringController = this._stateStoringController;
            if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
                stateStoringController.load().always(function (state) {
                    if (state) {
                        that._dataSource.state(state);
                    }
                    else {
                        that._dataSource.load();
                    }
                });
            }
            else {
                that._dataSource.load();
            }
        },
        calculateVirtualContentParams: function (contentParams) {
            var that = this;
            var rowsScrollController = that._rowsScrollController;
            var columnsScrollController = that._columnsScrollController;
            if (rowsScrollController && columnsScrollController) {
                rowsScrollController.viewportItemSize(contentParams.virtualRowHeight);
                rowsScrollController.viewportSize(contentParams.viewportHeight / rowsScrollController.viewportItemSize());
                rowsScrollController.setContentItemSizes(contentParams.itemHeights);
                columnsScrollController.viewportItemSize(contentParams.virtualColumnWidth);
                columnsScrollController.viewportSize(contentParams.viewportWidth / columnsScrollController.viewportItemSize());
                columnsScrollController.setContentItemSizes(contentParams.itemWidths);
                common_1.deferUpdate(function () {
                    columnsScrollController.loadIfNeed();
                    rowsScrollController.loadIfNeed();
                });
                that.scrollChanged.fire({
                    left: columnsScrollController.getViewportPosition(),
                    top: rowsScrollController.getViewportPosition(),
                });
                return {
                    contentTop: rowsScrollController.getContentOffset(),
                    contentLeft: columnsScrollController.getContentOffset(),
                    width: columnsScrollController.getVirtualContentSize(),
                    height: rowsScrollController.getVirtualContentSize(),
                };
            }
            return undefined;
        },
        setViewportPosition: function (left, top) {
            this._rowsScrollController.setViewportPosition(top || 0);
            this._columnsScrollController.setViewportPosition(left || 0);
        },
        subscribeToWindowScrollEvents: function ($element) {
            var _a;
            (_a = this._rowsScrollController) === null || _a === void 0 ? void 0 : _a.subscribeToWindowScrollEvents($element);
        },
        updateWindowScrollPosition: function (position) {
            var _a;
            (_a = this._rowsScrollController) === null || _a === void 0 ? void 0 : _a.scrollTo(position);
        },
        updateViewOptions: function (options) {
            extend_1.extend(this._options, options);
            this._update();
        },
        _handleExpandValueChanging: function (e) {
            this.expandValueChanging.fire(e);
        },
        _handleLoadingChanged: function (isLoading) {
            this.loadingChanged.fire(isLoading);
        },
        _handleProgressChanged: function (progress) {
            this.progressChanged.fire(progress);
        },
        _handleFieldsPrepared: function (e) {
            this._options.onFieldsPrepared && this._options.onFieldsPrepared(e);
        },
        _createDataSource: function (options) {
            var that = this;
            var dataSourceOptions = options.dataSource;
            var dataSource;
            that._isSharedDataSource = dataSourceOptions instanceof module_1.PivotGridDataSource;
            if (that._isSharedDataSource) {
                dataSource = dataSourceOptions;
            }
            else {
                dataSource = new module_1.PivotGridDataSource(dataSourceOptions);
            }
            that._expandValueChangingHandler = that._handleExpandValueChanging.bind(that);
            that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
            that._fieldsPreparedHandler = that._handleFieldsPrepared.bind(that);
            that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
            that._changedHandler = function () {
                that._update();
                that.dataSourceChanged.fire();
            };
            that._progressChangedHandler = function (progress) {
                that._handleProgressChanged(progress * 0.8);
            };
            dataSource.on('changed', that._changedHandler);
            dataSource.on('expandValueChanging', that._expandValueChangingHandler);
            dataSource.on('loadingChanged', that._loadingChangedHandler);
            dataSource.on('progressChanged', that._progressChangedHandler);
            dataSource.on('fieldsPrepared', that._fieldsPreparedHandler);
            dataSource.on('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
            return dataSource;
        },
        getDataSource: function () {
            return this._dataSource;
        },
        isLoading: function () {
            return this._dataSource.isLoading();
        },
        beginLoading: function () {
            this._dataSource.beginLoading();
        },
        endLoading: function () {
            this._dataSource.endLoading();
        },
        _update: function () {
            var that = this;
            var dataSource = that._dataSource;
            var options = that._options;
            var columnFields = dataSource.getAreaFields('column');
            var rowFields = dataSource.getAreaFields('row');
            var dataFields = dataSource.getAreaFields('data');
            var dataFieldsForRows = options.dataFieldArea === 'row' ? dataFields : [];
            var dataFieldsForColumns = options.dataFieldArea !== 'row' ? dataFields : [];
            var data = dataSource.getData();
            var hiddenTotals = getHiddenTotals(dataFields);
            var hiddenValues = getHiddenValues(dataFields);
            var hiddenGrandTotals = getHiddenGrandTotalsTotals(dataFields, columnFields);
            var grandTotalsAreHiddenForNotAllDataFields = dataFields.length > 0
                ? hiddenGrandTotals.length !== dataFields.length
                : true;
            var rowOptions = {
                isEmptyGrandTotal: data.isEmptyGrandTotalRow,
                texts: options.texts || {},
                hiddenTotals: hiddenTotals,
                hiddenValues: hiddenValues,
                hiddenGrandTotals: [],
                showTotals: options.showRowTotals,
                showGrandTotals: options.showRowGrandTotals !== false
                    && grandTotalsAreHiddenForNotAllDataFields,
                sortBySummaryPaths: createSortPaths(columnFields, dataFields),
                showTotalsPrior: options.showTotalsPrior === 'rows' || options.showTotalsPrior === 'both',
                showEmpty: !options.hideEmptySummaryCells,
                layout: options.rowHeaderLayout,
                fields: rowFields,
                dataFields: dataFields,
                progress: 0,
            };
            var columnOptions = {
                isEmptyGrandTotal: data.isEmptyGrandTotalColumn,
                texts: options.texts || {},
                hiddenTotals: hiddenTotals,
                hiddenValues: hiddenValues,
                hiddenGrandTotals: hiddenGrandTotals,
                showTotals: options.showColumnTotals,
                showTotalsPrior: options.showTotalsPrior === 'columns' || options.showTotalsPrior === 'both',
                showGrandTotals: options.showColumnGrandTotals !== false
                    && grandTotalsAreHiddenForNotAllDataFields,
                sortBySummaryPaths: createSortPaths(rowFields, dataFields),
                showEmpty: !options.hideEmptySummaryCells,
                fields: columnFields,
                dataFields: dataFields,
                progress: 0,
            };
            var notifyProgress = function (progress) {
                // - @ts-expect-error
                this.progress = progress;
                that._handleProgressChanged(0.8 + 0.1 * rowOptions.progress + 0.1 * columnOptions.progress);
            };
            rowOptions.notifyProgress = notifyProgress;
            columnOptions.notifyProgress = notifyProgress;
            if (!type_1.isDefined(data.grandTotalRowIndex)) {
                data.grandTotalRowIndex = getHeaderIndexedItems(data.rows, rowOptions).length;
            }
            if (!type_1.isDefined(data.grandTotalColumnIndex)) {
                data.grandTotalColumnIndex = getHeaderIndexedItems(data.columns, columnOptions).length;
            }
            dataSource._changeLoadingCount(1);
            deferred_1.when(createHeaderInfo(data.columns, columnFields, dataFieldsForColumns, true, columnOptions), createHeaderInfo(data.rows, rowFields, dataFieldsForRows, false, rowOptions)).always(function () {
                dataSource._changeLoadingCount(-1);
            }).done(function (columnsInfo, rowsInfo) {
                that._columnsInfo = columnsInfo;
                that._rowsInfo = rowsInfo;
                if (that._rowsScrollController
                    && that._columnsScrollController
                    && that.changed
                    && !that._dataSource.paginate()) {
                    that._rowsScrollController.reset(true);
                    that._columnsScrollController.reset(true);
                    that._lockChanged = true;
                    that._rowsScrollController.load();
                    that._columnsScrollController.load();
                    that._lockChanged = false;
                }
            }).done(function () {
                that._fireChanged();
                if (that._stateStoringController.isEnabled() && !that._dataSource.isLoading()) {
                    that._stateStoringController.state(that._dataSource.state());
                    that._stateStoringController.save();
                }
            });
        },
        getRowsInfo: function (getAllData) {
            var that = this;
            var rowsInfo = that._rowsInfo;
            var scrollController = that._rowsScrollController;
            var rowspan;
            if (scrollController && !getAllData) {
                var startIndex_1 = scrollController.beginPageIndex() * that.rowPageSize();
                var endIndex_1 = scrollController.endPageIndex() * that.rowPageSize() + that.rowPageSize();
                var newRowsInfo_1 = [];
                var maxDepth_1 = 1;
                foreachRowInfo(rowsInfo, function (rowInfo, visibleIndex, rowIndex, _, columnIndex) {
                    var isVisible = visibleIndex >= startIndex_1 && rowIndex < endIndex_1;
                    var index = rowIndex < startIndex_1 ? 0 : rowIndex - startIndex_1;
                    var cell = rowInfo;
                    if (isVisible) {
                        newRowsInfo_1[index] = newRowsInfo_1[index] || [];
                        rowspan = rowIndex < startIndex_1
                            ? (rowInfo.rowspan - (startIndex_1 - rowIndex)) || 1
                            : rowInfo.rowspan;
                        if (startIndex_1 + index + rowspan > endIndex_1) {
                            rowspan = (endIndex_1 - (index + startIndex_1)) || 1;
                        }
                        if (rowspan !== rowInfo.rowspan) {
                            cell = extend_1.extend({}, cell, {
                                rowspan: rowspan,
                            });
                        }
                        newRowsInfo_1[index].push(cell);
                        maxDepth_1 = math.max(maxDepth_1, columnIndex + 1);
                    }
                    else {
                        return false;
                    }
                    return undefined;
                });
                foreachRowInfo(newRowsInfo_1, 
                // - @ts-expect-error
                function (rowInfo, visibleIndex, rowIndex, columnIndex, realColumnIndex) {
                    var colspan = rowInfo.colspan || 1;
                    if (realColumnIndex + colspan > maxDepth_1) {
                        newRowsInfo_1[rowIndex][columnIndex] = extend_1.extend({}, rowInfo, {
                            colspan: (maxDepth_1 - realColumnIndex) || 1,
                        });
                    }
                });
                return newRowsInfo_1;
            }
            return rowsInfo;
        },
        getColumnsInfo: function (getAllData) {
            var that = this;
            var info = that._columnsInfo;
            var scrollController = that._columnsScrollController;
            if (scrollController && !getAllData) {
                var startIndex = scrollController.beginPageIndex() * that.columnPageSize();
                var endIndex = scrollController.endPageIndex() * that.columnPageSize()
                    + that.columnPageSize();
                info = ui_grid_core_virtual_columns_core_1.createColumnsInfo(info, startIndex, endIndex);
            }
            return info;
        },
        totalRowCount: function () {
            return this._rowsInfo.length;
        },
        rowPageIndex: function (index) {
            if (index !== undefined) {
                this._rowPageIndex = index;
            }
            return this._rowPageIndex || 0;
        },
        totalColumnCount: function () {
            var count = 0;
            if (this._columnsInfo && this._columnsInfo.length) {
                for (var i = 0; i < this._columnsInfo[0].length; i += 1) {
                    count += this._columnsInfo[0][i].colspan || 1;
                }
            }
            return count;
        },
        rowPageSize: function (size) {
            if (size !== undefined) {
                this._rowPageSize = size;
            }
            return this._rowPageSize || 20;
        },
        columnPageSize: function (size) {
            if (size !== undefined) {
                this._columnPageSize = size;
            }
            return this._columnPageSize || 20;
        },
        columnPageIndex: function (index) {
            if (index !== undefined) {
                this._columnPageIndex = index;
            }
            return this._columnPageIndex || 0;
        },
        getCellsInfo: function (getAllData) {
            var rowsInfo = this.getRowsInfo(getAllData);
            var columnsInfo = this.getColumnsInfo(getAllData);
            var data = this._dataSource.getData();
            var texts = this._options.texts || {};
            return createCellsInfo(rowsInfo, columnsInfo, data, this._dataSource.getAreaFields('data'), this._options.dataFieldArea, texts.dataNotAvailable);
        },
        dispose: function () {
            var that = this;
            if (that._isSharedDataSource) {
                that._dataSource.off('changed', that._changedHandler);
                that._dataSource.off('expandValueChanging', that._expandValueChangingHandler);
                that._dataSource.off('loadingChanged', that._loadingChangedHandler);
                that._dataSource.off('progressChanged', that._progressChangedHandler);
                that._dataSource.off('fieldsPrepared', that._fieldsPreparedHandler);
                that._dataSource.off('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
            }
            else {
                that._dataSource.dispose();
            }
            that._columnsScrollController && that._columnsScrollController.dispose();
            that._rowsScrollController && that._rowsScrollController.dispose();
            that._stateStoringController.dispose();
            that.expandValueChanging.empty();
            that.changed.empty();
            that.loadingChanged.empty();
            that.progressChanged.empty();
            that.scrollChanged.empty();
            that.dataSourceChanged.empty();
        },
    };
    proxyMethod(members, 'applyPartialDataSource');
    proxyMethod(members, 'collapseHeaderItem');
    proxyMethod(members, 'expandHeaderItem');
    proxyMethod(members, 'getData');
    proxyMethod(members, 'isEmpty');
    return members;
})());
exports.DataController = DataController;
// eslint-disable-next-line @typescript-eslint/naming-convention
var DataController__internals = {
    NO_DATA_AVAILABLE_TEXT: NOT_AVAILABLE,
};
exports.DataController__internals = DataController__internals;
exports.default = { DataController: DataController, DataController__internals: DataController__internals };
