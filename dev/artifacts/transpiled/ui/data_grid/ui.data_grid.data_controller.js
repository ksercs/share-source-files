"use strict";

var _module_data_controller = require("../../__internal/grids/data_grid/module_data_controller");
Object.keys(_module_data_controller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_data_controller[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_data_controller[key];
    }
  });
});