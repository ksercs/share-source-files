"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = verify;
var _sha = _interopRequireDefault(require("sha1"));
var _jsbn = _interopRequireDefault(require("./jsbn"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// see https://datatracker.ietf.org/doc/html/rfc8017#page-47
var ASN1_SHA1 = '3021300906052b0e03021a05000414';
var PUBLIC_KEY = {
  e: 65537,
  n: [202, 208, 20, 244, 235, 89, 121, 253, 219, 161, 162, 26, 166, 22, 65, 81, 176, 0, 101, 246, 34, 101, 128, 51, 224, 52, 194, 227, 113, 10, 4, 96, 201, 33, 171, 251, 204, 57, 164, 28, 89, 249, 191, 46, 170, 74, 37, 125, 216, 95, 240, 125, 69, 31, 134, 79, 101, 62, 25, 30, 162, 31, 206, 104, 92, 42, 35, 164, 93, 97, 197, 198, 239, 225, 249, 146, 119, 88, 20, 76, 219, 218, 113, 0, 29, 246, 132, 116, 37, 252, 113, 87, 200, 99, 171, 146, 136, 182, 216, 226, 97, 67, 85, 126, 103, 117, 236, 49, 60, 32, 109, 91, 139, 166, 1, 152, 228, 36, 182, 167, 19, 106, 72, 62, 186, 243, 199, 73]
};
function fromHexString(string) {
  var _a, _b;
  return (_b = (_a = string.match(/.{1,2}/g)) === null || _a === void 0 ? void 0 : _a.map(function (byte) {
    return parseInt(byte, 16);
  })) !== null && _b !== void 0 ? _b : [];
}
function concat(a, b) {
  var result = new Uint8Array(a.length + b.length);
  result.set(a, 0);
  result.set(b, a.length);
  return result;
}
function bytesAreEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  for (var k = 0; k < a.length; k += 1) {
    if (((a[k] ^ b[k]) & 0xff) !== 0) {
      // eslint-disable-line no-bitwise
      return false;
    }
  }
  return true;
}
// PKCS #1 v1.5
// 0x00 0x01 P 0x00 A H
// P - padding string (0xff...0xff)
// A - ASN.1 encoding of the hash algorithm used
// H - hash value
function pad(hash) {
  var dataLength = (PUBLIC_KEY.n.length * 8 + 6) / 8;
  var data = concat(fromHexString(ASN1_SHA1), hash);
  if (data.length + 10 > dataLength) {
    throw Error('Key is too short for SHA1 signing algorithm');
  }
  var padding = new Uint8Array(dataLength - data.length);
  padding.fill(0xff, 0, padding.length - 1);
  padding[0] = 0;
  padding[1] = 1;
  padding[padding.length - 1] = 0;
  return concat(padding, data);
}
function fromBase64String(base64) {
  return atob(base64).split('').map(function (s) {
    return s.charCodeAt(0);
  });
}
function normalizeBigIntegerBytes(bytes) {
  return [0].concat(_toConsumableArray(bytes)); // add zero to make it positive-signed
}
// verifies RSASSA-PKCS1-v1.5 signature
function verify(_ref) {
  var text = _ref.text,
    encodedSignature = _ref.signature;
  var actual = pad(new Uint8Array((0, _sha.default)(text, {
    asBytes: true
  })));
  var signature = new _jsbn.default(normalizeBigIntegerBytes(fromBase64String(encodedSignature)));
  var exponent = PUBLIC_KEY.e;
  var modulus = new _jsbn.default(normalizeBigIntegerBytes(PUBLIC_KEY.n));
  var expected = signature.modPowInt(exponent, modulus);
  return bytesAreEqual(normalizeBigIntegerBytes(expected.toByteArray()), actual);
}