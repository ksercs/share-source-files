"use strict";

var _m_query_adapter = require("../../../__internal/data/odata/m_query_adapter");
Object.keys(_m_query_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _m_query_adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _m_query_adapter[key];
    }
  });
});