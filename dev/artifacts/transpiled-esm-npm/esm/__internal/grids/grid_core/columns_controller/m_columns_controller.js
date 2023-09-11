import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable prefer-destructuring */
import config from '../../../../core/config';
import $ from '../../../../core/renderer';
import Callbacks from '../../../../core/utils/callbacks';
import { compileGetter } from '../../../../core/utils/data';
import { Deferred, when } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import { captionize } from '../../../../core/utils/inflector';
import { each, map } from '../../../../core/utils/iterator';
import { orderEach } from '../../../../core/utils/object';
import { isDefined, isFunction, isNumeric, isObject, isPlainObject, isString } from '../../../../core/utils/type';
import variableWrapper from '../../../../core/utils/variable_wrapper';
import Store from '../../../../data/abstract_store';
import { DataSource } from '../../../../data/data_source/data_source';
import { normalizeDataSourceOptions } from '../../../../data/data_source/utils';
import dateLocalization from '../../../../localization/date';
import messageLocalization from '../../../../localization/message';
import filterUtils from '../../../../ui/shared/filtering';
import errors from '../../../../ui/widget/ui.errors';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
import { COLUMN_CHOOSER_LOCATION, COLUMN_OPTION_REGEXP, COMMAND_EXPAND_CLASS, DATATYPE_OPERATIONS, DETAIL_COMMAND_COLUMN_NAME, GROUP_COMMAND_COLUMN_NAME, GROUP_LOCATION, MAX_SAFE_INTEGER, USER_STATE_FIELD_NAMES } from './const';
import { addExpandColumn, applyUserState, assignColumns, columnOptionCore, convertOwnerBandToColumnReference, createColumn, createColumnsFromDataSource, createColumnsFromOptions, defaultSetCellValue, digitsCount, findColumn, fireColumnsChanged, getAlignmentByDataType, getChildrenByBandColumn, getColumnByIndexes, getColumnIndexByVisibleIndex, getCustomizeTextByDataType, getDataColumns, getFixedPosition, getParentBandColumns, getRowCount, getSerializationFormat, getValueDataType, isColumnFixed, isCustomCommandColumn, isSortOrderValid, mergeColumns, moveColumnToGroup, numberToString, processBandColumns, processExpandColumns, resetBandColumnsCache, resetColumnsCache, setFilterOperationsAsDefaultValues, sortColumns, strictParseNumber, updateColumnChanges, updateColumnGroupIndexes, updateIndexes, updateSerializers } from './m_columns_controller_utils';
export class ColumnsController extends modules.Controller {
  _getExpandColumnOptions() {
    return {
      type: 'expand',
      command: 'expand',
      width: 'auto',
      cssClass: COMMAND_EXPAND_CLASS,
      allowEditing: false,
      allowGrouping: false,
      allowSorting: false,
      allowResizing: false,
      allowReordering: false,
      allowHiding: false
    };
  }
  _getFirstItems(dataSource) {
    var groupsCount;
    var items = [];
    var getFirstItemsCore = function getFirstItemsCore(items, groupsCount) {
      if (!items || !groupsCount) {
        return items;
      }
      for (var i = 0; i < items.length; i++) {
        var childItems = getFirstItemsCore(items[i].items || items[i].collapsedItems, groupsCount - 1);
        if (childItems && childItems.length) {
          return childItems;
        }
      }
    };
    if (dataSource && dataSource.items().length > 0) {
      groupsCount = gridCoreUtils.normalizeSortingInfo(dataSource.group()).length;
      items = getFirstItemsCore(dataSource.items(), groupsCount) || [];
    }
    return items;
  }
  _endUpdateCore() {
    !this._skipProcessingColumnsChange && fireColumnsChanged(this);
  }
  init(isApplyingUserState) {
    var that = this;
    var columns = that.option('columns');
    that._commandColumns = that._commandColumns || [];
    that._columns = that._columns || [];
    that._isColumnsFromOptions = !!columns;
    if (that._isColumnsFromOptions) {
      assignColumns(that, columns ? createColumnsFromOptions(that, columns) : []);
      applyUserState(that);
    } else {
      assignColumns(that, that._columnsUserState ? createColumnsFromOptions(that, that._columnsUserState) : that._columns);
    }
    addExpandColumn(that);
    if (that._dataSourceApplied) {
      that.applyDataSource(that._dataSource, true, isApplyingUserState);
    } else {
      updateIndexes(that);
    }
    that._checkColumns();
  }
  callbackNames() {
    return ['columnsChanged'];
  }
  getColumnByPath(path, columns) {
    var that = this;
    var column;
    var columnIndexes = [];
    path.replace(COLUMN_OPTION_REGEXP, (_, columnIndex) => {
      // eslint-disable-next-line radix
      columnIndexes.push(parseInt(columnIndex));
      return '';
    });
    if (columnIndexes.length) {
      if (columns) {
        column = columnIndexes.reduce((column, index) => column && column.columns && column.columns[index], {
          columns
        });
      } else {
        column = getColumnByIndexes(that, columnIndexes);
      }
    }
    return column;
  }
  optionChanged(args) {
    var needUpdateRequireResize;
    switch (args.name) {
      case 'adaptColumnWidthByRatio':
        args.handled = true;
        break;
      case 'dataSource':
        if (args.value !== args.previousValue && !this.option('columns') && (!Array.isArray(args.value) || !Array.isArray(args.previousValue))) {
          this._columns = [];
        }
        break;
      case 'columns':
        needUpdateRequireResize = this._skipProcessingColumnsChange;
        args.handled = true;
        if (!this._skipProcessingColumnsChange) {
          if (args.name === args.fullName) {
            this._columnsUserState = null;
            this._ignoreColumnOptionNames = null;
            this.init();
          } else {
            this._columnOptionChanged(args);
            needUpdateRequireResize = true;
          }
        }
        if (needUpdateRequireResize) {
          this._updateRequireResize(args);
        }
        break;
      case 'commonColumnSettings':
      case 'columnAutoWidth':
      case 'allowColumnResizing':
      case 'allowColumnReordering':
      case 'columnFixing':
      case 'grouping':
      case 'groupPanel':
      case 'regenerateColumnsByVisibleItems':
      case 'customizeColumns':
      case 'columnHidingEnabled':
      case 'dateSerializationFormat':
      case 'columnResizingMode':
      case 'columnMinWidth':
      case 'columnWidth':
        {
          args.handled = true;
          var ignoreColumnOptionNames = args.fullName === 'columnWidth' && ['width'];
          this.reinit(ignoreColumnOptionNames);
          break;
        }
      case 'rtlEnabled':
        this.reinit();
        break;
      default:
        super.optionChanged(args);
    }
  }
  _columnOptionChanged(args) {
    var columnOptionValue = {};
    var column = this.getColumnByPath(args.fullName);
    var columnOptionName = args.fullName.replace(COLUMN_OPTION_REGEXP, '');
    if (column) {
      if (columnOptionName) {
        columnOptionValue[columnOptionName] = args.value;
      } else {
        columnOptionValue = args.value;
      }
      this._skipProcessingColumnsChange = args.fullName;
      this.columnOption(column.index, columnOptionValue);
      this._skipProcessingColumnsChange = false;
    }
  }
  _updateRequireResize(args) {
    var {
      component
    } = this;
    if (args.fullName.replace(COLUMN_OPTION_REGEXP, '') === 'width' && component._updateLockCount) {
      component._requireResize = true;
    }
  }
  publicMethods() {
    return ['addColumn', 'deleteColumn', 'columnOption', 'columnCount', 'clearSorting', 'clearGrouping', 'getVisibleColumns', 'getVisibleColumnIndex'];
  }
  applyDataSource(dataSource, forceApplying, isApplyingUserState) {
    var that = this;
    var isDataSourceLoaded = dataSource && dataSource.isLoaded();
    that._dataSource = dataSource;
    if (!that._dataSourceApplied || that._dataSourceColumnsCount === 0 || forceApplying || that.option('regenerateColumnsByVisibleItems')) {
      if (isDataSourceLoaded) {
        if (!that._isColumnsFromOptions) {
          var columnsFromDataSource = createColumnsFromDataSource(that, dataSource);
          if (columnsFromDataSource.length) {
            assignColumns(that, columnsFromDataSource);
            that._dataSourceColumnsCount = that._columns.length;
            applyUserState(that);
          }
        }
        return that.updateColumns(dataSource, forceApplying, isApplyingUserState);
      }
      that._dataSourceApplied = false;
      updateIndexes(that);
    } else if (isDataSourceLoaded && !that.isAllDataTypesDefined(true) && that.updateColumnDataTypes(dataSource)) {
      updateColumnChanges(that, 'columns');
      fireColumnsChanged(that);
      // @ts-expect-error
      return new Deferred().reject().promise();
    }
  }
  reset() {
    this._dataSource = null;
    this._dataSourceApplied = false;
    this._dataSourceColumnsCount = undefined;
    this.reinit();
  }
  resetColumnsCache() {
    var that = this;
    that._visibleColumns = undefined;
    that._fixedColumns = undefined;
    that._rowCount = undefined;
    resetBandColumnsCache(that);
  }
  reinit(ignoreColumnOptionNames) {
    this._columnsUserState = this.getUserState();
    this._ignoreColumnOptionNames = ignoreColumnOptionNames || null;
    this.init();
    if (ignoreColumnOptionNames) {
      this._ignoreColumnOptionNames = null;
    }
  }
  isInitialized() {
    return !!this._columns.length || !!this.option('columns');
  }
  isDataSourceApplied() {
    return this._dataSourceApplied;
  }
  getCommonSettings(column) {
    var _a, _b;
    var commonColumnSettings = (!column || !column.type) && this.option('commonColumnSettings') || {};
    var groupingOptions = (_a = this.option('grouping')) !== null && _a !== void 0 ? _a : {};
    var groupPanelOptions = (_b = this.option('groupPanel')) !== null && _b !== void 0 ? _b : {};
    return extend({
      allowFixing: this.option('columnFixing.enabled'),
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      allowResizing: this.option('allowColumnResizing') || undefined,
      allowReordering: this.option('allowColumnReordering'),
      minWidth: this.option('columnMinWidth'),
      width: this.option('columnWidth'),
      autoExpandGroup: groupingOptions.autoExpandAll,
      allowCollapsing: groupingOptions.allowCollapsing,
      allowGrouping: groupPanelOptions.allowColumnDragging && groupPanelOptions.visible || groupingOptions.contextMenuEnabled
    }, commonColumnSettings);
  }
  isColumnOptionUsed(optionName) {
    for (var i = 0; i < this._columns.length; i++) {
      if (this._columns[i][optionName]) {
        return true;
      }
    }
  }
  isAllDataTypesDefined(checkSerializers) {
    var columns = this._columns;
    if (!columns.length) {
      return false;
    }
    for (var i = 0; i < columns.length; i++) {
      if (!columns[i].dataField && columns[i].calculateCellValue === columns[i].defaultCalculateCellValue) {
        continue;
      }
      if (!columns[i].dataType || checkSerializers && columns[i].deserializeValue && columns[i].serializationFormat === undefined) {
        return false;
      }
    }
    return true;
  }
  getColumns() {
    return this._columns;
  }
  isBandColumnsUsed() {
    return this.getColumns().some(column => column.isBand);
  }
  getGroupColumns() {
    var result = [];
    each(this._columns, function () {
      var column = this;
      if (isDefined(column.groupIndex)) {
        result[column.groupIndex] = column;
      }
    });
    return result;
  }
  _shouldReturnVisibleColumns() {
    return true;
  }
  _compileVisibleColumns(rowIndex) {
    this._visibleColumns = this._visibleColumns || this._compileVisibleColumnsCore();
    rowIndex = isDefined(rowIndex) ? rowIndex : this._visibleColumns.length - 1;
    return this._visibleColumns[rowIndex] || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getVisibleColumns(rowIndex, isBase) {
    if (!this._shouldReturnVisibleColumns()) {
      return [];
    }
    // @ts-expect-error
    return this._compileVisibleColumns.apply(this, arguments);
  }
  getFixedColumns(rowIndex) {
    this._fixedColumns = this._fixedColumns || this._getFixedColumnsCore();
    rowIndex = isDefined(rowIndex) ? rowIndex : this._fixedColumns.length - 1;
    return this._fixedColumns[rowIndex] || [];
  }
  getFilteringColumns() {
    return this.getColumns().filter(item => (item.dataField || item.name) && (item.allowFiltering || item.allowHeaderFiltering)).map(item => {
      var field = extend(true, {}, item);
      if (!isDefined(field.dataField)) {
        field.dataField = field.name;
      }
      field.filterOperations = item.filterOperations !== item.defaultFilterOperations ? field.filterOperations : null;
      return field;
    });
  }
  getColumnIndexOffset() {
    return 0;
  }
  _getFixedColumnsCore() {
    var that = this;
    var result = [];
    var rowCount = that.getRowCount();
    var isColumnFixing = that._isColumnFixing();
    var transparentColumn = {
      command: 'transparent'
    };
    var transparentColspan = 0;
    var notFixedColumnCount;
    var transparentColumnIndex;
    var lastFixedPosition;
    if (isColumnFixing) {
      for (var i = 0; i <= rowCount; i++) {
        notFixedColumnCount = 0;
        lastFixedPosition = null;
        transparentColumnIndex = null;
        var visibleColumns = that.getVisibleColumns(i, true);
        for (var j = 0; j < visibleColumns.length; j++) {
          var prevColumn = visibleColumns[j - 1];
          var column = visibleColumns[j];
          if (!column.fixed) {
            if (i === 0) {
              if (column.isBand && column.colspan) {
                transparentColspan += column.colspan;
              } else {
                transparentColspan++;
              }
            }
            notFixedColumnCount++;
            if (!isDefined(transparentColumnIndex)) {
              transparentColumnIndex = j;
            }
          } else if (prevColumn && prevColumn.fixed && getFixedPosition(that, prevColumn) !== getFixedPosition(that, column)) {
            if (!isDefined(transparentColumnIndex)) {
              transparentColumnIndex = j;
            }
          } else {
            lastFixedPosition = column.fixedPosition;
          }
        }
        if (i === 0 && (notFixedColumnCount === 0 || notFixedColumnCount >= visibleColumns.length)) {
          return [];
        }
        if (!isDefined(transparentColumnIndex)) {
          transparentColumnIndex = lastFixedPosition === 'right' ? 0 : visibleColumns.length;
        }
        result[i] = visibleColumns.slice(0);
        if (!transparentColumn.colspan) {
          transparentColumn.colspan = transparentColspan;
        }
        result[i].splice(transparentColumnIndex, notFixedColumnCount, transparentColumn);
      }
    }
    return result.map(columns => columns.map(column => {
      var newColumn = _extends({}, column);
      if (newColumn.headerId) {
        newColumn.headerId += '-fixed';
      }
      return newColumn;
    }));
  }
  _isColumnFixing() {
    var isColumnFixing = this.option('columnFixing.enabled');
    !isColumnFixing && each(this._columns, (_, column) => {
      if (column.fixed) {
        isColumnFixing = true;
        return false;
      }
    });
    return isColumnFixing;
  }
  _getExpandColumnsCore() {
    return this.getGroupColumns();
  }
  getExpandColumns() {
    var expandColumns = this._getExpandColumnsCore();
    var expandColumn;
    var firstGroupColumn = expandColumns.filter(column => column.groupIndex === 0)[0];
    var isFixedFirstGroupColumn = firstGroupColumn && firstGroupColumn.fixed;
    var isColumnFixing = this._isColumnFixing();
    var rtlEnabled = this.option('rtlEnabled');
    if (expandColumns.length) {
      expandColumn = this.columnOption('command:expand');
    }
    expandColumns = map(expandColumns, column => extend({}, column, {
      visibleWidth: null,
      minWidth: null,
      cellTemplate: !isDefined(column.groupIndex) ? column.cellTemplate : null,
      headerCellTemplate: null,
      fixed: !isDefined(column.groupIndex) || !isFixedFirstGroupColumn ? isColumnFixing : true,
      fixedPosition: rtlEnabled ? 'right' : 'left'
    }, expandColumn, {
      index: column.index,
      type: column.type || GROUP_COMMAND_COLUMN_NAME
    }));
    return expandColumns;
  }
  getBandColumnsCache() {
    if (!this._bandColumnsCache) {
      var columns = this._columns;
      var columnChildrenByIndex = {};
      var columnParentByIndex = {};
      var isPlain = true;
      columns.forEach(column => {
        var {
          ownerBand
        } = column;
        // @ts-expect-error
        var parentIndex = isObject(ownerBand) ? ownerBand.index : ownerBand;
        var parent = columns[parentIndex];
        if (column.hasColumns) {
          isPlain = false;
        }
        if (column.colspan) {
          column.colspan = undefined;
        }
        if (column.rowspan) {
          column.rowspan = undefined;
        }
        if (parent) {
          columnParentByIndex[column.index] = parent;
        } else {
          parentIndex = -1;
        }
        columnChildrenByIndex[parentIndex] = columnChildrenByIndex[parentIndex] || [];
        columnChildrenByIndex[parentIndex].push(column);
      });
      this._bandColumnsCache = {
        isPlain,
        columnChildrenByIndex,
        columnParentByIndex
      };
    }
    return this._bandColumnsCache;
  }
  _isColumnVisible(column) {
    return column.visible && this.isParentColumnVisible(column.index);
  }
  _isColumnInGroupPanel(column) {
    return isDefined(column.groupIndex) && !column.showWhenGrouped;
  }
  hasVisibleDataColumns() {
    var columns = this._columns;
    return columns.some(column => {
      var isVisible = this._isColumnVisible(column);
      var isInGroupPanel = this._isColumnInGroupPanel(column);
      var isCommand = !!column.command;
      return isVisible && !isInGroupPanel && !isCommand;
    });
  }
  _compileVisibleColumnsCore() {
    var bandColumnsCache = this.getBandColumnsCache();
    var columns = mergeColumns(this, this._columns, this._commandColumns, true);
    processBandColumns(this, columns, bandColumnsCache);
    var indexedColumns = this._getIndexedColumns(columns);
    var visibleColumns = this._getVisibleColumnsFromIndexed(indexedColumns);
    var isDataColumnsInvisible = !this.hasVisibleDataColumns();
    if (isDataColumnsInvisible && this._columns.length) {
      visibleColumns[visibleColumns.length - 1].push({
        command: 'empty'
      });
    }
    return visibleColumns;
  }
  _getIndexedColumns(columns) {
    var rtlEnabled = this.option('rtlEnabled');
    var rowCount = this.getRowCount();
    var columnDigitsCount = digitsCount(columns.length);
    var bandColumnsCache = this.getBandColumnsCache();
    var positiveIndexedColumns = [];
    var negativeIndexedColumns = [];
    for (var i = 0; i < rowCount; i += 1) {
      negativeIndexedColumns[i] = [{}];
      // 0 - fixed columns on the left side
      // 1 - not fixed columns
      // 2 - fixed columns on the right side
      positiveIndexedColumns[i] = [{}, {}, {}];
    }
    columns.forEach(column => {
      var _a, _b, _c, _d;
      var {
        visibleIndex
      } = column;
      var indexedColumns;
      var parentBandColumns = getParentBandColumns(column.index, bandColumnsCache.columnParentByIndex);
      var isVisible = this._isColumnVisible(column);
      var isInGroupPanel = this._isColumnInGroupPanel(column);
      if (isVisible && !isInGroupPanel) {
        var rowIndex = parentBandColumns.length;
        if (visibleIndex < 0) {
          visibleIndex = -visibleIndex;
          indexedColumns = negativeIndexedColumns[rowIndex];
        } else {
          column.fixed = (_b = (_a = parentBandColumns[0]) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : column.fixed;
          column.fixedPosition = (_d = (_c = parentBandColumns[0]) === null || _c === void 0 ? void 0 : _c.fixedPosition) !== null && _d !== void 0 ? _d : column.fixedPosition;
          if (column.fixed) {
            var isDefaultCommandColumn = !!column.command && !isCustomCommandColumn(this, column);
            var isFixedToEnd = column.fixedPosition === 'right';
            if (rtlEnabled && !isDefaultCommandColumn) {
              isFixedToEnd = !isFixedToEnd;
            }
            indexedColumns = isFixedToEnd ? positiveIndexedColumns[rowIndex][2] : positiveIndexedColumns[rowIndex][0];
          } else {
            indexedColumns = positiveIndexedColumns[rowIndex][1];
          }
        }
        if (parentBandColumns.length) {
          visibleIndex = numberToString(visibleIndex, columnDigitsCount);
          for (var _i = parentBandColumns.length - 1; _i >= 0; _i -= 1) {
            visibleIndex = numberToString(parentBandColumns[_i].visibleIndex, columnDigitsCount) + visibleIndex;
          }
        }
        indexedColumns[visibleIndex] = indexedColumns[visibleIndex] || [];
        indexedColumns[visibleIndex].push(column);
      }
    });
    return {
      positiveIndexedColumns,
      negativeIndexedColumns
    };
  }
  _getVisibleColumnsFromIndexed(_ref) {
    var _this = this;
    var {
      positiveIndexedColumns,
      negativeIndexedColumns
    } = _ref;
    var result = [];
    var rowCount = this.getRowCount();
    var expandColumns = mergeColumns(this, this.getExpandColumns(), this._columns);
    var rowspanGroupColumns = 0;
    var rowspanExpandColumns = 0;
    var _loop = function _loop(rowIndex) {
      result.push([]);
      orderEach(negativeIndexedColumns[rowIndex], (_, columns) => {
        result[rowIndex].unshift.apply(result[rowIndex], columns);
      });
      var firstPositiveIndexColumn = result[rowIndex].length;
      var positiveIndexedRowColumns = positiveIndexedColumns[rowIndex];
      positiveIndexedRowColumns.forEach(columnsByFixing => {
        orderEach(columnsByFixing, (_, columnsByVisibleIndex) => {
          result[rowIndex].push.apply(result[rowIndex], columnsByVisibleIndex);
        });
      });
      // The order of processing is important
      if (rowspanExpandColumns <= rowIndex) {
        rowspanExpandColumns += processExpandColumns.call(_this, result[rowIndex], expandColumns, DETAIL_COMMAND_COLUMN_NAME, firstPositiveIndexColumn);
      }
      if (rowspanGroupColumns <= rowIndex) {
        rowspanGroupColumns += processExpandColumns.call(_this, result[rowIndex], expandColumns, GROUP_COMMAND_COLUMN_NAME, firstPositiveIndexColumn);
      }
    };
    for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      _loop(rowIndex);
    }
    result.push(getDataColumns(result));
    return result;
  }
  getInvisibleColumns(columns, bandColumnIndex) {
    var that = this;
    var result = [];
    var hiddenColumnsByBand;
    columns = columns || that._columns;
    each(columns, (_, column) => {
      if (column.ownerBand !== bandColumnIndex) {
        return;
      }
      if (column.isBand) {
        if (!column.visible) {
          hiddenColumnsByBand = that.getChildrenByBandColumn(column.index);
        } else {
          hiddenColumnsByBand = that.getInvisibleColumns(that.getChildrenByBandColumn(column.index), column.index);
        }
        if (hiddenColumnsByBand.length) {
          result.push(column);
          result = result.concat(hiddenColumnsByBand);
        }
        return;
      }
      if (!column.visible) {
        result.push(column);
      }
    });
    return result;
  }
  getChooserColumns(getAllColumns) {
    var columns = getAllColumns ? this.getColumns() : this.getInvisibleColumns();
    var columnChooserColumns = columns.filter(column => column.showInColumnChooser);
    var sortOrder = this.option('columnChooser.sortOrder');
    return sortColumns(columnChooserColumns, sortOrder);
  }
  allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
    var that = this;
    var columnIndex = getColumnIndexByVisibleIndex(that, fromVisibleIndex, sourceLocation);
    var sourceColumn = that._columns[columnIndex];
    if (sourceColumn && (sourceColumn.allowReordering || sourceColumn.allowGrouping || sourceColumn.allowHiding)) {
      if (sourceLocation === targetLocation) {
        if (sourceLocation === COLUMN_CHOOSER_LOCATION) {
          return false;
        }
        // @ts-expect-error
        fromVisibleIndex = isObject(fromVisibleIndex) ? fromVisibleIndex.columnIndex : fromVisibleIndex;
        // @ts-expect-error
        toVisibleIndex = isObject(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
        return fromVisibleIndex !== toVisibleIndex && fromVisibleIndex + 1 !== toVisibleIndex;
      }
      if (sourceLocation === GROUP_LOCATION && targetLocation !== COLUMN_CHOOSER_LOCATION || targetLocation === GROUP_LOCATION) {
        return sourceColumn && sourceColumn.allowGrouping;
      }
      if (sourceLocation === COLUMN_CHOOSER_LOCATION || targetLocation === COLUMN_CHOOSER_LOCATION) {
        return sourceColumn && sourceColumn.allowHiding;
      }
      return true;
    }
    return false;
  }
  moveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
    var that = this;
    var options = {};
    var prevGroupIndex;
    var fromIndex = getColumnIndexByVisibleIndex(that, fromVisibleIndex, sourceLocation);
    var toIndex = getColumnIndexByVisibleIndex(that, toVisibleIndex, targetLocation);
    var targetGroupIndex;
    if (fromIndex >= 0) {
      var column = that._columns[fromIndex];
      // @ts-expect-error
      toVisibleIndex = isObject(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
      targetGroupIndex = toIndex >= 0 ? that._columns[toIndex].groupIndex : -1;
      if (isDefined(column.groupIndex) && sourceLocation === GROUP_LOCATION) {
        if (targetGroupIndex > column.groupIndex) {
          targetGroupIndex--;
        }
        if (targetLocation !== GROUP_LOCATION) {
          options.groupIndex = undefined;
        } else {
          prevGroupIndex = column.groupIndex;
          delete column.groupIndex;
          updateColumnGroupIndexes(that);
        }
      }
      if (targetLocation === GROUP_LOCATION) {
        options.groupIndex = moveColumnToGroup(that, column, targetGroupIndex);
        column.groupIndex = prevGroupIndex;
      } else if (toVisibleIndex >= 0) {
        var targetColumn = that._columns[toIndex];
        if (!targetColumn || column.ownerBand !== targetColumn.ownerBand) {
          options.visibleIndex = MAX_SAFE_INTEGER;
        } else if (isColumnFixed(that, column) ^ isColumnFixed(that, targetColumn)) {
          options.visibleIndex = MAX_SAFE_INTEGER;
        } else {
          options.visibleIndex = targetColumn.visibleIndex;
        }
      }
      var isVisible = targetLocation !== COLUMN_CHOOSER_LOCATION;
      if (column.visible !== isVisible) {
        options.visible = isVisible;
      }
      that.columnOption(column.index, options);
    }
  }
  changeSortOrder(columnIndex, sortOrder) {
    var that = this;
    var options = {};
    var sortingOptions = that.option('sorting');
    var sortingMode = sortingOptions && sortingOptions.mode;
    var needResetSorting = sortingMode === 'single' || !sortOrder;
    var allowSorting = sortingMode === 'single' || sortingMode === 'multiple';
    var column = that._columns[columnIndex];
    var nextSortOrder = function nextSortOrder(column) {
      if (sortOrder === 'ctrl') {
        if (!('sortOrder' in column && 'sortIndex' in column)) {
          return false;
        }
        options.sortOrder = undefined;
        options.sortIndex = undefined;
      } else if (isDefined(column.groupIndex) || isDefined(column.sortIndex)) {
        options.sortOrder = column.sortOrder === 'desc' ? 'asc' : 'desc';
      } else {
        options.sortOrder = 'asc';
      }
      return true;
    };
    if (allowSorting && column && column.allowSorting) {
      if (needResetSorting && !isDefined(column.groupIndex)) {
        each(that._columns, function (index) {
          if (index !== columnIndex && this.sortOrder) {
            if (!isDefined(this.groupIndex)) {
              delete this.sortOrder;
            }
            delete this.sortIndex;
          }
        });
      }
      if (isSortOrderValid(sortOrder)) {
        if (column.sortOrder !== sortOrder) {
          options.sortOrder = sortOrder;
        }
      } else if (sortOrder === 'none') {
        if (column.sortOrder) {
          options.sortIndex = undefined;
          options.sortOrder = undefined;
        }
      } else {
        nextSortOrder(column);
      }
    }
    that.columnOption(column.index, options);
  }
  getSortDataSourceParameters(useLocalSelector) {
    var that = this;
    var sortColumns = [];
    var sort = [];
    each(that._columns, function () {
      if ((this.dataField || this.selector || this.calculateCellValue) && isDefined(this.sortIndex) && !isDefined(this.groupIndex)) {
        sortColumns[this.sortIndex] = this;
      }
    });
    each(sortColumns, function () {
      var sortOrder = this && this.sortOrder;
      if (isSortOrderValid(sortOrder)) {
        var sortItem = {
          selector: this.calculateSortValue || this.displayField || this.calculateDisplayValue || useLocalSelector && this.selector || this.dataField || this.calculateCellValue,
          desc: this.sortOrder === 'desc'
        };
        if (this.sortingMethod) {
          sortItem.compare = this.sortingMethod.bind(this);
        }
        sort.push(sortItem);
      }
    });
    return sort.length > 0 ? sort : null;
  }
  getGroupDataSourceParameters(useLocalSelector) {
    var group = [];
    each(this.getGroupColumns(), function () {
      var selector = this.calculateGroupValue || this.displayField || this.calculateDisplayValue || useLocalSelector && this.selector || this.dataField || this.calculateCellValue;
      if (selector) {
        var groupItem = {
          selector,
          desc: this.sortOrder === 'desc',
          isExpanded: !!this.autoExpandGroup
        };
        if (this.sortingMethod) {
          groupItem.compare = this.sortingMethod.bind(this);
        }
        group.push(groupItem);
      }
    });
    return group.length > 0 ? group : null;
  }
  refresh(updateNewLookupsOnly) {
    var deferreds = [];
    each(this._columns, function () {
      var {
        lookup
      } = this;
      if (lookup && !this.calculateDisplayValue) {
        if (updateNewLookupsOnly && lookup.valueMap) {
          return;
        }
        if (lookup.update) {
          deferreds.push(lookup.update());
        }
      }
    });
    return when.apply($, deferreds).done(resetColumnsCache.bind(null, this));
  }
  _updateColumnOptions(column, columnIndex) {
    column.selector = column.selector || function (data) {
      return column.calculateCellValue(data);
    };
    if (this._reinitAfterLookupChanges && this._previousColumns) {
      column.selector.columnIndex = columnIndex;
      column.selector.originalCallback = this._previousColumns[columnIndex].selector.originalCallback;
    } else {
      column.selector.columnIndex = columnIndex;
      column.selector.originalCallback = column.selector;
    }
    each(['calculateSortValue', 'calculateGroupValue', 'calculateDisplayValue'], (_, calculateCallbackName) => {
      var calculateCallback = column[calculateCallbackName];
      if (isFunction(calculateCallback)) {
        if (!calculateCallback.originalCallback) {
          var context = {
            column
          };
          column[calculateCallbackName] = function (data) {
            return calculateCallback.call(context.column, data);
          };
          column[calculateCallbackName].originalCallback = calculateCallback;
          column[calculateCallbackName].columnIndex = columnIndex;
          column[calculateCallbackName].context = context;
        } else {
          column[calculateCallbackName].context.column = column;
        }
      }
    });
    if (isString(column.calculateDisplayValue)) {
      column.displayField = column.calculateDisplayValue;
      column.calculateDisplayValue = compileGetter(column.displayField);
    }
    if (column.calculateDisplayValue) {
      column.displayValueMap = column.displayValueMap || {};
    }
    updateSerializers(column, column.dataType);
    var {
      lookup
    } = column;
    if (lookup) {
      updateSerializers(lookup, lookup.dataType);
    }
    var dataType = lookup ? lookup.dataType : column.dataType;
    if (dataType) {
      column.alignment = column.alignment || getAlignmentByDataType(dataType, this.option('rtlEnabled'));
      column.format = column.format || gridCoreUtils.getFormatByDataType(dataType);
      column.customizeText = column.customizeText || getCustomizeTextByDataType(dataType);
      column.defaultFilterOperations = column.defaultFilterOperations || !lookup && DATATYPE_OPERATIONS[dataType] || [];
      if (!isDefined(column.filterOperations)) {
        setFilterOperationsAsDefaultValues(column);
      }
      column.defaultFilterOperation = column.filterOperations && column.filterOperations[0] || '=';
      column.showEditorAlways = isDefined(column.showEditorAlways) ? column.showEditorAlways : dataType === 'boolean' && !column.cellTemplate && !column.lookup;
    }
  }
  updateColumnDataTypes(dataSource) {
    var that = this;
    var dateSerializationFormat = that.option('dateSerializationFormat');
    var firstItems = that._getFirstItems(dataSource);
    var isColumnDataTypesUpdated = false;
    each(that._columns, (index, column) => {
      var i;
      var value;
      var dataType;
      var lookupDataType;
      var valueDataType;
      var {
        lookup
      } = column;
      if (gridCoreUtils.isDateType(column.dataType) && column.serializationFormat === undefined) {
        column.serializationFormat = dateSerializationFormat;
      }
      if (lookup && gridCoreUtils.isDateType(lookup.dataType) && column.serializationFormat === undefined) {
        lookup.serializationFormat = dateSerializationFormat;
      }
      if (column.calculateCellValue && firstItems.length) {
        if (!column.dataType || lookup && !lookup.dataType) {
          for (i = 0; i < firstItems.length; i++) {
            value = column.calculateCellValue(firstItems[i]);
            if (!column.dataType) {
              valueDataType = getValueDataType(value);
              dataType = dataType || valueDataType;
              if (dataType && valueDataType && dataType !== valueDataType) {
                dataType = 'string';
              }
            }
            if (lookup && !lookup.dataType) {
              valueDataType = getValueDataType(gridCoreUtils.getDisplayValue(column, value, firstItems[i]));
              lookupDataType = lookupDataType || valueDataType;
              if (lookupDataType && valueDataType && lookupDataType !== valueDataType) {
                lookupDataType = 'string';
              }
            }
          }
          if (dataType || lookupDataType) {
            if (dataType) {
              column.dataType = dataType;
            }
            if (lookup && lookupDataType) {
              lookup.dataType = lookupDataType;
            }
            isColumnDataTypesUpdated = true;
          }
        }
        if (column.serializationFormat === undefined || lookup && lookup.serializationFormat === undefined) {
          for (i = 0; i < firstItems.length; i++) {
            value = column.calculateCellValue(firstItems[i], true);
            if (column.serializationFormat === undefined) {
              column.serializationFormat = getSerializationFormat(column.dataType, value);
            }
            if (lookup && lookup.serializationFormat === undefined) {
              lookup.serializationFormat = getSerializationFormat(lookup.dataType, lookup.calculateCellValue(value, true));
            }
          }
        }
      }
      that._updateColumnOptions(column, index);
    });
    return isColumnDataTypesUpdated;
  }
  _customizeColumns(columns) {
    var that = this;
    var customizeColumns = that.option('customizeColumns');
    if (customizeColumns) {
      var hasOwnerBand = columns.some(column => isObject(column.ownerBand));
      if (hasOwnerBand) {
        updateIndexes(that);
      }
      customizeColumns(columns);
      assignColumns(that, createColumnsFromOptions(that, columns));
    }
  }
  updateColumns(dataSource, forceApplying, isApplyingUserState) {
    if (!forceApplying) {
      this.updateSortingGrouping(dataSource);
    }
    if (!dataSource || dataSource.isLoaded()) {
      var sortParameters = dataSource ? dataSource.sort() || [] : this.getSortDataSourceParameters();
      var groupParameters = dataSource ? dataSource.group() || [] : this.getGroupDataSourceParameters();
      var filterParameters = dataSource === null || dataSource === void 0 ? void 0 : dataSource.lastLoadOptions().filter;
      if (!isApplyingUserState) {
        this._customizeColumns(this._columns);
      }
      updateIndexes(this);
      var columns = this._columns;
      return when(this.refresh(true)).always(() => {
        if (this._columns !== columns) return;
        this._updateChanges(dataSource, {
          sorting: sortParameters,
          grouping: groupParameters,
          filtering: filterParameters
        });
        fireColumnsChanged(this);
      });
    }
  }
  _updateChanges(dataSource, parameters) {
    if (dataSource) {
      this.updateColumnDataTypes(dataSource);
      this._dataSourceApplied = true;
    }
    if (!gridCoreUtils.equalSortParameters(parameters.sorting, this.getSortDataSourceParameters())) {
      updateColumnChanges(this, 'sorting');
    }
    if (!gridCoreUtils.equalSortParameters(parameters.grouping, this.getGroupDataSourceParameters())) {
      updateColumnChanges(this, 'grouping');
    }
    var dataController = this.getController('data');
    if (dataController && !gridCoreUtils.equalFilterParameters(parameters.filtering, dataController.getCombinedFilter())) {
      updateColumnChanges(this, 'filtering');
    }
    updateColumnChanges(this, 'columns');
  }
  updateSortingGrouping(dataSource, fromDataSource) {
    var that = this;
    var sortParameters;
    var isColumnsChanged;
    var updateSortGroupParameterIndexes = function updateSortGroupParameterIndexes(columns, sortParameters, indexParameterName) {
      each(columns, (index, column) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete column[indexParameterName];
        if (sortParameters) {
          for (var i = 0; i < sortParameters.length; i++) {
            var {
              selector
            } = sortParameters[i];
            var {
              isExpanded
            } = sortParameters[i];
            if (selector === column.dataField || selector === column.name || selector === column.selector || selector === column.calculateCellValue || selector === column.calculateGroupValue || selector === column.calculateDisplayValue) {
              if (fromDataSource) {
                column.sortOrder = 'sortOrder' in column ? column.sortOrder : sortParameters[i].desc ? 'desc' : 'asc';
              } else {
                column.sortOrder = column.sortOrder || (sortParameters[i].desc ? 'desc' : 'asc');
              }
              if (isExpanded !== undefined) {
                column.autoExpandGroup = isExpanded;
              }
              column[indexParameterName] = i;
              break;
            }
          }
        }
      });
    };
    if (dataSource) {
      sortParameters = gridCoreUtils.normalizeSortingInfo(dataSource.sort());
      var groupParameters = gridCoreUtils.normalizeSortingInfo(dataSource.group());
      var columnsGroupParameters = that.getGroupDataSourceParameters();
      var columnsSortParameters = that.getSortDataSourceParameters();
      var groupingChanged = !gridCoreUtils.equalSortParameters(groupParameters, columnsGroupParameters, true);
      var groupExpandingChanged = !groupingChanged && !gridCoreUtils.equalSortParameters(groupParameters, columnsGroupParameters);
      if (!that._columns.length) {
        each(groupParameters, (index, group) => {
          that._columns.push(group.selector);
        });
        each(sortParameters, (index, sort) => {
          if (!isFunction(sort.selector)) {
            that._columns.push(sort.selector);
          }
        });
        assignColumns(that, createColumnsFromOptions(that, that._columns));
      }
      if ((fromDataSource || !columnsGroupParameters && !that._hasUserState) && (groupingChanged || groupExpandingChanged)) {
        updateSortGroupParameterIndexes(that._columns, groupParameters, 'groupIndex');
        if (fromDataSource) {
          groupingChanged && updateColumnChanges(that, 'grouping');
          groupExpandingChanged && updateColumnChanges(that, 'groupExpanding');
          isColumnsChanged = true;
        }
      }
      if ((fromDataSource || !columnsSortParameters && !that._hasUserState) && !gridCoreUtils.equalSortParameters(sortParameters, columnsSortParameters)) {
        updateSortGroupParameterIndexes(that._columns, sortParameters, 'sortIndex');
        if (fromDataSource) {
          updateColumnChanges(that, 'sorting');
          isColumnsChanged = true;
        }
      }
      if (isColumnsChanged) {
        fireColumnsChanged(that);
      }
    }
  }
  updateFilter(filter, remoteFiltering, columnIndex, filterValue) {
    var that = this;
    if (!Array.isArray(filter)) return filter;
    filter = extend([], filter);
    columnIndex = filter.columnIndex !== undefined ? filter.columnIndex : columnIndex;
    filterValue = filter.filterValue !== undefined ? filter.filterValue : filterValue;
    if (isString(filter[0]) && filter[0] !== '!') {
      var column = that.columnOption(filter[0]);
      if (remoteFiltering) {
        if (config().forceIsoDateParsing && column && column.serializeValue && filter.length > 1) {
          filter[filter.length - 1] = column.serializeValue(filter[filter.length - 1], 'filter');
        }
      } else if (column && column.selector) {
        filter[0] = column.selector;
        filter[0].columnIndex = column.index;
      }
    } else if (isFunction(filter[0])) {
      filter[0].columnIndex = columnIndex;
      filter[0].filterValue = filterValue;
      filter[0].selectedFilterOperation = filter.selectedFilterOperation;
    }
    for (var i = 0; i < filter.length; i++) {
      filter[i] = that.updateFilter(filter[i], remoteFiltering, columnIndex, filterValue);
    }
    return filter;
  }
  columnCount() {
    return this._columns ? this._columns.length : 0;
  }
  columnOption(identifier, option, value, notFireEvent) {
    var that = this;
    var columns = that._columns.concat(that._commandColumns);
    var column = findColumn(columns, identifier);
    if (column) {
      if (arguments.length === 1) {
        return extend({}, column);
      }
      if (isString(option)) {
        if (arguments.length === 2) {
          return columnOptionCore(that, column, option);
        }
        columnOptionCore(that, column, option, value, notFireEvent);
      } else if (isObject(option)) {
        each(option, (optionName, value) => {
          columnOptionCore(that, column, optionName, value, notFireEvent);
        });
      }
      fireColumnsChanged(that);
    }
  }
  clearSorting() {
    var that = this;
    var columnCount = this.columnCount();
    that.beginUpdate();
    for (var i = 0; i < columnCount; i++) {
      that.columnOption(i, 'sortOrder', undefined);
      // option needs to be deleted from column to prevert conflicts in syncing loadOptions from dataSource. See T1147379
      delete findColumn(that._columns, i).sortOrder;
    }
    that.endUpdate();
  }
  clearGrouping() {
    var that = this;
    var columnCount = this.columnCount();
    that.beginUpdate();
    for (var i = 0; i < columnCount; i++) {
      that.columnOption(i, 'groupIndex', undefined);
    }
    that.endUpdate();
  }
  getVisibleIndex(index, rowIndex) {
    var columns = this.getVisibleColumns(rowIndex);
    for (var i = columns.length - 1; i >= 0; i--) {
      if (columns[i].index === index) {
        return i;
      }
    }
    return -1;
  }
  getVisibleIndexByColumn(column, rowIndex) {
    var visibleColumns = this.getVisibleColumns(rowIndex);
    var visibleColumn = visibleColumns.filter(col => col.index === column.index && col.command === column.command)[0];
    return visibleColumns.indexOf(visibleColumn);
  }
  getVisibleColumnIndex(id, rowIndex) {
    var index = this.columnOption(id, 'index');
    return this.getVisibleIndex(index, rowIndex);
  }
  addColumn(options) {
    var that = this;
    var column = createColumn(that, options);
    var index = that._columns.length;
    that._columns.push(column);
    if (column.isBand) {
      that._columns = createColumnsFromOptions(that, that._columns);
      column = that._columns[index];
    }
    column.added = options;
    updateIndexes(that, column);
    that.updateColumns(that._dataSource);
    that._checkColumns();
  }
  deleteColumn(id) {
    var that = this;
    var column = that.columnOption(id);
    if (column && column.index >= 0) {
      convertOwnerBandToColumnReference(that._columns);
      that._columns.splice(column.index, 1);
      if (column.isBand) {
        var childIndexes = that.getChildrenByBandColumn(column.index).map(column => column.index);
        that._columns = that._columns.filter(column => childIndexes.indexOf(column.index) < 0);
      }
      updateIndexes(that);
      that.updateColumns(that._dataSource);
    }
  }
  addCommandColumn(options) {
    var commandColumn = this._commandColumns.filter(column => column.command === options.command)[0];
    if (!commandColumn) {
      commandColumn = options;
      this._commandColumns.push(commandColumn);
    }
  }
  getUserState() {
    var columns = this._columns;
    var result = [];
    var i;
    function handleStateField(index, value) {
      if (columns[i][value] !== undefined) {
        result[i][value] = columns[i][value];
      }
    }
    for (i = 0; i < columns.length; i++) {
      result[i] = {};
      each(USER_STATE_FIELD_NAMES, handleStateField);
    }
    return result;
  }
  setName(column) {
    column.name = column.name || column.dataField || column.type;
  }
  setUserState(state) {
    var that = this;
    var dataSource = that._dataSource;
    var ignoreColumnOptionNames = that.option('stateStoring.ignoreColumnOptionNames');
    state === null || state === void 0 ? void 0 : state.forEach(this.setName);
    if (!ignoreColumnOptionNames) {
      ignoreColumnOptionNames = [];
      var commonColumnSettings = that.getCommonSettings();
      if (!that.option('columnChooser.enabled')) ignoreColumnOptionNames.push('visible');
      if (that.option('sorting.mode') === 'none') ignoreColumnOptionNames.push('sortIndex', 'sortOrder');
      if (!commonColumnSettings.allowGrouping) ignoreColumnOptionNames.push('groupIndex');
      if (!commonColumnSettings.allowFixing) ignoreColumnOptionNames.push('fixed', 'fixedPosition');
      if (!commonColumnSettings.allowResizing) ignoreColumnOptionNames.push('width', 'visibleWidth');
      var isFilterPanelHidden = !that.option('filterPanel.visible');
      if (!that.option('filterRow.visible') && isFilterPanelHidden) ignoreColumnOptionNames.push('filterValue', 'selectedFilterOperation');
      if (!that.option('headerFilter.visible') && isFilterPanelHidden) ignoreColumnOptionNames.push('filterValues', 'filterType');
    }
    that._columnsUserState = state;
    that._ignoreColumnOptionNames = ignoreColumnOptionNames;
    that._hasUserState = !!state;
    updateColumnChanges(that, 'filtering');
    that.init(true);
    if (dataSource) {
      dataSource.sort(that.getSortDataSourceParameters());
      dataSource.group(that.getGroupDataSourceParameters());
    }
  }
  _checkColumns() {
    var usedNames = {};
    var hasEditableColumnWithoutName = false;
    var duplicatedNames = [];
    this._columns.forEach(column => {
      var _a;
      var {
        name
      } = column;
      var isBand = (_a = column.columns) === null || _a === void 0 ? void 0 : _a.length;
      var isEditable = column.allowEditing && (column.dataField || column.setCellValue) && !isBand;
      if (name) {
        if (usedNames[name]) {
          duplicatedNames.push("\"".concat(name, "\""));
        }
        usedNames[name] = true;
      } else if (isEditable) {
        hasEditableColumnWithoutName = true;
      }
    });
    if (duplicatedNames.length) {
      errors.log('E1059', duplicatedNames.join(', '));
    }
    if (hasEditableColumnWithoutName) {
      errors.log('E1060');
    }
  }
  _createCalculatedColumnOptions(columnOptions, bandColumn) {
    var calculatedColumnOptions = {};
    var {
      dataField
    } = columnOptions;
    if (Array.isArray(columnOptions.columns) && columnOptions.columns.length || columnOptions.isBand) {
      calculatedColumnOptions.isBand = true;
      dataField = null;
    }
    if (dataField) {
      if (isString(dataField)) {
        var getter = compileGetter(dataField);
        calculatedColumnOptions = {
          caption: captionize(dataField),
          calculateCellValue(data, skipDeserialization) {
            // @ts-expect-error
            var value = getter(data);
            return this.deserializeValue && !skipDeserialization ? this.deserializeValue(value) : value;
          },
          setCellValue: defaultSetCellValue,
          parseValue(text) {
            var column = this;
            var result;
            var parsedValue;
            if (column.dataType === 'number') {
              if (isString(text) && column.format) {
                result = strictParseNumber(text.trim(), column.format);
              } else if (isDefined(text) && isNumeric(text)) {
                result = Number(text);
              }
            } else if (column.dataType === 'boolean') {
              if (text === column.trueText) {
                result = true;
              } else if (text === column.falseText) {
                result = false;
              }
            } else if (gridCoreUtils.isDateType(column.dataType)) {
              // @ts-expect-error
              parsedValue = dateLocalization.parse(text, column.format);
              if (parsedValue) {
                result = parsedValue;
              }
            } else {
              result = text;
            }
            return result;
          }
        };
      }
      calculatedColumnOptions.allowFiltering = true;
    } else {
      calculatedColumnOptions.allowFiltering = !!columnOptions.calculateFilterExpression;
    }
    calculatedColumnOptions.calculateFilterExpression = function () {
      // @ts-expect-error
      return filterUtils.defaultCalculateFilterExpression.apply(this, arguments);
    };
    calculatedColumnOptions.defaultFilterOperation = '=';
    calculatedColumnOptions.createFilterExpression = function (filterValue, selectedFilterOperation) {
      var result;
      if (this.calculateFilterExpression) {
        result = this.calculateFilterExpression.apply(this, arguments);
      }
      if (isFunction(result)) {
        result = [result, '=', true];
      }
      if (result) {
        result.columnIndex = this.index;
        result.filterValue = filterValue;
        result.selectedFilterOperation = selectedFilterOperation;
      }
      return result;
    };
    if (!dataField || !isString(dataField)) {
      extend(true, calculatedColumnOptions, {
        allowSorting: false,
        allowGrouping: false,
        calculateCellValue() {
          return null;
        }
      });
    }
    if (bandColumn) {
      calculatedColumnOptions.allowFixing = false;
    }
    if (columnOptions.dataType) {
      calculatedColumnOptions.userDataType = columnOptions.dataType;
    }
    if (columnOptions.selectedFilterOperation && !('defaultSelectedFilterOperation' in calculatedColumnOptions)) {
      calculatedColumnOptions.defaultSelectedFilterOperation = columnOptions.selectedFilterOperation;
    }
    if (columnOptions.lookup) {
      calculatedColumnOptions.lookup = {
        calculateCellValue(value, skipDeserialization) {
          if (this.valueExpr) {
            value = this.valueMap && this.valueMap[value];
          }
          return this.deserializeValue && !skipDeserialization ? this.deserializeValue(value) : value;
        },
        updateValueMap() {
          this.valueMap = {};
          if (this.items) {
            var calculateValue = compileGetter(this.valueExpr);
            var calculateDisplayValue = compileGetter(this.displayExpr);
            for (var i = 0; i < this.items.length; i++) {
              var item = this.items[i];
              var displayValue = calculateDisplayValue(item);
              this.valueMap[calculateValue(item)] = displayValue;
              this.dataType = this.dataType || getValueDataType(displayValue);
            }
          }
        },
        update() {
          var that = this;
          var {
            dataSource
          } = that;
          if (dataSource) {
            if (isFunction(dataSource) && !variableWrapper.isWrapped(dataSource)) {
              dataSource = dataSource({});
            }
            if (isPlainObject(dataSource) || dataSource instanceof Store || Array.isArray(dataSource)) {
              if (that.valueExpr) {
                var dataSourceOptions = normalizeDataSourceOptions(dataSource);
                dataSourceOptions.paginate = false;
                dataSource = new DataSource(dataSourceOptions);
                return dataSource.load().done(data => {
                  that.items = data;
                  that.updateValueMap && that.updateValueMap();
                });
              }
            } else {
              errors.log('E1016');
            }
          } else {
            that.updateValueMap && that.updateValueMap();
          }
        }
      };
    }
    calculatedColumnOptions.resizedCallbacks = Callbacks();
    if (columnOptions.resized) {
      calculatedColumnOptions.resizedCallbacks.add(columnOptions.resized.bind(columnOptions));
    }
    each(calculatedColumnOptions, optionName => {
      if (isFunction(calculatedColumnOptions[optionName]) && optionName.indexOf('default') !== 0) {
        var defaultOptionName = "default".concat(optionName.charAt(0).toUpperCase()).concat(optionName.substr(1));
        calculatedColumnOptions[defaultOptionName] = calculatedColumnOptions[optionName];
      }
    });
    return calculatedColumnOptions;
  }
  getRowCount() {
    this._rowCount = this._rowCount || getRowCount(this);
    return this._rowCount;
  }
  getRowIndex(columnIndex, alwaysGetRowIndex) {
    var column = this._columns[columnIndex];
    var bandColumnsCache = this.getBandColumnsCache();
    return column && (alwaysGetRowIndex || column.visible && !(column.command || isDefined(column.groupIndex))) ? getParentBandColumns(columnIndex, bandColumnsCache.columnParentByIndex).length : 0;
  }
  getChildrenByBandColumn(bandColumnIndex, onlyVisibleDirectChildren) {
    var that = this;
    var bandColumnsCache = that.getBandColumnsCache();
    var result = getChildrenByBandColumn(bandColumnIndex, bandColumnsCache.columnChildrenByIndex, !onlyVisibleDirectChildren);
    if (onlyVisibleDirectChildren) {
      return result.filter(column => column.visible && !column.command).sort((column1, column2) => column1.visibleIndex - column2.visibleIndex);
    }
    return result;
  }
  isParentBandColumn(columnIndex, bandColumnIndex) {
    var result = false;
    var column = this._columns[columnIndex];
    var bandColumnsCache = this.getBandColumnsCache();
    var parentBandColumns = column && getParentBandColumns(columnIndex, bandColumnsCache.columnParentByIndex);
    if (parentBandColumns) {
      // T416483 - fix for jquery 2.1.4
      each(parentBandColumns, (_, bandColumn) => {
        if (bandColumn.index === bandColumnIndex) {
          result = true;
          return false;
        }
      });
    }
    return result;
  }
  isParentColumnVisible(columnIndex) {
    var result = true;
    var bandColumnsCache = this.getBandColumnsCache();
    var bandColumns = columnIndex >= 0 && getParentBandColumns(columnIndex, bandColumnsCache.columnParentByIndex);
    bandColumns && each(bandColumns, (_, bandColumn) => {
      result = result && bandColumn.visible;
      return result;
    });
    return result;
  }
  getColumnId(column) {
    if (column.command && column.type === GROUP_COMMAND_COLUMN_NAME) {
      if (isCustomCommandColumn(this, column)) {
        return "type:".concat(column.type);
      }
      return "command:".concat(column.command);
    }
    return column.index;
  }
  getCustomizeTextByDataType(dataType) {
    return getCustomizeTextByDataType(dataType);
  }
  getHeaderContentAlignment(columnAlignment) {
    var rtlEnabled = this.option('rtlEnabled');
    if (rtlEnabled) {
      return columnAlignment === 'left' ? 'right' : 'left';
    }
    return columnAlignment;
  }
}
export var columnsControllerModule = {
  defaultOptions() {
    return {
      commonColumnSettings: {
        allowFiltering: true,
        allowHiding: true,
        allowSorting: true,
        allowEditing: true,
        encodeHtml: true,
        trueText: messageLocalization.format('dxDataGrid-trueText'),
        falseText: messageLocalization.format('dxDataGrid-falseText')
      },
      allowColumnReordering: false,
      allowColumnResizing: false,
      columnResizingMode: 'nextColumn',
      columnMinWidth: undefined,
      columnWidth: undefined,
      adaptColumnWidthByRatio: true,
      columns: undefined,
      regenerateColumnsByVisibleItems: false,
      customizeColumns: null,
      dateSerializationFormat: undefined
    };
  },
  controllers: {
    columns: ColumnsController
  }
};