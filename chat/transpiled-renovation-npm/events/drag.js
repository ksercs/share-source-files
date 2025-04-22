"use strict";

var _drag = require("../common/core/events/drag");
Object.keys(_drag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _drag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drag[key];
    }
  });
});