/**
* DevExtreme (cjs/exporter/jspdf/common/rows_spliting_utils/create_on_split_multipage_row.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.createOnSplitMultiPageRow = void 0;
var _pdf_utils = require("../pdf_utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function createMultiCellRect(rect, text, marginTop) {
  return _extends({}, rect, {
    sourceCellInfo: _extends({}, rect.sourceCellInfo, {
      text
    }),
    y: marginTop
  });
}
var createOnSplitMultiPageRow = function createOnSplitMultiPageRow(doc, options, headerHeight, maxBottomRight) {
  return function (isFirstPage, pageRects) {
    var currentPageRects = [];
    var nextPageRects = [];
    var maxCurrentPageHeight = 0;
    var maxNextPageHeight = 0;
    pageRects.forEach(function (rect) {
      var w = rect.w,
        sourceCellInfo = rect.sourceCellInfo;
      var additionalHeight = !isFirstPage && options.repeatHeaders ? headerHeight : headerHeight + options.topLeft.y;
      var heightOfOneLine = (0, _pdf_utils.getTextDimensions)(doc, sourceCellInfo.text, sourceCellInfo.font).h;
      var paddingHeight = sourceCellInfo.padding.top + sourceCellInfo.padding.bottom;
      var fullPageHeight = maxBottomRight.y - additionalHeight - paddingHeight - options.margin.top;
      var possibleLinesCount = Math.floor(fullPageHeight / (heightOfOneLine * doc.getLineHeightFactor()));
      var allLines = (0, _pdf_utils.getTextLines)(doc, sourceCellInfo.text, sourceCellInfo.font, {
        wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
        targetRectWidth: w
      });
      if (possibleLinesCount < allLines.length) {
        var currentPageText = allLines.slice(0, possibleLinesCount).join('\n');
        var currentPageHeight = (0, _pdf_utils.calculateTextHeight)(doc, currentPageText, sourceCellInfo.font, {
          wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
          targetRectWidth: w
        });
        maxCurrentPageHeight = Math.max(maxCurrentPageHeight, currentPageHeight + paddingHeight);
        maxNextPageHeight = rect.h - currentPageHeight;
        currentPageRects.push(createMultiCellRect(rect, currentPageText, options.margin.top));
        nextPageRects.push(createMultiCellRect(rect, allLines.slice(possibleLinesCount).join('\n'), options.margin.top));
      } else {
        var _currentPageHeight = (0, _pdf_utils.calculateTextHeight)(doc, sourceCellInfo.text, sourceCellInfo.font, {
          wordWrapEnabled: sourceCellInfo.wordWrapEnabled,
          targetRectWidth: w
        });
        maxCurrentPageHeight = Math.max(maxCurrentPageHeight, _currentPageHeight + paddingHeight);
        maxNextPageHeight = Math.max(maxNextPageHeight, _currentPageHeight + paddingHeight);
        currentPageRects.push(createMultiCellRect(rect, sourceCellInfo.text, options.margin.top));
        nextPageRects.push(createMultiCellRect(rect, '', options.margin.top));
      }
    });
    currentPageRects.forEach(function (rect) {
      return rect.h = maxCurrentPageHeight;
    });
    nextPageRects.forEach(function (rect) {
      return rect.h = maxNextPageHeight;
    });
    return [currentPageRects, nextPageRects];
  };
};
exports.createOnSplitMultiPageRow = createOnSplitMultiPageRow;
