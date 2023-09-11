"use strict";

exports.exportDataGrid = exportDataGrid;
var _type = require("../../core/utils/type");
var _export = require("./export");
var _export_merged_ranges_manager = require("./export_merged_ranges_manager");
var DataGridHelpers = /*#__PURE__*/function () {
  function DataGridHelpers(component, dataProvider, worksheet, options) {
    this.component = component;
    this.dataProvider = dataProvider;
    this.worksheet = worksheet;
    this.mergedRangesManager = new _export_merged_ranges_manager.MergedRangesManager(dataProvider, worksheet);
    this.topLeftCell = options.topLeftCell;
    this.customizeCell = options.customizeCell;
    this.autoFilterEnabled = options.autoFilterEnabled;
  }
  var _proto = DataGridHelpers.prototype;
  _proto._getFirstColumnIndex = function _getFirstColumnIndex() {
    return this.topLeftCell.column;
  };
  _proto._getFieldHeaderRowsCount = function _getFieldHeaderRowsCount() {
    return 0;
  };
  _proto._trySetAutoFilter = function _trySetAutoFilter(cellRange) {
    if (this.autoFilterEnabled) {
      if (!(0, _type.isDefined)(this.worksheet.autoFilter) && this.dataProvider.getRowsCount() > 0) {
        var dataRange = {
          from: {
            row: cellRange.from.row + this.dataProvider.getHeaderRowCount() - 1,
            column: cellRange.from.column
          },
          to: cellRange.to
        };
        this.worksheet.autoFilter = dataRange;
      }
    }
  };
  _proto._trySetFont = function _trySetFont(excelCell, bold) {
    if ((0, _type.isDefined)(bold)) {
      excelCell.font = excelCell.font || {};
      excelCell.font.bold = bold;
    }
  };
  _proto._getWorksheetFrozenState = function _getWorksheetFrozenState(cellRange) {
    return {
      state: 'frozen',
      ySplit: cellRange.from.row + this.dataProvider.getFrozenArea().y - 1
    };
  };
  _proto._trySetOutlineLevel = function _trySetOutlineLevel(row, rowIndex) {
    if (rowIndex >= this.dataProvider.getHeaderRowCount()) {
      row.outlineLevel = this.dataProvider.getGroupLevel(rowIndex);
    }
  };
  _proto._isFrozenZone = function _isFrozenZone(dataProvider) {
    return dataProvider.getHeaderRowCount() > 0;
  };
  _proto._isHeaderCell = function _isHeaderCell(rowIndex) {
    return rowIndex < this.dataProvider.getHeaderRowCount();
  };
  _proto._isInfoCell = function _isInfoCell() {
    return false;
  };
  _proto._allowToMergeRange = function _allowToMergeRange() {
    return true;
  };
  _proto._getAllFieldHeaders = function _getAllFieldHeaders() {
    return [];
  };
  _proto._customizeCell = function _customizeCell(excelCell, gridCell) {
    if ((0, _type.isFunction)(this.customizeCell)) {
      this.customizeCell({
        excelCell,
        gridCell
      });
    }
  };
  _proto._exportFieldHeaders = function _exportFieldHeaders() {};
  _proto._exportAllFieldHeaders = function _exportAllFieldHeaders() {};
  _proto._isRowFieldHeadersRow = function _isRowFieldHeadersRow() {};
  return DataGridHelpers;
}();
function exportDataGrid(options) {
  return _export.Export.export(_getFullOptions(options), DataGridHelpers, _getLoadPanelTargetElement, _getLoadPanelContainer);
}
function _getFullOptions(options) {
  if (!((0, _type.isDefined)(options) && (0, _type.isObject)(options))) {
    throw Error('The "exportDataGrid" method requires a configuration object.');
  }
  if (!((0, _type.isDefined)(options.component) && (0, _type.isObject)(options.component) && options.component.NAME === 'dxDataGrid')) {
    throw Error('The "component" field must contain a DataGrid instance.');
  }
  if (!(0, _type.isDefined)(options.selectedRowsOnly)) {
    options.selectedRowsOnly = false;
  }
  if (!(0, _type.isDefined)(options.autoFilterEnabled)) {
    options.autoFilterEnabled = false;
  }
  return _export.Export.getFullOptions(options);
}
function _getLoadPanelTargetElement(component) {
  return component.getView('rowsView').element();
}
function _getLoadPanelContainer(component) {
  return component.getView('rowsView').element().parent();
}