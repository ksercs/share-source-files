"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var ERROR_MSG;
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
    throw new Error("Inferno Error: ".concat(message));
  }
  _export({
    isNullOrUndef: isNullOrUndef,
    isInvalid: isInvalid,
    isFunction: isFunction,
    isNull: isNull,
    throwError: throwError
  });
  return {
    setters: [],
    execute: function () {
      _export("ERROR_MSG", ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.');
    }
  };
});