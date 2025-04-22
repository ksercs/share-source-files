"use strict";

var _m_short = require("../../../__internal/events/m_short");
Object.keys(_m_short).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_short[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_short[key];
    }
  });
});