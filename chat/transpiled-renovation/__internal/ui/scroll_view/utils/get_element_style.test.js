"use strict";

var _globals = require("@jest/globals");
var _inflector = require("../../../../core/utils/inflector");
var _window = require("../../../../core/utils/window");
var _jestEach = _interopRequireDefault(require("jest-each"));
var _get_element_style = require("./get_element_style");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
(0, _globals.describe)('getElementStyle', () => {
  (0, _globals.it)('element is not defined', () => {
    (0, _globals.expect)((0, _get_element_style.getElementStyle)(null)).toEqual(null);
  });
  (0, _globals.it)('hasWindow: false', () => {
    const el = {};
    (0, _window.setWindow)({}, false);
    (0, _globals.expect)((0, _get_element_style.getElementStyle)(el)).toEqual(null);
  });
  (0, _globals.it)('hasWindow: true, window.getComputedStyle: undefined', () => {
    const el = {};
    (0, _window.setWindow)({}, true);
    (0, _globals.expect)((0, _get_element_style.getElementStyle)(el)).toEqual(undefined);
  });
  (0, _globals.it)('hasWindow: true, window.getComputedStyle: { width: 120px }', () => {
    const el = {};
    (0, _window.setWindow)({
      getComputedStyle: () => ({
        paddingBottom: '120px'
      })
    }, true);
    (0, _globals.expect)((0, _get_element_style.getElementStyle)(el)).toEqual({
      paddingBottom: '120px'
    });
  });
});
(0, _globals.describe)('getElementTransform', () => {
  (0, _globals.it)('element is not defined', () => {
    (0, _globals.expect)((0, _get_element_style.getElementTransform)(null)).toEqual('');
  });
  (0, _globals.it)('matrix(1, 0, 0, 1, 10, 20)', () => {
    const el = {};
    (0, _window.setWindow)({
      getComputedStyle: () => ({
        transform: 'matrix(1, 0, 0, 1, 10, 20)'
      })
    }, true);
    (0, _globals.expect)((0, _get_element_style.getElementTransform)(el)).toEqual('matrix(1, 0, 0, 1, 10, 20)');
  });
});
(0, _jestEach.default)(['top', 'left', 'right', 'bottom']).describe('side: %o', side => {
  (0, _globals.describe)(`getElementPadding(element, ${side})`, () => {
    (0, _globals.it)('element is not defined', () => {
      (0, _globals.expect)((0, _get_element_style.getElementPadding)(null, side)).toEqual(0);
    });
    (0, _globals.it)(`padding${(0, _inflector.titleize)(side)}: 5px`, () => {
      const el = {};
      (0, _window.setWindow)({
        getComputedStyle: () => ({
          [`padding${(0, _inflector.titleize)(side)}`]: '5px'
        })
      }, true);
      (0, _globals.expect)((0, _get_element_style.getElementPadding)(el, side)).toEqual(5);
    });
  });
  (0, _globals.describe)(`getElementMargin(element, ${side})`, () => {
    (0, _globals.it)('element is not defined', () => {
      (0, _globals.expect)((0, _get_element_style.getElementMargin)(null, side)).toEqual(0);
    });
    (0, _globals.it)(`margin${(0, _inflector.titleize)(side)}: 5px`, () => {
      const el = {};
      (0, _window.setWindow)({
        getComputedStyle: () => ({
          [`margin${(0, _inflector.titleize)(side)}`]: '5px'
        })
      }, true);
      (0, _globals.expect)((0, _get_element_style.getElementMargin)(el, side)).toEqual(5);
    });
  });
});
(0, _globals.describe)('getElementOverflowX', () => {
  (0, _globals.it)('element is not defined', () => {
    (0, _globals.expect)((0, _get_element_style.getElementOverflowX)(null)).toEqual('visible');
  });
  (0, _globals.it)('overflowX: hidden', () => {
    const el = {};
    (0, _window.setWindow)({
      getComputedStyle: () => ({
        overflowX: 'hidden'
      })
    }, true);
    (0, _globals.expect)((0, _get_element_style.getElementOverflowX)(el)).toEqual('hidden');
  });
});
(0, _globals.describe)('getElementOverflowY', () => {
  (0, _globals.it)('element is not defined', () => {
    (0, _globals.expect)((0, _get_element_style.getElementOverflowY)(null)).toEqual('visible');
  });
  (0, _globals.it)('overflowY: hidden', () => {
    const el = {};
    (0, _window.setWindow)({
      getComputedStyle: () => ({
        overflowY: 'hidden'
      })
    }, true);
    (0, _globals.expect)((0, _get_element_style.getElementOverflowY)(el)).toEqual('hidden');
  });
});