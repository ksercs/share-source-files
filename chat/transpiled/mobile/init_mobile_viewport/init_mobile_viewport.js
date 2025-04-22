"use strict";

var _init_mobile_viewport = require("../../common/core/environment/init_mobile_viewport/init_mobile_viewport");
Object.keys(_init_mobile_viewport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _init_mobile_viewport[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _init_mobile_viewport[key];
    }
  });
});