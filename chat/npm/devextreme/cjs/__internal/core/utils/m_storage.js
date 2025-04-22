/**
* DevExtreme (cjs/__internal/core/utils/m_storage.js)
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
exports.sessionStorage = void 0;
var _window = require("../../../core/utils/window");
const window = (0, _window.getWindow)();
const getSessionStorage = function () {
  let sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {/* empty */}
  return sessionStorage;
};
exports.sessionStorage = getSessionStorage;
