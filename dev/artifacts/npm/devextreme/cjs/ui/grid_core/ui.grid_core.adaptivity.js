/**
* DevExtreme (cjs/ui/grid_core/ui.grid_core.adaptivity.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_adaptivity = require("../../__internal/grids/grid_core/adaptivity/m_adaptivity");
Object.keys(_m_adaptivity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_adaptivity[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _m_adaptivity[key];
    }
  });
});
