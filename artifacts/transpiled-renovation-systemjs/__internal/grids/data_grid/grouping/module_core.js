!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/data_grid/grouping/module_core.js"], ["../../../../core/renderer","../../../../core/class","../../../../data/utils","../../../../core/utils/deferred","../module_core"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/data_grid/grouping/module_core.js", ["../../../../core/renderer", "../../../../core/class", "../../../../data/utils", "../../../../core/utils/deferred", "../module_core"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GroupingHelper = void 0;
  exports.createOffsetFilter = createOffsetFilter;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _class = _interopRequireDefault($__require("../../../../core/class"));
  var _utils = $__require("../../../../data/utils");
  var _deferred = $__require("../../../../core/utils/deferred");
  var _module_core = _interopRequireDefault($__require("../module_core"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // @ts-expect-error

  function createOffsetFilter(path, storeLoadOptions, lastLevelOnly) {
    var groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group);
    var filter = [];
    for (var i = lastLevelOnly ? path.length - 1 : 0; i < path.length; i++) {
      var filterElement = [];
      for (var j = 0; j <= i; j++) {
        var selector = groups[j].selector;
        if (i === j && (path[j] === null || path[j] === false || path[j] === true)) {
          if (path[j] === false) {
            filterElement.push([selector, '=', groups[j].desc ? true : null]);
          } else if (path[j] ? !groups[j].desc : groups[j].desc) {
            filterElement.push([selector, '<>', path[j]]);
          } else {
            filterElement.push([selector, '<>', null]);
            filterElement.push([selector, '=', null]);
          }
        } else {
          var currentFilter = [selector, i === j ? groups[j].desc ? '>' : '<' : '=', path[j]];
          if (currentFilter[1] === '<') {
            filterElement.push([currentFilter, 'or', [selector, '=', null]]);
          } else {
            filterElement.push(currentFilter);
          }
        }
      }
      filter.push(_module_core.default.combineFilters(filterElement));
    }
    filter = _module_core.default.combineFilters(filter, 'or');
    return _module_core.default.combineFilters([filter, storeLoadOptions.filter]);
  }
  var GroupingHelper = _class.default.inherit(function () {
    var findGroupInfoByKey = function findGroupInfoByKey(groupsInfo, key) {
      var hash = groupsInfo.hash;
      return hash && hash[JSON.stringify(key)];
    };
    var getGroupInfoIndexByOffset = function getGroupInfoIndexByOffset(groupsInfo, offset) {
      var leftIndex = 0;
      var rightIndex = groupsInfo.length - 1;
      if (!groupsInfo.length) {
        return 0;
      }
      do {
        var middleIndex = rightIndex + leftIndex >> 1;
        if (groupsInfo[middleIndex].offset > offset) {
          rightIndex = middleIndex;
        } else {
          leftIndex = middleIndex;
        }
      } while (rightIndex - leftIndex > 1);
      var index;
      for (index = leftIndex; index <= rightIndex; index++) {
        if (groupsInfo[index].offset > offset) {
          break;
        }
      }
      return index;
    };
    var cleanGroupsInfo = function cleanGroupsInfo(groupsInfo, groupIndex, groupsCount) {
      for (var i = 0; i < groupsInfo.length; i++) {
        if (groupIndex + 1 >= groupsCount) {
          groupsInfo[i].children = [];
        } else {
          cleanGroupsInfo(groupsInfo[i].children, groupIndex + 1, groupsCount);
        }
      }
    };
    var calculateItemsCount = function calculateItemsCount(that, items, groupsCount) {
      var result = 0;
      if (items) {
        if (!groupsCount) {
          result = items.length;
        } else {
          for (var i = 0; i < items.length; i++) {
            if (that.isGroupItemCountable(items[i])) {
              result++;
            }
            result += calculateItemsCount(that, items[i].items, groupsCount - 1);
          }
        }
      }
      return result;
    };
    return {
      ctor: function ctor(dataSourceAdapter) {
        this._dataSource = dataSourceAdapter;
        this.reset();
      },
      reset: function reset() {
        this._groupsInfo = [];
        this._totalCountCorrection = 0;
      },
      totalCountCorrection: function totalCountCorrection() {
        return this._totalCountCorrection;
      },
      updateTotalItemsCount: function updateTotalItemsCount(totalCountCorrection) {
        this._totalCountCorrection = totalCountCorrection || 0;
      },
      isGroupItemCountable: function isGroupItemCountable(item) {
        return !this._isVirtualPaging() || !item.isContinuation;
      },
      _isVirtualPaging: function _isVirtualPaging() {
        var scrollingMode = this._dataSource.option('scrolling.mode');
        return scrollingMode === 'virtual' || scrollingMode === 'infinite';
      },
      itemsCount: function itemsCount() {
        var dataSourceAdapter = this._dataSource;
        var dataSource = dataSourceAdapter._dataSource;
        var groupCount = _module_core.default.normalizeSortingInfo(dataSource.group() || []).length;
        var itemsCount = calculateItemsCount(this, dataSource.items(), groupCount);
        return itemsCount;
      },
      foreachGroups: function foreachGroups(callback, childrenAtFirst, foreachCollapsedGroups, updateOffsets, updateParentOffsets) {
        var that = this;
        function foreachGroupsCore(groupsInfo, callback, childrenAtFirst, parents) {
          var callbackResults = [];
          function executeCallback(callback, data, parents, callbackResults) {
            var callbackResult = data && callback(data, parents);
            callbackResult && callbackResults.push(callbackResult);
            return callbackResult;
          }
          for (var i = 0; i < groupsInfo.length; i++) {
            parents.push(groupsInfo[i].data);
            if (!childrenAtFirst && executeCallback(callback, groupsInfo[i].data, parents, callbackResults) === false) {
              return false;
            }
            if (!groupsInfo[i].data || groupsInfo[i].data.isExpanded || foreachCollapsedGroups) {
              var children = groupsInfo[i].children;
              var callbackResult = children.length && foreachGroupsCore(children, callback, childrenAtFirst, parents);
              callbackResult && callbackResults.push(callbackResult);
              if (callbackResult === false) {
                return false;
              }
            }
            if (childrenAtFirst && executeCallback(callback, groupsInfo[i].data, parents, callbackResults) === false) {
              return false;
            }
            if (!groupsInfo[i].data || groupsInfo[i].data.offset !== groupsInfo[i].offset) {
              updateOffsets = true;
            }
            parents.pop();
          }
          var currentParents = updateParentOffsets && parents.slice(0);
          return updateOffsets && _deferred.when.apply(_renderer.default, callbackResults).always(function () {
            that._updateGroupInfoOffsets(groupsInfo, currentParents);
          });
        }
        return foreachGroupsCore(that._groupsInfo, callback, childrenAtFirst, []);
      },
      _updateGroupInfoOffsets: function _updateGroupInfoOffsets(groupsInfo, parents) {
        parents = parents || [];
        for (var index = 0; index < groupsInfo.length; index++) {
          var groupInfo = groupsInfo[index];
          if (groupInfo.data && groupInfo.data.offset !== groupInfo.offset) {
            groupInfo.offset = groupInfo.data.offset;
            for (var parentIndex = 0; parentIndex < parents.length; parentIndex++) {
              parents[parentIndex].offset = groupInfo.offset;
            }
          }
        }
        groupsInfo.sort(function (a, b) {
          return a.offset - b.offset;
        });
      },
      findGroupInfo: function findGroupInfo(path) {
        var that = this;
        var groupInfo;
        var groupsInfo = that._groupsInfo;
        for (var pathIndex = 0; groupsInfo && pathIndex < path.length; pathIndex++) {
          groupInfo = findGroupInfoByKey(groupsInfo, path[pathIndex]);
          groupsInfo = groupInfo && groupInfo.children;
        }
        return groupInfo && groupInfo.data;
      },
      addGroupInfo: function addGroupInfo(groupInfoData) {
        var that = this;
        var groupInfo;
        var path = groupInfoData.path;
        var groupsInfo = that._groupsInfo;
        for (var pathIndex = 0; pathIndex < path.length; pathIndex++) {
          groupInfo = findGroupInfoByKey(groupsInfo, path[pathIndex]);
          if (!groupInfo) {
            groupInfo = {
              key: path[pathIndex],
              offset: groupInfoData.offset,
              data: {
                offset: groupInfoData.offset,
                isExpanded: true,
                path: path.slice(0, pathIndex + 1)
              },
              children: []
            };
            var index = getGroupInfoIndexByOffset(groupsInfo, groupInfoData.offset);
            groupsInfo.splice(index, 0, groupInfo);
            groupsInfo.hash = groupsInfo.hash || {};
            groupsInfo.hash[JSON.stringify(groupInfo.key)] = groupInfo;
          }
          if (pathIndex === path.length - 1) {
            groupInfo.data = groupInfoData;
            if (groupInfo.offset !== groupInfoData.offset) {
              that._updateGroupInfoOffsets(groupsInfo);
            }
          }
          groupsInfo = groupInfo.children;
        }
      },
      allowCollapseAll: function allowCollapseAll() {
        return true;
      },
      refresh: function refresh(options) {
        var that = this;
        var storeLoadOptions = options.storeLoadOptions;
        var groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group || []);
        var oldGroups = '_group' in that ? (0, _utils.normalizeSortingInfo)(that._group || []) : groups;
        var groupsCount = Math.min(oldGroups.length, groups.length);
        that._group = storeLoadOptions.group;
        for (var groupIndex = 0; groupIndex < groupsCount; groupIndex++) {
          if (oldGroups[groupIndex].selector !== groups[groupIndex].selector) {
            groupsCount = groupIndex;
            break;
          }
        }
        if (!groupsCount) {
          that.reset();
        } else {
          cleanGroupsInfo(that._groupsInfo, 0, groupsCount);
        }
      },
      handleDataLoading: function handleDataLoading() {},
      handleDataLoaded: function handleDataLoaded(options, callBase) {
        callBase(options);
      },
      handleDataLoadedCore: function handleDataLoadedCore(options, callBase) {
        callBase(options);
      }
    };
  }());
  exports.GroupingHelper = GroupingHelper;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/class","../../../../data/utils","../../../../core/utils/deferred","../module_core"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/class"), require("../../../../data/utils"), require("../../../../core/utils/deferred"), require("../module_core"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_core.js.map