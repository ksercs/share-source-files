"use strict";

var _m_data_source = require("../../../__internal/data/data_source/m_data_source");
Object.keys(_m_data_source).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_data_source[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_data_source[key];
    }
  });
});