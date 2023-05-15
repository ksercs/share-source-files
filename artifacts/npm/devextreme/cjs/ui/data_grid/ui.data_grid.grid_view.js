/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.grid_view.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _grid_view = require("../../__internal/grids/data_grid/module_not_extended/grid_view");
Object.keys(_grid_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _grid_view[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _grid_view[key];
    }
  });
});
