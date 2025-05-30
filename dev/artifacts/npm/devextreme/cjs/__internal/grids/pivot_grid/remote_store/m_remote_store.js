/**
* DevExtreme (cjs/__internal/grids/pivot_grid/remote_store/m_remote_store.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RemoteStore = void 0;
var _class = _interopRequireDefault(require("../../../../core/class"));
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _data_source = require("../../../../data/data_source/data_source");
var _utils = require("../../../../data/data_source/utils");
var _m_widget_utils = _interopRequireWildcard(require("../m_widget_utils"));
var _m_remote_store_utils = require("./m_remote_store_utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function createGroupingOptions(dimensionOptions, useSortOrder) {
  var groupingOptions = [];
  (0, _iterator.each)(dimensionOptions, function (index, dimensionOption) {
    groupingOptions.push({
      selector: dimensionOption.dataField,
      groupInterval: dimensionOption.groupInterval,
      desc: useSortOrder && dimensionOption.sortOrder === 'desc',
      isExpanded: index < dimensionOptions.length - 1
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
    selector = "".concat(selector, ".").concat((0, _m_widget_utils.capitalizeFirstLetter)(groupInterval));
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
  if ((0, _type.isDefined)(field.groupInterval)) {
    if (typeof field.groupInterval === 'string' && field.groupInterval.toLowerCase() === 'quarter') {
      expression = getIntervalFilterExpression(selector, 3, (filterValue - 1) * 3 + 1, isExcludedFilterType);
    } else if (typeof field.groupInterval === 'number' && field.dataType !== 'date') {
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
  } else {
    operation = operation || 'or';
  }
  (0, _iterator.each)(field.filterValues, function (index, filterValue) {
    var currentExpression = [];
    if (Array.isArray(filterValue)) {
      var parseLevelsRecursive = field.levels && field.levels.length;
      if (parseLevelsRecursive) {
        currentExpression = createFieldFilterExpressions({
          filterValues: filterValue,
          filterType: field.filterType,
          levels: field.levels
        }, 'and');
      }
    } else {
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
  (0, _iterator.each)(fields, function (_, field) {
    var fieldExpressions = createFieldFilterExpressions(field);
    if (!fieldExpressions.length) {
      return [];
    }
    if (filterExpressions.length) {
      filterExpressions.push('and');
    }
    filterExpressions.push(fieldExpressions);
    return undefined;
  });
  if (filterExpressions.length === 1) {
    // eslint-disable-next-line prefer-destructuring
    filterExpressions = filterExpressions[0];
  }
  return filterExpressions;
}
function mergeFilters(filter1, filter2) {
  var mergedFilter;
  var notEmpty = function notEmpty(filter) {
    return filter && filter.length;
  };
  if (notEmpty(filter1) && notEmpty(filter2)) {
    mergedFilter = [filter1, 'and', filter2];
  } else {
    mergedFilter = notEmpty(filter1) ? filter1 : filter2;
  }
  return mergedFilter;
}
function createLoadOptions(options, externalFilterExpr, hasRows) {
  var filterExpressions = createFilterExpressions(options.filters);
  var groupingOptions = createGroupingOptions(options.rows, options.rowTake).concat(createGroupingOptions(options.columns, options.columnTake));
  var loadOptions = {
    groupSummary: [],
    totalSummary: [],
    group: groupingOptions.length ? groupingOptions : undefined,
    take: groupingOptions.length ? undefined : 1
  };
  if (options.rows.length && options.rowTake) {
    loadOptions.skip = options.rowSkip;
    loadOptions.take = options.rowTake;
    loadOptions.requireGroupCount = true;
  } else if (options.columns.length && options.columnTake && !hasRows) {
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
  (0, _iterator.each)(options.values, function (_, value) {
    var summaryOption = {
      selector: value.dataField,
      summaryType: value.summaryType || 'count'
    };
    loadOptions.groupSummary.push(summaryOption);
    options.includeTotalSummary && loadOptions.totalSummary.push(summaryOption);
  });
  return loadOptions;
}
function setValue(valuesArray, value, rowIndex, columnIndex, dataIndex) {
  valuesArray[rowIndex] = valuesArray[rowIndex] || [];
  valuesArray[rowIndex][columnIndex] = valuesArray[rowIndex][columnIndex] || [];
  if (!(0, _type.isDefined)(valuesArray[rowIndex][columnIndex][dataIndex])) {
    valuesArray[rowIndex][columnIndex][dataIndex] = value;
  }
}
function parseValue(value, field) {
  if (field && field.dataType === 'number' && (0, _type.isString)(value)) {
    return Number(value);
  }
  if (field && field.dataType === 'date' && !field.groupInterval && !(value instanceof Date)) {
    return _date_serialization.default.deserializeDate(value);
  }
  return value;
}
function parseResult(data, total, descriptions, result) {
  var rowPath = [];
  var columnPath = [];
  var rowHash = result.rowHash;
  var columnHash = result.columnHash;
  if (total && total.summary) {
    (0, _iterator.each)(total.summary, function (index, summary) {
      setValue(result.values, summary, result.grandTotalRowIndex, result.grandTotalColumnIndex, index);
    });
  }
  if (total && total.groupCount >= 0) {
    var skip = descriptions.rows.length ? descriptions.rowSkip : descriptions.columnSkip;
    data = _toConsumableArray(Array(skip)).concat(data);
    data.length = total.groupCount;
  }
  function getItem(dataItem, dimensionName, path, level, field) {
    var dimensionHash = result["".concat(dimensionName, "Hash")];
    var parentItem;
    var parentItemChildren;
    var item;
    var pathValue = path.slice(0, level + 1).join('/');
    var parentPathValue;
    if (dimensionHash[pathValue] !== undefined) {
      item = dimensionHash[pathValue];
    } else {
      item = {
        value: parseValue(dataItem.key, field),
        // eslint-disable-next-line no-plusplus
        index: result["".concat(dimensionName, "Index")]++,
        displayText: dataItem.displayText
      };
      parentPathValue = path.slice(0, level).join('/');
      if (level > 0 && dimensionHash[parentPathValue] !== undefined) {
        parentItem = dimensionHash[parentPathValue];
        parentItemChildren = parentItem.children = parentItem.children || [];
      } else {
        parentItemChildren = result["".concat(dimensionName, "s")];
      }
      parentItemChildren.push(item);
      dimensionHash[pathValue] = item;
    }
    return item;
  }
  (0, _m_remote_store_utils.forEachGroup)(data, function (item, level) {
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
        columnPath[columnLevel] = "".concat(item.key);
        columnItem = getItem(item, 'column', columnPath, columnLevel, descriptions.columns[columnLevel]);
        rowItem = rowHash[rowPath.slice(0, rowLevel + 1).join('/')];
      } else {
        result.columns.push({});
      }
    } else if (item) {
      rowPath[rowLevel] = "".concat(item.key);
      rowItem = getItem(item, 'row', rowPath, rowLevel, descriptions.rows[rowLevel]);
      columnItem = columnHash[columnPath.slice(0, columnLevel + 1).join('/')];
    } else {
      result.rows.push({});
    }
    var currentRowIndex = rowItem && rowItem.index || result.grandTotalRowIndex;
    var currentColumnIndex = columnItem && columnItem.index || result.grandTotalColumnIndex;
    (0, _iterator.each)(item && item.summary || [], function (i, summary) {
      setValue(result.values, summary, currentRowIndex, currentColumnIndex, i);
    });
  });
  return result;
}
function getFiltersForDimension(fields) {
  return (fields || []).filter(function (f) {
    return f.filterValues && f.filterValues.length || f.searchValue;
  });
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
  return (0, _m_widget_utils.getFiltersByPath)(options[options.headerName], options.path).concat((0, _m_widget_utils.getFiltersByPath)(options[options.headerName === 'rows' ? 'columns' : 'rows'], options.oppositePath || []));
}
function getExpandedPathSliceFilter(options, dimensionName, level, firstCollapsedFieldIndex) {
  var result = [];
  var startSliceIndex = level > firstCollapsedFieldIndex ? 0 : firstCollapsedFieldIndex;
  var fields = options.headerName !== dimensionName ? options[dimensionName].slice(startSliceIndex, level) : [];
  var paths = dimensionName === 'rows' ? options.rowExpandedPaths : options.columnExpandedPaths;
  (0, _iterator.each)(fields, function (index, field) {
    var filterValues = [];
    (0, _iterator.each)(paths, function (_, path) {
      path = path.slice(startSliceIndex, level);
      if (index < path.length) {
        var filterValue = path[index];
        if (!filterValues.includes(filterValue)) {
          filterValues.push(filterValue);
        }
      }
    });
    if (filterValues.length) {
      result.push((0, _extend.extend)({}, field, {
        filterType: 'include',
        filterValues
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
        filters: commonFilters.concat(getExpandedPathSliceFilter(options, dimensionName, i, firstCollapsedFieldIndex))
      };
      newOptions[dimensionName] = fields.slice(expandedIndex, i + 1);
      newOptions[oppositeDimensionName] = [];
      result.push((0, _extend.extend)({}, options, newOptions));
    }
  } else {
    newOptions = {
      filters: commonFilters
    };
    newOptions[dimensionName] = fields.slice(expandedIndex, expandedLevel + 1);
    newOptions[oppositeDimensionName] = [];
    result.push((0, _extend.extend)({}, options, newOptions));
  }
  result[0].includeTotalSummary = true;
  return result;
}
function getFirstCollapsedIndex(fields) {
  var firstCollapsedIndex = 0;
  (0, _iterator.each)(fields, function (index, field) {
    if (!field.expanded) {
      firstCollapsedIndex = index;
      return false;
    }
    return undefined;
  });
  return firstCollapsedIndex;
}
function getRequestsData(options) {
  var rowExpandedLevel = (0, _m_widget_utils.getExpandedLevel)(options, 'rows');
  var columnExpandedLevel = (0, _m_widget_utils.getExpandedLevel)(options, 'columns');
  var filters = options.filters || [];
  var columnExpandedIndex = getExpandedIndex(options, 'columns');
  var firstCollapsedColumnIndex = getFirstCollapsedIndex(options.columns);
  var firstCollapsedRowIndex = getFirstCollapsedIndex(options.rows);
  var rowExpandedIndex = getExpandedIndex(options, 'rows');
  var data = [];
  filters = filters.concat(getFiltersForDimension(options.rows)).concat(getFiltersForDimension(options.columns)).concat(getFiltersForExpandedDimension(options));
  var columnTotalsOptions = getGrandTotalRequest(options, 'columns', columnExpandedIndex, columnExpandedLevel, filters, firstCollapsedColumnIndex);
  if (options.rows.length && options.columns.length) {
    if (options.headerName !== 'rows') {
      data = data.concat(columnTotalsOptions);
    }
    for (var i = rowExpandedIndex; i < rowExpandedLevel + 1; i += 1) {
      var rows = options.rows.slice(rowExpandedIndex, i + 1);
      var rowFilterByExpandedPaths = getExpandedPathSliceFilter(options, 'rows', i, firstCollapsedRowIndex);
      for (var j = columnExpandedIndex; j < columnExpandedLevel + 1; j += 1) {
        var preparedOptions = (0, _extend.extend)({}, options, {
          columns: options.columns.slice(columnExpandedIndex, j + 1),
          rows,
          filters: filters.concat(getExpandedPathSliceFilter(options, 'columns', j, firstCollapsedColumnIndex)).concat(rowFilterByExpandedPaths)
        });
        data.push(preparedOptions);
      }
    }
  } else {
    data = options.columns.length ? columnTotalsOptions : getGrandTotalRequest(options, 'rows', rowExpandedIndex, rowExpandedLevel, filters, firstCollapsedRowIndex);
  }
  return data;
}
function prepareFields(fields) {
  (0, _iterator.each)(fields || [], function (_, field) {
    var levels = field.levels;
    if (levels) {
      prepareFields(levels);
    }
    (0, _m_widget_utils.setDefaultFieldValueFormatting)(field);
  });
}
var RemoteStore = _class.default.inherit(function () {
  return {
    ctor(options) {
      this._dataSource = new _data_source.DataSource(options);
      this._store = this._dataSource.store();
    },
    getFields(fields) {
      // @ts-expect-error
      var d = new _deferred.Deferred();
      this._store.load({
        skip: 0,
        take: 20
      }).done(function (data) {
        var normalizedArguments = (0, _utils.normalizeLoadResult)(data);
        d.resolve(_m_widget_utils.default.discoverObjectFields(normalizedArguments.data, fields));
      }).fail(d.reject);
      return d;
    },
    key() {
      return this._store.key();
    },
    load(options) {
      var that = this;
      // @ts-expect-error
      var d = new _deferred.Deferred();
      var result = {
        rows: [],
        columns: [],
        values: [],
        grandTotalRowIndex: 0,
        grandTotalColumnIndex: 0,
        rowHash: {},
        columnHash: {},
        rowIndex: 1,
        columnIndex: 1
      };
      var requestsData = getRequestsData(options);
      var deferreds = [];
      prepareFields(options.rows);
      prepareFields(options.columns);
      prepareFields(options.filters);
      (0, _iterator.each)(requestsData, function (_, dataItem) {
        deferreds.push(that._store.load(createLoadOptions(dataItem, that.filter(), options.rows.length)));
      });
      _deferred.when.apply(null, deferreds).done(function () {
        var args = deferreds.length > 1 ? arguments : [arguments];
        (0, _iterator.each)(args, function (index, argument) {
          var normalizedArguments = (0, _utils.normalizeLoadResult)(argument[0], argument[1]);
          parseResult(normalizedArguments.data, normalizedArguments.extra, requestsData[index], result);
        });
        d.resolve({
          rows: result.rows,
          columns: result.columns,
          values: result.values,
          grandTotalRowIndex: result.grandTotalRowIndex,
          grandTotalColumnIndex: result.grandTotalColumnIndex
        });
      }).fail(d.reject);
      return d;
    },
    filter() {
      return this._dataSource.filter.apply(this._dataSource, arguments);
    },
    supportPaging() {
      return false;
    },
    createDrillDownDataSource(loadOptions, params) {
      loadOptions = loadOptions || {};
      params = params || {};
      var store = this._store;
      var filters = (0, _m_widget_utils.getFiltersByPath)(loadOptions.rows, params.rowPath).concat((0, _m_widget_utils.getFiltersByPath)(loadOptions.columns, params.columnPath)).concat(getFiltersForDimension(loadOptions.rows)).concat(loadOptions.filters || []).concat(getFiltersForDimension(loadOptions.columns));
      var filterExp = createFilterExpressions(filters);
      return new _data_source.DataSource({
        load(loadOptions) {
          return store.load((0, _extend.extend)({}, loadOptions, {
            filter: mergeFilters(filterExp, loadOptions.filter),
            select: params.customColumns
          }));
        }
      });
    }
  };
}());
exports.RemoteStore = RemoteStore;
var _default = {
  RemoteStore
};
exports.default = _default;
