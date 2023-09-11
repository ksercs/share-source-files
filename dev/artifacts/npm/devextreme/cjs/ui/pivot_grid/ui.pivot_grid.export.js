/**
* DevExtreme (cjs/ui/pivot_grid/ui.pivot_grid.export.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_export = require("../../__internal/grids/pivot_grid/export/m_export");
Object.keys(_m_export).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_export[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _m_export[key];
    }
  });
});
