"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNumber = toNumber;
function toNumber(attribute) {
  return attribute ? Number(attribute.replace('px', '')) : 0;
}