"use strict";

var _easing = require("../common/core/animation/easing");
Object.keys(_easing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _easing[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _easing[key];
    }
  });
});