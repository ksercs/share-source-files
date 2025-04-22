"use strict";

var _swipe = require("../common/core/events/swipe");
Object.keys(_swipe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _swipe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swipe[key];
    }
  });
});