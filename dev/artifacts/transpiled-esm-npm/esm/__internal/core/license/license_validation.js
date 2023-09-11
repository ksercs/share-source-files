import _extends from "@babel/runtime/helpers/esm/extends";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { verify } from './rsa_pkcs1_sha1';
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
export function parseToken(encodedToken) {
  if (encodedToken === undefined) {
    return GENERAL_ERROR;
  }
  var parts = encodedToken.split(SPLITTER);
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return GENERAL_ERROR;
  }
  if (!verify({
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
  var {
      customerId,
      maxVersionAllowed,
      format
    } = payload,
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