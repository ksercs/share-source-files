/**
* DevExtreme (cjs/__internal/ui/text_box/m_utils.scroll.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareScrollData = exports.allowScroll = void 0;
var _index = require("../../../common/core/events/utils/index");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error
const allowScroll = function (container, delta, shiftKey) {
  const $container = (0, _renderer.default)(container);
  const scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
  const prop = shiftKey ? 'Width' : 'Height';
  // @ts-expect-error
  const scrollSize = $container.prop(`scroll${prop}`);
  // @ts-expect-error
  const clientSize = $container.prop(`client${prop}`);
  // @ts-expect-error
  // NOTE: round to the nearest integer towards zero
  const scrollBottomPos = scrollSize - clientSize - scrollTopPos | 0;
  // @ts-expect-error
  if (scrollTopPos === 0 && scrollBottomPos === 0) {
    return false;
  }
  // @ts-expect-error
  const isScrollFromTop = scrollTopPos === 0 && delta >= 0;
  const isScrollFromBottom = scrollBottomPos === 0 && delta <= 0;
  // @ts-expect-error
  const isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
  if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
    return true;
  }
};
exports.allowScroll = allowScroll;
const prepareScrollData = function (container, validateTarget) {
  const $container = (0, _renderer.default)(container);
  const isCorrectTarget = function (eventTarget) {
    return validateTarget ? (0, _renderer.default)(eventTarget).is(container) : true;
  };
  return {
    // @ts-expect-error
    validate(e) {
      if ((0, _index.isDxMouseWheelEvent)(e) && isCorrectTarget(e.target)) {
        if (allowScroll($container, -e.delta, e.shiftKey)) {
          e._needSkipEvent = true;
          return true;
        }
        return false;
      }
    }
  };
};
exports.prepareScrollData = prepareScrollData;
