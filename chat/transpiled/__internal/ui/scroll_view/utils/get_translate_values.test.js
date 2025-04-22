"use strict";

var _globals = require("@jest/globals");
var _get_element_style = require("./get_element_style");
var _get_translate_values = require("./get_translate_values");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-unsafe-return */
_globals.jest.mock('./get_element_style', () => _extends({}, _globals.jest.requireActual('./get_element_style'), {
  getElementTransform: _globals.jest.fn(() => '')
}));
(0, _globals.describe)('getTranslateValues', () => {
  (0, _globals.it)('element is not defined', () => {
    (0, _globals.expect)((0, _get_translate_values.getTranslateValues)(null)).toEqual({
      left: 0,
      top: 0
    });
  });
  (0, _globals.it)('matrix(1, 0, 0, 1, 10, 20)', () => {
    _get_element_style.getElementTransform.mockReturnValue('matrix(1, 0, 0, 1, 10, 20)');
    const el = {};
    (0, _globals.expect)((0, _get_translate_values.getTranslateValues)(el)).toEqual({
      left: 10,
      top: 20
    });
  });
});