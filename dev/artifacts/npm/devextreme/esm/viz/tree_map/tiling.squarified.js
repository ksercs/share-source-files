/**
* DevExtreme (esm/viz/tree_map/tiling.squarified.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var _max = Math.max;
import _squarify from './tiling.squarified.base';
import { addAlgorithm } from './tiling';
function accumulate(total, current) {
  return _max(total, current);
}
function squarified(data) {
  return _squarify(data, accumulate, false);
}
addAlgorithm('squarified', squarified);
export default squarified;
