"use strict";

var _transition_executor = require("../../common/core/animation/transition_executor/transition_executor");
Object.keys(_transition_executor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transition_executor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transition_executor[key];
    }
  });
});