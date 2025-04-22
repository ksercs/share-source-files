"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let SizeStyle = {};
if (_devextremeQuill.default) {
  SizeStyle = _devextremeQuill.default.import('attributors/style/size');
  // @ts-expect-error
  SizeStyle.whitelist = null;
}
var _default = exports.default = SizeStyle;