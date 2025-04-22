/**
* DevExtreme (cjs/localization/default_messages.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _default_messages = require("../common/core/localization/default_messages");
Object.keys(_default_messages).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _default_messages[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _default_messages[key];
    }
  });
});
