"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guid = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Guid = exports.Guid = _class.default.inherit({
  ctor: function (value) {
    if (value) {
      value = String(value);
    }
    this._value = this._normalize(value || this._generate());
  },
  _normalize: function (value) {
    value = value.replace(/[^a-f0-9]/ig, '').toLowerCase();
    while (value.length < 32) {
      value += '0';
    }
    return [value.substr(0, 8), value.substr(8, 4), value.substr(12, 4), value.substr(16, 4), value.substr(20, 12)].join('-');
  },
  _generate: function () {
    let value = '';
    for (let i = 0; i < 32; i++) {
      value += Math.round(Math.random() * 15).toString(16);
    }
    return value;
  },
  toString: function () {
    return this._value;
  },
  valueOf: function () {
    return this._value;
  },
  toJSON: function () {
    return this._value;
  }
});