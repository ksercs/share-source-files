/**
* DevExtreme (esm/viz/vector_map/vector_map.utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var nextDataKey = 1;
export function generateDataKey() {
  return 'vectormap-data-' + nextDataKey++;
}
