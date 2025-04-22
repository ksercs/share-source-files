"use strict";

var _short = require("../common/core/events/short");
Object.keys(_short).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _short[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _short[key];
    }
  });
});