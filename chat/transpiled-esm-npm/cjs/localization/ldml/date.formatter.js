"use strict";

var _date = require("../../common/core/localization/ldml/date.formatter");
Object.keys(_date).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _date[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _date[key];
    }
  });
});