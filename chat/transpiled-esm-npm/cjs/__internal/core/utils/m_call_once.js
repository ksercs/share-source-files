"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callOnce = void 0;
const callOnce = function (handler) {
  let result;
  let wrappedHandler = function () {
    result = handler.apply(this, arguments);
    wrappedHandler = function () {
      return result;
    };
    return result;
  };
  return function () {
    // @ts-expect-error Iarguments not assignable to []
    return wrappedHandler.apply(this, arguments);
  };
};
exports.callOnce = callOnce;