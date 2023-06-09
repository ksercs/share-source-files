"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteStore = void 0;
var type_1 = require("../../../../core/utils/type");
var class_1 = __importDefault(require("../../../../core/class"));
var extend_1 = require("../../../../core/utils/extend");
var iterator_1 = require("../../../../core/utils/iterator");
var data_source_1 = require("../../../../data/data_source/data_source");
var deferred_1 = require("../../../../core/utils/deferred");
var date_serialization_1 = __importDefault(require("../../../../core/utils/date_serialization"));
var utils_1 = require("../../../../data/data_source/utils");
var module_widget_utils_1 = __importStar(require("../module_widget_utils"));
var module_utils_1 = require("./module_utils");
function createGroupingOptions(dimensionOptions, useSortOrder) {
    var groupingOptions = [];
    iterator_1.each(dimensionOptions, function (index, dimensionOption) {
        groupingOptions.push({
            selector: dimensionOption.dataField,
            groupInterval: dimensionOption.groupInterval,
            desc: useSortOrder && dimensionOption.sortOrder === 'desc',
            isExpanded: index < dimensionOptions.length - 1,
        });
    });
    return groupingOptions;
}
function getFieldFilterSelector(field) {
    var selector = field.dataField;
    var groupInterval = field.groupInterval;
    if (field.dataType === 'date' && typeof groupInterval === 'string') {
        if (groupInterval.toLowerCase() === 'quarter') {
            groupInterval = 'Month';
        }
        selector = selector + "." + module_widget_utils_1.capitalizeFirstLetter(groupInterval);
    }
    return selector;
}
function getIntervalFilterExpression(selector, numericInterval, numericValue, isExcludedFilterType) {
    var startFilterValue = [selector, isExcludedFilterType ? '<' : '>=', numericValue];
    var endFilterValue = [selector, isExcludedFilterType ? '>=' : '<', numericValue + numericInterval];
    return [startFilterValue, isExcludedFilterType ? 'or' : 'and', endFilterValue];
}
function getFilterExpressionForFilterValue(field, filterValue) {
    var selector = getFieldFilterSelector(field);
    var isExcludedFilterType = field.filterType === 'exclude';
    var expression = [selector, isExcludedFilterType ? '<>' : '=', filterValue];
    if (type_1.isDefined(field.groupInterval)) {
        if (typeof field.groupInterval === 'string' && field.groupInterval.toLowerCase() === 'quarter') {
            expression = getIntervalFilterExpression(selector, 3, (filterValue - 1) * 3 + 1, isExcludedFilterType);
        }
        else if (typeof field.groupInterval === 'number' && field.dataType !== 'date') {
            expression = getIntervalFilterExpression(selector, field.groupInterval, filterValue, isExcludedFilterType);
        }
    }
    return expression;
}
function createFieldFilterExpressions(field, operation) {
    var fieldFilterExpressions = [];
    if (field.searchValue) {
        return [field.dataField, 'contains', field.searchValue];
    }
    if (field.filterType === 'exclude') {
        operation = operation || 'and';
    }
    else {
        operation = operation || 'or';
    }
    iterator_1.each(field.filterValues, function (index, filterValue) {
        var currentExpression = [];
        if (Array.isArray(filterValue)) {
            var parseLevelsRecursive = field.levels && field.levels.length;
            if (parseLevelsRecursive) {
                currentExpression = createFieldFilterExpressions({
                    filterValues: filterValue,
                    filterType: field.filterType,
                    levels: field.levels,
                }, 'and');
            }
        }
        else {
            var currentField = field.levels ? field.levels[index] : field;
            currentExpression = getFilterExpressionForFilterValue(currentField, filterValue);
        }
        if (!currentExpression.length) {
            return;
        }
        if (fieldFilterExpressions.length) {
            fieldFilterExpressions.push(operation);
        }
        fieldFilterExpressions.push(currentExpression);
    });
    return fieldFilterExpressions;
}
function createFilterExpressions(fields) {
    var filterExpressions = [];
    iterator_1.each(fields, (function (_, field) {
        var fieldExpressions = createFieldFilterExpressions(field);
        if (!fieldExpressions.length) {
            return [];
        }
        if (filterExpressions.length) {
            filterExpressions.push('and');
        }
        filterExpressions.push(fieldExpressions);
        return undefined;
    }));
    if (filterExpressions.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        filterExpressions = filterExpressions[0];
    }
    return filterExpressions;
}
function mergeFilters(filter1, filter2) {
    var mergedFilter;
    var notEmpty = function (filter) {
        return filter && filter.length;
    };
    if (notEmpty(filter1) && notEmpty(filter2)) {
        mergedFilter = [filter1, 'and', filter2];
    }
    else {
        mergedFilter = notEmpty(filter1) ? filter1 : filter2;
    }
    return mergedFilter;
}
function createLoadOptions(options, externalFilterExpr, hasRows) {
    var filterExpressions = createFilterExpressions(options.filters);
    var groupingOptions = createGroupingOptions(options.rows, options.rowTake)
        .concat(createGroupingOptions(options.columns, options.columnTake));
    var loadOptions = {
        groupSummary: [],
        totalSummary: [],
        group: groupingOptions.length ? groupingOptions : undefined,
        take: groupingOptions.length ? undefined : 1,
    };
    if (options.rows.length && options.rowTake) {
        loadOptions.skip = options.rowSkip;
        loadOptions.take = options.rowTake;
        loadOptions.requireGroupCount = true;
    }
    else if (options.columns.length && options.columnTake && !hasRows) {
        loadOptions.skip = options.columnSkip;
        loadOptions.take = options.columnTake;
        loadOptions.requireGroupCount = true;
    }
    if (externalFilterExpr) {
        filterExpressions = mergeFilters(filterExpressions, externalFilterExpr);
    }
    if (filterExpressions.length) {
        loadOptions.filter = filterExpressions;
    }
    iterator_1.each(options.values, function (_, value) {
        var summaryOption = {
            selector: value.dataField,
            summaryType: value.summaryType || 'count',
        };
        loadOptions.groupSummary.push(summaryOption);
        options.includeTotalSummary && loadOptions.totalSummary.push(summaryOption);
    });
    return loadOptions;
}
function setValue(valuesArray, value, rowIndex, columnIndex, dataIndex) {
    valuesArray[rowIndex] = valuesArray[rowIndex] || [];
    valuesArray[rowIndex][columnIndex] = valuesArray[rowIndex][columnIndex] || [];
    if (!type_1.isDefined(valuesArray[rowIndex][columnIndex][dataIndex])) {
        valuesArray[rowIndex][columnIndex][dataIndex] = value;
    }
}
function parseValue(value, field) {
    if (field && field.dataType === 'number' && type_1.isString(value)) {
        return Number(value);
    }
    if (field && field.dataType === 'date' && !field.groupInterval && !(value instanceof Date)) {
        return date_serialization_1.default.deserializeDate(value);
    }
    return value;
}
function parseResult(data, total, descriptions, result) {
    var rowPath = [];
    var columnPath = [];
    var rowHash = result.rowHash;
    var columnHash = result.columnHash;
    if (total && total.summary) {
        iterator_1.each(total.summary, function (index, summary) {
            setValue(result.values, summary, result.grandTotalRowIndex, result.grandTotalColumnIndex, index);
        });
    }
    if (total && total.groupCount >= 0) {
        var skip = descriptions.rows.length ? descriptions.rowSkip : descriptions.columnSkip;
        data = __spreadArray([], Array(skip)).concat(data);
        data.length = total.groupCount;
    }
    function getItem(dataItem, dimensionName, path, level, field) {
        var dimensionHash = result[dimensionName + "Hash"];
        var parentItem;
        var parentItemChildren;
        var item;
        var pathValue = path.slice(0, level + 1).join('/');
        var parentPathValue;
        if (dimensionHash[pathValue] !== undefined) {
            item = dimensionHash[pathValue];
        }
        else {
            item = {
                value: parseValue(dataItem.key, field),
                // eslint-disable-next-line no-plusplus
                index: result[dimensionName + "Index"]++,
                displayText: dataItem.displayText,
            };
            parentPathValue = path.slice(0, level).join('/');
            if (level > 0 && dimensionHash[parentPathValue] !== undefined) {
                parentItem = dimensionHash[parentPathValue];
                parentItemChildren = parentItem.children = parentItem.children || [];
            }
            else {
                parentItemChildren = result[dimensionName + "s"];
            }
            parentItemChildren.push(item);
            dimensionHash[pathValue] = item;
        }
        return item;
    }
    module_utils_1.forEachGroup(data, function (item, level) {
        var rowLevel = level >= descriptions.rows.length ? descriptions.rows.length : level;
        var columnLevel = level >= descriptions.rows.length ? level - descriptions.rows.length : 0;
        var columnItem;
        var rowItem;
        if (level >= descriptions.rows.length && columnLevel >= descriptions.columns.length) {
            return;
        }
        if (level < descriptions.rows.length) {
            columnPath = [];
        }
        if (level >= descriptions.rows.length) {
            if (item) {
                columnPath[columnLevel] = "" + item.key;
                columnItem = getItem(item, 'column', columnPath, columnLevel, descriptions.columns[columnLevel]);
                rowItem = rowHash[rowPath.slice(0, rowLevel + 1).join('/')];
            }
            else {
                result.columns.push({});
            }
        }
        else if (item) {
            rowPath[rowLevel] = "" + item.key;
            rowItem = getItem(item, 'row', rowPath, rowLevel, descriptions.rows[rowLevel]);
            columnItem = columnHash[columnPath.slice(0, columnLevel + 1).join('/')];
        }
        else {
            result.rows.push({});
        }
        var currentRowIndex = rowItem && rowItem.index || result.grandTotalRowIndex;
        var currentColumnIndex = columnItem && columnItem.index || result.grandTotalColumnIndex;
        iterator_1.each(item && item.summary || [], function (i, summary) {
            setValue(result.values, summary, currentRowIndex, currentColumnIndex, i);
        });
    });
    return result;
}
function getFiltersForDimension(fields) {
    return (fields || []).filter(function (f) { return f.filterValues && f.filterValues.length || f.searchValue; });
}
function getExpandedIndex(options, axis) {
    if (options.headerName) {
        if (axis === options.headerName) {
            return options.path.length;
        }
        if (options.oppositePath) {
            return options.oppositePath.length;
        }
    }
    return 0;
}
function getFiltersForExpandedDimension(options) {
    return module_widget_utils_1.getFiltersByPath(options[options.headerName], options.path).concat(module_widget_utils_1.getFiltersByPath(options[options.headerName === 'rows' ? 'columns' : 'rows'], options.oppositePath || []));
}
function getExpandedPathSliceFilter(options, dimensionName, level, firstCollapsedFieldIndex) {
    var result = [];
    var startSliceIndex = level > firstCollapsedFieldIndex ? 0 : firstCollapsedFieldIndex;
    var fields = options.headerName !== dimensionName
        ? options[dimensionName].slice(startSliceIndex, level)
        : [];
    var paths = dimensionName === 'rows' ? options.rowExpandedPaths : options.columnExpandedPaths;
    iterator_1.each(fields, function (index, field) {
        var filterValues = [];
        iterator_1.each(paths, function (_, path) {
            path = path.slice(startSliceIndex, level);
            if (index < path.length) {
                var filterValue = path[index];
                if (!filterValues.includes(filterValue)) {
                    filterValues.push(filterValue);
                }
            }
        });
        if (filterValues.length) {
            result.push(extend_1.extend({}, field, {
                filterType: 'include',
                filterValues: filterValues,
            }));
        }
    });
    return result;
}
function getGrandTotalRequest(options, dimensionName, expandedIndex, expandedLevel, commonFilters, firstCollapsedFieldIndex) {
    var expandedPaths = (dimensionName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
    var oppositeDimensionName = dimensionName === 'columns' ? 'rows' : 'columns';
    var fields = options[dimensionName];
    var result = [];
    var newOptions;
    if (expandedPaths.length) {
        for (var i = expandedIndex; i < expandedLevel + 1; i += 1) {
            newOptions = {
                filters: commonFilters
                    .concat(getExpandedPathSliceFilter(options, dimensionName, i, firstCollapsedFieldIndex)),
            };
            newOptions[dimensionName] = fields.slice(expandedIndex, i + 1);
            newOptions[oppositeDimensionName] = [];
            result.push(extend_1.extend({}, options, newOptions));
        }
    }
    else {
        newOptions = {
            filters: commonFilters,
        };
        newOptions[dimensionName] = fields.slice(expandedIndex, expandedLevel + 1);
        newOptions[oppositeDimensionName] = [];
        result.push(extend_1.extend({}, options, newOptions));
    }
    result[0].includeTotalSummary = true;
    return result;
}
function getFirstCollapsedIndex(fields) {
    var firstCollapsedIndex = 0;
    iterator_1.each(fields, function (index, field) {
        if (!field.expanded) {
            firstCollapsedIndex = index;
            return false;
        }
        return undefined;
    });
    return firstCollapsedIndex;
}
function getRequestsData(options) {
    var rowExpandedLevel = module_widget_utils_1.getExpandedLevel(options, 'rows');
    var columnExpandedLevel = module_widget_utils_1.getExpandedLevel(options, 'columns');
    var filters = options.filters || [];
    var columnExpandedIndex = getExpandedIndex(options, 'columns');
    var firstCollapsedColumnIndex = getFirstCollapsedIndex(options.columns);
    var firstCollapsedRowIndex = getFirstCollapsedIndex(options.rows);
    var rowExpandedIndex = getExpandedIndex(options, 'rows');
    var data = [];
    filters = filters.concat(getFiltersForDimension(options.rows))
        .concat(getFiltersForDimension(options.columns))
        .concat(getFiltersForExpandedDimension(options));
    var columnTotalsOptions = getGrandTotalRequest(options, 'columns', columnExpandedIndex, columnExpandedLevel, filters, firstCollapsedColumnIndex);
    if (options.rows.length && options.columns.length) {
        if (options.headerName !== 'rows') {
            data = data.concat(columnTotalsOptions);
        }
        for (var i = rowExpandedIndex; i < rowExpandedLevel + 1; i += 1) {
            var rows = options.rows.slice(rowExpandedIndex, i + 1);
            var rowFilterByExpandedPaths = getExpandedPathSliceFilter(options, 'rows', i, firstCollapsedRowIndex);
            for (var j = columnExpandedIndex; j < columnExpandedLevel + 1; j += 1) {
                var preparedOptions = extend_1.extend({}, options, {
                    columns: options.columns.slice(columnExpandedIndex, j + 1),
                    rows: rows,
                    filters: filters.concat(getExpandedPathSliceFilter(options, 'columns', j, firstCollapsedColumnIndex)).concat(rowFilterByExpandedPaths),
                });
                data.push(preparedOptions);
            }
        }
    }
    else {
        data = options.columns.length ? columnTotalsOptions : getGrandTotalRequest(options, 'rows', rowExpandedIndex, rowExpandedLevel, filters, firstCollapsedRowIndex);
    }
    return data;
}
function prepareFields(fields) {
    iterator_1.each(fields || [], function (_, field) {
        var levels = field.levels;
        if (levels) {
            prepareFields(levels);
        }
        module_widget_utils_1.setDefaultFieldValueFormatting(field);
    });
}
var RemoteStore = class_1.default.inherit((function () {
    return {
        ctor: function (options) {
            this._dataSource = new data_source_1.DataSource(options);
            this._store = this._dataSource.store();
        },
        getFields: function (fields) {
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            this._store.load({
                skip: 0,
                take: 20,
            }).done(function (data) {
                var normalizedArguments = utils_1.normalizeLoadResult(data);
                d.resolve(module_widget_utils_1.default.discoverObjectFields(normalizedArguments.data, fields));
            }).fail(d.reject);
            return d;
        },
        key: function () {
            return this._store.key();
        },
        load: function (options) {
            var that = this;
            // @ts-expect-error
            var d = new deferred_1.Deferred();
            var result = {
                rows: [],
                columns: [],
                values: [],
                grandTotalRowIndex: 0,
                grandTotalColumnIndex: 0,
                rowHash: {},
                columnHash: {},
                rowIndex: 1,
                columnIndex: 1,
            };
            var requestsData = getRequestsData(options);
            var deferreds = [];
            prepareFields(options.rows);
            prepareFields(options.columns);
            prepareFields(options.filters);
            iterator_1.each(requestsData, function (_, dataItem) {
                deferreds.push(that._store
                    .load(createLoadOptions(dataItem, that.filter(), options.rows.length)));
            });
            deferred_1.when.apply(null, deferreds).done(function () {
                var args = deferreds.length > 1 ? arguments : [arguments];
                iterator_1.each(args, function (index, argument) {
                    var normalizedArguments = utils_1.normalizeLoadResult(argument[0], argument[1]);
                    parseResult(normalizedArguments.data, normalizedArguments.extra, requestsData[index], result);
                });
                d.resolve({
                    rows: result.rows,
                    columns: result.columns,
                    values: result.values,
                    grandTotalRowIndex: result.grandTotalRowIndex,
                    grandTotalColumnIndex: result.grandTotalColumnIndex,
                });
            }).fail(d.reject);
            return d;
        },
        filter: function () {
            return this._dataSource.filter.apply(this._dataSource, arguments);
        },
        supportPaging: function () {
            return false;
        },
        createDrillDownDataSource: function (loadOptions, params) {
            loadOptions = loadOptions || {};
            params = params || {};
            var store = this._store;
            var filters = module_widget_utils_1.getFiltersByPath(loadOptions.rows, params.rowPath)
                .concat(module_widget_utils_1.getFiltersByPath(loadOptions.columns, params.columnPath))
                .concat(getFiltersForDimension(loadOptions.rows))
                .concat(loadOptions.filters || [])
                .concat(getFiltersForDimension(loadOptions.columns));
            var filterExp = createFilterExpressions(filters);
            return new data_source_1.DataSource({
                load: function (loadOptions) {
                    return store.load(extend_1.extend({}, loadOptions, {
                        filter: mergeFilters(filterExp, loadOptions.filter),
                        select: params.customColumns,
                    }));
                },
            });
        },
    };
})());
exports.RemoteStore = RemoteStore;
exports.default = { RemoteStore: RemoteStore };