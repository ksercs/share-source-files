"use strict";

exports.allowedDirection = allowedDirection;
var _consts = require("../common/consts");
var _scroll_direction = require("./scroll_direction");
function allowedDirection(direction, scrollTopMax, scrollLeftMax, bounceEnabled) {
  var _ScrollDirection = new _scroll_direction.ScrollDirection(direction),
    isBoth = _ScrollDirection.isBoth,
    isHorizontal = _ScrollDirection.isHorizontal,
    isVertical = _ScrollDirection.isVertical;
  var vDirectionAllowed = isVertical && (scrollTopMax > 0 || bounceEnabled);
  var hDirectionAllowed = isHorizontal && (scrollLeftMax > 0 || bounceEnabled);
  if (isBoth && vDirectionAllowed && hDirectionAllowed) {
    return _consts.DIRECTION_BOTH;
  }
  if (isHorizontal && hDirectionAllowed) {
    return _consts.DIRECTION_HORIZONTAL;
  }
  if (isVertical && vDirectionAllowed) {
    return _consts.DIRECTION_VERTICAL;
  }
  return undefined;
}