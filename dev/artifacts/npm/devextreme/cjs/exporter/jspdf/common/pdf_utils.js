/**
* DevExtreme (cjs/exporter/jspdf/common/pdf_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.applyRtl = applyRtl;
exports.applyWordWrap = applyWordWrap;
exports.calculateRowHeight = calculateRowHeight;
exports.calculateTargetRectWidth = calculateTargetRectWidth;
exports.calculateTextHeight = calculateTextHeight;
exports.getPageHeight = getPageHeight;
exports.getPageWidth = getPageWidth;
exports.getTextDimensions = getTextDimensions;
exports.getTextLines = getTextLines;
exports.toPdfUnit = toPdfUnit;
var _type = require("../../../core/utils/type");
var DOTS_TEXT = '...';
function toPdfUnit(doc, value) {
  var defaultScaleFactor = 1; // https://github.com/parallax/jsPDF/blob/master/src/jspdf.js#L3212
  var coefficient = defaultScaleFactor / doc.internal.scaleFactor;
  return value * coefficient;
}
function getPageWidth(doc) {
  return doc.internal.pageSize.getWidth();
}
function getPageHeight(doc) {
  return doc.internal.pageSize.getHeight();
}
function getTextLines(doc, text, font, _ref) {
  var wordWrapEnabled = _ref.wordWrapEnabled,
    targetRectWidth = _ref.targetRectWidth;
  if (wordWrapEnabled) {
    var usedFont = doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style);
    return doc.splitTextToSize(text, targetRectWidth, {
      fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize(),
      fontName: usedFont.fontName,
      fontStyle: usedFont.fontStyle
    });
  }
  var textWithoutLineBreak = text.split('\n').filter(function (ch) {
    return ch !== '';
  }).join(' ');
  if (getTextDimensions(doc, textWithoutLineBreak, font).w <= targetRectWidth) {
    return [textWithoutLineBreak];
  }
  var textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
  while (textWithoutLineBreak.length > 0 && textWidth > targetRectWidth) {
    var symbolsCountToRemove = 0;
    if (textWidth >= targetRectWidth * 2) {
      symbolsCountToRemove = textWithoutLineBreak.length / 2;
    }
    if (symbolsCountToRemove < 1) {
      symbolsCountToRemove = 1;
    }
    textWithoutLineBreak = textWithoutLineBreak.substring(0, textWithoutLineBreak.length - symbolsCountToRemove);
    textWidth = getTextDimensions(doc, textWithoutLineBreak + DOTS_TEXT, font).w;
  }
  return [textWithoutLineBreak + DOTS_TEXT];
}
function calculateTargetRectWidth(columnWidth, padding) {
  var width = columnWidth - (padding.left + padding.right);
  return width >= 0 ? width : 0;
}
function getTextDimensions(doc, text, font) {
  return doc.getTextDimensions(text, {
    font: doc.getFont(font === null || font === void 0 ? void 0 : font.name, font === null || font === void 0 ? void 0 : font.style),
    fontSize: (font === null || font === void 0 ? void 0 : font.size) || doc.getFontSize()
  });
}
function calculateTextHeight(doc, text, font, _ref2) {
  var wordWrapEnabled = _ref2.wordWrapEnabled,
    targetRectWidth = _ref2.targetRectWidth;
  var heightOfOneLine = getTextDimensions(doc, text, font).h;
  var linesCount = getTextLines(doc, text, font, {
    wordWrapEnabled,
    targetRectWidth
  }).length;
  return heightOfOneLine * linesCount * doc.getLineHeightFactor();
}
function calculateRowHeight(doc, cells, columnWidths) {
  if (cells.length !== columnWidths.length) {
    throw 'the cells count must be equal to the count of the columns';
  }
  var rowHeight = 0;
  for (var cellIndex = 0; cellIndex < cells.length; cellIndex++) {
    if ((0, _type.isDefined)(cells[cellIndex].rowSpan)) {
      // height will be computed at the recalculateHeightForMergedRows step
      continue;
    }
    var cellText = cells[cellIndex].pdfCell.text;
    var cellPadding = cells[cellIndex].pdfCell.padding;
    var font = cells[cellIndex].pdfCell.font;
    var wordWrapEnabled = cells[cellIndex].pdfCell.wordWrapEnabled;
    var columnWidth = columnWidths[cellIndex];
    var targetRectWidth = calculateTargetRectWidth(columnWidth, cellPadding);
    if ((0, _type.isDefined)(cellText)) {
      var textHeight = cellText !== '' ? calculateTextHeight(doc, cellText, font, {
        wordWrapEnabled,
        targetRectWidth
      }) : 0;
      var cellHeight = textHeight + cellPadding.top + cellPadding.bottom;
      if (rowHeight < cellHeight) {
        rowHeight = cellHeight;
      }
    }
  }
  return rowHeight;
}
function applyWordWrap(doc, rowsInfo) {
  rowsInfo.forEach(function (row) {
    row.cells.forEach(function (_ref3) {
      var pdfCell = _ref3.pdfCell;
      if ((0, _type.isDefined)(pdfCell.text)) {
        var lines = getTextLines(doc, pdfCell.text, pdfCell.font, {
          wordWrapEnabled: pdfCell.wordWrapEnabled,
          targetRectWidth: calculateTargetRectWidth(pdfCell._rect.w, pdfCell.padding)
        });
        pdfCell.text = lines.join('\n');
      }
    });
  });
}
function applyRtl(doc, rectsByPages, options) {
  rectsByPages.forEach(function (pageRects) {
    pageRects.forEach(function (pdfCell) {
      var mirroredX = getPageWidth(doc) - (pdfCell._rect.x + pdfCell._rect.w);
      var marginDiff = options.margin.left - options.margin.right;
      pdfCell._rect.x = mirroredX + marginDiff;
    });
  });
}
