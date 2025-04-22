"use strict";

Object.defineProperty(exports, "cancelAnimationFrame", {
  enumerable: true,
  get: function () {
    return _animation.cancelAnimationFrame;
  }
});
Object.defineProperty(exports, "requestAnimationFrame", {
  enumerable: true,
  get: function () {
    return _animation.requestAnimationFrame;
  }
});
var _animation = require("../common/core/animation");