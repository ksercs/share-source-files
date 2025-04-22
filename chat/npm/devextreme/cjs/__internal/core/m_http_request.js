/**
* DevExtreme (cjs/__internal/core/m_http_request.js)
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
exports.httpRequest = void 0;
var _dependency_injector = _interopRequireDefault(require("../../core/utils/dependency_injector"));
var _window = require("../../core/utils/window");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const window = (0, _window.getWindow)();
const nativeXMLHttpRequest = {
  getXhr() {
    // @ts-expect-error no XMLHttpRequest on Window
    return new window.XMLHttpRequest();
  }
};
const httpRequest = exports.httpRequest = (0, _dependency_injector.default)(nativeXMLHttpRequest);
