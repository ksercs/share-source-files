/**
* DevExtreme (esm/__internal/grids/grid_core/views/m_rows_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
import { deferRender, deferUpdate } from '../../../../core/utils/common';
import { compileGetter } from '../../../../core/utils/data';
import { extend } from '../../../../core/utils/extend';
import { each } from '../../../../core/utils/iterator';
import { getBoundingRect, getDefaultAlignment } from '../../../../core/utils/position';
import { getHeight, getOuterHeight, getWidth } from '../../../../core/utils/size';
import { isEmpty } from '../../../../core/utils/string';
import { setHeight } from '../../../../core/utils/style';
import { isDefined, isNumeric, isString } from '../../../../core/utils/type';
import { getWindow, hasWindow } from '../../../../core/utils/window';
import eventsEngine from '../../../../events/core/events_engine';
import { removeEvent } from '../../../../events/remove';
import messageLocalization from '../../../../localization/message';
import Scrollable from '../../../../ui/scroll_view/ui.scrollable';
import gridCoreUtils from '../m_utils';
import { ColumnsView } from './m_columns_view';
var ROWS_VIEW_CLASS = 'rowsview';
var CONTENT_CLASS = 'content';
var NOWRAP_CLASS = 'nowrap';
var GROUP_ROW_CLASS = 'dx-group-row';
var GROUP_CELL_CLASS = 'dx-group-cell';
var DATA_ROW_CLASS = 'dx-data-row';
var FREE_SPACE_CLASS = 'dx-freespace-row';
var ROW_LINES_CLASS = 'dx-row-lines';
var COLUMN_LINES_CLASS = 'dx-column-lines';
var ROW_ALTERNATION_CLASS = 'dx-row-alt';
var LAST_ROW_BORDER = 'dx-last-row-border';
var EMPTY_CLASS = 'dx-empty';
var ROW_INSERTED_ANIMATION_CLASS = 'row-inserted-animation';
var LOADPANEL_HIDE_TIMEOUT = 200;
function getMaxHorizontalScrollOffset(scrollable) {
  return scrollable ? Math.round(scrollable.scrollWidth() - scrollable.clientWidth()) : 0;
}
function isGroupRow(_ref) {
  var {
    rowType,
    column
  } = _ref;
  return rowType === 'group' && isDefined(column.groupIndex) && !column.showWhenGrouped && !column.command;
}
var defaultCellTemplate = function defaultCellTemplate($container, options) {
  var isDataTextEmpty = isEmpty(options.text) && options.rowType === 'data';
  var {
    text
  } = options;
  var container = $container.get(0);
  if (isDataTextEmpty) {
    gridCoreUtils.setEmptyText($container);
  } else if (options.column.encodeHtml) {
    container.textContent = text;
  } else {
    container.innerHTML = text;
  }
};
var getScrollableBottomPadding = function getScrollableBottomPadding(that) {
  var scrollable = that.getScrollable();
  // @ts-expect-error
  return scrollable ? Math.ceil(parseFloat($(scrollable.content()).css('paddingBottom'))) : 0;
};
class RowsView extends ColumnsView {
  _getDefaultTemplate(column) {
    switch (column.command) {
      case 'empty':
        return function (container) {
          container.html('&nbsp;');
        };
      default:
        return defaultCellTemplate;
    }
  }
  _getDefaultGroupTemplate(column) {
    var that = this;
    var summaryTexts = that.option('summary.texts');
    return function ($container, options) {
      var {
        data
      } = options;
      var text = "".concat(options.column.caption, ": ").concat(options.text);
      var container = $container.get(0);
      if (options.summaryItems && options.summaryItems.length) {
        text += " ".concat(gridCoreUtils.getGroupRowSummaryText(options.summaryItems, summaryTexts));
      }
      if (data) {
        if (options.groupContinuedMessage && options.groupContinuesMessage) {
          text += " (".concat(options.groupContinuedMessage, ". ").concat(options.groupContinuesMessage, ")");
        } else if (options.groupContinuesMessage) {
          text += " (".concat(options.groupContinuesMessage, ")");
        } else if (options.groupContinuedMessage) {
          text += " (".concat(options.groupContinuedMessage, ")");
        }
      }
      if (column.encodeHtml) {
        container.textContent = text;
      } else {
        container.innerHTML = text;
      }
    };
  }
  _update(change) {}
  _updateCell($cell, options) {
    if (isGroupRow(options)) {
      $cell.addClass(GROUP_CELL_CLASS);
    }
    super._updateCell.apply(this, arguments);
  }
  _getCellTemplate(options) {
    var that = this;
    var {
      column
    } = options;
    var template;
    if (isGroupRow(options)) {
      template = column.groupCellTemplate || {
        allowRenderToDetachedContainer: true,
        render: that._getDefaultGroupTemplate(column)
      };
    } else if ((options.rowType === 'data' || column.command) && column.cellTemplate) {
      template = column.cellTemplate;
    } else {
      template = {
        allowRenderToDetachedContainer: true,
        render: that._getDefaultTemplate(column)
      };
    }
    return template;
  }
  _createRow(row, tag) {
    var $row = super._createRow.apply(this, arguments);
    if (row) {
      var isGroup = row.rowType === 'group';
      var isDataRow = row.rowType === 'data';
      isDataRow && $row.addClass(DATA_ROW_CLASS);
      isDataRow && this.option('showRowLines') && $row.addClass(ROW_LINES_CLASS);
      this.option('showColumnLines') && $row.addClass(COLUMN_LINES_CLASS);
      if (row.visible === false) {
        $row.hide();
      }
      if (isGroup) {
        $row.addClass(GROUP_ROW_CLASS);
        this.setAria('role', 'row', $row);
        this.setAriaExpandedAttribute($row, row);
      }
    }
    return $row;
  }
  _rowPrepared($row, rowOptions, row) {
    if (rowOptions.rowType === 'data') {
      if (this.option('rowAlternationEnabled')) {
        this._isAltRow(row) && $row.addClass(ROW_ALTERNATION_CLASS);
        rowOptions.watch && rowOptions.watch(() => this._isAltRow(row), value => {
          $row.toggleClass(ROW_ALTERNATION_CLASS, value);
        });
      }
      this._setAriaRowIndex(rowOptions, $row);
      rowOptions.watch && rowOptions.watch(() => rowOptions.rowIndex, () => this._setAriaRowIndex(rowOptions, $row));
    }
    super._rowPrepared.apply(this, arguments);
  }
  _setAriaRowIndex(row, $row) {
    var {
      component
    } = this;
    var isPagerMode = component.option('scrolling.mode') === 'standard' && !gridCoreUtils.isVirtualRowRendering(component);
    var rowIndex = row.rowIndex + 1;
    if (isPagerMode) {
      rowIndex = component.pageIndex() * component.pageSize() + rowIndex;
    } else {
      rowIndex += this._dataController.getRowIndexOffset();
    }
    this.setAria('rowindex', rowIndex, $row);
  }
  setAriaExpandedAttribute($row, row) {
    var description = row.isExpanded ? this.localize('dxDataGrid-ariaExpandedRow') : this.localize('dxDataGrid-ariaCollapsedRow');
    this.setAria('roledescription', description, $row);
  }
  _afterRowPrepared(e) {
    var arg = e.args[0];
    var dataController = this._dataController;
    var row = dataController.getVisibleRows()[arg.rowIndex];
    var watch = this.option('integrationOptions.watchMethod');
    if (!arg.data || arg.rowType !== 'data' || arg.isNewRow || !this.option('twoWayBindingEnabled') || !watch || !row) return;
    var dispose = watch(() => dataController.generateDataValues(arg.data, arg.columns), () => {
      dataController.repaintRows([row.rowIndex], this.option('repaintChangesOnly'));
    }, {
      deep: true,
      skipImmediate: true
    });
    eventsEngine.on(arg.rowElement, removeEvent, dispose);
  }
  _renderScrollable(force) {
    var that = this;
    var $element = that.element();
    if (!$element.children().length) {
      $element.append('<div>');
    }
    if (force || !that._loadPanel) {
      that._renderLoadPanel($element, $element.parent(), that._dataController.isLocalStore());
    }
    if ((force || !that.getScrollable()) && that._dataController.isLoaded()) {
      var columns = that.getColumns();
      var allColumnsHasWidth = true;
      for (var i = 0; i < columns.length; i++) {
        if (!columns[i].width && !columns[i].minWidth) {
          allColumnsHasWidth = false;
          break;
        }
      }
      if (that.option('columnAutoWidth') || that._hasHeight || allColumnsHasWidth || that._columnsController._isColumnFixing()) {
        that._renderScrollableCore($element);
      }
    }
  }
  _handleScroll(e) {
    var that = this;
    var rtlEnabled = that.option('rtlEnabled');
    var isNativeScrolling = e.component.option('useNative');
    that._scrollTop = e.scrollOffset.top;
    that._scrollLeft = e.scrollOffset.left;
    var scrollLeft = e.scrollOffset.left;
    if (rtlEnabled) {
      this._scrollRight = getMaxHorizontalScrollOffset(e.component) - this._scrollLeft;
      if (isNativeScrolling) {
        scrollLeft = -this._scrollRight;
      }
      if (!this.isScrollbarVisible(true)) {
        this._scrollLeft = -1;
      }
    }
    that.scrollChanged.fire(_extends(_extends({}, e.scrollOffset), {
      left: scrollLeft
    }), that.name);
  }
  _renderScrollableCore($element) {
    var that = this;
    var dxScrollableOptions = that._createScrollableOptions();
    var scrollHandler = that._handleScroll.bind(that);
    dxScrollableOptions.onScroll = scrollHandler;
    that._scrollable = that._createComponent($element, Scrollable, dxScrollableOptions);
    that._scrollableContainer = that._scrollable && $(that._scrollable.container());
  }
  _renderLoadPanel() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return gridCoreUtils.renderLoadPanel.apply(this, arguments);
  }
  _renderContent(contentElement, tableElement, isFixedTableRendering) {
    contentElement.empty().append(tableElement);
    return this._findContentElement();
  }
  _updateContent(newTableElement, change, isFixedTableRendering) {
    this._contentChanges.push({
      newTableElement,
      change,
      isFixedTableRendering
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.waitAsyncTemplates().done(() => {
      var contentChanges = this._contentChanges;
      this._contentChanges = [];
      contentChanges.forEach(_ref2 => {
        var {
          newTableElement,
          change,
          isFixedTableRendering
        } = _ref2;
        var tableElement = this.getTableElement(isFixedTableRendering);
        var contentElement = this._findContentElement(isFixedTableRendering);
        var changeType = change === null || change === void 0 ? void 0 : change.changeType;
        var executors = [];
        var highlightChanges = this.option('highlightChanges');
        var rowInsertedClass = this.addWidgetPrefix(ROW_INSERTED_ANIMATION_CLASS);
        switch (changeType) {
          case 'update':
            each(change.rowIndices, (index, rowIndex) => {
              var _a;
              var $newRowElement = this._getRowElements(newTableElement).eq(index);
              var dataChangeType = (_a = change.changeTypes) === null || _a === void 0 ? void 0 : _a[index];
              var item = change.items && change.items[index];
              executors.push(() => {
                var _a;
                var $rowElements = this._getRowElements(tableElement);
                var $rowElement = $rowElements.eq(rowIndex);
                // eslint-disable-next-line default-case
                switch (dataChangeType) {
                  case 'update':
                    if (item) {
                      var columnIndices = (_a = change.columnIndices) === null || _a === void 0 ? void 0 : _a[index];
                      if (isDefined(item.visible) && item.visible !== $rowElement.is(':visible')) {
                        $rowElement.toggle(item.visible);
                      } else if (columnIndices) {
                        this._updateCells($rowElement, $newRowElement, columnIndices);
                      } else {
                        $rowElement.replaceWith($newRowElement);
                      }
                    }
                    break;
                  case 'insert':
                    if (!$rowElements.length) {
                      if (tableElement) {
                        var target = $newRowElement.is('tbody') ? tableElement : tableElement.children('tbody');
                        $newRowElement.prependTo(target);
                      }
                    } else if ($rowElement.length) {
                      $newRowElement.insertBefore($rowElement);
                    } else {
                      $newRowElement.insertAfter($rowElements.last());
                    }
                    if (highlightChanges && change.isLiveUpdate) {
                      $newRowElement.addClass(rowInsertedClass);
                    }
                    break;
                  case 'remove':
                    $rowElement.remove();
                    break;
                }
              });
            });
            each(executors, function () {
              this();
            });
            newTableElement.remove();
            break;
          default:
            this.setTableElement(newTableElement, isFixedTableRendering);
            contentElement.addClass(this.addWidgetPrefix(CONTENT_CLASS));
            this._setGridRole(contentElement);
            this._renderContent(contentElement, newTableElement, isFixedTableRendering);
            break;
        }
      });
    }).fail(() => {
      this._contentChanges = [];
    });
  }
  _getGridRoleName() {
    return 'grid';
  }
  _setGridRole($element) {
    var _a;
    var hasData = !((_a = this._dataController) === null || _a === void 0 ? void 0 : _a.isEmpty());
    var gridRoleName = this._getGridRoleName();
    if (($element === null || $element === void 0 ? void 0 : $element.length) && hasData) {
      this.setAria('role', gridRoleName, $element);
    }
  }
  _createEmptyRow(className, isFixed, height) {
    var that = this;
    var $cell;
    var $row = that._createRow();
    var columns = isFixed ? this.getFixedColumns() : this.getColumns();
    $row.addClass(className).toggleClass(COLUMN_LINES_CLASS, that.option('showColumnLines'));
    for (var i = 0; i < columns.length; i++) {
      $cell = that._createCell({
        column: columns[i],
        rowType: 'freeSpace',
        columnIndex: i,
        columns
      });
      isNumeric(height) && $cell.css('height', height);
      $row.append($cell);
    }
    that.setAria('role', 'presentation', $row);
    return $row;
  }
  getFixedColumns() {
    throw new Error('Method not implemented.');
  }
  _appendEmptyRow($table, $emptyRow, location) {
    var $tBodies = this._getBodies($table);
    var isTableContainer = !$tBodies.length || $emptyRow.is('tbody');
    var $container = isTableContainer ? $table : $tBodies;
    if (location === 'top') {
      $container.first().prepend($emptyRow);
      if (isTableContainer) {
        var $colgroup = $container.children('colgroup');
        $container.prepend($colgroup);
      }
    } else {
      $container.last().append($emptyRow);
    }
  }
  _renderFreeSpaceRow($tableElement, change) {
    var $freeSpaceRowElement = this._createEmptyRow(FREE_SPACE_CLASS);
    $freeSpaceRowElement = this._wrapRowIfNeed($tableElement, $freeSpaceRowElement, (change === null || change === void 0 ? void 0 : change.changeType) === 'refresh');
    this._appendEmptyRow($tableElement, $freeSpaceRowElement);
  }
  _checkRowKeys(options) {
    var that = this;
    var rows = that._getRows(options);
    var keyExpr = that._dataController.store() && that._dataController.store().key();
    keyExpr && rows.some(row => {
      if (row.rowType === 'data' && row.key === undefined) {
        that._dataController.fireError('E1046', keyExpr);
        return true;
      }
      return undefined;
    });
  }
  _needUpdateRowHeight(itemsCount) {
    return itemsCount > 0 && !this._rowHeight;
  }
  _getRowsHeight($tableElement) {
    $tableElement = $tableElement || this._tableElement;
    var $rowElements = $tableElement.children('tbody').children().not('.dx-virtual-row').not(".".concat(FREE_SPACE_CLASS));
    return $rowElements.toArray().reduce((sum, row) => sum + getBoundingRect(row).height, 0);
  }
  _updateRowHeight() {
    var that = this;
    var $tableElement = that.getTableElement();
    var itemsCount = that._dataController.items().length;
    if ($tableElement && that._needUpdateRowHeight(itemsCount)) {
      var rowsHeight = that._getRowsHeight($tableElement);
      that._rowHeight = rowsHeight / itemsCount;
    }
  }
  _findContentElement(isFixedTableRendering) {
    var $content = this.element();
    var scrollable = this.getScrollable();
    if ($content) {
      if (scrollable) {
        $content = $(scrollable.content());
      }
      return $content.children().first();
    }
  }
  _getRowElements(tableElement) {
    var $rows = super._getRowElements(tableElement);
    return $rows && $rows.not(".".concat(FREE_SPACE_CLASS));
  }
  _getFreeSpaceRowElements($table) {
    var tableElements = $table || this.getTableElements();
    return tableElements && tableElements.children('tbody').children(".".concat(FREE_SPACE_CLASS));
  }
  _getNoDataText() {
    return this.option('noDataText');
  }
  _rowClick(e) {
    var item = this._dataController.items()[e.rowIndex] || {};
    this.executeAction('onRowClick', extend({
      evaluate(expr) {
        var getter = compileGetter(expr);
        // @ts-expect-error
        return getter(item.data);
      }
    }, e, item));
  }
  _rowDblClick(e) {
    var item = this._dataController.items()[e.rowIndex] || {};
    this.executeAction('onRowDblClick', extend({}, e, item));
  }
  _getColumnsCountBeforeGroups(columns) {
    for (var i = 0; i < columns.length; i++) {
      if (columns[i].type === 'groupExpand') {
        return i;
      }
    }
    return 0;
  }
  _getGroupCellOptions(options) {
    var columnsCountBeforeGroups = this._getColumnsCountBeforeGroups(options.columns);
    var columnIndex = (options.row.groupIndex || 0) + columnsCountBeforeGroups;
    return {
      columnIndex,
      colspan: options.columns.length - columnIndex - 1
    };
  }
  _needWrapRow() {
    return super._needWrapRow.apply(this, arguments) || !!this.option('dataRowTemplate');
  }
  _renderCells($row, options) {
    if (options.row.rowType === 'group') {
      this._renderGroupedCells($row, options);
    } else if (options.row.values) {
      super._renderCells($row, options);
    }
  }
  _renderGroupedCells($row, options) {
    var {
      row
    } = options;
    var expandColumn;
    var {
      columns
    } = options;
    var {
      rowIndex
    } = row;
    var isExpanded;
    var groupCellOptions = this._getGroupCellOptions(options);
    for (var i = 0; i <= groupCellOptions.columnIndex; i++) {
      if (i === groupCellOptions.columnIndex && columns[i].allowCollapsing && options.scrollingMode !== 'infinite') {
        isExpanded = !!row.isExpanded;
        expandColumn = columns[i];
      } else {
        isExpanded = null;
        expandColumn = {
          command: 'expand',
          cssClass: columns[i].cssClass
        };
      }
      if (this._needRenderCell(i, options.columnIndices)) {
        this._renderCell($row, {
          value: isExpanded,
          row,
          rowIndex,
          column: expandColumn,
          columnIndex: i,
          columnIndices: options.columnIndices,
          change: options.change
        });
      }
    }
    var groupColumnAlignment = getDefaultAlignment(this.option('rtlEnabled'));
    var groupColumn = extend({}, columns[groupCellOptions.columnIndex], {
      command: null,
      type: null,
      cssClass: null,
      width: null,
      showWhenGrouped: false,
      alignment: groupColumnAlignment
    });
    if (groupCellOptions.colspan > 1) {
      groupColumn.colspan = groupCellOptions.colspan;
    }
    if (this._needRenderCell(groupCellOptions.columnIndex + 1, options.columnIndices)) {
      this._renderCell($row, {
        value: row.values[row.groupIndex],
        row,
        rowIndex,
        column: groupColumn,
        columnIndex: groupCellOptions.columnIndex + 1,
        columnIndices: options.columnIndices,
        change: options.change
      });
    }
  }
  _renderRows($table, options) {
    var that = this;
    var scrollingMode = that.option('scrolling.mode');
    super._renderRows($table, extend({
      scrollingMode
    }, options));
    that._checkRowKeys(options.change);
    that._renderFreeSpaceRow($table, options.change);
    if (!that._hasHeight) {
      that.updateFreeSpaceRowHeight($table);
    }
  }
  _renderDataRowByTemplate($table, options, dataRowTemplate) {
    var {
      row
    } = options;
    var rowOptions = extend({
      columns: options.columns
    }, row);
    var $tbody = this._createRow(row, 'tbody');
    $tbody.appendTo($table);
    this.renderTemplate($tbody, dataRowTemplate, rowOptions, true, options.change);
    this._rowPrepared($tbody, rowOptions, options.row);
  }
  _renderRow($table, options) {
    var {
      row
    } = options;
    var {
      rowTemplate
    } = this.option();
    var dataRowTemplate = this.option('dataRowTemplate');
    if (row.rowType === 'data' && dataRowTemplate) {
      this._renderDataRowByTemplate($table, options, dataRowTemplate);
    } else if ((row.rowType === 'data' || row.rowType === 'group') && !isDefined(row.groupIndex) && rowTemplate) {
      this.renderTemplate($table, rowTemplate, extend({
        columns: options.columns
      }, row), true);
    } else {
      super._renderRow($table, options);
    }
  }
  _renderTable(options) {
    var that = this;
    var $table = super._renderTable(options);
    var resizeCompletedHandler = function resizeCompletedHandler() {
      var scrollableInstance = that.getScrollable();
      if (scrollableInstance && that.element().closest(getWindow().document).length) {
        that.resizeCompleted.remove(resizeCompletedHandler);
        scrollableInstance._visibilityChanged(true);
      }
    };
    if (!isDefined(that.getTableElement())) {
      that.setTableElement($table);
      that._renderScrollable(true);
      that.resizeCompleted.add(resizeCompletedHandler);
    } else {
      that._renderScrollable();
    }
    return $table;
  }
  _createTable() {
    var $table = super._createTable.apply(this, arguments);
    if (this.option().rowTemplate || this.option().dataRowTemplate) {
      $table.appendTo(this.component.$element());
    }
    return $table;
  }
  _renderCore(change) {
    var $element = this.element();
    $element.addClass(this.addWidgetPrefix(ROWS_VIEW_CLASS)).toggleClass(this.addWidgetPrefix(NOWRAP_CLASS), !this.option('wordWrapEnabled'));
    $element.toggleClass(EMPTY_CLASS, this._dataController.isEmpty());
    this.setAria('role', 'presentation', $element);
    var $table = this._renderTable({
      change
    });
    var deferred = this._updateContent($table, change);
    super._renderCore(change);
    this._lastColumnWidths = null;
    return deferred;
  }
  _getRows(change) {
    return change && change.items || this._dataController.items();
  }
  _getCellOptions(options) {
    var that = this;
    var {
      column
    } = options;
    var {
      row
    } = options;
    var {
      data
    } = row;
    var summaryCells = row && row.summaryCells;
    var {
      value
    } = options;
    var displayValue = gridCoreUtils.getDisplayValue(column, value, data, row.rowType);
    var parameters = super._getCellOptions(options);
    parameters.value = value;
    parameters.oldValue = options.oldValue;
    parameters.displayValue = displayValue;
    parameters.row = row;
    parameters.key = row.key;
    parameters.data = data;
    parameters.rowType = row.rowType;
    parameters.values = row.values;
    parameters.text = !column.command ? gridCoreUtils.formatValue(displayValue, column) : '';
    parameters.rowIndex = row.rowIndex;
    parameters.summaryItems = summaryCells && summaryCells[options.columnIndex];
    parameters.resized = column.resizedCallbacks;
    if (isDefined(column.groupIndex) && !column.command) {
      var groupingTextsOptions = that.option('grouping.texts');
      var scrollingMode = that.option('scrolling.mode');
      if (scrollingMode !== 'virtual' && scrollingMode !== 'infinite') {
        parameters.groupContinuesMessage = data && data.isContinuationOnNextPage && groupingTextsOptions && groupingTextsOptions.groupContinuesMessage;
        parameters.groupContinuedMessage = data && data.isContinuation && groupingTextsOptions && groupingTextsOptions.groupContinuedMessage;
      }
    }
    return parameters;
  }
  _setRowsOpacityCore($rows, visibleColumns, columnIndex, value) {
    var columnsController = this._columnsController;
    var columns = columnsController.getColumns();
    var column = columns && columns[columnIndex];
    var columnID = column && column.isBand && column.index;
    each($rows, (rowIndex, row) => {
      if (!$(row).hasClass(GROUP_ROW_CLASS)) {
        for (var i = 0; i < visibleColumns.length; i++) {
          if (isNumeric(columnID) && columnsController.isParentBandColumn(visibleColumns[i].index, columnID) || visibleColumns[i].index === columnIndex) {
            $rows.eq(rowIndex).children().eq(i).css({
              opacity: value
            });
            if (!isNumeric(columnID)) {
              break;
            }
          }
        }
      }
    });
  }
  _getDevicePixelRatio() {
    return getWindow().devicePixelRatio;
  }
  renderNoDataText() {
    return gridCoreUtils.renderNoDataText.apply(this, arguments);
  }
  getCellOptions(rowIndex, columnIdentifier) {
    var rowOptions = this._dataController.items()[rowIndex];
    var cellOptions;
    var column;
    if (rowOptions) {
      if (isString(columnIdentifier)) {
        column = this._columnsController.columnOption(columnIdentifier);
      } else {
        column = this._columnsController.getVisibleColumns()[columnIdentifier];
      }
      if (column) {
        cellOptions = this._getCellOptions({
          value: column.calculateCellValue(rowOptions.data),
          rowIndex: rowOptions.rowIndex,
          row: rowOptions,
          column
        });
      }
    }
    return cellOptions;
  }
  getRow(index) {
    if (index >= 0) {
      var rows = this._getRowElements();
      if (rows.length > index) {
        return $(rows[index]);
      }
    }
    return undefined;
  }
  updateFreeSpaceRowHeight($table) {
    var dataController = this._dataController;
    var itemCount = dataController.items(true).length;
    var contentElement = this._findContentElement();
    var freeSpaceRowElements = this._getFreeSpaceRowElements($table);
    if (freeSpaceRowElements && contentElement && dataController.totalCount() >= 0) {
      var isFreeSpaceRowVisible = false;
      if (itemCount > 0) {
        if (!this._hasHeight) {
          var freeSpaceRowCount = dataController.pageSize() - itemCount;
          var scrollingMode = this.option('scrolling.mode');
          if (freeSpaceRowCount > 0 && dataController.pageCount() > 1 && scrollingMode !== 'virtual' && scrollingMode !== 'infinite') {
            setHeight(freeSpaceRowElements, freeSpaceRowCount * this._rowHeight);
            isFreeSpaceRowVisible = true;
          }
          if (!isFreeSpaceRowVisible && $table) {
            setHeight(freeSpaceRowElements, 0);
          } else {
            freeSpaceRowElements.toggle(isFreeSpaceRowVisible);
          }
          this._updateLastRowBorder(isFreeSpaceRowVisible);
        } else {
          freeSpaceRowElements.hide();
          deferUpdate(() => {
            var scrollbarWidth = this.getScrollbarWidth(true);
            var elementHeightWithoutScrollbar = getHeight(this.element()) - scrollbarWidth;
            var contentHeight = getOuterHeight(contentElement);
            var showFreeSpaceRow = elementHeightWithoutScrollbar - contentHeight > 0;
            var rowsHeight = this._getRowsHeight(contentElement.children().first());
            var $tableElement = $table || this.getTableElements();
            var borderTopWidth = Math.ceil(parseFloat($tableElement.css('borderTopWidth')));
            var heightCorrection = this._getHeightCorrection();
            var resultHeight = elementHeightWithoutScrollbar - rowsHeight - borderTopWidth - heightCorrection;
            if (showFreeSpaceRow) {
              deferRender(() => {
                freeSpaceRowElements.css('height', resultHeight);
                isFreeSpaceRowVisible = true;
                freeSpaceRowElements.show();
              });
            }
            deferRender(() => this._updateLastRowBorder(isFreeSpaceRowVisible));
          });
        }
      } else {
        freeSpaceRowElements.css('height', 0);
        freeSpaceRowElements.show();
        this._updateLastRowBorder(true);
      }
    }
  }
  _getHeightCorrection() {
    var isZoomedWebkit = browser.webkit && this._getDevicePixelRatio() >= 2; // T606935
    // @ts-expect-error
    var isChromeLatest = browser.chrome && browser.version >= 91;
    // @ts-expect-error
    var hasExtraBorderTop = browser.mozilla && browser.version >= 70 && !this.option('showRowLines');
    return isZoomedWebkit || hasExtraBorderTop || isChromeLatest ? 1 : 0;
  }
  _columnOptionChanged(e) {
    var {
      optionNames
    } = e;
    if (e.changeTypes.grouping) return;
    if (optionNames.width || optionNames.visibleWidth) {
      super._columnOptionChanged(e);
      this._fireColumnResizedCallbacks();
    }
  }
  getScrollable() {
    return this._scrollable;
  }
  init() {
    var that = this;
    var dataController = that.getController('data');
    super.init();
    that._editorFactoryController = that.getController('editorFactory');
    that._rowHeight = 0;
    that._scrollTop = 0;
    that._scrollLeft = -1;
    that._scrollRight = 0;
    that._hasHeight = false;
    that._contentChanges = [];
    dataController.loadingChanged.add((isLoading, messageText) => {
      that.setLoading(isLoading, messageText);
    });
    dataController.dataSourceChanged.add(() => {
      if (this._scrollLeft >= 0 && !this._dataController.isLoading()) {
        this._handleScroll({
          component: this.getScrollable(),
          forceUpdateScrollPosition: true,
          scrollOffset: {
            top: this._scrollTop,
            left: this._scrollLeft
          }
        });
      }
    });
  }
  _handleDataChanged(change) {
    var that = this;
    switch (change.changeType) {
      case 'refresh':
      case 'prepend':
      case 'append':
      case 'update':
        that.render(null, change);
        break;
      default:
        that._update(change);
        break;
    }
  }
  publicMethods() {
    return ['isScrollbarVisible', 'getTopVisibleRowData', 'getScrollbarWidth', 'getCellElement', 'getRowElement', 'getScrollable'];
  }
  contentWidth() {
    return getWidth(this.element()) - this.getScrollbarWidth();
  }
  getScrollbarWidth(isHorizontal) {
    var scrollableContainer = this._scrollableContainer && this._scrollableContainer.get(0);
    var scrollbarWidth = 0;
    if (scrollableContainer) {
      if (!isHorizontal) {
        scrollbarWidth = scrollableContainer.clientWidth ? scrollableContainer.offsetWidth - scrollableContainer.clientWidth : 0;
      } else {
        scrollbarWidth = scrollableContainer.clientHeight ? scrollableContainer.offsetHeight - scrollableContainer.clientHeight : 0;
        scrollbarWidth += getScrollableBottomPadding(this); // T703649, T697699
      }
    }

    return scrollbarWidth > 0 ? scrollbarWidth : 0;
  }
  // TODO remove this call, move _fireColumnResizedCallbacks functionality to columnsController
  _fireColumnResizedCallbacks() {
    var that = this;
    var lastColumnWidths = that._lastColumnWidths || [];
    var columnWidths = [];
    var columns = that.getColumns();
    for (var i = 0; i < columns.length; i++) {
      columnWidths[i] = columns[i].visibleWidth;
      if (columns[i].resizedCallbacks && !isDefined(columns[i].groupIndex) && lastColumnWidths[i] !== columnWidths[i]) {
        columns[i].resizedCallbacks.fire(columnWidths[i]);
      }
    }
    that._lastColumnWidths = columnWidths;
  }
  _updateLastRowBorder(isFreeSpaceRowVisible) {
    if (this.option('showBorders') && this.option('showRowLines') && !isFreeSpaceRowVisible) {
      this.element().addClass(LAST_ROW_BORDER);
    } else {
      this.element().removeClass(LAST_ROW_BORDER);
    }
  }
  _updateScrollable() {
    var scrollable = Scrollable.getInstance(this.element());
    if (scrollable) {
      // @ts-expect-error
      scrollable.update();
      // @ts-expect-error
      if (scrollable.option('useNative') || !(scrollable === null || scrollable === void 0 ? void 0 : scrollable.isRenovated())) {
        this._updateHorizontalScrollPosition();
      }
    }
  }
  _updateHorizontalScrollPosition() {
    var scrollable = this.getScrollable();
    var scrollLeft = scrollable && scrollable.scrollOffset().left;
    var rtlEnabled = this.option('rtlEnabled');
    if (rtlEnabled) {
      var maxHorizontalScrollOffset = getMaxHorizontalScrollOffset(scrollable);
      var scrollRight = maxHorizontalScrollOffset - scrollLeft;
      if (scrollRight !== this._scrollRight) {
        this._scrollLeft = maxHorizontalScrollOffset - this._scrollRight;
      }
    }
    if (this._scrollLeft >= 0 && scrollLeft !== this._scrollLeft) {
      scrollable.scrollTo({
        x: this._scrollLeft
      });
    }
  }
  _resizeCore() {
    var that = this;
    that._fireColumnResizedCallbacks();
    that._updateRowHeight();
    deferRender(() => {
      that._renderScrollable();
      that.renderNoDataText();
      that.updateFreeSpaceRowHeight();
      deferUpdate(() => {
        that._updateScrollable();
      });
    });
  }
  scrollTo(location) {
    var $element = this.element();
    var dxScrollable = $element && Scrollable.getInstance($element);
    if (dxScrollable) {
      dxScrollable.scrollTo(location);
    }
  }
  height(height) {
    var that = this;
    var $element = this.element();
    if (arguments.length === 0) {
      return $element ? getOuterHeight($element, true) : 0;
    }
    if (isDefined(height) && $element) {
      that.hasHeight(height !== 'auto');
      setHeight($element, height);
    }
  }
  hasHeight(hasHeight) {
    if (arguments.length === 0) {
      return !!this._hasHeight;
    }
    this._hasHeight = hasHeight;
    return undefined;
  }
  setLoading(isLoading, messageText) {
    var that = this;
    var loadPanel = that._loadPanel;
    var dataController = that._dataController;
    var loadPanelOptions = that.option('loadPanel') || {};
    var animation = dataController.isLoaded() ? loadPanelOptions.animation : null;
    var $element = that.element();
    if (!hasWindow()) {
      return;
    }
    if (!loadPanel && messageText !== undefined && dataController.isLocalStore() && loadPanelOptions.enabled === 'auto' && $element) {
      that._renderLoadPanel($element, $element.parent());
      loadPanel = that._loadPanel;
    }
    if (loadPanel) {
      var visibilityOptions = {
        message: messageText || loadPanelOptions.text,
        animation,
        visible: isLoading
      };
      if (isLoading) {
        visibilityOptions.position = gridCoreUtils.calculateLoadPanelPosition($element);
      }
      clearTimeout(that._hideLoadingTimeoutID);
      if (loadPanel.option('visible') && !isLoading) {
        that._hideLoadingTimeoutID = setTimeout(() => {
          loadPanel.option(visibilityOptions);
        }, LOADPANEL_HIDE_TIMEOUT);
      } else {
        loadPanel.option(visibilityOptions);
      }
    }
  }
  setRowsOpacity(columnIndex, value) {
    var $rows = this._getRowElements().not(".".concat(GROUP_ROW_CLASS)) || [];
    this._setRowsOpacityCore($rows, this.getColumns(), columnIndex, value);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getCellElementsCore(rowIndex) {
    var $cells = super._getCellElementsCore.apply(this, arguments);
    if ($cells) {
      var groupCellIndex = $cells.filter(".".concat(GROUP_CELL_CLASS)).index();
      if (groupCellIndex >= 0 && $cells.length > groupCellIndex + 1) {
        return $cells.slice(0, groupCellIndex + 1);
      }
    }
    return $cells;
  }
  _getBoundaryVisibleItemIndex(isTop, isFloor) {
    var that = this;
    var itemIndex = 0;
    var prevOffset = 0;
    var offset = 0;
    var viewportBoundary = that._scrollTop;
    var $contentElement = that._findContentElement();
    var contentElementOffsetTop = $contentElement && $contentElement.offset().top;
    var dataController = this.getController('data');
    var items = dataController.items();
    var tableElement = that.getTableElement();
    if (items.length && tableElement) {
      var rowElements = that._getRowElements(tableElement).filter(':visible');
      if (!isTop) {
        var height = getOuterHeight(this._hasHeight ? this.element() : getWindow());
        viewportBoundary += height;
      }
      for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
        prevOffset = offset;
        var $rowElement = $(rowElements).eq(itemIndex);
        if ($rowElement.length) {
          offset = $rowElement.offset();
          offset = (isTop ? offset.top : offset.top + getOuterHeight($rowElement)) - contentElementOffsetTop;
          if (offset > viewportBoundary) {
            if (itemIndex) {
              if (isFloor || viewportBoundary * 2 < Math.round(offset + prevOffset)) {
                itemIndex--;
              }
            }
            break;
          }
        }
      }
      if (itemIndex && itemIndex === items.length) {
        itemIndex--;
      }
    }
    return itemIndex;
  }
  getTopVisibleItemIndex(isFloor) {
    return this._getBoundaryVisibleItemIndex(true, isFloor);
  }
  getBottomVisibleItemIndex(isFloor) {
    return this._getBoundaryVisibleItemIndex(false, isFloor);
  }
  getTopVisibleRowData() {
    var itemIndex = this.getTopVisibleItemIndex();
    var items = this._dataController.items();
    if (items[itemIndex]) {
      return items[itemIndex].data;
    }
    return undefined;
  }
  _scrollToElement($element, offset) {
    var scrollable = this.getScrollable();
    scrollable && scrollable.scrollToElement($element, offset);
  }
  optionChanged(args) {
    var that = this;
    super.optionChanged(args);
    // eslint-disable-next-line default-case
    switch (args.name) {
      case 'wordWrapEnabled':
      case 'showColumnLines':
      case 'showRowLines':
      case 'rowAlternationEnabled':
      case 'rowTemplate':
      case 'dataRowTemplate':
      case 'twoWayBindingEnabled':
        that._invalidate(true, true);
        args.handled = true;
        break;
      case 'scrolling':
        that._rowHeight = null;
        that._tableElement = null;
        args.handled = true;
        break;
      case 'rtlEnabled':
        that._rowHeight = null;
        that._tableElement = null;
        break;
      case 'loadPanel':
        that._tableElement = null;
        that._invalidate(true, args.fullName !== 'loadPanel.enabled');
        args.handled = true;
        break;
      case 'noDataText':
        that.renderNoDataText();
        args.handled = true;
        break;
    }
  }
  setAriaOwns(headerTableId, footerTableId) {
    var _a;
    var $contentElement = this._findContentElement();
    var $tableElement = this.getTableElement();
    if ($tableElement === null || $tableElement === void 0 ? void 0 : $tableElement.length) {
      this.setAria('owns', "".concat(headerTableId !== null && headerTableId !== void 0 ? headerTableId : '', " ").concat((_a = $tableElement.attr('id')) !== null && _a !== void 0 ? _a : '', " ").concat(footerTableId !== null && footerTableId !== void 0 ? footerTableId : '').trim(), $contentElement);
    }
  }
  dispose() {
    super.dispose();
    clearTimeout(this._hideLoadingTimeoutID);
    this._scrollable && this._scrollable.dispose();
  }
  setScrollerSpacing() {}
  _restoreErrorRow() {}
}
export var rowsModule = {
  defaultOptions() {
    return {
      hoverStateEnabled: false,
      scrolling: {
        useNative: 'auto'
      },
      loadPanel: {
        enabled: 'auto',
        text: messageLocalization.format('Loading'),
        width: 200,
        height: 90,
        showIndicator: true,
        indicatorSrc: '',
        showPane: true
      },
      dataRowTemplate: null,
      columnAutoWidth: false,
      noDataText: messageLocalization.format('dxDataGrid-noDataText'),
      wordWrapEnabled: false,
      showColumnLines: true,
      showRowLines: false,
      rowAlternationEnabled: false,
      activeStateEnabled: false,
      twoWayBindingEnabled: true
    };
  },
  views: {
    rowsView: RowsView
  }
};
