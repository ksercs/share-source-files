/**
* DevExtreme (cjs/ui/text_box/utils.scroll.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.prepareScrollData = exports.allowScroll = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _index = require("../../events/utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var allowScroll = function allowScroll(container, delta, shiftKey) {
  var $container = (0, _renderer.default)(container);
  var scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
  var prop = shiftKey ? 'Width' : 'Height';
  var scrollSize = $container.prop("scroll".concat(prop));
  var clientSize = $container.prop("client".concat(prop));
  // NOTE: round to the nearest integer towards zero
  var scrollBottomPos = scrollSize - clientSize - scrollTopPos | 0;
  if (scrollTopPos === 0 && scrollBottomPos === 0) {
    return false;
  }
  var isScrollFromTop = scrollTopPos === 0 && delta >= 0;
  var isScrollFromBottom = scrollBottomPos === 0 && delta <= 0;
  var isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
  if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
    return true;
  }
};
exports.allowScroll = allowScroll;
var prepareScrollData = function prepareScrollData(container, validateTarget) {
  var $container = (0, _renderer.default)(container);
  var isCorrectTarget = function isCorrectTarget(eventTarget) {
    return validateTarget ? (0, _renderer.default)(eventTarget).is(container) : true;
  };
  return {
    validate: function validate(e) {
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
