"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_MSG = void 0;
exports.isFunction = isFunction;
exports.isInvalid = isInvalid;
exports.isNull = isNull;
exports.isNullOrUndef = isNullOrUndef;
exports.throwError = throwError;
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable spellcheck/spell-checker */
const ERROR_MSG = exports.ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
function isNullOrUndef(o) {
  return o === void 0 || o === null;
}
function isInvalid(o) {
  return o === null || o === false || o === true || o === void 0;
}
function isFunction(o) {
  return typeof o === 'function';
}
function isNull(o) {
  return o === null;
}
function throwError(message) {
  if (!message) {
    message = ERROR_MSG;
  }
  throw new Error(`Inferno Error: ${message}`);
}