"use strict";

var _hide_callback = require("../common/core/environment/hide_callback");
Object.keys(_hide_callback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hide_callback[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hide_callback[key];
    }
  });
});