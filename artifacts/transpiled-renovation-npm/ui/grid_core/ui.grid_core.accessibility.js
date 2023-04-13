"use strict";

var _module_accessibility = require("../../__internal/grids/grid_core/module_accessibility");
Object.keys(_module_accessibility).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_accessibility[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_accessibility[key];
    }
  });
});