/**
* DevExtreme (cjs/__internal/grids/pivot_grid/remote_store/m_remote_store.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RemoteStore = void 0;
var _data_source = require("../../../../common/data/data_source/data_source");
var _utils = require("../../../../common/data/data_source/utils");
var _class = _interopRequireDefault(require("../../../../core/class"));
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _capitalize = require("../../../core/utils/capitalize");
var _m_widget_utils = _interopRequireWildcard(require("../m_widget_utils"));
var _m_remote_store_utils = require("./m_remote_store_utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createGroupingOptions(fields, useSortOrder) {
  const groupingOptions = [];
  (0, _iterator.each)(fields, (index, field) => {
    groupingOptions.push({
      selector: field.dataField,
      groupInterval: field.groupInterval,
      desc: useSortOrder && field.sortOrder === 'desc',
      isExpanded: index < fields.length - 1
    });
  });
  return groupingOptions;
}
function getFieldFilterSelector(field) {
  let selector = field.dataField;
  let {
    groupInterval
  } = field;
  if (field.dataType === 'date' && typeof groupInterval === 'string') {
    if (groupInterval.toLowerCase() === 'quarter') {
      groupInterval = 'Month';
    }
    selector = `${selector}.${(0, _capitalize.capitalize)(groupInterval)}`;
  }
  return selector;
}
function getIntervalFilterExpression(selector, numericInterval, numericValue, isExcludedFilterType) {
  const startFilterValue = [selector, isExcludedFilterType ? '<' : '>=', numericValue];
  const endFilterValue = [selector, isExcludedFilterType ? '>=' : '<', numericValue + numericInterval];
  return [startFilterValue, isExcludedFilterType ? 'or' : 'and', endFilterValue];
}
function getFilterExpressionForFilterValue(field, filterValue, filterType) {
  const selector = getFieldFilterSelector(field);
  const isExcludedFilterType = (filterType || field.filterType) === 'exclude';
  let expression = [selector, isExcludedFilterType ? '<>' : '=', filterValue];
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
  const fieldFilterExpressions = [];
  if (field.searchValue) {
    return [field.dataField, 'contains', field.searchValue];
  }
  if (field.filterType === 'exclude') {
    operation = operation || 'and';
  } else {
    operation = operation || 'or';
  }
  (0, _iterator.each)(field.filterValues, (index, filterValue) => {
    let currentExpression = [];
    if (Array.isArray(filterValue)) {
      var _field$levels;
      const parseLevelsRecursive = (_field$levels = field.levels) === null || _field$levels === void 0 ? void 0 : _field$levels.length;
      if (parseLevelsRecursive) {
        currentExpression = createFieldFilterExpressions({
          filterValues: filterValue,
          filterType: field.filterType,
          levels: field.levels
        }, 'and');
      }
    } else {
      const currentField = field.levels ? field.levels[index] : field;
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
  let filterExpressions = [];
  (0, _iterator.each)(fields, (_, field) => {
    const fieldExpressions = createFieldFilterExpressions(field);
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
function mergeFilters(filters) {
  let op = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'and';
  const notEmpty = filter => !!(filter !== null && filter !== void 0 && filter.length);
  const result = [];
  (0, _iterator.each)(filters, (_, filter) => {
    if (notEmpty(filter)) result.push(filter, op);
  });
  result.pop();
  // remove redundant nesting
  if (result.length === 1) return result[0];
  return result;
}
function createLoadOptions(options, externalFilterExpr, hasRows) {
  const loadOptions = {
    groupSummary: [],
    totalSummary: []
  };
  const rowGroupingOptions = createGroupingOptions(options.rows, options.rowTake);
  const columnGroupingOptions = createGroupingOptions(options.columns, options.columnTake);
  const groupingOptions = [...rowGroupingOptions, ...columnGroupingOptions];
  if (groupingOptions.length) {
    loadOptions.group = groupingOptions;
    loadOptions.take = undefined;
  } else {
    loadOptions.group = undefined;
    loadOptions.take = 1;
  }
  if (options.rows.length && options.rowTake) {
    loadOptions.skip = options.rowSkip;
    loadOptions.take = options.rowTake;
    loadOptions.requireGroupCount = true;
  } else if (options.columns.length && options.columnTake && !hasRows) {
    loadOptions.skip = options.columnSkip;
    loadOptions.take = options.columnTake;
    loadOptions.requireGroupCount = true;
  }
  let filterExpressions = createFilterExpressions(options.filters);
  filterExpressions = externalFilterExpr ? mergeFilters([filterExpressions, options.filterExpression, externalFilterExpr]) : mergeFilters([filterExpressions, options.filterExpression]);
  if (filterExpressions.length) {
    loadOptions.filter = filterExpressions;
  }
  (0, _iterator.each)(options.values, (_, value) => {
    const summaryOption = {
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
  const rowPath = [];
  let columnPath = [];
  const {
    rowHash
  } = result;
  const {
    columnHash
  } = result;
  if (total !== null && total !== void 0 && total.summary) {
    (0, _iterator.each)(total.summary, (index, summary) => {
      setValue(result.values, summary, result.grandTotalRowIndex, result.grandTotalColumnIndex, index);
    });
  }
  if (total && total.groupCount >= 0) {
    const skip = descriptions.rows.length ? descriptions.rowSkip : descriptions.columnSkip;
    data = [...Array(skip)].concat(data);
    data.length = total.groupCount;
  }
  function getItem(dataItem, dimensionName, path, level, field) {
    const dimensionHash = result[`${dimensionName}Hash`];
    let parentItem;
    let parentItemChildren;
    let item;
    const pathValue = path.slice(0, level + 1).join('/');
    let parentPathValue;
    if (dimensionHash[pathValue] !== undefined) {
      item = dimensionHash[pathValue];
    } else {
      item = {
        value: parseValue(dataItem.key, field),
        // eslint-disable-next-line no-plusplus
        index: result[`${dimensionName}Index`]++,
        displayText: dataItem.displayText
      };
      parentPathValue = path.slice(0, level).join('/');
      if (level > 0 && dimensionHash[parentPathValue] !== undefined) {
        parentItem = dimensionHash[parentPathValue];
        parentItemChildren = parentItem.children = parentItem.children || [];
      } else {
        parentItemChildren = result[`${dimensionName}s`];
      }
      parentItemChildren.push(item);
      dimensionHash[pathValue] = item;
    }
    return item;
  }
  (0, _m_remote_store_utils.forEachGroup)(data, (item, level) => {
    var _rowItem, _columnItem;
    const rowLevel = level >= descriptions.rows.length ? descriptions.rows.length : level;
    const columnLevel = level >= descriptions.rows.length ? level - descriptions.rows.length : 0;
    let columnItem;
    let rowItem;
    if (level >= descriptions.rows.length && columnLevel >= descriptions.columns.length) {
      return;
    }
    if (level < descriptions.rows.length) {
      columnPath = [];
    }
    if (level >= descriptions.rows.length) {
      if (item) {
        columnPath[columnLevel] = `${item.key}`;
        columnItem = getItem(item, 'column', columnPath, columnLevel, descriptions.columns[columnLevel]);
        rowItem = rowHash[rowPath.slice(0, rowLevel + 1).join('/')];
      } else {
        result.columns.push({});
      }
    } else if (item) {
      rowPath[rowLevel] = `${item.key}`;
      rowItem = getItem(item, 'row', rowPath, rowLevel, descriptions.rows[rowLevel]);
      columnItem = columnHash[columnPath.slice(0, columnLevel + 1).join('/')];
    } else {
      result.rows.push({});
    }
    const currentRowIndex = ((_rowItem = rowItem) === null || _rowItem === void 0 ? void 0 : _rowItem.index) || result.grandTotalRowIndex;
    const currentColumnIndex = ((_columnItem = columnItem) === null || _columnItem === void 0 ? void 0 : _columnItem.index) || result.grandTotalColumnIndex;
    (0, _iterator.each)((item === null || item === void 0 ? void 0 : item.summary) || [], (i, summary) => {
      setValue(result.values, summary, currentRowIndex, currentColumnIndex, i);
    });
  });
  return result;
}
function getFiltersForDimension(fields) {
  return (fields === null || fields === void 0 ? void 0 : fields.filter(f => {
    var _f$filterValues;
    return ((_f$filterValues = f.filterValues) === null || _f$filterValues === void 0 ? void 0 : _f$filterValues.length) || f.searchValue;
  })) || [];
}
/**
 * If some field in the 'axis' area was expanded, then returns field's level index.
 *
 * Otherwise, returns 0
 */
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
  const oppositeAxis = options.headerName === 'rows' ? 'columns' : 'rows';
  const fields = options[options.headerName];
  const oppositeFields = options[oppositeAxis];
  const filters = (0, _m_widget_utils.getFiltersByPath)(fields, options.path);
  const oppositeFieldsFilters = (0, _m_widget_utils.getFiltersByPath)(oppositeFields, options.oppositePath || []);
  return filters.concat(oppositeFieldsFilters);
}
/**
 * @returns index of the first field with field.expanded != true
 */
