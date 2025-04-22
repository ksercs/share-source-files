"use strict";

var _m_click = require("../../../__internal/events/m_click");
Object.keys(_m_click).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_click[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_click[key];
    }
  });
});