!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/pivot_grid/data_controller/module.js"], ["../../../../core/utils/callbacks","../../../../core/utils/deferred","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/class","../../../../core/utils/string","../../../../core/utils/common","../../../../core/utils/type","../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core","../../../../ui/grid_core/ui.grid_core.virtual_columns_core","../../../../ui/grid_core/ui.grid_core.state_storing_core","../data_source/module","../module_widget_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/pivot_grid/data_controller/module.js", ["../../../../core/utils/callbacks", "../../../../core/utils/deferred", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../core/class", "../../../../core/utils/string", "../../../../core/utils/common", "../../../../core/utils/type", "../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core", "../../../../ui/grid_core/ui.grid_core.virtual_columns_core", "../../../../ui/grid_core/ui.grid_core.state_storing_core", "../data_source/module", "../module_widget_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.DataController__internals = exports.DataController = void 0;
  var _callbacks = _interopRequireDefault($__require("../../../../core/utils/callbacks"));
  var _deferred = $__require("../../../../core/utils/deferred");
  var _extend2 = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _string = $__require("../../../../core/utils/string");
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core");
  var _uiGrid_core2 = $__require("../../../../ui/grid_core/ui.grid_core.virtual_columns_core");
  var _uiGrid_core3 = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.state_storing_core"));
  var _module = $__require("../data_source/module");
  var _module_widget_utils = $__require("../module_widget_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var math = Math;
  var GRAND_TOTAL_TYPE = 'GT';
  var TOTAL_TYPE = 'T';
  var DATA_TYPE = 'D';
  var NOT_AVAILABLE = '#N/A';
  var CHANGING_DURATION_IF_PAGINATE = 300;
  var proxyMethod = function proxyMethod(instance, methodName, defaultResult) {
    if (!instance[methodName]) {
      instance[methodName] = function () {
        var dataSource = this._dataSource;
        return dataSource ? dataSource[methodName].apply(dataSource, arguments) : defaultResult;
      };
    }
  };
  var DataController = _class.default.inherit(function () {
    // - @ts-expect-error
    function getHeaderItemText(item, description, options) {
      var text = item.text;
      if ((0, _type.isDefined)(item.displayText)) {
        text = item.displayText;
      } else if ((0, _type.isDefined)(item.caption)) {
        text = item.caption;
      } else if (item.type === GRAND_TOTAL_TYPE) {
        text = options.texts.grandTotal;
      }
      if (item.isAdditionalTotal) {
        text = (0, _string.format)(options.texts.total || '', text);
      }
      return text;
    }
    function formatCellValue(value, dataField, errorText) {
      return value === NOT_AVAILABLE ? errorText : (0, _module_widget_utils.formatValue)(value, dataField);
    }
    var createHeaderInfo = function () {
      var getHeaderItemsDepth = function getHeaderItemsDepth(headerItems) {
        var depth = 0;
        (0, _module_widget_utils.foreachTree)(headerItems, function (items) {
          depth = math.max(depth, items.length);
        });
        return depth;
      };
      var createInfoItem = function createInfoItem(headerItem, breadth, isHorizontal, isTree) {
        var infoItem = {
          type: headerItem.type,
          text: headerItem.text
        };
        if (headerItem.path) {
          infoItem.path = headerItem.path;
        }
        if (headerItem.width) {
          infoItem.width = headerItem.width;
        }
        if ((0, _type.isDefined)(headerItem.wordWrapEnabled)) {
          infoItem.wordWrapEnabled = headerItem.wordWrapEnabled;
        }
        if (headerItem.isLast) {
          infoItem.isLast = true;
        }
        if (headerItem.sorted) {
          infoItem.sorted = true;
        }
        if (headerItem.isMetric) {
          infoItem.dataIndex = headerItem.dataIndex;
        }
        if ((0, _type.isDefined)(headerItem.expanded)) {
          infoItem.expanded = headerItem.expanded;
        }
        if (breadth > 1) {
          infoItem[isHorizontal ? 'colspan' : 'rowspan'] = breadth;
        }
        if (headerItem.depthSize && headerItem.depthSize > 1) {
          infoItem[isHorizontal ? 'rowspan' : 'colspan'] = headerItem.depthSize;
        }
        if (headerItem.index >= 0) {
          infoItem.dataSourceIndex = headerItem.index;
        }
        if (isTree && headerItem.children && headerItem.children.length && !headerItem.children[0].isMetric) {
          infoItem.width = null;
          infoItem.isWhiteSpace = true;
        }
        return infoItem;
      };
      var addInfoItem = function addInfoItem(info, options) {
        var breadth = options.lastIndex - options.index || 1;
        var addInfoItemCore = function addInfoItemCore(info, infoItem, itemIndex, depthIndex, isHorizontal) {
          var index = isHorizontal ? depthIndex : itemIndex;
          while (!info[index]) {
            info.push([]);
          }
          if (isHorizontal) {
            info[index].push(infoItem);
          } else {
            info[index].unshift(infoItem);
          }
        };
        var itemInfo = createInfoItem(options.headerItem, breadth, options.isHorizontal, options.isTree);
        addInfoItemCore(info, itemInfo, options.index, options.depth, options.isHorizontal);
        if (!options.headerItem.children || options.headerItem.children.length === 0) {
          return options.lastIndex + 1;
        }
        return options.lastIndex;
      };
      var isItemSorted = function isItemSorted(items, sortBySummaryPath) {
        var path;
        var item = items[0];
        var stringValuesUsed = (0, _type.isString)(sortBySummaryPath[0]);
        var headerItem = item.dataIndex >= 0 ? items[1] : item;
        if (stringValuesUsed && sortBySummaryPath[0].indexOf('&[') !== -1 && headerItem.key || !headerItem.key) {
          path = (0, _module_widget_utils.createPath)(items);
        } else {
          path = (0, _iterator.map)(items, function (item) {
            return item.dataIndex >= 0 ? item.value : item.text;
          }).reverse();
        }
        if (item.type === GRAND_TOTAL_TYPE) {
          path = path.slice(1);
        }
        return path.join('/') === sortBySummaryPath.join('/');
      };
      var getViewHeaderItems = function getViewHeaderItems(headerItems, headerDescriptions, cellDescriptions, depthSize, options) {
        var cellDescriptionsCount = cellDescriptions.length;
        var viewHeaderItems = createViewHeaderItems(headerItems, headerDescriptions);
        var dataFields = options.dataFields;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        (0, _deferred.when)(viewHeaderItems).done(function (viewHeaderItems) {
          options.notifyProgress(0.5);
          if (options.showGrandTotals) {
            viewHeaderItems[!options.showTotalsPrior ? 'push' : 'unshift']({
              type: GRAND_TOTAL_TYPE,
              isEmpty: options.isEmptyGrandTotal
            });
          }
          var hideTotals = options.showTotals === false || dataFields.length > 0 && dataFields.length === options.hiddenTotals.length;
          var hideData = dataFields.length > 0 && options.hiddenValues.length === dataFields.length;
          if (hideData && hideTotals) {
            depthSize = 1;
          }
          if (!hideTotals || options.layout === 'tree') {
            addAdditionalTotalHeaderItems(viewHeaderItems, headerDescriptions, options.showTotalsPrior, options.layout === 'tree');
          }
          (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(viewHeaderItems, function (items) {
            var item = items[0];
            if (!item.children || item.children.length === 0) {
              item.depthSize = depthSize - items.length + 1;
            }
          })).done(function () {
            if (cellDescriptionsCount > 1) {
              addMetricHeaderItems(viewHeaderItems, cellDescriptions, options);
            }
            !options.showEmpty && removeHiddenItems(viewHeaderItems);
            options.notifyProgress(0.75);
            (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(viewHeaderItems, function (items) {
              var item = items[0];
              var isMetric = item.isMetric;
              var field = headerDescriptions[items.length - 1] || {};
              if (item.type === DATA_TYPE && !isMetric) {
                item.width = field.width;
              }
              if (hideData && item.type === DATA_TYPE) {
                var parentChildren = (items[1] ? items[1].children : viewHeaderItems) || [];
                parentChildren.splice(parentChildren.indexOf(item), 1);
                return;
              }
              if (isMetric) {
                item.wordWrapEnabled = cellDescriptions[item.dataIndex].wordWrapEnabled;
              } else {
                item.wordWrapEnabled = field.wordWrapEnabled;
              }
              item.isLast = !item.children || !item.children.length;
              if (item.isLast) {
                (0, _iterator.each)(options.sortBySummaryPaths, function (_, sortBySummaryPath) {
                  if (!(0, _type.isDefined)(item.dataIndex)) {
                    sortBySummaryPath = sortBySummaryPath.slice(0);
                    sortBySummaryPath.pop();
                  }
                  if (isItemSorted(items, sortBySummaryPath)) {
                    item.sorted = true;
                    return false;
                  }
                  return undefined;
                });
              }
              item.text = getHeaderItemText(item, field, options);
            })).done(function () {
              if (!viewHeaderItems.length) {
                viewHeaderItems.push({});
              }
              options.notifyProgress(1);
              d.resolve(viewHeaderItems);
            });
          });
        });
        return d;
      };
      function createHeaderItem(childrenStack, depth, index) {
        var parent = childrenStack[depth] = childrenStack[depth] || [];
        var node = parent[index] = {};
        if (childrenStack[depth + 1]) {
          node.children = childrenStack[depth + 1];
          // T541266
          for (var i = depth + 1; i < childrenStack.length; i += 1) {
            childrenStack[i] = undefined;
          }
          childrenStack.length = depth + 1;
        }
        return node;
      }
      function createViewHeaderItems(headerItems, headerDescriptions) {
        var headerDescriptionsCount = headerDescriptions && headerDescriptions.length || 0;
        var childrenStack = [];
        // @ts-expect-error
        var d = new _deferred.Deferred();
        var headerItem;
        (0, _deferred.when)((0, _module_widget_utils.foreachTreeAsync)(headerItems, function (items, index) {
          var item = items[0];
          var path = (0, _module_widget_utils.createPath)(items);
          headerItem = createHeaderItem(childrenStack, path.length, index);
          headerItem.type = DATA_TYPE;
          headerItem.value = item.value;
          headerItem.path = path;
          headerItem.text = item.text;
          headerItem.index = item.index;
          headerItem.displayText = item.displayText;
          headerItem.key = item.key;
          headerItem.isEmpty = item.isEmpty;
          if (path.length < headerDescriptionsCount && (!item.children || item.children.length !== 0)) {
            headerItem.expanded = !!item.children;
          }
        })).done(function () {
          d.resolve(createHeaderItem(childrenStack, 0, 0).children || []);
        });
        return d;
      }
      function addMetricHeaderItems(headerItems, cellDescriptions, options) {
        (0, _module_widget_utils.foreachTree)(headerItems, function (items) {
          var item = items[0];
          var i;
          if (!item.children || item.children.length === 0) {
            item.children = [];
            for (i = 0; i < cellDescriptions.length; i += 1) {
              var isGrandTotal = item.type === GRAND_TOTAL_TYPE;
              var isTotal = item.type === TOTAL_TYPE;
              var isValue = item.type === DATA_TYPE;
              var columnIsHidden = cellDescriptions[i].visible === false || isGrandTotal && options.hiddenGrandTotals.includes(i) || isTotal && options.hiddenTotals.includes(i) || isValue && options.hiddenValues.includes(i);
              if (columnIsHidden) {
                continue;
              }
              item.children.push({
                caption: cellDescriptions[i].caption,
                path: item.path,
                type: item.type,
                value: i,
                index: item.index,
                dataIndex: i,
                isMetric: true,
                isEmpty: item.isEmpty && item.isEmpty[i]
              });
            }
          }
        });
      }
      function addAdditionalTotalHeaderItems(headerItems, headerDescriptions, showTotalsPrior, isTree) {
        showTotalsPrior = showTotalsPrior || isTree;
        (0, _module_widget_utils.foreachTree)(headerItems, function (items, index) {
          var item = items[0];
          var parentChildren = (items[1] ? items[1].children : headerItems) || [];
          var dataField = headerDescriptions[items.length - 1];
          if (item.type === DATA_TYPE && item.expanded && (dataField.showTotals !== false || isTree)) {
            index !== -1 && parentChildren.splice(showTotalsPrior ? index : index + 1, 0, (0, _extend2.extend)({}, item, {
              children: null,
              type: TOTAL_TYPE,
              expanded: showTotalsPrior ? true : null,
              isAdditionalTotal: true
            }));
            if (showTotalsPrior) {
              item.expanded = null;
            }
          }
        });
      }
      var removeEmptyParent = function removeEmptyParent(items, index) {
        var parent = items[index + 1];
        if (!items[index].children.length && parent && parent.children) {
          parent.children.splice(parent.children.indexOf(items[index]), 1);
          removeEmptyParent(items, index + 1);
        }
      };
      function removeHiddenItems(headerItems) {
        (0, _module_widget_utils.foreachTree)([{
          children: headerItems
        }], function (items, index) {
          var item = items[0];
          var parentChildren = (items[1] ? items[1].children : headerItems) || [];
          var isEmpty = item.isEmpty;
          if (isEmpty && isEmpty.length) {
            isEmpty = item.isEmpty.filter(function (isEmpty) {
              return isEmpty;
            }).length === isEmpty.length;
          }
          if (item && !item.children && isEmpty) {
            parentChildren.splice(index, 1);
            removeEmptyParent(items, 1);
          }
        });
      }
      var fillHeaderInfo = function fillHeaderInfo(info, viewHeaderItems, depthSize, isHorizontal, isTree) {
        var lastIndex = 0;
        var index;
        var depth;
        var indexesByDepth = [0];
        (0, _module_widget_utils.foreachTree)(viewHeaderItems, function (items) {
          var headerItem = items[0];
          depth = headerItem.isMetric ? depthSize : items.length - 1;
          while (indexesByDepth.length - 1 < depth) {
            indexesByDepth.push(indexesByDepth[indexesByDepth.length - 1]);
          }
          index = indexesByDepth[depth] || 0;
          lastIndex = addInfoItem(info, {
            headerItem: headerItem,
            index: index,
            lastIndex: lastIndex,
            depth: depth,
            isHorizontal: isHorizontal,
            isTree: isTree
          });
          indexesByDepth.length = depth;
          indexesByDepth.push(lastIndex);
        });
      };
      return function (headerItems, headerDescriptions, cellDescriptions, isHorizontal, options) {
        var info = [];
        var depthSize = getHeaderItemsDepth(headerItems) || 1;
        // @ts-expect-error
        var d = new _deferred.Deferred();
        getViewHeaderItems(headerItems, headerDescriptions, cellDescriptions, depthSize, options).done(function (viewHeaderItems) {
          fillHeaderInfo(info, viewHeaderItems, depthSize, isHorizontal, options.layout === 'tree');
          options.notifyProgress(1);
          d.resolve(info);
        });
        return d;
      };
    }();
    function createSortPaths(headerFields, dataFields) {
      var sortBySummaryPaths = [];
      (0, _iterator.each)(headerFields, function (_, headerField) {
        var fieldIndex = (0, _module_widget_utils.findField)(dataFields, headerField.sortBySummaryField);
        if (fieldIndex >= 0) {
          sortBySummaryPaths.push((headerField.sortBySummaryPath || []).concat([fieldIndex]));
        }
      });
      return sortBySummaryPaths;
    }
    function foreachRowInfo(rowsInfo, callback) {
      var columnOffset = 0;
      var columnOffsetResetIndexes = [];
      for (var i = 0; i < rowsInfo.length; i += 1) {
        for (var j = 0; j < rowsInfo[i].length; j += 1) {
          var rowSpanOffset = (rowsInfo[i][j].rowspan || 1) - 1;
          var visibleIndex = i + rowSpanOffset;
          if (columnOffsetResetIndexes[i]) {
            columnOffset -= columnOffsetResetIndexes[i];
            columnOffsetResetIndexes[i] = 0;
          }
          if (callback(rowsInfo[i][j], visibleIndex, i, j, columnOffset) === false) {
            break;
          }
          columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] = (columnOffsetResetIndexes[i + (rowsInfo[i][j].rowspan || 1)] || 0) + 1;
          columnOffset += 1;
        }
      }
    }
    function createCellsInfo(rowsInfo, columnsInfo, data, dataFields, dataFieldArea, errorText) {
      var info = [];
      var dataFieldAreaInRows = dataFieldArea === 'row';
      var dataSourceCells = data.values;
      dataSourceCells.length && foreachRowInfo(rowsInfo, function (rowInfo, rowIndex) {
        var row = info[rowIndex] = [];
        var dataRow = dataSourceCells[rowInfo.dataSourceIndex >= 0 ? rowInfo.dataSourceIndex : data.grandTotalRowIndex] || [];
        rowInfo.isLast && (0, _uiGrid_core2.foreachColumnInfo)(columnsInfo, function (columnInfo, columnIndex) {
          var dataIndex = (dataFieldAreaInRows ? rowInfo.dataIndex : columnInfo.dataIndex) || 0;
          var dataField = dataFields[dataIndex];
          if (columnInfo.isLast && dataField && dataField.visible !== false) {
            var cell = dataRow[columnInfo.dataSourceIndex >= 0 ? columnInfo.dataSourceIndex : data.grandTotalColumnIndex];
            if (!Array.isArray(cell)) {
              cell = [cell];
            }
            var cellValue = cell[dataIndex];
            row[columnIndex] = {
              text: formatCellValue(cellValue, dataField, errorText),
              value: cellValue,
              format: dataField.format,
              dataType: dataField.dataType,
              columnType: columnInfo.type,
              rowType: rowInfo.type,
              rowPath: rowInfo.path || [],
              columnPath: columnInfo.path || [],
              dataIndex: dataIndex
            };
            if (dataField.width) {
              row[columnIndex].width = dataField.width;
            }
          }
        });
      });
      return info;
    }
    function getHeaderIndexedItems(headerItems, options) {
      var visibleIndex = 0;
      var indexedItems = [];
      (0, _module_widget_utils.foreachTree)(headerItems, function (items) {
        var headerItem = items[0];
        var path = (0, _module_widget_utils.createPath)(items);
        if (headerItem.children && options.showTotals === false) return;
        var indexedItem = (0, _extend2.extend)(true, {}, headerItem, {
          visibleIndex: visibleIndex += 1,
          path: path
        });
        if ((0, _type.isDefined)(indexedItem.index)) {
          indexedItems[indexedItem.index] = indexedItem;
        } else {
          indexedItems.push(indexedItem);
        }
      });
      return indexedItems;
    }
    function createScrollController(dataController, component, dataAdapter) {
      return new _uiGrid_core.VirtualScrollController(component, (0, _extend2.extend)({
        hasKnownLastPage: function hasKnownLastPage() {
          return true;
        },
        pageCount: function pageCount() {
          return math.ceil(this.totalItemsCount() / this.pageSize());
        },
        updateLoading: function updateLoading() {},
        itemsCount: function itemsCount() {
          if (this.pageIndex() < this.pageCount() - 1) {
            return this.pageSize();
          }
          return this.totalItemsCount() % this.pageSize();
        },
        items: function items() {
          return [];
        },
        viewportItems: function viewportItems() {
          return [];
        },
        onChanged: function onChanged() {},
        isLoading: function isLoading() {
          return dataController.isLoading();
        },
        changingDuration: function changingDuration() {
          var dataSource = dataController._dataSource;
          if (dataSource.paginate()) {
            return CHANGING_DURATION_IF_PAGINATE;
          }
          return dataController._changingDuration || 0;
        }
      }, dataAdapter));
    }
    function getHiddenTotals(dataFields) {
      var result = [];
      (0, _iterator.each)(dataFields, function (index, field) {
        if (field.showTotals === false) {
          result.push(index);
        }
      });
      return result;
    }
    function getHiddenValues(dataFields) {
      var result = [];
      dataFields.forEach(function (field, index) {
        if (field.showValues === undefined && field.showTotals === false || field.showValues === false) {
          result.push(index);
        }
      });
      return result;
    }
    function getHiddenGrandTotalsTotals(dataFields, columnFields) {
      var result = [];
      (0, _iterator.each)(dataFields, function (index, field) {
        if (field.showGrandTotals === false) {
          result.push(index);
        }
      });
      if (columnFields.length === 0 && result.length === dataFields.length) {
        result = [];
      }
      return result;
    }
    var members = {
      ctor: function ctor(options) {
        var that = this;
        var virtualScrollControllerChanged = that._fireChanged.bind(that);
        options = that._options = options || {};
        that.dataSourceChanged = (0, _callbacks.default)();
        that._dataSource = that._createDataSource(options);
        if (options.component && options.component.option('scrolling.mode') === 'virtual') {
          that._rowsScrollController = createScrollController(that, options.component, {
            totalItemsCount: function totalItemsCount() {
              return that.totalRowCount();
            },
            pageIndex: function pageIndex(index) {
              return that.rowPageIndex(index);
            },
            pageSize: function pageSize() {
              return that.rowPageSize();
            },
            load: function load() {
              if (that._rowsScrollController.pageIndex() >= this.pageCount()) {
                that._rowsScrollController.pageIndex(this.pageCount() - 1);
              }
              return that._rowsScrollController.handleDataChanged(function () {
                if (that._dataSource.paginate()) {
                  that._dataSource.load();
                } else {
                  // - @ts-expect-error
                  virtualScrollControllerChanged.apply(this, arguments);
                }
              });
            }
          });
          that._columnsScrollController = createScrollController(that, options.component, {
            totalItemsCount: function totalItemsCount() {
              return that.totalColumnCount();
            },
            pageIndex: function pageIndex(index) {
              return that.columnPageIndex(index);
            },
            pageSize: function pageSize() {
              return that.columnPageSize();
            },
            load: function load() {
              if (that._columnsScrollController.pageIndex() >= this.pageCount()) {
                that._columnsScrollController.pageIndex(this.pageCount() - 1);
              }
              return that._columnsScrollController.handleDataChanged(function () {
                if (that._dataSource.paginate()) {
                  that._dataSource.load();
                } else {
                  // - @ts-expect-error
                  virtualScrollControllerChanged.apply(this, arguments);
                }
              });
            }
          });
        }
        that._stateStoringController = new _uiGrid_core3.default.StateStoringController(options.component).init();
        that._columnsInfo = [];
        that._rowsInfo = [];
        that._cellsInfo = [];
        that.expandValueChanging = (0, _callbacks.default)();
        that.loadingChanged = (0, _callbacks.default)();
        that.progressChanged = (0, _callbacks.default)();
        that.scrollChanged = (0, _callbacks.default)();
        that.load();
        that._update();
        that.changed = (0, _callbacks.default)();
      },
      _fireChanged: function _fireChanged() {
        var that = this;
        var startChanging = new Date();
        that.changed && !that._lockChanged && that.changed.fire();
        that._changingDuration = new Date() - startChanging;
      },
      _correctSkipsTakes: function _correctSkipsTakes(rowIndex, rowSkip, rowSpan, levels, skips, takes) {
        var endIndex = rowSpan ? rowIndex + rowSpan - 1 : rowIndex;
        skips[levels.length] = skips[levels.length] || 0;
        takes[levels.length] = takes[levels.length] || 0;
        if (endIndex < rowSkip) {
          skips[levels.length] += 1;
        } else {
          takes[levels.length] += 1;
        }
      },
      _calculatePagingForRowExpandedPaths: function _calculatePagingForRowExpandedPaths(options, skips, takes, rowExpandedSkips, rowExpandedTakes) {
        var rows = this._rowsInfo;
        var rowCount = Math.min(options.rowSkip + options.rowTake, rows.length);
        var rowExpandedPaths = options.rowExpandedPaths;
        var levels = [];
        var expandedPathIndexes = {};
        var i;
        var j;
        var path;
        rowExpandedPaths.forEach(function (path, index) {
          expandedPathIndexes[path] = index;
        });
        for (i = 0; i < rowCount; i += 1) {
          takes.length = skips.length = levels.length + 1;
          for (j = 0; j < rows[i].length; j += 1) {
            var cell = rows[i][j];
            if (cell.type === 'D') {
              this._correctSkipsTakes(i, options.rowSkip, cell.rowspan, levels, skips, takes);
              path = cell.path || path;
              var expandIndex = path && path.length > 1 ? expandedPathIndexes[path.slice(0, -1)] : -1;
              if (expandIndex >= 0) {
                rowExpandedSkips[expandIndex] = skips[levels.length] || 0;
                rowExpandedTakes[expandIndex] = takes[levels.length] || 0;
              }
              if (cell.rowspan) {
                levels.push(cell.rowspan);
              }
            }
          }
          levels = levels.map(function (level) {
            return level - 1;
          }).filter(function (level) {
            return level > 0;
          });
        }
      },
      _calculatePagingForColumnExpandedPaths: function _calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes) {
        var skipByPath = {};
        var takeByPath = {};
        (0, _uiGrid_core2.foreachColumnInfo)(this._columnsInfo, function (columnInfo, columnIndex) {
          if (columnInfo.type === 'D' && columnInfo.path && columnInfo.dataIndex === undefined) {
            var colspan = columnInfo.colspan || 1;
            var path = columnInfo.path.slice(0, -1).toString();
            skipByPath[path] = skipByPath[path] || 0;
            takeByPath[path] = takeByPath[path] || 0;
            if (columnIndex + colspan <= options.columnSkip) {
              skipByPath[path] += 1;
            } else if (columnIndex < options.columnSkip + options.columnTake) {
              takeByPath[path] += 1;
            }
          }
        });
        skips[0] = skipByPath[''];
        takes[0] = takeByPath[''];
        options.columnExpandedPaths.forEach(function (path, index) {
          var skip = skipByPath[path];
          var take = takeByPath[path];
          if (skip !== undefined) {
            expandedSkips[index] = skip;
          }
          if (take !== undefined) {
            expandedTakes[index] = take;
          }
        });
      },
      _processPagingForExpandedPaths: function _processPagingForExpandedPaths(options, area, storeLoadOptions, reload) {
        var expandedPaths = options["".concat(area, "ExpandedPaths")];
        var expandedSkips = expandedPaths.map(function () {
          return 0;
        });
        var expandedTakes = expandedPaths.map(function () {
          return reload ? options.pageSize : 0;
        });
        var skips = [];
        var takes = [];
        if (!reload) {
          if (area === 'row') {
            this._calculatePagingForRowExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
          } else {
            this._calculatePagingForColumnExpandedPaths(options, skips, takes, expandedSkips, expandedTakes);
          }
        }
        this._savePagingForExpandedPaths(options, area, storeLoadOptions, skips[0], takes[0], expandedSkips, expandedTakes);
      },
      _savePagingForExpandedPaths: function _savePagingForExpandedPaths(options, area, storeLoadOptions, skip, take, expandedSkips, expandedTakes) {
        var expandedPaths = options["".concat(area, "ExpandedPaths")];
        options["".concat(area, "ExpandedPaths")] = [];
        options["".concat(area, "Skip")] = skip !== undefined ? skip : options["".concat(area, "Skip")];
        options["".concat(area, "Take")] = take !== undefined ? take : options["".concat(area, "Take")];
        for (var i = 0; i < expandedPaths.length; i += 1) {
          if (expandedTakes[i]) {
            var _extend;
            var isOppositeArea = options.area && options.area !== area;
            storeLoadOptions.push((0, _extend2.extend)({
              area: area,
              headerName: "".concat(area, "s")
            }, options, (_extend = {}, _defineProperty(_extend, "".concat(area, "Skip"), expandedSkips[i]), _defineProperty(_extend, "".concat(area, "Take"), expandedTakes[i]), _defineProperty(_extend, isOppositeArea ? 'oppositePath' : 'path', expandedPaths[i]), _extend)));
          }
        }
      },
      _handleCustomizeStoreLoadOptions: function _handleCustomizeStoreLoadOptions(storeLoadOptions, reload) {
        var _this = this;
        var options = storeLoadOptions[0];
        var rowsScrollController = this._rowsScrollController;
        if (this._dataSource.paginate() && rowsScrollController) {
          var rowPageSize = rowsScrollController.pageSize();
          if (options.headerName === 'rows') {
            options.rowSkip = 0;
            options.rowTake = rowPageSize;
            options.rowExpandedPaths = [];
          } else {
            options.rowSkip = rowsScrollController.beginPageIndex() * rowPageSize;
            options.rowTake = (rowsScrollController.endPageIndex() - rowsScrollController.beginPageIndex() + 1) * rowPageSize;
            this._processPagingForExpandedPaths(options, 'row', storeLoadOptions, reload);
          }
        }
        var columnsScrollController = this._columnsScrollController;
        if (this._dataSource.paginate() && columnsScrollController) {
          var columnPageSize = columnsScrollController.pageSize();
          storeLoadOptions.forEach(function (options) {
            if (options.headerName === 'columns') {
              options.columnSkip = 0;
              options.columnTake = columnPageSize;
              options.columnExpandedPaths = [];
            } else {
              options.columnSkip = columnsScrollController.beginPageIndex() * columnPageSize;
              options.columnTake = (columnsScrollController.endPageIndex() - columnsScrollController.beginPageIndex() + 1) * columnPageSize;
              _this._processPagingForExpandedPaths(options, 'column', storeLoadOptions, reload);
            }
          });
        }
      },
      load: function load() {
        var that = this;
        var stateStoringController = this._stateStoringController;
        if (stateStoringController.isEnabled() && !stateStoringController.isLoaded()) {
          stateStoringController.load().always(function (state) {
            if (state) {
              that._dataSource.state(state);
            } else {
              that._dataSource.load();
            }
          });
        } else {
          that._dataSource.load();
        }
      },
      calculateVirtualContentParams: function calculateVirtualContentParams(contentParams) {
        var that = this;
        var rowsScrollController = that._rowsScrollController;
        var columnsScrollController = that._columnsScrollController;
        if (rowsScrollController && columnsScrollController) {
          rowsScrollController.viewportItemSize(contentParams.virtualRowHeight);
          rowsScrollController.viewportSize(contentParams.viewportHeight / rowsScrollController.viewportItemSize());
          rowsScrollController.setContentItemSizes(contentParams.itemHeights);
          columnsScrollController.viewportItemSize(contentParams.virtualColumnWidth);
          columnsScrollController.viewportSize(contentParams.viewportWidth / columnsScrollController.viewportItemSize());
          columnsScrollController.setContentItemSizes(contentParams.itemWidths);
          (0, _common.deferUpdate)(function () {
            columnsScrollController.loadIfNeed();
            rowsScrollController.loadIfNeed();
          });
          that.scrollChanged.fire({
            left: columnsScrollController.getViewportPosition(),
            top: rowsScrollController.getViewportPosition()
          });
          return {
            contentTop: rowsScrollController.getContentOffset(),
            contentLeft: columnsScrollController.getContentOffset(),
            width: columnsScrollController.getVirtualContentSize(),
            height: rowsScrollController.getVirtualContentSize()
          };
        }
        return undefined;
      },
      setViewportPosition: function setViewportPosition(left, top) {
        this._rowsScrollController.setViewportPosition(top || 0);
        this._columnsScrollController.setViewportPosition(left || 0);
      },
      subscribeToWindowScrollEvents: function subscribeToWindowScrollEvents($element) {
        var _a;
        (_a = this._rowsScrollController) === null || _a === void 0 ? void 0 : _a.subscribeToWindowScrollEvents($element);
      },
      updateWindowScrollPosition: function updateWindowScrollPosition(position) {
        var _a;
        (_a = this._rowsScrollController) === null || _a === void 0 ? void 0 : _a.scrollTo(position);
      },
      updateViewOptions: function updateViewOptions(options) {
        (0, _extend2.extend)(this._options, options);
        this._update();
      },
      _handleExpandValueChanging: function _handleExpandValueChanging(e) {
        this.expandValueChanging.fire(e);
      },
      _handleLoadingChanged: function _handleLoadingChanged(isLoading) {
        this.loadingChanged.fire(isLoading);
      },
      _handleProgressChanged: function _handleProgressChanged(progress) {
        this.progressChanged.fire(progress);
      },
      _handleFieldsPrepared: function _handleFieldsPrepared(e) {
        this._options.onFieldsPrepared && this._options.onFieldsPrepared(e);
      },
      _createDataSource: function _createDataSource(options) {
        var that = this;
        var dataSourceOptions = options.dataSource;
        var dataSource;
        that._isSharedDataSource = dataSourceOptions instanceof _module.PivotGridDataSource;
        if (that._isSharedDataSource) {
          dataSource = dataSourceOptions;
        } else {
          dataSource = new _module.PivotGridDataSource(dataSourceOptions);
        }
        that._expandValueChangingHandler = that._handleExpandValueChanging.bind(that);
        that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
        that._fieldsPreparedHandler = that._handleFieldsPrepared.bind(that);
        that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
        that._changedHandler = function () {
          that._update();
          that.dataSourceChanged.fire();
        };
        that._progressChangedHandler = function (progress) {
          that._handleProgressChanged(progress * 0.8);
        };
        dataSource.on('changed', that._changedHandler);
        dataSource.on('expandValueChanging', that._expandValueChangingHandler);
        dataSource.on('loadingChanged', that._loadingChangedHandler);
        dataSource.on('progressChanged', that._progressChangedHandler);
        dataSource.on('fieldsPrepared', that._fieldsPreparedHandler);
        dataSource.on('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
        return dataSource;
      },
      getDataSource: function getDataSource() {
        return this._dataSource;
      },
      isLoading: function isLoading() {
        return this._dataSource.isLoading();
      },
      beginLoading: function beginLoading() {
        this._dataSource.beginLoading();
      },
      endLoading: function endLoading() {
        this._dataSource.endLoading();
      },
      _update: function _update() {
        var that = this;
        var dataSource = that._dataSource;
        var options = that._options;
        var columnFields = dataSource.getAreaFields('column');
        var rowFields = dataSource.getAreaFields('row');
        var dataFields = dataSource.getAreaFields('data');
        var dataFieldsForRows = options.dataFieldArea === 'row' ? dataFields : [];
        var dataFieldsForColumns = options.dataFieldArea !== 'row' ? dataFields : [];
        var data = dataSource.getData();
        var hiddenTotals = getHiddenTotals(dataFields);
        var hiddenValues = getHiddenValues(dataFields);
        var hiddenGrandTotals = getHiddenGrandTotalsTotals(dataFields, columnFields);
        var grandTotalsAreHiddenForNotAllDataFields = dataFields.length > 0 ? hiddenGrandTotals.length !== dataFields.length : true;
        var rowOptions = {
          isEmptyGrandTotal: data.isEmptyGrandTotalRow,
          texts: options.texts || {},
          hiddenTotals: hiddenTotals,
          hiddenValues: hiddenValues,
          hiddenGrandTotals: [],
          showTotals: options.showRowTotals,
          showGrandTotals: options.showRowGrandTotals !== false && grandTotalsAreHiddenForNotAllDataFields,
          sortBySummaryPaths: createSortPaths(columnFields, dataFields),
          showTotalsPrior: options.showTotalsPrior === 'rows' || options.showTotalsPrior === 'both',
          showEmpty: !options.hideEmptySummaryCells,
          layout: options.rowHeaderLayout,
          fields: rowFields,
          dataFields: dataFields,
          progress: 0
        };
        var columnOptions = {
          isEmptyGrandTotal: data.isEmptyGrandTotalColumn,
          texts: options.texts || {},
          hiddenTotals: hiddenTotals,
          hiddenValues: hiddenValues,
          hiddenGrandTotals: hiddenGrandTotals,
          showTotals: options.showColumnTotals,
          showTotalsPrior: options.showTotalsPrior === 'columns' || options.showTotalsPrior === 'both',
          showGrandTotals: options.showColumnGrandTotals !== false && grandTotalsAreHiddenForNotAllDataFields,
          sortBySummaryPaths: createSortPaths(rowFields, dataFields),
          showEmpty: !options.hideEmptySummaryCells,
          fields: columnFields,
          dataFields: dataFields,
          progress: 0
        };
        var notifyProgress = function notifyProgress(progress) {
          // - @ts-expect-error
          this.progress = progress;
          that._handleProgressChanged(0.8 + 0.1 * rowOptions.progress + 0.1 * columnOptions.progress);
        };
        rowOptions.notifyProgress = notifyProgress;
        columnOptions.notifyProgress = notifyProgress;
        if (!(0, _type.isDefined)(data.grandTotalRowIndex)) {
          data.grandTotalRowIndex = getHeaderIndexedItems(data.rows, rowOptions).length;
        }
        if (!(0, _type.isDefined)(data.grandTotalColumnIndex)) {
          data.grandTotalColumnIndex = getHeaderIndexedItems(data.columns, columnOptions).length;
        }
        dataSource._changeLoadingCount(1);
        (0, _deferred.when)(createHeaderInfo(data.columns, columnFields, dataFieldsForColumns, true, columnOptions), createHeaderInfo(data.rows, rowFields, dataFieldsForRows, false, rowOptions)).always(function () {
          dataSource._changeLoadingCount(-1);
        }).done(function (columnsInfo, rowsInfo) {
          that._columnsInfo = columnsInfo;
          that._rowsInfo = rowsInfo;
          if (that._rowsScrollController && that._columnsScrollController && that.changed && !that._dataSource.paginate()) {
            that._rowsScrollController.reset(true);
            that._columnsScrollController.reset(true);
            that._lockChanged = true;
            that._rowsScrollController.load();
            that._columnsScrollController.load();
            that._lockChanged = false;
          }
        }).done(function () {
          that._fireChanged();
          if (that._stateStoringController.isEnabled() && !that._dataSource.isLoading()) {
            that._stateStoringController.state(that._dataSource.state());
            that._stateStoringController.save();
          }
        });
      },
      getRowsInfo: function getRowsInfo(getAllData) {
        var that = this;
        var rowsInfo = that._rowsInfo;
        var scrollController = that._rowsScrollController;
        var rowspan;
        if (scrollController && !getAllData) {
          var startIndex = scrollController.beginPageIndex() * that.rowPageSize();
          var endIndex = scrollController.endPageIndex() * that.rowPageSize() + that.rowPageSize();
          var newRowsInfo = [];
          var maxDepth = 1;
          foreachRowInfo(rowsInfo, function (rowInfo, visibleIndex, rowIndex, _, columnIndex) {
            var isVisible = visibleIndex >= startIndex && rowIndex < endIndex;
            var index = rowIndex < startIndex ? 0 : rowIndex - startIndex;
            var cell = rowInfo;
            if (isVisible) {
              newRowsInfo[index] = newRowsInfo[index] || [];
              rowspan = rowIndex < startIndex ? rowInfo.rowspan - (startIndex - rowIndex) || 1 : rowInfo.rowspan;
              if (startIndex + index + rowspan > endIndex) {
                rowspan = endIndex - (index + startIndex) || 1;
              }
              if (rowspan !== rowInfo.rowspan) {
                cell = (0, _extend2.extend)({}, cell, {
                  rowspan: rowspan
                });
              }
              newRowsInfo[index].push(cell);
              maxDepth = math.max(maxDepth, columnIndex + 1);
            } else {
              return false;
            }
            return undefined;
          });
          foreachRowInfo(newRowsInfo,
          // - @ts-expect-error
          function (rowInfo, visibleIndex, rowIndex, columnIndex, realColumnIndex) {
            var colspan = rowInfo.colspan || 1;
            if (realColumnIndex + colspan > maxDepth) {
              newRowsInfo[rowIndex][columnIndex] = (0, _extend2.extend)({}, rowInfo, {
                colspan: maxDepth - realColumnIndex || 1
              });
            }
          });
          return newRowsInfo;
        }
        return rowsInfo;
      },
      getColumnsInfo: function getColumnsInfo(getAllData) {
        var that = this;
        var info = that._columnsInfo;
        var scrollController = that._columnsScrollController;
        if (scrollController && !getAllData) {
          var startIndex = scrollController.beginPageIndex() * that.columnPageSize();
          var endIndex = scrollController.endPageIndex() * that.columnPageSize() + that.columnPageSize();
          info = (0, _uiGrid_core2.createColumnsInfo)(info, startIndex, endIndex);
        }
        return info;
      },
      totalRowCount: function totalRowCount() {
        return this._rowsInfo.length;
      },
      rowPageIndex: function rowPageIndex(index) {
        if (index !== undefined) {
          this._rowPageIndex = index;
        }
        return this._rowPageIndex || 0;
      },
      totalColumnCount: function totalColumnCount() {
        var count = 0;
        if (this._columnsInfo && this._columnsInfo.length) {
          for (var i = 0; i < this._columnsInfo[0].length; i += 1) {
            count += this._columnsInfo[0][i].colspan || 1;
          }
        }
        return count;
      },
      rowPageSize: function rowPageSize(size) {
        if (size !== undefined) {
          this._rowPageSize = size;
        }
        return this._rowPageSize || 20;
      },
      columnPageSize: function columnPageSize(size) {
        if (size !== undefined) {
          this._columnPageSize = size;
        }
        return this._columnPageSize || 20;
      },
      columnPageIndex: function columnPageIndex(index) {
        if (index !== undefined) {
          this._columnPageIndex = index;
        }
        return this._columnPageIndex || 0;
      },
      getCellsInfo: function getCellsInfo(getAllData) {
        var rowsInfo = this.getRowsInfo(getAllData);
        var columnsInfo = this.getColumnsInfo(getAllData);
        var data = this._dataSource.getData();
        var texts = this._options.texts || {};
        return createCellsInfo(rowsInfo, columnsInfo, data, this._dataSource.getAreaFields('data'), this._options.dataFieldArea, texts.dataNotAvailable);
      },
      dispose: function dispose() {
        var that = this;
        if (that._isSharedDataSource) {
          that._dataSource.off('changed', that._changedHandler);
          that._dataSource.off('expandValueChanging', that._expandValueChangingHandler);
          that._dataSource.off('loadingChanged', that._loadingChangedHandler);
          that._dataSource.off('progressChanged', that._progressChangedHandler);
          that._dataSource.off('fieldsPrepared', that._fieldsPreparedHandler);
          that._dataSource.off('customizeStoreLoadOptions', that._customizeStoreLoadOptionsHandler);
        } else {
          that._dataSource.dispose();
        }
        that._columnsScrollController && that._columnsScrollController.dispose();
        that._rowsScrollController && that._rowsScrollController.dispose();
        that._stateStoringController.dispose();
        that.expandValueChanging.empty();
        that.changed.empty();
        that.loadingChanged.empty();
        that.progressChanged.empty();
        that.scrollChanged.empty();
        that.dataSourceChanged.empty();
      }
    };
    proxyMethod(members, 'applyPartialDataSource');
    proxyMethod(members, 'collapseHeaderItem');
    proxyMethod(members, 'expandHeaderItem');
    proxyMethod(members, 'getData');
    proxyMethod(members, 'isEmpty');
    return members;
  }());
  // eslint-disable-next-line @typescript-eslint/naming-convention
  exports.DataController = DataController;
  var DataController__internals = {
    NO_DATA_AVAILABLE_TEXT: NOT_AVAILABLE
  };
  exports.DataController__internals = DataController__internals;
  var _default = {
    DataController: DataController,
    DataController__internals: DataController__internals
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/callbacks","../../../../core/utils/deferred","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../core/class","../../../../core/utils/string","../../../../core/utils/common","../../../../core/utils/type","../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core","../../../../ui/grid_core/ui.grid_core.virtual_columns_core","../../../../ui/grid_core/ui.grid_core.state_storing_core","../data_source/module","../module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/callbacks"), require("../../../../core/utils/deferred"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../core/class"), require("../../../../core/utils/string"), require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../ui/grid_core/ui.grid_core.virtual_scrolling_core"), require("../../../../ui/grid_core/ui.grid_core.virtual_columns_core"), require("../../../../ui/grid_core/ui.grid_core.state_storing_core"), require("../data_source/module"), require("../module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map