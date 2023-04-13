"use strict";

var _module_core = require("../../__internal/grids/data_grid/grouping/module_core");
Object.keys(_module_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_core[key];
    }
  });
});