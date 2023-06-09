"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotGridDataSource = void 0;
var utils_1 = require("../../../../data/data_source/utils");
var abstract_store_1 = __importDefault(require("../../../../data/abstract_store"));
// @ts-expect-error
var common_1 = require("../../../../core/utils/common");
var type_1 = require("../../../../core/utils/type");
var extend_1 = require("../../../../core/utils/extend");
var array_1 = require("../../../../core/utils/array");
var iterator_1 = require("../../../../core/utils/iterator");
var deferred_1 = require("../../../../core/utils/deferred");
var class_1 = __importDefault(require("../../../../core/class"));
var events_strategy_1 = require("../../../../core/events_strategy");
var inflector_1 = require("../../../../core/utils/inflector");
var module_1 = require("../local_store/module");
var module_2 = require("../remote_store/module");
var module_utils_1 = require("./module_utils");
var module_3 = __importDefault(require("../xmla_store/module"));
var module_4 = __importDefault(require("../summary_display_modes/module"));
var module_widget_utils_1 = require("../module_widget_utils");
var DESCRIPTION_NAME_BY_AREA = {
    row: 'rows',
    column: 'columns',
    data: 'values',
    filter: 'filters',
};
var STATE_PROPERTIES = [
    'area',
    'areaIndex',
    'sortOrder',
    'filterType',
    'filterValues',
    'sortBy',
    'sortBySummaryField',
    'sortBySummaryPath',
    'expanded',
    'summaryType',
    'summaryDisplayMode',
];
var CALCULATED_PROPERTIES = [
    'format',
    'selector',
    'customizeText',
    'caption',
];
var ALL_CALCULATED_PROPERTIES = CALCULATED_PROPERTIES
    .concat(['allowSorting', 'allowSortingBySummary', 'allowFiltering', 'allowExpandAll']);
