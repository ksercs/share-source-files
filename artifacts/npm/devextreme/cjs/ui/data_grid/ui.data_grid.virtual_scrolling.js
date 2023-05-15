/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.virtual_scrolling.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _virtual_scrolling = require("../../__internal/grids/data_grid/module_not_extended/virtual_scrolling");
Object.keys(_virtual_scrolling).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _virtual_scrolling[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _virtual_scrolling[key];
    }
  });
});
