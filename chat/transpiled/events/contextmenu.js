"use strict";

var _contextmenu = require("../common/core/events/contextmenu");
Object.keys(_contextmenu).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _contextmenu[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _contextmenu[key];
    }
  });
});