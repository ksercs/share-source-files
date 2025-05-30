/**
* DevExtreme (bundles/__internal/grids/data_grid/focus/m_focus.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _common = require("../../../../core/utils/common");
var _data = require("../../../../core/utils/data");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _m_focus = require("../../../grids/grid_core/focus/m_focus");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_utils = require("../m_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991 /* IE11 */;
_m_core.default.registerModule('focus', (0, _extend.extend)(true, {}, _m_focus.focusModule, {
  extenders: {
    controllers: {
      data: function data(Base) {
        return /*#__PURE__*/function (_Base$inherit) {
          _inheritsLoose(FocusDataControllerExtender, _Base$inherit);
          function FocusDataControllerExtender() {
            return _Base$inherit.apply(this, arguments) || this;
          }
          var _proto = FocusDataControllerExtender.prototype;
          _proto.changeRowExpand = function changeRowExpand(path, isRowClick) {
            if (this.option('focusedRowEnabled') && Array.isArray(path) && this.isRowExpanded(path)) {
              var keyboardNavigation = this.getController('keyboardNavigation');
              if ((!isRowClick || !keyboardNavigation.isKeyboardEnabled()) && this._isFocusedRowInsideGroup(path)) {
                this.option('focusedRowKey', path);
              }
            }
            return _Base$inherit.prototype.changeRowExpand.call(this, path, isRowClick);
          };
          _proto._isFocusedRowInsideGroup = function _isFocusedRowInsideGroup(path) {
            var columnsController = this.getController('columns');
            var focusedRowKey = this.option('focusedRowKey');
            var rowIndex = this.getRowIndexByKey(focusedRowKey);
            var focusedRow = rowIndex >= 0 && this.getVisibleRows()[rowIndex];
            var groups = columnsController.getGroupDataSourceParameters(true);
            if (focusedRow) {
              for (var i = 0; i < path.length; ++i) {
                var getter = (0, _data.compileGetter)(groups[i] && groups[i].selector);
                // @ts-expect-error
                if (getter(focusedRow.data) !== path[i]) {
                  return false;
                }
              }
            }
            return true;
          };
          _proto._getGroupPath = function _getGroupPath(groupItem, groupCount) {
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
          };
          _proto._expandGroupByPath = function _expandGroupByPath(that, groupPath, level) {
            // @ts-expect-error
            var d = new _deferred.Deferred();
            level++;
            that.expandRow(groupPath.slice(0, level)).done(function () {
              if (level === groupPath.length) {
                d.resolve();
              } else {
                that._expandGroupByPath(that, groupPath, level).done(d.resolve).fail(d.reject);
              }
            }).fail(d.reject);
            return d.promise();
          };
          _proto._calculateGlobalRowIndexByGroupedData = function _calculateGlobalRowIndexByGroupedData(key) {
            var that = this;
            var dataSource = that._dataSource;
            var filter = that._generateFilterByKey(key);
            // @ts-expect-error
            var deferred = new _deferred.Deferred();
            var isGroupKey = Array.isArray(key);
            var group = dataSource.group();
            if (isGroupKey) {
              return deferred.resolve(-1).promise();
            }
            if (!dataSource._grouping._updatePagingOptions) {
              that._calculateGlobalRowIndexByFlatData(key, null, true).done(deferred.resolve).fail(deferred.reject);
              return deferred;
            }
            dataSource.load({
              filter: that._concatWithCombinedFilter(filter),
              group
            }).done(function (data) {
              if (!data || data.length === 0 || !(0, _type.isDefined)(data[0].key) || data[0].key === -1) {
                return deferred.resolve(-1).promise();
              }
              var groupPath = that._getGroupPath(data[0], group.length);
              that._expandGroupByPath(that, groupPath, 0).done(function () {
                that._calculateExpandedRowGlobalIndex(deferred, key, groupPath, group);
              }).fail(deferred.reject);
            }).fail(deferred.reject);
            return deferred.promise();
          };
          _proto._calculateExpandedRowGlobalIndex = function _calculateExpandedRowGlobalIndex(deferred, key, groupPath, group) {
            var groupFilter = (0, _m_utils.createGroupFilter)(groupPath, {
              group
            });
            var dataSource = this._dataSource;
            var scrollingMode = this.option('scrolling.mode');
            var isVirtualScrolling = scrollingMode === 'virtual' || scrollingMode === 'infinite';
            var pageSize = dataSource.pageSize();
            var groupOffset;
            dataSource._grouping._updatePagingOptions({
              skip: 0,
              take: MAX_SAFE_INTEGER
            }, function (groupInfo, totalOffset) {
              if ((0, _common.equalByValue)(groupInfo.path, groupPath)) {
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
              var currentPageOffset = groupOffset % pageSize || pageSize;
              count = currentPageOffset + dataOffset - groupPath.length;
              if (isVirtualScrolling) {
                groupContinuationCount = 0;
              } else {
                groupContinuationCount = Math.floor(count / (pageSize - groupPath.length)) * groupPath.length;
              }
              count = groupOffset + dataOffset + groupContinuationCount;
              deferred.resolve(count);
            }).fail(deferred.reject);
          };
          return FocusDataControllerExtender;
        }(Base.inherit(_m_focus.focusModule.extenders.controllers.data));
      }
    }
  }
}));
