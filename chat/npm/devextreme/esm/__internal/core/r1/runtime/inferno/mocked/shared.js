/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/mocked/shared.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable spellcheck/spell-checker */
export const ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
export function isNullOrUndef(o) {
  return o === void 0 || o === null;
}
export function isInvalid(o) {
  return o === null || o === false || o === true || o === void 0;
}
export function isFunction(o) {
  return typeof o === 'function';
}
export function isNull(o) {
  return o === null;
}
export function throwError(message) {
  if (!message) {
    message = ERROR_MSG;
  }
  throw new Error(`Inferno Error: ${message}`);
}
