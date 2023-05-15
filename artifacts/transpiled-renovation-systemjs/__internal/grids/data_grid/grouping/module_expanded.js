!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/data_grid/grouping/module_expanded.js"], ["../../../../core/utils/data","../../../../data/utils","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../data/store_helper","../../../../data/query","../../../../core/utils/deferred","../module_core","./module_core","../module_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/data_grid/grouping/module_expanded.js", ["../../../../core/utils/data", "../../../../data/utils", "../../../../core/utils/iterator", "../../../../core/utils/extend", "../../../../data/store_helper", "../../../../data/query", "../../../../core/utils/deferred", "../module_core", "./module_core", "../module_utils"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.loadTotalCount = exports.GroupingHelper = void 0;
  var _data = $__require("../../../../core/utils/data");
  var _utils = $__require("../../../../data/utils");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _extend = $__require("../../../../core/utils/extend");
  var _store_helper = _interopRequireDefault($__require("../../../../data/store_helper"));
  var _query = _interopRequireDefault($__require("../../../../data/query"));
  var _deferred = $__require("../../../../core/utils/deferred");
  var _module_core = _interopRequireDefault($__require("../module_core"));
  var _module_core2 = $__require("./module_core");
  var _module_utils = $__require("../module_utils");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  // @ts-expect-error

  var loadTotalCount = function loadTotalCount(dataSource, options) {
    // @ts-expect-error
    var d = new _deferred.Deferred();
    var loadOptions = (0, _extend.extend)({
      skip: 0,
      take: 1,
      requireTotalCount: true
    }, options);
    dataSource.load(loadOptions).done(function (data, extra) {
      d.resolve(extra && extra.totalCount);
    }).fail(d.reject.bind(d));
    return d;
  };
  /// #DEBUG
  exports.loadTotalCount = loadTotalCount;
  /// #ENDDEBUG
  var GroupingHelper = _module_core2.GroupingHelper.inherit(function () {
    var foreachCollapsedGroups = function foreachCollapsedGroups(that, callback, updateOffsets) {
      return that.foreachGroups(function (groupInfo) {
        if (!groupInfo.isExpanded) {
          return callback(groupInfo);
        }
      }, false, false, updateOffsets, true);
    };
    var correctSkipLoadOption = function correctSkipLoadOption(that, skip) {
      var skipCorrection = 0;
      var resultSkip = skip || 0;
      if (skip) {
        // @ts-expect-error
        foreachCollapsedGroups(that, function (groupInfo) {
          if (groupInfo.offset - skipCorrection >= skip) {
            return false;
          }
          skipCorrection += groupInfo.count - 1;
        });
        resultSkip += skipCorrection;
      }
      return resultSkip;
    };
    var processGroupItems = function processGroupItems(that, items, path, offset, skipFirstItem, take) {
      var removeLastItemsCount = 0;
      var needRemoveFirstItem = false;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.items !== undefined) {
          path.push(item.key);
          var groupInfo = that.findGroupInfo(path);
          if (groupInfo && !groupInfo.isExpanded) {
            item.collapsedItems = item.items;
            item.items = null;
            offset += groupInfo.count;
            take--;
            if (take < 0) {
              removeLastItemsCount++;
            }
            if (skipFirstItem) {
              needRemoveFirstItem = true;
            }
          } else if (item.items) {
            var offsetInfo = processGroupItems(that, item.items, path, offset, skipFirstItem, take);
            if (skipFirstItem) {
              if (offsetInfo.offset - offset > 1) {
                item.isContinuation = true;
              } else {
                needRemoveFirstItem = true;
              }
            }
            offset = offsetInfo.offset;
            take = offsetInfo.take;
            if (take < 0) {
              if (item.items.length) {
                item.isContinuationOnNextPage = true;
              } else {
                removeLastItemsCount++;
              }
            }
          }
          path.pop();
        } else {
          if (skipFirstItem) {
            needRemoveFirstItem = true;
          }
          offset++;
          take--;
          if (take < 0) {
            removeLastItemsCount++;
          }
        }
        skipFirstItem = false;
      }
      if (needRemoveFirstItem) {
        items.splice(0, 1);
      }
      if (removeLastItemsCount) {
        items.splice(-removeLastItemsCount, removeLastItemsCount);
      }
      return {
        offset: offset,
        take: take
      };
    };
    var pathEquals = function pathEquals(path1, path2) {
      if (path1.length !== path2.length) return false;
      for (var i = 0; i < path1.length; i++) {
        if (!(0, _utils.keysEqual)(null, path1[i], path2[i])) {
          return false;
        }
      }
      return true;
    };
    var updateGroupOffsets = function updateGroupOffsets(that, items, path, offset, additionalGroupInfo) {
      if (!items) return;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if ('key' in item && item.items !== undefined) {
          path.push(item.key);
          if (additionalGroupInfo && pathEquals(additionalGroupInfo.path, path) && !item.isContinuation) {
            additionalGroupInfo.offset = offset;
          }
          var groupInfo = that.findGroupInfo(path);
          if (groupInfo && !item.isContinuation) {
            groupInfo.offset = offset;
          }
          if (groupInfo && !groupInfo.isExpanded) {
            offset += groupInfo.count;
          } else {
            offset = updateGroupOffsets(that, item.items, path, offset, additionalGroupInfo);
          }
          path.pop();
        } else {
          offset++;
        }
      }
      return offset;
    };
    var removeGroupLoadOption = function removeGroupLoadOption(storeLoadOptions, loadOptions) {
      if (loadOptions.group) {
        var groups = _module_core.default.normalizeSortingInfo(loadOptions.group);
        var sorts = _module_core.default.normalizeSortingInfo(storeLoadOptions.sort);
        storeLoadOptions.sort = _store_helper.default.arrangeSortingInfo(groups, sorts);
        delete loadOptions.group;
      }
    };
    var createNotGroupFilter = function createNotGroupFilter(path, storeLoadOptions, group) {
      var groups = _module_core.default.normalizeSortingInfo(group || storeLoadOptions.group);
      var filter = [];
      for (var i = 0; i < path.length; i++) {
        var filterElement = [];
        for (var j = 0; j <= i; j++) {
          filterElement.push([groups[j].selector, i === j ? '<>' : '=', path[j]]);
        }
        filter.push(_module_core.default.combineFilters(filterElement));
      }
      filter = _module_core.default.combineFilters(filter, 'or');
      return _module_core.default.combineFilters([filter, storeLoadOptions.filter]);
    };
    var getGroupCount = function getGroupCount(item, groupCount) {
      var count = item.count || item.items.length;
      if (!item.count && groupCount > 1) {
        count = 0;
        for (var i = 0; i < item.items.length; i++) {
          count += getGroupCount(item.items[i], groupCount - 1);
        }
      }
      return count;
    };
    return {
      handleDataLoading: function handleDataLoading(options) {
        var that = this;
        var storeLoadOptions = options.storeLoadOptions;
        var collapsedGroups = [];
        var collapsedItemsCount = 0;
        var skipFirstItem = false;
        var take;
        var group = options.loadOptions.group;
        var skipCorrection = 0;
        removeGroupLoadOption(storeLoadOptions, options.loadOptions);
        options.group = options.group || group;
        if (options.isCustomLoading) {
          return;
        }
        var loadOptions = (0, _extend.extend)({}, storeLoadOptions);
        loadOptions.skip = correctSkipLoadOption(that, storeLoadOptions.skip);
        if (loadOptions.skip && loadOptions.take && group) {
          loadOptions.skip--;
          loadOptions.take++;
          skipFirstItem = true;
        }
        if (loadOptions.take && group) {
          take = loadOptions.take;
          loadOptions.take++;
        }
        // @ts-expect-error
        foreachCollapsedGroups(that, function (groupInfo) {
          if (groupInfo.offset >= loadOptions.skip + loadOptions.take + skipCorrection) {
            return false;
          }
          if (groupInfo.offset >= loadOptions.skip + skipCorrection && groupInfo.count) {
            skipCorrection += groupInfo.count - 1;
            collapsedGroups.push(groupInfo);
            collapsedItemsCount += groupInfo.count;
          }
        });
        (0, _iterator.each)(collapsedGroups, function () {
          loadOptions.filter = createNotGroupFilter(this.path, loadOptions, group);
        });
        options.storeLoadOptions = loadOptions;
        options.collapsedGroups = collapsedGroups;
        options.collapsedItemsCount = collapsedItemsCount;
        options.skip = loadOptions.skip || 0;
        options.skipFirstItem = skipFirstItem;
        options.take = take;
      },
      handleDataLoaded: function handleDataLoaded(options, callBase) {
        var that = this;
        var collapsedGroups = options.collapsedGroups;
        var groups = _module_core.default.normalizeSortingInfo(options.group);
        var groupCount = groups.length;
        function appendCollapsedPath(data, path, groups, collapsedGroup, offset) {
          if (!data || !path.length || !groups.length) return;
          var keyValue;
          var i;
          var pathValue = (0, _data.toComparable)(path[0], true);
          for (i = 0; i < data.length; i++) {
            keyValue = (0, _data.toComparable)(data[i].key, true);
            if (offset >= collapsedGroup.offset || pathValue === keyValue) {
              break;
            } else {
              offset += getGroupCount(data[i], groups.length);
            }
          }
          if (!data.length || pathValue !== keyValue) {
            data.splice(i, 0, {
              key: path[0],
              items: [],
              count: path.length === 1 ? collapsedGroup.count : undefined
            });
          }
          appendCollapsedPath(data[i].items, path.slice(1), groups.slice(1), collapsedGroup, offset);
        }
        if (options.collapsedItemsCount && options.extra && options.extra.totalCount >= 0) {
          if (!options.extra._totalCountWasIncreasedByCollapsedItems) {
            options.extra.totalCount += options.collapsedItemsCount;
            options.extra._totalCountWasIncreasedByCollapsedItems = true;
          }
        }
        callBase(options);
        if (groupCount) {
          var data = options.data;
          var query = (0, _query.default)(data);
          _store_helper.default.multiLevelGroup(query, groups).enumerate().done(function (groupedData) {
            data = groupedData;
          });
          if (collapsedGroups) {
            for (var pathIndex = 0; pathIndex < collapsedGroups.length; pathIndex++) {
              appendCollapsedPath(data, collapsedGroups[pathIndex].path, groups, collapsedGroups[pathIndex], options.skip);
            }
          }
          if (!options.isCustomLoading) {
            processGroupItems(that, data, [], options.skip, options.skipFirstItem, options.take);
          }
          options.data = data;
        }
      },
      isGroupItemCountable: function isGroupItemCountable(item) {
        return item.items === null;
      },
      updateTotalItemsCount: function updateTotalItemsCount() {
        var itemsCountCorrection = 0;
        foreachCollapsedGroups(this, function (groupInfo) {
          if (groupInfo.count) {
            itemsCountCorrection -= groupInfo.count - 1;
          }
        });
        this.callBase(itemsCountCorrection);
      },
      changeRowExpand: function changeRowExpand(path) {
        var that = this;
        var dataSource = that._dataSource;
        var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : dataSource.pageIndex();
        var dataSourceItems = dataSource.items();
        var offset = correctSkipLoadOption(that, beginPageIndex * dataSource.pageSize());
        var groupInfo = that.findGroupInfo(path);
        var groupCountQuery;
        if (groupInfo && !groupInfo.isExpanded) {
          // @ts-expect-error
          groupCountQuery = new _deferred.Deferred().resolve(groupInfo.count);
        } else {
          groupCountQuery = loadTotalCount(dataSource, {
            filter: (0, _module_utils.createGroupFilter)(path, {
              filter: dataSource.filter(),
              group: dataSource.group()
            })
          });
        }
        return (0, _deferred.when)(groupCountQuery).done(function (count) {
          // eslint-disable-next-line radix
          count = parseInt(count.length ? count[0] : count);
          if (groupInfo) {
            updateGroupOffsets(that, dataSourceItems, [], offset);
            groupInfo.isExpanded = !groupInfo.isExpanded;
            groupInfo.count = count;
          } else {
            groupInfo = {
              offset: -1,
              count: count,
              path: path,
              isExpanded: false
            };
            updateGroupOffsets(that, dataSourceItems, [], offset, groupInfo);
            if (groupInfo.offset >= 0) {
              that.addGroupInfo(groupInfo);
            }
          }
          that.updateTotalItemsCount();
        }).fail(function () {
          dataSource._eventsStrategy.fireEvent('loadError', arguments);
        });
      },
      allowCollapseAll: function allowCollapseAll() {
        return false;
      },
      refresh: function refresh(options, operationTypes) {
        var that = this;
        var storeLoadOptions = options.storeLoadOptions;
        var dataSource = that._dataSource;
        this.callBase.apply(this, arguments);
        if (operationTypes.reload) {
          return foreachCollapsedGroups(that, function (groupInfo) {
            var groupCountQuery = loadTotalCount(dataSource, {
              filter: (0, _module_utils.createGroupFilter)(groupInfo.path, storeLoadOptions)
            });
            var groupOffsetQuery = loadTotalCount(dataSource, {
              filter: (0, _module_core2.createOffsetFilter)(groupInfo.path, storeLoadOptions)
            });
            return (0, _deferred.when)(groupOffsetQuery, groupCountQuery).done(function (offset, count) {
              // eslint-disable-next-line radix
              offset = parseInt(offset.length ? offset[0] : offset);
              // eslint-disable-next-line radix
              count = parseInt(count.length ? count[0] : count);
              groupInfo.offset = offset;
              if (groupInfo.count !== count) {
                groupInfo.count = count;
                that.updateTotalItemsCount();
              }
            });
          }, true);
        }
      }
    };
  }());
  exports.GroupingHelper = GroupingHelper;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/utils/data","../../../../data/utils","../../../../core/utils/iterator","../../../../core/utils/extend","../../../../data/store_helper","../../../../data/query","../../../../core/utils/deferred","../module_core","./module_core","../module_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/utils/data"), require("../../../../data/utils"), require("../../../../core/utils/iterator"), require("../../../../core/utils/extend"), require("../../../../data/store_helper"), require("../../../../data/query"), require("../../../../core/utils/deferred"), require("../module_core"), require("./module_core"), require("../module_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_expanded.js.map