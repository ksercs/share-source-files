/**
* DevExtreme (cjs/exporter/jspdf/common/rows_generator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.generateRowsInfo = generateRowsInfo;
exports.getBaseTableStyle = getBaseTableStyle;
var _type = require("../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../localization/date"));
var _number = _interopRequireDefault(require("../../../localization/number"));
var _pdf_utils = require("./pdf_utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  var doc = _ref.doc,
    dataProvider = _ref.dataProvider,
    rowIndex = _ref.rowIndex,
    wordWrapEnabled = _ref.wordWrapEnabled,
    columns = _ref.columns,
    styles = _ref.styles,
    rowType = _ref.rowType,
    backgroundColor = _ref.backgroundColor,
    rtlEnabled = _ref.rtlEnabled;
  var result = [];
  for (var cellIndex = 0; cellIndex < columns.length; cellIndex++) {
    var _style$alignment;
    var cellData = dataProvider.getCellData(rowIndex, cellIndex, true);
    var cellStyle = styles[dataProvider.getStyleId(rowIndex, cellIndex)];
    var style = getPdfCellStyle(columns[cellIndex], rowType, cellStyle);
    var defaultAlignment = rtlEnabled ? 'right' : 'left';
    var paddingValue = (0, _pdf_utils.toPdfUnit)(doc, 5);
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
        var isEmptyCellsExceptFirst = result.slice(1).reduce(function (accumulate, cellInfo) {
          return accumulate && !(0, _type.isDefined)(cellInfo.pdfCell.text);
        }, true);
        if (!(0, _type.isDefined)(cellInfo.pdfCell.text) && isEmptyCellsExceptFirst) {
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
  if ((0, _type.isDefined)(format)) {
    if ((0, _type.isDate)(value)) {
      return _date.default.format(value, format);
    }
    if ((0, _type.isNumeric)(value)) {
      return _number.default.format(value, format);
    }
  }
  return value === null || value === void 0 ? void 0 : value.toString();
}
