"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Portal = void 0;
var _inferno = require("inferno");
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

const Portal = _ref => {
  let {
    container,
    children
  } = _ref;
  if (container) {
    return (0, _inferno.createPortal)(children, container);
  }
  return null;
};
exports.Portal = Portal;