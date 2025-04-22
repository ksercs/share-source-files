"use strict";

var _language_codes = require("../common/core/localization/language_codes");
Object.keys(_language_codes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _language_codes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _language_codes[key];
    }
  });
});