function getFirstCollapsedIndex(fields) {
  for (let index = 0; index < fields.length; index += 1) {
    if (!fields[index].expanded) return index;
  }
  return 0;
}
function getExpandedPathsFilterExprByLevel(options, axis, level) {
  if (options.headerName === axis) {
    return [];
  }
  const isPathInLevel = (fields, path) => {
    if (path.length > level) return false;
    let expandedLevel = path.length;
    while ((_fields$expandedLevel = fields[expandedLevel]) !== null && _fields$expandedLevel !== void 0 && _fields$expandedLevel.expanded) {
      var _fields$expandedLevel;
      expandedLevel += 1;
    }
    return expandedLevel >= level;
  };
  const firstCollapsedFieldIndex = axis === 'rows' ? getFirstCollapsedIndex(options.rows) : getFirstCollapsedIndex(options.columns);
  // Note: we don't need to create filters for fields with field.expanded=true,
  // if level <= number of the expanded fields that are at the beginning
  const startFieldIndex = level <= firstCollapsedFieldIndex ? firstCollapsedFieldIndex : 0;
  const fields = options[axis].slice(startFieldIndex, level);
  const paths = (axis === 'rows' ? options.rowExpandedPaths : options.columnExpandedPaths) || [];
  let result = [];
  (0, _iterator.each)(paths, (_, path) => {
    path = path.slice(startFieldIndex);
    // only prepare filters for paths that are in the specified level
    if (!isPathInLevel(fields, path)) return;
    const filters = [];
    for (let i = 0; i < path.length; i += 1) {
      const field = fields[i];
      if (!(0, _type.isDefined)(field)) break;
      const fieldFilterExpression = getFilterExpressionForFilterValue(field, path[i], 'include');
      filters.push(fieldFilterExpression);
    }
    const pathFilterExpression = mergeFilters(filters);
    result.push(pathFilterExpression);
  });
  result = mergeFilters(result, 'or');
  return result;
}
function getGrandTotalRequest(options, dimensionName, commonFilters) {
  const expandedIndex = getExpandedIndex(options, dimensionName);
  const expandedLevel = (0, _m_widget_utils.getExpandedLevel)(options, dimensionName);
  const expandedPaths = (dimensionName === 'columns' ? options.columnExpandedPaths : options.rowExpandedPaths) || [];
  const oppositeDimensionName = dimensionName === 'columns' ? 'rows' : 'columns';
  const fields = options[dimensionName];
  const result = [];
  if (expandedPaths.length) {
    for (let i = expandedIndex; i <= expandedLevel; i += 1) {
      const slicedFields = fields.slice(expandedIndex, i + 1);
      const filterExpr = getExpandedPathsFilterExprByLevel(options, dimensionName, i);
      const grandTotalOptions = {
        filters: commonFilters,
        filterExpression: filterExpr,
        [dimensionName]: slicedFields,
        [oppositeDimensionName]: []
      };
      result.push((0, _extend.extend)({}, options, grandTotalOptions));
    }
  } else {
    const slicedFields = fields.slice(expandedIndex, expandedLevel + 1);
    const grandTotalOptions = {
      filters: commonFilters,
      [dimensionName]: slicedFields,
      [oppositeDimensionName]: []
    };
    result.push((0, _extend.extend)({}, options, grandTotalOptions));
  }
  result[0].includeTotalSummary = true;
  return result;
}
function createRequestsOptions(options) {
  const rowExpandedIndex = getExpandedIndex(options, 'rows');
  const rowExpandedLevel = (0, _m_widget_utils.getExpandedLevel)(options, 'rows');
  const columnExpandedIndex = getExpandedIndex(options, 'columns');
  const columnExpandedLevel = (0, _m_widget_utils.getExpandedLevel)(options, 'columns');
  const requestsOptions = [];
  const commonFilters = (options.filters || []).concat(getFiltersForDimension(options.rows), getFiltersForDimension(options.columns), getFiltersForExpandedDimension(options));
  const columnTotalsOptions = getGrandTotalRequest(options, 'columns', commonFilters);
  const rowTotalsOptions = getGrandTotalRequest(options, 'rows', commonFilters);
  if (options.rows.length && options.columns.length) {
    if (options.headerName !== 'rows') {
      requestsOptions.push(...columnTotalsOptions);
    }
    for (let i = rowExpandedIndex; i <= rowExpandedLevel; i += 1) {
      const rows = options.rows.slice(rowExpandedIndex, i + 1);
      const rowsFilterExpr = getExpandedPathsFilterExprByLevel(options, 'rows', i);
      for (let j = columnExpandedIndex; j <= columnExpandedLevel; j += 1) {
        const columns = options.columns.slice(columnExpandedIndex, j + 1);
        const columnsFilterExpr = getExpandedPathsFilterExprByLevel(options, 'columns', j);
        const filterExpression = mergeFilters([rowsFilterExpr, columnsFilterExpr]);
        const requestOptions = (0, _extend.extend)({}, options, {
          columns,
          rows,
          filters: commonFilters,
          filterExpression
        });
        requestsOptions.push(requestOptions);
      }
    }
  } else {
    const totalOptions = options.columns.length ? columnTotalsOptions : rowTotalsOptions;
    requestsOptions.push(...totalOptions);
  }
  return requestsOptions;
}
function prepareFields(fields) {
  (0, _iterator.each)(fields || [], (_, field) => {
    const {
      levels
    } = field;
    if (levels) {
      prepareFields(levels);
    }
    (0, _m_widget_utils.setDefaultFieldValueFormatting)(field);
  });
}
const RemoteStore = exports.RemoteStore = _class.default.inherit(function () {
  return {
    ctor(options) {
      this._dataSource = new _data_source.DataSource(options);
      this._store = this._dataSource.store();
    },
    getFields(fields) {
      // @ts-expect-error
      const d = new _deferred.Deferred();
      this._store.load({
        skip: 0,
        take: 20
      }).done(data => {
        // @ts-expect-error
        const normalizedArguments = (0, _utils.normalizeLoadResult)(data);
        d.resolve(_m_widget_utils.default.discoverObjectFields(normalizedArguments.data, fields));
      }).fail(d.reject);
      return d;
    },
    key() {
      return this._store.key();
    },
    load(options) {
      const that = this;
      // @ts-expect-error
      const d = new _deferred.Deferred();
      const result = {
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
      const requestsOptions = createRequestsOptions(options);
      const deferreds = [];
      prepareFields(options.rows);
      prepareFields(options.columns);
      prepareFields(options.filters);
      (0, _iterator.each)(requestsOptions, (_, requestOptions) => {
        const loadOptions = createLoadOptions(requestOptions, that.filter(), options.rows.length);
        const loadDeferred = that._store.load(loadOptions);
        deferreds.push(loadDeferred);
      });
      _deferred.when.apply(null, deferreds).done(function () {
        const args = deferreds.length > 1 ? arguments : [arguments];
        (0, _iterator.each)(args, (index, argument) => {
          const normalizedArguments = (0, _utils.normalizeLoadResult)(argument[0], argument[1]);
          parseResult(normalizedArguments.data, normalizedArguments.extra, requestsOptions[index], result);
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
      const store = this._store;
      const filters = (0, _m_widget_utils.getFiltersByPath)(loadOptions.rows, params.rowPath).concat((0, _m_widget_utils.getFiltersByPath)(loadOptions.columns, params.columnPath)).concat(getFiltersForDimension(loadOptions.rows)).concat(loadOptions.filters || []).concat(getFiltersForDimension(loadOptions.columns));
      const filterExp = createFilterExpressions(filters);
      return new _data_source.DataSource({
        load(loadOptions) {
          const filter = mergeFilters([filterExp, loadOptions.filter]);
          const extendedLoadOptions = (0, _extend.extend)({}, loadOptions, {
            filter: filter.length === 0 ? undefined : filter,
            select: params.customColumns
          });
          return store.load(extendedLoadOptions);
        }
      });
    }
  };
}());
var _default = exports.default = {
  RemoteStore
};
