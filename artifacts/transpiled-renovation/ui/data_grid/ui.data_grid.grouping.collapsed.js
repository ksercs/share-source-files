"use strict";

var _module_collapsed = require("../../__internal/grids/data_grid/grouping/module_collapsed");
Object.keys(_module_collapsed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_collapsed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_collapsed[key];
    }
  });
});