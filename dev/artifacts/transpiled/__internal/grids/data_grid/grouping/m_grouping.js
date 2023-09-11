"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHeaderPanelExtender = void 0;
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _accessibility = require("../../../../ui/shared/accessibility");
var _m_accessibility = require("../../../grids/grid_core/m_accessibility");
var _m_core = _interopRequireDefault(require("../m_core"));
var _m_data_source_adapter = _interopRequireDefault(require("../m_data_source_adapter"));
var _m_grouping_collapsed = require("./m_grouping_collapsed");
var _m_grouping_expanded = require("./m_grouping_expanded");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable @typescript-eslint/method-signature-style */

var DATAGRID_GROUP_PANEL_CLASS = 'dx-datagrid-group-panel';
var DATAGRID_GROUP_PANEL_MESSAGE_CLASS = 'dx-group-panel-message';
var DATAGRID_GROUP_PANEL_ITEM_CLASS = 'dx-group-panel-item';
var DATAGRID_GROUP_PANEL_LABEL_CLASS = 'dx-toolbar-label';
var DATAGRID_GROUP_PANEL_CONTAINER_CLASS = 'dx-toolbar-item';
var DATAGRID_EXPAND_CLASS = 'dx-datagrid-expand';
var DATAGRID_GROUP_ROW_CLASS = 'dx-group-row';
var HEADER_FILTER_CLASS_SELECTOR = '.dx-header-filter';
var GroupingDataSourceAdapterExtender = function () {
  return {
    init() {
      this.callBase.apply(this, arguments);
      this._initGroupingHelper();
    },
    _initGroupingHelper(options) {
      var grouping = this._grouping;
      var isAutoExpandAll = this.option('grouping.autoExpandAll');
      var isFocusedRowEnabled = this.option('focusedRowEnabled');
      var remoteOperations = options ? options.remoteOperations : this.remoteOperations();
      var isODataRemoteOperations = remoteOperations.filtering && remoteOperations.sorting && remoteOperations.paging;
      if (isODataRemoteOperations && !remoteOperations.grouping && (isAutoExpandAll || !isFocusedRowEnabled)) {
        if (!grouping || grouping instanceof _m_grouping_collapsed.GroupingHelper) {
          this._grouping = new _m_grouping_expanded.GroupingHelper(this);
        }
      } else if (!grouping || grouping instanceof _m_grouping_expanded.GroupingHelper) {
        this._grouping = new _m_grouping_collapsed.GroupingHelper(this);
      }
    },
    totalItemsCount() {
      var that = this;
      var totalCount = that.callBase();
      return totalCount > 0 && that._dataSource.group() && that._dataSource.requireTotalCount() ? totalCount + that._grouping.totalCountCorrection() : totalCount;
    },
    itemsCount() {
      return this._dataSource.group() ? this._grouping.itemsCount() || 0 : this.callBase.apply(this, arguments);
    },
    allowCollapseAll() {
      return this._grouping.allowCollapseAll();
    },
    isGroupItemCountable(item) {
      return this._grouping.isGroupItemCountable(item);
    },
    isRowExpanded(key) {
      var groupInfo = this._grouping.findGroupInfo(key);
      return groupInfo ? groupInfo.isExpanded : !this._grouping.allowCollapseAll();
    },
    collapseAll(groupIndex) {
      return this._collapseExpandAll(groupIndex, false);
    },
    expandAll(groupIndex) {
      return this._collapseExpandAll(groupIndex, true);
    },
    _collapseExpandAll(groupIndex, isExpand) {
      var that = this;
      var dataSource = that._dataSource;
      var group = dataSource.group();
      var groups = _m_core.default.normalizeSortingInfo(group || []);
      if (groups.length) {
        for (var i = 0; i < groups.length; i++) {
          if (groupIndex === undefined || groupIndex === i) {
            groups[i].isExpanded = isExpand;
          } else if (group && group[i]) {
            groups[i].isExpanded = group[i].isExpanded;
          }
        }
        dataSource.group(groups);
        that._grouping.foreachGroups(function (groupInfo, parents) {
          if (groupIndex === undefined || groupIndex === parents.length - 1) {
            groupInfo.isExpanded = isExpand;
          }
        }, false, true);
        that.resetPagesCache();
      }
      return true;
    },
    refresh() {
      this.callBase.apply(this, arguments);
      return this._grouping.refresh.apply(this._grouping, arguments);
    },
    changeRowExpand(path) {
      var that = this;
      var dataSource = that._dataSource;
      if (dataSource.group()) {
        dataSource.beginLoading();
        if (that._lastLoadOptions) {
          that._lastLoadOptions.groupExpand = true;
        }
        return that._changeRowExpandCore(path).always(function () {
          dataSource.endLoading();
        });
      }
    },
    _changeRowExpandCore(path) {
      return this._grouping.changeRowExpand(path);
    },
    /// #DEBUG
    getGroupsInfo() {
      return this._grouping._groupsInfo;
    },
    /// #ENDDEBUG
    // @ts-expect-error
    _hasGroupLevelsExpandState(group, isExpanded) {
      if (group && Array.isArray(group)) {
        for (var i = 0; i < group.length; i++) {
          if (group[i].isExpanded === isExpanded) {
            return true;
          }
        }
      }
    },
    _customizeRemoteOperations(options, operationTypes) {
      var remoteOperations = options.remoteOperations;
      if (options.storeLoadOptions.group) {
        if (remoteOperations.grouping && !options.isCustomLoading) {
          if (!remoteOperations.groupPaging || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, true)) {
            remoteOperations.paging = false;
          }
        }
        if (!remoteOperations.grouping && (!remoteOperations.sorting || !remoteOperations.filtering || options.isCustomLoading || this._hasGroupLevelsExpandState(options.storeLoadOptions.group, false))) {
          remoteOperations.paging = false;
        }
      } else if (!options.isCustomLoading && remoteOperations.paging && operationTypes.grouping) {
        this.resetCache();
      }
      this.callBase.apply(this, arguments);
    },
    _handleDataLoading(options) {
      this.callBase(options);
      this._initGroupingHelper(options);
      return this._grouping.handleDataLoading(options);
    },
    _handleDataLoaded(options) {
      return this._grouping.handleDataLoaded(options, this.callBase.bind(this));
    },
    _handleDataLoadedCore(options) {
      return this._grouping.handleDataLoadedCore(options, this.callBase.bind(this));
    }
  };
}();
_m_data_source_adapter.default.extend(GroupingDataSourceAdapterExtender);
var GroupingDataControllerExtender = function () {
  return {
    init() {
      var that = this;
      that.callBase();
      that.createAction('onRowExpanding');
      that.createAction('onRowExpanded');
      that.createAction('onRowCollapsing');
      that.createAction('onRowCollapsed');
    },
    _beforeProcessItems(items) {
      var groupColumns = this._columnsController.getGroupColumns();
      items = this.callBase(items);
      if (items.length && groupColumns.length) {
        items = this._processGroupItems(items, groupColumns.length);
      }
      return items;
    },
    _processItem(item, options) {
      if ((0, _type.isDefined)(item.groupIndex) && (0, _type.isString)(item.rowType) && item.rowType.indexOf('group') === 0) {
        item = this._processGroupItem(item, options);
        options.dataIndex = 0;
      } else {
        item = this.callBase.apply(this, arguments);
      }
      return item;
    },
    _processGroupItem(item) {
      return item;
    },
    _processGroupItems(items, groupsCount, options) {
      var that = this;
      var groupedColumns = that._columnsController.getGroupColumns();
      var column = groupedColumns[groupedColumns.length - groupsCount];
      if (!options) {
        var scrollingMode = that.option('scrolling.mode');
        options = {
          collectContinuationItems: scrollingMode !== 'virtual' && scrollingMode !== 'infinite',
          resultItems: [],
          path: [],
          values: []
        };
      }
      var _options = options,
        resultItems = _options.resultItems;
      if (options.data) {
        if (options.collectContinuationItems || !options.data.isContinuation) {
          resultItems.push({
            rowType: 'group',
            data: options.data,
            groupIndex: options.path.length - 1,
            isExpanded: !!options.data.items,
            key: options.path.slice(0),
            values: options.values.slice(0)
          });
        }
      }
      if (items) {
        if (groupsCount === 0) {
          resultItems.push.apply(resultItems, items);
        } else {
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item && 'items' in item) {
              options.data = item;
              options.path.push(item.key);
              options.values.push(column && column.deserializeValue && !column.calculateDisplayValue ? column.deserializeValue(item.key) : item.key);
              that._processGroupItems(item.items, groupsCount - 1, options);
              options.data = undefined;
              options.path.pop();
              options.values.pop();
            } else {
              resultItems.push(item);
            }
          }
        }
      }
      return resultItems;
    },
    publicMethods() {
      return this.callBase().concat(['collapseAll', 'expandAll', 'isRowExpanded', 'expandRow', 'collapseRow']);
    },
    collapseAll(groupIndex) {
      var dataSource = this._dataSource;
      if (dataSource && dataSource.collapseAll(groupIndex)) {
        dataSource.pageIndex(0);
        dataSource.reload();
      }
    },
    expandAll(groupIndex) {
      var dataSource = this._dataSource;
      if (dataSource && dataSource.expandAll(groupIndex)) {
        dataSource.pageIndex(0);
        dataSource.reload();
      }
    },
    changeRowExpand(key) {
      var that = this;
      var expanded = that.isRowExpanded(key);
      var args = {
        key,
        expanded
      };
      that.executeAction(expanded ? 'onRowCollapsing' : 'onRowExpanding', args);
      if (!args.cancel) {
        return (0, _deferred.when)(that._changeRowExpandCore(key)).done(function () {
          args.expanded = !expanded;
          that.executeAction(expanded ? 'onRowCollapsed' : 'onRowExpanded', args);
        });
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    _changeRowExpandCore(key) {
      var that = this;
      var dataSource = this._dataSource;
      // @ts-expect-error
      var d = new _deferred.Deferred();
      if (!dataSource) {
        d.resolve();
      } else {
        (0, _deferred.when)(dataSource.changeRowExpand(key)).done(function () {
          that.load().done(d.resolve).fail(d.reject);
        }).fail(d.reject);
      }
      return d;
    },
    isRowExpanded(key) {
      var dataSource = this._dataSource;
      return dataSource && dataSource.isRowExpanded(key);
    },
    expandRow(key) {
      if (!this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    collapseRow(key) {
      if (this.isRowExpanded(key)) {
        return this.changeRowExpand(key);
      }
      // @ts-expect-error
      return new _deferred.Deferred().resolve();
    },
    optionChanged(args) {
      if (args.name === 'grouping' /* autoExpandAll */) {
        args.name = 'dataSource';
      }
      this.callBase(args);
    }
  };
}();
var onGroupingMenuItemClick = function onGroupingMenuItemClick(column, params) {
  var columnsController = this._columnsController;
  // eslint-disable-next-line default-case
  switch (params.itemData.value) {
    case 'group':
      {
        var groups = columnsController._dataSource.group() || [];
        columnsController.columnOption(column.dataField, 'groupIndex', groups.length);
        break;
      }
    case 'ungroup':
      columnsController.columnOption(column.dataField, 'groupIndex', -1);
      break;
    case 'ungroupAll':
      this.component.clearGrouping();
      break;
  }
};
var isGroupPanelVisible = function isGroupPanelVisible(groupPanelOptions) {
  var visible = groupPanelOptions === null || groupPanelOptions === void 0 ? void 0 : groupPanelOptions.visible;
  return visible === 'auto' ? _devices.default.current().deviceType === 'desktop' : !!visible;
};
var allowDragging = function allowDragging(groupPanelOptions, column) {
  var isVisible = isGroupPanelVisible(groupPanelOptions);
  var canDrag = (groupPanelOptions === null || groupPanelOptions === void 0 ? void 0 : groupPanelOptions.allowColumnDragging) && column.allowGrouping;
  return isVisible && !!canDrag;
};
var GroupingHeaderPanelExtender = function () {
  return {
    _getToolbarItems() {
      var items = this.callBase();
      return this._appendGroupingItem(items);
    },
    _appendGroupingItem(items) {
      var _this = this;
      if (this._isGroupPanelVisible()) {
        var isRendered = false;
        var toolbarItem = {
          template: function template() {
            var $groupPanel = (0, _renderer.default)('<div>').addClass(DATAGRID_GROUP_PANEL_CLASS);
            _this._updateGroupPanelContent($groupPanel);
            (0, _m_accessibility.registerKeyboardAction)('groupPanel', _this, $groupPanel, undefined, _this._handleActionKeyDown.bind(_this));
            return $groupPanel;
          },
          name: 'groupPanel',
          onItemRendered: function onItemRendered() {
            isRendered && _this.renderCompleted.fire();
            isRendered = true;
          },
          location: 'before',
          locateInMenu: 'never',
          sortIndex: 1
        };
        items.push(toolbarItem);
        this.updateToolbarDimensions();
      }
      return items;
    },
    _handleActionKeyDown(args) {
      var event = args.event;
      var $target = (0, _renderer.default)(event.target);
      var groupColumnIndex = $target.closest(".".concat(DATAGRID_GROUP_PANEL_ITEM_CLASS)).index();
      var column = this._columnsController.getGroupColumns()[groupColumnIndex];
      var columnIndex = column && column.index;
      if ($target.is(HEADER_FILTER_CLASS_SELECTOR)) {
        this.getController('headerFilter').showHeaderFilterMenu(columnIndex, true);
      } else {
        this._processGroupItemAction(columnIndex);
      }
      event.preventDefault();
    },
    _isGroupPanelVisible() {
      return isGroupPanelVisible(this.option('groupPanel'));
    },
    _renderGroupPanelItems($groupPanel, groupColumns) {
      var that = this;
      $groupPanel.empty();
      (0, _iterator.each)(groupColumns, function (index, groupColumn) {
        that._createGroupPanelItem($groupPanel, groupColumn);
      });
      (0, _accessibility.restoreFocus)(this);
    },
    _createGroupPanelItem($rootElement, groupColumn) {
      var $groupPanelItem = (0, _renderer.default)('<div>').addClass(groupColumn.cssClass).addClass(DATAGRID_GROUP_PANEL_ITEM_CLASS).data('columnData', groupColumn).appendTo($rootElement).text(groupColumn.caption);
      (0, _accessibility.setTabIndex)(this, $groupPanelItem);
      return $groupPanelItem;
    },
    _columnOptionChanged(e) {
      if (!this._requireReady && !_m_core.default.checkChanges(e.optionNames, ['width', 'visibleWidth'])) {
        var $toolbarElement = this.element();
        var $groupPanel = $toolbarElement && $toolbarElement.find(".".concat(DATAGRID_GROUP_PANEL_CLASS));
        if ($groupPanel && $groupPanel.length) {
          this._updateGroupPanelContent($groupPanel);
          this.updateToolbarDimensions();
          this.renderCompleted.fire();
        }
      }
      this.callBase();
    },
    _updateGroupPanelContent($groupPanel) {
      var that = this;
      var groupColumns = that.getController('columns').getGroupColumns();
      var groupPanelOptions = that.option('groupPanel');
      that._renderGroupPanelItems($groupPanel, groupColumns);
      if (groupPanelOptions.allowColumnDragging && !groupColumns.length) {
        (0, _renderer.default)('<div>').addClass(DATAGRID_GROUP_PANEL_MESSAGE_CLASS).text(groupPanelOptions.emptyPanelText).appendTo($groupPanel);
        $groupPanel.closest(".".concat(DATAGRID_GROUP_PANEL_CONTAINER_CLASS)).addClass(DATAGRID_GROUP_PANEL_LABEL_CLASS);
        $groupPanel.closest(".".concat(DATAGRID_GROUP_PANEL_LABEL_CLASS)).css('maxWidth', 'none');
      }
    },
    allowDragging(column) {
      var groupPanelOptions = this.option('groupPanel');
      return allowDragging(groupPanelOptions, column);
    },
    getColumnElements() {
      var $element = this.element();
      return $element && $element.find(".".concat(DATAGRID_GROUP_PANEL_ITEM_CLASS));
    },
    getColumns() {
      return this.getController('columns').getGroupColumns();
    },
    getBoundingRect() {
      var that = this;
      var $element = that.element();
      if ($element && $element.find(".".concat(DATAGRID_GROUP_PANEL_CLASS)).length) {
        var offset = $element.offset();
        return {
          top: offset.top,
          bottom: offset.top + (0, _size.getHeight)($element)
        };
      }
      return null;
    },
    getName() {
      return 'group';
    },
    getContextMenuItems(options) {
      var that = this;
      var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
      var $groupedColumnElement = (0, _renderer.default)(options.targetElement).closest(".".concat(DATAGRID_GROUP_PANEL_ITEM_CLASS));
      var items;
      if ($groupedColumnElement.length) {
        options.column = $groupedColumnElement.data('columnData');
      }
      if (contextMenuEnabled && options.column) {
        var column = options.column;
        var isGroupingAllowed = (0, _type.isDefined)(column.allowGrouping) ? column.allowGrouping : true;
        if (isGroupingAllowed) {
          var isColumnGrouped = (0, _type.isDefined)(column.groupIndex) && column.groupIndex > -1;
          var groupingTexts = that.option('grouping.texts');
          var onItemClick = onGroupingMenuItemClick.bind(that, column);
          items = [{
            text: groupingTexts.ungroup,
            value: 'ungroup',
            disabled: !isColumnGrouped,
            onItemClick
          }, {
            text: groupingTexts.ungroupAll,
            value: 'ungroupAll',
            onItemClick
          }];
        }
      }
      return items;
    },
    isVisible() {
      return this.callBase() || this._isGroupPanelVisible();
    },
    hasGroupedColumns() {
      return this._isGroupPanelVisible() && !!this.getColumns().length;
    },
    optionChanged(args) {
      if (args.name === 'groupPanel') {
        this._invalidate();
        args.handled = true;
      } else {
        this.callBase(args);
      }
    }
  };
}();
exports.GroupingHeaderPanelExtender = GroupingHeaderPanelExtender;
var GroupingRowsViewExtender = function () {
  return {
    getContextMenuItems(options) {
      var that = this;
      var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
      var items;
      if (contextMenuEnabled && options.row && options.row.rowType === 'group') {
        var columnsController = that._columnsController;
        var column = columnsController.columnOption("groupIndex:".concat(options.row.groupIndex));
        if (column && column.allowGrouping) {
          var groupingTexts = that.option('grouping.texts');
          var onItemClick = onGroupingMenuItemClick.bind(that, column);
          items = [];
          items.push({
            text: groupingTexts.ungroup,
            value: 'ungroup',
            onItemClick
          }, {
            text: groupingTexts.ungroupAll,
            value: 'ungroupAll',
            onItemClick
          });
        }
      }
      return items;
    },
    _rowClick(e) {
      var that = this;
      var expandMode = that.option('grouping.expandMode');
      var scrollingMode = that.option('scrolling.mode');
      var isGroupRowStateChanged = scrollingMode !== 'infinite' && expandMode === 'rowClick' && (0, _renderer.default)(e.event.target).closest(".".concat(DATAGRID_GROUP_ROW_CLASS)).length;
      var isExpandButtonClicked = (0, _renderer.default)(e.event.target).closest(".".concat(DATAGRID_EXPAND_CLASS)).length;
      if (isGroupRowStateChanged || isExpandButtonClicked) {
        that._changeGroupRowState(e);
      }
      that.callBase(e);
    },
    _changeGroupRowState(e) {
      var dataController = this.getController('data');
      var row = dataController.items()[e.rowIndex];
      var allowCollapsing = this._columnsController.columnOption("groupIndex:".concat(row.groupIndex), 'allowCollapsing');
      if (row.rowType === 'data' || row.rowType === 'group' && allowCollapsing !== false) {
        dataController.changeRowExpand(row.key, true);
        e.event.preventDefault();
        e.handled = true;
      }
    }
  };
}();
var columnHeadersViewExtender = function () {
  return {
    getContextMenuItems(options) {
      var that = this;
      var contextMenuEnabled = that.option('grouping.contextMenuEnabled');
      var items = that.callBase(options);
      if (contextMenuEnabled && options.row && (options.row.rowType === 'header' || options.row.rowType === 'detailAdaptive')) {
        var column = options.column;
        if (!column.command && (!(0, _type.isDefined)(column.allowGrouping) || column.allowGrouping)) {
          var groupingTexts = that.option('grouping.texts');
          var isColumnGrouped = (0, _type.isDefined)(column.groupIndex) && column.groupIndex > -1;
          var onItemClick = onGroupingMenuItemClick.bind(that, column);
          items = items || [];
          items.push({
            text: groupingTexts.groupByThisColumn,
            value: 'group',
            beginGroup: true,
            disabled: isColumnGrouped,
            onItemClick
          });
          if (column.showWhenGrouped) {
            items.push({
              text: groupingTexts.ungroup,
              value: 'ungroup',
              disabled: !isColumnGrouped,
              onItemClick
            });
          }
          items.push({
            text: groupingTexts.ungroupAll,
            value: 'ungroupAll',
            onItemClick
          });
        }
      }
      return items;
    },
    allowDragging(column) {
      var groupPanelOptions = this.option('groupPanel');
      return allowDragging(groupPanelOptions, column) || this.callBase(column);
    }
  };
}();
_m_core.default.registerModule('grouping', {
  defaultOptions() {
    return {
      grouping: {
        autoExpandAll: true,
        allowCollapsing: true,
        contextMenuEnabled: false,
        expandMode: 'buttonClick',
        texts: {
          groupContinuesMessage: _message.default.format('dxDataGrid-groupContinuesMessage'),
          groupContinuedMessage: _message.default.format('dxDataGrid-groupContinuedMessage'),
          groupByThisColumn: _message.default.format('dxDataGrid-groupHeaderText'),
          ungroup: _message.default.format('dxDataGrid-ungroupHeaderText'),
          ungroupAll: _message.default.format('dxDataGrid-ungroupAllText')
        }
      },
      groupPanel: {
        visible: false,
        emptyPanelText: _message.default.format('dxDataGrid-groupPanelEmptyText'),
        allowColumnDragging: true
      }
    };
  },
  extenders: {
    controllers: {
      data: GroupingDataControllerExtender,
      columns: {
        _getExpandColumnOptions() {
          var options = this.callBase.apply(this, arguments);
          options.cellTemplate = _m_core.default.getExpandCellTemplate();
          return options;
        }
      },
      editing: {
        _isProcessedItem(item) {
          return (0, _type.isDefined)(item.groupIndex) && (0, _type.isString)(item.rowType) && item.rowType.indexOf('group') === 0;
        }
      }
    },
    views: {
      headerPanel: GroupingHeaderPanelExtender,
      rowsView: GroupingRowsViewExtender,
      columnHeadersView: columnHeadersViewExtender
    }
  }
});