import { isDefined, isNumeric } from '../../../core/utils/type';
import { calculateRowHeight, getPageWidth, toPdfUnit } from './pdf_utils';
var getSum = (a, b) => a + b;
function calculateColumnWidths(doc, dataProvider, topLeftX, margin, customerColumnWidths) {
  var DEFAULT_WIDTH = 150;
  var resultWidths = dataProvider.getColumnsWidths().map(width => toPdfUnit(doc, width !== null && width !== void 0 ? width : DEFAULT_WIDTH));
  var totalAutoColumnsWidth = resultWidths.filter((width, index) => !isDefined(customerColumnWidths[index])).reduce(getSum, 0);
  var totalCustomerColumnsWidth = customerColumnWidths.filter(width => isNumeric(width)).reduce(getSum, 0);
  var availablePageWidth = getAvailablePageAreaWidth(doc, topLeftX, margin);
  var ratio = totalCustomerColumnsWidth < availablePageWidth ? (availablePageWidth - totalCustomerColumnsWidth) / totalAutoColumnsWidth : 1;
  return resultWidths.map((width, index) => {
    var _customerColumnWidths;
    return (_customerColumnWidths = customerColumnWidths[index]) !== null && _customerColumnWidths !== void 0 ? _customerColumnWidths : width * ratio;
  });
}
function getAvailablePageAreaWidth(doc, topLeftX, margin) {
  return getPageWidth(doc) - topLeftX - margin.left - margin.right;
}
function initializeCellsWidth(doc, dataProvider, rows, options) {
  var columnWidths = calculateColumnWidths(doc, dataProvider, options.topLeft.x, options.margin, options.columnWidths);
  rows.forEach(row => {
    row.cells.forEach((_ref, index) => {
      var {
        gridCell,
        pdfCell
      } = _ref;
      pdfCell._rect.w = columnWidths[index];
    });
  });
}
function calculateHeights(doc, rows, options) {
  rows.forEach(row => {
    var pdfCells = row.cells.map(c => c.pdfCell);
    var customerHeight;
    if (options.onRowExporting) {
      var args = {
        rowCells: pdfCells
      };
      options.onRowExporting(args);
      if (isDefined(args.rowHeight)) {
        customerHeight = args.rowHeight;
      }
    }
    row.height = isDefined(customerHeight) ? customerHeight : calculateRowHeight(doc, row.cells, pdfCells.map(c => c._rect.w));
    pdfCells.forEach(cell => {
      cell._rect.h = row.height;
    });
  });
}
function applyColSpans(rows) {
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    var row = rows[rowIndex];
    for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      var cell = row.cells[cellIndex];
      if (isDefined(cell.colSpan) && !isDefined(cell.pdfCell.isMerged)) {
        for (var spanIndex = 1; spanIndex <= cell.colSpan; spanIndex++) {
          var mergedCell = rows[rowIndex].cells[cellIndex + spanIndex];
          cell.pdfCell._rect.w += mergedCell.pdfCell._rect.w;
          mergedCell.pdfCell._rect.w = 0;
          mergedCell.pdfCell.isMerged = true;
        }
      }
    }
  }
}
function applyRowSpans(rows) {
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    var row = rows[rowIndex];
    for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      var cell = row.cells[cellIndex];
      if (isDefined(cell.rowSpan) && !isDefined(cell.pdfCell.isMerged)) {
        for (var spanIndex = 1; spanIndex <= cell.rowSpan; spanIndex++) {
          var mergedCell = rows[rowIndex + spanIndex].cells[cellIndex];
          cell.pdfCell._rect.h += mergedCell.pdfCell._rect.h;
          mergedCell.pdfCell._rect.h = 0;
          mergedCell.pdfCell.isMerged = true;
        }
      }
    }
  }
}
function resizeFirstColumnByIndentLevel(rows, options) {
  rows.forEach(row => {
    row.cells[0].pdfCell._rect.w -= row.indentLevel * options.indent;
  });
}
function applyBordersConfig(rows) {
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    var cells = rows[rowIndex].cells;
    for (var columnIndex = 0; columnIndex < cells.length; columnIndex++) {
      var pdfCell = cells[columnIndex].pdfCell;
      var leftPdfCell = columnIndex >= 1 ? cells[columnIndex - 1].pdfCell : null;
      var topPdfCell = rowIndex >= 1 ? rows[rowIndex - 1].cells[columnIndex].pdfCell : null;
      if (pdfCell.drawLeftBorder === false && !isDefined(cells[columnIndex].colSpan)) {
        // TODO: Check this logic after implementing splitting to pages
        if (isDefined(leftPdfCell)) {
          leftPdfCell.drawRightBorder = false;
        }
      } else if (!isDefined(pdfCell.drawLeftBorder)) {
        if (isDefined(leftPdfCell) && leftPdfCell.drawRightBorder === false) {
          pdfCell.drawLeftBorder = false;
        }
      }
      if (pdfCell.drawTopBorder === false) {
        if (isDefined(topPdfCell)) {
          topPdfCell.drawBottomBorder = false;
        }
      } else if (!isDefined(pdfCell.drawTopBorder)) {
        if (isDefined(topPdfCell) && topPdfCell.drawBottomBorder === false) {
          pdfCell.drawTopBorder = false;
        }
      }
    }
  }
}
function calculateCoordinates(doc, rows, options) {
  var _topLeft$y;
  var topLeft = options === null || options === void 0 ? void 0 : options.topLeft;
  var margin = options === null || options === void 0 ? void 0 : options.margin;
  var y = ((_topLeft$y = topLeft === null || topLeft === void 0 ? void 0 : topLeft.y) !== null && _topLeft$y !== void 0 ? _topLeft$y : 0) + margin.top;
  rows.forEach(row => {
    var _topLeft$x;
    var x = ((_topLeft$x = topLeft === null || topLeft === void 0 ? void 0 : topLeft.x) !== null && _topLeft$x !== void 0 ? _topLeft$x : 0) + margin.left;
    var intend = row.indentLevel * options.indent;
    row.cells.forEach(cell => {
      cell.pdfCell._rect.x = x + intend;
      cell.pdfCell._rect.y = y;
      x += cell.pdfCell._rect.w;
    });
    y += row.height;
  });
}
function calculateTableSize(doc, cells, options) {
  var _ref2, _leftPos, _options$topLeft, _ref3, _topPos, _options$topLeft2;
  var leftPos;
  var topPos;
  var rightPos;
  var bottomPos;
  cells.forEach(cell => {
    if (!isDefined(leftPos) || leftPos > cell._rect.x) {
      leftPos = cell._rect.x;
    }
    if (!isDefined(topPos) || topPos > cell._rect.y) {
      topPos = cell._rect.y;
    }
    if (!isDefined(rightPos) || rightPos < cell._rect.x + cell._rect.w) {
      rightPos = cell._rect.x + cell._rect.w;
    }
    if (!isDefined(bottomPos) || bottomPos < cell._rect.y + cell._rect.h) {
      bottomPos = cell._rect.y + cell._rect.h;
    }
  });
  var x = (_ref2 = (_leftPos = leftPos) !== null && _leftPos !== void 0 ? _leftPos : options === null || options === void 0 ? void 0 : (_options$topLeft = options.topLeft) === null || _options$topLeft === void 0 ? void 0 : _options$topLeft.x) !== null && _ref2 !== void 0 ? _ref2 : 0;
  var y = (_ref3 = (_topPos = topPos) !== null && _topPos !== void 0 ? _topPos : options === null || options === void 0 ? void 0 : (_options$topLeft2 = options.topLeft) === null || _options$topLeft2 === void 0 ? void 0 : _options$topLeft2.y) !== null && _ref3 !== void 0 ? _ref3 : 0;
  var w = isDefined(rightPos) ? rightPos - x : 0;
  var h = isDefined(bottomPos) ? bottomPos - y : 0;
  return {
    x,
    y,
    w,
    h
  };
}
export { initializeCellsWidth, applyColSpans, applyRowSpans, resizeFirstColumnByIndentLevel, applyBordersConfig, calculateHeights, calculateCoordinates, calculateTableSize };