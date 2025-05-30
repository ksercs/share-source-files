/**
* DevExtreme (cjs/viz/axes/axes_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.measureLabels = exports.calculateCanvasMargins = void 0;
var _max = Math.max;
var calculateCanvasMargins = function calculateCanvasMargins(bBoxes, canvas) {
  var cLeft = canvas.left;
  var cTop = canvas.top;
  var cRight = canvas.width - canvas.right;
  var cBottom = canvas.height - canvas.bottom;
  return bBoxes.reduce(function (margins, bBox) {
    if (!bBox || bBox.isEmpty) {
      return margins;
    }
    return {
      left: _max(margins.left, cLeft - bBox.x),
      top: _max(margins.top, cTop - bBox.y),
      right: _max(margins.right, bBox.x + bBox.width - cRight),
      bottom: _max(margins.bottom, bBox.y + bBox.height - cBottom)
    };
  }, {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });
};
exports.calculateCanvasMargins = calculateCanvasMargins;
var measureLabels = function measureLabels(items) {
  items.forEach(function (item) {
    var label = item.getContentContainer();
    item.labelBBox = label ? label.getBBox() : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
  });
};
exports.measureLabels = measureLabels;
