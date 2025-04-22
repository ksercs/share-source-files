"use strict";

var _emitter = require("../../common/core/events/core/emitter.feedback");
Object.keys(_emitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _emitter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _emitter[key];
    }
  });
});