function createCaption(field) {
    var caption = field.dataField || field.groupName || '';
    var summaryType = (field.summaryType || '').toLowerCase();
    if (type_1.isString(field.groupInterval)) {
        caption += "_" + field.groupInterval;
    }
    if (summaryType && summaryType !== 'custom') {
        summaryType = summaryType.replace(/^./, summaryType[0].toUpperCase());
        if (caption.length) {
            summaryType = " (" + summaryType + ")";
        }
    }
    else {
        summaryType = '';
    }
    return inflector_1.titleize(caption) + summaryType;
}
function resetFieldState(field, properties) {
    var initialProperties = field._initProperties || {};
    iterator_1.each(properties, function (_, prop) {
        if (Object.prototype.hasOwnProperty.call(initialProperties, prop)) {
            field[prop] = initialProperties[prop];
        }
    });
}
function updateCalculatedFieldProperties(field, calculatedProperties) {
    resetFieldState(field, calculatedProperties);
    if (!type_1.isDefined(field.caption)) {
        module_widget_utils_1.setFieldProperty(field, 'caption', createCaption(field));
    }
}
function areExpressionsUsed(dataFields) {
    return dataFields.some(function (field) { return field.summaryDisplayMode || field.calculateSummaryValue; });
}
function isRunningTotalUsed(dataFields) {
    return dataFields.some(function (field) { return !!field.runningTotal; });
}
function isDataExists(data) {
    return data.rows.length || data.columns.length || data.values.length;
}
var PivotGridDataSource = class_1.default.inherit((function () {
    var findHeaderItem = function (headerItems, path) {
        if (headerItems._cacheByPath) {
            return headerItems._cacheByPath[path.join('.')] || null;
        }
        return undefined;
    };
    var getHeaderItemsLastIndex = function (headerItems, grandTotalIndex) {
        var i;
        var lastIndex = -1;
        var headerItem;
        if (headerItems) {
            for (i = 0; i < headerItems.length; i += 1) {
                headerItem = headerItems[i];
                if (headerItem.index !== undefined) {
                    lastIndex = Math.max(lastIndex, headerItem.index);
                }
                if (headerItem.children) {
                    lastIndex = Math.max(lastIndex, getHeaderItemsLastIndex(headerItem.children));
                }
                else if (headerItem.collapsedChildren) {
                    // B232736
                    lastIndex = Math.max(lastIndex, getHeaderItemsLastIndex(headerItem.collapsedChildren));
                }
            }
        }
        if (type_1.isDefined(grandTotalIndex)) {
            lastIndex = Math.max(lastIndex, grandTotalIndex);
        }
        return lastIndex;
    };
    var updateHeaderItemChildren = function (headerItems, headerItem, children, grandTotalIndex) {
        var applyingHeaderItemsCount = getHeaderItemsLastIndex(children) + 1;
        var emptyIndex = getHeaderItemsLastIndex(headerItems, grandTotalIndex) + 1;
        var index;
        var applyingItemIndexesToCurrent = [];
        var needIndexUpdate = false;
        // @ts-expect-error
        var d = new deferred_1.Deferred();
        if (headerItem.children && headerItem.children.length === children.length) {
            for (var i = 0; i < children.length; i += 1) {
                var child = children[i];
                if (child.index !== undefined) {
                    if (headerItem.children[i].index === undefined) {
                        // eslint-disable-next-line no-plusplus
                        child.index = applyingItemIndexesToCurrent[child.index] = emptyIndex++;
                        headerItem.children[i] = child;
                    }
                    else {
                        applyingItemIndexesToCurrent[child.index] = headerItem.children[i].index;
                    }
                }
            }
        }
        else {
            needIndexUpdate = true;
            for (index = 0; index < applyingHeaderItemsCount; index += 1) {
                // eslint-disable-next-line no-plusplus
                applyingItemIndexesToCurrent[index] = emptyIndex++;
            }
            headerItem.children = children;
        }
        deferred_1.when(module_widget_utils_1.foreachTreeAsync(headerItem.children, function (items) {
            if (needIndexUpdate) {
                items[0].index = applyingItemIndexesToCurrent[items[0].index];
            }
        })).done(function () {
            d.resolve(applyingItemIndexesToCurrent);
        });
        return d;
    };
    var updateHeaderItems = function (headerItems, newHeaderItems, grandTotalIndex) {
        // @ts-expect-errors
        var d = new deferred_1.Deferred();
        var emptyIndex = grandTotalIndex >= 0
            && getHeaderItemsLastIndex(headerItems, grandTotalIndex) + 1;
        var applyingItemIndexesToCurrent = [];
        // reset cache
        deferred_1.when(module_widget_utils_1.foreachTreeAsync(headerItems, function (items) {
            delete items[0].collapsedChildren;
        })).done(function () {
            deferred_1.when(module_widget_utils_1.foreachTreeAsync(newHeaderItems, function (newItems, index) {
                var newItem = newItems[0];
                if (newItem.index >= 0) {
                    var headerItem = findHeaderItem(headerItems, module_widget_utils_1.createPath(newItems));
                    if (headerItem && headerItem.index >= 0) {
                        applyingItemIndexesToCurrent[newItem.index] = headerItem.index;
                    }
                    else if (emptyIndex) {
                        var path = module_widget_utils_1.createPath(newItems.slice(1));
                        headerItem = findHeaderItem(headerItems, path);
                        var parentItems = path.length ? headerItem && headerItem.children : headerItems;
                        if (parentItems) {
                            parentItems[index] = newItem;
                            // eslint-disable-next-line no-plusplus
                            newItem.index = applyingItemIndexesToCurrent[newItem.index] = emptyIndex++;
                        }
                    }
                }
            })).done(function () {
                d.resolve(applyingItemIndexesToCurrent);
            });
        });
        return d;
    };
    var updateDataSourceCells = function (dataSource, newDataSourceCells, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
        var newRowIndex;
        var newColumnIndex;
        var newRowCells;
        var newCell;
        var rowIndex;
        var columnIndex;
        var dataSourceCells = dataSource.values;
        if (newDataSourceCells) {
            for (newRowIndex = 0; newRowIndex < newDataSourceCells.length; newRowIndex += 1) {
                newRowCells = newDataSourceCells[newRowIndex];
                rowIndex = newRowItemIndexesToCurrent[newRowIndex];
                if (!type_1.isDefined(rowIndex)) {
                    rowIndex = dataSource.grandTotalRowIndex;
                }
                if (newRowCells && type_1.isDefined(rowIndex)) {
                    if (!dataSourceCells[rowIndex]) {
                        dataSourceCells[rowIndex] = [];
                    }
                    // eslint-disable-next-line eqeqeq
                    for (newColumnIndex = 0; newColumnIndex < newRowCells.length; newColumnIndex += 1) {
                        newCell = newRowCells[newColumnIndex];
                        columnIndex = newColumnItemIndexesToCurrent[newColumnIndex];
                        if (!type_1.isDefined(columnIndex)) {
                            columnIndex = dataSource.grandTotalColumnIndex;
                        }
                        if (type_1.isDefined(newCell) && type_1.isDefined(columnIndex)) {
                            dataSourceCells[rowIndex][columnIndex] = newCell;
                        }
                    }
                }
            }
        }
    };
    function createLocalOrRemoteStore(dataSourceOptions, notifyProgress) {
        var StoreConstructor = dataSourceOptions.remoteOperations
            || dataSourceOptions.paginate ? module_2.RemoteStore : module_1.LocalStore;
        return new StoreConstructor(extend_1.extend(utils_1.normalizeDataSourceOptions(dataSourceOptions), {
            onChanged: null,
            onLoadingChanged: null,
            onProgressChanged: notifyProgress,
        }));
    }
    function createStore(dataSourceOptions, notifyProgress) {
        var store;
        var storeOptions;
        if (type_1.isPlainObject(dataSourceOptions) && dataSourceOptions.load) {
            store = createLocalOrRemoteStore(dataSourceOptions, notifyProgress);
        }
        else {
            // TODO remove
            if (dataSourceOptions && !dataSourceOptions.store) {
                dataSourceOptions = { store: dataSourceOptions };
            }
            storeOptions = dataSourceOptions.store;
            if (storeOptions.type === 'xmla') {
                store = new module_3.default.XmlaStore(storeOptions);
            }
            else if ((type_1.isPlainObject(storeOptions) && storeOptions.type)
                || (storeOptions instanceof abstract_store_1.default)
                || Array.isArray(storeOptions)) {
                store = createLocalOrRemoteStore(dataSourceOptions, notifyProgress);
            }
            else if (storeOptions instanceof class_1.default) {
                store = storeOptions;
            }
        }
        return store;
    }
    function equalFields(fields, prevFields, count) {
        for (var i = 0; i < count; i += 1) {
            if (!fields[i] || !prevFields[i] || fields[i].index !== prevFields[i].index) {
                return false;
            }
        }
        return true;
    }
    function getExpandedPaths(dataSource, loadOptions, dimensionName, prevLoadOptions) {
        var result = [];
        var fields = (loadOptions && loadOptions[dimensionName]) || [];
        var prevFields = (prevLoadOptions && prevLoadOptions[dimensionName]) || [];
        module_widget_utils_1.foreachTree(dataSource[dimensionName], function (items) {
            var item = items[0];
            var path = module_widget_utils_1.createPath(items);
            if (item.children && fields[path.length - 1] && !fields[path.length - 1].expanded) {
                if (path.length < fields.length
                    && (!prevLoadOptions || equalFields(fields, prevFields, path.length))) {
                    result.push(path.slice());
                }
            }
        }, true);
        return result;
    }
    function setFieldProperties(field, srcField, skipInitPropertySave, properties) {
        if (srcField) {
            iterator_1.each(properties, function (_, name) {
                if (skipInitPropertySave) {
                    field[name] = srcField[name];
                }
                else {
                    if ((name === 'summaryType' || name === 'summaryDisplayMode') && srcField[name] === undefined) {
                        // T399271
                        return;
                    }
                    module_widget_utils_1.setFieldProperty(field, name, srcField[name]);
                }
            });
        }
        else {
            resetFieldState(field, properties);
        }
        return field;
    }
    function getFieldsState(fields, properties) {
        var result = [];
        iterator_1.each(fields, function (_, field) {
            result.push(setFieldProperties({
                dataField: field.dataField,
                name: field.name,
            }, field, true, properties));
        });
        return result;
    }
    function getFieldStateId(field) {
        if (field.name) {
            return field.name;
        }
        return "" + field.dataField;
    }
    function getFieldsById(fields, id) {
        var result = [];
        iterator_1.each(fields || [], function (_, field) {
            if (getFieldStateId(field) === id) {
                result.push(field);
            }
        });
        return result;
    }
    function setFieldsStateCore(stateFields, fields) {
        stateFields = stateFields || [];
        iterator_1.each(fields, function (index, field) {
            setFieldProperties(field, stateFields[index], false, STATE_PROPERTIES);
            updateCalculatedFieldProperties(field, CALCULATED_PROPERTIES);
        });
        return fields;
    }
    function setFieldsState(stateFields, fields) {
        stateFields = stateFields || [];
        var fieldsById = {};
        var id;
        iterator_1.each(fields, function (_, field) {
            id = getFieldStateId(field);
            if (!fieldsById[id]) {
                fieldsById[id] = getFieldsById(fields, getFieldStateId(field));
            }
        });
        iterator_1.each(fieldsById, function (id, fields) {
            setFieldsStateCore(getFieldsById(stateFields, id), fields);
        });
        return fields;
    }
    function getFieldsByGroup(fields, groupingField) {
        return fields
            .filter(function (field) { return field.groupName === groupingField.groupName
            && type_1.isNumeric(field.groupIndex)
            && field.visible !== false; })
            .map(function (field) { return extend_1.extend(field, {
            areaIndex: groupingField.areaIndex,
            area: groupingField.area,
            expanded: type_1.isDefined(field.expanded) ? field.expanded : groupingField.expanded,
            dataField: field.dataField || groupingField.dataField,
            dataType: field.dataType || groupingField.dataType,
            sortBy: field.sortBy || groupingField.sortBy,
            sortOrder: field.sortOrder || groupingField.sortOrder,
            sortBySummaryField: field.sortBySummaryField || groupingField.sortBySummaryField,
            sortBySummaryPath: field.sortBySummaryPath || groupingField.sortBySummaryPath,
            visible: field.visible || groupingField.visible,
            showTotals: type_1.isDefined(field.showTotals) ? field.showTotals : groupingField.showTotals,
            showGrandTotals: type_1.isDefined(field.showGrandTotals)
                ? field.showGrandTotals
                : groupingField.showGrandTotals,
        }); }).sort(function (a, b) { return a.groupIndex - b.groupIndex; });
    }
    function sortFieldsByAreaIndex(fields) {
        fields
            .sort(function (field1, field2) { return field1.areaIndex - field2.areaIndex
            || field1.groupIndex - field2.groupIndex; });
    }
    function isAreaField(field, area) {
        var canAddFieldInArea = area === 'data' || field.visible !== false;
        return field.area === area && !type_1.isDefined(field.groupIndex) && canAddFieldInArea;
    }
    function getFieldId(field, retrieveFieldsOptionValue) {
        var groupName = field.groupName || '';
        return (field.dataField || groupName)
            + (field.groupInterval ? groupName + field.groupInterval : 'NOGROUP')
            + (retrieveFieldsOptionValue ? '' : groupName);
    }
    function mergeFields(fields, storeFields, retrieveFieldsOptionValue) {
        var result = [];
        var fieldsDictionary = {};
        var removedFields = {};
        var mergedGroups = [];
        var dataTypes = module_widget_utils_1.getFieldsDataType(fields);
        if (storeFields) {
            iterator_1.each(storeFields, function (_, field) {
                fieldsDictionary[getFieldId(field, retrieveFieldsOptionValue)] = field;
            });
            iterator_1.each(fields, function (_, field) {
                var fieldKey = getFieldId(field, retrieveFieldsOptionValue);
                var storeField = fieldsDictionary[fieldKey] || removedFields[fieldKey];
                var mergedField;
                if (storeField) {
                    if (storeField._initProperties) {
                        resetFieldState(storeField, ALL_CALCULATED_PROPERTIES);
                    }
                    mergedField = extend_1.extend({}, storeField, field, { _initProperties: null });
                }
                else {
                    fieldsDictionary[fieldKey] = mergedField = field;
                }
                if (!mergedField.dataType && dataTypes[field.dataField]) {
                    mergedField.dataType = dataTypes[field.dataField];
                }
                // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                delete fieldsDictionary[fieldKey];
                removedFields[fieldKey] = storeField;
                result.push(mergedField);
            });
            if (retrieveFieldsOptionValue) {
                iterator_1.each(fieldsDictionary, function (_, field) {
                    result.push(field);
                });
            }
        }
        else {
            result = fields;
        }
        result.push.apply(result, mergedGroups);
        assignGroupIndexes(result);
        return result;
    }
    function assignGroupIndexes(fields) {
        fields.forEach(function (field) {
            if (field.groupName && field.groupInterval && field.groupIndex === undefined) {
                var maxGroupIndex = fields
                    .filter(function (f) { return f.groupName === field.groupName && type_1.isNumeric(f.groupIndex); })
                    .map(function (f) { return f.groupIndex; })
                    .reduce(function (prev, current) { return Math.max(prev, current); }, -1);
                field.groupIndex = maxGroupIndex + 1;
            }
        });
    }
    function getFields(that) {
        // @ts-expect-error
        var result = new deferred_1.Deferred();
        var store = that._store;
        var storeFields = store && store.getFields(that._fields);
        var mergedFields;
        deferred_1.when(storeFields).done(function (storeFields) {
            that._storeFields = storeFields;
            mergedFields = mergeFields(that._fields, storeFields, that._retrieveFields);
            result.resolve(mergedFields);
        }).fail(result.reject);
        return result;
    }
    function formatHeaderItems(data, loadOptions, headerName) {
        return module_widget_utils_1.foreachTreeAsync(data[headerName], function (items) {
            var item = items[0];
            item.text = item.text
                || module_widget_utils_1.formatValue(item.value, loadOptions[headerName][module_widget_utils_1.createPath(items).length - 1]);
        });
    }
    function formatHeaders(loadOptions, data) {
        return deferred_1.when(formatHeaderItems(data, loadOptions, 'columns'), formatHeaderItems(data, loadOptions, 'rows'));
    }
    function updateCache(headerItems) {
        // @ts-expect-error
        var d = new deferred_1.Deferred();
        var cacheByPath = {};
        deferred_1.when(module_widget_utils_1.foreachTreeAsync(headerItems, function (items) {
            var path = module_widget_utils_1.createPath(items).join('.');
            // eslint-disable-next-line prefer-destructuring
            cacheByPath[path] = items[0];
        })).done(d.resolve);
        headerItems._cacheByPath = cacheByPath;
        return d;
    }
    function getAreaFields(fields, area) {
        var areaFields = [];
        iterator_1.each(fields, function () {
            if (isAreaField(this, area)) {
                areaFields.push(this);
            }
        });
        return areaFields;
    }
    return {
        ctor: function (options) {
            var _this = this;
            options = options || {};
            this._eventsStrategy = new events_strategy_1.EventsStrategy(this);
            var that = this;
            var store = createStore(options, function (progress) {
                that._eventsStrategy.fireEvent('progressChanged', [progress]);
            });
            that._store = store;
            that._paginate = !!options.paginate;
            that._pageSize = options.pageSize || 40;
            that._data = { rows: [], columns: [], values: [] };
            that._loadingCount = 0;
            that._isFieldsModified = false;
            iterator_1.each([
                'changed',
                'loadError',
                'loadingChanged',
                'progressChanged',
                'fieldsPrepared',
                'expandValueChanging',
            ], function (_, eventName) {
                var optionName = "on" + eventName[0].toUpperCase() + eventName.slice(1);
                if (Object.prototype.hasOwnProperty.call(options, optionName)) {
                    _this.on(eventName, options[optionName]);
                }
            });
            that._retrieveFields = type_1.isDefined(options.retrieveFields) ? options.retrieveFields : true;
            that._fields = options.fields || [];
            that._descriptions = options.descriptions
                ? extend_1.extend(that._createDescriptions(), options.descriptions)
                : undefined;
            if (!store) {
                // TODO create dashboard store
                extend_1.extend(true, that._data, options.store || options);
            }
        },
        getData: function () {
            return this._data;
        },
        getAreaFields: function (area, collectGroups) {
            var areaFields = [];
            var descriptions;
            if (collectGroups || area === 'data') {
                areaFields = getAreaFields(this._fields, area);
                sortFieldsByAreaIndex(areaFields);
            }
            else {
                descriptions = this._descriptions || {};
                areaFields = descriptions[DESCRIPTION_NAME_BY_AREA[area]] || [];
            }
            return areaFields;
        },
        fields: function (fields) {
            var that = this;
            if (fields) {
                that._fields = mergeFields(fields, that._storeFields, that._retrieveFields);
                that._fieldsPrepared(that._fields);
            }
            return that._fields;
        },
        field: function (id, options) {
            var that = this;
            var fields = that._fields;
            var field = fields && fields[type_1.isNumeric(id) ? id : module_widget_utils_1.findField(fields, id)];
            var levels;
            if (field && options) {
                iterator_1.each(options, function (optionName, optionValue) {
                    var isInitialization = !STATE_PROPERTIES.includes(optionName);
                    module_widget_utils_1.setFieldProperty(field, optionName, optionValue, isInitialization);
                    if (optionName === 'sortOrder') {
                        levels = field.levels || [];
                        for (var i = 0; i < levels.length; i += 1) {
                            levels[i][optionName] = optionValue;
                        }
                    }
                });
                updateCalculatedFieldProperties(field, CALCULATED_PROPERTIES);
                that._descriptions = that._createDescriptions(field);
                that._isFieldsModified = true;
                that._eventsStrategy.fireEvent('fieldChanged', [field]);
            }
            return field;
        },
        getFieldValues: function (index, applyFilters, options) {
            var that = this;
            var field = this._fields && this._fields[index];
            var store = this.store();
            var loadFields = [];
            var loadOptions = {
                columns: loadFields,
                rows: [],
                values: this.getAreaFields('data'),
                filters: applyFilters
                    ? this._fields.filter(function (f) { return f !== field
                        && f.area
                        && f.filterValues
                        && f.filterValues.length; })
                    : [],
                skipValues: true,
            };
            var searchValue;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            if (options) {
                searchValue = options.searchValue;
                loadOptions.columnSkip = options.skip;
                loadOptions.columnTake = options.take;
            }
            if (field && store) {
                iterator_1.each(field.levels || [field], function () {
                    loadFields.push(extend_1.extend({}, this, {
                        expanded: true, filterValues: null, sortOrder: 'asc', sortBySummaryField: null,
                        searchValue: searchValue,
                    }));
                });
                store.load(loadOptions).done(function (data) {
                    if (loadOptions.columnSkip) {
                        data.columns = data.columns.slice(loadOptions.columnSkip);
                    }
                    if (loadOptions.columnTake) {
                        data.columns = data.columns.slice(0, loadOptions.columnTake);
                    }
                    formatHeaders(loadOptions, data);
                    if (!loadOptions.columnTake) {
                        that._sort(loadOptions, data);
                    }
                    d.resolve(data.columns);
                }).fail(d);
            }
            else {
                d.reject();
            }
            return d;
        },
        reload: function () {
            return this.load({ reload: true });
        },
        filter: function () {
            var store = this._store;
            return store.filter.apply(store, arguments);
        },
        // eslint-disable-next-line object-shorthand
        load: function (options) {
            var that = this;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            options = options || {};
            that.beginLoading();
            d.fail(function (e) {
                that._eventsStrategy.fireEvent('loadError', [e]);
            }).always(function () {
                that.endLoading();
            });
            function loadTask() {
                that._delayedLoadTask = undefined;
                if (!that._descriptions) {
                    deferred_1.when(getFields(that)).done(function (fields) {
                        that._fieldsPrepared(fields);
                        that._loadCore(options, d);
                    }).fail(d.reject).fail(that._loadErrorHandler);
                }
                else {
                    that._loadCore(options, d);
                }
            }
            if (that.store()) {
                that._delayedLoadTask = common_1.executeAsync(loadTask);
            }
            else {
                loadTask();
            }
            return d;
        },
        createDrillDownDataSource: function (params) {
            return this._store.createDrillDownDataSource(this._descriptions, params);
        },
        _createDescriptions: function (currentField) {
            var that = this;
            var fields = that.fields();
            var descriptions = {
                rows: [],
                columns: [],
                values: [],
                filters: [],
            };
            iterator_1.each(['row', 'column', 'data', 'filter'], function (_, areaName) {
                array_1.normalizeIndexes(getAreaFields(fields, areaName), 'areaIndex', currentField);
            });
            iterator_1.each(fields || [], function (_, field) {
                var descriptionName = DESCRIPTION_NAME_BY_AREA[field.area];
                var dimension = descriptions[descriptionName];
                var groupName = field.groupName;
                if (groupName && !type_1.isNumeric(field.groupIndex)) {
                    field.levels = getFieldsByGroup(fields, field);
                }
                if (!dimension || groupName && type_1.isNumeric(field.groupIndex) || (field.visible === false && (field.area !== 'data' && field.area !== 'filter'))) {
                    return;
                }
                if (field.levels
                    && dimension !== descriptions.filters
                    && dimension !== descriptions.values) {
                    dimension.push.apply(dimension, field.levels);
                    if (field.filterValues && field.filterValues.length) {
                        descriptions.filters.push(field);
                    }
                }
                else {
                    dimension.push(field);
                }
            });
            iterator_1.each(descriptions, function (_, fields) {
                sortFieldsByAreaIndex(fields);
            });
            var indices = {};
            iterator_1.each(descriptions.values, function (_, field) {
                var expression = field.calculateSummaryValue;
                if (type_1.isFunction(expression)) {
                    var summaryCell = module_4.default.createMockSummaryCell(descriptions, fields, indices);
                    expression(summaryCell);
                }
            });
            return descriptions;
        },
        _fieldsPrepared: function (fields) {
            var that = this;
            that._fields = fields;
            iterator_1.each(fields, function (index, field) {
                field.index = index;
                updateCalculatedFieldProperties(field, ALL_CALCULATED_PROPERTIES);
            });
            var currentFieldState = getFieldsState(fields, ['caption']);
            that._eventsStrategy.fireEvent('fieldsPrepared', [fields]);
            for (var i = 0; i < fields.length; i += 1) {
                if (fields[i].caption !== currentFieldState[i].caption) {
                    module_widget_utils_1.setFieldProperty(fields[i], 'caption', fields[i].caption, true);
                }
            }
            that._descriptions = that._createDescriptions();
        },
        isLoading: function () {
            return this._loadingCount > 0;
        },
        state: function (state, skipLoading) {
            var that = this;
            if (arguments.length) {
                state = extend_1.extend({
                    rowExpandedPaths: [],
                    columnExpandedPaths: [],
                }, state);
                if (!that._descriptions) {
                    that.beginLoading();
                    deferred_1.when(getFields(that)).done(function (fields) {
                        that._fields = setFieldsState(state.fields, fields);
                        that._fieldsPrepared(fields);
                        !skipLoading && that.load(state);
                    }).always(function () {
                        that.endLoading();
                    });
                }
                else {
                    that._fields = setFieldsState(state.fields, that._fields);
                    that._descriptions = that._createDescriptions();
                    !skipLoading && that.load(state);
                }
                return undefined;
            }
            return {
                fields: getFieldsState(that._fields, STATE_PROPERTIES),
                columnExpandedPaths: getExpandedPaths(that._data, that._descriptions, 'columns', that._lastLoadOptions),
                rowExpandedPaths: getExpandedPaths(that._data, that._descriptions, 'rows', that._lastLoadOptions),
            };
        },
        beginLoading: function () {
            this._changeLoadingCount(1);
        },
        endLoading: function () {
            this._changeLoadingCount(-1);
        },
        _changeLoadingCount: function (increment) {
            var oldLoading = this.isLoading();
            this._loadingCount += increment;
            var newLoading = this.isLoading();
            // - @ts-expect-error
            if (oldLoading ^ newLoading) {
                this._eventsStrategy.fireEvent('loadingChanged', [newLoading]);
            }
        },
        _hasPagingValues: function (options, area, oppositeIndex) {
            var takeField = area + "Take";
            var skipField = area + "Skip";
            var values = this._data.values;
            var items = this._data[area + "s"];
            var oppositeArea = area === 'row' ? 'column' : 'row';
            var indices = [];
            if (options.path && options.area === area) {
                var headerItem = findHeaderItem(items, options.path);
                items = headerItem && headerItem.children;
                if (!items) {
                    return false;
                }
            }
            if (options.oppositePath && options.area === oppositeArea) {
                var headerItem = findHeaderItem(items, options.oppositePath);
                items = headerItem && headerItem.children;
                if (!items) {
                    return false;
                }
            }
            for (var i = options[skipField]; i < options[skipField] + options[takeField]; i += 1) {
                if (items[i]) {
                    indices.push(items[i].index);
                }
            }
            return indices.every(function (index) {
                if (index !== undefined) {
                    if (area === 'row') {
                        return (values[index] || [])[oppositeIndex];
                    }
                    return (values[oppositeIndex] || [])[index];
                }
                return undefined;
            });
        },
        _processPagingCacheByArea: function (options, pageSize, area) {
            var takeField = area + "Take";
            var skipField = area + "Skip";
            var items = this._data[area + "s"];
            var oppositeArea = area === 'row' ? 'column' : 'row';
            var item;
            if (options[takeField]) {
                if (options.path && options.area === area) {
                    var headerItem = findHeaderItem(items, options.path);
                    items = headerItem && headerItem.children || [];
                }
                if (options.oppositePath && options.area === oppositeArea) {
                    var headerItem = findHeaderItem(items, options.oppositePath);
                    items = headerItem && headerItem.children || [];
                }
                do {
                    item = items[options[skipField]];
                    if (item && item.index !== undefined) {
                        if (this._hasPagingValues(options, oppositeArea, item.index)) {
                            // eslint-disable-next-line no-plusplus
                            options[skipField]++;
                            // eslint-disable-next-line no-plusplus
                            options[takeField]--;
                        }
                        else {
                            break;
                        }
                    }
                } while (item && item.index !== undefined && options[takeField]);
                if (options[takeField]) {
                    var start = Math.floor(options[skipField] / pageSize) * pageSize;
                    var end = Math.ceil((options[skipField] + options[takeField]) / pageSize) * pageSize;
                    options[skipField] = start;
                    options[takeField] = end - start;
                }
            }
        },
        _processPagingCache: function (storeLoadOptions) {
            var pageSize = this._pageSize;
            if (pageSize < 0)
                return;
            for (var i = 0; i < storeLoadOptions.length; i += 1) {
                this._processPagingCacheByArea(storeLoadOptions[i], pageSize, 'row');
                this._processPagingCacheByArea(storeLoadOptions[i], pageSize, 'column');
            }
        },
        _loadCore: function (options, deferred) {
            var that = this;
            var store = this._store;
            var descriptions = this._descriptions;
            var reload = options.reload || (this.paginate() && that._isFieldsModified);
            var paginate = this.paginate();
            var headerName = DESCRIPTION_NAME_BY_AREA[options.area];
            options = options || {};
            if (store) {
                extend_1.extend(options, descriptions);
                options.columnExpandedPaths = options.columnExpandedPaths
                    || getExpandedPaths(this._data, options, 'columns', that._lastLoadOptions);
                options.rowExpandedPaths = options.rowExpandedPaths
                    || getExpandedPaths(this._data, options, 'rows', that._lastLoadOptions);
                if (paginate) {
                    options.pageSize = this._pageSize;
                }
                if (headerName) {
                    options.headerName = headerName;
                }
                that.beginLoading();
                deferred.always(function () {
                    that.endLoading();
                });
                var storeLoadOptions_1 = [options];
                that._eventsStrategy.fireEvent('customizeStoreLoadOptions', [storeLoadOptions_1, reload]);
                if (!reload) {
                    that._processPagingCache(storeLoadOptions_1);
                }
                storeLoadOptions_1 = storeLoadOptions_1
                    .filter(function (options) { return !(options.rows.length && options.rowTake === 0)
                    && !(options.columns.length && options.columnTake === 0); });
                if (!storeLoadOptions_1.length) {
                    that._update(deferred);
                    return;
                }
                var results = storeLoadOptions_1.map(function (options) { return store.load(options); });
                deferred_1.when.apply(null, results).done(function () {
                    var results = arguments;
                    for (var i = 0; i < results.length; i += 1) {
                        var options_1 = storeLoadOptions_1[i];
                        var data = results[i];
                        var isLast = i === results.length - 1;
                        if (options_1.path) {
                            that.applyPartialDataSource(options_1.area, options_1.path, data, isLast
                                ? deferred
                                : false, options_1.oppositePath);
                        }
                        else if (paginate && !reload && isDataExists(that._data)) {
                            that.mergePartialDataSource(data, isLast ? deferred : false);
                        }
                        else {
                            extend_1.extend(that._data, data);
                            that._lastLoadOptions = options_1;
                            that._update(isLast ? deferred : false);
                        }
                    }
                }).fail(deferred.reject);
            }
            else {
                that._update(deferred);
            }
        },
        _sort: function (descriptions, data, getAscOrder) {
            var store = this._store;
            if (store && !this._paginate) {
                module_utils_1.sort(descriptions, data, getAscOrder);
            }
        },
        sortLocal: function () {
            this._sort(this._descriptions, this._data, areExpressionsUsed(this._descriptions.values));
            this._eventsStrategy.fireEvent('changed');
        },
        paginate: function () {
            return this._paginate
                && this._store
                && this._store.supportPaging();
        },
        isEmpty: function () {
            var dataFields = this.getAreaFields('data').filter(function (f) { return f.visible !== false; });
            var data = this.getData();
            return !dataFields.length || !data.values.length;
        },
        _update: function (deferred) {
            var that = this;
            var descriptions = that._descriptions;
            var loadedData = that._data;
            var dataFields = descriptions.values;
            var expressionsUsed = areExpressionsUsed(dataFields);
            deferred_1.when(formatHeaders(descriptions, loadedData), updateCache(loadedData.rows), updateCache(loadedData.columns)).done(function () {
                if (expressionsUsed) {
                    that._sort(descriptions, loadedData, expressionsUsed);
                    !that.isEmpty() && module_4.default.applyDisplaySummaryMode(descriptions, loadedData);
                }
                that._sort(descriptions, loadedData);
                !that.isEmpty()
                    && isRunningTotalUsed(dataFields)
                    && module_4.default.applyRunningTotal(descriptions, loadedData);
                that._data = loadedData;
                deferred !== false && deferred_1.when(deferred).done(function () {
                    that._isFieldsModified = false;
                    that._eventsStrategy.fireEvent('changed');
                    if (type_1.isDefined(that._data.grandTotalRowIndex)) {
                        loadedData.grandTotalRowIndex = that._data.grandTotalRowIndex;
                    }
                    if (type_1.isDefined(that._data.grandTotalColumnIndex)) {
                        loadedData.grandTotalColumnIndex = that._data.grandTotalColumnIndex;
                    }
                });
                deferred && deferred.resolve(that._data);
            });
            return deferred;
        },
        store: function () {
            return this._store;
        },
        collapseHeaderItem: function (area, path) {
            var that = this;
            var headerItems = area === 'column' ? that._data.columns : that._data.rows;
            var headerItem = findHeaderItem(headerItems, path);
            var field = that.getAreaFields(area)[path.length - 1];
            if (headerItem && headerItem.children) {
                that._eventsStrategy.fireEvent('expandValueChanging', [{
                        area: area,
                        path: path,
                        expanded: false,
                    }]);
                if (field) {
                    field.expanded = false;
                }
                headerItem.collapsedChildren = headerItem.children;
                delete headerItem.children;
                that._update();
                if (that.paginate()) {
                    that.load();
                }
                return true;
            }
            return false;
        },
        collapseAll: function (id) {
            var _this = this;
            var dataChanged = false;
            var field = this.field(id) || {};
            var areaOffsets = [this.getAreaFields(field.area).indexOf(field)];
            field.expanded = false;
            if (field && field.levels) {
                areaOffsets = [];
                field.levels.forEach(function (f) {
                    areaOffsets.push(_this.getAreaFields(field.area).indexOf(f));
                    f.expanded = false;
                });
            }
            module_widget_utils_1.foreachTree(this._data[field.area + "s"], function (items) {
                var item = items[0];
                var path = module_widget_utils_1.createPath(items);
                if (item && item.children && areaOffsets.includes(path.length - 1)) {
                    item.collapsedChildren = item.children;
                    delete item.children;
                    dataChanged = true;
                }
            }, true);
            dataChanged && this._update();
        },
        expandAll: function (id) {
            var field = this.field(id);
            if (field && field.area) {
                field.expanded = true;
                if (field && field.levels) {
                    field.levels.forEach(function (f) {
                        f.expanded = true;
                    });
                }
                this.load();
            }
        },
        expandHeaderItem: function (area, path) {
            var that = this;
            var headerItems = area === 'column' ? that._data.columns : that._data.rows;
            var headerItem = findHeaderItem(headerItems, path);
            if (headerItem && !headerItem.children) {
                var hasCache = !!headerItem.collapsedChildren;
                var options = {
                    area: area,
                    path: path,
                    expanded: true,
                    needExpandData: !hasCache,
                };
                that._eventsStrategy.fireEvent('expandValueChanging', [options]);
                if (hasCache) {
                    headerItem.children = headerItem.collapsedChildren;
                    delete headerItem.collapsedChildren;
                    that._update();
                }
                else if (this.store()) {
                    that.load(options);
                }
                return hasCache;
            }
            return false;
        },
        mergePartialDataSource: function (dataSource, deferred) {
            var that = this;
            var loadedData = that._data;
            var newRowItemIndexesToCurrent;
            var newColumnItemIndexesToCurrent;
            if (dataSource && dataSource.values) {
                dataSource.rows = dataSource.rows || [];
                dataSource.columns = dataSource.columns || [];
                newRowItemIndexesToCurrent = updateHeaderItems(loadedData.rows, dataSource.rows, loadedData.grandTotalColumnIndex);
                newColumnItemIndexesToCurrent = updateHeaderItems(loadedData.columns, dataSource.columns, loadedData.grandTotalColumnIndex);
                deferred_1.when(newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent)
                    .done(function (newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
                    if (newRowItemIndexesToCurrent.length || newColumnItemIndexesToCurrent.length) {
                        updateDataSourceCells(loadedData, dataSource.values, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent);
                    }
                    that._update(deferred);
                });
            }
        },
        applyPartialDataSource: function (area, path, dataSource, deferred, oppositePath) {
            var that = this;
            var loadedData = that._data;
            var headerItems = area === 'column' ? loadedData.columns : loadedData.rows;
            var headerItem;
            var oppositeHeaderItems = area === 'column' ? loadedData.rows : loadedData.columns;
            var oppositeHeaderItem;
            var newRowItemIndexesToCurrent;
            var newColumnItemIndexesToCurrent;
            if (dataSource && dataSource.values) {
                dataSource.rows = dataSource.rows || [];
                dataSource.columns = dataSource.columns || [];
                headerItem = findHeaderItem(headerItems, path);
                oppositeHeaderItem = oppositePath && findHeaderItem(oppositeHeaderItems, oppositePath);
                if (headerItem) {
                    if (area === 'column') {
                        newColumnItemIndexesToCurrent = updateHeaderItemChildren(headerItems, headerItem, dataSource.columns, loadedData.grandTotalColumnIndex);
                        if (oppositeHeaderItem) {
                            newRowItemIndexesToCurrent = updateHeaderItemChildren(oppositeHeaderItems, oppositeHeaderItem, dataSource.rows, loadedData.grandTotalRowIndex);
                        }
                        else {
                            newRowItemIndexesToCurrent = updateHeaderItems(loadedData.rows, dataSource.rows, loadedData.grandTotalRowIndex);
                        }
                    }
                    else {
                        newRowItemIndexesToCurrent = updateHeaderItemChildren(headerItems, headerItem, dataSource.rows, loadedData.grandTotalRowIndex);
                        if (oppositeHeaderItem) {
                            newColumnItemIndexesToCurrent = updateHeaderItemChildren(oppositeHeaderItems, oppositeHeaderItem, dataSource.columns, loadedData.grandTotalColumnIndex);
                        }
                        else {
                            newColumnItemIndexesToCurrent = updateHeaderItems(loadedData.columns, dataSource.columns, loadedData.grandTotalColumnIndex);
                        }
                    }
                    deferred_1.when(newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent)
                        .done(function (newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
                        if (area === 'row' && newRowItemIndexesToCurrent.length || area === 'column' && newColumnItemIndexesToCurrent.length) {
                            updateDataSourceCells(loadedData, dataSource.values, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent);
                        }
                        that._update(deferred);
                    });
                }
            }
        },
        on: function (eventName, eventHandler) {
            this._eventsStrategy.on(eventName, eventHandler);
            return this;
        },
        off: function (eventName, eventHandler) {
            this._eventsStrategy.off(eventName, eventHandler);
            return this;
        },
        dispose: function () {
            var that = this;
            var delayedLoadTask = that._delayedLoadTask;
            this._eventsStrategy.dispose();
            if (delayedLoadTask) {
                delayedLoadTask.abort();
            }
            this._isDisposed = true;
        },
        isDisposed: function () {
            return !!this._isDisposed;
        },
    };
})());
exports.PivotGridDataSource = PivotGridDataSource;
exports.default = { PivotGridDataSource: PivotGridDataSource };