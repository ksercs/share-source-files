"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _m_number_box = _interopRequireDefault(require("./m_number_box.mask"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// STYLE numberBox
(0, _component_registrator.default)('dxNumberBox', _m_number_box.default);
var _default = exports.default = _m_number_box.default;