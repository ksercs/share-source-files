"use strict";

exports.Export = void 0;
var _type = require("../../core/utils/type");
var _export_format = require("./export_format");
var _extend = require("../../core/utils/extend");
var _export_load_panel = require("../common/export_load_panel");
var _window = require("../../core/utils/window");
// docs.microsoft.com/en-us/office/troubleshoot/excel/determine-column-widths - "Description of how column widths are determined in Excel"
var MAX_DIGIT_WIDTH_IN_PIXELS = 7; // Calibri font with 11pt size

// support.office.com/en-us/article/change-the-column-width-and-row-height-72f5e3cc-994d-43e8-ae58-9774a0905f46 - "Column.Max - 255"
// support.office.com/en-us/article/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3 - "Column width limit - 255 characters"
var MAX_EXCEL_COLUMN_WIDTH = 255;
var Export = {
  getFullOptions(options) {
    var fullOptions = (0, _extend.extend)({}, options);
    if (!((0, _type.isDefined)(fullOptions.worksheet) && (0, _type.isObject)(fullOptions.worksheet))) {
      throw Error('The "worksheet" field must contain an object.');
    }
    if (!(0, _type.isDefined)(fullOptions.topLeftCell)) {
      fullOptions.topLeftCell = {
        row: 1,
        column: 1
      };
    } else if ((0, _type.isString)(fullOptions.topLeftCell)) {
      var _fullOptions$workshee = fullOptions.worksheet.getCell(fullOptions.topLeftCell),
        row = _fullOptions$workshee.row,
        col = _fullOptions$workshee.col;
      fullOptions.topLeftCell = {
        row,
        column: col
      };
    }
    if (!(0, _type.isDefined)(fullOptions.keepColumnWidths)) {
      fullOptions.keepColumnWidths = true;
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel)) {
      fullOptions.loadPanel = {};
    }
    if (!(0, _type.isDefined)(fullOptions.loadPanel.enabled)) {
      fullOptions.loadPanel.enabled = true;
    }
    if (!(0, _type.isDefined)(fullOptions.encodeExecutableContent)) {
      fullOptions.encodeExecutableContent = false;
    }
    return fullOptions;
  },
  convertDateForExcelJS(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  },
  setNumberFormat(excelCell, numberFormat) {
    excelCell.numFmt = numberFormat;
  },
  getCellStyles(dataProvider) {
    var _this = this;
    var styles = dataProvider.getStyles();
    styles.forEach(function (style) {
      var numberFormat = _this.tryConvertToExcelNumberFormat(style.format, style.dataType);
      if ((0, _type.isDefined)(numberFormat)) {
        numberFormat = numberFormat.replace(/&quot;/g, '"');
      }
      style.numberFormat = numberFormat;
    });
    return styles;
  },
  tryConvertToExcelNumberFormat(format, dataType) {
    var newFormat = _export_format.ExportFormat.formatObjectConverter(format, dataType);
    var currency = newFormat.currency;
    format = newFormat.format;
    dataType = newFormat.dataType;
    return _export_format.ExportFormat.convertFormat(format, newFormat.precision, dataType, currency);
  },
  setAlignment(excelCell, wrapText, horizontalAlignment) {
    var _excelCell$alignment;
    excelCell.alignment = (_excelCell$alignment = excelCell.alignment) !== null && _excelCell$alignment !== void 0 ? _excelCell$alignment : {};
    if ((0, _type.isDefined)(wrapText)) {
      excelCell.alignment.wrapText = wrapText;
    }
    if ((0, _type.isDefined)(horizontalAlignment)) {
      excelCell.alignment.horizontal = horizontalAlignment;
    }
    excelCell.alignment.vertical = 'top';
  },
  setColumnsWidth(worksheet, widths, startColumnIndex) {
    if (!(0, _type.isDefined)(widths)) {
      return;
    }
    for (var i = 0; i < widths.length; i++) {
      var columnWidth = widths[i];
      if (typeof columnWidth === 'number' && isFinite(columnWidth)) {
        worksheet.getColumn(startColumnIndex + i).width = Math.min(MAX_EXCEL_COLUMN_WIDTH, Math.floor(columnWidth / MAX_DIGIT_WIDTH_IN_PIXELS * 100) / 100);
      }
    }
  },
  export(options, Helpers, getLoadPanelTargetElement, getLoadPanelContainer) {
    var _component$_getIntern,
      _this2 = this;
    var component = options.component,
      worksheet = options.worksheet,
      topLeftCell = options.topLeftCell,
      keepColumnWidths = options.keepColumnWidths,
      selectedRowsOnly = options.selectedRowsOnly,
      loadPanel = options.loadPanel,
      encodeExecutableContent = options.encodeExecutableContent;
    var dataProvider = component.getDataProvider(selectedRowsOnly);
    var internalComponent = ((_component$_getIntern = component._getInternalInstance) === null || _component$_getIntern === void 0 ? void 0 : _component$_getIntern.call(component)) || component;
    var initialLoadPanelEnabledOption = internalComponent.option('loadPanel') && internalComponent.option('loadPanel').enabled;
    if (initialLoadPanelEnabledOption) {
      component.option('loadPanel.enabled', false);
    }
    var exportLoadPanel;
    if (loadPanel.enabled && (0, _window.hasWindow)()) {
      var $targetElement = getLoadPanelTargetElement(component);
      var $container = getLoadPanelContainer(component);
      exportLoadPanel = new _export_load_panel.ExportLoadPanel(component, $targetElement, $container, loadPanel);
      exportLoadPanel.show();
    }
    var wrapText = !!component.option('wordWrapEnabled');
    worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false
    };
    var cellRange = {
      from: {
        row: topLeftCell.row,
        column: topLeftCell.column
      },
      to: {
        row: topLeftCell.row,
        column: topLeftCell.column
      }
    };
    return new Promise(function (resolve) {
      dataProvider.ready().done(function () {
        var columns = dataProvider.getColumns();
        var dataRowsCount = dataProvider.getRowsCount();
        var helpers = new Helpers(component, dataProvider, worksheet, options);
        if (keepColumnWidths) {
          _this2.setColumnsWidth(worksheet, dataProvider.getColumnsWidths(), cellRange.from.column);
        }
        helpers._exportAllFieldHeaders(columns, _this2.setAlignment);
        var fieldHeaderRowsCount = helpers._getFieldHeaderRowsCount();
        cellRange.to.row = cellRange.from.row + fieldHeaderRowsCount;
        var styles = _this2.getCellStyles(dataProvider);
        for (var rowIndex = 0; rowIndex < dataRowsCount; rowIndex++) {
          var currentRowIndex = cellRange.from.row + fieldHeaderRowsCount + rowIndex;
          var row = worksheet.getRow(currentRowIndex);
          var startColumnIndex = 0;
          if (helpers._isRowFieldHeadersRow(rowIndex)) {
            startColumnIndex = dataProvider.getRowAreaColCount();
            helpers._exportFieldHeaders('row', currentRowIndex, 0, startColumnIndex, _this2.setAlignment);
          }
          helpers._trySetOutlineLevel(row, rowIndex);
          _this2.exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columns.length, wrapText, styles, encodeExecutableContent);
          cellRange.to.row = currentRowIndex;
        }
        helpers.mergedRangesManager.applyMergedRages();
        cellRange.to.column += columns.length > 0 ? columns.length - 1 : 0;
        var worksheetViewSettings = worksheet.views[0] || {};
        if (component.option('rtlEnabled')) {
          worksheetViewSettings.rightToLeft = true;
        }
        if (helpers._isFrozenZone(dataProvider)) {
          if (Object.keys(worksheetViewSettings).indexOf('state') === -1) {
            (0, _extend.extend)(worksheetViewSettings, helpers._getWorksheetFrozenState(cellRange));
          }
          helpers._trySetAutoFilter(cellRange);
        }
        if (Object.keys(worksheetViewSettings).length > 0) {
          worksheet.views = [worksheetViewSettings];
        }
        resolve(cellRange);
      }).always(function () {
        if (initialLoadPanelEnabledOption) {
          component.option('loadPanel.enabled', initialLoadPanelEnabledOption);
        }
        if (loadPanel.enabled && (0, _window.hasWindow)()) {
          exportLoadPanel.dispose();
        }
      });
    });
  },
  exportRow(dataProvider, helpers, row, rowIndex, startColumnIndex, columnsCount, wrapText, styles, encodeExecutableContent) {
    for (var cellIndex = startColumnIndex; cellIndex < columnsCount; cellIndex++) {
      var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
      var excelCell = row.getCell(helpers._getFirstColumnIndex() + cellIndex);
      helpers.mergedRangesManager.updateMergedRanges(excelCell, rowIndex, cellIndex, helpers);
      var cellInfo = helpers.mergedRangesManager.findMergedCellInfo(rowIndex, cellIndex, helpers._isHeaderCell(rowIndex, cellIndex));
      if ((0, _type.isDefined)(cellInfo) && excelCell !== cellInfo.masterCell) {
        excelCell.style = cellInfo.masterCell.style;
        excelCell.value = cellInfo.masterCell.value;
      } else {
        if ((0, _type.isDate)(cellData.value)) {
          excelCell.value = this.convertDateForExcelJS(cellData.value);
        } else {
          excelCell.value = cellData.value;
        }
        if ((0, _type.isDefined)(excelCell.value)) {
          var _styles$dataProvider$ = styles[dataProvider.getStyleId(rowIndex, cellIndex)],
            bold = _styles$dataProvider$.bold,
            horizontalAlignment = _styles$dataProvider$.alignment,
            numberFormat = _styles$dataProvider$.numberFormat;
          if ((0, _type.isDefined)(numberFormat)) {
            this.setNumberFormat(excelCell, numberFormat);
          } else if ((0, _type.isString)(excelCell.value) && /^[@=+-]/.test(excelCell.value)) {
            this.setNumberFormat(excelCell, '@');
          }
          helpers._trySetFont(excelCell, bold);
          this.setAlignment(excelCell, wrapText, horizontalAlignment);
        }
      }
      helpers._customizeCell(excelCell, cellData.cellSourceData);
      if (encodeExecutableContent) {
        excelCell.value = _export_format.ExportFormat.encode(excelCell.value);
      }
    }
  }
};
exports.Export = Export;