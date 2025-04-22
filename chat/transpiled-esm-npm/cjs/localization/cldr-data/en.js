"use strict";

var _en = require("../../common/core/localization/cldr-data/en");
Object.keys(_en).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _en[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _en[key];
    }
  });
});