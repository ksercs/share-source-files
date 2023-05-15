!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/remote_store/module.js"], ["../../../../core/utils/type","../../../../core/class","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../data/data_source/data_source","../../../../core/utils/deferred","../../../../core/utils/date_serialization","../../../../data/data_source/utils","../module_widget_utils","./module_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/remote_store/module.js", ["../../../../core/utils/type", "../../../../core/class", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../data/data_source/data_source", "../../../../core/utils/deferred", "../../../../core/utils/date_serialization", "../../../../data/data_source/utils", "../module_widget_utils", "./module_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.RemoteStore = void 0;
  var _type = $__require("../../../../core/utils/type");
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _data_source = $__require("../../../../data/data_source/data_source");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _date_serialization = _interopRequireDefault($__require("../../../../core/utils/date_serialization"));
  var _utils = $__require("../../../../data/data_source/utils");
  var _module_widget_utils = _interopRequireWildcard($__require("../module_widget_utils"));
  var _module_utils = $__require("./module_utils");
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
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
      selector = "".concat(selector, ".").concat((0, _module_widget_utils.capitalizeFirstLetter)(groupInterval));
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
    (0, _module_utils.forEachGroup)(data, function (item, level) {
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
    return (0, _module_widget_utils.getFiltersByPath)(options[options.headerName], options.path).concat((0, _module_widget_utils.getFiltersByPath)(options[options.headerName === 'rows' ? 'columns' : 'rows'], options.oppositePath || []));
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
          filterValues: filterValues
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
    var rowExpandedLevel = (0, _module_widget_utils.getExpandedLevel)(options, 'rows');
    var columnExpandedLevel = (0, _module_widget_utils.getExpandedLevel)(options, 'columns');
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
            rows: rows,
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
      (0, _module_widget_utils.setDefaultFieldValueFormatting)(field);
    });
  }
  var RemoteStore = _class.default.inherit(function () {
    return {
      ctor: function ctor(options) {
        this._dataSource = new _data_source.DataSource(options);
        this._store = this._dataSource.store();
      },
      getFields: function getFields(fields) {
        // @ts-expect-error
        var d = new _deferred.Deferred();
        this._store.load({
          skip: 0,
          take: 20
        }).done(function (data) {
          var normalizedArguments = (0, _utils.normalizeLoadResult)(data);
          d.resolve(_module_widget_utils.default.discoverObjectFields(normalizedArguments.data, fields));
        }).fail(d.reject);
        return d;
      },
      key: function key() {
        return this._store.key();
      },
      load: function load(options) {
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
      filter: function filter() {
        return this._dataSource.filter.apply(this._dataSource, arguments);
      },
      supportPaging: function supportPaging() {
        return false;
      },
      createDrillDownDataSource: function createDrillDownDataSource(loadOptions, params) {
        loadOptions = loadOptions || {};
        params = params || {};
        var store = this._store;
        var filters = (0, _module_widget_utils.getFiltersByPath)(loadOptions.rows, params.rowPath).concat((0, _module_widget_utils.getFiltersByPath)(loadOptions.columns, params.columnPath)).concat(getFiltersForDimension(loadOptions.rows)).concat(loadOptions.filters || []).concat(getFiltersForDimension(loadOptions.columns));
        var filterExp = createFilterExpressions(filters);
        return new _data_source.DataSource({
          load: function load(loadOptions) {
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
    RemoteStore: RemoteStore
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/type","../../../../core/class","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../data/data_source/data_source","../../../../core/utils/deferred","../../../../core/utils/date_serialization","../../../../data/data_source/utils","../module_widget_utils","./module_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/type"), require("../../../../core/class"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../data/data_source/data_source"), require("../../../../core/utils/deferred"), require("../../../../core/utils/date_serialization"), require("../../../../data/data_source/utils"), require("../module_widget_utils"), require("./module_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map