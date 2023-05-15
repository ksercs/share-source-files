!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.header_filter.js"], ["../../events/core/events_engine","./ui.grid_core.modules","../shared/filtering","./ui.grid_core.utils","./ui.grid_core.header_filter_core","../../localization/message","../../events/click","../../core/utils/data","../../core/utils/iterator","../../core/utils/type","../../core/utils/position","../../core/utils/extend","../../data/data_source/utils","../../localization/date","../../core/utils/deferred","../shared/accessibility","../../data/query","../../data/store_helper"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/grid_core/ui.grid_core.header_filter.js", ["../../events/core/events_engine", "./ui.grid_core.modules", "../shared/filtering", "./ui.grid_core.utils", "./ui.grid_core.header_filter_core", "../../localization/message", "../../events/click", "../../core/utils/data", "../../core/utils/iterator", "../../core/utils/type", "../../core/utils/position", "../../core/utils/extend", "../../data/data_source/utils", "../../localization/date", "../../core/utils/deferred", "../shared/accessibility", "../../data/query", "../../data/store_helper"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.headerFilterModule = void 0;
  exports.invertFilterExpression = invertFilterExpression;
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _uiGrid_core = _interopRequireDefault($__require("./ui.grid_core.modules"));
  var _filtering = _interopRequireDefault($__require("../shared/filtering"));
  var _uiGrid_core2 = _interopRequireDefault($__require("./ui.grid_core.utils"));
  var _uiGrid_core3 = $__require("./ui.grid_core.header_filter_core");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _click = $__require("../../events/click");
  var _data = $__require("../../core/utils/data");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _position = $__require("../../core/utils/position");
  var _extend = $__require("../../core/utils/extend");
  var _utils = $__require("../../data/data_source/utils");
  var _date = _interopRequireDefault($__require("../../localization/date"));
  var _deferred = $__require("../../core/utils/deferred");
  var _accessibility = $__require("../shared/accessibility");
  var _query = _interopRequireDefault($__require("../../data/query"));
  var _store_helper = _interopRequireDefault($__require("../../data/store_helper"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var DATE_INTERVAL_FORMATS = {
    'month': function month(value) {
      return _date.default.getMonthNames()[value - 1];
    },
    'quarter': function quarter(value) {
      return _date.default.format(new Date(2000, value * 3 - 1), 'quarter');
    }
  };
  function ungroupUTCDates(items, dateParts, dates) {
    dateParts = dateParts || [];
    dates = dates || [];
    items.forEach(function (item) {
      if ((0, _type.isDefined)(item.key)) {
        var isMonthPart = dateParts.length === 1;
        dateParts.push(isMonthPart ? item.key - 1 : item.key);
        if (item.items) {
          ungroupUTCDates(item.items, dateParts, dates);
        } else {
          var date = new Date(Date.UTC.apply(Date, dateParts));
          dates.push(date);
        }
        dateParts.pop();
      } else {
        dates.push(null);
      }
    });
    return dates;
  }
  function convertDataFromUTCToLocal(data, column) {
    var dates = ungroupUTCDates(data);
    var query = (0, _query.default)(dates);
    var group = _uiGrid_core2.default.getHeaderFilterGroupParameters(_extends({}, column, {
      calculateCellValue: function calculateCellValue(date) {
        return date;
      }
    }));
    return _store_helper.default.queryByOptions(query, {
      group: group
    }).toArray();
  }
  function isUTCFormat(format) {
    return (format === null || format === void 0 ? void 0 : format.slice(-1)) === 'Z' || (format === null || format === void 0 ? void 0 : format.slice(-3)) === '\'Z\'';
  }
  var HeaderFilterController = _uiGrid_core.default.ViewController.inherit(function () {
    var getFormatOptions = function getFormatOptions(value, column, currentLevel) {
      var groupInterval = _filtering.default.getGroupInterval(column);
      var result = _uiGrid_core2.default.getFormatOptionsByColumn(column, 'headerFilter');
      if (groupInterval) {
        result.groupInterval = groupInterval[currentLevel];
        if (_uiGrid_core2.default.isDateType(column.dataType)) {
          result.format = DATE_INTERVAL_FORMATS[groupInterval[currentLevel]];
        } else if (column.dataType === 'number') {
          result.getDisplayFormat = function () {
            var formatOptions = {
              format: column.format,
              target: 'headerFilter'
            };
            var firstValueText = _uiGrid_core2.default.formatValue(value, formatOptions);
            var secondValue = value + groupInterval[currentLevel];
            var secondValueText = _uiGrid_core2.default.formatValue(secondValue, formatOptions);
            return firstValueText && secondValueText ? firstValueText + ' - ' + secondValueText : '';
          };
        }
      }
      return result;
    };
    return {
      init: function init() {
        this._columnsController = this.getController('columns');
        this._dataController = this.getController('data');
        this._headerFilterView = this.getView('headerFilterView');
      },
      _updateSelectedState: function _updateSelectedState(items, column) {
        var i = items.length;
        var isExclude = column.filterType === 'exclude';
        while (i--) {
          var item = items[i];
          if ('items' in items[i]) {
            this._updateSelectedState(items[i].items, column);
          }
          (0, _uiGrid_core3.updateHeaderFilterItemSelectionState)(item, _uiGrid_core2.default.getIndexByKey(items[i].value, column.filterValues, null) > -1, isExclude);
        }
      },
      _normalizeGroupItem: function _normalizeGroupItem(item, currentLevel, options) {
        var value;
        var displayValue;
        var path = options.path;
        var valueSelector = options.valueSelector;
        var displaySelector = options.displaySelector;
        var column = options.column;
        if (valueSelector && displaySelector) {
          value = valueSelector(item);
          displayValue = displaySelector(item);
        } else {
          value = item.key;
          displayValue = value;
        }
        if (!(0, _type.isObject)(item)) {
          item = {};
        } else {
          item = (0, _extend.extend)({}, item);
        }
        path.push(value);
        if (path.length === 1) {
          item.value = path[0];
        } else {
          item.value = path.join('/');
        }
        item.text = this.getHeaderItemText(displayValue, column, currentLevel, options.headerFilterOptions);
        return item;
      },
      getHeaderItemText: function getHeaderItemText(displayValue, column, currentLevel, headerFilterOptions) {
        var text = _uiGrid_core2.default.formatValue(displayValue, getFormatOptions(displayValue, column, currentLevel));
        if (!text) {
          text = headerFilterOptions.texts.emptyValue;
        }
        return text;
      },
      _processGroupItems: function _processGroupItems(groupItems, currentLevel, path, options) {
        var that = this;
        var displaySelector;
        var valueSelector;
        var column = options.column;
        var lookup = column.lookup;
        var level = options.level;
        path = path || [];
        currentLevel = currentLevel || 0;
        if (lookup) {
          displaySelector = (0, _data.compileGetter)(lookup.displayExpr);
          valueSelector = (0, _data.compileGetter)(lookup.valueExpr);
        }
        for (var i = 0; i < groupItems.length; i++) {
          groupItems[i] = that._normalizeGroupItem(groupItems[i], currentLevel, {
            column: options.column,
            headerFilterOptions: options.headerFilterOptions,
            displaySelector: displaySelector,
            valueSelector: valueSelector,
            path: path
          });
          if ('items' in groupItems[i]) {
            if (currentLevel === level || !(0, _type.isDefined)(groupItems[i].value)) {
              delete groupItems[i].items;
            } else {
              that._processGroupItems(groupItems[i].items, currentLevel + 1, path, options);
            }
          }
          path.pop();
        }
      },
      getDataSource: function getDataSource(column) {
        var _column$headerFilter;
        var dataSource = this._dataController.dataSource();
        var remoteGrouping = dataSource === null || dataSource === void 0 ? void 0 : dataSource.remoteOperations().grouping;
        var group = _uiGrid_core2.default.getHeaderFilterGroupParameters(column, remoteGrouping);
        var headerFilterDataSource = (_column$headerFilter = column.headerFilter) === null || _column$headerFilter === void 0 ? void 0 : _column$headerFilter.dataSource;
        var headerFilterOptions = this.option('headerFilter');
        var isLookup = false;
        var options = {
          component: this.component
        };
        if (!dataSource) return;
        if ((0, _type.isDefined)(headerFilterDataSource) && !(0, _type.isFunction)(headerFilterDataSource)) {
          options.dataSource = (0, _utils.normalizeDataSourceOptions)(headerFilterDataSource);
        } else if (column.lookup) {
          isLookup = true;
          if (this.option('syncLookupFilterValues')) {
            this._currentColumn = column;
            var filter = this._dataController.getCombinedFilter();
            this._currentColumn = null;
            options.dataSource = _uiGrid_core2.default.getWrappedLookupDataSource(column, dataSource, filter);
          } else {
            options.dataSource = _uiGrid_core2.default.normalizeLookupDataSource(column.lookup);
          }
        } else {
          var cutoffLevel = Array.isArray(group) ? group.length - 1 : 0;
          this._currentColumn = column;
          var _filter = this._dataController.getCombinedFilter();
          this._currentColumn = null;
          options.dataSource = {
            filter: _filter,
            group: group,
            useDefaultSearch: true,
            load: function load(options) {
              var d = new _deferred.Deferred();
              // TODO remove in 16.1
              options.dataField = column.dataField || column.name;
              dataSource.load(options).done(function (data) {
                var convertUTCDates = remoteGrouping && isUTCFormat(column.serializationFormat) && cutoffLevel > 3;
                if (convertUTCDates) {
                  data = convertDataFromUTCToLocal(data, column);
                }
                that._processGroupItems(data, null, null, {
                  level: cutoffLevel,
                  column: column,
                  headerFilterOptions: headerFilterOptions
                });
                d.resolve(data);
              }).fail(d.reject);
              return d;
            }
          };
        }
        if ((0, _type.isFunction)(headerFilterDataSource)) {
          headerFilterDataSource.call(column, options);
        }
        var origPostProcess = options.dataSource.postProcess;
        var that = this;
        options.dataSource.postProcess = function (data) {
          var items = data;
          if (isLookup) {
            items = items.filter(function (item) {
              return item[column.lookup.valueExpr] !== null;
            });
            if (this.pageIndex() === 0 && !this.searchValue()) {
              items = items.slice(0);
              items.unshift(null);
            }
            that._processGroupItems(items, null, null, {
              level: 0,
              column: column,
              headerFilterOptions: headerFilterOptions
            });
          }
          items = origPostProcess && origPostProcess.call(this, items) || items;
          that._updateSelectedState(items, column);
          return items;
        };
        return options.dataSource;
      },
      getCurrentColumn: function getCurrentColumn() {
        return this._currentColumn;
      },
      showHeaderFilterMenu: function showHeaderFilterMenu(columnIndex, isGroupPanel) {
        var columnsController = this._columnsController;
        var column = (0, _extend.extend)(true, {}, this._columnsController.getColumns()[columnIndex]);
        if (column) {
          var visibleIndex = columnsController.getVisibleIndex(columnIndex);
          var view = isGroupPanel ? this.getView('headerPanel') : this.getView('columnHeadersView');
          var $columnElement = $columnElement || view.getColumnElements().eq(isGroupPanel ? column.groupIndex : visibleIndex);
          this.showHeaderFilterMenuBase({
            columnElement: $columnElement,
            column: column,
            applyFilter: true,
            apply: function apply() {
              columnsController.columnOption(columnIndex, {
                filterValues: this.filterValues,
                filterType: this.filterType
              });
            }
          });
        }
      },
      showHeaderFilterMenuBase: function showHeaderFilterMenuBase(options) {
        var _this = this;
        var that = this;
        var column = options.column;
        if (column) {
          var groupInterval = _filtering.default.getGroupInterval(column);
          var dataSource = that._dataController.dataSource();
          var remoteFiltering = dataSource && dataSource.remoteOperations().filtering;
          (0, _extend.extend)(options, column, {
            type: groupInterval && groupInterval.length > 1 ? 'tree' : 'list',
            remoteFiltering: remoteFiltering,
            onShowing: function onShowing(e) {
              var dxResizableInstance = e.component.$overlayContent().dxResizable('instance');
              dxResizableInstance && dxResizableInstance.option('onResizeEnd', function (e) {
                var columnsController = that.getController('columns');
                var headerFilterByColumn = columnsController.columnOption(options.dataField, 'headerFilter');
                headerFilterByColumn = headerFilterByColumn || {};
                headerFilterByColumn.width = e.width;
                headerFilterByColumn.height = e.height;
                columnsController.columnOption(options.dataField, 'headerFilter', headerFilterByColumn, true);
              });
            },
            onHidden: function onHidden() {
              return (0, _accessibility.restoreFocus)(_this);
            }
          });
          options.dataSource = that.getDataSource(options);
          if (options.isFilterBuilder) {
            options.dataSource.filter = null;
            options.alignment = 'right';
          }
          that._headerFilterView.showHeaderFilterMenu(options.columnElement, options);
        }
      },
      hideHeaderFilterMenu: function hideHeaderFilterMenu() {
        this._headerFilterView.hideHeaderFilterMenu();
      }
    };
  }());
  var ColumnHeadersViewHeaderFilterExtender = (0, _extend.extend)({}, _uiGrid_core3.headerFilterMixin, {
    _renderCellContent: function _renderCellContent($cell, options) {
      var that = this;
      var $headerFilterIndicator;
      var column = options.column;
      if (!column.command && (0, _uiGrid_core3.allowHeaderFiltering)(column) && that.option('headerFilter.visible') && options.rowType === 'header') {
        $headerFilterIndicator = that._applyColumnState({
          name: 'headerFilter',
          rootElement: $cell,
          column: column,
          showColumnLines: that.option('showColumnLines')
        });
        $headerFilterIndicator && that._subscribeToIndicatorEvent($headerFilterIndicator, column, 'headerFilter');
      }
      this.callBase.apply(this, arguments);
    },
    _subscribeToIndicatorEvent: function _subscribeToIndicatorEvent($indicator, column, indicatorName) {
      var _this2 = this;
      if (indicatorName === 'headerFilter') {
        _events_engine.default.on($indicator, _click.name, this.createAction(function (e) {
          e.event.stopPropagation();
          (0, _accessibility.saveFocusedElementInfo)($indicator, _this2);
          _this2.getController('headerFilter').showHeaderFilterMenu(column.index, false);
        }));
      }
    },
    _updateIndicator: function _updateIndicator($cell, column, indicatorName) {
      var $indicator = this.callBase($cell, column, indicatorName);
      $indicator && this._subscribeToIndicatorEvent($indicator, column, indicatorName);
    },
    _updateHeaderFilterIndicators: function _updateHeaderFilterIndicators() {
      if (this.option('headerFilter.visible')) {
        this._updateIndicators('headerFilter');
      }
    },
    _needUpdateFilterIndicators: function _needUpdateFilterIndicators() {
      return true;
    },
    _columnOptionChanged: function _columnOptionChanged(e) {
      var optionNames = e.optionNames;
      if (_uiGrid_core2.default.checkChanges(optionNames, ['filterValues', 'filterType'])) {
        if (this._needUpdateFilterIndicators()) {
          this._updateHeaderFilterIndicators();
        }
        return;
      }
      this.callBase(e);
    }
  });
  var HeaderPanelHeaderFilterExtender = (0, _extend.extend)({}, _uiGrid_core3.headerFilterMixin, {
    _createGroupPanelItem: function _createGroupPanelItem($rootElement, groupColumn) {
      var that = this;
      var $item = that.callBase.apply(that, arguments);
      var $headerFilterIndicator;
      if (!groupColumn.command && (0, _uiGrid_core3.allowHeaderFiltering)(groupColumn) && that.option('headerFilter.visible')) {
        $headerFilterIndicator = that._applyColumnState({
          name: 'headerFilter',
          rootElement: $item,
          column: {
            alignment: (0, _position.getDefaultAlignment)(that.option('rtlEnabled')),
            filterValues: groupColumn.filterValues,
            allowHeaderFiltering: true
          },
          showColumnLines: true
        });
        $headerFilterIndicator && _events_engine.default.on($headerFilterIndicator, _click.name, that.createAction(function (e) {
          var event = e.event;
          event.stopPropagation();
          that.getController('headerFilter').showHeaderFilterMenu(groupColumn.index, true);
        }));
      }
      return $item;
    }
  });
  function invertFilterExpression(filter) {
    return ['!', filter];
  }
  var DataControllerFilterRowExtender = {
    skipCalculateColumnFilters: function skipCalculateColumnFilters() {
      return false;
    },
    _calculateAdditionalFilter: function _calculateAdditionalFilter() {
      if (this.skipCalculateColumnFilters()) {
        return this.callBase();
      }
      var that = this;
      var filters = [that.callBase()];
      var columns = that._columnsController.getVisibleColumns(null, true);
      var headerFilterController = that.getController('headerFilter');
      var currentColumn = headerFilterController.getCurrentColumn();
      (0, _iterator.each)(columns, function (_, column) {
        var filter;
        if (currentColumn && currentColumn.index === column.index) {
          return;
        }
        if ((0, _uiGrid_core3.allowHeaderFiltering)(column) && column.calculateFilterExpression && Array.isArray(column.filterValues) && column.filterValues.length) {
          var filterValues = [];
          (0, _iterator.each)(column.filterValues, function (_, filterValue) {
            if (Array.isArray(filterValue)) {
              filter = filterValue;
            } else {
              if (column.deserializeValue && !_uiGrid_core2.default.isDateType(column.dataType) && column.dataType !== 'number') {
                filterValue = column.deserializeValue(filterValue);
              }
              filter = column.createFilterExpression(filterValue, '=', 'headerFilter');
            }
            if (filter) {
              filter.columnIndex = column.index;
            }
            filterValues.push(filter);
          });
          filterValues = _uiGrid_core2.default.combineFilters(filterValues, 'or');
          filters.push(column.filterType === 'exclude' ? ['!', filterValues] : filterValues);
        }
      });
      return _uiGrid_core2.default.combineFilters(filters);
    }
  };
  var headerFilterModule = {
    defaultOptions: function defaultOptions() {
      return {
        syncLookupFilterValues: true,
        headerFilter: {
          visible: false,
          width: 252,
          height: 325,
          allowSelectAll: true,
          search: {
            enabled: false,
            timeout: 500,
            mode: 'contains',
            editorOptions: {}
          },
          texts: {
            emptyValue: _message.default.format('dxDataGrid-headerFilterEmptyValue'),
            ok: _message.default.format('dxDataGrid-headerFilterOK'),
            cancel: _message.default.format('dxDataGrid-headerFilterCancel')
          }
        }
      };
    },
    controllers: {
      headerFilter: HeaderFilterController
    },
    views: {
      headerFilterView: _uiGrid_core3.HeaderFilterView
    },
    extenders: {
      controllers: {
        data: DataControllerFilterRowExtender
      },
      views: {
        columnHeadersView: ColumnHeadersViewHeaderFilterExtender,
        headerPanel: HeaderPanelHeaderFilterExtender
      }
    }
  };
  exports.headerFilterModule = headerFilterModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../events/core/events_engine","./ui.grid_core.modules","../shared/filtering","./ui.grid_core.utils","./ui.grid_core.header_filter_core","../../localization/message","../../events/click","../../core/utils/data","../../core/utils/iterator","../../core/utils/type","../../core/utils/position","../../core/utils/extend","../../data/data_source/utils","../../localization/date","../../core/utils/deferred","../shared/accessibility","../../data/query","../../data/store_helper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../events/core/events_engine"), require("./ui.grid_core.modules"), require("../shared/filtering"), require("./ui.grid_core.utils"), require("./ui.grid_core.header_filter_core"), require("../../localization/message"), require("../../events/click"), require("../../core/utils/data"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../../core/utils/position"), require("../../core/utils/extend"), require("../../data/data_source/utils"), require("../../localization/date"), require("../../core/utils/deferred"), require("../shared/accessibility"), require("../../data/query"), require("../../data/store_helper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.grid_core.header_filter.js.map