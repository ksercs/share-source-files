"use strict";

var _m_contextmenu = require("../../../__internal/events/m_contextmenu");
Object.keys(_m_contextmenu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_contextmenu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_contextmenu[key];
    }
  });
});