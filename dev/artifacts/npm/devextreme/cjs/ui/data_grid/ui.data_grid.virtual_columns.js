/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.virtual_columns.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _virtual_columns = require("../../__internal/grids/data_grid/module_not_extended/virtual_columns");
Object.keys(_virtual_columns).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _virtual_columns[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _virtual_columns[key];
    }
  });
});
