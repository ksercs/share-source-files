/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.filter_panel.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _filter_panel = require("../../__internal/grids/data_grid/module_not_extended/filter_panel");
Object.keys(_filter_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _filter_panel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filter_panel[key];
    }
  });
});
