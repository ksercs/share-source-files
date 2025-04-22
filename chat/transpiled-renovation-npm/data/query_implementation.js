"use strict";

var _query_implementation = require("../common/data/query_implementation");
Object.keys(_query_implementation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query_implementation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query_implementation[key];
    }
  });
});