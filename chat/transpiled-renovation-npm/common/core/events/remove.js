"use strict";

var _m_remove = require("../../../__internal/events/m_remove");
Object.keys(_m_remove).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_remove[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_remove[key];
    }
  });
});