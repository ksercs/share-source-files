/**
* DevExtreme (esm/viz/tree_map/colorizing.gradient.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { addColorizer, createColorCodeGetter as _createColorCodeGetter } from './colorizing';
var _min = Math.min;
var _max = Math.max;
function createSimpleColorizer(getColor, range) {
  return function (node) {
    return getColor(node, range);
  };
}
function getRangeData(range) {
  return [Number(range[0]) || 0, range[1] - range[0] || 1];
}
function calculateRange(nodes, getValue) {
  var i;
  var ii = nodes.length;
  var codes = [];
  var code;
  for (i = 0; i < ii; ++i) {
    code = getValue(nodes[i]);
    if (isFinite(code)) {
      codes.push(code);
    }
  }
  return getRangeData([_min.apply(null, codes), _max.apply(null, codes)]);
}
function createGuessingColorizer(getColor, getValue) {
  var ranges = {};
  return function (node) {
    var parent = node.parent;
    return getColor(node, ranges[parent._id] || (ranges[parent._id] = calculateRange(parent.nodes, getValue)));
  };
}
function gradientColorizer(options, themeManager) {
  var palette = themeManager.createGradientPalette(options.palette);
  var getValue = _createColorCodeGetter(options);
  return 'range' in options ? createSimpleColorizer(getColor, getRangeData(options.range || [])) : createGuessingColorizer(getColor, getValue);
  function getColor(node, arg) {
    return palette.getColor((getValue(node) - arg[0]) / arg[1]);
  }
}
addColorizer('gradient', gradientColorizer);
export default gradientColorizer;
