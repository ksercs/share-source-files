"use strict";

var _supplemental = require("../../common/core/localization/cldr-data/supplemental");
Object.keys(_supplemental).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _supplemental[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _supplemental[key];
    }
  });
});