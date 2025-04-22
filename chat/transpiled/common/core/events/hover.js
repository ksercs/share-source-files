"use strict";

var _m_hover = require("../../../__internal/events/m_hover");
Object.keys(_m_hover).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_hover[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_hover[key];
    }
  });
});