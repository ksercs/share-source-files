"use strict";

var _m_drag = require("../../../__internal/events/m_drag");
Object.keys(_m_drag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_drag[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_drag[key];
    }
  });
});