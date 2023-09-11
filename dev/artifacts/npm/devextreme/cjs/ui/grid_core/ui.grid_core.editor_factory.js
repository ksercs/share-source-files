/**
* DevExtreme (cjs/ui/grid_core/ui.grid_core.editor_factory.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _m_editor_factory = require("../../__internal/grids/grid_core/editor_factory/m_editor_factory");
Object.keys(_m_editor_factory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_editor_factory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _m_editor_factory[key];
    }
  });
});
