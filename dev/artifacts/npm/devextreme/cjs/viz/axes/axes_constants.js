/**
* DevExtreme (cjs/viz/axes/axes_constants.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _utils = require("../core/utils");
var _default = {
  logarithmic: 'logarithmic',
  discrete: 'discrete',
  numeric: 'numeric',
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
  center: 'center',
  horizontal: 'horizontal',
  vertical: 'vertical',
  convertTicksToValues: function convertTicksToValues(ticks) {
    return (0, _utils.map)(ticks || [], function (item) {
      return item.value;
    });
  },
  validateOverlappingMode: function validateOverlappingMode(mode) {
    return mode === 'ignore' || mode === 'none' ? mode : 'hide';
  },
  getTicksCountInRange: function getTicksCountInRange(ticks, valueKey, range) {
    var i = 1;
    if (ticks.length > 1) {
      for (; i < ticks.length; i++) {
        if (Math.abs(ticks[i].coords[valueKey] - ticks[0].coords[valueKey]) >= range) {
          break;
        }
      }
    }
    return i;
  },
  areLabelsOverlap: function areLabelsOverlap(bBox1, bBox2, spacing, alignment) {
    var horizontalInverted = bBox1.x > bBox2.x;
    var verticalInverted = bBox1.y > bBox2.y;
    var x1 = bBox1.x;
    var x2 = bBox2.x;
    var width1 = bBox1.width;
    var width2 = bBox2.width;
    if (alignment === 'left') {
      x1 += width1 / 2;
      x2 += width2 / 2;
    } else if (alignment === 'right') {
      x1 -= width1 / 2;
      x2 -= width2 / 2;
    }
    var hasHorizontalOverlapping = horizontalInverted ? x2 + width2 + spacing > x1 : x1 + width1 + spacing > x2;
    var hasVerticalOverlapping = verticalInverted ? bBox2.y + bBox2.height > bBox1.y : bBox1.y + bBox1.height > bBox2.y;
    return hasHorizontalOverlapping && hasVerticalOverlapping;
  }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
