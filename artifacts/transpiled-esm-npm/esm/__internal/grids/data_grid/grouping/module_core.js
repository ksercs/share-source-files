import $ from '../../../../core/renderer';
import Class from '../../../../core/class';
// @ts-expect-error
import { normalizeSortingInfo } from '../../../../data/utils';
import { when } from '../../../../core/utils/deferred';
import gridCore from '../module_core';
export function createOffsetFilter(path, storeLoadOptions, lastLevelOnly) {
  var groups = normalizeSortingInfo(storeLoadOptions.group);
  var filter = [];
  for (var i = lastLevelOnly ? path.length - 1 : 0; i < path.length; i++) {
    var filterElement = [];
    for (var j = 0; j <= i; j++) {
      var {
        selector
      } = groups[j];
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
    filter.push(gridCore.combineFilters(filterElement));
  }
  filter = gridCore.combineFilters(filter, 'or');
  return gridCore.combineFilters([filter, storeLoadOptions.filter]);
}
export var GroupingHelper = Class.inherit(function () {
  var findGroupInfoByKey = function findGroupInfoByKey(groupsInfo, key) {
    var {
      hash
    } = groupsInfo;
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
    ctor(dataSourceAdapter) {
      this._dataSource = dataSourceAdapter;
      this.reset();
    },
    reset() {
      this._groupsInfo = [];
      this._totalCountCorrection = 0;
    },
    totalCountCorrection() {
      return this._totalCountCorrection;
    },
    updateTotalItemsCount(totalCountCorrection) {
      this._totalCountCorrection = totalCountCorrection || 0;
    },
    isGroupItemCountable(item) {
      return !this._isVirtualPaging() || !item.isContinuation;
    },
    _isVirtualPaging() {
      var scrollingMode = this._dataSource.option('scrolling.mode');
      return scrollingMode === 'virtual' || scrollingMode === 'infinite';
    },
    itemsCount() {
      var dataSourceAdapter = this._dataSource;
      var dataSource = dataSourceAdapter._dataSource;
      var groupCount = gridCore.normalizeSortingInfo(dataSource.group() || []).length;
      var itemsCount = calculateItemsCount(this, dataSource.items(), groupCount);
      return itemsCount;
    },
    foreachGroups(callback, childrenAtFirst, foreachCollapsedGroups, updateOffsets, updateParentOffsets) {
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
            var {
              children
            } = groupsInfo[i];
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
        return updateOffsets && when.apply($, callbackResults).always(() => {
          that._updateGroupInfoOffsets(groupsInfo, currentParents);
        });
      }
      return foreachGroupsCore(that._groupsInfo, callback, childrenAtFirst, []);
    },
    _updateGroupInfoOffsets(groupsInfo, parents) {
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
      groupsInfo.sort((a, b) => a.offset - b.offset);
    },
    findGroupInfo(path) {
      var that = this;
      var groupInfo;
      var groupsInfo = that._groupsInfo;
      for (var pathIndex = 0; groupsInfo && pathIndex < path.length; pathIndex++) {
        groupInfo = findGroupInfoByKey(groupsInfo, path[pathIndex]);
        groupsInfo = groupInfo && groupInfo.children;
      }
      return groupInfo && groupInfo.data;
    },
    addGroupInfo(groupInfoData) {
      var that = this;
      var groupInfo;
      var {
        path
      } = groupInfoData;
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
    allowCollapseAll() {
      return true;
    },
    refresh(options) {
      var that = this;
      var {
        storeLoadOptions
      } = options;
      var groups = normalizeSortingInfo(storeLoadOptions.group || []);
      var oldGroups = '_group' in that ? normalizeSortingInfo(that._group || []) : groups;
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
    handleDataLoading() {},
    handleDataLoaded(options, callBase) {
      callBase(options);
    },
    handleDataLoadedCore(options, callBase) {
      callBase(options);
    }
  };
}());