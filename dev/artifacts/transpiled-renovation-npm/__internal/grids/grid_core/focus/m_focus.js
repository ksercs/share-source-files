"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _m_editing_utils = require("../editing/m_editing_utils");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _m_focus_utils = require("./m_focus_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ROW_FOCUSED_CLASS = 'dx-row-focused';
var FOCUSED_ROW_SELECTOR = ".dx-row.".concat(ROW_FOCUSED_CLASS);
var TABLE_POSTFIX_CLASS = 'table';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var FocusController = _m_modules.default.ViewController.inherit(function () {
  /**
     * @type {Partial<import('./ui.grid_core.focus').FocusController>}
     */
  var members = {
    init() {
      this._dataController = this.getController('data');
      this._keyboardController = this.getController('keyboardNavigation');
      this.component._optionsByReference.focusedRowKey = true;
    },
    optionChanged(args) {
      var name = args.name,
        value = args.value,
        previousValue = args.previousValue;
      switch (name) {
        case 'focusedRowIndex':
          this._focusRowByIndex(value);
          this._keyboardController._fireFocusedRowChanged();
          args.handled = true;
          break;
        case 'focusedRowKey':
          if (Array.isArray(value) && JSON.stringify(value) === JSON.stringify(previousValue)) {
            return;
          }
          this._focusRowByKey(value);
          this._keyboardController._fireFocusedRowChanged();
          args.handled = true;
          break;
        case 'focusedColumnIndex':
        case 'focusedRowEnabled':
        case 'autoNavigateToFocusedRow':
          args.handled = true;
          break;
        default:
          this.callBase(args);
          break;
      }
    },
    isAutoNavigateToFocusedRow() {
      return this.option('scrolling.mode') !== 'infinite' && this.option('autoNavigateToFocusedRow');
    },
    _focusRowByIndex(index, operationTypes) {
      if (!this.option('focusedRowEnabled')) {
        return;
      }
      index = index !== undefined ? index : this.option('focusedRowIndex');
      if (index < 0) {
        if (this.isAutoNavigateToFocusedRow()) {
          this._resetFocusedRow();
        }
      } else {
        this._focusRowByIndexCore(index, operationTypes);
      }
    },
    _focusRowByIndexCore(index, operationTypes) {
      var _this = this;
      var dataController = this.getController('data');
      var pageSize = dataController.pageSize();
      var setKeyByIndex = function setKeyByIndex() {
        if (_this._isValidFocusedRowIndex(index)) {
          var rowIndex = index - dataController.getRowIndexOffset(true);
          if (!operationTypes || operationTypes.paging && !operationTypes.filtering) {
            var lastItemIndex = dataController._getLastItemIndex();
            rowIndex = Math.min(rowIndex, lastItemIndex);
          }
          var focusedRowKey = dataController.getKeyByRowIndex(rowIndex, true);
          if ((0, _type.isDefined)(focusedRowKey) && !_this.isRowFocused(focusedRowKey)) {
            _this.option('focusedRowKey', focusedRowKey);
          }
        }
      };
      if (pageSize >= 0) {
        if (!this._isLocalRowIndex(index)) {
          var pageIndex = Math.floor(index / dataController.pageSize());
          (0, _deferred.when)(dataController.pageIndex(pageIndex), dataController.waitReady()).done(function () {
            setKeyByIndex();
          });
        } else {
          setKeyByIndex();
        }
      }
    },
    _isLocalRowIndex(index) {
      var dataController = this.getController('data');
      var isVirtualScrolling = this.getController('keyboardNavigation')._isVirtualScrolling();
      if (isVirtualScrolling) {
        var pageIndex = Math.floor(index / dataController.pageSize());
        var virtualItems = dataController.virtualItemsCount();
        var virtualItemsBegin = virtualItems ? virtualItems.begin : -1;
        var visibleRowsCount = dataController.getVisibleRows().length + dataController.getRowIndexOffset();
        var visiblePagesCount = Math.ceil(visibleRowsCount / dataController.pageSize());
        return virtualItemsBegin <= index && visiblePagesCount > pageIndex;
      }
      return true;
    },
    _setFocusedRowKeyByIndex(index) {
      var dataController = this.getController('data');
      if (this._isValidFocusedRowIndex(index)) {
        var rowIndex = Math.min(index - dataController.getRowIndexOffset(), dataController.items().length - 1);
        var focusedRowKey = dataController.getKeyByRowIndex(rowIndex);
        if ((0, _type.isDefined)(focusedRowKey) && !this.isRowFocused(focusedRowKey)) {
          this.option('focusedRowKey', focusedRowKey);
        }
      }
    },
    _focusRowByKey(key) {
      if (!(0, _type.isDefined)(key)) {
        this._resetFocusedRow();
      } else {
        this._navigateToRow(key, true);
      }
    },
    _resetFocusedRow() {
      var focusedRowKey = this.option('focusedRowKey');
      var isFocusedRowKeyDefined = (0, _type.isDefined)(focusedRowKey);
      if (!isFocusedRowKeyDefined && this.option('focusedRowIndex') < 0) {
        return;
      }
      var keyboardController = this.getController('keyboardNavigation');
      if (isFocusedRowKeyDefined) {
        this.option('focusedRowKey', null);
      }
      keyboardController.setFocusedRowIndex(-1);
      this.option('focusedRowIndex', -1);
      this.getController('data').updateItems({
        changeType: 'updateFocusedRow',
        focusedRowKey: null
      });
      keyboardController._fireFocusedRowChanged(undefined, -1);
    },
    _isValidFocusedRowIndex(rowIndex) {
      var dataController = this.getController('data');
      var row = dataController.getVisibleRows()[rowIndex];
      return !row || row.rowType === 'data' || row.rowType === 'group';
    },
    publicMethods() {
      return ['navigateToRow', 'isRowFocused'];
    },
    navigateToRow(key) {
      if (!this.isAutoNavigateToFocusedRow()) {
        this.option('focusedRowIndex', -1);
      }
      return this._navigateToRow(key);
    },
    _navigateToRow(key, needFocusRow) {
      var that = this;
      var dataController = that.getController('data');
      var isAutoNavigate = that.isAutoNavigateToFocusedRow();
      // @ts-expect-error
      var d = new _deferred.Deferred();
      if (key === undefined || !dataController.dataSource()) {
        return d.reject().promise();
      }
      var rowIndexByKey = that.getFocusedRowIndexByKey(key);
      if (!isAutoNavigate && needFocusRow || rowIndexByKey >= 0) {
        that._navigateTo(key, d, needFocusRow);
      } else {
        dataController.getPageIndexByKey(key).done(function (pageIndex) {
          if (pageIndex < 0) {
            d.resolve(-1);
            return;
          }
          if (pageIndex === dataController.pageIndex()) {
            dataController.reload().done(function () {
              if (that.isRowFocused(key) && dataController.getRowIndexByKey(key) >= 0) {
                d.resolve(that.getFocusedRowIndexByKey(key));
              } else {
                that._navigateTo(key, d, needFocusRow);
              }
            }).fail(d.reject);
          } else {
            dataController.pageIndex(pageIndex).done(function () {
              that._navigateTo(key, d, needFocusRow);
            }).fail(d.reject);
          }
        }).fail(d.reject);
      }
      return d.promise();
    },
    _navigateTo(key, deferred, needFocusRow) {
      var visibleRowIndex = this.getController('data').getRowIndexByKey(key);
      var isVirtualRowRenderingMode = _m_utils.default.isVirtualRowRendering(this);
      var isAutoNavigate = this.isAutoNavigateToFocusedRow();
      if (isAutoNavigate && isVirtualRowRenderingMode && visibleRowIndex < 0) {
        this._navigateToVirtualRow(key, deferred, needFocusRow);
      } else {
        this._navigateToVisibleRow(key, deferred, needFocusRow);
      }
    },
    _navigateToVisibleRow(key, deferred, needFocusRow) {
      if (needFocusRow) {
        this._triggerUpdateFocusedRow(key, deferred);
      } else {
        var focusedRowIndex = this.getFocusedRowIndexByKey(key);
        this.getView('rowsView').scrollToRowElement(key, deferred).done(function () {
          deferred.resolve(focusedRowIndex);
        });
      }
    },
    _navigateToVirtualRow(key, deferred, needFocusRow) {
      var _this2 = this;
      var dataController = this.getController('data');
      var rowsScrollController = dataController._rowsScrollController;
      var rowIndex = _m_utils.default.getIndexByKey(key, dataController.items(true));
      var scrollable = this.getView('rowsView').getScrollable();
      if (rowsScrollController && scrollable && rowIndex >= 0) {
        var focusedRowIndex = rowIndex + dataController.getRowIndexOffset(true);
        var offset = rowsScrollController.getItemOffset(focusedRowIndex);
        var triggerUpdateFocusedRow = function triggerUpdateFocusedRow() {
          if (dataController.totalCount() && !dataController.items().length) {
            return;
          }
          _this2.component.off('contentReady', triggerUpdateFocusedRow);
          if (needFocusRow) {
            _this2._triggerUpdateFocusedRow(key, deferred);
          } else {
            deferred.resolve(focusedRowIndex);
          }
        };
        this.component.on('contentReady', triggerUpdateFocusedRow);
        this.getView('rowsView').scrollTopPosition(offset);
      } else {
        deferred.resolve(-1);
      }
    },
    _triggerUpdateFocusedRow(key, deferred) {
      var _this3 = this;
      var dataController = this.getController('data');
      var focusedRowIndex = this.getFocusedRowIndexByKey(key);
      if (this._isValidFocusedRowIndex(focusedRowIndex)) {
        var d;
        if (this.option('focusedRowEnabled')) {
          dataController.updateItems({
            changeType: 'updateFocusedRow',
            focusedRowKey: key
          });
        } else {
          d = this.getView('rowsView').scrollToRowElement(key);
        }
        (0, _deferred.when)(d).done(function () {
          _this3.getController('keyboardNavigation').setFocusedRowIndex(focusedRowIndex);
          deferred && deferred.resolve(focusedRowIndex);
        });
      } else {
        deferred && deferred.resolve(-1);
      }
    },
    getFocusedRowIndexByKey(key) {
      var dataController = this.getController('data');
      var loadedRowIndex = dataController.getRowIndexByKey(key, true);
      return loadedRowIndex >= 0 ? loadedRowIndex + dataController.getRowIndexOffset(true) : -1;
    },
    _focusRowByKeyOrIndex() {
      var _this4 = this;
      var focusedRowKey = this.option('focusedRowKey');
      var currentFocusedRowIndex = this.option('focusedRowIndex');
      var keyboardController = this.getController('keyboardNavigation');
      var dataController = this.getController('data');
      if ((0, _type.isDefined)(focusedRowKey)) {
        var visibleRowIndex = dataController.getRowIndexByKey(focusedRowKey);
        if (visibleRowIndex >= 0) {
          if (keyboardController._isVirtualScrolling()) {
            currentFocusedRowIndex = visibleRowIndex + dataController.getRowIndexOffset();
          }
          keyboardController.setFocusedRowIndex(currentFocusedRowIndex);
          this._triggerUpdateFocusedRow(focusedRowKey);
        } else {
          this._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
            if (currentFocusedRowIndex >= 0 && focusedRowIndex < 0) {
              _this4._focusRowByIndex();
            } else if (currentFocusedRowIndex < 0 && focusedRowIndex >= 0) {
              keyboardController.setFocusedRowIndex(focusedRowIndex);
            }
          });
        }
      } else if (currentFocusedRowIndex >= 0) {
        this.getController('focus')._focusRowByIndex(currentFocusedRowIndex);
      }
    },
    isRowFocused(key) {
      var focusedRowKey = this.option('focusedRowKey');
      if ((0, _type.isDefined)(focusedRowKey)) {
        return (0, _common.equalByValue)(key, this.option('focusedRowKey'));
      }
      return undefined;
    },
    updateFocusedRow(_ref) {
      var focusedRowKey = _ref.focusedRowKey;
      var that = this;
      var focusedRowIndex = that._dataController.getRowIndexByKey(focusedRowKey);
      var rowsView = that.getView('rowsView');
      var $tableElement;
      var $mainRow;
      (0, _iterator.each)(rowsView.getTableElements(), function (index, element) {
        var isMainTable = index === 0;
        $tableElement = (0, _renderer.default)(element);
        that._clearPreviousFocusedRow($tableElement, focusedRowIndex);
        var $row = that._prepareFocusedRow({
          changedItem: that._dataController.getVisibleRows()[focusedRowIndex],
          $tableElement,
          focusedRowIndex
        });
        if (isMainTable) {
          $mainRow = $row;
        }
      });
      $mainRow && rowsView.scrollToElementVertically($mainRow);
    },
    _clearPreviousFocusedRow($tableElement, focusedRowIndex) {
      var _this5 = this;
      var isNotMasterDetailFocusedRow = function isNotMasterDetailFocusedRow(_, focusedRow) {
        var $focusedRowTable = (0, _renderer.default)(focusedRow).closest(".".concat(_this5.addWidgetPrefix(TABLE_POSTFIX_CLASS)));
        return $tableElement.is($focusedRowTable);
      };
      var $prevRowFocusedElement = $tableElement.find(FOCUSED_ROW_SELECTOR).filter(isNotMasterDetailFocusedRow);
      $prevRowFocusedElement.removeClass(ROW_FOCUSED_CLASS).removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabindex');
      $prevRowFocusedElement.children('td').removeAttr('tabindex');
      if (focusedRowIndex !== 0) {
        var $firstRow = (0, _renderer.default)(this.getView('rowsView').getRowElement(0));
        $firstRow.removeClass(CELL_FOCUS_DISABLED_CLASS).removeAttr('tabIndex');
      }
    },
    _prepareFocusedRow(options) {
      var $row;
      var changedItem = options.changedItem;
      if (changedItem && (changedItem.rowType === 'data' || changedItem.rowType === 'group')) {
        var focusedRowIndex = options.focusedRowIndex;
        var $tableElement = options.$tableElement;
        var tabIndex = this.option('tabindex') || 0;
        var rowsView = this.getView('rowsView');
        $row = (0, _renderer.default)(rowsView._getRowElements($tableElement).eq(focusedRowIndex));
        $row.addClass(ROW_FOCUSED_CLASS).attr('tabindex', tabIndex);
      }
      return $row;
    }
  };
  return members;
}());
/**
 * @type {import('./ui.grid_core.modules').Module}
 */
