/**
* DevExtreme (cjs/localization/language_codes.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
