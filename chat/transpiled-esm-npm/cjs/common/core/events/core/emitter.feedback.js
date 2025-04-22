"use strict";

var _m_emitter = require("../../../../__internal/events/core/m_emitter.feedback");
Object.keys(_m_emitter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_emitter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_emitter[key];
    }
  });
});