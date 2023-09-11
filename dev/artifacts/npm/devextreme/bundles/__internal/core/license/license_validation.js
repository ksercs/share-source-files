/**
* DevExtreme (bundles/__internal/core/license/license_validation.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToken = parseToken;
var _rsa_pkcs1_sha = require("./rsa_pkcs1_sha1");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
var SPLITTER = '.';
var FORMAT = 1;
var GENERAL_ERROR = {
  kind: 'corrupted',
  error: 'general'
};
var VERIFICATION_ERROR = {
  kind: 'corrupted',
  error: 'verification'
};
var DECODING_ERROR = {
  kind: 'corrupted',
  error: 'decoding'
};
var DESERIALIZATION_ERROR = {
  kind: 'corrupted',
  error: 'deserialization'
};
var PAYLOAD_ERROR = {
  kind: 'corrupted',
  error: 'payload'
};
var VERSION_ERROR = {
  kind: 'corrupted',
  error: 'version'
};
function parseToken(encodedToken) {
  if (encodedToken === undefined) {
    return GENERAL_ERROR;
  }
  var parts = encodedToken.split(SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!(0, _rsa_pkcs1_sha.verify)({
    text: parts[0],
    signature: parts[1]
  })) {
    return VERIFICATION_ERROR;
  }
  var decodedPayload = '';
  try {
    decodedPayload = atob(parts[0]);
  } catch (_a) {
    return DECODING_ERROR;
  }
  var payload = {};
  try {
    payload = JSON.parse(decodedPayload);
  } catch (_b) {
    return DESERIALIZATION_ERROR;
  }
  var _payload = payload,
    customerId = _payload.customerId,
    maxVersionAllowed = _payload.maxVersionAllowed,
    format = _payload.format,
    rest = __rest(payload, ["customerId", "maxVersionAllowed", "format"]);
  if (customerId === undefined || maxVersionAllowed === undefined || format === undefined) {
    return PAYLOAD_ERROR;
  }
  if (format !== FORMAT) {
    return VERSION_ERROR;
  }
  return {
    kind: 'verified',
    payload: _extends({
      customerId,
      maxVersionAllowed
    }, rest)
  };
}
