/**
* DevExtreme (cjs/ui/grid_core/ui.grid_core.virtual_columns_core.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_virtual_columns_core = require("../../__internal/grids/grid_core/virtual_columns/m_virtual_columns_core");
Object.keys(_m_virtual_columns_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_virtual_columns_core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _m_virtual_columns_core[key];
    }
  });
});
