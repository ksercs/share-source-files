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