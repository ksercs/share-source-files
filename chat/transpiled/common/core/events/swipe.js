"use strict";

var _m_swipe = require("../../../__internal/events/m_swipe");
Object.keys(_m_swipe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_swipe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_swipe[key];
    }
  });
});