!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/data_source/module.js"], ["../../../../data/data_source/utils","../../../../data/abstract_store","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/array","../../../../core/utils/iterator","../../../../core/utils/deferred","../../../../core/class","../../../../core/events_strategy","../../../../core/utils/inflector","../local_store/module","../remote_store/module","./module_utils","../xmla_store/module","../summary_display_modes/module","../module_widget_utils"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/data_source/module.js", ["../../../../data/data_source/utils", "../../../../data/abstract_store", "../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/array", "../../../../core/utils/iterator", "../../../../core/utils/deferred", "../../../../core/class", "../../../../core/events_strategy", "../../../../core/utils/inflector", "../local_store/module", "../remote_store/module", "./module_utils", "../xmla_store/module", "../summary_display_modes/module", "../module_widget_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.PivotGridDataSource = void 0;
  var _utils = $__require("../../../../data/data_source/utils");
  var _abstract_store = _interopRequireDefault($__require("../../../../data/abstract_store"));
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _array = $__require("../../../../core/utils/array");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _events_strategy = $__require("../../../../core/events_strategy");
  var _inflector = $__require("../../../../core/utils/inflector");
  var _module = $__require("../local_store/module");
  var _module2 = $__require("../remote_store/module");
  var _module_utils = $__require("./module_utils");
  var _module3 = _interopRequireDefault($__require("../xmla_store/module"));
  var _module4 = _interopRequireDefault($__require("../summary_display_modes/module"));
  var _module_widget_utils = $__require("../module_widget_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  var DESCRIPTION_NAME_BY_AREA = {
    row: 'rows',
    column: 'columns',
    data: 'values',
    filter: 'filters'
  };
  var STATE_PROPERTIES = ['area', 'areaIndex', 'sortOrder', 'filterType', 'filterValues', 'sortBy', 'sortBySummaryField', 'sortBySummaryPath', 'expanded', 'summaryType', 'summaryDisplayMode'];
  var CALCULATED_PROPERTIES = ['format', 'selector', 'customizeText', 'caption'];
  var ALL_CALCULATED_PROPERTIES = CALCULATED_PROPERTIES.concat(['allowSorting', 'allowSortingBySummary', 'allowFiltering', 'allowExpandAll']);
  function createCaption(field) {
    var caption = field.dataField || field.groupName || '';
    var summaryType = (field.summaryType || '').toLowerCase();
    if ((0, _type.isString)(field.groupInterval)) {
      caption += "_".concat(field.groupInterval);
    }
    if (summaryType && summaryType !== 'custom') {
      summaryType = summaryType.replace(/^./, summaryType[0].toUpperCase());
      if (caption.length) {
        summaryType = " (".concat(summaryType, ")");
      }
    } else {
      summaryType = '';
    }
    return (0, _inflector.titleize)(caption) + summaryType;
  }
  function resetFieldState(field, properties) {
    var initialProperties = field._initProperties || {};
    (0, _iterator.each)(properties, function (_, prop) {
      if (Object.prototype.hasOwnProperty.call(initialProperties, prop)) {
        field[prop] = initialProperties[prop];
      }
    });
  }
  function updateCalculatedFieldProperties(field, calculatedProperties) {
    resetFieldState(field, calculatedProperties);
    if (!(0, _type.isDefined)(field.caption)) {
      (0, _module_widget_utils.setFieldProperty)(field, 'caption', createCaption(field));
    }
  }
  function areExpressionsUsed(dataFields) {
    return dataFields.some(function (field) {
      return field.summaryDisplayMode || field.calculateSummaryValue;
    });
  }
  function isRunningTotalUsed(dataFields) {
    return dataFields.some(function (field) {
      return !!field.runningTotal;
    });
  }
  function isDataExists(data) {
    return data.rows.length || data.columns.length || data.values.length;
  }
  var PivotGridDataSource = _class.default.inherit(function () {
    var findHeaderItem = function findHeaderItem(headerItems, path) {
      if (headerItems._cacheByPath) {
        return headerItems._cacheByPath[path.join('.')] || null;
      }
      return undefined;
    };
    var getHeaderItemsLastIndex = function getHeaderItemsLastIndex(headerItems, grandTotalIndex) {
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
          } else if (headerItem.collapsedChildren) {
            // B232736
            lastIndex = Math.max(lastIndex, getHeaderItemsLastIndex(headerItem.collapsedChildren));
          }
        }
      }
      if ((0, _type.isDefined)(grandTotalIndex)) {
        lastIndex = Math.max(lastIndex, grandTotalIndex);
      }
      return lastIndex;
    };
    var updateHeaderItemChildren = function updateHeaderItemChildren(headerItems, headerItem, children, grandTotalIndex) {
      var applyingHeaderItemsCount = getHeaderItemsLastIndex(children) + 1;
      var emptyIndex = getHeaderItemsLastIndex(headerItems, grandTotalIndex) + 1;
      var index;
      var applyingItemIndexesToCurrent = [];
      var needIndexUpdate = false;
      // @ts-expect-error
      var d = new _deferred.Deferred();
      if (headerItem.children && headerItem.children.length === children.length) {
        for (var i = 0; i < children.length; i += 1) {
          var child = children[i];
          if (child.index !== undefined) {
            if (headerItem.children[i].index === undefined) {
              // eslint-disable-next-line no-plusplus
              child.index = applyingItemIndexesToCurrent[child.index] = emptyIndex++;
              headerItem.children[i] = child;
            } else {
              applyingItemIndexesToCurrent[child.index] = headerItem.children[i].index;
            }
          }
        }
      } else {
        needIndexUpdate = true;
        for (index = 0; index < applyingHeaderItemsCount; index += 1) {
          // eslint-disable-next-line no-plusplus
          applyingItemIndexesToCurrent[index] = emptyIndex++;
        }
        headerItem.children = children;
      }
      (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(headerItem.children, function (items) {
        if (needIndexUpdate) {
          items[0].index = applyingItemIndexesToCurrent[items[0].index];
        }
      })).done(function () {
        d.resolve(applyingItemIndexesToCurrent);
      });
      return d;
    };
    var updateHeaderItems = function updateHeaderItems(headerItems, newHeaderItems, grandTotalIndex) {
      // @ts-expect-errors
      var d = new _deferred.Deferred();
      var emptyIndex = grandTotalIndex >= 0 && getHeaderItemsLastIndex(headerItems, grandTotalIndex) + 1;
      var applyingItemIndexesToCurrent = [];
      // reset cache
      (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(headerItems, function (items) {
        delete items[0].collapsedChildren;
      })).done(function () {
        (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(newHeaderItems, function (newItems, index) {
          var newItem = newItems[0];
          if (newItem.index >= 0) {
            var headerItem = findHeaderItem(headerItems, (0, _module_widget_utils.createPath)(newItems));
            if (headerItem && headerItem.index >= 0) {
              applyingItemIndexesToCurrent[newItem.index] = headerItem.index;
            } else if (emptyIndex) {
              var path = (0, _module_widget_utils.createPath)(newItems.slice(1));
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
    var updateDataSourceCells = function updateDataSourceCells(dataSource, newDataSourceCells, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
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
          if (!(0, _type.isDefined)(rowIndex)) {
            rowIndex = dataSource.grandTotalRowIndex;
          }
          if (newRowCells && (0, _type.isDefined)(rowIndex)) {
            if (!dataSourceCells[rowIndex]) {
              dataSourceCells[rowIndex] = [];
            }
            // eslint-disable-next-line eqeqeq
            for (newColumnIndex = 0; newColumnIndex < newRowCells.length; newColumnIndex += 1) {
              newCell = newRowCells[newColumnIndex];
              columnIndex = newColumnItemIndexesToCurrent[newColumnIndex];
              if (!(0, _type.isDefined)(columnIndex)) {
                columnIndex = dataSource.grandTotalColumnIndex;
              }
              if ((0, _type.isDefined)(newCell) && (0, _type.isDefined)(columnIndex)) {
                dataSourceCells[rowIndex][columnIndex] = newCell;
              }
            }
          }
        }
      }
    };
    function createLocalOrRemoteStore(dataSourceOptions, notifyProgress) {
      var StoreConstructor = dataSourceOptions.remoteOperations || dataSourceOptions.paginate ? _module2.RemoteStore : _module.LocalStore;
      return new StoreConstructor((0, _extend.extend)((0, _utils.normalizeDataSourceOptions)(dataSourceOptions), {
        onChanged: null,
        onLoadingChanged: null,
        onProgressChanged: notifyProgress
      }));
    }
    function createStore(dataSourceOptions, notifyProgress) {
      var store;
      var storeOptions;
      if ((0, _type.isPlainObject)(dataSourceOptions) && dataSourceOptions.load) {
        store = createLocalOrRemoteStore(dataSourceOptions, notifyProgress);
      } else {
        // TODO remove
        if (dataSourceOptions && !dataSourceOptions.store) {
          dataSourceOptions = {
            store: dataSourceOptions
          };
        }
        storeOptions = dataSourceOptions.store;
        if (storeOptions.type === 'xmla') {
          store = new _module3.default.XmlaStore(storeOptions);
        } else if ((0, _type.isPlainObject)(storeOptions) && storeOptions.type || storeOptions instanceof _abstract_store.default || Array.isArray(storeOptions)) {
          store = createLocalOrRemoteStore(dataSourceOptions, notifyProgress);
        } else if (storeOptions instanceof _class.default) {
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
      var fields = loadOptions && loadOptions[dimensionName] || [];
      var prevFields = prevLoadOptions && prevLoadOptions[dimensionName] || [];
      (0, _module_widget_utils.foreachTree)(dataSource[dimensionName], function (items) {
        var item = items[0];
        var path = (0, _module_widget_utils.createPath)(items);
        if (item.children && fields[path.length - 1] && !fields[path.length - 1].expanded) {
          if (path.length < fields.length && (!prevLoadOptions || equalFields(fields, prevFields, path.length))) {
            result.push(path.slice());
          }
        }
      }, true);
      return result;
    }
    function setFieldProperties(field, srcField, skipInitPropertySave, properties) {
      if (srcField) {
        (0, _iterator.each)(properties, function (_, name) {
          if (skipInitPropertySave) {
            field[name] = srcField[name];
          } else {
            if ((name === 'summaryType' || name === 'summaryDisplayMode') && srcField[name] === undefined) {
              // T399271
              return;
            }
            (0, _module_widget_utils.setFieldProperty)(field, name, srcField[name]);
          }
        });
      } else {
        resetFieldState(field, properties);
      }
      return field;
    }
    function getFieldsState(fields, properties) {
      var result = [];
      (0, _iterator.each)(fields, function (_, field) {
        result.push(setFieldProperties({
          dataField: field.dataField,
          name: field.name
        }, field, true, properties));
      });
      return result;
    }
    function getFieldStateId(field) {
      if (field.name) {
        return field.name;
      }
      return "".concat(field.dataField);
    }
    function getFieldsById(fields, id) {
      var result = [];
      (0, _iterator.each)(fields || [], function (_, field) {
        if (getFieldStateId(field) === id) {
          result.push(field);
        }
      });
      return result;
    }
    function setFieldsStateCore(stateFields, fields) {
      stateFields = stateFields || [];
      (0, _iterator.each)(fields, function (index, field) {
        setFieldProperties(field, stateFields[index], false, STATE_PROPERTIES);
        updateCalculatedFieldProperties(field, CALCULATED_PROPERTIES);
      });
      return fields;
    }
    function setFieldsState(stateFields, fields) {
      stateFields = stateFields || [];
      var fieldsById = {};
      var id;
      (0, _iterator.each)(fields, function (_, field) {
        id = getFieldStateId(field);
        if (!fieldsById[id]) {
          fieldsById[id] = getFieldsById(fields, getFieldStateId(field));
        }
      });
      (0, _iterator.each)(fieldsById, function (id, fields) {
        setFieldsStateCore(getFieldsById(stateFields, id), fields);
      });
      return fields;
    }
    function getFieldsByGroup(fields, groupingField) {
      return fields.filter(function (field) {
        return field.groupName === groupingField.groupName && (0, _type.isNumeric)(field.groupIndex) && field.visible !== false;
      }).map(function (field) {
        return (0, _extend.extend)(field, {
          areaIndex: groupingField.areaIndex,
          area: groupingField.area,
          expanded: (0, _type.isDefined)(field.expanded) ? field.expanded : groupingField.expanded,
          dataField: field.dataField || groupingField.dataField,
          dataType: field.dataType || groupingField.dataType,
          sortBy: field.sortBy || groupingField.sortBy,
          sortOrder: field.sortOrder || groupingField.sortOrder,
          sortBySummaryField: field.sortBySummaryField || groupingField.sortBySummaryField,
          sortBySummaryPath: field.sortBySummaryPath || groupingField.sortBySummaryPath,
          visible: field.visible || groupingField.visible,
          showTotals: (0, _type.isDefined)(field.showTotals) ? field.showTotals : groupingField.showTotals,
          showGrandTotals: (0, _type.isDefined)(field.showGrandTotals) ? field.showGrandTotals : groupingField.showGrandTotals
        });
      }).sort(function (a, b) {
        return a.groupIndex - b.groupIndex;
      });
    }
    function sortFieldsByAreaIndex(fields) {
      fields.sort(function (field1, field2) {
        return field1.areaIndex - field2.areaIndex || field1.groupIndex - field2.groupIndex;
      });
    }
    function isAreaField(field, area) {
      var canAddFieldInArea = area === 'data' || field.visible !== false;
      return field.area === area && !(0, _type.isDefined)(field.groupIndex) && canAddFieldInArea;
    }
    function getFieldId(field, retrieveFieldsOptionValue) {
      var groupName = field.groupName || '';
      return (field.dataField || groupName) + (field.groupInterval ? groupName + field.groupInterval : 'NOGROUP') + (retrieveFieldsOptionValue ? '' : groupName);
    }
    function mergeFields(fields, storeFields, retrieveFieldsOptionValue) {
      var result = [];
      var fieldsDictionary = {};
      var removedFields = {};
      var mergedGroups = [];
      var dataTypes = (0, _module_widget_utils.getFieldsDataType)(fields);
      if (storeFields) {
        (0, _iterator.each)(storeFields, function (_, field) {
          fieldsDictionary[getFieldId(field, retrieveFieldsOptionValue)] = field;
        });
        (0, _iterator.each)(fields, function (_, field) {
          var fieldKey = getFieldId(field, retrieveFieldsOptionValue);
          var storeField = fieldsDictionary[fieldKey] || removedFields[fieldKey];
          var mergedField;
          if (storeField) {
            if (storeField._initProperties) {
              resetFieldState(storeField, ALL_CALCULATED_PROPERTIES);
            }
            mergedField = (0, _extend.extend)({}, storeField, field, {
              _initProperties: null
            });
          } else {
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
          (0, _iterator.each)(fieldsDictionary, function (_, field) {
            result.push(field);
          });
        }
      } else {
        result = fields;
      }
      result.push.apply(result, mergedGroups);
      assignGroupIndexes(result);
      return result;
    }
    function assignGroupIndexes(fields) {
      fields.forEach(function (field) {
        if (field.groupName && field.groupInterval && field.groupIndex === undefined) {
          var maxGroupIndex = fields.filter(function (f) {
            return f.groupName === field.groupName && (0, _type.isNumeric)(f.groupIndex);
          }).map(function (f) {
            return f.groupIndex;
          }).reduce(function (prev, current) {
            return Math.max(prev, current);
          }, -1);
          field.groupIndex = maxGroupIndex + 1;
        }
      });
    }
    function getFields(that) {
      // @ts-expect-error
      var result = new _deferred.Deferred();
      var store = that._store;
      var storeFields = store && store.getFields(that._fields);
      var mergedFields;
      (0, _deferred.when)(storeFields).done(function (storeFields) {
        that._storeFields = storeFields;
        mergedFields = mergeFields(that._fields, storeFields, that._retrieveFields);
        result.resolve(mergedFields);
      }).fail(result.reject);
      return result;
    }
    function formatHeaderItems(data, loadOptions, headerName) {
      return (0, _module_widget_utils.foreachTreeAsync)(data[headerName], function (items) {
        var item = items[0];
        item.text = item.text || (0, _module_widget_utils.formatValue)(item.value, loadOptions[headerName][(0, _module_widget_utils.createPath)(items).length - 1]);
      });
    }
    function formatHeaders(loadOptions, data) {
      return (0, _deferred.when)(formatHeaderItems(data, loadOptions, 'columns'), formatHeaderItems(data, loadOptions, 'rows'));
    }
    function updateCache(headerItems) {
      // @ts-expect-error
      var d = new _deferred.Deferred();
      var cacheByPath = {};
      (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(headerItems, function (items) {
        var path = (0, _module_widget_utils.createPath)(items).join('.');
        // eslint-disable-next-line prefer-destructuring
        cacheByPath[path] = items[0];
      })).done(d.resolve);
      headerItems._cacheByPath = cacheByPath;
      return d;
    }
    function _getAreaFields(fields, area) {
      var areaFields = [];
      (0, _iterator.each)(fields, function () {
        if (isAreaField(this, area)) {
          areaFields.push(this);
        }
      });
      return areaFields;
    }
    return {
      ctor: function ctor(options) {
        var _this = this;
        options = options || {};
        this._eventsStrategy = new _events_strategy.EventsStrategy(this);
        var that = this;
        var store = createStore(options, function (progress) {
          that._eventsStrategy.fireEvent('progressChanged', [progress]);
        });
        that._store = store;
        that._paginate = !!options.paginate;
        that._pageSize = options.pageSize || 40;
        that._data = {
          rows: [],
          columns: [],
          values: []
        };
        that._loadingCount = 0;
        that._isFieldsModified = false;
        (0, _iterator.each)(['changed', 'loadError', 'loadingChanged', 'progressChanged', 'fieldsPrepared', 'expandValueChanging'], function (_, eventName) {
          var optionName = "on".concat(eventName[0].toUpperCase()).concat(eventName.slice(1));
          if (Object.prototype.hasOwnProperty.call(options, optionName)) {
            _this.on(eventName, options[optionName]);
          }
        });
        that._retrieveFields = (0, _type.isDefined)(options.retrieveFields) ? options.retrieveFields : true;
        that._fields = options.fields || [];
        that._descriptions = options.descriptions ? (0, _extend.extend)(that._createDescriptions(), options.descriptions) : undefined;
        if (!store) {
          // TODO create dashboard store
          (0, _extend.extend)(true, that._data, options.store || options);
        }
      },
      getData: function getData() {
        return this._data;
      },
      getAreaFields: function getAreaFields(area, collectGroups) {
        var areaFields = [];
        var descriptions;
        if (collectGroups || area === 'data') {
          areaFields = _getAreaFields(this._fields, area);
          sortFieldsByAreaIndex(areaFields);
        } else {
          descriptions = this._descriptions || {};
          areaFields = descriptions[DESCRIPTION_NAME_BY_AREA[area]] || [];
        }
        return areaFields;
      },
      fields: function fields(_fields) {
        var that = this;
        if (_fields) {
          that._fields = mergeFields(_fields, that._storeFields, that._retrieveFields);
          that._fieldsPrepared(that._fields);
        }
        return that._fields;
      },
      field: function field(id, options) {
        var that = this;
        var fields = that._fields;
        var field = fields && fields[(0, _type.isNumeric)(id) ? id : (0, _module_widget_utils.findField)(fields, id)];
        var levels;
        if (field && options) {
          (0, _iterator.each)(options, function (optionName, optionValue) {
            var isInitialization = !STATE_PROPERTIES.includes(optionName);
            (0, _module_widget_utils.setFieldProperty)(field, optionName, optionValue, isInitialization);
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
      getFieldValues: function getFieldValues(index, applyFilters, options) {
        var that = this;
        var field = this._fields && this._fields[index];
        var store = this.store();
        var loadFields = [];
        var loadOptions = {
          columns: loadFields,
          rows: [],
          values: this.getAreaFields('data'),
          filters: applyFilters ? this._fields.filter(function (f) {
            return f !== field && f.area && f.filterValues && f.filterValues.length;
          }) : [],
          skipValues: true
        };
        var searchValue;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        if (options) {
          searchValue = options.searchValue;
          loadOptions.columnSkip = options.skip;
          loadOptions.columnTake = options.take;
        }
        if (field && store) {
          (0, _iterator.each)(field.levels || [field], function () {
            loadFields.push((0, _extend.extend)({}, this, {
              expanded: true,
              filterValues: null,
              sortOrder: 'asc',
              sortBySummaryField: null,
              searchValue: searchValue
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
        } else {
          d.reject();
        }
        return d;
      },
      reload: function reload() {
        return this.load({
          reload: true
        });
      },
      filter: function filter() {
        var store = this._store;
        return store.filter.apply(store, arguments);
      },
      // eslint-disable-next-line object-shorthand
      load: function load(options) {
        var that = this;
        // @ts-expect-error
        var d = new _deferred.Deferred();
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
            (0, _deferred.when)(getFields(that)).done(function (fields) {
              that._fieldsPrepared(fields);
              that._loadCore(options, d);
            }).fail(d.reject).fail(that._loadErrorHandler);
          } else {
            that._loadCore(options, d);
          }
        }
        if (that.store()) {
          that._delayedLoadTask = (0, _common.executeAsync)(loadTask);
        } else {
          loadTask();
        }
        return d;
      },
      createDrillDownDataSource: function createDrillDownDataSource(params) {
        return this._store.createDrillDownDataSource(this._descriptions, params);
      },
      _createDescriptions: function _createDescriptions(currentField) {
        var that = this;
        var fields = that.fields();
        var descriptions = {
          rows: [],
          columns: [],
          values: [],
          filters: []
        };
        (0, _iterator.each)(['row', 'column', 'data', 'filter'], function (_, areaName) {
          (0, _array.normalizeIndexes)(_getAreaFields(fields, areaName), 'areaIndex', currentField);
        });
        (0, _iterator.each)(fields || [], function (_, field) {
          var descriptionName = DESCRIPTION_NAME_BY_AREA[field.area];
          var dimension = descriptions[descriptionName];
          var groupName = field.groupName;
          if (groupName && !(0, _type.isNumeric)(field.groupIndex)) {
            field.levels = getFieldsByGroup(fields, field);
          }
          if (!dimension || groupName && (0, _type.isNumeric)(field.groupIndex) || field.visible === false && field.area !== 'data' && field.area !== 'filter') {
            return;
          }
          if (field.levels && dimension !== descriptions.filters && dimension !== descriptions.values) {
            dimension.push.apply(dimension, field.levels);
            if (field.filterValues && field.filterValues.length) {
              descriptions.filters.push(field);
            }
          } else {
            dimension.push(field);
          }
        });
        (0, _iterator.each)(descriptions, function (_, fields) {
          sortFieldsByAreaIndex(fields);
        });
        var indices = {};
        (0, _iterator.each)(descriptions.values, function (_, field) {
          var expression = field.calculateSummaryValue;
          if ((0, _type.isFunction)(expression)) {
            var summaryCell = _module4.default.createMockSummaryCell(descriptions, fields, indices);
            expression(summaryCell);
          }
        });
        return descriptions;
      },
      _fieldsPrepared: function _fieldsPrepared(fields) {
        var that = this;
        that._fields = fields;
        (0, _iterator.each)(fields, function (index, field) {
          field.index = index;
          updateCalculatedFieldProperties(field, ALL_CALCULATED_PROPERTIES);
        });
        var currentFieldState = getFieldsState(fields, ['caption']);
        that._eventsStrategy.fireEvent('fieldsPrepared', [fields]);
        for (var i = 0; i < fields.length; i += 1) {
          if (fields[i].caption !== currentFieldState[i].caption) {
            (0, _module_widget_utils.setFieldProperty)(fields[i], 'caption', fields[i].caption, true);
          }
        }
        that._descriptions = that._createDescriptions();
      },
      isLoading: function isLoading() {
        return this._loadingCount > 0;
      },
      state: function state(_state, skipLoading) {
        var that = this;
        if (arguments.length) {
          _state = (0, _extend.extend)({
            rowExpandedPaths: [],
            columnExpandedPaths: []
          }, _state);
          if (!that._descriptions) {
            that.beginLoading();
            (0, _deferred.when)(getFields(that)).done(function (fields) {
              that._fields = setFieldsState(_state.fields, fields);
              that._fieldsPrepared(fields);
              !skipLoading && that.load(_state);
            }).always(function () {
              that.endLoading();
            });
          } else {
            that._fields = setFieldsState(_state.fields, that._fields);
            that._descriptions = that._createDescriptions();
            !skipLoading && that.load(_state);
          }
          return undefined;
        }
        return {
          fields: getFieldsState(that._fields, STATE_PROPERTIES),
          columnExpandedPaths: getExpandedPaths(that._data, that._descriptions, 'columns', that._lastLoadOptions),
          rowExpandedPaths: getExpandedPaths(that._data, that._descriptions, 'rows', that._lastLoadOptions)
        };
      },
      beginLoading: function beginLoading() {
        this._changeLoadingCount(1);
      },
      endLoading: function endLoading() {
        this._changeLoadingCount(-1);
      },
      _changeLoadingCount: function _changeLoadingCount(increment) {
        var oldLoading = this.isLoading();
        this._loadingCount += increment;
        var newLoading = this.isLoading();
        // - @ts-expect-error
        if (oldLoading ^ newLoading) {
          this._eventsStrategy.fireEvent('loadingChanged', [newLoading]);
        }
      },
      _hasPagingValues: function _hasPagingValues(options, area, oppositeIndex) {
        var takeField = "".concat(area, "Take");
        var skipField = "".concat(area, "Skip");
        var values = this._data.values;
        var items = this._data["".concat(area, "s")];
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
          var _headerItem = findHeaderItem(items, options.oppositePath);
          items = _headerItem && _headerItem.children;
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
      _processPagingCacheByArea: function _processPagingCacheByArea(options, pageSize, area) {
        var takeField = "".concat(area, "Take");
        var skipField = "".concat(area, "Skip");
        var items = this._data["".concat(area, "s")];
        var oppositeArea = area === 'row' ? 'column' : 'row';
        var item;
        if (options[takeField]) {
          if (options.path && options.area === area) {
            var headerItem = findHeaderItem(items, options.path);
            items = headerItem && headerItem.children || [];
          }
          if (options.oppositePath && options.area === oppositeArea) {
            var _headerItem2 = findHeaderItem(items, options.oppositePath);
            items = _headerItem2 && _headerItem2.children || [];
          }
          do {
            item = items[options[skipField]];
            if (item && item.index !== undefined) {
              if (this._hasPagingValues(options, oppositeArea, item.index)) {
                // eslint-disable-next-line no-plusplus
                options[skipField]++;
                // eslint-disable-next-line no-plusplus
                options[takeField]--;
              } else {
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
      _processPagingCache: function _processPagingCache(storeLoadOptions) {
        var pageSize = this._pageSize;
        if (pageSize < 0) return;
        for (var i = 0; i < storeLoadOptions.length; i += 1) {
          this._processPagingCacheByArea(storeLoadOptions[i], pageSize, 'row');
          this._processPagingCacheByArea(storeLoadOptions[i], pageSize, 'column');
        }
      },
      _loadCore: function _loadCore(options, deferred) {
        var that = this;
        var store = this._store;
        var descriptions = this._descriptions;
        var reload = options.reload || this.paginate() && that._isFieldsModified;
        var paginate = this.paginate();
        var headerName = DESCRIPTION_NAME_BY_AREA[options.area];
        options = options || {};
        if (store) {
          (0, _extend.extend)(options, descriptions);
          options.columnExpandedPaths = options.columnExpandedPaths || getExpandedPaths(this._data, options, 'columns', that._lastLoadOptions);
          options.rowExpandedPaths = options.rowExpandedPaths || getExpandedPaths(this._data, options, 'rows', that._lastLoadOptions);
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
          var storeLoadOptions = [options];
          that._eventsStrategy.fireEvent('customizeStoreLoadOptions', [storeLoadOptions, reload]);
          if (!reload) {
            that._processPagingCache(storeLoadOptions);
          }
          storeLoadOptions = storeLoadOptions.filter(function (options) {
            return !(options.rows.length && options.rowTake === 0) && !(options.columns.length && options.columnTake === 0);
          });
          if (!storeLoadOptions.length) {
            that._update(deferred);
            return;
          }
          var results = storeLoadOptions.map(function (options) {
            return store.load(options);
          });
          _deferred.when.apply(null, results).done(function () {
            var results = arguments;
            for (var i = 0; i < results.length; i += 1) {
              var _options = storeLoadOptions[i];
              var data = results[i];
              var isLast = i === results.length - 1;
              if (_options.path) {
                that.applyPartialDataSource(_options.area, _options.path, data, isLast ? deferred : false, _options.oppositePath);
              } else if (paginate && !reload && isDataExists(that._data)) {
                that.mergePartialDataSource(data, isLast ? deferred : false);
              } else {
                (0, _extend.extend)(that._data, data);
                that._lastLoadOptions = _options;
                that._update(isLast ? deferred : false);
              }
            }
          }).fail(deferred.reject);
        } else {
          that._update(deferred);
        }
      },
      _sort: function _sort(descriptions, data, getAscOrder) {
        var store = this._store;
        if (store && !this._paginate) {
          (0, _module_utils.sort)(descriptions, data, getAscOrder);
        }
      },
      sortLocal: function sortLocal() {
        this._sort(this._descriptions, this._data, areExpressionsUsed(this._descriptions.values));
        this._eventsStrategy.fireEvent('changed');
      },
      paginate: function paginate() {
        return this._paginate && this._store && this._store.supportPaging();
      },
      isEmpty: function isEmpty() {
        var dataFields = this.getAreaFields('data').filter(function (f) {
          return f.visible !== false;
        });
        var data = this.getData();
        return !dataFields.length || !data.values.length;
      },
      _update: function _update(deferred) {
        var that = this;
        var descriptions = that._descriptions;
        var loadedData = that._data;
        var dataFields = descriptions.values;
        var expressionsUsed = areExpressionsUsed(dataFields);
        (0, _deferred.when)(formatHeaders(descriptions, loadedData), updateCache(loadedData.rows), updateCache(loadedData.columns)).done(function () {
          if (expressionsUsed) {
            that._sort(descriptions, loadedData, expressionsUsed);
            !that.isEmpty() && _module4.default.applyDisplaySummaryMode(descriptions, loadedData);
          }
          that._sort(descriptions, loadedData);
          !that.isEmpty() && isRunningTotalUsed(dataFields) && _module4.default.applyRunningTotal(descriptions, loadedData);
          that._data = loadedData;
          deferred !== false && (0, _deferred.when)(deferred).done(function () {
            that._isFieldsModified = false;
            that._eventsStrategy.fireEvent('changed');
            if ((0, _type.isDefined)(that._data.grandTotalRowIndex)) {
              loadedData.grandTotalRowIndex = that._data.grandTotalRowIndex;
            }
            if ((0, _type.isDefined)(that._data.grandTotalColumnIndex)) {
              loadedData.grandTotalColumnIndex = that._data.grandTotalColumnIndex;
            }
          });
          deferred && deferred.resolve(that._data);
        });
        return deferred;
      },
      store: function store() {
        return this._store;
      },
      collapseHeaderItem: function collapseHeaderItem(area, path) {
        var that = this;
        var headerItems = area === 'column' ? that._data.columns : that._data.rows;
        var headerItem = findHeaderItem(headerItems, path);
        var field = that.getAreaFields(area)[path.length - 1];
        if (headerItem && headerItem.children) {
          that._eventsStrategy.fireEvent('expandValueChanging', [{
            area: area,
            path: path,
            expanded: false
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
      collapseAll: function collapseAll(id) {
        var _this2 = this;
        var dataChanged = false;
        var field = this.field(id) || {};
        var areaOffsets = [this.getAreaFields(field.area).indexOf(field)];
        field.expanded = false;
        if (field && field.levels) {
          areaOffsets = [];
          field.levels.forEach(function (f) {
            areaOffsets.push(_this2.getAreaFields(field.area).indexOf(f));
            f.expanded = false;
          });
        }
        (0, _module_widget_utils.foreachTree)(this._data["".concat(field.area, "s")], function (items) {
          var item = items[0];
          var path = (0, _module_widget_utils.createPath)(items);
          if (item && item.children && areaOffsets.includes(path.length - 1)) {
            item.collapsedChildren = item.children;
            delete item.children;
            dataChanged = true;
          }
        }, true);
        dataChanged && this._update();
      },
      expandAll: function expandAll(id) {
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
      expandHeaderItem: function expandHeaderItem(area, path) {
        var that = this;
        var headerItems = area === 'column' ? that._data.columns : that._data.rows;
        var headerItem = findHeaderItem(headerItems, path);
        if (headerItem && !headerItem.children) {
          var hasCache = !!headerItem.collapsedChildren;
          var options = {
            area: area,
            path: path,
            expanded: true,
            needExpandData: !hasCache
          };
          that._eventsStrategy.fireEvent('expandValueChanging', [options]);
          if (hasCache) {
            headerItem.children = headerItem.collapsedChildren;
            delete headerItem.collapsedChildren;
            that._update();
          } else if (this.store()) {
            that.load(options);
          }
          return hasCache;
        }
        return false;
      },
      mergePartialDataSource: function mergePartialDataSource(dataSource, deferred) {
        var that = this;
        var loadedData = that._data;
        var newRowItemIndexesToCurrent;
        var newColumnItemIndexesToCurrent;
        if (dataSource && dataSource.values) {
          dataSource.rows = dataSource.rows || [];
          dataSource.columns = dataSource.columns || [];
          newRowItemIndexesToCurrent = updateHeaderItems(loadedData.rows, dataSource.rows, loadedData.grandTotalColumnIndex);
          newColumnItemIndexesToCurrent = updateHeaderItems(loadedData.columns, dataSource.columns, loadedData.grandTotalColumnIndex);
          (0, _deferred.when)(newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent).done(function (newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
            if (newRowItemIndexesToCurrent.length || newColumnItemIndexesToCurrent.length) {
              updateDataSourceCells(loadedData, dataSource.values, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent);
            }
            that._update(deferred);
          });
        }
      },
      applyPartialDataSource: function applyPartialDataSource(area, path, dataSource, deferred, oppositePath) {
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
              } else {
                newRowItemIndexesToCurrent = updateHeaderItems(loadedData.rows, dataSource.rows, loadedData.grandTotalRowIndex);
              }
            } else {
              newRowItemIndexesToCurrent = updateHeaderItemChildren(headerItems, headerItem, dataSource.rows, loadedData.grandTotalRowIndex);
              if (oppositeHeaderItem) {
                newColumnItemIndexesToCurrent = updateHeaderItemChildren(oppositeHeaderItems, oppositeHeaderItem, dataSource.columns, loadedData.grandTotalColumnIndex);
              } else {
                newColumnItemIndexesToCurrent = updateHeaderItems(loadedData.columns, dataSource.columns, loadedData.grandTotalColumnIndex);
              }
            }
            (0, _deferred.when)(newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent).done(function (newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent) {
              if (area === 'row' && newRowItemIndexesToCurrent.length || area === 'column' && newColumnItemIndexesToCurrent.length) {
                updateDataSourceCells(loadedData, dataSource.values, newRowItemIndexesToCurrent, newColumnItemIndexesToCurrent);
              }
              that._update(deferred);
            });
          }
        }
      },
      on: function on(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this;
      },
      off: function off(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this;
      },
      dispose: function dispose() {
        var that = this;
        var delayedLoadTask = that._delayedLoadTask;
        this._eventsStrategy.dispose();
        if (delayedLoadTask) {
          delayedLoadTask.abort();
        }
        this._isDisposed = true;
      },
      isDisposed: function isDisposed() {
        return !!this._isDisposed;
      }
    };
  }());
  exports.PivotGridDataSource = PivotGridDataSource;
  var _default = {
    PivotGridDataSource: PivotGridDataSource
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../data/data_source/utils","../../../../data/abstract_store","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/array","../../../../core/utils/iterator","../../../../core/utils/deferred","../../../../core/class","../../../../core/events_strategy","../../../../core/utils/inflector","../local_store/module","../remote_store/module","./module_utils","../xmla_store/module","../summary_display_modes/module","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../data/data_source/utils"), require("../../../../data/abstract_store"), require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/array"), require("../../../../core/utils/iterator"), require("../../../../core/utils/deferred"), require("../../../../core/class"), require("../../../../core/events_strategy"), require("../../../../core/utils/inflector"), require("../local_store/module"), require("../remote_store/module"), require("./module_utils"), require("../xmla_store/module"), require("../summary_display_modes/module"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map