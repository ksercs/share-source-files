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