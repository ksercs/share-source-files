"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animation = exports._translator = void 0;
var _animation = require("../../../common/core/animation");
var _translator2 = require("../../../common/core/animation/translator");
// eslint-disable-next-line @typescript-eslint/naming-convention
const _translator = exports._translator = {
  move($element, position) {
    (0, _translator2.move)($element, {
      left: position
    });
  }
};
const animation = exports.animation = {
  moveTo($element, position, duration, completeAction) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _animation.fx.animate($element, {
      type: 'slide',
      to: {
        left: position
      },
      duration,
      complete: completeAction
    });
  },
  complete($element) {
    // @ts-expect-error
    _animation.fx.stop($element, true);
  }
};