/**
* DevExtreme (cjs/ui/multi_view/ui.multi_view.animation.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.animation = exports._translator = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _translator2 = require("../../animation/translator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _translator = {
  move($element, position) {
    (0, _translator2.move)($element, {
      left: position
    });
  }
};
exports._translator = _translator;
var animation = {
  moveTo($element, position, duration, completeAction) {
    _fx.default.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration: duration,
      complete: completeAction
    });
  },
  complete($element) {
    _fx.default.stop($element, true);
  }
};
exports.animation = animation;
