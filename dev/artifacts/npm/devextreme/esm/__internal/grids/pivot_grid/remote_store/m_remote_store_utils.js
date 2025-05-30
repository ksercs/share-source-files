/**
* DevExtreme (esm/__internal/grids/pivot_grid/remote_store/m_remote_store_utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
var forEachGroup = function forEachGroup(data, callback, level) {
  data = data || [];
  level = level || 0;
  for (var i = 0; i < data.length; i += 1) {
    var group = data[i];
    callback(group, level);
    if (group && group.items && group.items.length) {
      forEachGroup(group.items, callback, level + 1);
    }
  }
};
export default {
  forEachGroup
};
export { forEachGroup };
