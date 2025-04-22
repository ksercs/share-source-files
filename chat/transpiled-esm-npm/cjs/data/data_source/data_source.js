"use strict";

var _data_source = require("../../common/data/data_source/data_source");
Object.keys(_data_source).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _data_source[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _data_source[key];
    }
  });
});