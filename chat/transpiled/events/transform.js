"use strict";

var _transform = require("../common/core/events/transform");
Object.keys(_transform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transform[key];
    }
  });
});