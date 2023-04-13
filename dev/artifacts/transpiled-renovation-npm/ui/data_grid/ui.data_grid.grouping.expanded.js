"use strict";

var _module_expanded = require("../../__internal/grids/data_grid/grouping/module_expanded");
Object.keys(_module_expanded).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_expanded[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_expanded[key];
    }
  });
});