"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
var type_1 = require("../../../../core/utils/type");
var iterator_1 = require("../../../../core/utils/iterator");
var module_widget_utils_1 = require("../module_widget_utils");
function sort(loadOptions, dataSource, getAscOrder) {
    sortDimension(dataSource, loadOptions, 'rows', getAscOrder);
    sortDimension(dataSource, loadOptions, 'columns', getAscOrder);
}
exports.sort = sort;
function sortDimension(dataSource, loadOptions, dimensionName, getAscOrder) {
    var fields = loadOptions[dimensionName] || [];
    var baseIndex = loadOptions.headerName === dimensionName ? loadOptions.path.length : 0;
    var sortingMethodByLevel = [];
    module_widget_utils_1.foreachDataLevel(dataSource[dimensionName], function (item, index) {
        var field = fields[index] || {};
        var sortingMethod = sortingMethodByLevel[index] = sortingMethodByLevel[index]
            || getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder);
        item.sort(sortingMethod);
    }, baseIndex);
}
function getSortingMethod(field, dataSource, loadOptions, dimensionName, getAscOrder) {
    var sortOrder = getAscOrder ? 'asc' : field.sortOrder;
    var sortBy = getMemberForSortBy(field.sortBy, getAscOrder);
    var defaultCompare = field.sortingMethod ? function (a, b) {
        return field.sortingMethod(a, b);
    } : module_widget_utils_1.getCompareFunction(function (item) { return item[sortBy]; });
    var summaryValueSelector = !getAscOrder
        && getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName);
    var summaryCompare = summaryValueSelector && module_widget_utils_1.getCompareFunction(summaryValueSelector);
    var sortingMethod = function (a, b) {
        var result = summaryCompare && summaryCompare(a, b) || defaultCompare(a, b);
        return sortOrder === 'desc' ? -result : result;
    };
    return sortingMethod;
}
function getFieldSummaryValueSelector(field, dataSource, loadOptions, dimensionName) {
    var values = dataSource.values;
    var sortBySummaryFieldIndex = module_widget_utils_1.findField(loadOptions.values, field.sortBySummaryField);
    var areRows = dimensionName === 'rows';
    var sortByDimension = areRows ? dataSource.columns : dataSource.rows;
    var grandTotalIndex = areRows
        ? dataSource.grandTotalRowIndex
        : dataSource.grandTotalColumnIndex;
    var sortBySummaryPath = field.sortBySummaryPath || [];
    var sliceIndex = sortBySummaryPath.length
        ? getSliceIndex(sortByDimension, sortBySummaryPath)
        : grandTotalIndex;
    if (values && values.length && sortBySummaryFieldIndex >= 0 && type_1.isDefined(sliceIndex)) {
        return function (field) {
            var rowIndex = areRows ? field.index : sliceIndex;
            var columnIndex = areRows ? sliceIndex : field.index;
            var value = ((values[rowIndex] || [[]])[columnIndex] || [])[sortBySummaryFieldIndex];
            return type_1.isDefined(value) ? value : null;
        };
    }
    return undefined;
}
function getMemberForSortBy(sortBy, getAscOrder) {
    var member = 'text';
    if (sortBy === 'none') {
        member = 'index';
    }
    else if (getAscOrder || sortBy !== 'displayText') {
        member = 'value';
    }
    return member;
}
function getSliceIndex(items, path) {
    var index = null;
    var pathValue = (path || []).join('.');
    if (pathValue.length) {
        module_widget_utils_1.foreachTree(items, function (items) {
            var item = items[0];
            var itemPath = module_widget_utils_1.createPath(items).join('.');
            var textPath = iterator_1.map(items, function (item) { return item.text; }).reverse().join('.');
            if (pathValue === itemPath || (item.key && textPath === pathValue)) {
                index = items[0].index;
                return false;
            }
            return undefined;
        });
    }
    return index;
}
exports.default = { sort: sort };