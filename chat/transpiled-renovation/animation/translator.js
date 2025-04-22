"use strict";

var _translator = require("../common/core/animation/translator");
Object.keys(_translator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _translator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _translator[key];
    }
  });
});