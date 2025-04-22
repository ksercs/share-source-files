"use strict";

var _click = require("../common/core/events/click");
Object.keys(_click).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _click[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _click[key];
    }
  });
});