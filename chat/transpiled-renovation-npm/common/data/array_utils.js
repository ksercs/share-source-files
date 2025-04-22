"use strict";

var _m_array_utils = require("../../__internal/data/m_array_utils");
Object.keys(_m_array_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_array_utils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_array_utils[key];
    }
  });
});