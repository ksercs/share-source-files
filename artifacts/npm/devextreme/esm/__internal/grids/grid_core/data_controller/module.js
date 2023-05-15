/**
* DevExtreme (esm/__internal/grids/grid_core/data_controller/module.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable class-methods-use-this */
import $ from '../../../../core/renderer';
import ArrayStore from '../../../../data/array_store';
import CustomStore from '../../../../data/custom_store';
import { deferRender, equalByValue } from '../../../../core/utils/common';
import { each } from '../../../../core/utils/iterator';
import { isDefined, isObject } from '../../../../core/utils/type';
import { extend } from '../../../../core/utils/extend';
import DataHelperMixin from '../../../../data_helper';
import { when, Deferred } from '../../../../core/utils/deferred';
import { findChanges } from '../../../../core/utils/array_compare';
import errors from '../../../../ui/widget/ui.errors';
import gridCoreUtils from '../module_utils';
import modules from '../modules';
var changePaging = function changePaging(that, optionName, value) {
  var dataSource = that._dataSource;
  if (dataSource) {
    if (value !== undefined) {
      var oldValue = that._getPagingOptionValue(optionName);
      if (oldValue !== value) {
        if (optionName === 'pageSize') {
          dataSource.pageIndex(0);
        }
        dataSource[optionName](value);
        that._skipProcessingPagingChange = true;
        that.option("paging.".concat(optionName), value);
        that._skipProcessingPagingChange = false;
        var pageIndex = dataSource.pageIndex();
        that._isPaging = optionName === 'pageIndex';
        return dataSource[optionName === 'pageIndex' ? 'load' : 'reload']().done(() => {
          that._isPaging = false;
          that.pageChanged.fire(pageIndex);
        });
      }
      return Deferred().resolve().promise();
    }
    return dataSource[optionName]();
  }
  return 0;
};
var ControllerWithDataMixin = modules.Controller.inherit(DataHelperMixin);
export class DataController extends ControllerWithDataMixin {
  init() {
    var that = this;
    that._items = [];
    that._cachedProcessedItems = null;
    that._columnsController = this.getController('columns');
    that._isPaging = false;
    that._currentOperationTypes = null;
    that._dataChangedHandler = e => {
      that._currentOperationTypes = this._dataSource.operationTypes();
      that._handleDataChanged(e);
      that._currentOperationTypes = null;
    };
    that._columnsChangedHandler = that._handleColumnsChanged.bind(that);
    that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
    that._loadErrorHandler = that._handleLoadError.bind(that);
    that._customizeStoreLoadOptionsHandler = that._handleCustomizeStoreLoadOptions.bind(that);
    that._changingHandler = that._handleChanging.bind(that);
    that._dataPushedHandler = that._handleDataPushed.bind(that);
    that._columnsController.columnsChanged.add(that._columnsChangedHandler);
    that._isLoading = false;
    that._isCustomLoading = false;
    that._repaintChangesOnly = undefined;
    that._changes = [];
    that.createAction('onDataErrorOccurred');
    that.dataErrorOccurred.add(error => that.executeAction('onDataErrorOccurred', {
      error
    }));
    that._refreshDataSource();
  }
  _getPagingOptionValue(optionName) {
    return this._dataSource[optionName]();
  }
  callbackNames() {
    return ['changed', 'loadingChanged', 'dataErrorOccurred', 'pageChanged', 'dataSourceChanged', 'pushed'];
  }
  callbackFlags(name) {
    if (name === 'dataErrorOccurred') {
      return {
        stopOnFalse: true
      };
    }
    return undefined;
  }
  publicMethods() {
    return ['beginCustomLoading', 'endCustomLoading', 'refresh', 'filter', 'clearFilter', 'getCombinedFilter', 'keyOf', 'byKey', 'getDataByKeys', 'pageIndex', 'pageSize', 'pageCount', 'totalCount', '_disposeDataSource', 'getKeyByRowIndex', 'getRowIndexByKey', 'getDataSource', 'getVisibleRows', 'repaintRows'];
  }
  reset() {
    this._columnsController.reset();
    this._items = [];
    this._refreshDataSource();
  }
  _handleDataSourceChange(args) {
    if (args.value === args.previousValue || this.option('columns') && Array.isArray(args.value) && Array.isArray(args.previousValue)) {
      var isValueChanged = args.value !== args.previousValue;
      if (isValueChanged) {
        var store = this.store();
        if (store) {
          store._array = args.value;
        }
      }
      if (this.needToRefreshOnDataSourceChange(args)) {
        this.refresh(this.option('repaintChangesOnly'));
      }
      return true;
    }
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  needToRefreshOnDataSourceChange(args) {
    return true;
  }
  optionChanged(args) {
    var that = this;
    var dataSource;
    var changedPagingOptions;
    function handled() {
      args.handled = true;
    }
    if (args.name === 'dataSource' && args.name === args.fullName && this._handleDataSourceChange(args)) {
      handled();
      return;
    }
    switch (args.name) {
      case 'cacheEnabled':
      case 'repaintChangesOnly':
      case 'highlightChanges':
      case 'loadingTimeout':
        handled();
        break;
      case 'remoteOperations':
      case 'keyExpr':
      case 'dataSource':
      case 'scrolling':
        handled();
        that.reset();
        break;
      case 'paging':
        dataSource = that.dataSource();
        if (dataSource) {
          changedPagingOptions = that._setPagingOptions(dataSource);
          if (changedPagingOptions) {
            var pageIndex = dataSource.pageIndex();
            this._isPaging = changedPagingOptions.isPageIndexChanged;
            dataSource.load().done(() => {
              this._isPaging = false;
              that.pageChanged.fire(pageIndex);
            });
          }
        }
        handled();
        break;
      case 'rtlEnabled':
        that.reset();
        break;
      case 'columns':
        dataSource = that.dataSource();
        if (dataSource && dataSource.isLoading() && args.name === args.fullName) {
          this._useSortingGroupingFromColumns = true;
          dataSource.load();
        }
        break;
      default:
        super.optionChanged(args);
    }
  }
  isReady() {
    return !this._isLoading;
  }
  getDataSource() {
    return this._dataSource && this._dataSource._dataSource;
  }
  getCombinedFilter(returnDataField) {
    return this.combinedFilter(undefined, returnDataField);
  }
  combinedFilter(filter, returnDataField) {
    var that = this;
    var dataSource = that._dataSource;
    var columnsController = that._columnsController;
    if (dataSource) {
      if (filter === undefined) {
        filter = dataSource.filter();
      }
      var additionalFilter = that._calculateAdditionalFilter();
      if (additionalFilter) {
        if (columnsController.isDataSourceApplied() || columnsController.isAllDataTypesDefined()) {
          filter = gridCoreUtils.combineFilters([additionalFilter, filter]);
        }
      }
      filter = columnsController.updateFilter(filter, returnDataField || dataSource.remoteOperations().filtering);
    }
    return filter;
  }
  waitReady() {
    if (this._updateLockCount) {
      // @ts-expect-error
      this._readyDeferred = new Deferred();
      return this._readyDeferred;
    }
    return when();
  }
  _endUpdateCore() {
    var changes = this._changes;
    if (changes.length) {
      this._changes = [];
      var repaintChangesOnly = changes.every(change => change.repaintChangesOnly);
      this.updateItems(changes.length === 1 ? changes[0] : {
        repaintChangesOnly
      });
    }
    if (this._readyDeferred) {
      this._readyDeferred.resolve();
      this._readyDeferred = null;
    }
  }
  // Handlers
  _handleCustomizeStoreLoadOptions(e) {
    var _a;
    var columnsController = this._columnsController;
    var dataSource = this._dataSource;
    var {
      storeLoadOptions
    } = e;
    if (e.isCustomLoading && !storeLoadOptions.isLoadingAll) {
      return;
    }
    storeLoadOptions.filter = this.combinedFilter(storeLoadOptions.filter);
    if (((_a = storeLoadOptions.filter) === null || _a === void 0 ? void 0 : _a.length) === 1 && storeLoadOptions.filter[0] === '!') {
      e.data = [];
      e.extra = e.extra || {};
      e.extra.totalCount = 0;
    }
    if (!columnsController.isDataSourceApplied()) {
      columnsController.updateColumnDataTypes(dataSource);
    }
    this._columnsUpdating = true;
    columnsController.updateSortingGrouping(dataSource, !this._useSortingGroupingFromColumns);
    this._columnsUpdating = false;
    storeLoadOptions.sort = columnsController.getSortDataSourceParameters();
    storeLoadOptions.group = columnsController.getGroupDataSourceParameters();
    dataSource.sort(storeLoadOptions.sort);
    dataSource.group(storeLoadOptions.group);
    storeLoadOptions.sort = columnsController.getSortDataSourceParameters(!dataSource.remoteOperations().sorting);
    e.group = columnsController.getGroupDataSourceParameters(!dataSource.remoteOperations().grouping);
  }
  _handleColumnsChanged(e) {
    var that = this;
    var {
      changeTypes
    } = e;
    var {
      optionNames
    } = e;
    var filterValue;
    var filterValues;
    var filterApplied;
    // B255430
    var updateItemsHandler = function updateItemsHandler(change) {
      var _a;
      that._columnsController.columnsChanged.remove(updateItemsHandler);
      that.updateItems({
        repaintChangesOnly: false,
        virtualColumnsScrolling: (_a = change === null || change === void 0 ? void 0 : change.changeTypes) === null || _a === void 0 ? void 0 : _a.virtualColumnsScrolling
      });
    };
    if (changeTypes.sorting || changeTypes.grouping) {
      if (that._dataSource && !that._columnsUpdating) {
        that._dataSource.group(that._columnsController.getGroupDataSourceParameters());
        that._dataSource.sort(that._columnsController.getSortDataSourceParameters());
        that.reload();
      }
    } else if (changeTypes.columns) {
      filterValues = that._columnsController.columnOption(e.columnIndex, 'filterValues');
      if (optionNames.filterValues || optionNames.filterType && Array.isArray(filterValues) || optionNames.filterValue || optionNames.selectedFilterOperation || optionNames.allowFiltering) {
        filterValue = that._columnsController.columnOption(e.columnIndex, 'filterValue');
        if (Array.isArray(filterValues) || e.columnIndex === undefined || isDefined(filterValue) || !optionNames.selectedFilterOperation || optionNames.filterValue) {
          that._applyFilter();
          filterApplied = true;
        }
      }
      if (!that._needApplyFilter && !gridCoreUtils.checkChanges(optionNames, ['width', 'visibleWidth', 'filterValue', 'bufferedFilterValue', 'selectedFilterOperation', 'filterValues', 'filterType'])) {
        // TODO remove resubscribing
        that._columnsController.columnsChanged.add(updateItemsHandler);
      }
      if (isDefined(optionNames.visible)) {
        var column = that._columnsController.columnOption(e.columnIndex);
        if (column && (isDefined(column.filterValue) || isDefined(column.filterValues))) {
          that._applyFilter();
          filterApplied = true;
        }
      }
    }
    if (!filterApplied && changeTypes.filtering) {
      that.reload();
    }
  }
  _handleDataChanged(e) {
    var that = this;
    var dataSource = that._dataSource;
    var columnsController = that._columnsController;
    var isAsyncDataSourceApplying = false;
    this._useSortingGroupingFromColumns = false;
    if (dataSource && !that._isDataSourceApplying) {
      that._isDataSourceApplying = true;
      when(that._columnsController.applyDataSource(dataSource)).done(() => {
        if (that._isLoading) {
          that._handleLoadingChanged(false);
        }
        if (isAsyncDataSourceApplying && e && e.isDelayed) {
          e.isDelayed = false;
        }
        that._isDataSourceApplying = false;
        var hasAdditionalFilter = () => {
          var additionalFilter = that._calculateAdditionalFilter();
          return additionalFilter && additionalFilter.length;
        };
        var needApplyFilter = that._needApplyFilter;
        that._needApplyFilter = false;
        if (needApplyFilter && !that._isAllDataTypesDefined && hasAdditionalFilter()) {
          errors.log('W1005', that.component.NAME);
          that._applyFilter();
        } else {
          that.updateItems(e, true);
        }
      }).fail(() => {
        that._isDataSourceApplying = false;
      });
      if (that._isDataSourceApplying) {
        isAsyncDataSourceApplying = true;
        that._handleLoadingChanged(true);
      }
      that._needApplyFilter = !that._columnsController.isDataSourceApplied();
      that._isAllDataTypesDefined = columnsController.isAllDataTypesDefined();
    }
  }
  _handleLoadingChanged(isLoading) {
    this._isLoading = isLoading;
    this._fireLoadingChanged();
  }
  _handleLoadError(e) {
    this.dataErrorOccurred.fire(e);
  }
  _handleDataPushed(changes) {
    this.pushed.fire(changes);
  }
  fireError() {
    // @ts-expect-error
    this.dataErrorOccurred.fire(errors.Error.apply(errors, arguments));
  }
  _setPagingOptions(dataSource) {
    var pageIndex = this.option('paging.pageIndex');
    var pageSize = this.option('paging.pageSize');
    var pagingEnabled = this.option('paging.enabled');
    var scrollingMode = this.option('scrolling.mode');
    var appendMode = scrollingMode === 'infinite';
    var virtualMode = scrollingMode === 'virtual';
    var paginate = pagingEnabled || virtualMode || appendMode;
    var isPaginateChanged = false;
    var isPageSizeChanged = false;
    var isPageIndexChanged = false;
    dataSource.requireTotalCount(!appendMode);
    if (pagingEnabled !== undefined && dataSource.paginate() !== paginate) {
      dataSource.paginate(paginate);
      isPaginateChanged = true;
    }
    if (pageSize !== undefined && dataSource.pageSize() !== pageSize) {
      dataSource.pageSize(pageSize);
      isPageSizeChanged = true;
    }
    if (pageIndex !== undefined && dataSource.pageIndex() !== pageIndex) {
      dataSource.pageIndex(pageIndex);
      isPageIndexChanged = true;
    }
    if (isPaginateChanged || isPageSizeChanged || isPageIndexChanged) {
      return {
        isPaginateChanged,
        isPageSizeChanged,
        isPageIndexChanged
      };
    }
    return false;
  }
  _getSpecificDataSourceOption() {
    var dataSource = this.option('dataSource');
    if (Array.isArray(dataSource)) {
      return {
        store: {
          type: 'array',
          data: dataSource,
          key: this.option('keyExpr')
        }
      };
    }
    return dataSource;
  }
  _initDataSource() {
    var that = this;
    var oldDataSource = this._dataSource;
    super._initDataSource();
    var dataSource = that._dataSource;
    that._useSortingGroupingFromColumns = true;
    that._cachedProcessedItems = null;
    if (dataSource) {
      var changedPagingOptions = that._setPagingOptions(dataSource);
      this._isPaging = changedPagingOptions === null || changedPagingOptions === void 0 ? void 0 : changedPagingOptions.isPageIndexChanged;
      that.setDataSource(dataSource);
    } else if (oldDataSource) {
      that.updateItems();
    }
  }
  _loadDataSource() {
    var that = this;
    var dataSource = that._dataSource;
    // @ts-expect-error
    var result = new Deferred();
    when(this._columnsController.refresh(true)).always(() => {
      if (dataSource) {
        dataSource.load().done(function () {
          that._isPaging = false;
          result.resolve.apply(result, arguments);
        }).fail(result.reject);
      } else {
        result.resolve();
      }
    });
    return result.promise();
  }
  _beforeProcessItems(items) {
    return items.slice(0);
  }
  getRowIndexDelta() {
    return 0;
  }
  getDataIndex(change) {
    var visibleItems = this._items;
    var lastVisibleItem = change.changeType === 'append' && visibleItems.length > 0 ? visibleItems[visibleItems.length - 1] : null;
    return isDefined(lastVisibleItem === null || lastVisibleItem === void 0 ? void 0 : lastVisibleItem.dataIndex) ? lastVisibleItem.dataIndex + 1 : 0;
  }
  _processItems(items, change) {
    var that = this;
    var rowIndexDelta = that.getRowIndexDelta();
    var {
      changeType
    } = change;
    var visibleColumns = that._columnsController.getVisibleColumns(null, changeType === 'loadingAll');
    var dataIndex = this.getDataIndex(change);
    var options = {
      visibleColumns,
      dataIndex
    };
    var result = [];
    each(items, (index, item) => {
      if (isDefined(item)) {
        // @ts-expect-error
        options.rowIndex = index - rowIndexDelta;
        item = that._processItem(item, options);
        result.push(item);
      }
    });
    return result;
  }
  _processItem(item, options) {
    item = this._generateDataItem(item, options);
    item = this._processDataItem(item, options);
    item.dataIndex = options.dataIndex++;
    return item;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _generateDataItem(data, options) {
    return {
      rowType: 'data',
      data,
      key: this.keyOf(data)
    };
  }
  _processDataItem(dataItem, options) {
    dataItem.values = this.generateDataValues(dataItem.data, options.visibleColumns);
    return dataItem;
  }
  generateDataValues(data, columns, isModified) {
    var values = [];
    var value;
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      value = isModified ? undefined : null;
      if (!column.command) {
        if (column.calculateCellValue) {
          value = column.calculateCellValue(data);
        } else if (column.dataField) {
          value = data[column.dataField];
        }
      }
      values.push(value);
    }
    return values;
  }
  _applyChange(change) {
    var that = this;
    if (change.changeType === 'update') {
      that._applyChangeUpdate(change);
    } else if (that.items().length && change.repaintChangesOnly && change.changeType === 'refresh') {
      that._applyChangesOnly(change);
    } else if (change.changeType === 'refresh') {
      that._applyChangeFull(change);
    }
  }
  _applyChangeFull(change) {
    this._items = change.items.slice(0);
  }
  _getRowIndices(change) {
    var rowIndices = change.rowIndices.slice(0);
    var rowIndexDelta = this.getRowIndexDelta();
    rowIndices.sort((a, b) => a - b);
    for (var i = 0; i < rowIndices.length; i++) {
      var correctedRowIndex = rowIndices[i];
      if (change.allowInvisibleRowIndices) {
        correctedRowIndex += rowIndexDelta;
      }
      if (correctedRowIndex < 0) {
        rowIndices.splice(i, 1);
        i--;
      }
    }
    return rowIndices;
  }
  _applyChangeUpdate(change) {
    var that = this;
    var {
      items
    } = change;
    var rowIndices = that._getRowIndices(change);
    var rowIndexDelta = that.getRowIndexDelta();
    var repaintChangesOnly = that.option('repaintChangesOnly');
    var prevIndex = -1;
    var rowIndexCorrection = 0;
    var changeType;
    change.items = [];
    change.rowIndices = [];
    change.columnIndices = [];
    change.changeTypes = [];
    var equalItems = function equalItems(item1, item2, strict) {
      var result = item1 && item2 && equalByValue(item1.key, item2.key);
      if (result && strict) {
        result = item1.rowType === item2.rowType && (item2.rowType !== 'detail' || item1.isEditing === item2.isEditing);
      }
      return result;
    };
    each(rowIndices, (index, rowIndex) => {
      var columnIndices;
      rowIndex += rowIndexCorrection + rowIndexDelta;
      if (prevIndex === rowIndex) return;
      prevIndex = rowIndex;
      var oldItem = that._items[rowIndex];
      var oldNextItem = that._items[rowIndex + 1];
      var newItem = items[rowIndex];
      var newNextItem = items[rowIndex + 1];
      var strict = equalItems(oldItem, oldNextItem) || equalItems(newItem, newNextItem);
      if (newItem) {
        newItem.rowIndex = rowIndex;
        change.items.push(newItem);
      }
      if (oldItem && newItem && equalItems(oldItem, newItem, strict)) {
        changeType = 'update';
        that._items[rowIndex] = newItem;
        if (oldItem.visible !== newItem.visible) {
          change.items.splice(-1, 1, {
            visible: newItem.visible
          });
        } else if (repaintChangesOnly && !change.isFullUpdate) {
          columnIndices = that._partialUpdateRow(oldItem, newItem, rowIndex - rowIndexDelta);
        }
      } else if (newItem && !oldItem || newNextItem && equalItems(oldItem, newNextItem, strict)) {
        changeType = 'insert';
        that._items.splice(rowIndex, 0, newItem);
        rowIndexCorrection++;
      } else if (oldItem && !newItem || oldNextItem && equalItems(newItem, oldNextItem, strict)) {
        changeType = 'remove';
        that._items.splice(rowIndex, 1);
        rowIndexCorrection--;
        prevIndex = -1;
      } else if (newItem) {
        changeType = 'update';
        that._items[rowIndex] = newItem;
      } else {
        return;
      }
      change.rowIndices.push(rowIndex - rowIndexDelta);
      change.changeTypes.push(changeType);
      change.columnIndices.push(columnIndices);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _isCellChanged(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
    if (JSON.stringify(oldRow.values[columnIndex]) !== JSON.stringify(newRow.values[columnIndex])) {
      return true;
    }
    function isCellModified(row, columnIndex) {
      return row.modifiedValues ? row.modifiedValues[columnIndex] !== undefined : false;
    }
    if (isCellModified(oldRow, columnIndex) !== isCellModified(newRow, columnIndex)) {
      return true;
    }
    return false;
  }
  _getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
    var columnIndices;
    if (oldItem.rowType === newItem.rowType) {
      if (newItem.rowType !== 'group' && newItem.rowType !== 'groupFooter') {
        columnIndices = [];
        if (newItem.rowType !== 'detail') {
          for (var columnIndex = 0; columnIndex < oldItem.values.length; columnIndex++) {
            if (this._isCellChanged(oldItem, newItem, visibleRowIndex, columnIndex, isLiveUpdate)) {
              columnIndices.push(columnIndex);
            }
          }
        }
      }
      if (newItem.rowType === 'group' && newItem.isExpanded === oldItem.isExpanded && oldItem.cells) {
        columnIndices = oldItem.cells.map((cell, index) => {
          var _a;
          return ((_a = cell.column) === null || _a === void 0 ? void 0 : _a.type) !== 'groupExpand' ? index : -1;
        }).filter(index => index >= 0);
      }
    }
    return columnIndices;
  }
  _partialUpdateRow(oldItem, newItem, visibleRowIndex, isLiveUpdate) {
    var changedColumnIndices = this._getChangedColumnIndices(oldItem, newItem, visibleRowIndex, isLiveUpdate);
    if ((changedColumnIndices === null || changedColumnIndices === void 0 ? void 0 : changedColumnIndices.length) && this.option('dataRowTemplate')) {
      changedColumnIndices = undefined;
    }
    if (changedColumnIndices) {
      oldItem.cells && oldItem.cells.forEach((cell, columnIndex) => {
        var isCellChanged = changedColumnIndices.indexOf(columnIndex) >= 0;
        if (!isCellChanged && cell && cell.update) {
          cell.update(newItem);
        }
      });
      newItem.update = oldItem.update;
      newItem.watch = oldItem.watch;
      newItem.cells = oldItem.cells;
      if (isLiveUpdate) {
        newItem.oldValues = oldItem.values;
      }
      oldItem.update && oldItem.update(newItem);
    }
    return changedColumnIndices;
  }
  _isItemEquals(item1, item2) {
    var _a, _b, _c, _d;
    if (JSON.stringify(item1.values) !== JSON.stringify(item2.values)) {
      return false;
    }
    var compareFields = ['modified', 'isNewRow', 'removed', 'isEditing'];
    if (compareFields.some(field => item1[field] !== item2[field])) {
      return false;
    }
    if (item1.rowType === 'group' || item1.rowType === 'groupFooter') {
      var expandedMatch = item1.isExpanded === item2.isExpanded;
      var summaryCellsMatch = JSON.stringify(item1.summaryCells) === JSON.stringify(item2.summaryCells);
      var continuationMatch = ((_a = item1.data) === null || _a === void 0 ? void 0 : _a.isContinuation) === ((_b = item2.data) === null || _b === void 0 ? void 0 : _b.isContinuation) && ((_c = item1.data) === null || _c === void 0 ? void 0 : _c.isContinuationOnNextPage) === ((_d = item2.data) === null || _d === void 0 ? void 0 : _d.isContinuationOnNextPage);
      if (!expandedMatch || !summaryCellsMatch || !continuationMatch) {
        return false;
      }
    }
    return true;
  }
  _applyChangesOnly(change) {
    var _a;
    var rowIndices = [];
    var columnIndices = [];
    var changeTypes = [];
    var items = [];
    var newIndexByKey = {};
    var isLiveUpdate = (_a = change === null || change === void 0 ? void 0 : change.isLiveUpdate) !== null && _a !== void 0 ? _a : true;
    function getRowKey(row) {
      if (row) {
        return "".concat(row.rowType, ",").concat(JSON.stringify(row.key));
      }
      return undefined;
    }
    var isItemEquals = (item1, item2) => {
      if (!this._isItemEquals(item1, item2)) {
        return false;
      }
      if (item1.cells) {
        item1.update && item1.update(item2);
        item1.cells.forEach(cell => {
          if (cell && cell.update) {
            cell.update(item2, true);
          }
        });
      }
      return true;
    };
    var currentItems = this._items;
    var oldItems = currentItems.slice();
    change.items.forEach((item, index) => {
      var key = getRowKey(item);
      newIndexByKey[key] = index;
      item.rowIndex = index;
    });
    var result = findChanges(oldItems, change.items, getRowKey, isItemEquals);
    if (!result) {
      this._applyChangeFull(change);
      return;
    }
    result.forEach(change => {
      switch (change.type) {
        case 'update':
          {
            var {
              index
            } = change;
            var newItem = change.data;
            var {
              oldItem
            } = change;
            var changedColumnIndices = this._partialUpdateRow(oldItem, newItem, index, isLiveUpdate);
            rowIndices.push(index);
            changeTypes.push('update');
            items.push(newItem);
            currentItems[index] = newItem;
            columnIndices.push(changedColumnIndices);
            break;
          }
        case 'insert':
          rowIndices.push(change.index);
          changeTypes.push('insert');
          items.push(change.data);
          columnIndices.push(undefined);
          currentItems.splice(change.index, 0, change.data);
          break;
        case 'remove':
          rowIndices.push(change.index);
          changeTypes.push('remove');
          currentItems.splice(change.index, 1);
          items.push(change.oldItem);
          columnIndices.push(undefined);
          break;
        default:
          break;
      }
    });
    change.repaintChangesOnly = true;
    change.changeType = 'update';
    change.rowIndices = rowIndices;
    change.columnIndices = columnIndices;
    change.changeTypes = changeTypes;
    change.items = items;
    if (oldItems.length) {
      change.isLiveUpdate = true;
    }
    this._correctRowIndices(rowIndex => {
      var oldRowIndexOffset = this._rowIndexOffset || 0;
      var rowIndexOffset = this.getRowIndexOffset();
      var oldItem = oldItems[rowIndex - oldRowIndexOffset];
      var key = getRowKey(oldItem);
      var newVisibleRowIndex = newIndexByKey[key];
      return newVisibleRowIndex >= 0 ? newVisibleRowIndex + rowIndexOffset - rowIndex : 0;
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _correctRowIndices(rowIndex) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _afterProcessItems(items, change) {
    return items;
  }
  _updateItemsCore(change) {
    var items;
    var dataSource = this._dataSource;
    var changeType = change.changeType || 'refresh';
    change.changeType = changeType;
    if (dataSource) {
      var cachedProcessedItems = this._cachedProcessedItems;
      if (change.useProcessedItemsCache && cachedProcessedItems) {
        items = cachedProcessedItems;
      } else {
        items = change.items || dataSource.items();
        items = this._beforeProcessItems(items);
        items = this._processItems(items, change);
        this._cachedProcessedItems = items;
      }
      items = this._afterProcessItems(items, change);
      change.items = items;
      var oldItems = this._items.length === items.length && this._items;
      this._applyChange(change);
      var rowIndexDelta = this.getRowIndexDelta();
      each(this._items, (index, item) => {
        var _a;
        item.rowIndex = index - rowIndexDelta;
        if (oldItems) {
          item.cells = (_a = oldItems[index].cells) !== null && _a !== void 0 ? _a : [];
        }
        var newItem = items[index];
        if (newItem) {
          item.loadIndex = newItem.loadIndex;
        }
      });
      this._rowIndexOffset = this.getRowIndexOffset();
    } else {
      this._items = [];
    }
  }
  _handleChanging(e) {
    var that = this;
    var rows = that.getVisibleRows();
    var dataSource = that.dataSource();
    if (dataSource) {
      e.changes.forEach(change => {
        if (change.type === 'insert' && change.index >= 0) {
          var dataIndex = 0;
          for (var i = 0; i < change.index; i++) {
            var row = rows[i];
            if (row && (row.rowType === 'data' || row.rowType === 'group')) {
              dataIndex++;
            }
          }
          change.index = dataIndex;
        }
      });
    }
  }
  updateItems(change, isDataChanged) {
    var _a;
    change = change || {};
    var that = this;
    if (that._repaintChangesOnly !== undefined) {
      change.repaintChangesOnly = (_a = change.repaintChangesOnly) !== null && _a !== void 0 ? _a : that._repaintChangesOnly;
      change.needUpdateDimensions = change.needUpdateDimensions || that._needUpdateDimensions;
    } else if (change.changes) {
      change.repaintChangesOnly = that.option('repaintChangesOnly');
    } else if (isDataChanged) {
      var operationTypes = that.dataSource().operationTypes();
      change.repaintChangesOnly = operationTypes && !operationTypes.grouping && !operationTypes.filtering && that.option('repaintChangesOnly');
      change.isDataChanged = true;
      if (operationTypes && (operationTypes.reload || operationTypes.paging || operationTypes.groupExpanding)) {
        change.needUpdateDimensions = true;
      }
    }
    if (that._updateLockCount && !change.cancel) {
      that._changes.push(change);
      return;
    }
    that._updateItemsCore(change);
    if (change.cancel) return;
    that._fireChanged(change);
  }
  loadingOperationTypes() {
    var dataSource = this.dataSource();
    return dataSource && dataSource.loadingOperationTypes() || {};
  }
  _fireChanged(change) {
    if (this._currentOperationTypes) {
      change.operationTypes = this._currentOperationTypes;
      this._currentOperationTypes = null;
    }
    deferRender(() => {
      this.changed.fire(change);
    });
  }
  isLoading() {
    return this._isLoading || this._isCustomLoading;
  }
  _fireLoadingChanged() {
    this.loadingChanged.fire(this.isLoading(), this._loadingText);
  }
  _calculateAdditionalFilter() {
    return null;
  }
  _applyFilter() {
    var dataSource = this._dataSource;
    if (dataSource) {
      dataSource.pageIndex(0);
      this._isFilterApplying = true;
      return this.reload().done(() => {
        if (this._isFilterApplying) {
          this.pageChanged.fire();
        }
      });
    }
  }
  resetFilterApplying() {
    this._isFilterApplying = false;
  }
  filter(filterExpr) {
    var dataSource = this._dataSource;
    var filter = dataSource && dataSource.filter();
    if (arguments.length === 0) {
      return filter;
    }
    filterExpr = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : filterExpr;
    if (gridCoreUtils.equalFilterParameters(filter, filterExpr)) {
      return;
    }
    if (dataSource) {
      dataSource.filter(filterExpr);
    }
    this._applyFilter();
  }
  clearFilter(filterName) {
    var that = this;
    var columnsController = that._columnsController;
    var clearColumnOption = function clearColumnOption(optionName) {
      var columnCount = columnsController.columnCount();
      for (var index = 0; index < columnCount; index++) {
        columnsController.columnOption(index, optionName, undefined);
      }
    };
    that.component.beginUpdate();
    if (arguments.length > 0) {
      switch (filterName) {
        case 'dataSource':
          that.filter(null);
          break;
        case 'search':
          that.searchByText('');
          break;
        case 'header':
          clearColumnOption('filterValues');
          break;
        case 'row':
          clearColumnOption('filterValue');
          break;
        default:
          break;
      }
    } else {
      that.filter(null);
      that.searchByText('');
      clearColumnOption('filterValue');
      clearColumnOption('bufferedFilterValue');
      clearColumnOption('filterValues');
    }
    that.component.endUpdate();
  }
  _fireDataSourceChanged() {
    var that = this;
    var changedHandler = function changedHandler() {
      that.changed.remove(changedHandler);
      that.dataSourceChanged.fire();
    };
    that.changed.add(changedHandler);
  }
  _getDataSourceAdapter() {}
  _createDataSourceAdapterCore(dataSource, remoteOperations) {
    var dataSourceAdapterProvider = this._getDataSourceAdapter();
    var dataSourceAdapter = dataSourceAdapterProvider.create(this.component);
    dataSourceAdapter.init(dataSource, remoteOperations);
    return dataSourceAdapter;
  }
  isLocalStore(store) {
    store = store || this.store();
    return store instanceof ArrayStore;
  }
  isCustomStore(store) {
    store = store || this.store();
    return store instanceof CustomStore;
  }
  _createDataSourceAdapter(dataSource) {
    var remoteOperations = this.option('remoteOperations');
    var store = dataSource.store();
    var enabledRemoteOperations = {
      filtering: true,
      sorting: true,
      paging: true,
      grouping: true,
      summary: true
    };
    // @ts-expect-error
    if (isObject(remoteOperations) && remoteOperations.groupPaging) {
      remoteOperations = extend({}, enabledRemoteOperations, remoteOperations);
    }
    if (remoteOperations === 'auto') {
      remoteOperations = this.isLocalStore(store) || this.isCustomStore(store) ? {} : {
        filtering: true,
        sorting: true,
        paging: true
      };
    }
    if (remoteOperations === true) {
      remoteOperations = enabledRemoteOperations;
    }
    return this._createDataSourceAdapterCore(dataSource, remoteOperations);
  }
  setDataSource(dataSource) {
    var that = this;
    var oldDataSource = that._dataSource;
    if (!dataSource && oldDataSource) {
      oldDataSource.cancelAll();
      oldDataSource.changed.remove(that._dataChangedHandler);
      oldDataSource.loadingChanged.remove(that._loadingChangedHandler);
      oldDataSource.loadError.remove(that._loadErrorHandler);
      oldDataSource.customizeStoreLoadOptions.remove(that._customizeStoreLoadOptionsHandler);
      oldDataSource.changing.remove(that._changingHandler);
      oldDataSource.pushed.remove(that._dataPushedHandler);
      oldDataSource.dispose(that._isSharedDataSource);
    }
    if (dataSource) {
      dataSource = that._createDataSourceAdapter(dataSource);
    }
    that._dataSource = dataSource;
    if (dataSource) {
      that._fireDataSourceChanged();
      that._isLoading = !dataSource.isLoaded();
      that._needApplyFilter = true;
      that._isAllDataTypesDefined = that._columnsController.isAllDataTypesDefined();
      dataSource.changed.add(that._dataChangedHandler);
      dataSource.loadingChanged.add(that._loadingChangedHandler);
      dataSource.loadError.add(that._loadErrorHandler);
      dataSource.customizeStoreLoadOptions.add(that._customizeStoreLoadOptionsHandler);
      dataSource.changing.add(that._changingHandler);
      dataSource.pushed.add(that._dataPushedHandler);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  items(byLoaded) {
    return this._items;
  }
  isEmpty() {
    return !this.items().length;
  }
  pageCount() {
    return this._dataSource ? this._dataSource.pageCount() : 1;
  }
  dataSource() {
    return this._dataSource;
  }
  store() {
    var dataSource = this._dataSource;
    return dataSource && dataSource.store();
  }
  loadAll(data) {
    var that = this;
    // @ts-expect-error
    var d = new Deferred();
    var dataSource = that._dataSource;
    if (dataSource) {
      if (data) {
        var options = {
          data,
          isCustomLoading: true,
          storeLoadOptions: {
            isLoadingAll: true
          },
          loadOptions: {
            filter: that.getCombinedFilter(),
            group: dataSource.group(),
            sort: dataSource.sort()
          }
        };
        dataSource._handleDataLoaded(options);
        when(options.data).done(data => {
          var _a;
          data = that._beforeProcessItems(data);
          d.resolve(that._processItems(data, {
            changeType: 'loadingAll'
          }), (_a = options.extra) === null || _a === void 0 ? void 0 : _a.summary);
        }).fail(d.reject);
      } else if (!dataSource.isLoading()) {
        var loadOptions = extend({}, dataSource.loadOptions(), {
          isLoadingAll: true,
          requireTotalCount: false
        });
        dataSource.load(loadOptions).done((items, extra) => {
          items = that._beforeProcessItems(items);
          items = that._processItems(items, {
            changeType: 'loadingAll'
          });
          d.resolve(items, extra && extra.summary);
        }).fail(d.reject);
      } else {
        d.reject();
      }
    } else {
      d.resolve([]);
    }
    return d;
  }
  getKeyByRowIndex(rowIndex, byLoaded) {
    var item = this.items(byLoaded)[rowIndex];
    if (item) {
      return item.key;
    }
  }
  getRowIndexByKey(key, byLoaded) {
    return gridCoreUtils.getIndexByKey(key, this.items(byLoaded));
  }
  keyOf(data) {
    var store = this.store();
    if (store) {
      return store.keyOf(data);
    }
  }
  byKey(key) {
    var store = this.store();
    var rowIndex = this.getRowIndexByKey(key);
    var result;
    if (!store) return;
    if (rowIndex >= 0) {
      // @ts-expect-error
      result = new Deferred().resolve(this.items()[rowIndex].data);
    }
    return result || store.byKey(key);
  }
  key() {
    var store = this.store();
    if (store) {
      return store.key();
    }
  }
  getRowIndexOffset() {
    return 0;
  }
  getDataByKeys(rowKeys) {
    var that = this;
    // @ts-expect-error
    var result = new Deferred();
    var deferreds = [];
    var data = [];
    each(rowKeys, (index, key) => {
      deferreds.push(that.byKey(key).done(keyData => {
        data[index] = keyData;
      }));
    });
    when.apply($, deferreds).always(() => {
      result.resolve(data);
    });
    return result;
  }
  pageIndex(value) {
    return changePaging(this, 'pageIndex', value);
  }
  pageSize(value) {
    return changePaging(this, 'pageSize', value);
  }
  beginCustomLoading(messageText) {
    this._isCustomLoading = true;
    this._loadingText = messageText || '';
    this._fireLoadingChanged();
  }
  endCustomLoading() {
    this._isCustomLoading = false;
    this._loadingText = undefined;
    this._fireLoadingChanged();
  }
  refresh(options) {
    if (options === true) {
      options = {
        reload: true,
        changesOnly: true
      };
    } else if (!options) {
      options = {
        lookup: true,
        selection: true,
        reload: true
      };
    }
    var that = this;
    var dataSource = that.getDataSource();
    var {
      changesOnly
    } = options;
    // @ts-expect-error
    var d = new Deferred();
    var customizeLoadResult = function customizeLoadResult() {
      that._repaintChangesOnly = !!changesOnly;
    };
    when(!options.lookup || that._columnsController.refresh()).always(() => {
      if (options.load || options.reload) {
        dataSource && dataSource.on('customizeLoadResult', customizeLoadResult);
        when(that.reload(options.reload, changesOnly)).always(() => {
          dataSource && dataSource.off('customizeLoadResult', customizeLoadResult);
          that._repaintChangesOnly = undefined;
        }).done(d.resolve).fail(d.reject);
      } else {
        that.updateItems({
          repaintChangesOnly: options.changesOnly
        });
        d.resolve();
      }
    });
    return d.promise();
  }
  getVisibleRows() {
    return this.items();
  }
  _disposeDataSource() {
    this.setDataSource(null);
  }
  dispose() {
    this._disposeDataSource();
    super.dispose();
  }
  repaintRows(rowIndexes, changesOnly) {
    rowIndexes = Array.isArray(rowIndexes) ? rowIndexes : [rowIndexes];
    if (rowIndexes.length > 1 || isDefined(rowIndexes[0])) {
      this.updateItems({
        changeType: 'update',
        rowIndices: rowIndexes,
        isFullUpdate: !changesOnly
      });
    }
  }
  skipProcessingPagingChange(fullName) {
    return this._skipProcessingPagingChange && (fullName === 'paging.pageIndex' || fullName === 'paging.pageSize');
  }
  getUserState() {
    return {
      searchText: this.option('searchPanel.text'),
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize()
    };
  }
  getCachedStoreData() {
    return this._dataSource && this._dataSource.getCachedStoreData();
  }
  isLastPageLoaded() {
    var pageIndex = this.pageIndex();
    var pageCount = this.pageCount();
    return pageIndex === pageCount - 1;
  }
  load() {
    var _a;
    return (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.load();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reload(reload, changesOnly) {
    var _a;
    return (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.reload(reload, changesOnly);
  }
  push() {
    var _a;
    return (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.push(...arguments);
  }
  itemsCount() {
    var _a;
    return this._dataSource ? (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.itemsCount() : 0;
  }
  totalItemsCount() {
    var _a;
    return this._dataSource ? (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.totalItemsCount() : 0;
  }
  hasKnownLastPage() {
    var _a;
    return this._dataSource ? (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.hasKnownLastPage() : true;
  }
  isLoaded() {
    var _a;
    return this._dataSource ? (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.isLoaded() : true;
  }
  totalCount() {
    var _a;
    return this._dataSource ? (_a = this._dataSource) === null || _a === void 0 ? void 0 : _a.totalCount() : 0;
  }
}
export var dataControllerModule = {
  defaultOptions() {
    return {
      loadingTimeout: 0,
      dataSource: null,
      cacheEnabled: true,
      repaintChangesOnly: false,
      highlightChanges: false,
      onDataErrorOccurred: null,
      remoteOperations: 'auto',
      paging: {
        enabled: true,
        pageSize: undefined,
        pageIndex: undefined
      }
    };
  },
  controllers: {
    data: DataController
  }
};
