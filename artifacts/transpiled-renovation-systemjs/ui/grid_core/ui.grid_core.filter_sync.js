!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_sync.js"], ["../../core/utils/type","./ui.grid_core.modules","../filter_builder/utils","../widget/ui.errors","./ui.grid_core.utils","../shared/filtering","./ui.grid_core.filter_custom_operations"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.filter_sync.js", ["../../core/utils/type", "./ui.grid_core.modules", "../filter_builder/utils", "../widget/ui.errors", "./ui.grid_core.utils", "../shared/filtering", "./ui.grid_core.filter_custom_operations"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.filterSyncModule = void 0;
  var _type = $__require("../../core/utils/type");
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _utils = $__require("../filter_builder/utils");
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _filtering = _interopRequireDefault($__require("../shared/filtering"));
  var _uiGrid_core3 = $__require("./ui.grid_core.filter_custom_operations");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var FILTER_ROW_OPERATIONS = ['=', '<>', '<', '<=', '>', '>=', 'notcontains', 'contains', 'startswith', 'endswith', 'between'];
  var FILTER_TYPES_INCLUDE = 'include';
  var FILTER_TYPES_EXCLUDE = 'exclude';
  function getColumnIdentifier(column) {
    return column.name || column.dataField;
  }
  function checkForErrors(columns) {
    columns.forEach(function (column) {
      var identifier = getColumnIdentifier(column);
      if (!(0, _type.isDefined)(identifier) && column.allowFiltering) throw new _ui.default.Error('E1049', column.caption);
    });
  }
  var FilterSyncController = _uiGrid_core.default.Controller.inherit(function () {
    var getEmptyFilterValues = function getEmptyFilterValues() {
      return {
        filterType: FILTER_TYPES_INCLUDE,
        filterValues: undefined
      };
    };
    var canSyncHeaderFilterWithFilterRow = function canSyncHeaderFilterWithFilterRow(column) {
      var filterValues = column.filterValues || [];
      return !_filtering.default.getGroupInterval(column) && !(column.headerFilter && column.headerFilter.dataSource) || filterValues.length === 1 && filterValues[0] === null;
    };
    var getHeaderFilterFromCondition = function getHeaderFilterFromCondition(headerFilterCondition, column) {
      if (!headerFilterCondition) {
        return getEmptyFilterValues();
      }
      var filterType;
      var selectedFilterOperation = headerFilterCondition[1];
      var value = headerFilterCondition[2];
      var hasArrayValue = Array.isArray(value);
      if (!hasArrayValue) {
        if (!canSyncHeaderFilterWithFilterRow(column)) {
          return getEmptyFilterValues();
        }
      }
      switch (selectedFilterOperation) {
        case 'anyof':
        case '=':
          filterType = FILTER_TYPES_INCLUDE;
          break;
        case 'noneof':
        case '<>':
          filterType = FILTER_TYPES_EXCLUDE;
          break;
        default:
          return getEmptyFilterValues();
      }
      return {
        filterType: filterType,
        filterValues: hasArrayValue ? value : [value]
      };
    };
    var getConditionFromFilterRow = function getConditionFromFilterRow(column) {
      var value = column.filterValue;
      if ((0, _type.isDefined)(value)) {
        var operation = column.selectedFilterOperation || column.defaultFilterOperation || (0, _utils.getDefaultOperation)(column);
        var filter = [getColumnIdentifier(column), operation, column.filterValue];
        return filter;
      } else {
        return null;
      }
    };
    var getConditionFromHeaderFilter = function getConditionFromHeaderFilter(column) {
      var selectedOperation;
      var value;
      var filterValues = column.filterValues;
      if (!filterValues) return null;
      if (filterValues.length === 1 && canSyncHeaderFilterWithFilterRow(column) && !Array.isArray(filterValues[0])) {
        column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = '<>' : selectedOperation = '=';
        value = filterValues[0];
      } else {
        column.filterType === FILTER_TYPES_EXCLUDE ? selectedOperation = 'noneof' : selectedOperation = 'anyof';
        value = filterValues;
      }
      return [getColumnIdentifier(column), selectedOperation, value];
    };
    var updateHeaderFilterCondition = function updateHeaderFilterCondition(columnsController, column, headerFilterCondition) {
      var headerFilter = getHeaderFilterFromCondition(headerFilterCondition, column);
      columnsController.columnOption(getColumnIdentifier(column), headerFilter);
    };
    var updateFilterRowCondition = function updateFilterRowCondition(columnsController, column, condition) {
      var filterRowOptions;
      var selectedFilterOperation = condition === null || condition === void 0 ? void 0 : condition[1];
      var filterValue = condition === null || condition === void 0 ? void 0 : condition[2];
      var filterOperations = column.filterOperations || column.defaultFilterOperations;
      if ((!filterOperations || filterOperations.indexOf(selectedFilterOperation) >= 0 || selectedFilterOperation === column.defaultFilterOperation) && FILTER_ROW_OPERATIONS.indexOf(selectedFilterOperation) >= 0 && filterValue !== null) {
        if (selectedFilterOperation === column.defaultFilterOperation && !(0, _type.isDefined)(column.selectedFilterOperation)) {
          selectedFilterOperation = column.selectedFilterOperation;
        }
        filterRowOptions = {
          filterValue: filterValue,
          selectedFilterOperation: selectedFilterOperation
        };
      } else {
        filterRowOptions = {
          filterValue: undefined,
          selectedFilterOperation: undefined
        };
      }
      columnsController.columnOption(getColumnIdentifier(column), filterRowOptions);
    };
    return {
      syncFilterValue: function syncFilterValue() {
        var that = this;
        var columnsController = that.getController('columns');
        var columns = columnsController.getFilteringColumns();
        this._skipSyncColumnOptions = true;
        columns.forEach(function (column) {
          var filterConditions = (0, _utils.getMatchedConditions)(that.option('filterValue'), getColumnIdentifier(column));
          if (filterConditions.length === 1) {
            var filterCondition = filterConditions[0];
            updateHeaderFilterCondition(columnsController, column, filterCondition);
            updateFilterRowCondition(columnsController, column, filterCondition);
          } else {
            (0, _type.isDefined)(column.filterValues) && updateHeaderFilterCondition(columnsController, column);
            (0, _type.isDefined)(column.filterValue) && updateFilterRowCondition(columnsController, column);
          }
        });
        this._skipSyncColumnOptions = false;
      },
      _initSync: function _initSync() {
        var columns = this.getController('columns').getColumns();
        var dataController = this.getController('data');
        var pageIndex = dataController.pageIndex();
        checkForErrors(columns);
        if (!this.option('filterValue')) {
          var filteringColumns = this.getController('columns').getFilteringColumns();
          var filterValue = this.getFilterValueFromColumns(filteringColumns);
          this.option('filterValue', filterValue);
        }
        this.syncFilterValue();
        dataController.pageIndex(pageIndex);
      },
      init: function init() {
        var _this = this;
        var dataController = this.getController('data');
        if (dataController.isFilterSyncActive()) {
          if (this.getController('columns').isAllDataTypesDefined()) {
            this._initSync();
          } else {
            dataController.dataSourceChanged.add(function () {
              return _this._initSync();
            });
          }
        }
      },
      _getSyncFilterRow: function _getSyncFilterRow(filterValue, column) {
        var filter = getConditionFromFilterRow(column);
        if ((0, _type.isDefined)(filter)) {
          return (0, _utils.syncFilters)(filterValue, filter);
        } else {
          return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column));
        }
      },
      _getSyncHeaderFilter: function _getSyncHeaderFilter(filterValue, column) {
        var filter = getConditionFromHeaderFilter(column);
        if (filter) {
          return (0, _utils.syncFilters)(filterValue, filter);
        } else {
          return (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(column));
        }
      },
      getFilterValueFromColumns: function getFilterValueFromColumns(columns) {
        if (!this.getController('data').isFilterSyncActive()) {
          return null;
        }
        var filterValue = ['and'];
        columns && columns.forEach(function (column) {
          var headerFilter = getConditionFromHeaderFilter(column);
          var filterRow = getConditionFromFilterRow(column);
          headerFilter && (0, _utils.addItem)(headerFilter, filterValue);
          filterRow && (0, _utils.addItem)(filterRow, filterValue);
        });
        return (0, _utils.getNormalizedFilter)(filterValue);
      },
      syncFilterRow: function syncFilterRow(column, value) {
        this.option('filterValue', this._getSyncFilterRow(this.option('filterValue'), column));
      },
      syncHeaderFilter: function syncHeaderFilter(column) {
        this.option('filterValue', this._getSyncHeaderFilter(this.option('filterValue'), column));
      },
      getCustomFilterOperations: function getCustomFilterOperations() {
        var filterBuilderCustomOperations = this.option('filterBuilder.customOperations') || [];
        return [(0, _uiGrid_core3.anyOf)(this.component), (0, _uiGrid_core3.noneOf)(this.component)].concat(filterBuilderCustomOperations);
      },
      publicMethods: function publicMethods() {
        return ['getCustomFilterOperations'];
      }
    };
  }());
  var DataControllerFilterSyncExtender = {
    isFilterSyncActive: function isFilterSyncActive() {
      var filterSyncEnabledValue = this.option('filterSyncEnabled');
      return filterSyncEnabledValue === 'auto' ? this.option('filterPanel.visible') : filterSyncEnabledValue;
    },
    skipCalculateColumnFilters: function skipCalculateColumnFilters() {
      var filterSyncController = this.getController('filterSync');
      return ((0, _type.isDefined)(this.option('filterValue')) || filterSyncController._skipSyncColumnOptions) && this.isFilterSyncActive();
    },
    _calculateAdditionalFilter: function _calculateAdditionalFilter() {
      var that = this;
      if (that.option('filterPanel.filterEnabled') === false) {
        return that.callBase();
      }
      var filters = [that.callBase()];
      var columns = that.getController('columns').getFilteringColumns();
      var filterValue = that.option('filterValue');
      if (that.isFilterSyncActive()) {
        var currentColumn = that.getController('headerFilter').getCurrentColumn();
        if (currentColumn && filterValue) {
          filterValue = (0, _utils.removeFieldConditionsFromFilter)(filterValue, getColumnIdentifier(currentColumn));
        }
      }
      var customOperations = that.getController('filterSync').getCustomFilterOperations();
      var calculatedFilterValue = (0, _utils.getFilterExpression)(filterValue, columns, customOperations, 'filterBuilder');
      if (calculatedFilterValue) {
        filters.push(calculatedFilterValue);
      }
      return _uiGrid_core2.default.combineFilters(filters);
    },
    _parseColumnPropertyName: function _parseColumnPropertyName(fullName) {
      var matched = fullName.match(/.*\.(.*)/);
      if (matched) {
        return matched[1];
      } else {
        return null;
      }
    },
    clearFilter: function clearFilter(filterName) {
      this.component.beginUpdate();
      if (arguments.length > 0) {
        if (filterName === 'filterValue') {
          this.option('filterValue', null);
        }
        this.callBase(filterName);
      } else {
        this.option('filterValue', null);
        this.callBase();
      }
      this.component.endUpdate();
    },
    optionChanged: function optionChanged(args) {
      switch (args.name) {
        case 'filterValue':
          this._applyFilter();
          this.isFilterSyncActive() && this.getController('filterSync').syncFilterValue();
          args.handled = true;
          break;
        case 'filterSyncEnabled':
          args.handled = true;
          break;
        case 'columns':
          if (this.isFilterSyncActive()) {
            var column = this.getController('columns').getColumnByPath(args.fullName);
            var filterSyncController = this.getController('filterSync');
            if (column && !filterSyncController._skipSyncColumnOptions) {
              var propertyName = this._parseColumnPropertyName(args.fullName);
              filterSyncController._skipSyncColumnOptions = true;
              if ('filterType' === propertyName) {
                if (FILTER_TYPES_EXCLUDE === args.value || FILTER_TYPES_EXCLUDE === args.previousValue) {
                  filterSyncController.syncHeaderFilter(column);
                }
              } else if ('filterValues' === propertyName) {
                filterSyncController.syncHeaderFilter(column);
              } else if (['filterValue', 'selectedFilterOperation'].indexOf(propertyName) > -1) {
                filterSyncController.syncFilterRow(column, column.filterValue);
              }
              filterSyncController._skipSyncColumnOptions = false;
            }
          }
          this.callBase(args);
          break;
        default:
          this.callBase(args);
      }
    }
  };
  var ColumnHeadersViewFilterSyncExtender = {
    _isHeaderFilterEmpty: function _isHeaderFilterEmpty(column) {
      if (this.getController('data').isFilterSyncActive()) {
        return !(0, _utils.filterHasField)(this.option('filterValue'), getColumnIdentifier(column));
      }
      return this.callBase(column);
    },
    _needUpdateFilterIndicators: function _needUpdateFilterIndicators() {
      return !this.getController('data').isFilterSyncActive();
    },
    optionChanged: function optionChanged(args) {
      if (args.name === 'filterValue') {
        this._updateHeaderFilterIndicators();
      } else {
        this.callBase(args);
      }
    }
  };
  var filterSyncModule = {
    defaultOptions: function defaultOptions() {
      return {
        filterValue: null,
        filterSyncEnabled: 'auto'
      };
    },
    controllers: {
      filterSync: FilterSyncController
    },
    extenders: {
      controllers: {
        data: DataControllerFilterSyncExtender
      },
      views: {
        columnHeadersView: ColumnHeadersViewFilterSyncExtender
      }
    }
  };
  exports.filterSyncModule = filterSyncModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/type","./ui.grid_core.modules","../filter_builder/utils","../widget/ui.errors","./ui.grid_core.utils","../shared/filtering","./ui.grid_core.filter_custom_operations"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/type"), require("./ui.grid_core.modules"), require("../filter_builder/utils"), require("../widget/ui.errors"), require("./ui.grid_core.utils"), require("../shared/filtering"), require("./ui.grid_core.filter_custom_operations"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.filter_sync.js.map