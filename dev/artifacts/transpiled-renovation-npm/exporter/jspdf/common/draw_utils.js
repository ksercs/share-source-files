"use strict";

exports.addNewPage = addNewPage;
exports.drawCellsContent = drawCellsContent;
exports.drawCellsLines = drawCellsLines;
exports.drawGridLines = drawGridLines;
exports.drawLine = drawLine;
exports.drawRect = drawRect;
exports.drawTextInRect = drawTextInRect;
exports.getDocumentStyles = getDocumentStyles;
exports.roundToThreeDecimals = roundToThreeDecimals;
exports.setDocumentStyles = setDocumentStyles;
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _pdf_utils = require("./pdf_utils");
var _excluded = ["_rect", "gridCell"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function roundToThreeDecimals(value) {
  return Math.round(value * 1000) / 1000; // checked with browser zoom - 500%
}

function drawCellsContent(doc, customDrawCell, cellsArray, docStyles) {
  cellsArray.forEach(function (cell) {
    var _rect = cell._rect,
      gridCell = cell.gridCell,
      pdfCell = _objectWithoutProperties(cell, _excluded);
    var x = _rect.x,
      y = _rect.y,
      w = _rect.w,
      h = _rect.h;
    var rect = {
      x,
      y,
      w,
      h
    };
    var eventArg = {
      doc,
      rect,
      pdfCell,
      gridCell,
      cancel: false
    };
    customDrawCell === null || customDrawCell === void 0 ? void 0 : customDrawCell(eventArg);
    if (!eventArg.cancel) {
      drawCellBackground(doc, cell);
      drawCellText(doc, cell, docStyles);
    }
  });
}
function drawLine(doc, startX, startY, endX, endY) {
  doc.line(roundToThreeDecimals(startX), roundToThreeDecimals(startY), roundToThreeDecimals(endX), roundToThreeDecimals(endY));
}
function drawRect(doc, x, y, width, height, style) {
  if ((0, _type.isDefined)(style)) {
    doc.rect(roundToThreeDecimals(x), roundToThreeDecimals(y), roundToThreeDecimals(width), roundToThreeDecimals(height), style);
  } else {
    doc.rect(roundToThreeDecimals(x), roundToThreeDecimals(y), roundToThreeDecimals(width), roundToThreeDecimals(height));
  }
}
function getLineHeightShift(doc) {
  var DEFAULT_LINE_HEIGHT = 1.15;

  // TODO: check lineHeightFactor from text options. Currently supports only doc options - https://github.com/MrRio/jsPDF/issues/3234
  return (doc.getLineHeightFactor() - DEFAULT_LINE_HEIGHT) * doc.getFontSize();
}
function drawTextInRect(doc, text, rect, verticalAlign, horizontalAlign, jsPDFTextOptions) {
  var textArray = text.split('\n');
  var linesCount = textArray.length;
  var heightOfOneLine = (0, _pdf_utils.calculateTextHeight)(doc, textArray[0], doc.getFont(), {
    wordWrapEnabled: false,
    targetRectWidth: 1000000000
  });
  var vAlign = verticalAlign !== null && verticalAlign !== void 0 ? verticalAlign : 'middle';
  var hAlign = horizontalAlign !== null && horizontalAlign !== void 0 ? horizontalAlign : 'left';
  var verticalAlignCoefficientsMap = {
    top: 0,
    middle: 0.5,
    bottom: 1
  };
  var horizontalAlignMap = {
    left: 0,
    center: 0.5,
    right: 1
  };
  var y = rect.y + rect.h * verticalAlignCoefficientsMap[vAlign] - heightOfOneLine * (linesCount - 1) * verticalAlignCoefficientsMap[vAlign] + getLineHeightShift(doc);
  var x = rect.x + rect.w * horizontalAlignMap[hAlign];
  var textOptions = (0, _extend.extend)({
    baseline: vAlign,
    align: hAlign
  }, jsPDFTextOptions);
  doc.text(textArray.join('\n'), roundToThreeDecimals(x), roundToThreeDecimals(y), textOptions);
}
function drawCellBackground(doc, cell) {
  if ((0, _type.isDefined)(cell.backgroundColor)) {
    trySetColor(doc, 'fill', cell.backgroundColor);
    drawRect(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h, 'F');
  }
}
function drawCellText(doc, cell, docStyles) {
  if ((0, _type.isDefined)(cell.text) && cell.text !== '') {
    // TODO: use cell.text.trim() ?
    var textColor = cell.textColor,
      font = cell.font,
      _rect = cell._rect,
      padding = cell.padding;
    setTextStyles(doc, {
      textColor,
      font
    }, docStyles);
    var textRect = {
      x: _rect.x + padding.left,
      y: _rect.y + padding.top,
      w: _rect.w - (padding.left + padding.right),
      h: _rect.h - (padding.top + padding.bottom)
    };
    if ((0, _type.isDefined)(cell._textLeftOffset) || (0, _type.isDefined)(cell._textTopOffset)) {
      var _cell$_textLeftOffset, _cell$_textTopOffset;
      textRect.x = textRect.x + ((_cell$_textLeftOffset = cell._textLeftOffset) !== null && _cell$_textLeftOffset !== void 0 ? _cell$_textLeftOffset : 0);
      textRect.y = textRect.y + ((_cell$_textTopOffset = cell._textTopOffset) !== null && _cell$_textTopOffset !== void 0 ? _cell$_textTopOffset : 0);
      doc.saveGraphicsState(); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#saveGraphicsState
      clipOutsideRectContent(doc, cell._rect.x, cell._rect.y, cell._rect.w, cell._rect.h);
    }
    drawTextInRect(doc, cell.text, textRect, cell.verticalAlign, cell.horizontalAlign, cell._internalTextOptions);
    if ((0, _type.isDefined)(cell._textLeftOffset) || (0, _type.isDefined)(cell._textTopOffset)) {
      doc.restoreGraphicsState(); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#restoreGraphicsState
    }
  }
}

function drawCellsLines(doc, cellsArray, docStyles) {
  cellsArray.filter(function (cell) {
    return !(0, _type.isDefined)(cell.borderColor);
  }).forEach(function (cell) {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
  cellsArray.filter(function (cell) {
    return (0, _type.isDefined)(cell.borderColor);
  }).forEach(function (cell) {
    drawBorders(doc, cell._rect, cell, docStyles);
  });
}
function drawGridLines(doc, rect, options, docStyles) {
  drawBorders(doc, rect, options, docStyles);
}
function drawBorders(doc, rect, _ref, docStyles) {
  var borderWidth = _ref.borderWidth,
    borderColor = _ref.borderColor,
    _ref$drawLeftBorder = _ref.drawLeftBorder,
    drawLeftBorder = _ref$drawLeftBorder === void 0 ? true : _ref$drawLeftBorder,
    _ref$drawRightBorder = _ref.drawRightBorder,
    drawRightBorder = _ref$drawRightBorder === void 0 ? true : _ref$drawRightBorder,
    _ref$drawTopBorder = _ref.drawTopBorder,
    drawTopBorder = _ref$drawTopBorder === void 0 ? true : _ref$drawTopBorder,
    _ref$drawBottomBorder = _ref.drawBottomBorder,
    drawBottomBorder = _ref$drawBottomBorder === void 0 ? true : _ref$drawBottomBorder;
  if (!(0, _type.isDefined)(rect)) {
    throw 'rect is required';
  }
  if (!drawLeftBorder && !drawRightBorder && !drawTopBorder && !drawBottomBorder) {
    return;
  } else if (drawLeftBorder && drawRightBorder && drawTopBorder && drawBottomBorder) {
    setLinesStyles(doc, {
      borderWidth,
      borderColor
    }, docStyles);
    drawRect(doc, rect.x, rect.y, rect.w, rect.h);
  } else {
    setLinesStyles(doc, {
      borderWidth,
      borderColor
    }, docStyles);
    if (drawTopBorder) {
      drawLine(doc, rect.x, rect.y, rect.x + rect.w, rect.y); // top
    }

    if (drawLeftBorder) {
      drawLine(doc, rect.x, rect.y, rect.x, rect.y + rect.h); // left
    }

    if (drawRightBorder) {
      drawLine(doc, rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h); // right
    }

    if (drawBottomBorder) {
      drawLine(doc, rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h); // bottom
    }
  }
}

function setTextStyles(doc, _ref2, docStyles) {
  var textColor = _ref2.textColor,
    font = _ref2.font;
  trySetColor(doc, 'text', (0, _type.isDefined)(textColor) ? textColor : docStyles.textColor);
  var currentFont = (0, _type.isDefined)(font) ? (0, _extend.extend)({}, docStyles.font, font) : docStyles.font;
  var docFont = doc.getFont();
  if (currentFont.name !== docFont.fontName || currentFont.style !== docFont.fontStyle || (0, _type.isDefined)(currentFont.weight) // fontWeight logic, https://raw.githack.com/MrRio/jsPDF/master/docs/jspdf.js.html#line4842
  ) {
    doc.setFont(currentFont.name, currentFont.style, currentFont.weight);
  }
  if (currentFont.size !== doc.getFontSize()) {
    doc.setFontSize(currentFont.size);
  }
}
function setLinesStyles(doc, _ref3, docStyles) {
  var borderWidth = _ref3.borderWidth,
    borderColor = _ref3.borderColor;
  var currentBorderWidth = (0, _type.isDefined)(borderWidth) ? borderWidth : docStyles.borderWidth;
  if (currentBorderWidth !== getDocBorderWidth(doc)) {
    setDocBorderWidth(doc, (0, _pdf_utils.toPdfUnit)(doc, currentBorderWidth));
  }
  trySetColor(doc, 'draw', (0, _type.isDefined)(borderColor) ? borderColor : docStyles.borderColor);
}
function trySetColor(doc, target, color) {
  var getterName = "get".concat(capitalizeFirstLetter(target), "Color");
  var setterName = "set".concat(capitalizeFirstLetter(target), "Color");
  var _color$ch = color.ch1,
    ch1 = _color$ch === void 0 ? color : _color$ch,
    ch2 = color.ch2,
    ch3 = color.ch3,
    ch4 = color.ch4;
  var normalizedColor = doc.__private__.decodeColorString(doc.__private__.encodeColorString({
    ch1,
    ch2,
    ch3,
    ch4,
    precision: target === 'text' ? 3 : 2
  }));
  if (normalizedColor !== doc[getterName]() || target === 'fill') {
    doc[setterName].apply(doc, [ch1, ch2, ch3, ch4].filter(function (item) {
      return item !== undefined;
    }));
  }
}
function getDocumentStyles(doc) {
  var docFont = doc.getFont();
  return {
    borderWidth: getDocBorderWidth(doc),
    borderColor: doc.getDrawColor(),
    font: {
      name: docFont.fontName,
      style: docFont.fontStyle,
      size: doc.getFontSize()
    },
    textColor: doc.getTextColor()
  };
}
function setDocumentStyles(doc, styles) {
  var borderWidth = styles.borderWidth,
    borderColor = styles.borderColor,
    font = styles.font,
    textColor = styles.textColor;
  var docFont = doc.getFont();
  if (docFont.fontName !== font.name || docFont.fontStyle !== font.style) {
    doc.setFont(font.name, font.style, undefined);
  }
  var docFontSize = doc.getFontSize();
  if (docFontSize !== font.size) {
    doc.setFontSize(font.size);
  }
  if (getDocBorderWidth(doc) !== borderWidth) {
    setDocBorderWidth(doc, borderWidth);
  }
  if (doc.getDrawColor() !== borderColor) {
    doc.setDrawColor(borderColor);
  }
  if (doc.getTextColor() !== textColor) {
    doc.setTextColor(textColor);
  }
}
function addNewPage(doc) {
  doc.addPage();
  resetDocBorderWidth(doc);
}
function getDocBorderWidth(doc) {
  var _doc$__borderWidth;
  // The 'getLineWidth' method was implemented in 2.5.0 version - https://github.com/parallax/jsPDF/pull/3324
  if ((0, _type.isDefined)(doc.getLineWidth)) {
    return doc.getLineWidth();
  }
  return (_doc$__borderWidth = doc.__borderWidth) !== null && _doc$__borderWidth !== void 0 ? _doc$__borderWidth : 0.200025; // // https://github.com/parallax/jsPDF/blob/a56c882e2c139e74a9adaea0baa78fb1386cbf23/src/jspdf.js#L4946
}

function setDocBorderWidth(doc, width) {
  doc.setLineWidth(width);

  // The 'getLineWidth' method was implemented in 2.5.0 version - https://github.com/parallax/jsPDF/pull/3324
  if (!(0, _type.isDefined)(doc.getLineWidth)) {
    doc.__borderWidth = width;
  }
}
function resetDocBorderWidth(doc) {
  if (!(0, _type.isDefined)(doc.getLineWidth)) {
    doc.__borderWidth = null;
  }
}
function clipOutsideRectContent(doc, x, y, w, h) {
  doc.moveTo(roundToThreeDecimals(x), roundToThreeDecimals(y)); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#moveTo - Begin a new subpath by moving the current point to coordinates (x, y)
  doc.lineTo(roundToThreeDecimals(x + w), roundToThreeDecimals(y)); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#lineTo - Append a straight line segment from the current point to the point (x, y)
  doc.lineTo(roundToThreeDecimals(x + w), roundToThreeDecimals(y + h));
  doc.lineTo(roundToThreeDecimals(x), roundToThreeDecimals(y + h));
  doc.clip(); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#clip - Clip all outside path content after calling drawing ops
  doc.discardPath(); // http://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html#discardPath - Consumes the current path without any effect. Mainly used in combination with clip or clipEvenOdd.
}