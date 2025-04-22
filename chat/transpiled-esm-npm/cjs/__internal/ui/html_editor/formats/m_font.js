"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let FontStyle = {};
if (_devextremeQuill.default) {
  FontStyle = _devextremeQuill.default.import('attributors/style/font');
  // @ts-expect-error
  FontStyle.whitelist = null;
}
var _default = exports.default = FontStyle;