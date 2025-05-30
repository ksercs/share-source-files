"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line import/no-mutable-exports
let AlignStyle = {};
if (_devextremeQuill.default) {
  AlignStyle = _devextremeQuill.default.import('attributors/style/align');
  // @ts-expect-error
  AlignStyle.whitelist.push('left');
}
var _default = exports.default = AlignStyle;