"use strict";

var _remove = require("../common/core/events/remove");
Object.keys(_remove).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _remove[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _remove[key];
    }
  });
});