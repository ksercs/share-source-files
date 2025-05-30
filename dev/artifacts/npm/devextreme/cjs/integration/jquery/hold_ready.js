/**
* DevExtreme (cjs/integration/jquery/hold_ready.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _jquery = _interopRequireDefault(require("jquery"));
var _themes_callback = require("../../ui/themes_callback");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

if (_jquery.default && !_themes_callback.themeReadyCallback.fired()) {
  var holdReady = _jquery.default.holdReady || _jquery.default.fn.holdReady;
  holdReady(true);
  _themes_callback.themeReadyCallback.add(function () {
    _ready_callbacks.default.add(function () {
      holdReady(false);
    });
  });
}
