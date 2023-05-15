"use strict";

var _module_columns_controller = require("../../__internal/grids/tree_list/module_columns_controller");
Object.keys(_module_columns_controller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module_columns_controller[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _module_columns_controller[key];
    }
  });
});