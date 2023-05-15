!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/local_store/module.js"], ["../../../../core/utils/deferred","../../../../data/utils","../../../../data/query","../../../../core/utils/date_serialization","../../../../data/data_source/data_source","../../../../data/custom_store","../../../../core/utils/data","../../../../core/class","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../data/array_store","../module_widget_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/local_store/module.js", ["../../../../core/utils/deferred", "../../../../data/utils", "../../../../data/query", "../../../../core/utils/date_serialization", "../../../../data/data_source/data_source", "../../../../data/custom_store", "../../../../core/utils/data", "../../../../core/class", "../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/iterator", "../../../../data/array_store", "../module_widget_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.LocalStore = void 0;
  var _deferred = $__require("../../../../core/utils/deferred");
  var _utils = $__require("../../../../data/utils");
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _date_serialization = _interopRequireDefault($__require("../../../../core/utils/date_serialization"));
  var _data_source = $__require("../../../../data/data_source/data_source");
  var _custom_store = _interopRequireDefault($__require("../../../../data/custom_store"));
  var _data = $__require("../../../../core/utils/data");
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _array_store = _interopRequireDefault($__require("../../../../data/array_store"));
  var _module_widget_utils = $__require("../module_widget_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // eslint-disable-next-line import/extensions
  // @ts-expect-error

  // @ts-expect-error

  var PATH_DELIMETER = '/./';
  var LocalStore = _class.default.inherit(function () {
    var DATE_INTERVAL_SELECTORS = {
      year: function year(date) {
        return date && date.getFullYear();
      },
      quarter: function quarter(date) {
        return date && Math.floor(date.getMonth() / 3) + 1;
      },
      month: function month(date) {
        return date && date.getMonth() + 1;
      },
      day: function day(date) {
        return date && date.getDate();
      },
      dayOfWeek: function dayOfWeek(date) {
        return date && date.getDay();
      }
    };
    function getDataSelector(dataField) {
      return dataField.indexOf('.') !== -1 ? (0, _data.compileGetter)(dataField) : function (data) {
        return data[dataField];
      };
    }
    function getDateValue(dataSelector) {
      return function (data) {
        var value = dataSelector(data);
        if (value && !(value instanceof Date)) {
          value = _date_serialization.default.deserializeDate(value);
        }
        return value;
      };
    }
    function prepareFields(fields) {
      (0, _iterator.each)(fields || [], function (_, field) {
        var fieldSelector;
        var intervalSelector;
        var dataField = field.dataField;
        var groupInterval;
        var levels = field.levels;
        var dataSelector;
        if (!field.selector) {
          if (!dataField) {
            dataSelector = function dataSelector(data) {
              return data;
            };
          } else {
            dataSelector = getDataSelector(dataField);
          }
          if (levels) {
            prepareFields(levels);
          }
          if (field.dataType === 'date') {
            intervalSelector = DATE_INTERVAL_SELECTORS[field.groupInterval];
            var valueSelector = getDateValue(dataSelector);
            fieldSelector = function fieldSelector(data) {
              var value = valueSelector(data);
              return intervalSelector ? intervalSelector(value) : value;
            };
          } else if (field.dataType === 'number') {
            groupInterval = (0, _type.isNumeric)(field.groupInterval) && field.groupInterval > 0 && field.groupInterval;
            fieldSelector = function fieldSelector(data) {
              var value = dataSelector(data);
              if ((0, _type.isString)(value)) {
                value = Number(value);
              }
              return groupInterval ? Math.floor(value / groupInterval) * groupInterval : value;
            };
          } else {
            fieldSelector = dataSelector;
          }
          (0, _module_widget_utils.setDefaultFieldValueFormatting)(field);
          (0, _module_widget_utils.setFieldProperty)(field, 'selector', fieldSelector);
        }
      });
    }
    var addHierarchyItem = function addHierarchyItem(value, hierarchyItems, pathHash, childrenHash) {
      var hierarchyItem = childrenHash[pathHash];
      if (!hierarchyItem) {
        hierarchyItem = {
          value: value,
          // eslint-disable-next-line no-plusplus
          index: childrenHash.length++
        };
        childrenHash[pathHash] = hierarchyItem;
        hierarchyItems.push(hierarchyItem);
      }
      return hierarchyItem;
    };
    function fillHierarchyItemIndexesCore(indexes, options, children, expandIndex, pathHash) {
      var dimension = options.dimensions[expandIndex];
      var expandedPathsHash = options.expandedPathsHash;
      var dimensionValue;
      var hierarchyItem;
      if (dimension) {
        dimensionValue = dimension.selector(options.data);
        pathHash = pathHash !== undefined ? pathHash + PATH_DELIMETER + dimensionValue : "".concat(dimensionValue);
        hierarchyItem = addHierarchyItem(dimensionValue, children, pathHash, options.childrenHash);
        indexes.push(hierarchyItem.index);
        if (expandedPathsHash && expandedPathsHash[pathHash] || dimension.expanded) {
          if (!hierarchyItem.children) {
            hierarchyItem.children = [];
          }
          fillHierarchyItemIndexesCore(indexes, options, hierarchyItem.children, expandIndex + 1, pathHash);
        }
      }
    }
    function generateHierarchyItems(data, loadOptions, headers, headerName) {
      var result = [0];
      var expandIndex = loadOptions.headerName === headerName ? loadOptions.path.length : 0;
      var expandedPaths = headerName === 'rows' ? loadOptions.rowExpandedPaths : loadOptions.columnExpandedPaths;
      var options = {
        data: data,
        childrenHash: headers["".concat(headerName, "Hash")],
        dimensions: loadOptions[headerName],
        expandedPathsHash: loadOptions.headerName !== headerName && expandedPaths && expandedPaths.hash
      };
      fillHierarchyItemIndexesCore(result, options, headers[headerName], expandIndex);
      return result;
    }
    function generateAggregationCells(data, cells, headers, options) {
      var cellSet = [];
      var x;
      var y;
      var rowIndex;
      var columnIndex;
      var rowIndexes = generateHierarchyItems(data, options, headers, 'rows');
      var columnIndexes = generateHierarchyItems(data, options, headers, 'columns');
      for (y = 0; y < rowIndexes.length; y += 1) {
        rowIndex = rowIndexes[y];
        cells[rowIndex] = cells[rowIndex] || [];
        for (x = 0; x < columnIndexes.length; x += 1) {
          columnIndex = columnIndexes[x];
          cellSet.push(cells[rowIndex][columnIndex] = cells[rowIndex][columnIndex] || []);
        }
      }
      return cellSet;
    }
    function fillHashExpandedPath(expandedPaths) {
      if (expandedPaths) {
        var hash = expandedPaths.hash = {};
        expandedPaths.forEach(function (path) {
          var pathValue = path.map(function (value) {
            return "".concat(value);
          }).join(PATH_DELIMETER);
          hash[pathValue] = true;
        });
      }
    }
    function prepareLoadOption(options) {
      options.rows = options.rows || [];
      options.columns = options.columns || [];
      options.filters = options.filters || [];
      fillHashExpandedPath(options.columnExpandedPaths);
      fillHashExpandedPath(options.rowExpandedPaths);
      prepareFields(options.columns);
      prepareFields(options.rows);
      prepareFields(options.values);
      prepareFields(options.filters);
    }
    function getAggregator(field) {
      if (field.summaryType === 'custom') {
        field.calculateCustomSummary = field.calculateCustomSummary || _common.noop;
        return {
          seed: function seed() {
            var options = {
              summaryProcess: 'start',
              totalValue: undefined
            };
            field.calculateCustomSummary(options);
            return options;
          },
          step: function step(options, value) {
            options.summaryProcess = 'calculate';
            options.value = value;
            field.calculateCustomSummary(options);
            return options;
          },
          finalize: function finalize(options) {
            options.summaryProcess = 'finalize';
            delete options.value;
            field.calculateCustomSummary(options);
            return options.totalValue;
          }
        };
      }
      return _utils.aggregators[field.summaryType] || _utils.aggregators.count;
    }
    function aggregationStep(measures, aggregationCells, data) {
      for (var aggregatorIndex = 0; aggregatorIndex < measures.length; aggregatorIndex += 1) {
        var cellField = measures[aggregatorIndex];
        var cellValue = cellField.selector(data);
        var aggregator = getAggregator(cellField);
        var isAggregatorSeedFunction = typeof aggregator.seed === 'function';
        for (var cellSetIndex = 0; cellSetIndex < aggregationCells.length; cellSetIndex += 1) {
          var cell = aggregationCells[cellSetIndex];
          if (cell.length <= aggregatorIndex) {
            cell[aggregatorIndex] = isAggregatorSeedFunction ? aggregator.seed() : aggregator.seed;
          }
          if (cell[aggregatorIndex] === undefined) {
            cell[aggregatorIndex] = cellValue;
          } else if ((0, _type.isDefined)(cellValue)) {
            cell[aggregatorIndex] = aggregator.step(cell[aggregatorIndex], cellValue);
          }
        }
      }
    }
    function aggregationFinalize(measures, cells) {
      (0, _iterator.each)(measures, function (aggregatorIndex, cellField) {
        var aggregator = getAggregator(cellField);
        if (aggregator.finalize) {
          (0, _iterator.each)(cells, function (_, row) {
            (0, _iterator.each)(row, function (_, cell) {
              if (cell && cell[aggregatorIndex] !== undefined) {
                cell[aggregatorIndex] = aggregator.finalize(cell[aggregatorIndex]);
              }
            });
          });
        }
      });
    }
    function areValuesEqual(filterValue, fieldValue) {
      var valueOfFilter = filterValue && filterValue.valueOf();
      var valueOfField = fieldValue && fieldValue.valueOf();
      if (Array.isArray(filterValue)) {
        fieldValue = fieldValue || [];
        for (var i = 0; i < filterValue.length; i += 1) {
          valueOfFilter = filterValue[i] && filterValue[i].valueOf();
          valueOfField = fieldValue[i] && fieldValue[i].valueOf();
          if (valueOfFilter !== valueOfField) {
            return false;
          }
        }
        return true;
      }
      return valueOfFilter === valueOfField;
    }
    function getGroupValue(levels, data) {
      var value = [];
      (0, _iterator.each)(levels, function (_, field) {
        value.push(field.selector(data));
      });
      return value;
    }
    function createDimensionFilters(dimension) {
      var filters = [];
      (0, _iterator.each)(dimension, function (_, field) {
        var filterValues = field.filterValues || [];
        var groupName = field.groupName;
        if (groupName && (0, _type.isNumeric)(field.groupIndex)) {
          return;
        }
        var filter = function filter(dataItem) {
          var value = field.levels ? getGroupValue(field.levels, dataItem) : field.selector(dataItem);
          var result = false;
          for (var i = 0; i < filterValues.length; i += 1) {
            if (areValuesEqual(filterValues[i], value)) {
              result = true;
              break;
            }
          }
          return field.filterType === 'exclude' ? !result : result;
        };
        filterValues.length && filters.push(filter);
      });
      return filters;
    }
    function createFilter(options) {
      var filters = createDimensionFilters(options.rows).concat(createDimensionFilters(options.columns)).concat(createDimensionFilters(options.filters));
      var expandedDimensions = options[options.headerName];
      var path = options.path;
      if (expandedDimensions) {
        filters.push(function (dataItem) {
          var expandValue;
          for (var i = 0; i < path.length; i += 1) {
            expandValue = expandedDimensions[i].selector(dataItem);
            if ((0, _data.toComparable)(expandValue, true) !== (0, _data.toComparable)(path[i], true)) {
              return false;
            }
          }
          return true;
        });
      }
      return function (dataItem) {
        for (var i = 0; i < filters.length; i += 1) {
          if (!filters[i](dataItem)) {
            return false;
          }
        }
        return true;
      };
    }
    function loadCore(items, options, notifyProgress) {
      var headers = {
        columns: [],
        rows: [],
        columnsHash: {
          length: 1
        },
        rowsHash: {
          length: 1
        }
      };
      var values = [];
      var aggregationCells;
      var data;
      // @ts-expect-error
      var d = new _deferred.Deferred();
      var i = 0;
      var filter = createFilter(options);
      function processData() {
        var t = new Date();
        var startIndex = i;
        for (; i < items.length; i += 1) {
          if (i > startIndex && i % 10000 === 0) {
            if (new Date() - t >= 300) {
              notifyProgress(i / items.length);
              setTimeout(processData, 0);
              return;
            }
          }
          data = items[i];
          if (filter(data)) {
            aggregationCells = generateAggregationCells(data, values, headers, options);
            aggregationStep(options.values, aggregationCells, data);
          }
        }
        aggregationFinalize(options.values, values);
        notifyProgress(1);
        d.resolve({
          rows: headers.rows,
          columns: headers.columns,
          values: values,
          grandTotalRowIndex: 0,
          grandTotalColumnIndex: 0
        });
      }
      processData();
      return d;
    }
    function filterDataSource(dataSource, fieldSelectors) {
      var filter = dataSource.filter();
      if (dataSource.store() instanceof _custom_store.default && filter) {
        filter = processFilter(filter, fieldSelectors);
        return (0, _query.default)(dataSource.items()).filter(filter).toArray();
      }
      return dataSource.items();
    }
    function loadDataSource(dataSource, fieldSelectors, reload) {
      // @ts-expect-error
      var d = new _deferred.Deferred();
      var customizeStoreLoadOptionsHandler = function customizeStoreLoadOptionsHandler(options) {
        if (dataSource.store() instanceof _array_store.default) {
          options.storeLoadOptions.filter = processFilter(options.storeLoadOptions.filter, fieldSelectors);
        }
      };
      dataSource.on('customizeStoreLoadOptions', customizeStoreLoadOptionsHandler);
      if (!dataSource.isLoaded() || reload) {
        var loadDeferred = reload ? dataSource.load() : dataSource.reload();
        (0, _deferred.when)(loadDeferred).done(function () {
          loadDataSource(dataSource, fieldSelectors).done(function () {
            d.resolve(filterDataSource(dataSource, fieldSelectors));
          }).fail(d.reject);
        }).fail(d.reject);
      } else {
        d.resolve(filterDataSource(dataSource, fieldSelectors));
      }
      return d.always(function () {
        dataSource.off('customizeStoreLoadOptions', customizeStoreLoadOptionsHandler);
      });
    }
    function fillSelectorsByFields(selectors, fields) {
      fields.forEach(function (field) {
        if (field.dataField && field.dataType === 'date') {
          var valueSelector = getDateValue(getDataSelector(field.dataField));
          selectors[field.dataField] = function (data) {
            return valueSelector(data);
          };
        }
      });
    }
    function getFieldSelectors(options) {
      var selectors = {};
      if (Array.isArray(options)) {
        fillSelectorsByFields(selectors, options);
      } else if (options) {
        ['rows', 'columns', 'filters'].forEach(function (area) {
          options[area] && fillSelectorsByFields(selectors, options[area]);
        });
      }
      return selectors;
    }
    function processFilter(filter, fieldSelectors) {
      if (!Array.isArray(filter)) {
        return filter;
      }
      filter = filter.slice(0);
      if ((0, _type.isString)(filter[0]) && (filter[1] instanceof Date || filter[2] instanceof Date)) {
        filter[0] = fieldSelectors[filter[0]];
      }
      for (var i = 0; i < filter.length; i += 1) {
        filter[i] = processFilter(filter[i], fieldSelectors);
      }
      return filter;
    }
    return {
      ctor: function ctor(options) {
        this._progressChanged = options.onProgressChanged || _common.noop;
        this._dataSource = new _data_source.DataSource(options);
        this._dataSource.paginate(false);
      },
      getFields: function getFields(fields) {
        var that = this;
        var dataSource = that._dataSource;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        loadDataSource(dataSource, getFieldSelectors(fields)).done(function (data) {
          d.resolve((0, _module_widget_utils.discoverObjectFields)(data, fields));
        }).fail(d.reject);
        return d;
      },
      key: function key() {
        return this._dataSource.key();
      },
      load: function load(options) {
        var that = this;
        var dataSource = that._dataSource;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        prepareLoadOption(options);
        loadDataSource(dataSource, getFieldSelectors(options), options.reload).done(function (data) {
          (0, _deferred.when)(loadCore(data, options, that._progressChanged)).done(d.resolve);
        }).fail(d.reject);
        return d;
      },
      filter: function filter() {
        var dataSource = this._dataSource;
        return dataSource.filter.apply(dataSource, arguments);
      },
      supportPaging: function supportPaging() {
        return false;
      },
      getDrillDownItems: function getDrillDownItems(loadOptions, params) {
        loadOptions = loadOptions || {};
        params = params || {};
        prepareLoadOption(loadOptions);
        var drillDownItems = [];
        var items = this._dataSource.items();
        var item;
        var _params = params,
            maxRowCount = _params.maxRowCount;
        var _params2 = params,
            customColumns = _params2.customColumns;
        var filter = createFilter(loadOptions);
        var pathFilter = createFilter({
          rows: (0, _module_widget_utils.getFiltersByPath)(loadOptions.rows, params.rowPath),
          columns: (0, _module_widget_utils.getFiltersByPath)(loadOptions.columns, params.columnPath),
          filters: []
        });
        for (var i = 0; i < items.length; i += 1) {
          if (pathFilter(items[i]) && filter(items[i])) {
            if (customColumns) {
              item = {};
              for (var j = 0; j < customColumns.length; j += 1) {
                item[customColumns[j]] = items[i][customColumns[j]];
              }
            } else {
              item = items[i];
            }
            drillDownItems.push(item);
          }
          if (maxRowCount > 0 && drillDownItems.length === maxRowCount) {
            break;
          }
        }
        return drillDownItems;
      }
    };
  }()).include(_module_widget_utils.storeDrillDownMixin);
  exports.LocalStore = LocalStore;
  var _default = {
    LocalStore: LocalStore
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/deferred","../../../../data/utils","../../../../data/query","../../../../core/utils/date_serialization","../../../../data/data_source/data_source","../../../../data/custom_store","../../../../core/utils/data","../../../../core/class","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/iterator","../../../../data/array_store","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/deferred"), require("../../../../data/utils"), require("../../../../data/query"), require("../../../../core/utils/date_serialization"), require("../../../../data/data_source/data_source"), require("../../../../data/custom_store"), require("../../../../core/utils/data"), require("../../../../core/class"), require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/iterator"), require("../../../../data/array_store"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map