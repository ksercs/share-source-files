import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable max-classes-per-file */
import '../../../../ui/button';
import '../../../../ui/drop_down_button';
import $ from '../../../../core/renderer';
import { Deferred, when } from '../../../../core/utils/deferred';
import { extend } from '../../../../core/utils/extend';
import { getDefaultAlignment } from '../../../../core/utils/position';
import { format } from '../../../../core/utils/string';
import { isDefined, isFunction } from '../../../../core/utils/type';
import messageLocalization from '../../../../localization/message';
import List from '../../../../ui/list_light';
import errors from '../../../../ui/widget/ui.errors';
import { prepareItems } from '../../../grids/grid_core/m_export';
import dataGridCore from '../m_core';
var DATAGRID_EXPORT_MENU_CLASS = 'dx-datagrid-export-menu';
var DATAGRID_EXPORT_BUTTON_CLASS = 'dx-datagrid-export-button';
var DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME = 'exportButton';
var DATAGRID_EXPORT_ICON = 'export';
var DATAGRID_EXPORT_EXCEL_ICON = 'xlsxfile';
var DATAGRID_EXPORT_SELECTED_ICON = 'exportselected';
var DATAGRID_PDF_EXPORT_ICON = 'pdffile';
export class DataProvider {
  constructor(exportController, initialColumnWidthsByColumnIndex, selectedRowsOnly) {
    this._exportController = exportController;
    this._initialColumnWidthsByColumnIndex = initialColumnWidthsByColumnIndex;
    this._selectedRowsOnly = selectedRowsOnly;
  }
  _getGroupValue(item) {
    var {
      key,
      data,
      rowType,
      groupIndex,
      summaryCells
    } = item;
    var groupColumn = this._options.groupColumns[groupIndex];
    var value = dataGridCore.getDisplayValue(groupColumn, groupColumn.deserializeValue ? groupColumn.deserializeValue(key[groupIndex]) : key[groupIndex], data, rowType);
    var result = "".concat(groupColumn.caption, ": ").concat(dataGridCore.formatValue(value, groupColumn));
    if (summaryCells && summaryCells[0] && summaryCells[0].length) {
      result += " ".concat(dataGridCore.getGroupRowSummaryText(summaryCells[0], this._options.summaryTexts));
    }
    return result;
  }
  _correctCellIndex(cellIndex) {
    return cellIndex;
  }
  _initOptions() {
    var exportController = this._exportController;
    var groupColumns = exportController._columnsController.getGroupColumns();
    this._options = {
      columns: exportController._getColumns(this._initialColumnWidthsByColumnIndex),
      groupColumns,
      items: this._selectedRowsOnly || exportController._selectionOnly ? exportController._getSelectedItems() : exportController._getAllItems(),
      isHeadersVisible: exportController.option('showColumnHeaders'),
      summaryTexts: exportController.option('summary.texts'),
      rtlEnabled: exportController.option('rtlEnabled')
    };
  }
  getHeaderStyles() {
    return [{
      bold: true,
      alignment: 'center'
    }, {
      bold: true,
      alignment: 'left'
    }, {
      bold: true,
      alignment: 'right'
    }];
  }
  getGroupRowStyle() {
    return {
      bold: true,
      alignment: getDefaultAlignment(this._options.rtlEnabled)
    };
  }
  getColumnStyles() {
    var columnStyles = [];
    this.getColumns().forEach(column => {
      columnStyles.push({
        alignment: column.alignment || 'left',
        format: column.format,
        dataType: column.dataType
      });
    });
    return columnStyles;
  }
  getStyles() {
    return [...this.getHeaderStyles(), ...this.getColumnStyles(), this.getGroupRowStyle()];
  }
  _getTotalCellStyleId(cellIndex) {
    var _a;
    var alignment = ((_a = this.getColumns()[cellIndex]) === null || _a === void 0 ? void 0 : _a.alignment) || 'right';
    return this.getHeaderStyles().map(style => style.alignment).indexOf(alignment);
  }
  getStyleId(rowIndex, cellIndex) {
    if (rowIndex < this.getHeaderRowCount()) {
      return 0;
    }
    if (this.isTotalCell(rowIndex - this.getHeaderRowCount(), cellIndex)) {
      return this._getTotalCellStyleId(cellIndex);
    }
    if (this.isGroupRow(rowIndex - this.getHeaderRowCount())) {
      return this.getHeaderStyles().length + this.getColumns().length;
    }
    return cellIndex + this.getHeaderStyles().length;
  }
  getColumns(getColumnsByAllRows) {
    var {
      columns
    } = this._options;
    return getColumnsByAllRows ? columns : columns[columns.length - 1];
  }
  getColumnsWidths() {
    var columns = this.getColumns();
    return isDefined(columns) ? columns.map(c => c.width) : undefined;
  }
  getRowsCount() {
    return this._options.items.length + this.getHeaderRowCount();
  }
  getHeaderRowCount() {
    if (this.isHeadersVisible()) {
      return this._options.columns.length - 1;
    }
    return 0;
  }
  isGroupRow(rowIndex) {
    return rowIndex < this._options.items.length && this._options.items[rowIndex].rowType === 'group';
  }
  getGroupLevel(rowIndex) {
    var item = this._options.items[rowIndex - this.getHeaderRowCount()];
    var groupIndex = item && item.groupIndex;
    if (item && item.rowType === 'totalFooter') {
      return 0;
    }
    return isDefined(groupIndex) ? groupIndex : this._options.groupColumns.length;
  }
  getCellType(rowIndex, cellIndex) {
    var columns = this.getColumns();
    if (rowIndex < this.getHeaderRowCount()) {
      return 'string';
    }
    rowIndex -= this.getHeaderRowCount();
    if (cellIndex < columns.length) {
      var item = this._options.items.length && this._options.items[rowIndex];
      var column = columns[cellIndex];
      if (item && item.rowType === 'data') {
        if (isFinite(item.values[this._correctCellIndex(cellIndex)]) && !isDefined(column.customizeText)) {
          return isDefined(column.lookup) ? column.lookup.dataType : column.dataType;
        }
      }
      return 'string';
    }
  }
  ready() {
    var that = this;
    that._initOptions();
    var options = that._options;
    return when(options.items).done(items => {
      options.items = items;
    }).fail(() => {
      options.items = [];
    });
  }
  _convertFromGridGroupSummaryItems(gridGroupSummaryItems) {
    if (isDefined(gridGroupSummaryItems) && gridGroupSummaryItems.length > 0) {
      return gridGroupSummaryItems.map(item => ({
        value: item.value,
        name: item.name
      }));
    }
  }
  getCellData(rowIndex, cellIndex, isExcelJS) {
    var value;
    var column;
    var result = {
      cellSourceData: {},
      value
    };
    var columns = this.getColumns();
    var correctedCellIndex = this._correctCellIndex(cellIndex);
    if (rowIndex < this.getHeaderRowCount()) {
      var columnsRow = this.getColumns(true)[rowIndex];
      column = columnsRow[cellIndex];
      result.cellSourceData.rowType = 'header';
      result.cellSourceData.column = column && column.gridColumn;
      result.value = column && column.caption;
    } else {
      rowIndex -= this.getHeaderRowCount();
      var item = this._options.items.length && this._options.items[rowIndex];
      if (item) {
        var itemValues = item.values;
        result.cellSourceData.rowType = item.rowType;
        result.cellSourceData.column = columns[cellIndex] && columns[cellIndex].gridColumn;
        switch (item.rowType) {
          case 'groupFooter':
          case 'totalFooter':
            if (correctedCellIndex < itemValues.length) {
              value = itemValues[correctedCellIndex];
              if (isDefined(value)) {
                result.cellSourceData.value = value.value;
                result.cellSourceData.totalSummaryItemName = value.name;
                result.value = dataGridCore.getSummaryText(value, this._options.summaryTexts);
              } else {
                result.cellSourceData.value = undefined;
              }
            }
            break;
          case 'group':
            result.cellSourceData.groupIndex = item.groupIndex;
            if (cellIndex < 1) {
              result.cellSourceData.column = this._options.groupColumns[item.groupIndex];
              result.cellSourceData.value = item.key[item.groupIndex];
              result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(item.summaryCells[0]);
              result.value = this._getGroupValue(item);
            } else {
              var summaryItems = item.values[correctedCellIndex];
              if (Array.isArray(summaryItems)) {
                result.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(summaryItems);
                value = '';
                for (var i = 0; i < summaryItems.length; i++) {
                  value += (i > 0 ? isExcelJS ? '\n' : ' \n ' : '') + dataGridCore.getSummaryText(summaryItems[i], this._options.summaryTexts);
                }
                result.value = value;
              } else {
                result.cellSourceData.value = undefined;
              }
            }
            break;
          default:
            column = columns[cellIndex];
            if (column) {
              var _value = itemValues[correctedCellIndex];
              var displayValue = dataGridCore.getDisplayValue(column, _value, item.data, item.rowType); // from 'ui.grid_core.rows.js: _getCellOptions'
              if (!isFinite(displayValue) || isDefined(column.customizeText)) {
                // similar to 'ui.grid_core.rows.js: _getCellOptions'
                if (isExcelJS && isDefined(column.customizeText) && column.customizeText === this._exportController._columnsController.getCustomizeTextByDataType('boolean')) {
                  result.value = displayValue;
                } else {
                  result.value = dataGridCore.formatValue(displayValue, column);
                }
              } else {
                result.value = displayValue;
              }
              result.cellSourceData.value = _value;
            }
            result.cellSourceData.data = item.data;
        }
      }
    }
    return result;
  }
  isHeadersVisible() {
    return this._options.isHeadersVisible;
  }
  isTotalCell(rowIndex, cellIndex) {
    var {
      items
    } = this._options;
    var item = items[rowIndex];
    var correctCellIndex = this._correctCellIndex(cellIndex);
    var isSummaryAlignByColumn = item.summaryCells && item.summaryCells[correctCellIndex] && item.summaryCells[correctCellIndex].length > 0 && item.summaryCells[correctCellIndex][0].alignByColumn;
    return item && item.rowType === 'groupFooter' || item.rowType === 'totalFooter' || isSummaryAlignByColumn;
  }
  getCellMerging(rowIndex, cellIndex) {
    var {
      columns
    } = this._options;
    var column = columns[rowIndex] && columns[rowIndex][cellIndex];
    return column ? {
      colspan: (column.exportColspan || 1) - 1,
      rowspan: (column.rowspan || 1) - 1
    } : {
      colspan: 0,
      rowspan: 0
    };
  }
  getFrozenArea() {
    var that = this;
    return {
      x: 0,
      y: that.getHeaderRowCount()
    };
  }
}
export class ExportController extends dataGridCore.ViewController {
  _getEmptyCell() {
    return {
      caption: '',
      colspan: 1,
      rowspan: 1
    };
  }
  _updateColumnWidth(column, width) {
    column.width = width;
  }
  _getColumns(initialColumnWidthsByColumnIndex) {
    var result = [];
    var i;
    var columns;
    var columnsController = this._columnsController;
    var rowCount = columnsController.getRowCount();
    for (i = 0; i <= rowCount; i++) {
      var currentHeaderRow = [];
      columns = columnsController.getVisibleColumns(i, true);
      var columnWidthsByColumnIndex = void 0;
      if (i === rowCount) {
        if (this._updateLockCount) {
          columnWidthsByColumnIndex = initialColumnWidthsByColumnIndex;
        } else {
          var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
          if (columnWidths && columnWidths.length) {
            columnWidthsByColumnIndex = {};
            for (var _i = 0; _i < columns.length; _i++) {
              columnWidthsByColumnIndex[columns[_i].index] = columnWidths[_i];
            }
          }
        }
      }
      for (var j = 0; j < columns.length; j++) {
        var column = extend({}, columns[j], {
          dataType: columns[j].dataType === 'datetime' ? 'date' : columns[j].dataType,
          gridColumn: columns[j]
        });
        if (this._needColumnExporting(column)) {
          var currentColspan = this._calculateExportColspan(column);
          if (isDefined(currentColspan)) {
            column.exportColspan = currentColspan;
          }
          if (columnWidthsByColumnIndex) {
            this._updateColumnWidth(column, columnWidthsByColumnIndex[column.index]);
          }
          currentHeaderRow.push(column);
        }
      }
      result.push(currentHeaderRow);
    }
    columns = result[rowCount];
    result = prepareItems(result.slice(0, -1), this._getEmptyCell());
    result.push(columns);
    return result;
  }
  _calculateExportColspan(column) {
    if (!column.isBand) {
      return;
    }
    var childColumns = this._columnsController.getChildrenByBandColumn(column.index, true);
    if (!isDefined(childColumns)) {
      return;
    }
    return childColumns.reduce((result, childColumn) => {
      if (this._needColumnExporting(childColumn)) {
        return result + (this._calculateExportColspan(childColumn) || 1);
      }
      return result;
    }, 0);
  }
  _needColumnExporting(column) {
    return !column.command && (column.allowExporting || column.allowExporting === undefined);
  }
  _getFooterSummaryItems(summaryCells, isTotal) {
    var result = [];
    var estimatedItemsCount = 1;
    var i = 0;
    do {
      var values = [];
      for (var j = 0; j < summaryCells.length; j++) {
        var summaryCell = summaryCells[j];
        var itemsLength = summaryCell.length;
        if (estimatedItemsCount < itemsLength) {
          estimatedItemsCount = itemsLength;
        }
        values.push(summaryCell[i]);
      }
      result.push({
        values,
        rowType: isTotal ? 'totalFooter' : 'groupFooter'
      });
    } while (i++ < estimatedItemsCount - 1);
    return result;
  }
  _hasSummaryGroupFooters() {
    var groupItems = this.option('summary.groupItems');
    if (isDefined(groupItems)) {
      for (var i = 0; i < groupItems.length; i++) {
        if (groupItems[i].showInGroupFooter) {
          return true;
        }
      }
    }
    return false;
  }
  _getItemsWithSummaryGroupFooters(sourceItems) {
    var result = [];
    var beforeGroupFooterItems = [];
    var groupFooterItems = [];
    for (var i = 0; i < sourceItems.length; i++) {
      var item = sourceItems[i];
      if (item.rowType === 'groupFooter') {
        groupFooterItems = this._getFooterSummaryItems(item.summaryCells);
        result = result.concat(beforeGroupFooterItems, groupFooterItems);
        beforeGroupFooterItems = [];
      } else {
        beforeGroupFooterItems.push(item);
      }
    }
    return result.length ? result : beforeGroupFooterItems;
  }
  _updateGroupValuesWithSummaryByColumn(sourceItems) {
    var summaryValues = [];
    for (var i = 0; i < sourceItems.length; i++) {
      var item = sourceItems[i];
      var {
        summaryCells
      } = item;
      if (item.rowType === 'group' && summaryCells && summaryCells.length > 1) {
        var groupColumnCount = item.values.length;
        for (var j = 1; j < summaryCells.length; j++) {
          for (var k = 0; k < summaryCells[j].length; k++) {
            var summaryItem = summaryCells[j][k];
            if (summaryItem && summaryItem.alignByColumn) {
              if (!Array.isArray(summaryValues[j - groupColumnCount])) {
                summaryValues[j - groupColumnCount] = [];
              }
              summaryValues[j - groupColumnCount].push(summaryItem);
            }
          }
        }
        if (summaryValues.length > 0) {
          item.values.push(...summaryValues);
          summaryValues = [];
        }
      }
    }
  }
  _processUnExportedItems(items) {
    var columns = this._columnsController.getVisibleColumns(null, true);
    var groupColumns = this._columnsController.getGroupColumns();
    var values;
    var summaryCells;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var isCommand = false;
      values = [];
      summaryCells = [];
      for (var j = 0; j < columns.length; j++) {
        var column = columns[j];
        isCommand || (isCommand = ['detailExpand', 'buttons'].includes(column.type));
        if (this._needColumnExporting(column)) {
          if (item.values) {
            if (item.rowType === 'group' && !values.length) {
              values.push(item.key[item.groupIndex]);
            } else {
              values.push(item.values[j]);
            }
          }
          if (item.summaryCells) {
            if (item.rowType === 'group' && !summaryCells.length) {
              var index = j - groupColumns.length + item.groupIndex;
              summaryCells.push(item.summaryCells[isCommand ? index : index + 1]);
            } else {
              summaryCells.push(item.summaryCells[j]);
            }
          }
        }
      }
      if (values.length) {
        item.values = values;
      }
      if (summaryCells.length) {
        item.summaryCells = summaryCells;
      }
    }
  }
  _getAllItems(data) {
    var skipFilter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var that = this;
    // @ts-expect-error
    var d = new Deferred();
    var dataController = this.getController('data');
    var footerItems = dataController.footerItems();
    var totalItem = footerItems.length && footerItems[0];
    var summaryTotalItems = that.option('summary.totalItems');
    var summaryCells;
    when(data).done(data => {
      dataController.loadAll(data, skipFilter).done((sourceItems, totalAggregates) => {
        that._updateGroupValuesWithSummaryByColumn(sourceItems);
        if (that._hasSummaryGroupFooters()) {
          sourceItems = that._getItemsWithSummaryGroupFooters(sourceItems);
        }
        summaryCells = totalItem && totalItem.summaryCells;
        if (isDefined(totalAggregates) && summaryTotalItems) {
          summaryCells = that._getSummaryCells(summaryTotalItems, totalAggregates);
        }
        var summaryItems = totalItem && that._getFooterSummaryItems(summaryCells, true);
        if (summaryItems) {
          sourceItems = sourceItems.concat(summaryItems);
        }
        that._processUnExportedItems(sourceItems);
        d.resolve(sourceItems);
      }).fail(d.reject);
    }).fail(d.reject);
    return d;
  }
  _getSummaryCells(summaryTotalItems, totalAggregates) {
    var dataController = this.getController('data');
    var columnsController = dataController._columnsController;
    return dataController._calculateSummaryCells(summaryTotalItems, totalAggregates, columnsController.getVisibleColumns(null, true), (summaryItem, column) => dataController._isDataColumn(column) ? column.index : -1);
  }
  _getSelectedItems() {
    var selectionController = this.getController('selection');
    if (this.needLoadItemsOnExportingSelectedItems()) {
      return this._getAllItems(selectionController.loadSelectedItemsWithFilter(), true);
    }
    return this._getAllItems(selectionController.getSelectedRowsData());
  }
  _getColumnWidths(headersView, rowsView) {
    return headersView && headersView.isVisible() ? headersView.getColumnWidths() : rowsView.getColumnWidths();
  }
  init() {
    if (this.option('export.enabled') && !isDefined(this.option('onExporting'))) {
      errors.log('W1024');
    }
    this._columnsController = this.getController('columns');
    this._rowsView = this.getView('rowsView');
    this._headersView = this.getView('columnHeadersView');
    this.createAction('onExporting', {
      excludeValidators: ['disabled', 'readOnly']
    });
  }
  callbackNames() {
    return ['selectionOnlyChanged'];
  }
  getDataProvider(selectedRowsOnly) {
    var columnWidths = this._getColumnWidths(this._headersView, this._rowsView);
    var initialColumnWidthsByColumnIndex;
    if (columnWidths && columnWidths.length) {
      initialColumnWidthsByColumnIndex = {};
      var columnsLastRowVisibleColumns = this._columnsController.getVisibleColumns(this._columnsController.getRowCount(), true);
      for (var i = 0; i < columnsLastRowVisibleColumns.length; i++) {
        initialColumnWidthsByColumnIndex[columnsLastRowVisibleColumns[i].index] = columnWidths[i];
      }
    }
    return new DataProvider(this, initialColumnWidthsByColumnIndex, selectedRowsOnly);
  }
  exportTo(selectedRowsOnly, format) {
    this._selectionOnly = selectedRowsOnly;
    var onExporting = this.getAction('onExporting');
    var eventArgs = {
      rtlEnabled: this.option('rtlEnabled'),
      selectedRowsOnly: !!selectedRowsOnly,
      format,
      fileName: 'DataGrid',
      cancel: false
    };
    isFunction(onExporting) && onExporting(eventArgs);
  }
  publicMethods() {
    return ['getDataProvider'];
  }
  selectionOnly(value) {
    if (isDefined(value)) {
      this._isSelectedRows = value;
      this.selectionOnlyChanged.fire();
    } else {
      return this._isSelectedRows;
    }
  }
  needLoadItemsOnExportingSelectedItems() {
    var _a;
    return (_a = this.option('loadItemsOnExportingSelectedItems')) !== null && _a !== void 0 ? _a : this.getController('data')._dataSource.remoteOperations().filtering;
  }
}
dataGridCore.registerModule('export', {
  defaultOptions() {
    return {
      export: {
        enabled: false,
        fileName: 'DataGrid',
        formats: ['xlsx'],
        allowExportSelectedData: false,
        texts: {
          exportTo: messageLocalization.format('dxDataGrid-exportTo'),
          exportAll: messageLocalization.format('dxDataGrid-exportAll'),
          exportSelectedRows: messageLocalization.format('dxDataGrid-exportSelectedRows')
        }
      }
    };
  },
  controllers: {
    export: ExportController
  },
  extenders: {
    controllers: {
      editing: {
        callbackNames() {
          var callbackList = this.callBase();
          return isDefined(callbackList) ? callbackList.push('editingButtonsUpdated') : ['editingButtonsUpdated'];
        },
        _updateEditButtons() {
          this.callBase();
          this.editingButtonsUpdated.fire();
        }
      }
    },
    views: {
      headerPanel: {
        _getToolbarItems() {
          var items = this.callBase();
          var exportButton = this._getExportToolbarButton();
          if (exportButton) {
            items.push(exportButton);
            this._correctItemsPosition(items);
          }
          return items;
        },
        _getExportToolbarButton() {
          var items = this._getExportToolbarItems();
          if (items.length === 0) {
            return null;
          }
          var disabled = this._needDisableExportButton();
          var toolbarButtonOptions = {
            name: DATAGRID_EXPORT_TOOLBAR_BUTTON_NAME,
            location: 'after',
            locateInMenu: 'auto',
            sortIndex: 30,
            options: {
              items
            },
            disabled
          };
          if (items.length === 1) {
            var widgetOptions = _extends(_extends({}, items[0]), {
              hint: items[0].text,
              elementAttr: {
                class: DATAGRID_EXPORT_BUTTON_CLASS
              }
            });
            toolbarButtonOptions.widget = 'dxButton';
            toolbarButtonOptions.showText = 'inMenu';
            toolbarButtonOptions.options = widgetOptions;
          } else {
            var _widgetOptions = {
              icon: DATAGRID_EXPORT_ICON,
              displayExpr: 'text',
              items,
              hint: this.option('export.texts.exportTo'),
              elementAttr: {
                class: DATAGRID_EXPORT_BUTTON_CLASS
              },
              dropDownOptions: {
                width: 'auto',
                _wrapperClassExternal: DATAGRID_EXPORT_MENU_CLASS
              }
            };
            toolbarButtonOptions.options = _widgetOptions;
            toolbarButtonOptions.widget = 'dxDropDownButton';
            toolbarButtonOptions.menuItemTemplate = (_data, _index, container) => {
              this._createComponent($(container), List, {
                items
              });
            };
          }
          return toolbarButtonOptions;
        },
        _getExportToolbarItems() {
          var _a;
          var exportOptions = this.option('export');
          var texts = this.option('export.texts');
          var formats = (_a = this.option('export.formats')) !== null && _a !== void 0 ? _a : [];
          if (!exportOptions.enabled) {
            return [];
          }
          var items = [];
          formats.forEach(formatType => {
            var formatName = formatType.toUpperCase();
            var exportAllIcon = DATAGRID_EXPORT_ICON;
            var exportSelectedIcon = DATAGRID_EXPORT_SELECTED_ICON;
            if (formatType === 'xlsx') {
              formatName = 'Excel';
              exportAllIcon = DATAGRID_EXPORT_EXCEL_ICON;
            }
            if (formatType === 'pdf') {
              exportAllIcon = DATAGRID_PDF_EXPORT_ICON;
            }
            items.push({
              text: format(texts.exportAll, formatName),
              icon: exportAllIcon,
              onClick: () => {
                this._exportController.exportTo(false, formatType);
              }
            });
            if (exportOptions.allowExportSelectedData) {
              items.push({
                text: format(texts.exportSelectedRows, formatName),
                icon: exportSelectedIcon,
                onClick: () => {
                  this._exportController.exportTo(true, formatType);
                }
              });
            }
          });
          return items;
        },
        _correctItemsPosition(items) {
          items.sort((itemA, itemB) => itemA.sortIndex - itemB.sortIndex);
        },
        _isExportButtonVisible() {
          return this.option('export.enabled');
        },
        optionChanged(args) {
          this.callBase(args);
          if (args.name === 'export') {
            args.handled = true;
            this._invalidate();
            if (args.fullName === 'export.enabled') {
              if (args.value && !isDefined(this.option('onExporting'))) {
                errors.log('W1024');
              }
            }
          }
        },
        _needDisableExportButton() {
          var isDataColumnsInvisible = !this._columnsController.hasVisibleDataColumns();
          var hasUnsavedChanges = this._editingController.hasChanges();
          return isDataColumnsInvisible || hasUnsavedChanges;
        },
        _columnOptionChanged(e) {
          this.callBase(e);
          var isColumnLocationChanged = dataGridCore.checkChanges(e.optionNames, ['groupIndex', 'visible', 'all']);
          if (isColumnLocationChanged) {
            var disabled = this._needDisableExportButton();
            this.setToolbarItemDisabled('exportButton', disabled);
          }
        },
        init() {
          this.callBase();
          this._exportController = this.getController('export');
          this._editingController = this.getController('editing');
          this._editingController.editingButtonsUpdated.add(() => {
            var disabled = this._needDisableExportButton();
            this.setToolbarItemDisabled('exportButton', disabled);
          });
        },
        isVisible() {
          return this.callBase() || this._isExportButtonVisible();
        }
      }
    }
  }
});