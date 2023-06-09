"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
var ui_grid_core_focus_1 = require("../../../../ui/grid_core/ui.grid_core.focus");
var deferred_1 = require("../../../../core/utils/deferred");
var type_1 = require("../../../../core/utils/type");
var common_1 = require("../../../../core/utils/common");
var data_1 = require("../../../../core/utils/data");
var extend_1 = require("../../../../core/utils/extend");
var module_utils_1 = require("../module_utils");
var module_core_1 = __importDefault(require("../module_core"));
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991 /* IE11 */;
module_core_1.default.registerModule('focus', extend_1.extend(true, {}, ui_grid_core_focus_1.focusModule, {
    extenders: {
        controllers: {
            data: {
                changeRowExpand: function (path, isRowClick) {
                    if (this.option('focusedRowEnabled') && Array.isArray(path) && this.isRowExpanded(path)) {
                        var keyboardNavigation = this.getController('keyboardNavigation');
                        if ((!isRowClick || !keyboardNavigation.isKeyboardEnabled()) && this._isFocusedRowInsideGroup(path)) {
                            this.option('focusedRowKey', path);
                        }
                    }
                    return this.callBase.apply(this, arguments);
                },
                _isFocusedRowInsideGroup: function (path) {
                    var columnsController = this.getController('columns');
                    var focusedRowKey = this.option('focusedRowKey');
                    var rowIndex = this.getRowIndexByKey(focusedRowKey);
                    var focusedRow = rowIndex >= 0 && this.getVisibleRows()[rowIndex];
                    var groups = columnsController.getGroupDataSourceParameters(true);
                    if (focusedRow) {
                        for (var i = 0; i < path.length; ++i) {
                            var getter = data_1.compileGetter(groups[i] && groups[i].selector);
                            // @ts-expect-error
                            if (getter(focusedRow.data) !== path[i]) {
                                return false;
                            }
                        }
                    }
                    return true;
                },
                _getGroupPath: function (groupItem, groupCount) {
                    var groupPath = [];
                    var items = [groupItem];
                    while (items && items[0] && groupCount) {
                        var item = items[0];
                        if (item.key !== undefined) {
                            groupPath.push(item.key);
                        }
                        items = item.items;
                        groupCount--;
                    }
                    return groupPath;
                },
                _expandGroupByPath: function (that, groupPath, level) {
                    // @ts-expect-error
                    var d = new deferred_1.Deferred();
                    level++;
                    that.expandRow(groupPath.slice(0, level)).done(function () {
                        if (level === groupPath.length) {
                            d.resolve();
                        }
                        else {
                            that._expandGroupByPath(that, groupPath, level)
                                .done(d.resolve)
                                .fail(d.reject);
                        }
                    }).fail(d.reject);
                    return d.promise();
                },
                _calculateGlobalRowIndexByGroupedData: function (key) {
                    var that = this;
                    var dataSource = that._dataSource;
                    var filter = that._generateFilterByKey(key);
                    // @ts-expect-error
                    var deferred = new deferred_1.Deferred();
                    var isGroupKey = Array.isArray(key);
                    var group = dataSource.group();
                    if (isGroupKey) {
                        return deferred.resolve(-1).promise();
                    }
                    if (!dataSource._grouping._updatePagingOptions) {
                        that._calculateGlobalRowIndexByFlatData(key, null, true)
                            .done(deferred.resolve)
                            .fail(deferred.reject);
                        return deferred;
                    }
                    dataSource.load({
                        filter: that._concatWithCombinedFilter(filter),
                        group: group,
                    }).done(function (data) {
                        if (!data || data.length === 0 || !type_1.isDefined(data[0].key) || data[0].key === -1) {
                            return deferred.resolve(-1).promise();
                        }
                        var groupPath = that._getGroupPath(data[0], group.length);
                        that._expandGroupByPath(that, groupPath, 0).done(function () {
                            that._calculateExpandedRowGlobalIndex(deferred, key, groupPath, group);
                        }).fail(deferred.reject);
                    }).fail(deferred.reject);
                    return deferred.promise();
                },
                _calculateExpandedRowGlobalIndex: function (deferred, key, groupPath, group) {
                    var groupFilter = module_utils_1.createGroupFilter(groupPath, { group: group });
                    var dataSource = this._dataSource;
                    var scrollingMode = this.option('scrolling.mode');
                    var isVirtualScrolling = scrollingMode === 'virtual' || scrollingMode === 'infinite';
                    var pageSize = dataSource.pageSize();
                    var groupOffset;
                    dataSource._grouping._updatePagingOptions({ skip: 0, take: MAX_SAFE_INTEGER }, function (groupInfo, totalOffset) {
                        if (common_1.equalByValue(groupInfo.path, groupPath)) {
                            groupOffset = totalOffset;
                        }
                    });
                    this._calculateGlobalRowIndexByFlatData(key, groupFilter).done(function (dataOffset) {
                        var count;
                        var groupContinuationCount;
                        if (dataOffset < 0) {
                            deferred.resolve(-1);
                            return;
                        }
                        var currentPageOffset = (groupOffset % pageSize) || pageSize;
                        count = currentPageOffset + dataOffset - groupPath.length;
                        if (isVirtualScrolling) {
                            groupContinuationCount = 0;
                        }
                        else {
                            groupContinuationCount = Math.floor(count / (pageSize - groupPath.length)) * groupPath.length;
                        }
                        count = groupOffset + dataOffset + groupContinuationCount;
                        deferred.resolve(count);
                    }).fail(deferred.reject);
                },
            },
        },
    },
}));