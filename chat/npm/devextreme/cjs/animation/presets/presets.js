/**
* DevExtreme (cjs/animation/presets/presets.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _presets = require("../../common/core/animation/presets/presets");
Object.keys(_presets).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _presets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _presets[key];
    }
  });
});
