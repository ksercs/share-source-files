"use strict";

var _globals = require("@jest/globals");
var _consts = require("../consts");
var _get_scrollbar_size = require("./get_scrollbar_size");
(0, _globals.describe)('getScrollbarSize(element, direction)', () => {
  (0, _globals.it)('get vertical scrollbar width', () => {
    const containerEl = {
      offsetWidth: 100,
      clientWidth: 83
    };
    (0, _globals.expect)((0, _get_scrollbar_size.getScrollbarSize)(containerEl, _consts.DIRECTION_VERTICAL)).toEqual(17);
  });
  (0, _globals.it)('get horizontal scrollbar height', () => {
    const containerEl = {
      offsetHeight: 100,
      clientHeight: 83
    };
    (0, _globals.expect)((0, _get_scrollbar_size.getScrollbarSize)(containerEl, _consts.DIRECTION_HORIZONTAL)).toEqual(17);
  });
});