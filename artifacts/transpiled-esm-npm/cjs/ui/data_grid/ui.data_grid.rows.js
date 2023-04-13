"use strict";

var _rows = require("../../__internal/grids/data_grid/module_not_extended/rows");
Object.keys(_rows).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _rows[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _rows[key];
    }
  });
});