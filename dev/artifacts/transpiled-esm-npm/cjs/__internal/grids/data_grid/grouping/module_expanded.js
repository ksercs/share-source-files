"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupingHelper = exports.loadTotalCount = void 0;
// @ts-expect-error
var data_1 = require("../../../../core/utils/data");
// @ts-expect-error
var utils_1 = require("../../../../data/utils");
var iterator_1 = require("../../../../core/utils/iterator");
var extend_1 = require("../../../../core/utils/extend");
var store_helper_1 = __importDefault(require("../../../../data/store_helper"));
var query_1 = __importDefault(require("../../../../data/query"));
var deferred_1 = require("../../../../core/utils/deferred");
var module_core_1 = __importDefault(require("../module_core"));
var module_core_2 = require("./module_core");
var module_utils_1 = require("../module_utils");
var loadTotalCount = function (dataSource, options) {
    // @ts-expect-error
    var d = new deferred_1.Deferred();
    var loadOptions = extend_1.extend({ skip: 0, take: 1, requireTotalCount: true }, options);
    dataSource.load(loadOptions).done(function (data, extra) {
        d.resolve(extra && extra.totalCount);
    }).fail(d.reject.bind(d));
    return d;
};
exports.loadTotalCount = loadTotalCount;
/// #ENDDEBUG
exports.GroupingHelper = module_core_2.GroupingHelper.inherit((function () {
    var foreachCollapsedGroups = function (that, callback, updateOffsets) {
        return that.foreachGroups(function (groupInfo) {
            if (!groupInfo.isExpanded) {
                return callback(groupInfo);
            }
        }, false, false, updateOffsets, true);
    };
    var correctSkipLoadOption = function (that, skip) {
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
    var processGroupItems = function (that, items, path, offset, skipFirstItem, take) {
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
                }
                else if (item.items) {
                    var offsetInfo = processGroupItems(that, item.items, path, offset, skipFirstItem, take);
                    if (skipFirstItem) {
                        if (offsetInfo.offset - offset > 1) {
                            item.isContinuation = true;
                        }
                        else {
                            needRemoveFirstItem = true;
                        }
                    }
                    offset = offsetInfo.offset;
                    take = offsetInfo.take;
                    if (take < 0) {
                        if (item.items.length) {
                            item.isContinuationOnNextPage = true;
                        }
                        else {
                            removeLastItemsCount++;
                        }
                    }
                }
                path.pop();
            }
            else {
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
            take: take,
        };
    };
    var pathEquals = function (path1, path2) {
        if (path1.length !== path2.length)
            return false;
        for (var i = 0; i < path1.length; i++) {
            if (!utils_1.keysEqual(null, path1[i], path2[i])) {
                return false;
            }
        }
        return true;
    };
    var updateGroupOffsets = function (that, items, path, offset, additionalGroupInfo) {
        if (!items)
            return;
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
                }
                else {
                    offset = updateGroupOffsets(that, item.items, path, offset, additionalGroupInfo);
                }
                path.pop();
            }
            else {
                offset++;
            }
        }
        return offset;
    };
    var removeGroupLoadOption = function (storeLoadOptions, loadOptions) {
        if (loadOptions.group) {
            var groups = module_core_1.default.normalizeSortingInfo(loadOptions.group);
            var sorts = module_core_1.default.normalizeSortingInfo(storeLoadOptions.sort);
            storeLoadOptions.sort = store_helper_1.default.arrangeSortingInfo(groups, sorts);
            delete loadOptions.group;
        }
    };
    var createNotGroupFilter = function (path, storeLoadOptions, group) {
        var groups = module_core_1.default.normalizeSortingInfo(group || storeLoadOptions.group);
        var filter = [];
        for (var i = 0; i < path.length; i++) {
            var filterElement = [];
            for (var j = 0; j <= i; j++) {
                filterElement.push([groups[j].selector, i === j ? '<>' : '=', path[j]]);
            }
            filter.push(module_core_1.default.combineFilters(filterElement));
        }
        filter = module_core_1.default.combineFilters(filter, 'or');
        return module_core_1.default.combineFilters([filter, storeLoadOptions.filter]);
    };
    var getGroupCount = function (item, groupCount) {
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
        handleDataLoading: function (options) {
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
            var loadOptions = extend_1.extend({}, storeLoadOptions);
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
            iterator_1.each(collapsedGroups, function () {
                loadOptions.filter = createNotGroupFilter(this.path, loadOptions, group);
            });
            options.storeLoadOptions = loadOptions;
            options.collapsedGroups = collapsedGroups;
            options.collapsedItemsCount = collapsedItemsCount;
            options.skip = loadOptions.skip || 0;
            options.skipFirstItem = skipFirstItem;
            options.take = take;
        },
        handleDataLoaded: function (options, callBase) {
            var that = this;
            var collapsedGroups = options.collapsedGroups;
            var groups = module_core_1.default.normalizeSortingInfo(options.group);
            var groupCount = groups.length;
            function appendCollapsedPath(data, path, groups, collapsedGroup, offset) {
                if (!data || !path.length || !groups.length)
                    return;
                var keyValue;
                var i;
                var pathValue = data_1.toComparable(path[0], true);
                for (i = 0; i < data.length; i++) {
                    keyValue = data_1.toComparable(data[i].key, true);
                    if (offset >= collapsedGroup.offset || pathValue === keyValue) {
                        break;
                    }
                    else {
                        offset += getGroupCount(data[i], groups.length);
                    }
                }
                if (!data.length || pathValue !== keyValue) {
                    data.splice(i, 0, { key: path[0], items: [], count: path.length === 1 ? collapsedGroup.count : undefined });
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
                var data_2 = options.data;
                var query = query_1.default(data_2);
                store_helper_1.default.multiLevelGroup(query, groups).enumerate().done(function (groupedData) {
                    data_2 = groupedData;
                });
                if (collapsedGroups) {
                    for (var pathIndex = 0; pathIndex < collapsedGroups.length; pathIndex++) {
                        appendCollapsedPath(data_2, collapsedGroups[pathIndex].path, groups, collapsedGroups[pathIndex], options.skip);
                    }
                }
                if (!options.isCustomLoading) {
                    processGroupItems(that, data_2, [], options.skip, options.skipFirstItem, options.take);
                }
                options.data = data_2;
            }
        },
        isGroupItemCountable: function (item) {
            return item.items === null;
        },
        updateTotalItemsCount: function () {
            var itemsCountCorrection = 0;
            foreachCollapsedGroups(this, function (groupInfo) {
                if (groupInfo.count) {
                    itemsCountCorrection -= groupInfo.count - 1;
                }
            });
            this.callBase(itemsCountCorrection);
        },
        changeRowExpand: function (path) {
            var that = this;
            var dataSource = that._dataSource;
            var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : dataSource.pageIndex();
            var dataSourceItems = dataSource.items();
            var offset = correctSkipLoadOption(that, beginPageIndex * dataSource.pageSize());
            var groupInfo = that.findGroupInfo(path);
            var groupCountQuery;
            if (groupInfo && !groupInfo.isExpanded) {
                // @ts-expect-error
                groupCountQuery = new deferred_1.Deferred().resolve(groupInfo.count);
            }
            else {
                groupCountQuery = loadTotalCount(dataSource, {
                    filter: module_utils_1.createGroupFilter(path, {
                        filter: dataSource.filter(),
                        group: dataSource.group(),
                    }),
                });
            }
            return deferred_1.when(groupCountQuery).done(function (count) {
                // eslint-disable-next-line radix
                count = parseInt(count.length ? count[0] : count);
                if (groupInfo) {
                    updateGroupOffsets(that, dataSourceItems, [], offset);
                    groupInfo.isExpanded = !groupInfo.isExpanded;
                    groupInfo.count = count;
                }
                else {
                    groupInfo = {
                        offset: -1,
                        count: count,
                        path: path,
                        isExpanded: false,
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
        allowCollapseAll: function () {
            return false;
        },
        refresh: function (options, operationTypes) {
            var that = this;
            var storeLoadOptions = options.storeLoadOptions;
            var dataSource = that._dataSource;
            this.callBase.apply(this, arguments);
            if (operationTypes.reload) {
                return foreachCollapsedGroups(that, function (groupInfo) {
                    var groupCountQuery = loadTotalCount(dataSource, { filter: module_utils_1.createGroupFilter(groupInfo.path, storeLoadOptions) });
                    var groupOffsetQuery = loadTotalCount(dataSource, { filter: module_core_2.createOffsetFilter(groupInfo.path, storeLoadOptions) });
                    return deferred_1.when(groupOffsetQuery, groupCountQuery).done(function (offset, count) {
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
        },
    };
})());