/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.master_detail.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _master_detail = require("../../__internal/grids/data_grid/module_not_extended/master_detail");
Object.keys(_master_detail).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _master_detail[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _master_detail[key];
    }
  });
});
