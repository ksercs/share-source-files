"use strict";

var _module = require("../../__internal/grids/grid_core/error_handling/module");
Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module[key];
    }
  });
});