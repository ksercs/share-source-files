/**
* DevExtreme (cjs/ui/slide_out_view/ui.slide_out_view.animation.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.animation = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var ANIMATION_DURATION = 400;
var animation = {
  moveTo: function moveTo($element, position, completeAction) {
    _fx.default.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration: ANIMATION_DURATION,
      complete: completeAction
    });
  },
  complete: function complete($element) {
    _fx.default.stop($element, true);
  }
};
exports.animation = animation;
