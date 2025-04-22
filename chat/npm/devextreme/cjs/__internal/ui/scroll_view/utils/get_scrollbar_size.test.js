/**
* DevExtreme (cjs/__internal/ui/scroll_view/utils/get_scrollbar_size.test.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
