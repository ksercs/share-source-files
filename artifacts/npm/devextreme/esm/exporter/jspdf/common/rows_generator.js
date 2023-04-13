/**
* DevExtreme (esm/exporter/jspdf/common/rows_generator.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDate, isDefined, isNumeric } from '../../../core/utils/type';
import dateLocalization from '../../../localization/date';
import numberLocalization from '../../../localization/number';
import { toPdfUnit } from './pdf_utils';
var defaultStyles = {
  base: {
    font: {
      size: 10
    },
    borderWidth: 0.5,
    borderColor: '#979797'
  },
  header: {
    textColor: '#979797'
  },
  group: {},
  data: {},
  groupFooter: {},
  totalFooter: {}
};
function generateRowsInfo(doc, dataProvider, dataGrid, headerBackgroundColor) {
  var result = [];
  var rowsCount = dataProvider.getRowsCount();
  var wordWrapEnabled = !!dataGrid.option('wordWrapEnabled');
  var rtlEnabled = !!dataGrid.option('rtlEnabled');
  var columns = dataProvider.getColumns();
  var styles = dataProvider.getStyles();
  for (var rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    var rowType = dataProvider.getCellData(rowIndex, 0, true).cellSourceData.rowType;
    var indentLevel = rowType !== 'header' ? dataProvider.getGroupLevel(rowIndex) : 0;
    var previousRow = result[rowIndex - 1];
    if (rowType === 'groupFooter' && (previousRow === null || previousRow === void 0 ? void 0 : previousRow.rowType) === 'groupFooter') {
      indentLevel = previousRow.indentLevel - 1;
    }
    result.push({
      rowType: rowType,
      indentLevel,
      cells: generateRowCells({
        doc,
        dataProvider,
        rowIndex,
        wordWrapEnabled,
        columns,
        styles,
        rowType,
        backgroundColor: rowType === 'header' ? headerBackgroundColor : undefined,
        rtlEnabled
      }),
      rowIndex
    });
  }
  return result;
}
function generateRowCells(_ref) {
  var {
    doc,
    dataProvider,
    rowIndex,
    wordWrapEnabled,
    columns,
    styles,
    rowType,
    backgroundColor,
    rtlEnabled
  } = _ref;
  var result = [];
  for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
    var _style$alignment;
    var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
    var cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
    var style = getPdfCellStyle(columns[cellIndex], rowType, cellStyle);
    var defaultAlignment = rtlEnabled ? 'right' : 'left';
    var paddingValue = toPdfUnit(doc, 5);
    var pdfCell = {
      text: getFormattedValue(cellData.value, cellStyle.format),
      verticalAlign: 'middle',
      horizontalAlign: (_style$alignment = style.alignment) !== null && _style$alignment !== void 0 ? _style$alignment : defaultAlignment,
      wordWrapEnabled,
      backgroundColor,
      padding: {
        top: paddingValue,
        right: paddingValue,
        bottom: paddingValue,
        left: paddingValue
      },
      _rect: {},
      _internalTextOptions: {}
    };
    if (rtlEnabled) {
      // https://github.com/parallax/jsPDF/issues/2235
      pdfCell._internalTextOptions.isInputVisual = false;
      pdfCell._internalTextOptions.isOutputVisual = true;
      pdfCell._internalTextOptions.isInputRtl = true;
      pdfCell._internalTextOptions.isOutputRtl = false;
    }
    var cellInfo = {
      gridCell: cellData.cellSourceData,
      pdfCell: _extends({}, pdfCell, style)
    };
    if (rowType === 'header') {
      var cellMerging = dataProvider.getCellMerging(rowIndex, cellIndex);
      if (cellMerging && cellMerging.rowspan > 0) {
        cellInfo.rowSpan = cellMerging.rowspan;
      }
      if (cellMerging && cellMerging.colspan > 0) {
        cellInfo.colSpan = cellMerging.colspan;
      }
    } else if (rowType === 'group') {
      var drawLeftBorderField = rtlEnabled ? 'drawRightBorder' : 'drawLeftBorder';
      var drawRightBorderField = rtlEnabled ? 'drawLeftBorder' : 'drawRightBorder';
      cellInfo.pdfCell[drawLeftBorderField] = cellIndex === 0;
      cellInfo.pdfCell[drawRightBorderField] = cellIndex === columns.length - 1;
      if (cellIndex > 0) {
        var isEmptyCellsExceptFirst = result.slice(1).reduce((accumulate, cellInfo) => {
          return accumulate && !isDefined(cellInfo.pdfCell.text);
        }, true);
        if (!isDefined(cellInfo.pdfCell.text) && isEmptyCellsExceptFirst) {
          result[0].pdfCell[drawRightBorderField] = true;
          for (var i = 0; i < result.length; i++) {
            result[i].colSpan = result.length;
          }
          cellInfo.colSpan = result.length;
        }
      }
    }
    result.push(cellInfo);
  }
  return result;
}
function getBaseTableStyle() {
  return defaultStyles['base'];
}
function getPdfCellStyle(column, rowType, cellStyle) {
  var styles = _extends({}, defaultStyles['base'], defaultStyles[rowType]);
  var alignment = rowType === 'header' ? column.alignment : cellStyle.alignment;
  if (alignment) {
    styles.alignment = alignment;
  }
  if (cellStyle.bold && rowType !== 'header') {
    styles.font = _extends({}, styles.font, {
      style: 'bold'
    });
  }
  return styles;
}
function getFormattedValue(value, format) {
  if (isDefined(format)) {
    if (isDate(value)) {
      return dateLocalization.format(value, format);
    }
    if (isNumeric(value)) {
      return numberLocalization.format(value, format);
    }
  }
  return value === null || value === void 0 ? void 0 : value.toString();
}
export { generateRowsInfo, getBaseTableStyle };
