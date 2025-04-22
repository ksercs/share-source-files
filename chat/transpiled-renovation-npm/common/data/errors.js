"use strict";

var _m_errors = require("../../__internal/data/m_errors");
Object.keys(_m_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_errors[key];
    }
  });
});