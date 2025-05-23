/**
* DevExtreme (esm/exporter/jspdf/common/height_updater.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined } from '../../../core/utils/type';
import { calculateTextHeight, calculateTargetRectWidth } from './pdf_utils';
function updateRowsAndCellsHeights(doc, rows) {
  var rowsAdditionalHeights = calculateAdditionalRowsHeights(doc, rows);
  rows.forEach(row => {
    row.height += rowsAdditionalHeights[row.rowIndex];
  });
  rows.forEach(row => {
    row.cells.forEach(cell => {
      var _cell$rowSpan;
      var rowsCount = ((_cell$rowSpan = cell.rowSpan) !== null && _cell$rowSpan !== void 0 ? _cell$rowSpan : 0) + 1;
      cell.pdfCell._rect.h = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height, 0);
    });
  });
}
function calculateAdditionalRowsHeights(doc, rows) {
  var rowsAdditionalHeights = Array.from({
    length: rows.length
  }, () => 0);
  var sortedRows = sortRowsByMaxRowSpanAsc(rows);
  sortedRows.forEach(row => {
    var cellsWithRowSpan = row.cells.filter(cell => isDefined(cell.rowSpan));
    cellsWithRowSpan.forEach(cell => {
      var targetRectWidth = calculateTargetRectWidth(cell.pdfCell._rect.w, cell.pdfCell.padding);
      var textHeight = calculateTextHeight(doc, cell.pdfCell.text, cell.pdfCell.font, {
        wordWrapEnabled: cell.pdfCell.wordWrapEnabled,
        targetRectWidth
      });
      var cellHeight = textHeight + cell.pdfCell.padding.top + cell.pdfCell.padding.bottom;
      var rowsCount = cell.rowSpan + 1;
      var currentRowSpanRowsHeight = rows.slice(row.rowIndex, row.rowIndex + rowsCount).reduce((accumulator, rowInfo) => accumulator + rowInfo.height + rowsAdditionalHeights[rowInfo.rowIndex], 0);
      if (cellHeight > currentRowSpanRowsHeight) {
        var delta = (cellHeight - currentRowSpanRowsHeight) / rowsCount;
        for (var spanIndex = row.rowIndex; spanIndex < row.rowIndex + rowsCount; spanIndex++) {
          rowsAdditionalHeights[spanIndex] += delta;
        }
      }
    });
  });
  return rowsAdditionalHeights;
}
function sortRowsByMaxRowSpanAsc(rows) {
  var getMaxRowSpan = row => {
    var spansArray = row.cells.map(cell => {
      var _cell$rowSpan2;
      return (_cell$rowSpan2 = cell.rowSpan) !== null && _cell$rowSpan2 !== void 0 ? _cell$rowSpan2 : 0;
    });
    return Math.max(...spansArray);
  };
  var sortByMaxRowSpan = (row1, row2) => {
    var row1RowSpan = getMaxRowSpan(row1);
    var row2RowSpan = getMaxRowSpan(row2);
    if (row1RowSpan > row2RowSpan) {
      return 1;
    }
    if (row2RowSpan > row1RowSpan) {
      return -1;
    }
    return 0;
  };
  return [...rows].sort(sortByMaxRowSpan);
}
export { updateRowsAndCellsHeights };
