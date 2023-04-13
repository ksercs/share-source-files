/**
* DevExtreme (cjs/core/utils/storage.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.sessionStorage = void 0;
var _window = require("../../core/utils/window");
var window = (0, _window.getWindow)();
var getSessionStorage = function getSessionStorage() {
  var sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {}
  return sessionStorage;
};
exports.sessionStorage = getSessionStorage;
