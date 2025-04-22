"use strict";

var _m_wheel = require("../../../../__internal/events/core/m_wheel");
Object.keys(_m_wheel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_wheel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_wheel[key];
    }
  });
});