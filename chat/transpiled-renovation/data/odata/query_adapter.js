"use strict";

var _query_adapter = require("../../common/data/odata/query_adapter");
Object.keys(_query_adapter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query_adapter[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query_adapter[key];
    }
  });
});