/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.row_dragging.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _row_dragging = require("../../__internal/grids/data_grid/module_not_extended/row_dragging");
Object.keys(_row_dragging).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _row_dragging[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _row_dragging[key];
    }
  });
});
