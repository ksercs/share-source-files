"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsControllerModule = exports.ColumnsController = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _callbacks = _interopRequireDefault(require("../../../../core/utils/callbacks"));
var _data = require("../../../../core/utils/data");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _inflector = require("../../../../core/utils/inflector");
var _iterator = require("../../../../core/utils/iterator");
var _object = require("../../../../core/utils/object");
var _type = require("../../../../core/utils/type");
var _variable_wrapper = _interopRequireDefault(require("../../../../core/utils/variable_wrapper"));
var _abstract_store = _interopRequireDefault(require("../../../../data/abstract_store"));
var _data_source = require("../../../../data/data_source/data_source");
var _utils = require("../../../../data/data_source/utils");
var _date = _interopRequireDefault(require("../../../../localization/date"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _filtering = _interopRequireDefault(require("../../../../ui/shared/filtering"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const = require("./const");
var _m_columns_controller_utils = require("./m_columns_controller_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } /* eslint-disable prefer-destructuring */
var ColumnsController = /*#__PURE__*/function (_modules$Controller) {
  _inheritsLoose(ColumnsController, _modules$Controller);
  function ColumnsController() {
    return _modules$Controller.apply(this, arguments) || this;
  }
  var _proto = ColumnsController.prototype;
  _proto._getExpandColumnOptions = function _getExpandColumnOptions() {
    return {
      type: 'expand',
      command: 'expand',
      width: 'auto',
      cssClass: _const.COMMAND_EXPAND_CLASS,
      allowEditing: false,
      allowGrouping: false,
      allowSorting: false,
      allowResizing: false,
      allowReordering: false,
      allowHiding: false
    };
  };
  _proto._getFirstItems = function _getFirstItems(dataSource) {
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
      groupsCount = _m_utils.default.normalizeSortingInfo(dataSource.group()).length;
      items = getFirstItemsCore(dataSource.items(), groupsCount) || [];
    }
    return items;
  };
  _proto._endUpdateCore = function _endUpdateCore() {
    !this._skipProcessingColumnsChange && (0, _m_columns_controller_utils.fireColumnsChanged)(this);
  };
  _proto.init = function init(isApplyingUserState) {
    var that = this;
    var columns = that.option('columns');
    that._commandColumns = that._commandColumns || [];
    that._columns = that._columns || [];
    that._isColumnsFromOptions = !!columns;
    if (that._isColumnsFromOptions) {
      (0, _m_columns_controller_utils.assignColumns)(that, columns ? (0, _m_columns_controller_utils.createColumnsFromOptions)(that, columns) : []);
      (0, _m_columns_controller_utils.applyUserState)(that);
    } else {
      (0, _m_columns_controller_utils.assignColumns)(that, that._columnsUserState ? (0, _m_columns_controller_utils.createColumnsFromOptions)(that, that._columnsUserState) : that._columns);
    }
    (0, _m_columns_controller_utils.addExpandColumn)(that);
    if (that._dataSourceApplied) {
      that.applyDataSource(that._dataSource, true, isApplyingUserState);
    } else {
      (0, _m_columns_controller_utils.updateIndexes)(that);
    }
    that._checkColumns();
  };
  _proto.callbackNames = function callbackNames() {
    return ['columnsChanged'];
  };
  _proto.getColumnByPath = function getColumnByPath(path, columns) {
    var that = this;
    var column;
    var columnIndexes = [];
    path.replace(_const.COLUMN_OPTION_REGEXP, function (_, columnIndex) {
      // eslint-disable-next-line radix
      columnIndexes.push(parseInt(columnIndex));
      return '';
    });
    if (columnIndexes.length) {
      if (columns) {
        column = columnIndexes.reduce(function (column, index) {
          return column && column.columns && column.columns[index];
        }, {
          columns
        });
      } else {
        column = (0, _m_columns_controller_utils.getColumnByIndexes)(that, columnIndexes);
      }
    }
    return column;
  };
  _proto.optionChanged = function optionChanged(args) {
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
        _modules$Controller.prototype.optionChanged.call(this, args);
    }
  };
  _proto._columnOptionChanged = function _columnOptionChanged(args) {
    var columnOptionValue = {};
    var column = this.getColumnByPath(args.fullName);
    var columnOptionName = args.fullName.replace(_const.COLUMN_OPTION_REGEXP, '');
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
  };
  _proto._updateRequireResize = function _updateRequireResize(args) {
    var component = this.component;
    if (args.fullName.replace(_const.COLUMN_OPTION_REGEXP, '') === 'width' && component._updateLockCount) {
      component._requireResize = true;
    }
  };
  _proto.publicMethods = function publicMethods() {
    return ['addColumn', 'deleteColumn', 'columnOption', 'columnCount', 'clearSorting', 'clearGrouping', 'getVisibleColumns', 'getVisibleColumnIndex'];
  };
  _proto.applyDataSource = function applyDataSource(dataSource, forceApplying, isApplyingUserState) {
    var that = this;
    var isDataSourceLoaded = dataSource && dataSource.isLoaded();
    that._dataSource = dataSource;
    if (!that._dataSourceApplied || that._dataSourceColumnsCount === 0 || forceApplying || that.option('regenerateColumnsByVisibleItems')) {
      if (isDataSourceLoaded) {
        if (!that._isColumnsFromOptions) {
          var columnsFromDataSource = (0, _m_columns_controller_utils.createColumnsFromDataSource)(that, dataSource);
          if (columnsFromDataSource.length) {
            (0, _m_columns_controller_utils.assignColumns)(that, columnsFromDataSource);
            that._dataSourceColumnsCount = that._columns.length;
            (0, _m_columns_controller_utils.applyUserState)(that);
          }
        }
        return that.updateColumns(dataSource, forceApplying, isApplyingUserState);
      }
      that._dataSourceApplied = false;
      (0, _m_columns_controller_utils.updateIndexes)(that);
    } else if (isDataSourceLoaded && !that.isAllDataTypesDefined(true) && that.updateColumnDataTypes(dataSource)) {
      (0, _m_columns_controller_utils.updateColumnChanges)(that, 'columns');
      (0, _m_columns_controller_utils.fireColumnsChanged)(that);
      // @ts-expect-error
      return new _deferred.Deferred().reject().promise();
    }
  };
  _proto.reset = function reset() {
    this._dataSource = null;
    this._dataSourceApplied = false;
    this._dataSourceColumnsCount = undefined;
    this.reinit();
  };
  _proto.resetColumnsCache = function resetColumnsCache() {
    var that = this;
    that._visibleColumns = undefined;
    that._fixedColumns = undefined;
    that._rowCount = undefined;
    (0, _m_columns_controller_utils.resetBandColumnsCache)(that);
  };
  _proto.reinit = function reinit(ignoreColumnOptionNames) {
    this._columnsUserState = this.getUserState();
    this._ignoreColumnOptionNames = ignoreColumnOptionNames || null;
    this.init();
    if (ignoreColumnOptionNames) {
      this._ignoreColumnOptionNames = null;
    }
  };
  _proto.isInitialized = function isInitialized() {
    return !!this._columns.length || !!this.option('columns');
  };
  _proto.isDataSourceApplied = function isDataSourceApplied() {
    return this._dataSourceApplied;
  };
  _proto.getCommonSettings = function getCommonSettings(column) {
    var _a, _b;
    var commonColumnSettings = (!column || !column.type) && this.option('commonColumnSettings') || {};
    var groupingOptions = (_a = this.option('grouping')) !== null && _a !== void 0 ? _a : {};
    var groupPanelOptions = (_b = this.option('groupPanel')) !== null && _b !== void 0 ? _b : {};
    return (0, _extend.extend)({
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
  };
  _proto.isColumnOptionUsed = function isColumnOptionUsed(optionName) {
    for (var i = 0; i < this._columns.length; i++) {
      if (this._columns[i][optionName]) {
        return true;
      }
    }
  };
  _proto.isAllDataTypesDefined = function isAllDataTypesDefined(checkSerializers) {
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
  };
  _proto.getColumns = function getColumns() {
    return this._columns;
  };
  _proto.isBandColumnsUsed = function isBandColumnsUsed() {
    return this.getColumns().some(function (column) {
      return column.isBand;
    });
  };
  _proto.getGroupColumns = function getGroupColumns() {
    var result = [];
    (0, _iterator.each)(this._columns, function () {
      var column = this;
      if ((0, _type.isDefined)(column.groupIndex)) {
        result[column.groupIndex] = column;
      }
    });
    return result;
  };
  _proto._shouldReturnVisibleColumns = function _shouldReturnVisibleColumns() {
    return true;
  };
  _proto._compileVisibleColumns = function _compileVisibleColumns(rowIndex) {
    this._visibleColumns = this._visibleColumns || this._compileVisibleColumnsCore();
    rowIndex = (0, _type.isDefined)(rowIndex) ? rowIndex : this._visibleColumns.length - 1;
    return this._visibleColumns[rowIndex] || [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ;
  _proto.getVisibleColumns = function getVisibleColumns(rowIndex, isBase) {
    if (!this._shouldReturnVisibleColumns()) {
      return [];
    }
    // @ts-expect-error
    return this._compileVisibleColumns.apply(this, arguments);
  };
  _proto.getFixedColumns = function getFixedColumns(rowIndex) {
    this._fixedColumns = this._fixedColumns || this._getFixedColumnsCore();
    rowIndex = (0, _type.isDefined)(rowIndex) ? rowIndex : this._fixedColumns.length - 1;
    return this._fixedColumns[rowIndex] || [];
  };
  _proto.getFilteringColumns = function getFilteringColumns() {
    return this.getColumns().filter(function (item) {
      return (item.dataField || item.name) && (item.allowFiltering || item.allowHeaderFiltering);
    }).map(function (item) {
      var field = (0, _extend.extend)(true, {}, item);
      if (!(0, _type.isDefined)(field.dataField)) {
        field.dataField = field.name;
      }
      field.filterOperations = item.filterOperations !== item.defaultFilterOperations ? field.filterOperations : null;
      return field;
    });
  };
  _proto.getColumnIndexOffset = function getColumnIndexOffset() {
    return 0;
  };
  _proto._getFixedColumnsCore = function _getFixedColumnsCore() {
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
            if (!(0, _type.isDefined)(transparentColumnIndex)) {
              transparentColumnIndex = j;
            }
          } else if (prevColumn && prevColumn.fixed && (0, _m_columns_controller_utils.getFixedPosition)(that, prevColumn) !== (0, _m_columns_controller_utils.getFixedPosition)(that, column)) {
            if (!(0, _type.isDefined)(transparentColumnIndex)) {
              transparentColumnIndex = j;
            }
          } else {
            lastFixedPosition = column.fixedPosition;
          }
        }
        if (i === 0 && (notFixedColumnCount === 0 || notFixedColumnCount >= visibleColumns.length)) {
          return [];
        }
        if (!(0, _type.isDefined)(transparentColumnIndex)) {
          transparentColumnIndex = lastFixedPosition === 'right' ? 0 : visibleColumns.length;
        }
        result[i] = visibleColumns.slice(0);
        if (!transparentColumn.colspan) {
          transparentColumn.colspan = transparentColspan;
        }
        result[i].splice(transparentColumnIndex, notFixedColumnCount, transparentColumn);
      }
    }
    return result.map(function (columns) {
      return columns.map(function (column) {
        var newColumn = _extends({}, column);
        if (newColumn.headerId) {
          newColumn.headerId += '-fixed';
        }
        return newColumn;
      });
    });
  };
  _proto._isColumnFixing = function _isColumnFixing() {
    var isColumnFixing = this.option('columnFixing.enabled');
    !isColumnFixing && (0, _iterator.each)(this._columns, function (_, column) {
      if (column.fixed) {
        isColumnFixing = true;
        return false;
      }
    });
    return isColumnFixing;
  };
  _proto._getExpandColumnsCore = function _getExpandColumnsCore() {
    return this.getGroupColumns();
  };
  _proto.getExpandColumns = function getExpandColumns() {
    var expandColumns = this._getExpandColumnsCore();
    var expandColumn;
    var firstGroupColumn = expandColumns.filter(function (column) {
      return column.groupIndex === 0;
    })[0];
    var isFixedFirstGroupColumn = firstGroupColumn && firstGroupColumn.fixed;
    var isColumnFixing = this._isColumnFixing();
    var rtlEnabled = this.option('rtlEnabled');
    if (expandColumns.length) {
      expandColumn = this.columnOption('command:expand');
    }
    expandColumns = (0, _iterator.map)(expandColumns, function (column) {
      return (0, _extend.extend)({}, column, {
        visibleWidth: null,
        minWidth: null,
        cellTemplate: !(0, _type.isDefined)(column.groupIndex) ? column.cellTemplate : null,
        headerCellTemplate: null,
        fixed: !(0, _type.isDefined)(column.groupIndex) || !isFixedFirstGroupColumn ? isColumnFixing : true,
        fixedPosition: rtlEnabled ? 'right' : 'left'
      }, expandColumn, {
        index: column.index,
        type: column.type || _const.GROUP_COMMAND_COLUMN_NAME
      });
    });
    return expandColumns;
  };
  _proto.getBandColumnsCache = function getBandColumnsCache() {
    if (!this._bandColumnsCache) {
      var columns = this._columns;
      var columnChildrenByIndex = {};
      var columnParentByIndex = {};
      var isPlain = true;
      columns.forEach(function (column) {
        var ownerBand = column.ownerBand;
        // @ts-expect-error
        var parentIndex = (0, _type.isObject)(ownerBand) ? ownerBand.index : ownerBand;
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
  };
  _proto._isColumnVisible = function _isColumnVisible(column) {
    return column.visible && this.isParentColumnVisible(column.index);
  };
  _proto._isColumnInGroupPanel = function _isColumnInGroupPanel(column) {
    return (0, _type.isDefined)(column.groupIndex) && !column.showWhenGrouped;
  };
  _proto.hasVisibleDataColumns = function hasVisibleDataColumns() {
    var _this = this;
    var columns = this._columns;
    return columns.some(function (column) {
      var isVisible = _this._isColumnVisible(column);
      var isInGroupPanel = _this._isColumnInGroupPanel(column);
      var isCommand = !!column.command;
      return isVisible && !isInGroupPanel && !isCommand;
    });
  };
  _proto._compileVisibleColumnsCore = function _compileVisibleColumnsCore() {
    var bandColumnsCache = this.getBandColumnsCache();
    var columns = (0, _m_columns_controller_utils.mergeColumns)(this, this._columns, this._commandColumns, true);
    (0, _m_columns_controller_utils.processBandColumns)(this, columns, bandColumnsCache);
    var indexedColumns = this._getIndexedColumns(columns);
    var visibleColumns = this._getVisibleColumnsFromIndexed(indexedColumns);
    var isDataColumnsInvisible = !this.hasVisibleDataColumns();
    if (isDataColumnsInvisible && this._columns.length) {
      visibleColumns[visibleColumns.length - 1].push({
        command: 'empty'
      });
    }
    return visibleColumns;
  };
  _proto._getIndexedColumns = function _getIndexedColumns(columns) {
    var _this2 = this;
    var rtlEnabled = this.option('rtlEnabled');
    var rowCount = this.getRowCount();
    var columnDigitsCount = (0, _m_columns_controller_utils.digitsCount)(columns.length);
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
    columns.forEach(function (column) {
      var _a, _b, _c, _d;
      var visibleIndex = column.visibleIndex;
      var indexedColumns;
      var parentBandColumns = (0, _m_columns_controller_utils.getParentBandColumns)(column.index, bandColumnsCache.columnParentByIndex);
      var isVisible = _this2._isColumnVisible(column);
      var isInGroupPanel = _this2._isColumnInGroupPanel(column);
      if (isVisible && !isInGroupPanel) {
        var rowIndex = parentBandColumns.length;
        if (visibleIndex < 0) {
          visibleIndex = -visibleIndex;
          indexedColumns = negativeIndexedColumns[rowIndex];
        } else {
          column.fixed = (_b = (_a = parentBandColumns[0]) === null || _a === void 0 ? void 0 : _a.fixed) !== null && _b !== void 0 ? _b : column.fixed;
          column.fixedPosition = (_d = (_c = parentBandColumns[0]) === null || _c === void 0 ? void 0 : _c.fixedPosition) !== null && _d !== void 0 ? _d : column.fixedPosition;
          if (column.fixed) {
            var isDefaultCommandColumn = !!column.command && !(0, _m_columns_controller_utils.isCustomCommandColumn)(_this2, column);
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
          visibleIndex = (0, _m_columns_controller_utils.numberToString)(visibleIndex, columnDigitsCount);
          for (var _i = parentBandColumns.length - 1; _i >= 0; _i -= 1) {
            visibleIndex = (0, _m_columns_controller_utils.numberToString)(parentBandColumns[_i].visibleIndex, columnDigitsCount) + visibleIndex;
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
  };
  _proto._getVisibleColumnsFromIndexed = function _getVisibleColumnsFromIndexed(_ref) {
    var _this3 = this;
    var positiveIndexedColumns = _ref.positiveIndexedColumns,
      negativeIndexedColumns = _ref.negativeIndexedColumns;
    var result = [];
    var rowCount = this.getRowCount();
    var expandColumns = (0, _m_columns_controller_utils.mergeColumns)(this, this.getExpandColumns(), this._columns);
    var rowspanGroupColumns = 0;
    var rowspanExpandColumns = 0;
    var _loop = function _loop(rowIndex) {
      result.push([]);
      (0, _object.orderEach)(negativeIndexedColumns[rowIndex], function (_, columns) {
        result[rowIndex].unshift.apply(result[rowIndex], columns);
      });
      var firstPositiveIndexColumn = result[rowIndex].length;
      var positiveIndexedRowColumns = positiveIndexedColumns[rowIndex];
      positiveIndexedRowColumns.forEach(function (columnsByFixing) {
        (0, _object.orderEach)(columnsByFixing, function (_, columnsByVisibleIndex) {
          result[rowIndex].push.apply(result[rowIndex], columnsByVisibleIndex);
        });
      });
      // The order of processing is important
      if (rowspanExpandColumns <= rowIndex) {
        rowspanExpandColumns += _m_columns_controller_utils.processExpandColumns.call(_this3, result[rowIndex], expandColumns, _const.DETAIL_COMMAND_COLUMN_NAME, firstPositiveIndexColumn);
      }
      if (rowspanGroupColumns <= rowIndex) {
        rowspanGroupColumns += _m_columns_controller_utils.processExpandColumns.call(_this3, result[rowIndex], expandColumns, _const.GROUP_COMMAND_COLUMN_NAME, firstPositiveIndexColumn);
      }
    };
    for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      _loop(rowIndex);
    }
    result.push((0, _m_columns_controller_utils.getDataColumns)(result));
    return result;
  };
  _proto.getInvisibleColumns = function getInvisibleColumns(columns, bandColumnIndex) {
    var that = this;
    var result = [];
    var hiddenColumnsByBand;
    columns = columns || that._columns;
    (0, _iterator.each)(columns, function (_, column) {
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
  };
  _proto.getChooserColumns = function getChooserColumns(getAllColumns) {
    var columns = getAllColumns ? this.getColumns() : this.getInvisibleColumns();
    var columnChooserColumns = columns.filter(function (column) {
      return column.showInColumnChooser;
    });
    var sortOrder = this.option('columnChooser.sortOrder');
    return (0, _m_columns_controller_utils.sortColumns)(columnChooserColumns, sortOrder);
  };
  _proto.allowMoveColumn = function allowMoveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
    var that = this;
    var columnIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(that, fromVisibleIndex, sourceLocation);
    var sourceColumn = that._columns[columnIndex];
    if (sourceColumn && (sourceColumn.allowReordering || sourceColumn.allowGrouping || sourceColumn.allowHiding)) {
      if (sourceLocation === targetLocation) {
        if (sourceLocation === _const.COLUMN_CHOOSER_LOCATION) {
          return false;
        }
        // @ts-expect-error
        fromVisibleIndex = (0, _type.isObject)(fromVisibleIndex) ? fromVisibleIndex.columnIndex : fromVisibleIndex;
        // @ts-expect-error
        toVisibleIndex = (0, _type.isObject)(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
        return fromVisibleIndex !== toVisibleIndex && fromVisibleIndex + 1 !== toVisibleIndex;
      }
      if (sourceLocation === _const.GROUP_LOCATION && targetLocation !== _const.COLUMN_CHOOSER_LOCATION || targetLocation === _const.GROUP_LOCATION) {
        return sourceColumn && sourceColumn.allowGrouping;
      }
      if (sourceLocation === _const.COLUMN_CHOOSER_LOCATION || targetLocation === _const.COLUMN_CHOOSER_LOCATION) {
        return sourceColumn && sourceColumn.allowHiding;
      }
      return true;
    }
    return false;
  };
  _proto.moveColumn = function moveColumn(fromVisibleIndex, toVisibleIndex, sourceLocation, targetLocation) {
    var that = this;
    var options = {};
    var prevGroupIndex;
    var fromIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(that, fromVisibleIndex, sourceLocation);
    var toIndex = (0, _m_columns_controller_utils.getColumnIndexByVisibleIndex)(that, toVisibleIndex, targetLocation);
    var targetGroupIndex;
    if (fromIndex >= 0) {
      var column = that._columns[fromIndex];
      // @ts-expect-error
      toVisibleIndex = (0, _type.isObject)(toVisibleIndex) ? toVisibleIndex.columnIndex : toVisibleIndex;
      targetGroupIndex = toIndex >= 0 ? that._columns[toIndex].groupIndex : -1;
      if ((0, _type.isDefined)(column.groupIndex) && sourceLocation === _const.GROUP_LOCATION) {
        if (targetGroupIndex > column.groupIndex) {
          targetGroupIndex--;
        }
        if (targetLocation !== _const.GROUP_LOCATION) {
          options.groupIndex = undefined;
        } else {
          prevGroupIndex = column.groupIndex;
          delete column.groupIndex;
          (0, _m_columns_controller_utils.updateColumnGroupIndexes)(that);
        }
      }
      if (targetLocation === _const.GROUP_LOCATION) {
        options.groupIndex = (0, _m_columns_controller_utils.moveColumnToGroup)(that, column, targetGroupIndex);
        column.groupIndex = prevGroupIndex;
      } else if (toVisibleIndex >= 0) {
        var targetColumn = that._columns[toIndex];
        if (!targetColumn || column.ownerBand !== targetColumn.ownerBand) {
          options.visibleIndex = _const.MAX_SAFE_INTEGER;
        } else if ((0, _m_columns_controller_utils.isColumnFixed)(that, column) ^ (0, _m_columns_controller_utils.isColumnFixed)(that, targetColumn)) {
          options.visibleIndex = _const.MAX_SAFE_INTEGER;
        } else {
          options.visibleIndex = targetColumn.visibleIndex;
        }
      }
      var isVisible = targetLocation !== _const.COLUMN_CHOOSER_LOCATION;
      if (column.visible !== isVisible) {
        options.visible = isVisible;
      }
      that.columnOption(column.index, options);
    }
  };
  _proto.changeSortOrder = function changeSortOrder(columnIndex, sortOrder) {
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
      } else if ((0, _type.isDefined)(column.groupIndex) || (0, _type.isDefined)(column.sortIndex)) {
        options.sortOrder = column.sortOrder === 'desc' ? 'asc' : 'desc';
      } else {
        options.sortOrder = 'asc';
      }
      return true;
    };
    if (allowSorting && column && column.allowSorting) {
      if (needResetSorting && !(0, _type.isDefined)(column.groupIndex)) {
        (0, _iterator.each)(that._columns, function (index) {
          if (index !== columnIndex && this.sortOrder) {
            if (!(0, _type.isDefined)(this.groupIndex)) {
              delete this.sortOrder;
            }
            delete this.sortIndex;
          }
        });
      }
      if ((0, _m_columns_controller_utils.isSortOrderValid)(sortOrder)) {
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
  };
  _proto.getSortDataSourceParameters = function getSortDataSourceParameters(useLocalSelector) {
    var that = this;
    var sortColumns = [];
    var sort = [];
    (0, _iterator.each)(that._columns, function () {
      if ((this.dataField || this.selector || this.calculateCellValue) && (0, _type.isDefined)(this.sortIndex) && !(0, _type.isDefined)(this.groupIndex)) {
        sortColumns[this.sortIndex] = this;
      }
    });
    (0, _iterator.each)(sortColumns, function () {
      var sortOrder = this && this.sortOrder;
      if ((0, _m_columns_controller_utils.isSortOrderValid)(sortOrder)) {
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
  };
  _proto.getGroupDataSourceParameters = function getGroupDataSourceParameters(useLocalSelector) {
    var group = [];
    (0, _iterator.each)(this.getGroupColumns(), function () {
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
  };
  _proto.refresh = function refresh(updateNewLookupsOnly) {
    var deferreds = [];
    (0, _iterator.each)(this._columns, function () {
      var lookup = this.lookup;
      if (lookup && !this.calculateDisplayValue) {
        if (updateNewLookupsOnly && lookup.valueMap) {
          return;
        }
        if (lookup.update) {
          deferreds.push(lookup.update());
        }
      }
    });
    return _deferred.when.apply(_renderer.default, deferreds).done(_m_columns_controller_utils.resetColumnsCache.bind(null, this));
  };
  _proto._updateColumnOptions = function _updateColumnOptions(column, columnIndex) {
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
    (0, _iterator.each)(['calculateSortValue', 'calculateGroupValue', 'calculateDisplayValue'], function (_, calculateCallbackName) {
      var calculateCallback = column[calculateCallbackName];
      if ((0, _type.isFunction)(calculateCallback)) {
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
    if ((0, _type.isString)(column.calculateDisplayValue)) {
      column.displayField = column.calculateDisplayValue;
      column.calculateDisplayValue = (0, _data.compileGetter)(column.displayField);
    }
    if (column.calculateDisplayValue) {
      column.displayValueMap = column.displayValueMap || {};
    }
    (0, _m_columns_controller_utils.updateSerializers)(column, column.dataType);
    var lookup = column.lookup;
    if (lookup) {
      (0, _m_columns_controller_utils.updateSerializers)(lookup, lookup.dataType);
    }
    var dataType = lookup ? lookup.dataType : column.dataType;
    if (dataType) {
      column.alignment = column.alignment || (0, _m_columns_controller_utils.getAlignmentByDataType)(dataType, this.option('rtlEnabled'));
      column.format = column.format || _m_utils.default.getFormatByDataType(dataType);
      column.customizeText = column.customizeText || (0, _m_columns_controller_utils.getCustomizeTextByDataType)(dataType);
      column.defaultFilterOperations = column.defaultFilterOperations || !lookup && _const.DATATYPE_OPERATIONS[dataType] || [];
      if (!(0, _type.isDefined)(column.filterOperations)) {
        (0, _m_columns_controller_utils.setFilterOperationsAsDefaultValues)(column);
      }
      column.defaultFilterOperation = column.filterOperations && column.filterOperations[0] || '=';
      column.showEditorAlways = (0, _type.isDefined)(column.showEditorAlways) ? column.showEditorAlways : dataType === 'boolean' && !column.cellTemplate && !column.lookup;
    }
  };
  _proto.updateColumnDataTypes = function updateColumnDataTypes(dataSource) {
    var that = this;
    var dateSerializationFormat = that.option('dateSerializationFormat');
    var firstItems = that._getFirstItems(dataSource);
    var isColumnDataTypesUpdated = false;
    (0, _iterator.each)(that._columns, function (index, column) {
      var i;
      var value;
      var dataType;
      var lookupDataType;
      var valueDataType;
      var lookup = column.lookup;
      if (_m_utils.default.isDateType(column.dataType) && column.serializationFormat === undefined) {
        column.serializationFormat = dateSerializationFormat;
      }
      if (lookup && _m_utils.default.isDateType(lookup.dataType) && column.serializationFormat === undefined) {
        lookup.serializationFormat = dateSerializationFormat;
      }
      if (column.calculateCellValue && firstItems.length) {
        if (!column.dataType || lookup && !lookup.dataType) {
          for (i = 0; i < firstItems.length; i++) {
            value = column.calculateCellValue(firstItems[i]);
            if (!column.dataType) {
              valueDataType = (0, _m_columns_controller_utils.getValueDataType)(value);
              dataType = dataType || valueDataType;
              if (dataType && valueDataType && dataType !== valueDataType) {
                dataType = 'string';
              }
            }
            if (lookup && !lookup.dataType) {
              valueDataType = (0, _m_columns_controller_utils.getValueDataType)(_m_utils.default.getDisplayValue(column, value, firstItems[i]));
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
              column.serializationFormat = (0, _m_columns_controller_utils.getSerializationFormat)(column.dataType, value);
            }
            if (lookup && lookup.serializationFormat === undefined) {
              lookup.serializationFormat = (0, _m_columns_controller_utils.getSerializationFormat)(lookup.dataType, lookup.calculateCellValue(value, true));
            }
          }
        }
      }
      that._updateColumnOptions(column, index);
    });
    return isColumnDataTypesUpdated;
  };
  _proto._customizeColumns = function _customizeColumns(columns) {
    var that = this;
    var customizeColumns = that.option('customizeColumns');
    if (customizeColumns) {
      var hasOwnerBand = columns.some(function (column) {
        return (0, _type.isObject)(column.ownerBand);
      });
      if (hasOwnerBand) {
        (0, _m_columns_controller_utils.updateIndexes)(that);
      }
      customizeColumns(columns);
      (0, _m_columns_controller_utils.assignColumns)(that, (0, _m_columns_controller_utils.createColumnsFromOptions)(that, columns));
    }
  };
  _proto.updateColumns = function updateColumns(dataSource, forceApplying, isApplyingUserState) {
    var _this4 = this;
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
      (0, _m_columns_controller_utils.updateIndexes)(this);
      var columns = this._columns;
      return (0, _deferred.when)(this.refresh(true)).always(function () {
        if (_this4._columns !== columns) return;
        _this4._updateChanges(dataSource, {
          sorting: sortParameters,
          grouping: groupParameters,
          filtering: filterParameters
        });
        (0, _m_columns_controller_utils.fireColumnsChanged)(_this4);
      });
    }
  };
  _proto._updateChanges = function _updateChanges(dataSource, parameters) {
    if (dataSource) {
      this.updateColumnDataTypes(dataSource);
      this._dataSourceApplied = true;
    }
    if (!_m_utils.default.equalSortParameters(parameters.sorting, this.getSortDataSourceParameters())) {
      (0, _m_columns_controller_utils.updateColumnChanges)(this, 'sorting');
    }
    if (!_m_utils.default.equalSortParameters(parameters.grouping, this.getGroupDataSourceParameters())) {
      (0, _m_columns_controller_utils.updateColumnChanges)(this, 'grouping');
    }
    var dataController = this.getController('data');
    if (dataController && !_m_utils.default.equalFilterParameters(parameters.filtering, dataController.getCombinedFilter())) {
      (0, _m_columns_controller_utils.updateColumnChanges)(this, 'filtering');
    }
    (0, _m_columns_controller_utils.updateColumnChanges)(this, 'columns');
  };
  _proto.updateSortingGrouping = function updateSortingGrouping(dataSource, fromDataSource) {
    var that = this;
    var sortParameters;
    var isColumnsChanged;
    var updateSortGroupParameterIndexes = function updateSortGroupParameterIndexes(columns, sortParameters, indexParameterName) {
      (0, _iterator.each)(columns, function (index, column) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete column[indexParameterName];
        if (sortParameters) {
          for (var i = 0; i < sortParameters.length; i++) {
            var selector = sortParameters[i].selector;
            var isExpanded = sortParameters[i].isExpanded;
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
      sortParameters = _m_utils.default.normalizeSortingInfo(dataSource.sort());
      var groupParameters = _m_utils.default.normalizeSortingInfo(dataSource.group());
      var columnsGroupParameters = that.getGroupDataSourceParameters();
      var columnsSortParameters = that.getSortDataSourceParameters();
      var groupingChanged = !_m_utils.default.equalSortParameters(groupParameters, columnsGroupParameters, true);
      var groupExpandingChanged = !groupingChanged && !_m_utils.default.equalSortParameters(groupParameters, columnsGroupParameters);
      if (!that._columns.length) {
        (0, _iterator.each)(groupParameters, function (index, group) {
          that._columns.push(group.selector);
        });
        (0, _iterator.each)(sortParameters, function (index, sort) {
          if (!(0, _type.isFunction)(sort.selector)) {
            that._columns.push(sort.selector);
          }
        });
        (0, _m_columns_controller_utils.assignColumns)(that, (0, _m_columns_controller_utils.createColumnsFromOptions)(that, that._columns));
      }
      if ((fromDataSource || !columnsGroupParameters && !that._hasUserState) && (groupingChanged || groupExpandingChanged)) {
        /// #DEBUG
        that.__groupingUpdated = true;
        /// #ENDDEBUG
        updateSortGroupParameterIndexes(that._columns, groupParameters, 'groupIndex');
        if (fromDataSource) {
          groupingChanged && (0, _m_columns_controller_utils.updateColumnChanges)(that, 'grouping');
          groupExpandingChanged && (0, _m_columns_controller_utils.updateColumnChanges)(that, 'groupExpanding');
          isColumnsChanged = true;
        }
      }
      if ((fromDataSource || !columnsSortParameters && !that._hasUserState) && !_m_utils.default.equalSortParameters(sortParameters, columnsSortParameters)) {
        /// #DEBUG
        that.__sortingUpdated = true;
        /// #ENDDEBUG
        updateSortGroupParameterIndexes(that._columns, sortParameters, 'sortIndex');
        if (fromDataSource) {
          (0, _m_columns_controller_utils.updateColumnChanges)(that, 'sorting');
          isColumnsChanged = true;
        }
      }
      if (isColumnsChanged) {
        (0, _m_columns_controller_utils.fireColumnsChanged)(that);
      }
    }
  };
  _proto.updateFilter = function updateFilter(filter, remoteFiltering, columnIndex, filterValue) {
    var that = this;
    if (!Array.isArray(filter)) return filter;
    filter = (0, _extend.extend)([], filter);
    columnIndex = filter.columnIndex !== undefined ? filter.columnIndex : columnIndex;
    filterValue = filter.filterValue !== undefined ? filter.filterValue : filterValue;
    if ((0, _type.isString)(filter[0]) && filter[0] !== '!') {
      var column = that.columnOption(filter[0]);
      if (remoteFiltering) {
        if ((0, _config.default)().forceIsoDateParsing && column && column.serializeValue && filter.length > 1) {
          filter[filter.length - 1] = column.serializeValue(filter[filter.length - 1], 'filter');
        }
      } else if (column && column.selector) {
        filter[0] = column.selector;
        filter[0].columnIndex = column.index;
      }
    } else if ((0, _type.isFunction)(filter[0])) {
      filter[0].columnIndex = columnIndex;
      filter[0].filterValue = filterValue;
      filter[0].selectedFilterOperation = filter.selectedFilterOperation;
    }
    for (var i = 0; i < filter.length; i++) {
      filter[i] = that.updateFilter(filter[i], remoteFiltering, columnIndex, filterValue);
    }
    return filter;
  };
  _proto.columnCount = function columnCount() {
    return this._columns ? this._columns.length : 0;
  };
  _proto.columnOption = function columnOption(identifier, option, value, notFireEvent) {
    var that = this;
    var columns = that._columns.concat(that._commandColumns);
    var column = (0, _m_columns_controller_utils.findColumn)(columns, identifier);
    if (column) {
      if (arguments.length === 1) {
        return (0, _extend.extend)({}, column);
      }
      if ((0, _type.isString)(option)) {
        if (arguments.length === 2) {
          return (0, _m_columns_controller_utils.columnOptionCore)(that, column, option);
        }
        (0, _m_columns_controller_utils.columnOptionCore)(that, column, option, value, notFireEvent);
      } else if ((0, _type.isObject)(option)) {
        (0, _iterator.each)(option, function (optionName, value) {
          (0, _m_columns_controller_utils.columnOptionCore)(that, column, optionName, value, notFireEvent);
        });
      }
      (0, _m_columns_controller_utils.fireColumnsChanged)(that);
    }
  };
  _proto.clearSorting = function clearSorting() {
    var that = this;
    var columnCount = this.columnCount();
    that.beginUpdate();
    for (var i = 0; i < columnCount; i++) {
      that.columnOption(i, 'sortOrder', undefined);
      // option needs to be deleted from column to prevert conflicts in syncing loadOptions from dataSource. See T1147379
      delete (0, _m_columns_controller_utils.findColumn)(that._columns, i).sortOrder;
    }
    that.endUpdate();
  };
  _proto.clearGrouping = function clearGrouping() {
    var that = this;
    var columnCount = this.columnCount();
    that.beginUpdate();
    for (var i = 0; i < columnCount; i++) {
      that.columnOption(i, 'groupIndex', undefined);
    }
    that.endUpdate();
  };
  _proto.getVisibleIndex = function getVisibleIndex(index, rowIndex) {
    var columns = this.getVisibleColumns(rowIndex);
    for (var i = columns.length - 1; i >= 0; i--) {
      if (columns[i].index === index) {
        return i;
      }
    }
    return -1;
  };
  _proto.getVisibleIndexByColumn = function getVisibleIndexByColumn(column, rowIndex) {
    var visibleColumns = this.getVisibleColumns(rowIndex);
    var visibleColumn = visibleColumns.filter(function (col) {
      return col.index === column.index && col.command === column.command;
    })[0];
    return visibleColumns.indexOf(visibleColumn);
  };
  _proto.getVisibleColumnIndex = function getVisibleColumnIndex(id, rowIndex) {
    var index = this.columnOption(id, 'index');
    return this.getVisibleIndex(index, rowIndex);
  };
  _proto.addColumn = function addColumn(options) {
    var that = this;
    var column = (0, _m_columns_controller_utils.createColumn)(that, options);
    var index = that._columns.length;
    that._columns.push(column);
    if (column.isBand) {
      that._columns = (0, _m_columns_controller_utils.createColumnsFromOptions)(that, that._columns);
      column = that._columns[index];
    }
    column.added = options;
    (0, _m_columns_controller_utils.updateIndexes)(that, column);
    that.updateColumns(that._dataSource);
    that._checkColumns();
  };
  _proto.deleteColumn = function deleteColumn(id) {
    var that = this;
    var column = that.columnOption(id);
    if (column && column.index >= 0) {
      (0, _m_columns_controller_utils.convertOwnerBandToColumnReference)(that._columns);
      that._columns.splice(column.index, 1);
      if (column.isBand) {
        var childIndexes = that.getChildrenByBandColumn(column.index).map(function (column) {
          return column.index;
        });
        that._columns = that._columns.filter(function (column) {
          return childIndexes.indexOf(column.index) < 0;
        });
      }
      (0, _m_columns_controller_utils.updateIndexes)(that);
      that.updateColumns(that._dataSource);
    }
  };
  _proto.addCommandColumn = function addCommandColumn(options) {
    var commandColumn = this._commandColumns.filter(function (column) {
      return column.command === options.command;
    })[0];
    if (!commandColumn) {
      commandColumn = options;
      this._commandColumns.push(commandColumn);
    }
  };
  _proto.getUserState = function getUserState() {
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
      (0, _iterator.each)(_const.USER_STATE_FIELD_NAMES, handleStateField);
    }
    return result;
  };
  _proto.setName = function setName(column) {
    column.name = column.name || column.dataField || column.type;
  };
  _proto.setUserState = function setUserState(state) {
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
    (0, _m_columns_controller_utils.updateColumnChanges)(that, 'filtering');
    that.init(true);
    if (dataSource) {
      dataSource.sort(that.getSortDataSourceParameters());
      dataSource.group(that.getGroupDataSourceParameters());
    }
  };
  _proto._checkColumns = function _checkColumns() {
    var usedNames = {};
    var hasEditableColumnWithoutName = false;
    var duplicatedNames = [];
    this._columns.forEach(function (column) {
      var _a;
      var name = column.name;
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
      _ui.default.log('E1059', duplicatedNames.join(', '));
    }
    if (hasEditableColumnWithoutName) {
      _ui.default.log('E1060');
    }
  };
  _proto._createCalculatedColumnOptions = function _createCalculatedColumnOptions(columnOptions, bandColumn) {
    var calculatedColumnOptions = {};
    var dataField = columnOptions.dataField;
    if (Array.isArray(columnOptions.columns) && columnOptions.columns.length || columnOptions.isBand) {
      calculatedColumnOptions.isBand = true;
      dataField = null;
    }
    if (dataField) {
      if ((0, _type.isString)(dataField)) {
        var getter = (0, _data.compileGetter)(dataField);
        calculatedColumnOptions = {
          caption: (0, _inflector.captionize)(dataField),
          calculateCellValue(data, skipDeserialization) {
            // @ts-expect-error
            var value = getter(data);
            return this.deserializeValue && !skipDeserialization ? this.deserializeValue(value) : value;
          },
          setCellValue: _m_columns_controller_utils.defaultSetCellValue,
          parseValue(text) {
            var column = this;
            var result;
            var parsedValue;
            if (column.dataType === 'number') {
              if ((0, _type.isString)(text) && column.format) {
                result = (0, _m_columns_controller_utils.strictParseNumber)(text.trim(), column.format);
              } else if ((0, _type.isDefined)(text) && (0, _type.isNumeric)(text)) {
                result = Number(text);
              }
            } else if (column.dataType === 'boolean') {
              if (text === column.trueText) {
                result = true;
              } else if (text === column.falseText) {
                result = false;
              }
            } else if (_m_utils.default.isDateType(column.dataType)) {
              // @ts-expect-error
              parsedValue = _date.default.parse(text, column.format);
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
      return _filtering.default.defaultCalculateFilterExpression.apply(this, arguments);
    };
    calculatedColumnOptions.defaultFilterOperation = '=';
    calculatedColumnOptions.createFilterExpression = function (filterValue, selectedFilterOperation) {
      var result;
      if (this.calculateFilterExpression) {
        result = this.calculateFilterExpression.apply(this, arguments);
      }
      if ((0, _type.isFunction)(result)) {
        result = [result, '=', true];
      }
      if (result) {
        result.columnIndex = this.index;
        result.filterValue = filterValue;
        result.selectedFilterOperation = selectedFilterOperation;
      }
      return result;
    };
    if (!dataField || !(0, _type.isString)(dataField)) {
      (0, _extend.extend)(true, calculatedColumnOptions, {
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
            var calculateValue = (0, _data.compileGetter)(this.valueExpr);
            var calculateDisplayValue = (0, _data.compileGetter)(this.displayExpr);
            for (var i = 0; i < this.items.length; i++) {
              var item = this.items[i];
              var displayValue = calculateDisplayValue(item);
              this.valueMap[calculateValue(item)] = displayValue;
              this.dataType = this.dataType || (0, _m_columns_controller_utils.getValueDataType)(displayValue);
            }
          }
        },
        update() {
          var that = this;
          var dataSource = that.dataSource;
          if (dataSource) {
            if ((0, _type.isFunction)(dataSource) && !_variable_wrapper.default.isWrapped(dataSource)) {
              dataSource = dataSource({});
            }
            if ((0, _type.isPlainObject)(dataSource) || dataSource instanceof _abstract_store.default || Array.isArray(dataSource)) {
              if (that.valueExpr) {
                var dataSourceOptions = (0, _utils.normalizeDataSourceOptions)(dataSource);
                dataSourceOptions.paginate = false;
                dataSource = new _data_source.DataSource(dataSourceOptions);
                return dataSource.load().done(function (data) {
                  that.items = data;
                  that.updateValueMap && that.updateValueMap();
                });
              }
            } else {
              _ui.default.log('E1016');
            }
          } else {
            that.updateValueMap && that.updateValueMap();
          }
        }
      };
    }
    calculatedColumnOptions.resizedCallbacks = (0, _callbacks.default)();
    if (columnOptions.resized) {
      calculatedColumnOptions.resizedCallbacks.add(columnOptions.resized.bind(columnOptions));
    }
    (0, _iterator.each)(calculatedColumnOptions, function (optionName) {
      if ((0, _type.isFunction)(calculatedColumnOptions[optionName]) && optionName.indexOf('default') !== 0) {
        var defaultOptionName = "default".concat(optionName.charAt(0).toUpperCase()).concat(optionName.substr(1));
        calculatedColumnOptions[defaultOptionName] = calculatedColumnOptions[optionName];
      }
    });
    return calculatedColumnOptions;
  };
  _proto.getRowCount = function getRowCount() {
    this._rowCount = this._rowCount || (0, _m_columns_controller_utils.getRowCount)(this);
    return this._rowCount;
  };
  _proto.getRowIndex = function getRowIndex(columnIndex, alwaysGetRowIndex) {
    var column = this._columns[columnIndex];
    var bandColumnsCache = this.getBandColumnsCache();
    return column && (alwaysGetRowIndex || column.visible && !(column.command || (0, _type.isDefined)(column.groupIndex))) ? (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex).length : 0;
  };
  _proto.getChildrenByBandColumn = function getChildrenByBandColumn(bandColumnIndex, onlyVisibleDirectChildren) {
    var that = this;
    var bandColumnsCache = that.getBandColumnsCache();
    var result = (0, _m_columns_controller_utils.getChildrenByBandColumn)(bandColumnIndex, bandColumnsCache.columnChildrenByIndex, !onlyVisibleDirectChildren);
    if (onlyVisibleDirectChildren) {
      return result.filter(function (column) {
        return column.visible && !column.command;
      }).sort(function (column1, column2) {
        return column1.visibleIndex - column2.visibleIndex;
      });
    }
    return result;
  };
  _proto.isParentBandColumn = function isParentBandColumn(columnIndex, bandColumnIndex) {
    var result = false;
    var column = this._columns[columnIndex];
    var bandColumnsCache = this.getBandColumnsCache();
    var parentBandColumns = column && (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex);
    if (parentBandColumns) {
      // T416483 - fix for jquery 2.1.4
      (0, _iterator.each)(parentBandColumns, function (_, bandColumn) {
        if (bandColumn.index === bandColumnIndex) {
          result = true;
          return false;
        }
      });
    }
    return result;
  };
  _proto.isParentColumnVisible = function isParentColumnVisible(columnIndex) {
    var result = true;
    var bandColumnsCache = this.getBandColumnsCache();
    var bandColumns = columnIndex >= 0 && (0, _m_columns_controller_utils.getParentBandColumns)(columnIndex, bandColumnsCache.columnParentByIndex);
    bandColumns && (0, _iterator.each)(bandColumns, function (_, bandColumn) {
      result = result && bandColumn.visible;
      return result;
    });
    return result;
  };
  _proto.getColumnId = function getColumnId(column) {
    if (column.command && column.type === _const.GROUP_COMMAND_COLUMN_NAME) {
      if ((0, _m_columns_controller_utils.isCustomCommandColumn)(this, column)) {
        return "type:".concat(column.type);
      }
      return "command:".concat(column.command);
    }
    return column.index;
  };
  _proto.getCustomizeTextByDataType = function getCustomizeTextByDataType(dataType) {
    return (0, _m_columns_controller_utils.getCustomizeTextByDataType)(dataType);
  };
  _proto.getHeaderContentAlignment = function getHeaderContentAlignment(columnAlignment) {
    var rtlEnabled = this.option('rtlEnabled');
    if (rtlEnabled) {
      return columnAlignment === 'left' ? 'right' : 'left';
    }
    return columnAlignment;
  };
  return ColumnsController;
}(_m_modules.default.Controller);
exports.ColumnsController = ColumnsController;
var columnsControllerModule = {
  defaultOptions() {
    return {
      commonColumnSettings: {
        allowFiltering: true,
        allowHiding: true,
        allowSorting: true,
        allowEditing: true,
        encodeHtml: true,
        trueText: _message.default.format('dxDataGrid-trueText'),
        falseText: _message.default.format('dxDataGrid-falseText')
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
exports.columnsControllerModule = columnsControllerModule;