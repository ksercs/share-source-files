"use strict";

var _hover = require("../common/core/events/hover");
Object.keys(_hover).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _hover[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hover[key];
    }
  });
});