var focusModule = {
  defaultOptions() {
    return {
      focusedRowEnabled: false,
      autoNavigateToFocusedRow: true,
      focusedRowKey: null,
      focusedRowIndex: -1,
      focusedColumnIndex: -1
    };
  },
  controllers: {
    focus: FocusController
  },
  extenders: {
    controllers: {
      keyboardNavigation: {
        init() {
          var rowIndex = this.option('focusedRowIndex');
          var columnIndex = this.option('focusedColumnIndex');
          this.createAction('onFocusedRowChanging', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedRowChanged', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedCellChanging', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.createAction('onFocusedCellChanged', {
            excludeValidators: ['disabled', 'readOnly']
          });
          this.callBase();
          this.setRowFocusType();
          this._focusedCellPosition = {};
          if ((0, _type.isDefined)(rowIndex) && rowIndex >= 0) {
            this._focusedCellPosition.rowIndex = rowIndex;
          }
          if ((0, _type.isDefined)(columnIndex) && columnIndex >= 0) {
            this._focusedCellPosition.columnIndex = columnIndex;
          }
        },
        setFocusedRowIndex(rowIndex) {
          this.callBase(rowIndex);
          this.option('focusedRowIndex', rowIndex);
        },
        setFocusedColumnIndex(columnIndex) {
          this.callBase(columnIndex);
          this.option('focusedColumnIndex', columnIndex);
        },
        _escapeKeyHandler(eventArgs, isEditing) {
          if (isEditing || !this.option('focusedRowEnabled')) {
            this.callBase(eventArgs, isEditing);
            return;
          }
          if (this.isCellFocusType()) {
            this.setRowFocusType();
            this._focus(this._getCellElementFromTarget(eventArgs.originalEvent.target), true);
          }
        },
        _updateFocusedCellPosition($cell, direction) {
          var position = this.callBase($cell, direction);
          if (position && position.columnIndex >= 0) {
            this._fireFocusedCellChanged($cell);
          }
        }
      },
      editorFactory: {
        renderFocusOverlay($element, isHideBorder) {
          var keyboardController = this.getController('keyboardNavigation');
          var focusedRowEnabled = this.option('focusedRowEnabled');
          var editingController = this.getController('editing');
          var $cell;
          if (!focusedRowEnabled || !(keyboardController === null || keyboardController === void 0 ? void 0 : keyboardController.isRowFocusType()) || editingController.isEditing()) {
            this.callBase($element, isHideBorder);
          } else if (focusedRowEnabled) {
            var isRowElement = keyboardController._getElementType($element) === 'row';
            if (isRowElement && !$element.hasClass(ROW_FOCUSED_CLASS)) {
              $cell = keyboardController.getFirstValidCellInRow($element);
              keyboardController.focus($cell);
            }
          }
        }
      },
      columns: {
        getSortDataSourceParameters(_, sortByKey) {
          var _this6 = this;
          var result = this.callBase.apply(this, arguments);
          var dataController = this.getController('data');
          var dataSource = dataController._dataSource;
          var store = dataController.store();
          var key = store && store.key();
          var remoteOperations = dataSource && dataSource.remoteOperations() || {};
          var isLocalOperations = Object.keys(remoteOperations).every(function (operationName) {
            return !remoteOperations[operationName];
          });
          if (key && (this.option('focusedRowEnabled') && this.getController('focus').isAutoNavigateToFocusedRow() !== false || sortByKey)) {
            key = Array.isArray(key) ? key : [key];
            var notSortedKeys = key.filter(function (key) {
              return !_this6.columnOption(key, 'sortOrder');
            });
            if (notSortedKeys.length) {
              result = result || [];
              if (isLocalOperations) {
                result.push({
                  selector: dataSource.getDataIndexGetter(),
                  desc: false
                });
              } else {
                notSortedKeys.forEach(function (notSortedKey) {
                  return result.push({
                    selector: notSortedKey,
                    desc: false
                  });
                });
              }
            }
          }
          return result;
        }
      },
      data: {
        _applyChange(change) {
          if (change && change.changeType === 'updateFocusedRow') return;
          return this.callBase.apply(this, arguments);
        },
        _fireChanged(e) {
          this.callBase(e);
          if (this.option('focusedRowEnabled') && this._dataSource) {
            var isPartialUpdate = e.changeType === 'update' && e.repaintChangesOnly;
            var isPartialUpdateWithDeleting = isPartialUpdate && e.changeTypes && e.changeTypes.indexOf('remove') >= 0;
            if (e.changeType === 'refresh' && e.items.length || isPartialUpdateWithDeleting) {
              this._updatePageIndexes();
              this._updateFocusedRow(e);
            } else if (e.changeType === 'append' || e.changeType === 'prepend') {
              this._updatePageIndexes();
            } else if (e.changeType === 'update' && e.repaintChangesOnly) {
              this._updateFocusedRow(e);
            }
          }
        },
        _updatePageIndexes() {
          var prevRenderingPageIndex = this._lastRenderingPageIndex || 0;
          var renderingPageIndex = this._rowsScrollController ? this._rowsScrollController.pageIndex() : 0;
          this._lastRenderingPageIndex = renderingPageIndex;
          this._isPagingByRendering = renderingPageIndex !== prevRenderingPageIndex;
        },
        isPagingByRendering() {
          return this._isPagingByRendering;
        },
        _updateFocusedRow(e) {
          var operationTypes = e.operationTypes || {};
          var focusController = this.getController('focus');
          var reload = operationTypes.reload,
            fullReload = operationTypes.fullReload,
            pageIndex = operationTypes.pageIndex,
            paging = operationTypes.paging;
          var keyboardController = this.getController('keyboardNavigation');
          var isVirtualScrolling = keyboardController._isVirtualScrolling();
          var pagingWithoutVirtualScrolling = paging && !isVirtualScrolling;
          var focusedRowKey = this.option('focusedRowKey');
          var isAutoNavigate = focusController.isAutoNavigateToFocusedRow();
          var isReload = reload && pageIndex === false;
          if (isReload && !fullReload && (0, _type.isDefined)(focusedRowKey)) {
            focusController._navigateToRow(focusedRowKey, true).done(function (focusedRowIndex) {
              if (focusedRowIndex < 0) {
                focusController._focusRowByIndex(undefined, operationTypes);
              }
            });
          } else if (pagingWithoutVirtualScrolling && isAutoNavigate) {
            var rowIndexByKey = this.getRowIndexByKey(focusedRowKey);
            var focusedRowIndex = this.option('focusedRowIndex');
            var isValidRowIndexByKey = rowIndexByKey >= 0;
            var isValidFocusedRowIndex = focusedRowIndex >= 0;
            var isSameRowIndex = focusedRowIndex === rowIndexByKey;
            if (isValidFocusedRowIndex && (isSameRowIndex || !isValidRowIndexByKey)) {
              focusController._focusRowByIndex(focusedRowIndex, operationTypes);
            }
          } else if (pagingWithoutVirtualScrolling && !isAutoNavigate && this.getRowIndexByKey(focusedRowKey) < 0) {
            this.option('focusedRowIndex', -1);
          } else if (operationTypes.fullReload) {
            focusController._focusRowByKeyOrIndex();
          }
        },
        getPageIndexByKey(key) {
          var that = this;
          // @ts-expect-error
          var d = new _deferred.Deferred();
          that.getGlobalRowIndexByKey(key).done(function (globalIndex) {
            d.resolve(globalIndex >= 0 ? Math.floor(globalIndex / that.pageSize()) : -1);
          }).fail(d.reject);
          return d.promise();
        },
        getGlobalRowIndexByKey(key) {
          if (this._dataSource.group()) {
            return this._calculateGlobalRowIndexByGroupedData(key);
          }
          return this._calculateGlobalRowIndexByFlatData(key);
        },
        _calculateGlobalRowIndexByFlatData(key, groupFilter, useGroup) {
          var that = this;
          // @ts-expect-error
          var deferred = new _deferred.Deferred();
          var dataSource = that._dataSource;
          if (Array.isArray(key) || (0, _m_editing_utils.isNewRowTempKey)(key)) {
            return deferred.resolve(-1).promise();
          }
          var filter = that._generateFilterByKey(key);
          dataSource.load({
            filter: that._concatWithCombinedFilter(filter),
            skip: 0,
            take: 1
          }).done(function (data) {
            if (data.length > 0) {
              filter = that._generateOperationFilterByKey(key, data[0], useGroup);
              dataSource.load({
                filter: that._concatWithCombinedFilter(filter, groupFilter),
                skip: 0,
                take: 1,
                requireTotalCount: true
              }).done(function (_, extra) {
                deferred.resolve(extra.totalCount);
              });
            } else {
              deferred.resolve(-1);
            }
          });
          return deferred.promise();
        },
        _concatWithCombinedFilter(filter, groupFilter) {
          var combinedFilter = this.getCombinedFilter();
          return _m_utils.default.combineFilters([filter, combinedFilter, groupFilter]);
        },
        _generateBooleanFilter(selector, value, sortInfo) {
          var desc = sortInfo.desc;
          switch (true) {
            case value === false && desc:
              return [selector, '=', true];
            case value === false && !desc:
              return [selector, '=', null];
            case value === true && !desc:
            case !(0, _type.isBoolean)(value) && desc:
              return [selector, '<>', value];
            default:
              return undefined;
          }
        },
        // TODO Vinogradov: Move this method implementation to the UiGridCoreFocusUtils
        // and cover with unit tests.
        _generateOperationFilterByKey(key, rowData, useGroup) {
          var that = this;
          var dateSerializationFormat = that.option('dateSerializationFormat');
          var isRemoteFiltering = that._dataSource.remoteOperations().filtering;
          var filter = that._generateFilterByKey(key, '<');
          var sort = that._columnsController.getSortDataSourceParameters(!isRemoteFiltering, true);
          if (useGroup) {
            var group = that._columnsController.getGroupDataSourceParameters(!isRemoteFiltering);
            if (group) {
              sort = sort ? group.concat(sort) : group;
            }
          }
          if (sort) {
            sort.slice().reverse().forEach(function (sortInfo) {
              var selector = sortInfo.selector,
                desc = sortInfo.desc,
                compare = sortInfo.compare;
              var _UiGridCoreFocusUtils = _m_focus_utils.UiGridCoreFocusUtils.getSortFilterValue(sortInfo, rowData, {
                  isRemoteFiltering,
                  dateSerializationFormat,
                  getSelector: function getSelector(selector) {
                    return that._columnsController.columnOption(selector, 'selector');
                  }
                }),
                getter = _UiGridCoreFocusUtils.getter,
                rawValue = _UiGridCoreFocusUtils.rawValue,
                safeValue = _UiGridCoreFocusUtils.safeValue;
              filter = [[selector, '=', safeValue], 'and', filter];
              if (rawValue === null || (0, _type.isBoolean)(rawValue)) {
                var booleanFilter = that._generateBooleanFilter(selector, safeValue, desc);
                if (booleanFilter) {
                  filter = [booleanFilter, 'or', filter];
                }
              } else {
                var filterOperation = desc ? '>' : '<';
                var sortFilter;
                if (compare) {
                  sortFilter = function sortFilter(data) {
                    if (filterOperation === '<') {
                      return compare(rawValue, getter(data)) >= 1;
                    }
                    return compare(rawValue, getter(data)) <= -1;
                  };
                } else {
                  sortFilter = [selector, filterOperation, safeValue];
                  if (!desc) {
                    sortFilter = [sortFilter, 'or', [selector, '=', null]];
                  }
                }
                filter = [sortFilter, 'or', filter];
              }
            });
          }
          return filter;
        },
        _generateFilterByKey(key, operation) {
          var dataSourceKey = this._dataSource.key();
          var filter = [];
          if (!operation) {
            operation = '=';
          }
          if (Array.isArray(dataSourceKey)) {
            for (var i = 0; i < dataSourceKey.length; ++i) {
              var keyPart = key[dataSourceKey[i]];
              if (keyPart) {
                if (filter.length > 0) {
                  filter.push('and');
                }
                filter.push([dataSourceKey[i], operation, keyPart]);
              }
            }
          } else {
            filter = [dataSourceKey, operation, key];
          }
          return filter;
        },
        _getLastItemIndex() {
          return this.items(true).length - 1;
        }
      },
      editing: {
        _deleteRowCore(rowIndex) {
          var _this7 = this;
          var deferred = this.callBase.apply(this, arguments);
          var dataController = this.getController('data');
          var rowKey = dataController.getKeyByRowIndex(rowIndex);
          deferred.done(function () {
            var rowIndex = dataController.getRowIndexByKey(rowKey);
            var visibleRows = dataController.getVisibleRows();
            if (rowIndex === -1 && !visibleRows.length) {
              _this7.getController('focus')._resetFocusedRow();
            }
          });
        }
      }
    },
    views: {
      rowsView: {
        _createRow(row) {
          var $row = this.callBase.apply(this, arguments);
          if (this.option('focusedRowEnabled') && row) {
            if (this.getController('focus').isRowFocused(row.key)) {
              $row.addClass(ROW_FOCUSED_CLASS);
            }
          }
          return $row;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _checkRowKeys(options) {
          this.callBase.apply(this, arguments);
          if (this.option('focusedRowEnabled') && this.option('dataSource')) {
            var store = this._dataController.store();
            if (store && !store.key()) {
              this._dataController.fireError('E1042', 'Row focusing');
            }
          }
        },
        _update(change) {
          if (change.changeType === 'updateFocusedRow') {
            if (this.option('focusedRowEnabled')) {
              this.getController('focus').updateFocusedRow(change);
            }
          } else {
            this.callBase(change);
          }
        },
        updateFocusElementTabIndex($cellElements, preventScroll) {
          if (this.option('focusedRowEnabled')) {
            this._setFocusedRowElementTabIndex(preventScroll);
          } else {
            this.callBase($cellElements);
          }
        },
        _setFocusedRowElementTabIndex(preventScroll) {
          var _this8 = this;
          var focusedRowKey = this.option('focusedRowKey');
          var tabIndex = this.option('tabIndex') || 0;
          var dataController = this._dataController;
          var columnsController = this._columnsController;
          var rowIndex = dataController.getRowIndexByKey(focusedRowKey);
          var columnIndex = this.option('focusedColumnIndex');
          var $row = this._findRowElementForTabIndex();
          if (!(0, _type.isDefined)(this._scrollToFocusOnResize)) {
            this._scrollToFocusOnResize = function () {
              _this8.scrollToElementVertically(_this8._findRowElementForTabIndex());
              _this8.resizeCompleted.remove(_this8._scrollToFocusOnResize);
            };
          }
          $row.attr('tabIndex', tabIndex);
          if (rowIndex >= 0 && !preventScroll) {
            if (columnIndex < 0) {
              columnIndex = 0;
            }
            rowIndex += dataController.getRowIndexOffset();
            columnIndex += columnsController.getColumnIndexOffset();
            this.getController('keyboardNavigation').setFocusedCellPosition(rowIndex, columnIndex);
            if (this.getController('focus').isAutoNavigateToFocusedRow()) {
              var dataSource = dataController.dataSource();
              var operationTypes = dataSource && dataSource.operationTypes();
              if (operationTypes && !operationTypes.paging && !dataController.isPagingByRendering()) {
                this.resizeCompleted.remove(this._scrollToFocusOnResize);
                this.resizeCompleted.add(this._scrollToFocusOnResize);
              }
            }
          }
        },
        _findRowElementForTabIndex() {
          var focusedRowKey = this.option('focusedRowKey');
          var rowIndex = this._dataController.getRowIndexByKey(focusedRowKey);
          return (0, _renderer.default)(this.getRowElement(rowIndex >= 0 ? rowIndex : 0));
        },
        scrollToRowElement(key) {
          var rowIndex = this.getController('data').getRowIndexByKey(key);
          var $row = (0, _renderer.default)(this.getRow(rowIndex));
          return this.scrollToElementVertically($row);
        },
        scrollToElementVertically($row) {
          var scrollable = this.getScrollable();
          if (scrollable && $row.length) {
            var position = scrollable.getScrollElementPosition($row, 'vertical');
            return this.scrollTopPosition(position);
          }
          // @ts-expect-error
          return new _deferred.Deferred().resolve();
        },
        scrollTopPosition(scrollTop) {
          // @ts-expect-error
          var d = new _deferred.Deferred();
          var scrollable = this.getScrollable();
          if (scrollable) {
            var currentScrollTop = scrollable.scrollTop();
            var scrollHandler = function scrollHandler() {
              scrollable.off('scroll', scrollHandler);
              d.resolve();
            };
            if (scrollTop !== currentScrollTop) {
              scrollable.on('scroll', scrollHandler);
              this._dataController.resetFilterApplying();
              scrollable.scrollTo({
                top: scrollTop
              });
              return d.promise();
            }
          }
          return d.resolve();
        }
      }
    }
  }
};
exports.focusModule = focusModule;