/**
* DevExtreme (bundles/__internal/grids/grid_core/module_utils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
// @ts-check
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var size_1 = require("../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../core/renderer"));
var type_1 = require("../../../core/utils/type");
var deferred_1 = require("../../../core/utils/deferred");
var string_1 = require("../../../core/utils/string");
var iterator_1 = require("../../../core/utils/iterator");
var extend_1 = require("../../../core/utils/extend");
var position_1 = require("../../../core/utils/position");
// @ts-expect-error
var data_1 = require("../../../core/utils/data");
var common_1 = require("../../../core/utils/common");
// @ts-expect-error
var utils_1 = require("../../../data/utils");
var format_helper_1 = __importDefault(require("../../../format_helper"));
var window_1 = require("../../../core/utils/window");
var events_engine_1 = __importDefault(require("../../../events/core/events_engine"));
var data_source_1 = require("../../../data/data_source/data_source");
var utils_2 = require("../../../data/data_source/utils");
var variable_wrapper_1 = __importDefault(require("../../../core/utils/variable_wrapper"));
var load_panel_1 = __importDefault(require("../../../ui/load_panel"));
var filtering_1 = __importDefault(require("../../../ui/shared/filtering"));
var DATAGRID_SELECTION_DISABLED_CLASS = 'dx-selection-disabled';
var DATAGRID_GROUP_OPENED_CLASS = 'dx-datagrid-group-opened';
var DATAGRID_GROUP_CLOSED_CLASS = 'dx-datagrid-group-closed';
var DATAGRID_EXPAND_CLASS = 'dx-datagrid-expand';
var NO_DATA_CLASS = 'nodata';
var SCROLLING_MODE_INFINITE = 'infinite';
var SCROLLING_MODE_VIRTUAL = 'virtual';
var LEGACY_SCROLLING_MODE = 'scrolling.legacyMode';
var SCROLLING_MODE_OPTION = 'scrolling.mode';
var ROW_RENDERING_MODE_OPTION = 'scrolling.rowRenderingMode';
var DATE_INTERVAL_SELECTORS = {
    year: function (value) {
        return value && value.getFullYear();
    },
    month: function (value) {
        return value && (value.getMonth() + 1);
    },
    day: function (value) {
        return value && value.getDate();
    },
    quarter: function (value) {
        return value && (Math.floor(value.getMonth() / 3) + 1);
    },
    hour: function (value) {
        return value && value.getHours();
    },
    minute: function (value) {
        return value && value.getMinutes();
    },
    second: function (value) {
        return value && value.getSeconds();
    },
};
var getIntervalSelector = function () {
    var data = arguments[1];
    var value = this.calculateCellValue(data);
    if (!type_1.isDefined(value)) {
        return null;
    }
    if (isDateType(this.dataType)) {
        var nameIntervalSelector = arguments[0];
        return DATE_INTERVAL_SELECTORS[nameIntervalSelector](value);
    }
    if (this.dataType === 'number') {
        var groupInterval = arguments[0];
        return Math.floor(Number(value) / groupInterval) * groupInterval;
    }
};
var equalSelectors = function (selector1, selector2) {
    if (type_1.isFunction(selector1) && type_1.isFunction(selector2)) {
        if (selector1.originalCallback && selector2.originalCallback) {
            return selector1.originalCallback === selector2.originalCallback && selector1.columnIndex === selector2.columnIndex;
        }
    }
    return selector1 === selector2;
};
function isDateType(dataType) {
    return dataType === 'date' || dataType === 'datetime';
}
var setEmptyText = function ($container) {
    $container.get(0).textContent = '\u00A0';
};
var normalizeSortingInfo = function (sort) {
    sort = sort || [];
    var result = utils_1.normalizeSortingInfo(sort);
    for (var i = 0; i < sort.length; i++) {
        if (sort && sort[i] && sort[i].isExpanded !== undefined) {
            result[i].isExpanded = sort[i].isExpanded;
        }
        if (sort && sort[i] && sort[i].groupInterval !== undefined) {
            result[i].groupInterval = sort[i].groupInterval;
        }
    }
    return result;
};
var formatValue = function (value, options) {
    var valueText = format_helper_1.default.format(value, options.format) || (value && value.toString()) || '';
    var formatObject = {
        value: value,
        valueText: options.getDisplayFormat ? options.getDisplayFormat(valueText) : valueText,
        target: options.target || 'row',
        groupInterval: options.groupInterval,
    };
    return options.customizeText ? options.customizeText.call(options, formatObject) : formatObject.valueText;
};
var getSummaryText = function (summaryItem, summaryTexts) {
    var displayFormat = summaryItem.displayFormat || (summaryItem.columnCaption && summaryTexts[summaryItem.summaryType + "OtherColumn"]) || summaryTexts[summaryItem.summaryType];
    return formatValue(summaryItem.value, {
        format: summaryItem.valueFormat,
        getDisplayFormat: function (valueText) {
            return displayFormat ? string_1.format(displayFormat, valueText, summaryItem.columnCaption) : valueText;
        },
        customizeText: summaryItem.customizeText,
    });
};
var getWidgetInstance = function ($element) {
    var editorData = $element.data && $element.data();
    var dxComponents = editorData && editorData.dxComponents;
    var widgetName = dxComponents && dxComponents[0];
    return widgetName && editorData[widgetName];
};
var equalFilterParameters = function (filter1, filter2) {
    if (Array.isArray(filter1) && Array.isArray(filter2)) {
        if (filter1.length !== filter2.length) {
            return false;
        }
        for (var i = 0; i < filter1.length; i++) {
            if (!equalFilterParameters(filter1[i], filter2[i])) {
                return false;
            }
        }
        return true;
    }
    if (type_1.isFunction(filter1) && filter1.columnIndex >= 0 && type_1.isFunction(filter2) && filter2.columnIndex >= 0) {
        return filter1.columnIndex === filter2.columnIndex
            && data_1.toComparable(filter1.filterValue) === data_1.toComparable(filter2.filterValue)
            && data_1.toComparable(filter1.selectedFilterOperation) === data_1.toComparable(filter2.selectedFilterOperation);
    }
    return data_1.toComparable(filter1) == data_1.toComparable(filter2); // eslint-disable-line eqeqeq
};
function normalizeGroupingLoadOptions(group) {
    if (!Array.isArray(group)) {
        group = [group];
    }
    return group.map(function (item, i) {
        if (type_1.isString(item)) {
            return {
                selector: item,
                isExpanded: i < group.length - 1,
            };
        }
        return item;
    });
}
exports.default = {
    renderNoDataText: function ($element) {
        var that = this;
        $element = $element || this.element();
        if (!$element) {
            return;
        }
        var noDataClass = that.addWidgetPrefix(NO_DATA_CLASS);
        var noDataElement = $element.find("." + noDataClass).last();
        var isVisible = this._dataController.isEmpty();
        var isLoading = this._dataController.isLoading();
        if (!noDataElement.length) {
            noDataElement = renderer_1.default('<span>')
                .addClass(noDataClass)
                .appendTo($element);
        }
        if (isVisible && !isLoading) {
            noDataElement
                .removeClass('dx-hidden')
                .text(that._getNoDataText());
        }
        else {
            noDataElement
                .addClass('dx-hidden');
        }
    },
    renderLoadPanel: function ($element, $container, isLocalStore) {
        var that = this;
        var loadPanelOptions;
        that._loadPanel && that._loadPanel.$element().remove();
        loadPanelOptions = that.option('loadPanel');
        if (loadPanelOptions && (loadPanelOptions.enabled === 'auto' ? !isLocalStore : loadPanelOptions.enabled)) {
            loadPanelOptions = extend_1.extend({
                shading: false,
                message: loadPanelOptions.text,
                container: $container,
            }, loadPanelOptions);
            that._loadPanel = that._createComponent(renderer_1.default('<div>').appendTo($container), load_panel_1.default, loadPanelOptions);
        }
        else {
            that._loadPanel = null;
        }
    },
    calculateLoadPanelPosition: function ($element) {
        // @ts-expect-error
        var $window = renderer_1.default(window_1.getWindow());
        if (size_1.getHeight($element) > size_1.getHeight($window)) {
            return {
                of: $window,
                boundary: $element,
                collision: 'fit',
            };
        }
        return { of: $element };
    },
    getIndexByKey: function (key, items, keyName) {
        var index = -1;
        if (key !== undefined && Array.isArray(items)) {
            keyName = arguments.length <= 2 ? 'key' : keyName;
            for (var i = 0; i < items.length; i++) {
                var item = type_1.isDefined(keyName) ? items[i][keyName] : items[i];
                if (common_1.equalByValue(key, item)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    },
    combineFilters: function (filters, operation) {
        var _a;
        var resultFilter = [];
        operation = operation || 'and';
        for (var i = 0; i < filters.length; i++) {
            if (!filters[i]) {
                continue;
            }
            if (((_a = filters[i]) === null || _a === void 0 ? void 0 : _a.length) === 1 && filters[i][0] === '!') {
                if (operation === 'and') {
                    return ['!'];
                }
                if (operation === 'or') {
                    continue;
                }
            }
            if (resultFilter.length) {
                resultFilter.push(operation);
            }
            resultFilter.push(filters[i]);
        }
        if (resultFilter.length === 1) {
            // eslint-disable-next-line prefer-destructuring
            resultFilter = resultFilter[0];
        }
        if (resultFilter.length) {
            return resultFilter;
        }
        return undefined;
    },
    checkChanges: function (changes, changeNames) {
        var changesWithChangeNamesCount = 0;
        for (var i = 0; i < changeNames.length; i++) {
            if (changes[changeNames[i]]) {
                changesWithChangeNamesCount++;
            }
        }
        return changes.length && changes.length === changesWithChangeNamesCount;
    },
    equalFilterParameters: equalFilterParameters,
    proxyMethod: function (instance, methodName, defaultResult) {
        if (!instance[methodName]) {
            instance[methodName] = function () {
                var dataSource = this._dataSource;
                return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
            };
        }
    },
    formatValue: formatValue,
    getFormatOptionsByColumn: function (column, target) {
        return {
            format: column.format,
            getDisplayFormat: column.getDisplayFormat,
            customizeText: column.customizeText,
            target: target,
            trueText: column.trueText,
            falseText: column.falseText,
        };
    },
    getDisplayValue: function (column, value, data, rowType) {
        if (column.displayValueMap && column.displayValueMap[value] !== undefined) {
            return column.displayValueMap[value];
        }
        if (column.calculateDisplayValue && data && rowType !== 'group') {
            return column.calculateDisplayValue(data);
        }
        if (column.lookup && !(rowType === 'group' && (column.calculateGroupValue || column.calculateDisplayValue))) {
            return column.lookup.calculateCellValue(value);
        }
        return value;
    },
    getGroupRowSummaryText: function (summaryItems, summaryTexts) {
        var result = '(';
        for (var i = 0; i < summaryItems.length; i++) {
            var summaryItem = summaryItems[i];
            result += (i > 0 ? ', ' : '') + getSummaryText(summaryItem, summaryTexts);
        }
        // eslint-disable-next-line no-return-assign
        return result += ')';
    },
    getSummaryText: getSummaryText,
    normalizeSortingInfo: normalizeSortingInfo,
    getFormatByDataType: function (dataType) {
        // eslint-disable-next-line default-case
        switch (dataType) {
            case 'date':
                return 'shortDate';
            case 'datetime':
                return 'shortDateShortTime';
            default:
                return undefined;
        }
    },
    getHeaderFilterGroupParameters: function (column, remoteGrouping) {
        var result = [];
        var dataField = column.dataField || column.name;
        var groupInterval = filtering_1.default.getGroupInterval(column);
        if (groupInterval) {
            iterator_1.each(groupInterval, function (index, interval) {
                result.push(remoteGrouping ? { selector: dataField, groupInterval: interval, isExpanded: index < groupInterval.length - 1 } : getIntervalSelector.bind(column, interval));
            });
            return result;
        }
        if (remoteGrouping) {
            result = [{ selector: dataField, isExpanded: false }];
        }
        else {
            result = function (data) {
                var result = column.calculateCellValue(data);
                if (result === undefined || result === '') {
                    result = null;
                }
                return result;
            };
            if (column.sortingMethod) {
                result = [{ selector: result, compare: column.sortingMethod.bind(column) }];
            }
        }
        return result;
    },
    equalSortParameters: function (sortParameters1, sortParameters2, ignoreIsExpanded) {
        sortParameters1 = normalizeSortingInfo(sortParameters1);
        sortParameters2 = normalizeSortingInfo(sortParameters2);
        if (Array.isArray(sortParameters1) && Array.isArray(sortParameters2)) {
            if (sortParameters1.length !== sortParameters2.length) {
                return false;
            }
            for (var i = 0; i < sortParameters1.length; i++) {
                if (!equalSelectors(sortParameters1[i].selector, sortParameters2[i].selector) || sortParameters1[i].desc !== sortParameters2[i].desc || sortParameters1[i].groupInterval !== sortParameters2[i].groupInterval || (!ignoreIsExpanded && Boolean(sortParameters1[i].isExpanded) !== Boolean(sortParameters2[i].isExpanded))) {
                    return false;
                }
            }
            return true;
        }
        return (!sortParameters1 || !sortParameters1.length) === (!sortParameters2 || !sortParameters2.length);
    },
    getPointsByColumns: function (items, pointCreated, isVertical, startColumnIndex) {
        var cellsLength = items.length;
        var notCreatePoint = false;
        var item;
        var offset;
        var columnIndex = startColumnIndex || 0;
        var result = [];
        var rtlEnabled;
        for (var i = 0; i <= cellsLength; i++) {
            if (i < cellsLength) {
                item = items.eq(i);
                offset = item.offset();
                rtlEnabled = item.css('direction') === 'rtl';
            }
            var point = {
                index: columnIndex,
                // @ts-expect-error
                x: offset ? offset.left + (!isVertical && (rtlEnabled ^ (i === cellsLength)) ? position_1.getBoundingRect(item[0]).width : 0) : 0,
                y: offset ? offset.top + (isVertical && i === cellsLength ? position_1.getBoundingRect(item[0]).height : 0) : 0,
                columnIndex: columnIndex,
            };
            if (!isVertical && i > 0) {
                var prevItemOffset = items.eq(i - 1).offset();
                if (prevItemOffset.top < point.y) {
                    point.y = prevItemOffset.top;
                }
            }
            if (pointCreated) {
                notCreatePoint = pointCreated(point);
            }
            if (!notCreatePoint) {
                result.push(point);
            }
            columnIndex++;
        }
        return result;
    },
    getExpandCellTemplate: function () {
        return {
            allowRenderToDetachedContainer: true,
            render: function (container, options) {
                var $container = renderer_1.default(container);
                if (type_1.isDefined(options.value) && !(options.data && options.data.isContinuation) && !options.row.isNewRow) {
                    var rowsView = options.component.getView('rowsView');
                    $container
                        .addClass(DATAGRID_EXPAND_CLASS)
                        .addClass(DATAGRID_SELECTION_DISABLED_CLASS);
                    renderer_1.default('<div>')
                        .addClass(options.value ? DATAGRID_GROUP_OPENED_CLASS : DATAGRID_GROUP_CLOSED_CLASS)
                        .appendTo($container);
                    rowsView.setAria('label', options.value ? rowsView.localize('dxDataGrid-ariaCollapse') : rowsView.localize('dxDataGrid-ariaExpand'), $container);
                }
                else {
                    setEmptyText($container);
                }
            },
        };
    },
    setEmptyText: setEmptyText,
    isDateType: isDateType,
    getSelectionRange: function (focusedElement) {
        try {
            if (focusedElement) {
                return {
                    selectionStart: focusedElement.selectionStart,
                    selectionEnd: focusedElement.selectionEnd,
                };
            }
        }
        catch (e) { /* empty */ }
        return {};
    },
    setSelectionRange: function (focusedElement, selectionRange) {
        try {
            if (focusedElement && focusedElement.setSelectionRange) {
                focusedElement.setSelectionRange(selectionRange.selectionStart, selectionRange.selectionEnd);
            }
        }
        catch (e) { /* empty */ }
    },
    focusAndSelectElement: function (component, $element) {
        var isFocused = $element.is(':focus');
        // @ts-expect-error
        events_engine_1.default.trigger($element, 'focus');
        var isSelectTextOnEditingStart = component.option('editing.selectTextOnEditStart');
        var element = $element.get(0);
        if (!isFocused && isSelectTextOnEditingStart && $element.is('.dx-texteditor-input') && !$element.is('[readonly]')) {
            var editor = getWidgetInstance($element.closest('.dx-texteditor'));
            deferred_1.when(editor && editor._loadItemDeferred).done(function () {
                element.select();
            });
        }
    },
    getWidgetInstance: getWidgetInstance,
    getLastResizableColumnIndex: function (columns, resultWidths) {
        var hasResizableColumns = columns.some(function (column) { return column && !column.command && !column.fixed && column.allowResizing !== false; });
        var lastColumnIndex;
        for (lastColumnIndex = columns.length - 1; columns[lastColumnIndex]; lastColumnIndex--) {
            var column = columns[lastColumnIndex];
            var width = resultWidths && resultWidths[lastColumnIndex];
            var allowResizing = !hasResizableColumns || column.allowResizing !== false;
            if (!column.command && !column.fixed && width !== 'adaptiveHidden' && allowResizing) {
                break;
            }
        }
        return lastColumnIndex;
    },
    isElementInCurrentGrid: function (controller, $element) {
        if ($element && $element.length) {
            var $grid = $element.closest("." + controller.getWidgetContainerClass()).parent();
            return $grid.is(controller.component.$element());
        }
        return false;
    },
    isVirtualRowRendering: function (that) {
        var rowRenderingMode = that.option(ROW_RENDERING_MODE_OPTION);
        var isVirtualMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_VIRTUAL;
        var isAppendMode = that.option(SCROLLING_MODE_OPTION) === SCROLLING_MODE_INFINITE;
        if (that.option(LEGACY_SCROLLING_MODE) === false && (isVirtualMode || isAppendMode)) {
            return true;
        }
        return rowRenderingMode === SCROLLING_MODE_VIRTUAL;
    },
    getPixelRatio: function (window) {
        return window.devicePixelRatio || 1;
    },
    /// #DEBUG
    _setPixelRatioFn: function (value) {
        this.getPixelRatio = value;
    },
    /// #ENDDEBUG
    getContentHeightLimit: function (browser) {
        if (browser.mozilla) {
            return 8000000;
        }
        return 15000000 / this.getPixelRatio(window_1.getWindow());
    },
    normalizeLookupDataSource: function (lookup) {
        var lookupDataSourceOptions;
        if (lookup.items) {
            lookupDataSourceOptions = lookup.items;
        }
        else {
            lookupDataSourceOptions = lookup.dataSource;
            if (type_1.isFunction(lookupDataSourceOptions) && !variable_wrapper_1.default.isWrapped(lookupDataSourceOptions)) {
                lookupDataSourceOptions = lookupDataSourceOptions({});
            }
        }
        return utils_2.normalizeDataSourceOptions(lookupDataSourceOptions);
    },
    getWrappedLookupDataSource: function (column, dataSource, filter) {
        var _this = this;
        if (!dataSource) {
            return [];
        }
        var lookupDataSourceOptions = this.normalizeLookupDataSource(column.lookup);
        if (column.calculateCellValue !== column.defaultCalculateCellValue) {
            return lookupDataSourceOptions;
        }
        var hasGroupPaging = dataSource.remoteOperations().groupPaging;
        var hasLookupOptimization = column.displayField && type_1.isString(column.displayField);
        var cachedUniqueRelevantItems;
        var previousTake;
        var previousSkip;
        var sliceItems = function (items, loadOptions) {
            var _a;
            var start = (_a = loadOptions.skip) !== null && _a !== void 0 ? _a : 0;
            var end = loadOptions.take ? start + loadOptions.take : items.length;
            return items.slice(start, end);
        };
        var loadUniqueRelevantItems = function (loadOptions) {
            var group = normalizeGroupingLoadOptions(hasLookupOptimization ? [column.dataField, column.displayField] : column.dataField);
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            var canUseCache = cachedUniqueRelevantItems && (!hasGroupPaging
                || (loadOptions.skip === previousSkip && loadOptions.take === previousTake));
            if (canUseCache) {
                d.resolve(sliceItems(cachedUniqueRelevantItems, loadOptions));
            }
            else {
                previousSkip = loadOptions.skip;
                previousTake = loadOptions.take;
                dataSource.load({
                    filter: filter,
                    group: group,
                    take: hasGroupPaging ? loadOptions.take : undefined,
                    skip: hasGroupPaging ? loadOptions.skip : undefined,
                }).done(function (items) {
                    cachedUniqueRelevantItems = items;
                    d.resolve(hasGroupPaging ? items : sliceItems(items, loadOptions));
                }).fail(d.fail);
            }
            return d;
        };
        var lookupDataSource = __assign(__assign({}, lookupDataSourceOptions), { __dataGridSourceFilter: filter, load: function (loadOptions) {
                // @ts-expect-error
                var d = new deferred_1.Deferred();
                loadUniqueRelevantItems(loadOptions).done(function (items) {
                    if (items.length === 0) {
                        d.resolve([]);
                        return;
                    }
                    var filter = _this.combineFilters(items.flatMap(function (data) { return data.key; }).map(function (key) { return [
                        column.lookup.valueExpr, key,
                    ]; }), 'or');
                    var newDataSource = new data_source_1.DataSource(__assign(__assign(__assign({}, lookupDataSourceOptions), loadOptions), { filter: _this.combineFilters([filter, loadOptions.filter], 'and'), paginate: false }));
                    newDataSource
                        // @ts-expect-error
                        .load()
                        .done(d.resolve)
                        .fail(d.fail);
                }).fail(d.fail);
                return d;
            }, key: column.lookup.valueExpr, byKey: function (key) {
                var d = deferred_1.Deferred();
                this.load({
                    filter: [column.lookup.valueExpr, '=', key],
                }).done(function (arr) {
                    d.resolve(arr[0]);
                });
                return d.promise();
            } });
        return lookupDataSource;
    },
};
