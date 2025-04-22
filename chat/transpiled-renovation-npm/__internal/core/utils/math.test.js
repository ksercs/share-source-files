"use strict";

var _globals = require("@jest/globals");
var _math = require("../../core/utils/math");
var _jestEach = _interopRequireDefault(require("jest-each"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('Math utils tests', () => {
  (0, _globals.describe)('shiftIntegerByModule', () => {
    (0, _jestEach.default)`
      value         | module   | expectedResult
      ${0}          | ${2}    | ${0}
      ${2}          | ${2}    | ${0}
      ${2}          | ${4}    | ${2}
      ${2}          | ${1000} | ${2}
      ${4}          | ${2}    | ${0}
      ${5}          | ${2}    | ${1}
      ${6}          | ${2}    | ${0}
      ${1e10}       | ${10}   | ${0}
      ${1e10 + 3}   | ${10}   | ${3}
      ${-9}         | ${3}    | ${0}
      ${-1}         | ${6}    | ${5}
      ${-3}         | ${9}    | ${6}
      ${-5}         | ${9}    | ${4}
      ${-1e10}      | ${10}   | ${0}
      ${-1e10 + 3}  | ${10}   | ${3}
    `.it('should return correct result', _ref => {
      let {
        value,
        module,
        expectedResult
      } = _ref;
      const result = (0, _math.shiftIntegerByModule)(value, module);
      (0, _globals.expect)(result).toEqual(expectedResult);
    });
    (0, _globals.it)('should throw error if value isn\'t integer', () => {
      (0, _globals.expect)(() => (0, _math.shiftIntegerByModule)(1.5, 3)).toThrow();
    });
    (0, _globals.it)('should throw error if module value isn\'t integer', () => {
      (0, _globals.expect)(() => (0, _math.shiftIntegerByModule)(2, 2.5)).toThrow();
    });
    (0, _globals.it)('should throw error if module value equals zero', () => {
      (0, _globals.expect)(() => (0, _math.shiftIntegerByModule)(2, 0)).toThrow();
    });
    (0, _globals.it)('should throw error if module value less than zero', () => {
      (0, _globals.expect)(() => (0, _math.shiftIntegerByModule)(2, -2)).toThrow();
    });
  });
});