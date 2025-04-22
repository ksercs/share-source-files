/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/portal.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
