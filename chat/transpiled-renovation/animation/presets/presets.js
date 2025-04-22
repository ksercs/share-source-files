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